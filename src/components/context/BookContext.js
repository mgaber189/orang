import React, { createContext, useReducer } from "react";
export const BookContext=createContext();
const defaultreducer={
    userId: 0,
    programId: 0,
    bookingDate: null,
    numberOfChild: 0,
    numberOfAdults: 0,
    additionalServices: [],
    total:0,
};
const reducer=(state,action)=>{
    if(action.type==="addBook"){
        return{
            userId: action?.data?.userId,
            programId: action?.data?.programId,
            bookingDate: action?.data?.bookingDate,
            numberOfChild: action?.data?.numberOfChild,
            numberOfAdults: action?.data?.numberOfAdults,
            additionalServices: action?.data?.additionalServices,
            total:action?.data?.total,
        }
    }
    if(action.type==="removeBook"){
        return{
            userId: null,
            programId: null,
            bookingDate:null,
            numberOfChild: null,
            numberOfAdults:null,
            additionalServices: null,
            total:null,
        }
    }
}
export  const Bookcontextprovider=(props)=>{
    
    const [book, dispatchBook]=useReducer(reducer,defaultreducer)
    const addBook=(data)=>{
        dispatchBook({type:"addBook",data:data})
    }
    const removeBook=()=>{
        dispatchBook({type:"removeBook"})
    }
    const Bookcontext={
        userId: book?.userId,
        programId: book?.programId,
        bookingDate: book?.bookingDate,
        numberOfChild: book?.numberOfChild,
        numberOfAdults: book?.numberOfAdults,
        additionalServices: book?.additionalServices,
        total:book?.total,
        addBook:addBook,
        removeBook:removeBook,
    }
    return(
        <BookContext.Provider value={Bookcontext} >
            {props.children}
        </BookContext.Provider>
    )
}