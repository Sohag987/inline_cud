import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students,setStudents] = useState([]);
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    course:""

  });
  const [error,setError] = useState();
  const [loading,setLoading] = useState(true);
  // fetching  data 
  const fetchStudents = async ()=>{

     const res = await axios.get("http://localhost:5000/students");

     if(error){
      setError(error);
      setLoading(false);
     }
      console.log(res);
     setStudents(res.data);

  };
  useEffect(()=>{
    fetchStudents();
  },[]);


// a function for  handling input 
  const handleChange = (e)=>{
    setFormData(
      {...formData,
      [e.target.name]:e.target.value
      }
    );
  };

  // add data 
  const addStudent = async ()=>{
    try{
      const response = await axios.post("http://localhost:5000/students",formData);

    }catch{

    }
    


  }






  return (
    <div className="container">
      <h1>Crud app with inline Updat</h1>
      <div className="form">
        <input 
        type = 'text'
        name = 'name'
        placeholder='name'
        // value={}
        onChange={handleChange}
        />

         <input 
        type = 'text'
        name = 'email'
        placeholder='email'
        // value={}
        onChange={handleChange}
        />

         <input 
        type = 'text'
        name = 'course'
        placeholder='course'
        // value={}
        onChange={handleChange}
        />

        <button >Add</button>


      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>COURSE</th>


          </tr>
        </thead>
      </table>
    </div>
  );
}

export default App;
