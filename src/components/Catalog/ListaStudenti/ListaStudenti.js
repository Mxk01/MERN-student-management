import {useEffect,useState} from 'react'
import './ListaStudenti.css'
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import { Navbar,NavDropdown,Nav,Container,InputGroup,Form,Image,Table, Button} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {io} from 'socket.io-client'



function ListaStudenti() {

  let navigate = useNavigate()
  let [students,setStudents ] = useState([]);
  let [student,setStudent]  = useState(JSON.parse(localStorage.getItem('student')));
  let [searchTerm,setSearchTerm] = useState('');
  let [socket,setSocket] = useState(null);
  let [isRestantier,setIsRestantier] = useState(false);
  let [order,setOrder]  = useState('asc')
  let [an,setAn] = useState('');
  let [bursier,setBursier] = useState(false);
  let [departament,setDepartament] = useState('');
  useEffect(() => {
    setSocket(io("http://localhost:5002"));
    console.log(socket?.on('message',(msg)=>console.log(msg)))
  }, []);

  
  let deleteUser = async(id) => {
    console.log(id);
     await axios.delete(`/auth/delete-user/${id}`);
  }

  let updateUser = async(id,an,departament) => {
    console.log(id,an,departament)
    let user = await axios.put(`/auth/update-user/${id}`,{an,departament})
     toast(`${user.data.message.username} a fost actualizat cu succes!`);
  }
  useEffect(()=>{
      let getUsers =  async() => {
         let users =  await axios.get(`/auth/students-list/?order=${order}&isRestantier=${isRestantier}&isBursier=${bursier}`,{
          headers : {'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('student')).data.token}`}
         });
         setStudents(users.data.message)
         if(searchTerm){
          setStudents(users.data.message.filter(user => user.username.indexOf(searchTerm)>-1))
        }
      }
        if(JSON.parse(localStorage.getItem('student')).data.token){
      getUsers();

      }
     
      if(!JSON.parse(localStorage.getItem('student')).data.isTeacher)
      {
        navigate('/panou-student')
      }
           
  },[student,students,searchTerm])
    
 
 

  useEffect(() => {
    socket?.on("receive-notification",(message)=>{
      // only users with teacher role will be notified when a student logs in 
      if(JSON.parse(localStorage.getItem('student')).data.isTeacher){
        // verifica daca cursul este predat de profesorul curent si primeste toast-ul ,altfel nu!
      toast(message);
      }
    });
  }, [socket])

   return (
    <div className="studenti__container"> 
  <Navbar sticky="top"  style={{backgroundColor:'white'}} className="w-100" expand="lg">
      <Container>
        <Navbar.Brand>
       
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
       
          <NavDropdown.Item className="navbar-brand"> 
          
          <p className='shortcut__avatar'>{JSON.parse(localStorage.getItem('student')).data.username[0]}</p>

          </NavDropdown.Item>  
            <NavDropdown 
            
            title={`Welcome, teacher ${student.data.username}`} className="ms-3" id="basic-nav-dropdown">
             
                 {!student.data.isTeacher ? <NavDropdown.Item href="/panou-student">Panou Student</NavDropdown.Item> : ''}
                <NavDropdown.Item  href="/change-password">Modificare Parola</NavDropdown.Item>

                <NavDropdown.Item style={{textDecoration:'none',color:'black'}}
               href="/add-course">Adauga Curs</NavDropdown.Item>
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
   <div className="lista__header">

   </div>
    <div className=' teacher-controls d-flex col-6 justify-content-center align-items-center'>  
 <InputGroup className="ms-3" style={{outline:'none !important'}}>
        <InputGroup.Text  id="basic-addon1">🔍</InputGroup.Text>
        <Form.Control
          placeholder="Search"
          aria-label="Search"
          type="text"
          onChange={(e)=> { setSearchTerm(e.target.value)}}
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <Form.Select className="ms-3"  aria-label="Default select example" 
      onChange={(e)=>setOrder(e.target.value)}>
      <option>Filter by name</option>
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </Form.Select>
    <Form.Group className="ms-3 d-flex"> 
      <Form.Label>Restantier</Form.Label>
    <Form.Check
            onChange={(e)=>{
              setIsRestantier(!isRestantier)
            }}
            className="ms-3"
            type="checkbox"
            value={isRestantier}
          />
           </Form.Group> 

           <Form.Group className="ms-3 d-flex"> 
      <Form.Label>Bursier</Form.Label>
    <Form.Check
            onChange={(e)=>{
              setBursier(!bursier)
            }}
            className="ms-3"
            type="checkbox"
            value={bursier}
          />
           </Form.Group> 
    </div>
    <Table responsive style={{marginTop:'4rem'}}>
    
<tbody>
 
{
        
     students!=[] ? students.filter(student=>!student.isTeacher).map((student,index) => {
    return  <tr  key={index}>
        <Badge bg="secondary" className="mt-2">{student.username}</Badge>
        {/* REPLACE WITH TEXT */}
        <td>
        <p className='shortcut__avatar2 mb-3 '>{ student.username.split(' ').length > 1 ? 
        student.username[0].toUpperCase() :
        `${student.username[0].toUpperCase()}.${student.username[1].toUpperCase()}`}</p>

        </td>
        {/* <Badge style={{backgroundColor:'lightgreen'}} className="mt-2 ">{student.createdAt.slice(0,10)}</Badge> */}
        <Badge style={{backgroundColor:'lightgreen'}} className="mt-2 ms-2">{student.email}</Badge>
 { student.hasFailedClasses ? <Badge bg="danger" className="mt-2 ms-2">Restantier</Badge> : '' } 

        <td>
        <select className="form-select hide-responsive"  
        onChange={(e)=>setAn(e.target.value)} 
        style={{width:'76px',marginLeft:'5px'}}>
          <option>
            I
          </option>
          <option>
          II 
          </option>
          <option>
          III 
          </option>
          <option>
          IV
          </option>
         </select>
        </td>
        <td>
        <select className="form-select hide-responsive" 
                onChange={(e)=>setDepartament(e.target.value)} 
        
        style={{width:'76px',marginLeft:'5px'}}>
          <option value="AIA">
            AIA
          </option>
          <option value="MEN">
            MEN 
          </option>
          <option value="TCM">
            TCM 
          </option>
          <option value="IMAPA">
             IMAPA
          </option>
         </select>
        </td>
  
        <td>
          <button className='btn btn-primary' onClick={()=>navigate(`/situatie-scolara/${student.username}/${student.email}`)}>Situatie Scolara</button>
        </td>
        <td>
          <Button variant='info' className="hide-responsive" style={{color:'white'}} onClick={()=>updateUser(student._id,an,departament)}>Actualizeaza Student</Button>
        </td>
        <td>
          <button className='btn btn-danger' onClick={()=>deleteUser(student._id)}>Sterge Student</button>
        </td>
     </tr> 
     
}):''
}
</tbody>
</Table>
   
   
    <ToastContainer />

    </div>
  )
}

export default ListaStudenti