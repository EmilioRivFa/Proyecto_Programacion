import { LogOut, LayoutDashboard, FolderKanban, ListOrdered } from "lucide-react";

const NavBar = ({ ruta, setRutas }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
localStorage.removeItem("ruta");
    setRutas("/");
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { label: "Categorías", path: "/categorias", icon: <FolderKanban size={18} /> },
    { label: "Movimientos", path: "/movimientos", icon: <ListOrdered size={18} /> },
  ];

  return (
    <nav className="w-full bg-white shadow-md px-4 py-3">
      <ul className="flex justify-between items-center flex-wrap">
        {/* Navegación izquierda */}
        <div className="flex gap-6 items-center text-sm md:text-base font-medium">
          {navItems.map((item) => (
            <li
              key={item.path}
              className={`flex items-center gap-1 cursor-pointer pb-1 border-b-2 transition-colors duration-200
                ${ruta === item.path
                  ? "text-rose-600 border-rose-600"
                  : "text-slate-600 border-transparent hover:border-rose-400 hover:text-rose-500"}
              `}
              onClick={() => setRutas(item.path)}
            >
              {item.icon}
              {item.label}
            </li>
          ))}
        </div>

        {/* Botón cerrar sesión */}
        <li
          onClick={handleLogout}
          className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-red-500 transition-colors font-medium"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
