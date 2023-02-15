import React, { useState } from "react";

const initialRegisterForm = {
  email: '',
  password: '',
  username: '',
  firstName: '',
  lastName: '',
};

const RegisterForm = () => {
  const [extraFormVisible, setExtraFormVisible] = useState(false);
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);

  const setTxtInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm, 
      [evt.target.name]: evt.target.value
    });
  };

  const handleRegisterButton = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!extraFormVisible) {
      setExtraFormVisible(true);
      return;
    }
  };

  return (
    <div className="bg-white px-8 py-4 shadow rounded-xl max-w-lg border border-black border-opacity-5">
      <h3 className="text-3xl mb-2">
        Estamos <span className="font-signika">felices</span> de tenerte aquí. {":)"}
      </h3>
      <form className="flex flex-col gap-4">
       <p>{'>'} Provéenos un <span className="font-signika">email</span> y <span className="font-signika">contraseña</span>, ¡y estarás dentro!</p>
        <div className="flex flex-col gap-0 items-center">
          <label className="" htmlFor="email">Email</label>
          <input value={registerForm.email} onChange={setTxtInput}
            className="w-[85%] rounded-lg px-3 py-2 text-center bg-gray-100" id="email" name="email" type="text" />
        </div>
        <div className="flex flex-col gap-0 items-center">
          <label className="" htmlFor="password">Contraseña</label>
          <input value={registerForm.password} onChange={setTxtInput}
            className="w-[85%] rounded-lg px-3 py-2 text-center bg-gray-100" id="password" name="password" type="password" />
        </div>
        {extraFormVisible &&
        <>
          <p>{'>'} ¡Oh, no! Realmente necesitamos un <span className="font-signika">usuario único</span> para tu identidad online...</p>
          <div className="flex flex-col gap-0 items-center">
            <label className="" htmlFor="username">Mi nombre de usuario</label>
            <input value={registerForm.username} onChange={setTxtInput}
              className="w-[85%] rounded-lg px-3 py-2 text-center bg-gray-100" id="username" name="username" type="text" />
          </div>
          <p>{'>'} Y también algo formal para comunicarnos contigo en caso de que algo vaya mal. Mejor prevenir que lamentar.</p>
          <div className="flex flex-col gap-0 items-center">
            <label className="" htmlFor="firstName">Nombre(s)</label>
            <input value={registerForm.firstName} onChange={setTxtInput}
              className="w-[85%] rounded-lg px-3 py-2 text-center bg-gray-100" id="firstName" name="firstName" type="text" />
          </div>
          <div className="flex flex-col gap-0 items-center">
            <label className="" htmlFor="lastName">Apellido(s)</label>
            <input value={registerForm.lastName} onChange={setTxtInput}
              className="w-[85%] rounded-lg px-3 py-2 text-center bg-gray-100" id="lastName" name="lastName" type="text" />
          </div>
        </>
        }
        <button onClick={handleRegisterButton}
          className="hover:opacity-75 w-full py-3 px-3 bg-pink-500 rounded-xl text-white font-bold tracking-wide text-sm">Regístrame!</button>
      </form>
    </div>
  )
};

export default RegisterForm;
