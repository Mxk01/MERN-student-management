import './Login.css'
import {useState,useEffect} from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {Link,Navigate} from 'react-router-dom'
import { Button,Form,Navbar,NavDropdown,Nav,Container } from 'react-bootstrap'
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from "react-router";
import {Badge} from 'react-bootstrap';
function Login() {
    let {
        errorMessages,
        navigate,
        studentCNP,
        studentEmail,
        studentPassword,
        setStudentCNP,
        setStudentEmail,
        setStudentPassword,
        login,
        teacherEmail,
        teacherPassword,
        teacherCNP,
        setTeacherPassword,
        setTeacherCNP,
        setTeacherEmail
    } = useAuth();
     
   
    

    let [teacherName,setTeacherName] = useState('')
  
    let [isClicked,setIsClicked] = useState(false)


   
        

  return (
    <div className='login__main'>
        <div className='login__sideImage'>

        </div>
       <div className='register__side'>
        <Form> 
         
        <LazyLoadImage
      src="https://cdn-icons-png.flaticon.com/512/2491/2491056.png"
      className='login__student__avatar mb-2' />
    <Link to="/Register" style={{textDecoration:'none',alignSelf:'center',
            margin:'4px'}}>Don't have an account?</Link>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" onChange={(e)=>{setStudentEmail(e.target.value)}} placeholder="Enter email" />
   
        {errorMessages.emailError ?  <Badge bg="danger" className="mt-2 p-2">  {errorMessages.emailError} </Badge> : ''}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" required onChange={(e)=>{setStudentPassword(e.target.value)}} placeholder="Password" />
        {errorMessages.passwordError ?  <Badge bg="danger" className="mt-2 p-2">  {errorMessages.passwordError} </Badge> : ''}

      </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicCnp">
        <Form.Label>CNP</Form.Label>
        <Form.Text className="text-muted"> 
         {errorMessages.cnpError}
        </Form.Text>
        <Form.Control type="password" required={true} onClick={(e)=>{setStudentCNP(e.target.value)}} placeholder="Password" />
      </Form.Group>
        {errorMessages.generalError ?  <Badge bg="danger" className="mb-2 p-2">  {errorMessages.generalError} </Badge> : ''}


       <Button variant="primary" type="submit" onClick={(e)=>login(studentEmail,studentCNP,studentPassword,e)}>
        Submit
      </Button>
 
          
      
     </Form>
     </div>
     </div>
    
  )
}

export default Login