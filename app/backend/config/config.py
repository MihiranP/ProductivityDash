from pydantic_settings import BaseSettings
from dotenv import load_dotenv, find_dotenv
import os


class Settings(BaseSettings):
    env_file: str = ".env"

    class Config:
        logging_level: str
        db_user: str
        db_password: str
        db_host: str
        db_port: str
        db_name: str

    def initialize_variables(self):
        valid_env = load_dotenv(find_dotenv())
        if not valid_env:
            raise ValueError("Invalid env file")
        self.Config.logging_level = os.getenv("LOGGING_LEVEL")
        self.Config.db_user = os.getenv("DB_USER")
        self.Config.db_password = os.getenv("DB_PASSWORD")
        self.Config.db_host = os.getenv("DB_HOST")
        self.Config.db_port = os.getenv("DB_PORT")
        self.Config.db_name = os.getenv("DB_NAME")


app_settings = Settings()
app_settings.initialize_variables()
