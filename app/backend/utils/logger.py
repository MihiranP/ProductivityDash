import sys
from loguru import logger
from config.config import app_settings


def setup_logging(log_level="INFO"):
    logger.remove()

    logger.add(
        sys.stdout,
        colorize=True,
        format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>",
        level=log_level,
    )

    return logger


app_logger = setup_logging(app_settings.Config.logging_level)
