import React, { useEffect, useState, useCallback } from "react";
import { Search } from "lucide-react";
import Card from "../components/Card";
import { fetchCategorias } from "../js/categoryApi";
import {
  fetchMovimientos,
  fetchByTipo,
  fetchByCategoria,
  fetchByFecha,
  crearMovimiento,
} from "../js/transactionApi";

const Movimientos = () => {
  const [categorias, setCategorias] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "Egreso",
    category: "",
  });
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");

  // ---------- Funciones de inicialización ----------
  const validarToken = () => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/";
  };

  const initApp = useCallback(() => {
    validarToken();
    cargarCategorias();
    cargarMovimientos();
  }, []);

  useEffect(() => {
    initApp();
  }, [initApp]);

  // ---------- Cargar datos ----------
  const cargarCategorias = useCallback(async () => {
    try {
      const cats = await fetchCategorias();
      setCategorias(cats);
      setForm((f) => ({
        ...f,
        category: cats[0]?._id || "",
      }));
    } catch {
      setError("Error al cargar categorías.");
    }
  }, []);

  const cargarMovimientos = useCallback(async () => {
    try {
      const movs = await fetchMovimientos();
      setMovimientos(movs);
    } catch {
      setError("Error al cargar movimientos.");
    }
  }, []);

  // ---------- Manejo de inputs ----------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ---------- Validación de formulario ----------
  const validarFormulario = () => {
    const { description, amount, category } = form;
    if (!description || !amount || !category) {
      setError("Por favor completa todos los campos.");
      return false;
    }
    return true;
  };

  // ---------- Envío del formulario ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validarFormulario()) return;

    try {
      await crearMovimiento({
        description: form.description,
        amount: Number(form.amount),
        type: form.type,
        category: form.category,
      });
      setForm((f) => ({ ...f, description: "", amount: "" }));
      await cargarMovimientos();
    } catch (e) {
      setError(e.message || "Error al guardar movimiento.");
    }
  };

  // ---------- Búsqueda con backend ----------
  const buscarBackend = useCallback(
    async (texto) => {
      setError("");
      texto = texto.trim().toLowerCase();

      if (!texto) return cargarMovimientos();

      try {
        if (texto === "ingreso" || texto === "egreso") {
          return setMovimientos(await fetchByTipo(texto));
        }

        if (/^\d{4}-\d{2}-\d{2}$/.test(texto)) {
          return setMovimientos(await fetchByFecha(texto));
        }

        const cat = categorias.find(
          (c) => c.name.toLowerCase() === texto
        );
        if (cat) {
          return setMovimientos(await fetchByCategoria(cat._id));
        }

        cargarMovimientos();
      } catch (e) {
        setError("Error en búsqueda: " + e.message);
      }
    },
    [categorias, cargarMovimientos]
  );

  useEffect(() => {
    buscarBackend(busqueda);
  }, [busqueda, buscarBackend]);

  // ---------- Render ----------
  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-semibold mb-6 text-center text-rose-700">
        Movimientos
      </h1>

      {/* Formulario de creación */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-6"
      >
        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded text-center">
            {error}
          </p>
        )}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Descripción
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            rows={2}
            className="w-full border rounded p-2 focus:outline-rose-600"
            placeholder="Descripción del movimiento"
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Monto</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleInputChange}
              className="w-full border rounded p-2 focus:outline-rose-600"
              placeholder="Ej. 100"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Tipo</label>
            <select
              name="type"
              value={form.type}
              onChange={handleInputChange}
              className="w-full border rounded p-2 focus:outline-rose-600"
              required
            >
              <option value="Ingreso">Ingreso</option>
              <option value="Egreso">Egreso</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Categoría</label>
            <select
              name="category"
              value={form.category}
              onChange={handleInputChange}
              className={`w-full border rounded p-2 focus:outline-rose-600 transition
                ${form.category && categorias.find(cat => cat._id === form.category)?.colorClass || ""}
              `}
              required
            >
              {categorias.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-rose-600 hover:bg-rose-800 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          Agregar Movimiento
        </button>
      </form>

      {/* Buscador */}
      <div className="flex items-center border-b border-gray-300 pb-2 mb-6 max-w-md mx-auto">
        <Search size={20} className="text-gray-400 mr-2" />
        <input
          type="search"
          placeholder="Buscar por tipo, fecha (YYYY-MM-DD) o categoría..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full p-2 focus:outline-rose-600 rounded"
        />
      </div>

      {/* Lista de movimientos */}
      <div className="space-y-4">
        {movimientos.length === 0 ? (
          <p className="text-center text-gray-500 italic">No hay movimientos.</p>
        ) : (
          movimientos.map((tx) => <Card key={tx._id} transaction={tx} />)
        )}
      </div>
    </section>
  );
};

export default Movimientos;
