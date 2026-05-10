from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from enum import Enum

app = FastAPI()

# faz com que o react acesse o servidor em outra porta
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# armazenamento em memoria, achei suficiente pra esse desafio
storage = {}

class Action(str, Enum):
    create = "create"
    update = "update"
    delete = "delete"

class DocumentRequest(BaseModel):
    action: Action
    key: str
    value: str = ""

@app.post("/document")
def handle_document(req: DocumentRequest):
    if req.action == Action.create:
        if req.key in storage:
            # 409 conflict, chave ja existe
            raise HTTPException(status_code=409, detail="Key already exists")
        storage[req.key] = req.value
        return {"status": "ok", "code": 0}

    elif req.action == Action.update:
        if req.key not in storage:
            # 404 not found, chave não existe pra atualizar
            raise HTTPException(status_code=404, detail="Key not found")
        storage[req.key] = req.value
        return {"status": "ok", "code": 0}

    elif req.action == Action.delete:
        if req.key not in storage:
            # 404 not found, chave não existe pra deletar
            raise HTTPException(status_code=404, detail="Key not found")
        del storage[req.key]
        return {"status": "ok", "code": 0}