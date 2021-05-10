//import { Message } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {updatedata} from '../actions/auth-action'
import { Button, Card, Grid, TextField,makeStyles, Container } from "@material-ui/core"

const userStyles=makeStyles((theme)=>({
    cards:{
        backgroundColor:"#d9dcf1",
        height:"840px",
        padding:"50px"
    },

}))

const Update=({message})=>{
  //console.log(message.jobtitle)

    const [jobtitle,setJobtitle]=useState('')
    //console.log("this is from useState",jobtitle)
    const [companyname,setCompanyname]=useState(message.companyname)
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [description,setDescription]=useState('')
    const [salary,setSalary]=useState('')
    const [persons,setPersons]=useState('')
    const [jobtype,setJobtype]=useState('')
    const [exp,setExp]=useState("")
    const [location,setLocation]=useState("")
    const [err,setErr]=useState("")
    
    
    
    // console.log("this is from props",message)
    
    // console.log("this is from useState",companyname)
    
    
    useEffect(()=>{
   setJobtitle(message.jobtitle)
   console.log(jobtitle)
    },[])
    
    
    
    
    
    
    
    
    
    const dispatch  =useDispatch()
    
    
    localStorage.setItem('id1',message._id)
    //console.log(localStorage.getItem('id1'))














 //const [data,setData]=useState(localStorage.getItem('id1'))
 //setData(message)

 const userLogin=(e)=>{
    e.preventDefault()
    const user={
        jobtitle,companyname,description,jobtype,salary,persons,exp,name,location,
        email,
       
    }

    if(jobtitle=="",companyname=="",jobtype=="",persons=="",exp=="",location=="",name=="",salary=="",description==""){
        setErr("please enter data")
    }else{ 

    dispatch(updatedata(user,localStorage.getItem('id1')))//.then(clear())
    //clear()
}}
 //console.log(message)
 //console.log(props)
 //console.log("this is data",data)
 
//  if(j==true){
//     setName(message.name)
//  }
    
 //console.log(message)
 
 //console.log("messs",jobtitle)
 const classes=userStyles()
    return <>
    <h2 style={{marginLeft:580}}>Update Form</h2>
<hr />
    <Grid container spacing={3} >
      <Grid item xs>

    </Grid>  
   
    <Grid item xs spacing={3} >
        <Card className={classes.cards}>
            <form onSubmit={userLogin}>
                <Grid container direction="column" alignItems='center' spacing={3} justify='center' className={classes.grid}>
               
                        <TextField id="" label="id" varient='outlined'
                         value={message._id} onChange={(e)=>setJobtitle(e.target.value)} />
                
                   
                        <TextField id="" label="Jobtitle" varient='outlined'
                         value={name} onChange={(e)=>setJobtitle(e.target.value)} />{message.jobtitle}
                   
                   
                        <TextField id="" label="CompanyName" varient='outlined'
                         value={companyname} onChange={(e)=>setCompanyname(e.target.value)}  />{message.companyname}
                    
                  
                        <TextField id="" label="YourName" varient='outlined' 
                         value={name} onChange={(e)=>setName(e.target.value)}  />{message.name}
                   
                    
                    
                        <TextField id="" label="Description" varient='outlined' type="textarea"
                         value={description} onChange={(e)=>setDescription(e.target.value)}  />{message.description}
                    
                    
                   
                   
                        <TextField id="" label="Salary" varient='outlined' type="number"
                         value={salary} onChange={(e)=>setSalary(e.target.value)}  />{message.salary}
                    
                    
                   
                   
                        <TextField id="" label="JobType" varient='outlined' 
                         value={jobtype} onChange={(e)=>setJobtype(e.target.value)} />{message.jobtype}
                  
                  
                        <TextField id="" label="Experience" varient='outlined' 
                         value={exp} onChange={(e)=>setExp(e.target.value)} />{message.exp}
                  
                  
                        <TextField id="" label="No of Persons" varient='outlined' type="number"
                         value={persons} onChange={(e)=>setPersons(e.target.value)}  />{message.persons}
                   
                   
                        
                        <TextField id="" label="location" varient='outlined'
                         value={location} onChange={(e)=>setLocation(e.target.value)}  />{message.location}
                   
                   
                        <Button varient="contained" color="primary" disableElevation type='submit'>
                            Update 
                           
                           
                        </Button><br />
                   
                    <Grid item>
                    
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


export default Update