import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
const Protectroute=(props)=> {
    const auth = useContext(AuthContext);
    if(auth.isAuthed){
        return props.children
    }else{
        return <Navigate to={'/'}/>
    }
}
export default Protectroute