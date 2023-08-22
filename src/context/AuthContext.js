import { createContext, useContext,useState,useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { CNP } from 'romanian-personal-identity-code-validator';

export const AuthProvider = createContext();

export const useAuth = () => {
    try {
        return useContext(AuthProvider);
    }
    catch(e){
        console.log(e.message)
    }
}
// we wrap App.js in AuthContext
export const AuthContext = ({children}) => {
    let navigate = useNavigate()

    // Student state
    let [studentName,setStudentName] = useState('');
    let [studentPassword,setStudentPassword] = useState('');
    let [studentCNP,setStudentCNP] = useState('');
    let [studentEmail,setStudentEmail] = useState('');
    let [confirmPassword,setConfirmPassword] = useState('');
    let [teacherConfirmPassword,setTeacherConfirmPassword] = useState('');
    let [visibility,setVisibility] = useState('password')
    // let [studentDataNasterii,setStudentDataNasterii] = useState('')
    let [teacherEmail,setTeacherEmail] = useState('');
    let [teacherCNP,setTeacherCNP] = useState('');
    let [teacherPassword,setTeacherPassword] = useState('')
    let [teacherName,setTeacherName] = useState('')
    let [teacherCode,setTeacherCode] = useState('')
    let [errorMessages,setErrorMessages] = useState(
        {
            emailError:'',passwordError:'',cnpError:'',generalError:''
        })


    let register = async(username,email,password,confirmPassword,cnp,e,isTeacher=false,teacherCode='',
    ) => {
        e.preventDefault()

         let student;
         if(username!='' && email!='' && password!='' && cnp!='' ) {
        //  let validCnp = String(cnp);
        student = await axios.post(`/auth/register`,{username,email,password,cnp,isTeacher,teacherCode});
         
         }
         else {
            alert('Completati toate campurile!')
            return 
         }
         if(!student.data.error){
    
      
         if(password!==confirmPassword && password.length<4 && password.length>10)
         {
            alert('Parola trebuie sa fie intre 5 si 10 caractere!');
            return;
         }
     
         if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
              alert('Email-ul trebuie sa fie intr-un format valid!')
         }
      
         let cnp_utilizator =  new CNP(cnp);
            console.log(cnp_utilizator.isValid())
            if(!cnp_utilizator.isValid())
            {
                alert("Va rugam introduceti un CNP valid!")  
                return 
            }
       
             
            navigate('/login');
        }
        // else 
        // {
          
        //     alert('Utilizatorul cu acest email exista!')
        //     navigate('/register')
        //     return;
        // }
         
    }
    
    let toggleHiddenFields = (e) =>{
        if(visibility=='text'){
            setVisibility('password')
        }
        else {
            setVisibility('text');
        }
    }
    let login = async(email,cnp,password,e) => {
        e.preventDefault()
        try {
         let validationsFailed = false; 
         let userData = 
            {
            email,
            password,
            cnp
            }
            let cnp_utilizator =  new CNP(cnp);
            console.log(cnp_utilizator.isValid())
            if(!cnp_utilizator.isValid())
            {
                alert("Va rugam introduceti un CNP valid!")  
                return 
            }
           
            if (/^([\w.-]+)@(\[(\d{1,3}\.){3}|(?!hotmail|gmail|yahoo)(([a-zA-Z\d-]+\.)+))([a-zA-Z]{2,4}|\d{1,3})(\]?)$/.test(email))
            {
            alert('Email-ul este intr-un format invalid!')
             return 
            }
          
            console.log(password.length)
            if(password.length<5 && password.length > 10){
                alert('Parola trebuie sa fie intre 5 si 10 caractere!')
   
               return;
            }
         
       
        let loggedStudent = await axios.post('/auth/login',userData)
         
        
        if(loggedStudent.status==200 && !loggedStudent.data.error){
            localStorage.setItem('student',JSON.stringify(loggedStudent));          
             if(JSON.parse(localStorage.getItem('student')).data.isTeacher==true){
            navigate('/studenti');
            navigate(0);
        
             }
             else {
                navigate('/panou-student')
                navigate(0)
             }
            }
            

             
        
         }
        
        
         catch(e) {
            console.log(e.message);
         }
     }
    
    
    let values = {
    visibility,
    setVisibility,
    login,
    setConfirmPassword,
    teacherConfirmPassword,
    setTeacherConfirmPassword,
    confirmPassword,
    teacherName,
    setTeacherName,
    teacherPassword,
    setTeacherPassword,
    teacherCode,
    setTeacherCode,
    teacherCNP,
    setTeacherCNP,
    teacherEmail,
    setTeacherEmail,
    register,
    setStudentName,
    setStudentEmail,
    setStudentCNP,
    setStudentPassword,
    studentName,
    studentCNP,
    studentEmail,
    studentPassword,
    errorMessages,
    setErrorMessages
    };




    return (
        // AuthProvider will provide the necessary functions and state for our app
        <AuthProvider.Provider value={values}>
            {children}
        </AuthProvider.Provider>
    )
}