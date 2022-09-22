import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import axios from "axios";




function App() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState(0);
  const [talant, setTalant] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);


  const [datas, setDatas] = useState([])
  const [search, setSearch] = useState("")
  const getData = async() => {
    try{
      const data = await axios.get("http://localhost:3001/employees")
      console.log(data.data);
      setDatas(data.data)
    }
    catch(e){
      console.log(e)
    }
  };
  useEffect(() =>{
    getData();
  },[]);
  
  

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      lastname: lastname,
      age: age,
      talant: talant,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          lastname: lastname,
          age: age,
          talant: talant,
          position: position,
          wage: wage,
        },
      ]);
    });
  };
  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
    window.location.reload();
  };

  return (
    <div className="App container">
      <div className="information">
        <h2>Employee Information</h2><br />
        <form action="">
          <div className="box">
            <input
              type="text"
              className="box-input"
              placeholder="Enter name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <label className="form-label" htmlFor="name">
              Name
            </label>
          </div>
          <div className="box">
            <input
              type="text"
              className="box-input"
              placeholder="Enter Lastname"
              onChange={(event) => {
                setLastname(event.target.value);
              }}
            />
            <label className="form-label" htmlFor="lastname">
              Lastname
            </label>
          </div>
          <div className="box">
            <input
              type="number"
              className="box-input"
              placeholder="Enter age"
              onChange={(event) => {
                setAge(event.target.value);
              }}
            />
            <label htmlFor="age">Age</label>
          </div>
          <div className="box">
            <input
              type="text"
              className="box-input"
              placeholder="Enter Talant"
              onChange={(event) => {
                setTalant(event.target.value);
              }}
            />
            <label htmlFor="Talant">Talant</label>
          </div>
          <div className="box">
            <input
              type="number"
              className="box-input"
              placeholder="Enter Wage"
              onChange={(event) => {
                setWage(event.target.value);
              }}
            />
            <label htmlFor="Wage">Wage</label>
          </div>
          <div className="box">
            <label htmlFor="Position" id="position">
              Position
            </label>
            <select
              onChange={(event) => {
                setPosition(event.target.value);
              }}
            >
              <option>Select a position</option>
              <option value="Programmer">Programmer</option>
              <option value="Database Management">Database Management</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Web Developer">Web Developer</option>
              <option value="Software Developer">Software Developer</option>
              <option value="Software engineer">Software engineer</option>
            </select>
          </div>
          <button onClick={addEmployee} class="btn btn-success">
            Add Employee
          </button>
          
          <hr />
        </form>
      
      </div>
      <div class="sgt">
        
      <input type="text" onChange={(e)=>{
          setSearch(e.target.value);
        }} placeholder="Search Employee"></input>
      </div>
      <div className="datatext">
        
      <div className="outputtext">
        
      <table class="table" id="myTable">
        <thead class="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name And Lastname</th>
            <th scope="col">Age</th>
            <th scope="col">Talant</th>
            <th scope="col">Position</th>
            <th scope="col">Wage</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {datas
          .filter((em)=>{
            if(search == ""){
              return em;
            }else if (em.name.toLowerCase().includes(search.toLowerCase())){
              return em;
            }
          })
          .map((em) =>{
            return(
              <tr key={em.id}>
                <td>{em.id}</td>
                <td>{em.name} {em.lastname}</td>
                <td>{em.age}</td>
                <td>{em.talant}</td>
                <td>{em.position}</td>
                <td>{em.wage}</td>
                <td><button className="btn btn-danger" onClick={()=> deleteEmployee(em.id)}>Del</button></td>
              </tr>
              
            )
          })}
        <tbody>
    
    
  </tbody>
      </tbody>
    </table>
    </div>
    </div>
      

      <div classname="bg">
        <div className="backgrounds-color">
        
        </div>
      </div>
    </div>
  );
}

export default App;
