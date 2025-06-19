const API_URL = "http://localhost:3001/api/auth"; // cambia si tu ruta es distinta

export const login = async (email, password) => {
  try {
    const res = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const error = await res.json();
      alert(error.message || "Credenciales incorrectas");
      return false;
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    return true;

  } catch (error) {
    console.error("Error en login:", error);
    alert("Error al conectar con el servidor");
    return false;
  }
};


export const register = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al registrarse");
    }

    alert("Registro exitoso, ahora puedes iniciar sesión");
  } catch (err) {
    console.error("Error en registro:", err.message);
    alert(err.message);
  }
};

