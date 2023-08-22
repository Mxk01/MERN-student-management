import React, { useEffect,useState } from 'react'
import NavigationBoard from '../../Partials/NavigationBoard'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import StarRating from '../../StarRating';

function CursurileMele() {
  let [cursurileMele,setCursurileMele] = useState([])
  const [show, setShow] = useState(false);
  let [courseTeacher,setCourseTeacher] = useState({})
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    let getMyCourses = async() => {
      let courses = await axios.get('/auth/courses',{
        headers : {'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('student')).data.token}`}})
        console.log(courses.data.message)
        setCursurileMele(courses.data.message)
      }
      getMyCourses()
  },[])

  return (
    <div>
      <NavigationBoard/>
     

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="mx-3">{courseTeacher.username}</Modal.Title>
          <StarRating/>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        <React.Fragment className='d-flex justify-content-center overflow-auto align-items-center'>
        {
          cursurileMele!=[] ?  cursurileMele.map((curs)=>{

            return <div class="p-3 mb-2 d-flex
            justify-content-between
            rounded bg-primary bg-gradient text-white ms-3 mt-3 w-50" >
                
                <p>{curs.name}</p>
                <React.Fragment className="justify-content-flex-end"> 
               <p>Predat de</p> {"  "}
                {
                  curs.taughtBy.map(teacher=> {
                    return ( 
                     <>    
                     <div  onClick={()=>
                     { 
                       handleShow()
                       setCourseTeacher(teacher)
                     }
                    } style={{width:'50px',height:'50px',
                    backgroundColor:'#f9ca24',cursor:'pointer'}} className=" h3 rounded-circle d-flex
                    justify-content-center align-items-center">{teacher.username[0]}</div>
                     </>
                    )
                  })
                }
                 </React.Fragment> 
              </div>
          }) : <h1>Nu au fost gasite cursuri</h1>
        }
        </React.Fragment>
    </div>
  )
}

export default CursurileMele