import { useState } from "react";
import "./App.css";

function App() {
  // single todo
  const [todo, setTodo] = useState("");

  // collection todos
  const [todos, setTodos] = useState([]);

  // editing
  const [editingTodo, setEditingTodo] = useState({ id: null, text: "" });

  // Upload
  const handleUpload = () => {
    if (todo.length > 0) {
      setTodos([...todos, { id: Date.now(), text: todo }]);
    }
  };

  // deletee
  const handleDelete = (id) => {
    console.log(id);
    const updatedToDos = todos.filter((item) => item.id != id);
    setTodos(updatedToDos);
  };

  // Edit

  const handleEdit = (id, text) => {
    setEditingTodo({ id, text });
  };

  const handleUpdate = () => {
    const updatedTodos = todos.map((item) =>
      item.id === editingTodo.id ? 
      { id: editingTodo.id, text: editingTodo.text }
        : item
    );
    setTodos(updatedTodos);
    setEditingTodo({ id: null, text: "" });
  };

  return (
    <div className="h-screen bg-gradient-to-r from-teal-200 to-violet-600">
      <div className="flex  items-center flex-col pt-32">
        {/* Heading */}
        <div className="">
          {" "}
          <h1 className="bg-white text-red-500  text-3xl font-bold rounded-full border px-10 py-2  ">
            ToDo List
          </h1>
        </div>

        {/* input Box and Button */}
        <div className="m-4 border bg-white rounded-full w-1/3 p-3 flex items-center mt-8">
          <input
            className="w-full mx-5 outline-none text-2xl"
            type="text"
            placeholder="Enter a Todo"
            onChange={(e) => setTodo(e.target.value)}
          />
          <i
            onClick={() => handleUpload()}
            class="fa-solid fa-plus me-3 border rounded-full p-3 bg-red-500 text-white"
          ></i>
        </div>

        {/* show list */}
        <div className=" w-1/3 p-4">
          {todos?.length > 0 ? (
            <div className="row">
              <div className="flex justify-between">
                <h1 className="border w-24 bg-white rounded-full items-start py-2 px-6 font-bold mb-2">
                  TASKS:
                </h1>
                {/* main input btn */}
                {todos?.length > 1 && (
                  <button
                    onClick={() => setTodos([])}
                    className="btn rounded-full bg-white w-10 h-10 flex justify-center items-center"
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                )}
              </div>

              <div className="flex w-full justify-center items-center rounded-2xl p-3 bg-white flex-col">
                {/* list show */}
                {todos.map((obj, index) => (
                  <div className="flex w-full justify-between items-center border-b p-2">
                    {/* text */}
                    <h1>
                      {editingTodo.id === obj.id ? (
                        <input
                          className="outline-none text-red-500 text-lg"
                          type="text"
                          value={editingTodo.text}
                          onChange={(e) =>
                            setEditingTodo({ id: obj.id, text: e.target.value })
                          }
                        />
                      ) : (
                        <span className="ms-1 text-lg">
                          {index + 1}. {obj.text}
                        </span>
                      )}
                    </h1>

                    {/*button  */}
                    <div className=" flex justify-between items-center">
                      {editingTodo.id === obj.id ? (
                        <button
                          onClick={handleUpdate}
                          className="text-red-500 me-3"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(obj.id, obj.text)}
                          className="text-green-500 me-3 text-lg"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(obj.id)}
                        class="fa-solid text-lg fa-trash text-red-400 ms-5"
                      ></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h1 className="text-center font-medium text-2xl">
              No Tasks has been added
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
