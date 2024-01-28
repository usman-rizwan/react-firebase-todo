import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./App.css";
import { MDBInput } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./index.css";
import {
  app,
  db,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
  doc
} from "./config/firebase";
function App() {
  const [todos, setTodo] = useState([]);
  const [value, setValue] = useState("");
  const addTodo = async () => {
    // {
    //   value.trim() == "" ? alert("Add valid input") :
    //   setTodo([...todos, { value, disabled: true }])
    //   setValue("")
    // }
    if (value.trim()) {
      const docRef = await addDoc(collection(db, "todos"), {
        todos: value,
        timestamp: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      setTodo([...todos, { data: { todos: value }, id: docRef.id }]);
      
      // setTodo([...todos, { value, disabled: true }]);
      // setValue("");
    } else {
      alert("Add valid input");
    }
  };
  const delTodo = async(id) => {
    let deleted = await deleteDoc(doc(db, "todos", id));
    console.log(deleted);

    // const allTodos = [...todos];
    // console.log(i);
    // allTodos.splice(i, 1);
    // setTodo(allTodos);

  };
  // const editTodos = (i, v) => {
  //   if (v.value.trim() !== "") {
  //     todos.splice(i, 1, { ...v, value: v.value, disabled: false });
  //     setTodo([...todos]);
  //   } else {
  //     todos.splice(i, 1);
  //     setTodo([...todos]);
  //   }
  // };

  const getTodos = () => {
    const q = query(collection(db, "todos"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // for (let index = 0; index < snapshot.docs.length; index++) {
      //   console.log(snapshot.docs[index].id );
      // }
      // console.log("snapshot" , snapshot.docs[1].id);
      const updatedTodos = snapshot.docs.map(
        (doc) => (console.log(doc.id), { data: doc.data(), id: doc.id })
      );
      setTodo(updatedTodos);
      console.log("Realtime todos -->", updatedTodos);
    });
  };

  const delAll = () => {
    setTodo([]);
  };
  useEffect(() => {
    getTodos();

    //  setTodo()
  }, []);

  return (
    <>
      <div className="container  p-5">
        <div className="d-flex justify-content-center items-center">
          <h1>Enter Your Todo</h1>
        </div>

        <div className=" d-flex justify-content-center itmes-center ">
          <div className="col-6">
            <MDBInput
              label="Todo"
              placeholder="Enter Todos"
              id="form1"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button className="btn btn-primary mb-2 mx-2" onClick={addTodo}>
            Add Todo
          </button>

          <button
            className="btn btn-danger mb-2 "
            disabled={todos.length < 1 && todos.length == 0 ? true : false}
            onClick={delAll}
          >
            Delete All
          </button>
        </div>
        <div className="d-flex justify-content-center items-center">
          <ol className="list-group list-group-light">
            {/* {console.log("map wala<<<",todos.map((v,i)=>console.log(v)))} */}
            { todos.map((v, i) => (
              <li className="mt-3" style={{ marginLeft: "20px" }} key={v.id}>
              {v.data.todos}
                {/* {v.disabled ? (
                  <button
                    className="btn btn-outline-success me-2"
                    onClick={() => editTodos(i, v)}
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    className="btn btn-success me-2"
                    onClick={() => {
                      v.disabled = true;
                      setTodo([...todos]);
                    }}
                  >
                    Update
                  </button>
                )} */}
                <button
                  className="btn btn-outline-danger "
                  onClick={() => delTodo(v.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

export default App;
