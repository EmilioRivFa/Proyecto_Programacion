import React from "react";
import Card from "../components/Card";
import { Search } from "lucide-react";

function Movimientos() {
  return (
    <section className="w-full">
      <form action="bg-white shadow text-center flex flex-col items-center"
        onSubmit={(e)=>{
          e.preventDefault();
          console.log("Movimineto");
        }}
      >
        <h1 className="text-3xl">Movimientos</h1>
        <div className="flex flex-col w-fit items-start">
          <label className="text-slate-600">Descripción:</label>
          <textarea
            className="w-[300px] bg-stone-100 border border-slate-500 focus:outline-none focus:border-emerald-400"
            rows={2}
          ></textarea>
        </div>
        <div className="flex flex-col w-fit items-start">
          <label className="text-slate-600">Monto:</label>
          <input
            className="w-[300px] bg-stone-50 border border-slate-500 focus:outline-none focus:border-emerald-400"
            type="numver"
          />
        </div>
        <div className="flex flex-col w-fit items-start">
          <label className="text-slate-600">Tipo:</label>
          <select
            className="w-[300px] bg-stone-50 border border-slate-500 focus:outline-none focus:border-emerald-400"
            type="numver"
          >
            <option value="ingreso">Ingreso</option>
            <option value="egreso">Egreso</option>
          </select>
        </div>
        <div>
          <label>Categoria</label>
          <select>
            <option value="">Categoria 1</option>
            <option value="">Categoria 2</option>
            <option value="">Categoria 3</option>
            <option value="">Categoria 4</option>
          </select>
        </div>

        <div className="flex justify-end w-fit">
          <button className="bg-emerald-400 text-white rounded px-2 py-1 hover:bg-emerald-600 my-3">
            Agregar
          </button>
        </div>
      </form>
      <form className="w-full flex justify-end">
        <div className="w-full items-center mt-3 border-b me-3 gap-2 ">
          <Search />
          <input
            type="text"
            placeholder="Filtrar reultados"
            className="focus:outline-none"
          />
        </div>
      </form>

      <ul className="flex flex-col w-full h-full p-5 items-center gap-2">
        <Card type="ingreso" color="emerald" />
        <Card type="egreso" color="rose" />
        <Card type="ingreso" color="emerald" />
        <Card type="egreso" color="rose" />
        <Card type="ingreso" color="emerald" />
        <Card type="egreso" color="rose" />
      </ul>
    </section>
  );
}

export default Movimientos;
