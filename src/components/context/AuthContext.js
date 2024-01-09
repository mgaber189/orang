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
const reducer = (state, action) => {
    if (action.type === "login") {
      // Use optional chaining to access nested properties
      return {
        isAuthed: action?.data?.isAuthed,
        token: action?.data?.token,
        id: action?.data?.id,
        userTypeId: action?.data?.userTypeId,
        fullName: action?.data?.fullName,
        email: action?.data?.email,
        userName: action?.data?.userName,
        phone: action?.data?.phone,
        photoUrl: action?.data?.photoUrl,
      };
    }
  
    if (action.type === "logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("profile");
      return {
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
    }
  
    // Return the current state for unrecognized actions
    return state;
  };
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