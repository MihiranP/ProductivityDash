from config.config import app_settings
from utils.logger import app_logger
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class Database:
    def __init__(self):
        url = f"postgresql://{app_settings.Config.db_user}:{app_settings.Config.db_password}@{app_settings.Config.db_host}:{app_settings.Config.db_port}/{app_settings.Config.db_name}"
        self.engine = create_engine(url)
        self.SessionLocal = sessionmaker(
            autocommit=False, autoflush=False, bind=self.engine
        )

    def get_db(self):
        db = self.SessionLocal()
        try:
            app_logger.info("Opening database connection...")
            yield db
            app_logger.info("Database connection yielded...")
        finally:
            app_logger.info("Closing database connection...")
            db.close()


db = Database()
