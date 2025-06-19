import { useState } from "react";
import InputForm from "../components/InputForm";
import Button from "../components/Button";
import { login, register } from "./js/formularioLogin";

const Form = ({ ruta }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const manejarFormulario = async (e) => {
    e.preventDefault();
    if (isRegister) {
      await register(email, password);
      setIsRegister(false);
    } else {
      const success = await login(email, password);
      if (success) {
        ruta("/dashboard");
      }
    }
  };

  return (
    <form
      onSubmit={manejarFormulario}
      className="shadow-lg p-4 rounded bg-gray-700 flex flex-col items-center gap-5"
    >
      <h1 className="text-emerald-200 text-3xl text-center font-bold">
        {isRegister ? "Registrate." : "Iniciar Sesión"}
      </h1>

      <p className="text-xs">
        {isRegister ? "Ya tienes una cuenta." : "¿Aun no te registras?."}
        <span
          className="text-emerald-300 cursor-pointer"
          onClick={() => setIsRegister(!isRegister)}
        >
          {" "}
          Da click aqui.
        </span>
      </p>

      <div className="text-white bg-gray-600 rouned shadow w-full h-auto flex flex-col p-4 gap-2">
        <label>Email: </label>
        <InputForm
          evt={(e) => setEmail(e.target.value)}
          type={"email"}
          placeHolder={"correo@ejemplo.com"}
          isRequired={true}
          value={email}
        />
        <label>Password</label>
        <InputForm
          evt={(e) => setPassword(e.target.value)}
          type={"password"}
          placeHolder={""}
          isRequired={true}
          value={password}
        />
        <Button text={isRegister ? "Crear Cuenta" : "Ingresar"} />
      </div>
    </form>
  );
};

export default Form;
