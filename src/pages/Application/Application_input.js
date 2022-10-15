import { useState } from "react";
import api from "../../api/api";
import { FetchState, useGetTodos } from "../../hooks";
import { Server } from "../../utils/config";
import Alert from "../Alert/Alert";
import TodoItem from "./Application_display";

const Application_input = ({ user, dispatch }) => {
  /*const [stale, setStale] = useState({ stale: false });
  const [{ todos, isLoading, isError }] = useGetTodos(stale);
  const [currentTodo, setCurrentTodo] = useState("");

  const handleAddTodo = async (e) => {
    e.preventDefault();
    console.log("Adding Todo");
    const data = {
      content: currentTodo,
      isComplete: false,
    };
    console.log(data, user);
    try {
      await api.createDocument(
        Server.collectionID,
        data,
        [`user:${user["$id"]}`],
        [`user:${user["$id"]}`]
      );
      setStale({ stale: true });
      setCurrentTodo("");
    } catch (e) {
      console.log("Error in adding todo");
    }
  };


  const handleLogout = async (e) => {
    dispatch({ type: FetchState.FETCH_INIT });
    try {
      await api.deleteCurrentSession();
      dispatch({ type: FetchState.FETCH_SUCCESS, payload: null });
    } catch (e) {
      dispatch({ type: FetchState.FETCH_FAILURE });
    }
  }

  return (
    <>
      <section className="container h-screen max-h-screen px-3 max-w-xl mx-auto flex flex-col">
        {isError && <Alert color="red" message="Something went wrong..." />}
        <div className="my-auto p-16 rounded-lg text-center">
          <div className="font-bold text-3xl md:text-5xl lg:text-6xl">
            📝 <br /> &nbsp; toTooooDoooos
          </div>

          <form onSubmit={handleAddTodo}>
            <input
              type="text"
              className="w-full my-8 px-6 py-4 text-xl rounded-lg border-0 focus:ring-2 focus:ring-gray-800 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl shadow-md"
              placeholder="🤔   What to do today?"
              value={currentTodo}
              onChange={(e) => setCurrentTodo(e.target.value)}
            ></input>
          </form>

          {isLoading && <h1> Loading .... </h1>}

          <ul>
            {todos.map((item) => (
              <TodoItem key={item["$id"]} item={item} setStale={setStale} />
            ))}
          </ul>
        </div>
      </section>

      <section className="absolute bottom-0 right-0 py-3 px-6 mr-8 mb-8">
        <button onClick={handleLogout} className="mx-auto mt-4 py-3 px-12 font-semibold text-md rounded-lg shadow-md bg-white text-gray-900 border border-gray-900 hover:border-transparent hover:text-white hover:bg-gray-900 focus:outline-none">
          Logout 👋
        </button>
      </section>
    </>
  );*/
  return (
    <form class="grid place-items-center">
    <div class="">
      <div class="w-full px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Company Name
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-company-name" type="text" placeholder="Google"/>
        <p class="text-red-500 text-xs italic">Please fill out this field.</p>
      </div>
    </div>
    <div class="">
      <div class="w-full px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
          Company Link
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-company-link" type="text" placeholder="www.google.com"/>
        <p class="text-red-500 text-xs italic">Please fill out this field.</p>
      </div>
    </div>
    <div class="">
      <div class="w-full px-3 mb-6 md:mb-0">
        <div class="datepicker w-full px-3 mb-6 md:mb-0" data-mdb-toggle-button="false">
          <label for="grid-city" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Select a date</label>
          <input type="text"
            class="form-control block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Select a date" />
          <button class="datepicker-toggle-button" data-mdb-toggle="datepicker">
            <i class="fas fa-calendar datepicker-toggle-icon"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="">
      <div class="w-full px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-status">
          Status
        </label>
        <div class="relative">
          <select class="appearance-none block w-60 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-status">
            <option>ur mom</option>
            <option>ur dad</option>
            <option>ur sis</option>
            <option>ur dog</option>
          </select>
        </div>
      </div>
    </div>
  </form>
  );
};

export default Application_input;
