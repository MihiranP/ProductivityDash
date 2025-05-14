import uvicorn
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from utils.logger import app_logger

app = FastAPI(title="ProductivityDash", version="0.0.0.1")
app.add_middleware(
    CORSMiddleware,
    allow_origins="localhost",
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

apiRouter = APIRouter(prefix="/api")
app.include_router(apiRouter)


@app.get("/health")
async def health():
    return {"status": "healthy"}


if __name__ == "__main__":
    app_logger.info("Starting Server...")
    uvicorn.run(app="main:app", host="0.0.0.0", port=8000, reload=True)
