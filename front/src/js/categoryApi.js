const API_URL = import.meta.env.VITE_API_URL;

export const fetchCategorias = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token no encontrado");

    const response = await fetch(`${API_URL}/category`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("No autorizado o error en el servidor");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener categorías:", error.message);
    return [];
  }
};

export const agregarCategoria = async (nombre) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token no encontrado");

    const response = await fetch(`${API_URL}/category`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: nombre })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al agregar categoría");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al agregar categoría:", error.message);
    throw error;
  }
};
