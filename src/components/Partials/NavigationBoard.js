import {useState,useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import { Link,useNavigate } from 'react-router-dom';
import { Navbar,NavDropdown,Nav,Container,Button} from 'react-bootstrap'
import DatePicker from "react-datepicker";
function NavigationBoard() {
    let [student,setStudent] = useState('');
    let navigate = useNavigate();

 
  return (
    <>
      <Navbar sticky="top" style={{backgroundColor:'white'}} className="w-100" expand="lg">
      <Container>
        <Navbar.Brand className="hover__style">
        {/* <NavDropdown.Item className="navbar-brand" onClick={()=>navigate("/")}><img style={{ width:'60px',height:'60px',borderRadius:'50%'}}
    src="https://utgjiu.ro/wp-content/uploads/2020/12/logo.png"/>
        </NavDropdown.Item> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
       
                          <p className='shortcut__avatar'>{JSON.parse(localStorage.getItem('student')).data.username[0]}</p>

           
            <NavDropdown 
            
            title={`Welcome  ${JSON.parse(localStorage.getItem('student')).data.username}`  } id="basic-nav-dropdown">
                <NavDropdown.Item  href="/change-password">Modificare Parola</NavDropdown.Item>
                <NavDropdown.Item style={{textDecoration:'none',color:'black'}} 
               
               href="/cursurile-mele">Cursurile mele</NavDropdown.Item>
        
     
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
 
     
   </>
  )
}

export default NavigationBoard