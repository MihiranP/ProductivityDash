import uuid
from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    LargeBinary,
    JSON,
    ARRAY,
    UUID,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(UUID, primary_key=True, default=uuid.uuid4)
    profile_pic = Column(LargeBinary, nullable=True)
    name = Column(String, nullable=False)

    # One-to-many relationships
    goals = relationship("Goal", backref="profile")
    tasks = relationship("Task", backref="profile")
    schedules = relationship("Schedule", backref="profile")


class Goal(Base):
    __tablename__ = "goals"

    goal_id = Column(Integer, primary_key=True)
    goal_name = Column(String, nullable=False)
    goal_description = Column(String, nullable=True)
    dedicated_time = Column(Integer, nullable=True)
    profile_id = Column(UUID, ForeignKey("profiles.id"))

    # One-to-many: Goal -> Tasks
    tasks = relationship("Task", backref="goal")


class Task(Base):
    __tablename__ = "tasks"

    task_id = Column(Integer, primary_key=True)
    task_name = Column(String, nullable=False)
    task_description = Column(String, nullable=True)
    days = Column(ARRAY(Integer), nullable=True)
    dedicated_time = Column(Integer, nullable=True)
    resources = Column(JSON, nullable=True)
    profile_id = Column(UUID, ForeignKey("profiles.id"))
    goal_id = Column(Integer, ForeignKey("goals.goal_id"))


class Schedule(Base):
    __tablename__ = "schedules"

    id = Column(Integer, primary_key=True)
    monday = Column(JSON, nullable=True)
    tuesday = Column(JSON, nullable=True)
    wednesday = Column(JSON, nullable=True)
    thursday = Column(JSON, nullable=True)
    friday = Column(JSON, nullable=True)
    saturday = Column(JSON, nullable=True)
    sunday = Column(JSON, nullable=True)
    profile_id = Column(UUID, ForeignKey("profiles.id"))
