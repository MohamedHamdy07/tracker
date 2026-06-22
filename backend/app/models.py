# app/models.py
from datetime import date

from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class JobDB(Base):
    __tablename__ = "applications"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )  # autoincrements — replaces your itertools counter
    company_name: Mapped[str]
    job_title: Mapped[str]
    status: Mapped[str]
    date: Mapped[date]
