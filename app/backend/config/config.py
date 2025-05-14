from pydantic_settings import BaseSettings
from dotenv import load_dotenv, find_dotenv
import os


class Settings(BaseSettings):
    env_file: str = ".env"

    class Config:
        logging_level: str

    def initialize_variables(self):
        valid_env = load_dotenv(find_dotenv())
        if not valid_env:
            raise ValueError("Invalid env file")
        self.Config.logging_level = os.getenv("LOGGING_LEVEL")


app_settings = Settings()
app_settings.initialize_variables()
