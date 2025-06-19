const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const getToken = () => localStorage.getItem("token");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export const fetchMovimientos = async () => {
  const res = await fetch(`${BASE_URL}/transaction`, {
    headers: headers(),
  });
  if (!res.ok) throw new Error("Error al cargar movimientos");
  return res.json();
};

export const fetchByTipo = async (tipo) => {
  // tipo: "ingreso" o "egreso"
  let endpoint = tipo === "ingreso" ? "income" : "outflow";
  const res = await fetch(`${BASE_URL}/transaction/${endpoint}`, {
    headers: headers(),
  });
  if (!res.ok) throw new Error("Error al cargar movimientos por tipo");
  return res.json();
};

export const fetchByCategoria = async (categoryId) => {
  const res = await fetch(`${BASE_URL}/transaction/category/${categoryId}`, {
    headers: headers(),
  });
  if (!res.ok) throw new Error("Error al cargar movimientos por categoría");
  return res.json();
};

export const fetchByFecha = async (fecha) => {
  // fecha formato "YYYY-MM-DD"
  const res = await fetch(`${BASE_URL}/transaction/date/${fecha}`, {
    headers: headers(),
  });
  if (!res.ok) throw new Error("Error al cargar movimientos por fecha");
  return res.json();
};

export const crearMovimiento = async (data) => {
  const res = await fetch(`${BASE_URL}/transaction`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al crear movimiento");
  }
  return res.json();
};
