const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      alert("Error al iniciar sesión: " + (error.message || response.statusText));
      return null;
    }

    const data = await response.json();

    // ✅ Detectar si el token viene como { token: { token: "..." } }
    const token = data.token?.token || data.token;

    if (token && typeof token === "string") {
      localStorage.setItem("token", token);
      console.log("Token guardado correctamente:", token);
      return { token };
    } else {
      console.error("Token inválido recibido:", data);
      alert("Error: el token recibido no es válido");
      return null;
    }
  } catch (error) {
    console.error("Error en login:", error);
    alert("Error de red o servidor");
    return null;
  }
};

export const register = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      alert("Error al registrarse: " + (error.message || response.statusText));
      return null;
    }

    const data = await response.json();
    alert("¡Registro exitoso! Ahora puedes iniciar sesión");
    return data;
  } catch (error) {
    console.error("Error en registro:", error);
    alert("Error de red o servidor");
    return null;
  }
};
