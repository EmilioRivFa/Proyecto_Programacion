import React, { useState, useEffect } from 'react';
import Form from './routes/Form';
import Dashboard from './routes/Dashboard';
import NavBar from './components/NavBar';
import Categorias from './routes/Categorias';
import Movimientos from './routes/Movimientos';

const App = () => {
  // Persistir ruta desde localStorage
  const [ruta, setRuta] = useState(() => localStorage.getItem("ruta") || "/");

  // Guardar la ruta actual al cambiar
  useEffect(() => {
    localStorage.setItem("ruta", ruta);
  }, [ruta]);

  return (
    <div className="w-screen h-screen bg-slate-50 flex flex-wrap justify-center">
      {ruta !== "/" && <NavBar ruta={ruta} setRutas={setRuta} />}

      {
        ruta === "/" ? (
          <Form ruta={setRuta} />
        ) : ruta === "/dashboard" ? (
          <Dashboard />
        ) : ruta === "/categorias" ? (
          <Categorias />
        ) : ruta === "/movimientos" ? (
          <Movimientos />
        ) : null
      }
    </div>
  );
};

export default App;
