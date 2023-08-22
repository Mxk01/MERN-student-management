import {useState} from 'react'
import './Register.css'
import { Button,Form,Navbar,NavDropdown,Nav,Container,Badge } from 'react-bootstrap'
import { useAuth } from '../../../context/AuthContext'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useFormik} from 'formik'

function Register() {
 

   
    let [isClicked,setIsClicked] = useState(true)


      let 
    {   errorMessage,
        
      teacherName,setTeacherName,
      teacherPassword,setTeacherPassword,
      teacherConfirmPassword,setTeacherConfirmPassword,
      teacherCode,setTeacherCode,
      teacherCNP,setTeacherCNP,
      teacherEmail,setTeacherEmail,
      register,
        confirmPassword,
        studentName,
        studentEmail,
        studentPassword,
        studentCNP,
        setConfirmPassword,
        setStudentName,
        setStudentEmail,
        setStudentPassword,
        setStudentCNP
    } = useAuth()

  

  return ( <div className='register__main'>
        <div className='register__sideImage'>

        </div>
           
   

    { isClicked ? (
    <div className='register__side'> 
  
    <Form>
        
    <img className='fluid'
       src="https://cdn-icons-png.flaticon.com/512/2491/2491056.png" style={{width:'150px',height:'150px',
    objectFit:'cover',alignSelf:'center',boxShadow: '-1px 7px 15px 5px rgba(0,0,0,0.1)',
    borderRadius:'50%'}}></img>    
           <Button onClick={(e)=>setIsClicked(false)}> {'>>'} Teacher Panel </Button>

    <Form.Group className="mb-3" controlId="formBasicEmail">
       
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" onChange={(e)=>setStudentName(e.target.value)} placeholder="Enter username" />
        
      </Form.Group>
      {errorMessage ?  <Badge bg="danger"> {errorMessage} </Badge> : ' '}   
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" onChange={(e)=>setStudentEmail(e.target.value)} placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
   
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" onChange={(e)=>setStudentPassword(e.target.value)} placeholder="Enter password" />
      
        <Form.Text className="text-muted">
          We'll never share your password  with anyone else.
        </Form.Text>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password"  onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Enter password" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>cnp</Form.Label>
        <Form.Control type="text" onChange={(e)=>setStudentCNP(e.target.value)}placeholder="CNP" />
      </Form.Group>
      
   

      <Button variant="primary" type="submit" onClick={(e)=>{register(studentName,studentEmail,studentPassword,confirmPassword,studentCNP,e)}}>
        Submit
      </Button>
      <Link to="/Login" style={{textDecoration:'none',alignSelf:'center',
            margin:'4px'}}>Already have an account?</Link>
    </Form>
      
     </div>
              

    ) : ( 
        <div className='register__side'>
    <Form>
    <img
       src="https://i.pinimg.com/736x/3b/31/38/3b31384b3619ec532bfc3c2532f22759.jpg" style={{width:'150px',height:'150px',
    objectFit:'cover',alignSelf:'center',boxShadow: '-1px 7px 15px 5px rgba(0,0,0,0.1)',
    borderRadius:'50%'}}></img>    
              <Button onClick={(e)=>setIsClicked(true)}> {'>>'} Student Panel </Button>
      
    <Form.Group className="mb-3" controlId="formBasicUsername">
       
        <Form.Label>Username</Form.Label>
        <Form.Control onChange={(e)=>setTeacherName(e.target.value)} type="text" placeholder="Enter username" />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email"  onChange={(e)=>setTeacherEmail(e.target.value)} placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
   
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={(e)=>setTeacherPassword(e.target.value)} type="password" placeholder="Enter password" />
      
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Teacher Code</Form.Label>
        <Form.Control onChange={(e)=>setTeacherCode(e.target.value)} type="password" placeholder="Enter password" />
      
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control  onChange={(e)=>setTeacherConfirmPassword(e.target.value)} type="password" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>cnp</Form.Label>
        <Form.Control   onChange={(e)=>setTeacherCNP(e.target.value)}  type="text"  placeholder="CNP" />
      </Form.Group>
      
      
      <Button variant="primary" 
      onClick={(e)=>{register(teacherName,teacherEmail,teacherPassword,teacherConfirmPassword,
      teacherCNP,e,false,teacherCode)}}  type="submit">
        Submit
      </Button>
      <Link to="/Login" style={{textDecoration:'none',alignSelf:'center',
            margin:'4px'}}>Already have an account?</Link>
    </Form>
    </div>)}
    </div>

)}

export default Register