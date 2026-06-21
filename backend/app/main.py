from itertools import count

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel

app = FastAPI()

_next_id = count(1)

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


class JobBase(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    company_name: str
    job_title: str
    status: str


class Job(JobBase):
    id: int


def new_job(company_name: str, job_title: str, status: str) -> Job:
    return Job(
        id=next(_next_id),
        company_name=company_name,
        job_title=job_title,
        status=status,
    )


job_applications = []


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/applications")
def applications() -> list[Job]:
    return job_applications


@app.post("/applications", status_code=status.HTTP_201_CREATED)
def create_application(job: JobBase) -> Job:
    new_application = new_job(**job.model_dump())
    job_applications.append(new_application)
    return new_application


@app.delete("/applications/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_application(job_id: int) -> None:
    job = next((j for j in job_applications if j.id == job_id), None)
    if job is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Application not found"
        )
    job_applications.remove(job)
