import {useEffect, useState} from 'react'
import {Redirect,Route, Link, useNavigate } from 'react-router-dom'
import './ChangePassword.css'
import { Navbar,NavDropdown,Nav,Container,Form,Button } from 'react-bootstrap'
import NavigationBoard from '../../Partials/NavigationBoard'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
 
import axios from 'axios'

function ChangePassword() {
  let navigate = useNavigate()
  let [student,setStudent] = useState();
  let [confirmPassword,setConfirmPassword] = useState('')
  let [oldPassword,setOldPassword] = useState('')
  

  // get old password from user 
  // add new password from req.body
  // compare them 

  let changePassword = async(oldPass,newPassword) => {
    if(oldPass!=newPassword){
    
      let passwordChanged = await axios.put('auth/change-password',{password:newPassword,oldPass},{
        headers : {'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('student')).data.token}`}})
       toast(passwordChanged.data.message)
    }
    else {
      toast('Old password and new password cannot be the same!')
    }

  }
  return (
    <div>  <ToastContainer />
      <NavigationBoard/>
      <div className='changePassword__main'>
      <div className='lista__header'> </div>
     
        <Form> 
         
        <LazyLoadImage
      src="https://static.vecteezy.com/system/resources/previews/001/397/516/original/cyber-security-illustration-free-vector.jpg"
      className='changePassword__student__avatar mb-2' />


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" onChange={(e)=>{setOldPassword(e.target.value)}} placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>New Password</Form.Label>
        <Form.Control type="password" onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder="Password" />
      </Form.Group>

       <Button variant="primary" type="submit"
       onClick={(e)=>{
        e.preventDefault()
        changePassword(oldPassword,confirmPassword)
       }}>
        Change Password
      </Button>
 
          
      
     </Form>
    </div></div>
  )
}

export default ChangePassword