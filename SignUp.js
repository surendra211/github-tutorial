
import { Button, Card, Grid, TextField,makeStyles, Container } from "@material-ui/core"

import {signup} from '../actions/auth-action'
import { Redirect } from "react-router"
import {useDispatch,useSelector} from "react-redux"
import { useState } from "react"
import { NavLink, Route } from "react-router-dom"
//import Forget from "./Forget"
const userStyles=makeStyles((theme)=>({
    cards:{
        backgroundColor:"#d9dcf1",
        height:"460px",
        padding:"50px"
    },

}))
const SignUp=(props)=>{
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')

    const dispatch  =useDispatch()
    const classes=userStyles()
    const auth=useSelector(state=>state.auth)
    
    const clear=()=>{
        const su={firstName:"",lastName:"",
        email:"",
        password:""}
    }

    const u={email,password,firstName,lastName}
    const userLogin=(e)=>{
        e.preventDefault()
        const user={
            firstName,
            lastName,
            email,
            password
        }
        if(firstName=="" || lastName==""|| email==""||password==""){
            setError("please enter your details")
        }else{
            dispatch(signup(user))
            setError(localStorage.getItem('resp'))
        }
    }
         if(error=="registered successfully...."){
             console.log("hello")
             return <Redirect to="/signin" />
         }
           clear()
    


    if(auth.authenticate){
        return <Redirect to="/" />
    }
    return<>
     <br />
     <br />
    <Grid container spacing={3} >
    <Grid item xs>

    </Grid>
   
    <Grid item xs spacing={3} >
        <Card className={classes.cards}>
            <form onSubmit={userLogin}>
                <Grid container direction="column" alignItems='center' spacing={3} justify="space-around" className={classes.grid}>
                    <Grid item>
                        <TextField id="" label="FirstName" varient='outlined'
                         value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <TextField id="" label="lastName" varient='outlined'
                         value={lastName} onChange={(e)=>setLastName(e.target.value)}  />
                    </Grid>
                    <Grid item>
                        <TextField id="" label="Email" varient='outlined' type="email"
                         value={email} onChange={(e)=>setEmail(e.target.value)}  />
                    </Grid>
                    <Grid item>
                        <TextField id="" label="Password" type='password' varient='outlined'
                         value={password} onChange={(e)=>setPassword(e.target.value)}  />
                    </Grid>
                    <Grid item>
                        <Button varient="contained" color="primary" disableElevation type='submit'>
                            SignUp 
                           
                           
                        </Button>
                    </Grid>
                    <h6 style={{color:'red'}}>{error}</h6>
                    {/* <h6 style={{color:'red'}}>{localStorage.getItem('resp')} </h6> */}
                    <Grid item>
                    <NavLink to='/forget' >forget password</NavLink>
                   </Grid>
                </Grid>
                
                
            </form>
        </Card>
    </Grid>
    <Grid item xs>

    </Grid>
    </Grid>

   

    
    </>
}

export default SignUp