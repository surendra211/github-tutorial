import { Button, Card, Grid, TextField,makeStyles, Container } from "@material-ui/core"
//import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
//import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import {post} from '../actions/auth-action'

//import {useDispatch} from "react-redux"
import { useState } from "react"
import { NavLink, Route } from "react-router-dom"
//import { Redirect } from "react-router"
import { isUserLoggedIn, signout } from "../actions/auth-action"
    //import { GetData } from "./GetData"
//import { useEffect } from "react"
//import { useDispatch, useSelector } from "react-redux"

import {updatedata} from '../actions/auth-action'


//import { useState } from "react"
//import {makeStyles,Button} from "@material-ui/core"
//import axios from "axios"
import axiosInstance from "../helpers/axios"
import React from 'react';
import clsx from 'clsx';
//import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from "react-redux"
import PrintData from "./PrintData"
import { useEffect } from "react"
import axios from "axios";

import { Redirect } from "react-router"
//import Forget from "./Forget"
const userStyles=makeStyles((theme)=>({
    cards:{
        backgroundColor:"#d9dcf1",
        height:"840px",
        padding:"50px"
    },
    table: {
      minWidth: 30,
    maxWidth:100
  },
    // cards:{
    //     backgroundColor:"#d9dcf1",
    //     height:"340px",
    //     padding:"50px"
    // },
    root: {
        maxWidth: 345,
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
      },

}))
const PostForm=(props)=>{

    const auth = useSelector(state => state.auth)
    //const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
    const [jobtitle,setJobtitle]=useState('')
    const [companyname,setCompanyname]=useState('')
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [description,setDescription]=useState('')
    const [salary,setSalary]=useState('')
    const [persons,setPersons]=useState('')
    const [jobtype,setJobtype]=useState('')
    const [exp,setExp]=useState("")
    const [location,setLocation]=useState("")
    const [error,setError]=useState('')
    const [posts,setPosts]=useState([])
    const [err,setErr]=useState('false')
    const [id1,setId1]=useState('')
    const [view1,setView1]=useState([])
    const [deleting,setDeleting]=useState('')
    const [apply,setApply]=useState([])
//     const init={
//         kkk:"",
//         hjk:""
//     }
//    // const [{kkk,hjk}]=useState(init)

    // const clearState=()=>{
    //     setState({
    //         ...init
    //     })
    // }
    const upd=(item)=>{
        setJobtitle(item.jobtitle)
        setJobtype(item.jobtype)
        setCompanyname(item.companyname)
        setName(item.name)
        setPersons(item.persons)
        setSalary(item.salary)
        setLocation(item.location)
        setDescription(item.description)
        setExp(item.exp)
        setId1(item._id)
        //localStorage.setItem('id1',item._id)
       
       
    }
    const upd1=(item)=>{
     setView1([item])
      //localStorage.setItem('id1',item._id)
     console.log(view1)
     
  }
    console.log(id1)
    const dispatch  =useDispatch()
    const classes=userStyles()


    const updating=(e)=>{
        e.preventDefault()
        const user={
            jobtitle,companyname,description,jobtype,salary,persons,exp,name,location,
            email,
           
        }
    
        if(jobtitle=="",companyname=="",jobtype=="",persons=="",exp=="",location=="",name=="",salary=="",description==""){
            setErr("please enter data")
        }else{ 
    
        dispatch(updatedata(user,id1))//.then(clear())
        clear()
        setTimeout(() => setError(localStorage.getItem('mes')), 1000)
    }}




console.log('error')
    const clear=()=>{
      setLocation('')
   
        setJobtitle('')
         setJobtype('')
         setEmail('')
         setCompanyname('')
         setPersons('')
         setSalary('')
         setDescription('')
         setExp('')
         setName('')
    }

    const u={email,jobtitle,companyname,description,jobtype,salary,persons,exp,name,location}
    const userLogin=(e)=>{
        e.preventDefault()
    
        const user={
            jobtitle,companyname,description,jobtype,salary,persons,exp,name,location,
            email,
           
        }

        if(jobtitle=="" || companyname=="" || description=="" || jobtype=="" || exp=="" || location=="" || email==""|| salary=="" || name==""|| persons==""){
            setError("please enter a data")
        }
        else if(email !== `${localStorage.getItem('email1')}`){
          setError('please enter a valid email')

        }
        else{ 
           dispatch(post(user))//.then(clear())
           clear()
           setTimeout(() => setError(localStorage.getItem('mes')), 1000)
           
          
          
    }}

    //const auth = useSelector(state => state.auth)
   // const dispatch = useDispatch()
    useEffect(() => {
        if (!auth.authenticate) {
            dispatch(isUserLoggedIn())
        }


    }, [])

    useEffect(()=>{
      const ge=async()=>{ 
       const resp=await axiosInstance.get(`/jobdata/${localStorage.getItem('email1')}`)
        // .then(res=>setPosts(res.data) )
        // .catch(error=>console.log(error))
       
     setPosts(resp.data)
      }
      ge()
     
    },
   [])
    if(!auth.authenticate){
        return <Redirect to="/signin" />
    }

    if(error==="posted successfully.."){
      console.log('executing')
      axiosInstance.get(`/jobdata/${localStorage.getItem('email1')}`)
      .then(res=>setPosts(res.data) )
      .catch(error=>console.log('catch', error))

      setError('')
      
     }

    const del=(id)=>{
        console.log("delete",id)
        axiosInstance.delete(`/del/${id}`).then(res=>setDeleting('true',res))
        .catch(err=>console.log(err))
       
      }
   let k=(posts.length)
//let k=0
   if(deleting==='true'){
    axiosInstance.get(`/jobdata/${localStorage.getItem('email1')}`)
    .then(res=>setPosts(res.data) )
    .catch(error=>console.log(error))
    setDeleting('false')
   }

   const appliedPerson=(id)=>{
     axiosInstance.get(`/appliedpersons/${id}`).then(resp=>setApply(resp.data))
     .catch(err=>console.log(err))
   }
   console.log(apply)





   const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    {field : 'skills', headerName: 'Skills',width:130},
    
    {field : 'qualification',headerName: 'Qualification',width:150},
    { field :'stream',headerName:'Stream',width:100},
    {field : 'updated',headerName:'Updated Date',width:150},
    {field : 'location',headerName: 'Location',width:110},
    {
      field: 'phone',
      headerName: 'Phone',
      type: 'number',
      width: 150,
    },
    
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    // },
  ];


  const rows =(resume)=> { 
    let i=0
  return resume.map((item,idx)=>(
       //<h1>hello</h1>
  //<h1>firstname:{item.fullname}</h1>
  { id:++i,email:item.jobseekerEmail, firstName: item.name, phone:item.phone,
  skills:item.skills,location:item.location,qualification:item.qualification,
  stream:item.stream,
  updated:item.createdAt ,
}
  ))}
    return<>
     <br />
     <br />
    {/* <GetData message={email } />  */}
    {/* <h2 style={{marginLeft:580}}>Post job</h2> */}
