// Dashboard.jsx
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { fetchMovimientos } from "../js/transactionApi";

const Dashboard = () => {
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return (window.location.href = "/");

    const loadMovimientos = async () => {
      try {
        const data = await fetchMovimientos();
        const ultimos = data.slice(-6).reverse(); 
        setMovimientos(ultimos);
      } catch (e) {
        console.error(e);
      }
    };



    
loadMovimientos();
  }, []);

  return (
    <section className="w-full p-4">
      <h1 className="text-center text-slate-800 text-3xl font-bold mb-4">Últimos 6 movimientos</h1>
      <div className="flex flex-col gap-4 items-center">
        {movimientos.map((tx) => (
          <Card key={tx._id} transaction={tx} />
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
