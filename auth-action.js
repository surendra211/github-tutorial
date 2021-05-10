import { useState } from "react"
import { NavLink } from "react-router-dom"
import axiosInstance from "../helpers/axios"
import { authConstants } from "./constants"


export const login=(user)=>{
    console.log(user )

    return async (dispatch)=>{
        dispatch({
            type  :authConstants.LOGIN_REQUEST,
                  })
        const res=await axiosInstance.post('/login',{
            ...user
        })
        console.log("hh",res)
      if(res.status==200){
          
          console.log("hello",res)
          const {token,recruiter }=res.data
          const email1=user.email
          const id=recruiter._id
          console.log("this is id",id)
          console.log("for email",email1)
          localStorage.setItem('id',id)
          localStorage.setItem('token',token)
          localStorage.setItem("email1",email1)
          localStorage.setItem('user',JSON.stringify(recruiter))
          //console.log("user data",token,"", recruiter)
          dispatch({
              type:authConstants.LOGIN_SUCCESS,
              payload:{
                  token,user
              }
          })
      }else{
          if(res.status==400){
              console.log(res.status)
              dispatch({
                  type:authConstants.LOGIN_FAILURE,
                  payload:{error: res.data.error}
              })
          }
      }      
    }
}

export const signup=(user)=>{
    console.log(user)
    return async (dispatch)=>{

        dispatch({
            type:authConstants.SIGNUP_REQUEST
        })

        const resp=await axiosInstance.post('/rec/signup',{
            ...user
        })
        console.log(resp.data)
        const mess=resp.data.message
        console.log(mess)
localStorage.setItem("resp",mess)
        if(resp.status==201){
            const {user}=resp.data
            dispatch({
                type:authConstants.SIGNUP_SUCCESS,
                payload:{
                    ...user
                }
            })
        }
       else if(resp.status==400){
            const data="user already existed"
            console.log(data)
            localStorage.setItem("already",data)
            dispatch({
                type:authConstants.EXISTED_RECRUTER,
            })
        }
    }
}

export const forget=(user)=>{

    return async (dispatch)=>{       
        dispatch({
            type:authConstants.FORGET_PASS
        })
        const resp=await axiosInstance.post('/forget',{...user})

        if(resp.status==200){
            console.log(resp)
            const user=resp.data.password
            dispatch({
                type:authConstants.FORGET_SUCC,
                payload:{
                    ...user
                }
            })
        }
    }

}

export const post=(user)=>{
    console.log(user)
    return async (dispatch)=>{

        dispatch({
            type:authConstants.POSTJOB_REQUEST
        })

        const resp=await axiosInstance.post('/post',{
            ...user
        })
//console.log(resp.data)
        if(resp.status==200){
            const user=resp.data.message
            console.log(user)
            localStorage.setItem("mes",user)
            dispatch({
                type:authConstants.POSTJOB_SUCCESS,
                payload:{
                    user
                }
            })
        }
    }
}
export const updatedata=(user,da)=>{
    console.log(user)
    return async (dispatch)=>{

        dispatch({
            type:authConstants.UPDATE_REQUEST
        })
console.log(da)
        const resp=await axiosInstance.put(`/upd/${da}`,{
            ...user
        })

        if(resp.status==200){
            const user=resp.data
            dispatch({
                type:authConstants.UPDATE_SUCCESS,
                payload:{
                    user
                }
            })
        }
    }
}


export const findresume=(user)=>{
    console.log(user)
        const {skills,location}=user
        //console.log(skills,location)
    return async (dispatch)=>{
        dispatch({
            type:authConstants.RESUME_REQUEST
        })

        const resp= await axiosInstance.get(`/getting/${skills}/${location}`)
        //console.log(resp.data)
        
        // localStorage.setItem("resumes",d)
        if (resp.status==200){
            dispatch({
                type:authConstants.RESUME_SUCCESS,
                payload:{user}
            })
        }
    }
}
export const isUserLoggedIn=()=>{
    return async dispatch=>{
        const token=localStorage.getItem('token')

        if(token){
            const user=JSON.parse(localStorage.getItem('recruiter'))
            dispatch({
                type:authConstants.LOGIN_SUCCESS,
                payload:{
                    token,user
                }
            })
        }else{
            dispatch({
                type:authConstants.LOGIN_FAILURE,
                payload:{error: "Failed to login"}
            })

        }
    }

}

export const signout=()=>{
    return async dispatch =>{
        localStorage.clear()
        dispatch({
            type:authConstants.LOGOUT_SUCCESS
        })
    }
}


export const addfavourite=(item)=>{
    return async dispatch=>{
        console.log("auth-actions",item)
       //console.log(id)
        const resp=await axiosInstance.post('/savresume',{...item})
        if(resp.status===200){ 
        dispatch({ 
        type:authConstants.ADD_FAVOURITEL,
        payload:item
    })
}
    }
}

export const getfavorite=()=>{
    return async dispatch=>{
       const resp=await axiosInstance.get(`/getresume/${localStorage.getItem('id')}`)
       //console.log("auth actions",resp.data)
       if(resp.status===200){ 
       dispatch({
           type:authConstants.GET_FAVOURITE,
           payload:resp.data
       })
    }
    }
}

export const deletefavorite=(idx)=>{
    return async dispatch=>{

       
        dispatch({
            type:authConstants.DELETE_FAVORITE,
            payload:idx
        })
    }
}