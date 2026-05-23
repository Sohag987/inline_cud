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
  
  // fetching  data 
  const fetchStudents = async ()=>{

     const res = await axios.get("http://localhost:5000/students");

     if(error){
      setError(error);
      
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
      fetchStudents();
      console.log("User added");
      setFormData(
        {
          name:"",
          email:"",
          course:""
        }
      );

    }catch(error){
      setError(error);
      

    }
    


  };

  //inlineupdate 
  const updateStudent = async (id,field,value )=>{
    const student  = students.find((s)=> s.id === id);

    const updatedStudent = {
      ...student,
      [field]:value
    };

    const response = await axios.put(`http://localhost:5000/students/${id}`,updatedStudent);
    fetchStudents();
    console.log(response);
   
  };

  // Delete crud opretaipn 

  const deletestudent = async (id)=>{

    await axios.delete(`http://localhost:5000/students/${id}`);

    fetchStudents();

  };

 

  if (error){
    return (
      <h1>
        {error.data.response}
      </h1>
    )
  }

return (
    <div className="container">
      <h1>Crud app with inline Updat</h1>
      <div className="form">
        <input 
        type = 'text'
        name = 'name'
        placeholder='name'
        value={formData.name}
        onChange={handleChange}
        />

         <input 
        type = 'text'
        name = 'email'
        placeholder='email'
        value={formData.email}
        onChange={handleChange}
        />

         <input 
        type = 'text'
        name = 'course'
        placeholder='course'
        value={formData.course}
        onChange={handleChange}
        />

        <button  onClick={addStudent}>Add</button>


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
        <tbody>
          {
            students.map((s)=>(
              <tr key={s.id}>
                <td>{s.id}</td>
                <td><input value={s.name} onChange={(e)=>{updateStudent(s.id,"name",e.target.value)}}/></td>
                <td><input value={s.email} onChange={(e)=>{updateStudent(s.id,"email",e.target.value)}}/></td>
                <td><input value={s.course} onChange={(e)=>{updateStudent(s.id,"course",e.target.value)}}/></td>
                <td onClick={()=>{deletestudent(s.id)}}>DELETE</td>
                </tr>

            )
          )
          }

        </tbody>
      </table>
    </div>
  );
}

export default App;
