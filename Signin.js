import { Button, Card, Grid, TextField,makeStyles, Container } from "@material-ui/core"

import {isUserLoggedIn, login} from '../actions/auth-action'
import { Redirect } from "react-router"
import {useDispatch, useSelector} from "react-redux"
import { useState } from "react"


const userStyles=makeStyles((theme)=>({
    cards:{
        backgroundColor:"#d9dcf1",
        height:"200px",
        padding:"50px"
    },

}))
const Signin =(props)=>{
    

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')
    const auth=useSelector(state=>state.auth)
    const dispatch  =useDispatch()

   

    const classes=userStyles()
    
    const userLogin=(e)=>{
        e.preventDefault()
        const user={
            email,
            password
        }
        if(email=="" || password==""){
            setError("enter Email and password")
        }else {
            dispatch(login(user))
           
        }
          

    }
    
    // if(error=="registered successfully...."){
    //     setError("now you can signin")
    // }

    if(auth.authenticate){
        return <Redirect to="/" />
    }
    return<>
   <br />
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
                        <TextField id="" label="Email" varient='outlined'
                         value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <TextField id="" label="Password" type='password' varient='outlined'
                         value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <Button varient="contained" color="primary" disableElevation type='submit'>
                            SignIn
                        </Button>
                    </Grid>
                    <h6 style={{color:'red'}}>{error}</h6>
                </Grid>
            </form>
        </Card>
    </Grid>
    <Grid item xs>

    </Grid>
    </Grid>
    {/* <Container>

    </Container> */}
    </>
}

export default Signin