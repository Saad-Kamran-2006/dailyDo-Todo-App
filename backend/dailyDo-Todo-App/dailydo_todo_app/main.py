from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import SQLModel, Field, create_engine, Session, select
from dailydo_todo_app import setting
from typing import Annotated, Optional
from contextlib import asynccontextmanager

# ? Step-1: Create Database on Neon
# ? Step-2: Create .env file for environment variables
# ? Step-3: Create setting.py file for encrypting DatabaseURL
# ? Step-4: Create Model
# ? Step-5: Create connection string
# ? Step-6: Create Engine
# ? Step-7: Create function for table creation
# ? Step-8: Create function for session management
# ? Step-9: Create contex manager for app lifespan
# ? Step-10: Create all endpoints for todo app


# ? Step-4: Create Model
# * Data Model:
# * Table Model:
class Todo(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    content: str = Field(index=True, min_length=3, max_length=54)
    is_completed: bool = Field(default=False)


# ? Step-5: Create connection string
connection_string: str = str(setting.DATABASE_URL).replace(
    "postgresql", "postgresql+psycopg"
)

# ? Step-6: Create Engine
# ? Engine is one for whole application:
engine = create_engine(
    connection_string,
    connect_args={"sslmode": "require"},
    pool_recycle=300,
    pool_size=10,
    # echo=True,
)


# ? Step-7: Create function for table creation
def create_tables():
    SQLModel.metadata.create_all(engine)


# ? Step-8: Create function for session management
# ? Session: separate session for each functionality/transaction
def get_session():
    with Session(engine) as session:
        yield session


# ? Step-9: Create contex manager for app lifespan
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Creating Tables")
    create_tables()
    print("Tables Created")
    yield


app: FastAPI = FastAPI(lifespan=lifespan, title="dailyDo-Todo-App", version="1.0.0")


# ? Step-10: Create all endpoints for todo app
@app.get("/")
async def root():
    return {"message": "Welcome to dailyDo todo app"}


@app.post("/todos/", response_model=Todo)
async def create_todo(todo: Todo, session: Annotated[Session, Depends(get_session)]):
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo


@app.get("/todos/", response_model=list[Todo])
async def get_all(session: Annotated[Session, Depends(get_session)]):
    statement = select(Todo)
    todos = session.exec(statement).all()
    if todos:
        return todos
    else:
        raise HTTPException(status_code=404, detail="No task found")


@app.get("/todos/{id}", response_model=Todo)
async def get_single_todo(id: int, session: Annotated[Session, Depends(get_session)]):
    todo = session.exec(select(Todo).where(Todo.id == id)).first()
    if todo:
        return todo
    else:
        raise HTTPException(status_code=404, detail="No Task found")


@app.put("/todos/{id}")
async def edit_todo(id: int, todo: Todo, session: Annotated[Session, Depends(get_session)]):
    statement = select(Todo)
    existing_todo = session.exec(statement.where(Todo.id == id)).first()
    if existing_todo:
        existing_todo.content = todo.content
        existing_todo.is_completed = todo.is_completed
        session.add(existing_todo)
        session.commit()
        session.refresh(existing_todo)
        return existing_todo
    else:
        raise HTTPException(status_code=404, detail="No task found")


@app.delete("/todos/{id}")
async def delete_todo(id, session: Annotated[Session, Depends(get_session)]):
    todo = session.get(Todo, id)
    if todo:
        session.delete(todo)
        session.commit()
        return {"message": "Task successfully deleted"}
    else:
        raise HTTPException(status_code=404, detail="No task found")
