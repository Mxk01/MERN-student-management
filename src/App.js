import React, { useState,Suspense } from 'react';
import { Routes, Route,Navigate,BrowserRouter } from "react-router-dom";
const ListaStudenti = React.lazy(()=>import('./components/Catalog/ListaStudenti/ListaStudenti'))
const PanouStudent = React.lazy(()=>import('./components/Catalog/PanouStudent/PanouStudent'))
const Register = React.lazy(()=>import('./components/Auth/Register/Register'))
const Login = React.lazy(()=>import('./components/Auth/Login/Login'))
const CursurileMele = React.lazy(()=>import('./components/Catalog/CursurileMele/CursurileMele'))

const ChangePassword = React.lazy(()=>import('./components/Auth/ChangePassword/ChangePassword'))
const GestiuneMaterii = React.lazy(()=>import('./components/Catalog/Materii/GestiuneMaterii/GestiuneMaterii'))
const SituatieScolara = React.lazy(()=>import('./components/Catalog/SituatieScolara/SituatieScolara'))
function App() {

  return (
      <Routes>
         <Route path="/" element={JSON.parse(localStorage.getItem('student')) ? <Suspense fallback={<p>Loading ...</p>}> 
        <ListaStudenti />  </Suspense>:<Navigate to="/login"></Navigate>}/>
        <Route exact path="/login" element={!JSON.parse(localStorage.getItem('student')) ? <Suspense fallback={<p>Loading ...</p>}> 
        <Login /></Suspense>:<Navigate to="/studenti"></Navigate>}/>
        <Route path="/studenti" element={JSON.parse(localStorage.getItem('student')) ? <ListaStudenti />:<Navigate to="/login"></Navigate>}/>
        <Route path="/add-course" element={JSON.parse(localStorage.getItem('student')) ? <GestiuneMaterii />:<Navigate to="/login"></Navigate>}/>
        <Route path="/cursurile-mele" element={JSON.parse(localStorage.getItem('student')) ? <CursurileMele />:<Navigate to="/cursurile-mele"></Navigate>}/>

        <Route path="/register"  element={!JSON.parse(localStorage.getItem('student')) ? <Suspense fallback={<p>Loading ...</p>}> 
        <Register /></Suspense>:<Navigate to="/studenti"></Navigate>} />
        <Route path="/panou-student"  element={JSON.parse(localStorage.getItem('student')) ? <Suspense fallback={<p>Loading ...</p>}> 
        <PanouStudent /></Suspense>:<Navigate to="/login"></Navigate>} />
 
        <Route path="change-password/"  element={JSON.parse(localStorage.getItem('student')) ? <Suspense fallback={<p>Loading ...</p>}> 
        <ChangePassword /></Suspense>:<Navigate to="/login"></Navigate>} />
        <Route path="istoric-studenti/"  element={JSON.parse(localStorage.getItem('student')) ? <Suspense fallback={<p>Loading ...</p>}> 
        <ChangePassword /></Suspense>:<Navigate to="/login"></Navigate>} />

        <Route path="/situatie-scolara/:nume/:email"  element={JSON.parse(localStorage.getItem('student')) ? <Suspense fallback={<p>Loading ...</p>}> 
        <SituatieScolara /></Suspense>:<Navigate to="/login"></Navigate>} />
      </Routes>
  );
}

export default App;
