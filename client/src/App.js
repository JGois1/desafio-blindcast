import { useState } from "react";

const API_URL = "http://127.0.0.1:8000/document";

function App() {
  const [action, setAction] = useState("create");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit() {
    setResult(null);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, key, value }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Não foi possível conectar ao servidor.");
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: "60px auto", fontFamily: "sans-serif" }}>
      <h1>Gerenciador de Documentos</h1>

      <div style={{ marginBottom: 16 }}>
        <label>Ação</label><br />
        <select value={action} onChange={(e) => setAction(e.target.value)} style={{ width: "500px", padding: 8 }}>
          <option value="create">Create</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </select>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label>Key</label><br />
        <input value={key} onChange={(e) => setKey(e.target.value)} style={{ width: "100%", padding: 8 }} />
      </div>

      {action !== "delete" && (
        <div style={{ marginBottom: 16 }}>
          <label>Value</label><br />
          <input value={value} onChange={(e) => setValue(e.target.value)} style={{ width: "100%", padding: 8 }} />
        </div>
      )}

      <button onClick={handleSubmit} style={{ padding: "10px 24px" }}>
        Enviar
      </button>

      {result && (
        <p style={{ color: "green", marginTop: 16 }}>
          ✅ Sucesso: status={result.status}, code={result.code}
        </p>
      )}

      {error && (
        <p style={{ color: "red", marginTop: 16 }}>
          ❌ Erro: {error}
        </p>
      )}
    </div>
  );
}

export default App;