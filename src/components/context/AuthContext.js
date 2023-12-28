import React, { createContext, useReducer } from "react";
export const AuthContext=createContext();
const defaultreducer={
    isAuthed: false,
    token: null,
    id: null,
    userTypeId: null,
    fullName: null,
    email: null,
    userName: null,
    phone: null,
    photoUrl: null,
};
const reducer=(state,action)=>{
    if(action.type==="login"){
        localStorage.setItem("token",action.data.data.token)
        return{
            isAuthed: action.data.data.isAuthed,
            token: action.data.data.token,
            id: action.data.data.id,
            userTypeId: action.data.data.userTypeId,
            fullName: action.data.data.fullName,
            email: action.data.data.email,
            userName: action.data.data.userName,
            phone: action.data.data.phone,
            photoUrl: action.data.data.photoUrl,
        }
    }
    if(action.type==="logout"){
        localStorage.removeItem("token")
        return{
            isAuthed: false,
            token: null,
            id: null,
            userTypeId: null,
            fullName: null,
            email: null,
            userName: null,
            phone: null,
            photoUrl: null,
        }
    }

}
export  const Authcontextprovider=(props)=>{
    
    const [auth, dispatchAuth]=useReducer(reducer,defaultreducer)
    const login=(data)=>{
        dispatchAuth({type:"login" , data:data})
    }
    const logout=()=>{
        dispatchAuth({type:"logout"})
    }
    const Authcontext={
        isAuthed: auth.isAuthed,
        token: auth.token,
        id: auth.id,
        userTypeId: auth.userTypeId,
        fullName: auth.fullName,
        email: auth.email,
        userName: auth.userName,
        phone: auth.phone,
        photoUrl: auth.photoUrl,
        login:login,
        logout:logout,
    }
    return(
        <AuthContext.Provider value={Authcontext} >
            {props.children}
        </AuthContext.Provider>
    )
}