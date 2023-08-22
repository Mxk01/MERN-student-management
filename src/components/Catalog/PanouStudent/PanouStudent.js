import React, {useState,useEffect} from 'react'
import './PanouStudent.css'
import Form from 'react-bootstrap/Form';
import { Link,useNavigate } from 'react-router-dom';
import { Navbar,NavDropdown,Nav,Container,Button} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios  from 'axios'
import {io} from 'socket.io-client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PanouStudent() {
  const [startDate, setStartDate] = useState(new Date());
    let [isPresent,setIsPresent] = useState(false)
    let [student,setStudent] = useState('');
    let navigate = useNavigate();
    let [courses,setCourses] = useState([]);
    let [socket,setSocket] = useState(null);
    let [curs,setCurs] = useState('')
    let [facultate,setFacultate] = useState('')
    useEffect(() => {
      setSocket(io("http://localhost:5002"));
    }, []);
    let [isAttendingCourse,setIsAttendingCourse] = useState(false)

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const hour = `${current.getHours()}:${current.getMinutes()<10 ? '0'+current.getMinutes() :current.getMinutes() }`;
    let updateCourse = async() => {
      let entryMessage = `Studentul ${JSON.parse(localStorage.getItem('student')).data.username} din cadrul
      Facultatii de ${facultate}
      a intrat la cursul de ${curs} pe data de ${date} la ora :  ${hour}.`;
            if(isPresent) {
             toast(entryMessage)
             // store this message in log data , 
             await axios.post('/auth/add-user-log',{userEmail:JSON.parse(localStorage.getItem('student')).data.email,entryMessage},{
              headers : {'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('student')).data.token}`}
               })
           let updatedCourses =   await axios.put('/auth/courses',{name:curs},{
            headers : {'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('student')).data.token}`}
             })

             if(JSON.parse(localStorage.getItem('student')).data.isTeacher==false && isPresent){
              console.log(`Is teacher? nope! `)
             socket?.emit('student-connected',entryMessage);
            }
                if(updatedCourses.data.modifiedCount==1){
                  toast(`Ati intrat la cursul de ${curs}`)
                }
           }
    }

    useEffect(()=>{
      let getCourses = async() => {
     let courses = await axios.get('/auth/courses',{
     headers : {'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('student')).data.token}`}
      });
     setCourses(courses.data.message)
      }
      getCourses();
    },[])
    
    

  return (
    <>
      <Navbar sticky="top" style={{backgroundColor:'white'}}  className="w-100" expand="lg">
      <Container>
        <Navbar.Brand className="hover__style">
        
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
       
                        <p className='shortcut__avatar'>{JSON.parse(localStorage.getItem('student')).data.username[0]}</p>

           
            <NavDropdown 
            
            title={`Welcome  ${JSON.parse(localStorage.getItem('student')).data.username}`  } id="basic-nav-dropdown">
                <NavDropdown.Item  href="/change-password">Modificare Parola</NavDropdown.Item>
                <NavDropdown.Item  href="/cursurile-mele">Cursurile mele</NavDropdown.Item>

     
             <NavDropdown.Item style={{textDecoration:'none',color:'black'}} 
                onClick={()=> { 
                localStorage.removeItem('student')
                setStudent(null);
               
               }}
               href="/login">Deconectare</NavDropdown.Item>
        
            </NavDropdown>

          
       
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {/* <div style={{backgroundColor:'red',width:'100vw',height:'40vh'}}></div> */}

    <div className='panou_student'> 
   <div className="panou__side"><span>Completati formularul de prezenta</span></div>
   <div className="panou__side2">
    <Form>
 
    <Form.Group className="d-flex">
   
      <Form.Group className="mb-3 p-3 d-flex " controlId="formBasicEmail">
        
    
    <Form.Select  onChange={(e)=>{setCurs(e.target.value)}} className="me-3" aria-label="Default select example">
      <option>Curs</option>
    {
       courses && courses.map((course,index)=>{
        return <React.Fragment key={index}>
          <option>{course.name}</option>
        </React.Fragment>
       })
    }
    </Form.Select>
    <Form.Select 
     onChange={(e)=>setFacultate(e.target.value)}
    aria-label="Default select example">
      <option>Facultate</option>
      <option value="Inginerie">Inginerie</option>
      <option value="Drept si Administratie Publica">Drept si Administratie Publica</option>
      <option value="Economie si Administrarea Afacerilor">Economie si Administrarea Afacerilor</option>
    </Form.Select>
    </Form.Group> 
       </Form.Group>
     
       <Form.Check 
       className="ms-3"
        type="switch"
        id="custom-switch"
        label="Prezent"
        value={isPresent}
        onChange={(e)=>setIsPresent(e.target.value)}
      />
      <Button variant="primary" className="ms-3 mt-2" 
      onClick={(e)=> { 
        e.preventDefault();
        updateCourse();
      }} type="submit">
        Submit
      </Button>
    </Form>
    <ToastContainer />
    </div>
 
    </div>
   </>
  )
}

export default PanouStudent