import { useState } from "react"
import {Grid,makeStyles,Button} from "@material-ui/core"
//import axios from "axios"
import axiosInstance from "../helpers/axios"
import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
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
import { NavLink } from "react-router-dom";
import Update from "./Update";
//import { Button } from "bootstrap";

const userStyles=makeStyles((theme)=>({
    cards:{
        backgroundColor:"#d9dcf1",
        height:"340px",
        padding:"50px"
    },
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

const g=localStorage.getItem('email')

export const GetData=()=>{
 
  const auth = useSelector(state => state.auth)
    //const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
    const [posts,setPosts]=useState([])
    const [act,setAct]=useState(false)
    const [update1,setUpdate1]=useState([])
    const classes=userStyles()

    const upd=(id)=>{

         setUpdate1(id)
    
  //console.log(update1)
}
//console.log(act)
   useEffect(()=>{
      
        axiosInstance.get(`/jobdata/${localStorage.getItem('email1')}`)
        .then(res=>setPosts(res.data) )
        .catch(error=>console.log(error))
       

      
    },[])

   const del=(id)=>{
     console.log("delete",id)
     axiosInstance.delete(`/del/${id}`).then(res=>setAct("deleted"))
     .catch(err=>console.log(err))
    
   }

   if(!auth.authenticate){
    return <Redirect to="/signin" />
}
//console.log(localStorage.getItem('email1'))
//console.log(auth.email1)



    return<>    
     <br />
    <br />
      <Update message={update1} /> 
      <br />
      <h1 style={{color:'green',marginLeft:550}}>posted jobs</h1>
        <hr />
    {posts.map((item,idx)=>(

           
      
       <Grid container direction="row" alignItems='center' spacing={4} justify="space-around" className={classes.grid}>
         <Grid item xs={3}  >
           <Grid >
    <Card className={classes.root} style={{color:"green",}}>


     <div key={idx}>  
      <CardHeader
        // avatar={
        //   // <Avatar aria-label="recipe" className={classes.avatar}>
        //   //   R
        //   // </Avatar>
        // }
        action={
          <IconButton aria-label="settings">
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


        <Button style={{backgroundColor:"red",color:"white"}} onClick={()=>del(item._id)}>delete</Button>
        <Button onClick={()=>upd(item)}  style={{backgroundColor:"blue",marginLeft:5,color:"white"}}>Edit</Button>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
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
      </Collapse>
      </div>
    </Card>
    </Grid>
    
    </Grid> 
    </Grid>
          
   

    
    ))}

    </>
}