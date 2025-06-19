import { CircleArrowUp, CircleArrowDown } from "lucide-react";
import React from "react";

const Card = ({ transaction }) => {
  const { description, amount, date, type, category } = transaction;
  const color = type === "ingreso" ? "rose" : "violet";

  return (
    <li className={`p-4 bg-white shadow rounded flex justify-between items-center w-full max-w-xl border-l-8 border-${color}-600`}>
      <div>
        <p className={`flex text-lg font-bold text-${color}-600 items-center gap-2`}>
          {type === "ingreso" ? <CircleArrowUp size={28} strokeWidth={3} /> : <CircleArrowDown size={28} strokeWidth={3} />}
          {description}
        </p>
        <p className="text-sm text-slate-600">Categoría: {category?.name || "Sin categoría"}</p>
      </div>
      <div className="text-end">
        <p className={`text-lg font-bold text-${color}-600`}>${amount}</p>
        <p className="text-sm text-slate-500">{new Date(date).toLocaleDateString()}</p>
      </div>
    </li>
  );
};

export default Card;
