import React, { useEffect,useState } from 'react'
import {useParams} from 'react-router-dom'
import NavigationBoard from '../../Partials/NavigationBoard';
import axios from 'axios'
function SituatieScolara() {
 let params = useParams();
 let [studentProfile,setStudentProfile] = useState({});
 let [userLogs,setUserLogs] = useState([])

 useEffect(()=>{
  let getLogs = async () =>  {
  
   let logs = await axios.get(`/auth/selected-user-logs/${params.email}`,{
    headers : {'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('student')).data.token}`}})
  
      console.log(logs.data)
    setUserLogs(logs.data.userLogs)
    
  }
  
getLogs()
 },[])

 useEffect(()=> {
 let getStudent  = async()=>{ 
 let student = await axios.get(`/auth/student/${params.email}`);

 if(student.status==200 && student.data.student!=null && !student.data.student.isTeacher) {
  console.log("User found!") 
  console.log(student.data.student);
  setStudentProfile(student.data.student)

 }
 }
  getStudent();
},[]);
    return (
    <div>
        <NavigationBoard/>
       
        <div className='lista__header'/>
        <React.Fragment className="d-flex"> 
        {studentProfile ?  <React.Fragment >
           <div className="card ms-5 d-flex"  style={{width: '18rem'}}>
  <div class="card-body  ">
    <h5 class="card-title">{studentProfile.username}</h5>
    <p class="card-text">Student la specializarea {studentProfile.departament}.</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Inregistrat la data de {studentProfile.createdAt}</li>
    <li class="list-group-item">Anul : {studentProfile.an}</li>
    <li class="list-group-item">Restantier :  {studentProfile.hasFailedClasses ?  "Da" : "Nu"} </li>
  </ul>
  <div class="card-body">
  
  </div>
</div>
        </React.Fragment> : '' }
        <div class="overflow-hidden">
         {
         userLogs!=undefined  &&  userLogs.map(log => {
            return (
              
              <React.Fragment>
                

                <div class="p-3 mb-2  rounded bg-primary bg-gradient text-white ms-3 mt-3" style={{width:"40vw"}}>

               <p>Notificare : {log.data_intrarii}</p>
               <p>{log.entryMessage}</p>
               </div>
              
              </React.Fragment>
            )
          }
          )
          
         }
           </div>
           </React.Fragment> 
      </div>
  )
}

export default SituatieScolara