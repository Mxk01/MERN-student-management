import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import { Link,useNavigate } from 'react-router-dom';
import NavigationBoard from '../../../Partials/NavigationBoard';
import { useAuth } from '../../../../context/AuthContext';
import { Navbar,NavDropdown,Nav,Container,Button,Badge} from 'react-bootstrap'
import { bearerConfig } from '../../../../config';
function GestiuneMaterii() {
    let [student,setStudent] = useState('');
    let [dataInceput,setDataInceput] = useState('')
    let [dataSfarsit,setDataSfarsit] = useState('')
    let [ziua,setZiua] = useState('')
    let navigate = useNavigate();
    let [teachers,setTeachers] = useState([])
    let [errorMessage,setErrorMessage] = useState('')
    let [isCourse,setIsCourse] = useState(false);
    let [isLaborator,setIsLaborator] = useState(false);
    let [isSeminar,setIsSeminar] = useState(false); 
    let [credite,setCredite] = useState(0);
    let [courseName,setCourseName] = useState('');    
    let [taughtByTeacherId,setTaughtBy] = useState('');   
     let {}  = useAuth() 
     useEffect(()=>{
        let getTeachers = async()=>{
            let teachers = await axios.get('/auth/teachers-list',{
                headers : {'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('student')).data.token}`}

            })
            console.log(teachers.data.message);
            setTeachers(teachers.data.message)
         }
        getTeachers();
     },[])

     let  addCourse = async(
      name,
      credite,
      isSeminar,
      isLaborator,
      isCourse,
      dataInceput,
      dataSfarsit,
      ziua,
      taughtBy) =>{
        let addedCourse = await axios.post('/auth/add-course',
        {name,credite,isSeminar,isLaborator,isCourse,dataInceput,dataSfarsit},bearerConfig)
        console.log(addedCourse)
        if(addedCourse.data.error){
                 setErrorMessage('Un curs cu aceeasi denumire deja exista!')
          }
          else {
               navigate('/cursurile-mele')
          }
     }
  return (
    <>
      
    <div className='panou_student'> 
    <NavigationBoard/>
     <div className='register__side'> 
     <div className='lista__header'> </div>

   <Form>
   <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Denumire materie</Form.Label>
        <Form.Control type="text"  onChange={(e)=> setCourseName(e.target.value) } placeholder="" />
       
      </Form.Group>
      <Form.Group>
      <Form.Label>Credite</Form.Label>
        <Form.Control type="number"
         onChange={(e)=> setCredite(e.target.value) }  placeholder="" />
       
      </Form.Group>
       
      <Form.Group className='d-flex mt-4'>
      <Form.Check 
       className="ms-3"
        type="switch"
        onClick={()=>setIsSeminar(!isSeminar)}

        id="custom-switch"
        label="Seminar"
      />
       <Form.Check 
       className="ms-3"
        type="switch"
        onClick={()=>setIsCourse(!isCourse)}

        id="custom-switch"
        label="Curs"
      />
       <Form.Check 
       className="ms-3"
        type="switch"
        onClick={()=>setIsLaborator(!isLaborator)}

        id="custom-switch"
        label="Laborator"
      />
      </Form.Group>
      <Form.Group className="d-flex justify-content-center py-3"> 
      <Form.Group> 
        <Form.Label>Data Inceput</Form.Label>
      <input type="time" className='ms-3' id="appt" name="appt"
       onChange={(e)=>setDataInceput(e.target.value)}
       min="08:00" max="18:00" required/>
       </Form.Group>
       <Form.Group className="ms-3"> 
        <Form.Label>Data Sfarsit</Form.Label>
      <input type="time" className='ms-3' id="appt" name="appt"
       onChange={(e)=>setDataSfarsit(e.target.value)}
       min="08:00" max="18:00" required/>
       </Form.Group>
       </Form.Group>

       <Form.Group> 
        <Form.Select onChange={(e)=>{setZiua(e.target.value)}}>
        <Form.Label> Ziua </Form.Label>
          { ['Luni','Marti','Miercuri','Joi','Vineri'].map(day => { 
         return  <>  
             
            <option>
            {day}
          </option>
          </> 
          })}
        </Form.Select>
       </Form.Group>
    { errorMessage ? <Badge bg="danger">{errorMessage}</Badge> : '' }
      
      <Button variant="primary" className="ms-3 mt-2" type="submit"
      onClick={(e)=>{
          e.preventDefault();
          let teacherEmail = JSON.parse(localStorage.getItem('student')).data.isTeacher ? JSON.parse(localStorage.getItem('student')).data.email : '';
          addCourse(courseName,credite,isSeminar,isLaborator,isCourse,dataInceput,dataSfarsit,ziua)
      }}>
        Submit
      </Button>
    </Form>
    </div>
    </div>
   </>
  )
}

export default GestiuneMaterii