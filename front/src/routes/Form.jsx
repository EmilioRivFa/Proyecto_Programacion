import { useState } from "react";
import InputForm from "../components/InputForm";
import Button from "../components/Button";
import { login, register } from "../js/formularioLogin";

const Form = ({ ruta }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isRegister, setIsRegister] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
    setErrorMsg("");
  };

  const handleRegister = async () => {
    const res = await register(formData.email, formData.password);
    if (res) {
      alert("Registro exitoso. Ahora inicia sesión.");
      setIsRegister(false);
    }
  };

  const handleLogin = async () => {
    const res = await login(formData.email, formData.password);
    if (res?.token) {
      ruta("/dashboard");
    } else {
      setErrorMsg("Credenciales inválidas. Verifica tu email y contraseña.");
    }
  };

  const manejarFormulario = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (isRegister) {
      await handleRegister();
    } else {
      await handleLogin();
    }
  };

  return (
    <form
      onSubmit={manejarFormulario}
      className="w-full max-w-md mx-auto my-10 px-8 py-6 bg-gray-900 rounded-2xl shadow-2xl text-white flex flex-col gap-6 transition-all duration-300"
    >
      <h1 className="text-cyan-400 text-4xl font-extrabold text-center">
        {isRegister ? "Crea tu cuenta" : "Iniciar Sesión"}
      </h1>

      <p className="text-sm text-gray-300 text-center">
        {isRegister ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}{" "}
        <span
          className="text-cyan-300 hover:text-cyan-200 underline cursor-pointer transition"
          onClick={toggleForm}
        >
          Haz clic aquí
        </span>
      </p>

      {errorMsg && (
        <div className="bg-red-500/10 text-red-400 p-3 rounded-md text-center text-sm">
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Correo electrónico</label>
          <InputForm
            evt={handleInputChange("email")}
            type="email"
            placeHolder="correo@ejemplo.com"
            isRequired={true}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Contraseña</label>
          <InputForm
            evt={handleInputChange("password")}
            type="password"
            placeHolder="*******"
            isRequired={true}
          />
        </div>

        <Button text={isRegister ? "Registrarse" : "Iniciar sesión"} />
      </div>
    </form>
  );
};

export default Form;
