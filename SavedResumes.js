import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Button, Card, Grid, TextField,makeStyles, Container } from "@material-ui/core"
import { deletefavorite, getfavorite } from "../actions/auth-action";
import axiosInstance from "../helpers/axios";
import { Redirect } from "react-router"
const SavedResumes=()=>{

    const [resumes,setResumes]=useState([])
    const [message,setMessage]=useState('')
    const [message1,setMessage1]=useState('')
   // const select=useSelector(state=>state.auth1)
    const auth=useSelector(state=>state.auth)
    const dispatch=useDispatch()
// useEffect(()=>{
// //   

// axiosInstance.get(`/getresume/${localStorage.getItem('id')}`)
// .then(resp=>setResumes(resp.data))
// .catch(err=>setResumes(err))
// },[])
 
    const select=useSelector(state=>state.auth1) 
 useEffect(()=>{
    //dispatch(getfavorite())
    //setResumes(select)
 const getresu=async()=>{ 
    axiosInstance.get(`/getresume/${localStorage.getItem('id')}`)
    .then(res=>setResumes(res.data))
    .catch(err=>setResumes(err))
 }
 getresu()
 },[])

const delet=(id)=>{
   // dispatch(deletefavorite(id))
   axiosInstance.delete(`/resumedelete/${id}`)
   .then(res=>setMessage1('true',res)).catch(err=>console.log(err))
  // setTimeout(() => setMessage("Deleted..." ), 80,100)
 //  setMessage('deleted...')
}
if(!auth.authenticate){
    return <Redirect to="/signin" />
}
console.log("component",select)
if(message1==='true'){
    axiosInstance.get(`/getresume/${localStorage.getItem('id')}`)
    .then(res=>setResumes(res.data))
    .catch(err=>setResumes(err))
    setMessage1('false')
    //setMessage1("no saved resumes")
}
    return<>
     <div>
         <br />
         <br />
         <h2  style={{marginLeft:100}}>Saved Resumes</h2>
         <hr />
        <h5 style={{marginLeft:200,color:'red'}}> {message}</h5>
        {resumes.map((item,idx)=>(
            <Card style={{marginRight:700,marginLeft:100,marginBottom:50}}>
               <div key={idx} >
                  
               
             <h6>Name  :{item.fullname}</h6> 
             <h6>Email  :{item.email}</h6>
            <h6>Phone  :{item.phone}</h6>
            <h6>Skills  :{item.skills}</h6>
            <h6>Location  :{item.location}</h6>
            <h6>Qualification  :{item.qualification}</h6>
            <h6>Updated date  :{item.createdAt}</h6> 
            <h6>Resume   :{item.resume}</h6> 
            </div>
            <IconButton onClick={()=>delet(item._id)} style={{marginLeft:270,marginTop:-300,color:'red'}} aria-label="add to favorites">
                     
                   Delete  {/* <Button onClick={()=>delet(item._id)} style={{color:'red'}}>delete</Button> */}
                   </IconButton>

        </Card>
        ))}
        {/* <h6 style={{color:'blue'}}>{message1}</h6> */}
     </div>
    </>
}

export default SavedResumes