import React, { useEffect, useState, useCallback } from "react";
import { Blocks } from "lucide-react";
import { fetchCategorias, agregarCategoria } from "../js/categoryApi";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");

  // Cargar categorías del backend
  const cargarCategorias = useCallback(async () => {
    try {
      const data = await fetchCategorias();
      setCategorias(data);
    } catch {
      setError("Error al cargar categorías.");
    }
  }, []);

  // Verificar token y cargar categorías al montar
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión.");
      window.location.href = "/";
      return;
    }
    cargarCategorias();
  }, [cargarCategorias]);

  // Manejar envío del formulario
  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!nombre.trim()) {
      setError("El nombre no puede estar vacío.");
      return;
    }

    try {
      await agregarCategoria(nombre.trim());
      setNombre("");
      await cargarCategorias();
    } catch (err) {
      setError(err.message || "Error al agregar categoría.");
    }
  };

  return (
    <section className="max-w-lg mx-auto p-6 bg-white rounded shadow-md">
      <header className="flex items-center gap-3 mb-6 text-2xl font-semibold text-rose-600">
        <Blocks size={28} />
        Categorías
      </header>

      <form onSubmit={manejarSubmit} className="flex flex-col gap-4">
        <label className="text-gray-700 font-medium" htmlFor="categoriaInput">
          Nombre de la categoría
        </label>
        <input
          id="categoriaInput"
          type="text"
          placeholder="Ej. Gastos de casa..."
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <button
          type="submit"
          className="self-end bg-rose-600 text-white px-5 py-2 rounded hover:bg-rose-700 transition"
        >
          Agregar
        </button>

        {error && (
          <p className="text-red-500 text-sm font-semibold mt-1">{error}</p>
        )}
      </form>

      <ul className="mt-8 space-y-3">
        {categorias.map((cat) => (
          <li
            key={cat._id || cat.name}
            className="bg-rose-50 text-rose-700 font-semibold rounded shadow px-4 py-2 hover:bg-rose-100 transition"
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Categorias;
