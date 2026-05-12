# Desafio Blincast

Duas aplicações separadas: um servidor HTTP feito com FastAPI e um cliente web feito com React.

## Servidor

Precisa ter Python instalado.

```bash
cd desafio-blindcast
cd server
python -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn
uvicorn main:app --reload
```

O servidor vai rodar em `http://127.0.0.1:8000`.

## Cliente

Precisa ter Node.js instalado.

```bash
cd desafio-blindcast
cd client
npm install
npm start
```

O cliente vai rodar em `http://localhost:3000`.

## Observações

- O servidor precisa estar rodando antes de usar o cliente
- Os dados ficam em memória, então são perdidos quando o servidor é reiniciado