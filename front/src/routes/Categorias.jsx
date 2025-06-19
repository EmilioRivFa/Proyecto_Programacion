import { useState, useEffect } from "react";
import { Blocks } from "lucide-react";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState("");

  // Obtener categorías al montar el componente
  useEffect(() => {
    fetch("http://localhost:3001/category", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener categorías");
        return res.json();
      })
      .then((data) => setCategorias(data))
      .catch((err) => console.error(err));
  }, []);

  // Enviar nueva categoría
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name: nombreCategoria }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al agregar categoría");
        return res.json();
      })
      .then((data) => {
        setCategorias((prev) => [...prev, data]); // Agrega la nueva categoría
        setNombreCategoria(""); // Limpia el input
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className="w-full h-full p-4">
      <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
        <h1 className="text-3xl flex gap-3 items-center">
          Categorías <Blocks />
        </h1>

        <div className="flex flex-col">
          <label className="font-bold text-slate-700">Nombre</label>
          <input
            type="text"
            placeholder="gastos de casa ...."
            required
            value={nombreCategoria}
            onChange={(e) => setNombreCategoria(e.target.value)}
            className="focus:outline-none border border-2 border-slate-400 rounded px-2"
          />
        </div>

        <div className="flex w-3/10 justify-end">
          <button
            type="submit"
            className="mt-2 bg-emerald-600 text-white px-4 py-1 rounded hover:bg-emerald-800"
          >
            Agregar
          </button>
        </div>
      </form>

      <ul className="w-7/10 mx-auto mt-3">
        {categorias.map((categoria, index) => (
          <li
            key={index}
            className="my-1 shadow-lg ps-3 text-2xl hover:scale-x-110 transition duration-500 bg-white font-bold text-slate-600 rounded"
          >
            {categoria.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Categorias;
