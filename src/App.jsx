import { useState } from "react";
import Swal from 'sweetalert2'
import "./App.css";
import { MDBInput } from 'mdb-react-ui-kit';
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./index.css"
function App() {
  const [todos, setTodo] = useState([])
  const [value, setValue] = useState("")
  const addTodo = () => {
    {
      value.trim() == "" ? alert("Add valid input") :
      setTodo([...todos, { value, disabled: true }])
      setValue("")
    }
  }
  const delTodo = (i) => {
    const allTodos = [...todos]
    console.log(i);
    allTodos.splice(i, 1)
    setTodo(allTodos)
  }
  const editTodos = (i, v) => {
    console.log(i, v);
    todos.splice(i, 1, { ...v, disabled: false })
    setTodo([...todos])
  }
  const delAll = () => {
    setTodo([])
  }
  

  return (
    <>
      <div className="container  p-5">
        <div className="d-flex justify-content-center items-center">

          <h1>Enter Your Todo</h1>
        </div>

        <div className=" d-flex justify-content-center itmes-center ">
          <div className="col-6">

            <MDBInput label='Todo' placeholder='Enter Todos' id='form1' type='text' value={value} onChange={(e) => setValue(e.target.value)} />
          </div>
          <button className="btn btn-primary mb-2 mx-2" onClick={addTodo}>Add Todo</button>
        
          <button className="btn btn-danger mb-2 " disabled={todos.length < 1 && todos.length == 0 ? true :false } onClick={delAll}>Delete All</button> 
        </div>
        <div className="d-flex justify-content-center items-center">

          <ol className="list-group list-group-light">
            {todos.map((v, i) => <li className="mt-3" style={{marginLeft:"20px"}} key={i}><input type="text" className="input-text"  style={{border:"0px" , borderBottom:"2px solid black" , backgroundColor:"transparent" ,  }} defaultValue={v.value} disabled={v.disabled} />
              {v.disabled ?
                <button className="btn btn-outline-success me-2" onClick={() => editTodos(i, v)}>Edit</button> :
                <button className="btn btn-success me-2" onClick={() => {
                  v.disabled = true
                  setTodo([...todos])
                }}>Update</button>
              }
              <button className="btn btn-outline-danger " onClick={() => delTodo(i)} >Delete</button>
            </li>)}
          </ol>
        </div>
      </div>
    </>
  );
}

export default App;