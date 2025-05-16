from pydantic import BaseModel
from config.config import app_settings
from utils import logger


class Database(BaseModel):
    url: str = (
        f"postgresql://{app_settings.db_user}:{app_settings.db_password}@{app_settings.db_host}:{app_settings.db_port}/{app_settings.db_name}"
    )
