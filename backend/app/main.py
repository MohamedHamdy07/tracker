from datetime import date
from enum import StrEnum

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import JobDB


class JobStatus(StrEnum):
    applied = "Applied"
    interviewing = "Interviewing"
    offer = "Offer"
    rejected = "Rejected"
    accepted = "Accepted"


app = FastAPI()


origins = [
    "http://localhost:5173",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow specified origins
    allow_credentials=True,  # Allow cookies and authentication headers
    allow_methods=["*"],  # Allow all standard HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all HTTP headers
)


class StatusCount(BaseModel):
    status: JobStatus
    count: int


class JobBase(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )
    company_name: str
    job_title: str
    status: JobStatus
    date: date


class Job(JobBase):
    id: int


@app.get("/applications")
def applications(db: Session = Depends(get_db)) -> list[Job]:
    return db.scalars(select(JobDB)).all()


@app.post("/applications", status_code=status.HTTP_201_CREATED)
def create_application(job: JobBase, db: Session = Depends(get_db)) -> Job:
    new_job = JobDB(
        company_name=job.company_name,
        job_title=job.job_title,
        status=job.status,
        date=job.date,
    )
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job


@app.delete("/applications/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_application(job_id: int, db: Session = Depends(get_db)) -> None:
    job = db.get(JobDB, job_id)
    if job is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Application not found"
        )
    db.delete(job)
    db.commit()


@app.patch("/applications/{job_id}")
def update_application_status(
    job_id: int, new_status: JobStatus, db: Session = Depends(get_db)
) -> Job:
    job = db.get(JobDB, job_id)
    if job is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Application not found"
        )
    job.status = new_status
    db.commit()
    return job


@app.get("/analytics/statuses")
def get_application_status_counts(db: Session = Depends(get_db)) -> list[StatusCount]:
    rows = db.execute(
        select(JobDB.status, func.count(JobDB.id)).group_by(JobDB.status)
    ).all()
    return [StatusCount(status=status, count=count) for status, count in rows]
