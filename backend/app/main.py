from itertools import count

from fastapi import FastAPI, status
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


job_applications = [
    new_job("Figma", "FullStack Software Engineer", "Applied"),
    new_job("Meta", "FullStack Software Engineer", "Rejected"),
    new_job("dbt Labs", "Senior Customer Solutions Engineer", "Rejected"),
    new_job("n8n", "Senior Customer Support Engineer", "Interviewing"),
    new_job("Amazon", "L5 Frontend Software Engineer", "Rejected"),
]


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
