

import { Button, Card, Grid, TextField,makeStyles, Container } from "@material-ui/core"
import {forget} from '../actions/auth-action'
import {useDispatch} from "react-redux"
import { useState } from "react"


const userStyles=makeStyles((theme)=>({
    cards:{
        backgroundColor:"#d9dcf1",
        height:"100px",
        padding:"50px"
    },

}))

const Forget=(props)=>{
    const [email,setEmail]=useState('')

    const dispatch  =useDispatch()
    const classes=userStyles()


    const userLogin=(e)=>{
        e.preventDefault()
        const user={
                    email
                   }
           dispatch(forget(user))
           
    }
    return<>
    

<Grid container spacing={3} >
    <Grid item xs>

    </Grid>
    <Grid item xs spacing={3} >
        <Card className={classes.cards}>
            <form onSubmit={userLogin}>
                <Grid container direction="column" alignItems='center' spacing={3} justify="space-around" className={classes.grid}>
                   
                    <Grid item>
                        <TextField id="" label="Email" varient='outlined' type="email"
                         value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </Grid>
                   
                    <Grid item>
                        <Button varient="contained" color="primary" disableElevation type='submit'>
                            Submit
                        </Button>
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

export default Forget