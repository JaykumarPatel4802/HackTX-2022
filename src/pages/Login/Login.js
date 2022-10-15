import { useState } from "react";
import api from "../../api/api";
import SignUp from "./SignUp";
import { FetchState } from "../../hooks";

const Login = ({ dispatch }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [register, setRegister] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: FetchState.FETCH_INIT });
    try {
      await api.createSession(email, password);
      const data = await api.getAccount();
      dispatch({ type: FetchState.FETCH_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: FetchState.FETCH_FAILURE });
    }
  };

  return register ? (
    <SignUp setRegister={setRegister} dispatch={dispatch} />
  ) : (
    <section className="grid container h-screen place-items-center">
      <div className="flex-grow flex flex-col max-w-xl justify-center p-6">
        <h1 className="text-6xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogin}>
          <label className="block mt-6"> Email</label>
          <input
            className="w-full p-4 placeholder-gray-400 text-gray-700 bg-white text-lg border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-900 position:relative left:50px"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            autoComplete="email"
          />
          <label className="block mt-6"> Password</label>
          <input
            className="w-full p-4 placeholder-gray-400 text-gray-700 bg-white text-lg border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-900"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            autoComplete="password"
          />

          <div className="mt-6 text-center">
            <button
              type="submit"
              disabled={!email || !password}
              className="content-center mx-auto mt-4 py-4 px-16 font-semibold rounded-lg shadow-md bg-gray-900 text-white border hover:border-gray-900 hover:text-gray-900 hover:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Login
            </button>
          </div>
          
        <p className="mt-6 text-center">
          {" "}
          Don't have an account ?{" "}
          <span
            className="cursor-pointer underline palce-item-center"
            onClick={() => setRegister(true)}
          >
            Sign Up
          </span>{" "}
        </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