<hr />
    <Grid container spacing={3} >
    <Grid container spacing={1} item xs>

    </Grid>
   
    <Grid item xs spacing={3} >
        <Card className={classes.cards}>
            <form onSubmit={userLogin}>
                <Grid container direction="column" alignItems='center' spacing={3} justify="space-around"  >
                  <span style={{color:'blue',fontSize:25}}>Post a job</span>
                    <Grid item>
                        <TextField id="" label="Jobtitle" varient='outlined'
                         value={jobtitle} onChange={(e)=>setJobtitle(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <TextField id="" label="CompanyName" varient='outlined'
                         value={companyname} onChange={(e)=>setCompanyname(e.target.value)}  />
                    </Grid>
                    <Grid item>
                        <TextField id="" label="YourName" varient='outlined' 
                         value={name} onChange={(e)=>setName(e.target.value)}  />
                    </Grid>
                    <Grid item>
                        <TextField id="" label="Email" varient='outlined' type="email"
                         value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <TextField id="" label="Description" varient='outlined' type="textarea"
                         value={description} onChange={(e)=>setDescription(e.target.value)}  />
                    </Grid>
                    <Grid item>
                        <TextField id="" label="Salary" varient='outlined' type="number"
                         value={salary} onChange={(e)=>setSalary(e.target.value)}  />
                    </Grid>
                    <Grid item>
                        <TextField id="" label="JobType" varient='outlined' 
                         value={jobtype} onChange={(e)=>setJobtype(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <TextField id="" label="Experience" varient='outlined' 
                         value={exp} onChange={(e)=>setExp(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <TextField id="" label="No of Persons" varient='outlined' type="number"
                         value={persons} onChange={(e)=>setPersons(e.target.value)}  />
                    </Grid>
                    <Grid item>
                        <TextField id="" label="location" varient='outlined'
                         value={location} onChange={(e)=>setLocation(e.target.value)}  />
                    </Grid>
                    
                    <Grid item>
                        <Button varient="contained" color="primary" disableElevation type='submit'>
                            Post 
                           
                           
                        </Button>
                        <Button varient="contained" color="primary" onClick={updating}>Update</Button><br />
                       <h6 style={{color:'red'}}> {error}</h6>
                    </Grid>
                    <Grid item>
                    {/* <NavLink to='/forget' >forget password</NavLink> */}
                   </Grid>
                </Grid>
                
                
            </form>
        </Card>
    </Grid>
    <Grid item xs>

    </Grid>
    </Grid>

   <br />
    <h1 style={{color:'green',marginLeft:100}}>posted jobs</h1>
        
    
           
      
       <Grid container  spacing={1} style={{marginLeft:20}}>
       {posts.map((item,idx)=>(

         <Grid xs={4} spacing={1}>
           <Grid  xs={12}  spacing={1}  >
    <Card className={classes.root}   >


     <div key={idx}>  
      <CardHeader style={{color:'green'}}
        // avatar={
        //   // <Avatar aria-label="recipe" className={classes.avatar}>
        //   //   R
        //   // </Avatar>
        // }
        action={
          <IconButton aria-label="settings" onClick={()=>appliedPerson(item._id)} >
            <MoreVertIcon />
          </IconButton>
        }
        title={item.jobtitle}
        subheader={item.createdAt}
      />
      {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" >
         {item.description} 
         {/* {item._id} */}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}


        <Button style={{color:"red"}} onClick={()=>del(item._id)}>delete</Button>
        <Button onClick={()=>upd(item)} style={{marginLeft:5,color:"blue"}}>Edit</Button>
        <Button style={{color:'green',marginLeft:60}} onClick={()=>upd1(item)}>View</Button>
       {/* <Button >persons</Button> */}
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <IconButton
          // className={clsx(classes.expand, {
          //   [classes.expandOpen]: expanded,
          // })}
          // onClick={handleExpandClick}
          // aria-expanded={expanded}
          // aria-label="show more"
        >
          {/* <ExpandMoreIcon /> */}
          
        </IconButton>
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Full Details of job:</Typography>
          <Typography paragraph color="textPrimary">
            jobtitle  : {item.jobtitle}
           
          </Typography>
          <Typography paragraph color="textPrimary">
           companyname : {item.companyname}.
           
          </Typography>
          <Typography paragraph color="textPrimary">

            Description   :  {item.description}.
            
          </Typography>
          <Typography color="textPrimary">
            Salary  :{item.salary}.
            
          </Typography>
          <Typography color="textPrimary">
            jobtype  : {item.jobtype}.
            
          </Typography>
          <Typography color="textPrimary">
            Experience  :  {item.exp}
            
          </Typography>
          <Typography color="textPrimary">
            No of persons  :  {item.persons}
            
          </Typography>
          <Typography color="textPrimary">
            Recruiter Name  : {item.name}
            
          </Typography>
          <Typography color="textPrimary">
            email : {item.email}
           
          </Typography>
          <Typography color="textPrimary">
            location : {item.location}
            
          </Typography>

        </CardContent>
      </Collapse> */}
      </div>
    </Card>
    </Grid>
    
    </Grid> 
     ))}
    </Grid>
       


<br />
  

      <div style={{marginLeft:40,marginTop:k*(1),marginBottom:100,marginRight:170}} >
        <h2>Job Details :</h2>

         <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Jobtitle</TableCell>
            <TableCell align="right">CompanyName</TableCell>
            <TableCell align="right">Recruiter name</TableCell>
            <TableCell align="right">description</TableCell>
            <TableCell align="right">email</TableCell>
            <TableCell align="right">jobtype</TableCell>
            <TableCell align="right">Salary</TableCell>
            <TableCell align="right">Vecancy</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align='right'>cancel</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {view1.map((row,idx) => (
            <TableRow key={idx}>
              <TableCell component="th" scope="row">
                {row.jobtitle}
              </TableCell>
              <TableCell align="right">{row.companyname}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.jobtype}</TableCell>
              <TableCell align="right">{row.salary}</TableCell>
              <TableCell align="right">{row.persons}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell style={{color:'red',cursor:'pointer'}} onClick={()=>setView1([])}>cancel</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
    
        {/* <Card >
          <div style={{marginLeft:20}}>
          <h4 style={{color:'green'}}>JobTitle :  {items.jobtitle}</h4>
          <h4 style={{color:'green'}}>Companyname : {items.companyname}</h4>
          <h4 style={{color:'green'}}>Recruiter name : {items.name}</h4>
          <h4 style={{color:'green'}}>Description : {items.description}</h4>
          <h4 style={{color:'green'}}>Email : {items.email}</h4>
          <h4 style={{color:'green'}}>Job type : {items.jobtype}</h4>
          <h4 style={{color:'green'}}>Salary : {items.salary} </h4>
          <h4 style={{color:'green'}}>Vacancies : {items.persons}</h4>
          <h4 style={{color:'green'}}>Location : {items.location}</h4>
          <Button style={{color:'red',marginLeft:100}} onClick={()=>setView1([])}>cancel</Button>
          </div>
        </Card><br /> */}
        
        
     
     
      </div>
    
{/* {apply.map((item,idx)=>(
  <div style={{marginLeft:500,marginTop:-100,marginBottom:100,marginRight:50}} key={idx}>
    <h1>{item.name} </h1>
    <h1>{item.jobseekerEmail} </h1>
    <h1>{item.phone} </h1>
    <h1>{item.location} </h1><br />

  </div>
))} */}
    




<div style={{marginLeft:50,marginRight:50,marginBottom:50}}>
<h2>Applied persons :</h2>
         <div style={{ height: 250, width: '100%' }}>
      <DataGrid rows={rows(apply)} columns={columns} pageSize={5} checkboxSelection />
     
    </div> 
    {/* <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Qualification</TableCell>
            <TableCell align="right">Stream</TableCell>
            <TableCell align="right">skills</TableCell>
            <TableCell align="right">Experience</TableCell>
            <TableCell align="right">location</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {apply.map((row,idx) => (
            <TableRow key={idx}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.jobseekerEmail}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.qualification}</TableCell>
              <TableCell align="right">{row.stream}</TableCell>
              <TableCell align="right">{row.skills}</TableCell>
              <TableCell align="right">{row.exp}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
              
            </TableRow>
          ))}
          <Button style={{color:'red'}} onClick={()=>setApply([])}>cancel</Button>
        </TableBody>
      </Table>
    </TableContainer> */}
    
    </div>
    </>
}

export default PostForm