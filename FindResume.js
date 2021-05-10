
import { Button, Card, Grid, TextField,makeStyles, Container } from "@material-ui/core"
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import {addfavourite, findresume, isUserLoggedIn, login} from '../actions/auth-action'
import { Redirect } from "react-router"
import {useDispatch, useSelector} from "react-redux"
import { useState } from "react"
import axiosInstance from "../helpers/axios"
import * as React from 'react';
import {Document,Page} from 'react-pdf'
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core'
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//import { DataGrid,GridApi, GridColDef,GridCellValue } from '@material-ui/data-grid';
import {
    DataGrid,
    GridColDef,
    GridApi,
    GridCellValue
  } from "@material-ui/data-grid";
const userStyles=makeStyles((theme)=>({
    cards:{
        backgroundColor:"#d9dcf1",
        height:"230px",
        padding:"40px"
    },

}))

const FindResume=()=>{

        const [skill,setSkills]=useState('')
        const [locations,setLocation]=useState('')
        const [error,setError]=useState('')
        const [resume,setResume]=useState([])
        const [res,setRes]=useState(null)
        const [data1,setData1]=useState('')
        const [numPages, setNumPages] = useState(null);
        const [pageNumber, setPageNumber] = useState(1);
         //const [save1,setSave1]=useState([])
        
        const auth=useSelector(state=>state.auth)

        // const auth1=useSelector(state=>state.auth1)
        // console.log("auth1",auth1)
        
        function onDocumentLoadSuccess({ numPages }) {
            setNumPages(numPages);
          }

        const dispatch  =useDispatch()
    
       
    
        const classes=userStyles()
    
        const userLogin=(e)=>{
            e.preventDefault()
            const skills=skill.trim()
            const location=locations.trim()
            const user={
                skills,
                location
            } 
            if(skills=="" || location==""){
                setError("please enter a data")
            }else{
                axiosInstance.get(`/getting/${skills}/${location}`).then(resp=>setResume(resp.data))
                .catch(err=>console.log(err))
                // dispatch(findresume(user))
                // setResume([localStorage.getItem('resumes')])
                // setData1('true')
            }
              
        }
        // if(data1=="true"){
        //     setPrint(resume)
        //     setData1('false')
        // }
        // console.log(print)
    
        if(!auth.authenticate){
            return <Redirect to="/signin" />
        }

    
     const sa=(item)=>{
     console.log(item)
        const {_id, fullname,email,password,phone,qualification,stream,
            skills,exp,resume,location,}=item
            setRes(item.resume)
      const user={
        fullname,email,phone,qualification,stream,skills,exp,resume,location,
        recrt:localStorage.getItem('id'),
       
      }
      dispatch(addfavourite(user))
      setData1('saved successfully...')
     }
    //console.log("recruter - id",localStorage.getItem('id'))
const resumeView=(item)=>{
    setRes(item.resume)
    console.log(item)
}


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'fullname', headerName: 'Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 200 },
        {field : 'skills', headerName: 'Skills',width:130},
        {field : 'location',headerName: 'Location',width:110},
        {field : 'qualification',headerName: 'Qualification',width:150},
        {field : 'updated',headerName:'Updated Date',width:150},
        { field: 'stream',headerName:'Stream',width:110},
        { field :'exp',headerName:'Experience',width:150},
        { field :'resume',headerName:'Resume',width:120,sortable:false,
        width: 120,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          const onClick1 = () => {
           //           
    const api= params.api;
            const fields1 = api
              .getAllColumns()
              .map((c) => c.field)
              .filter((c) => c !== "__check__" && !!c);
            const thisRow1= {};
    
            fields1.forEach((f) => {
              thisRow1[f] = params.getValue(f);
            });
    
            return resumeView(thisRow1);
          };
    
          return <Button onClick={onClick1} style={{color:'green'}}>View Resume </Button>;
        } },
        {
          field: 'phone',
          headerName: 'Phone',
          type: 'number',
          width: 150,
        },
        {field :'Save', headerName:'Save',width:100, sortable: false,
        width: 100,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          const onClick = () => {
           //
           
    const api= params.api;
            const fields = api
              .getAllColumns()
              .map((c) => c.field)
              .filter((c) => c !== "__check__" && !!c);
            const thisRow= {};
    
            fields.forEach((f) => {
              thisRow[f] = params.getValue(f);
            });
    
            return sa(thisRow);
          };
    
          return <Button onClick={onClick} style={{color:'green'}}>Save </Button>;
        } }
       // { field:'save',headerName:'Save',width:90}
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
      
       
        
        
           // { id: 1, lastName: 'Snow', firstName: item.fullname, age: 35 },
            // { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
            // { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
            // { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
            // { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
            // { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
            // { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
            // { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
            // { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
          
      const rows =(resume1)=> { 
          let i=0
        //   if(resume.length===0){ 
        //    return {No profiles found}
        //   }else
        return resume1.map((item,idx)=>(
             //<h1>hello</h1>
        //<h1>firstname:{item.fullname}</h1>
        { id:++i,email:item.email, fullname: item.fullname, phone:item.phone,
        skills:item.skills,location:item.location,qualification:item.qualification,
        stream:item.stream,exp:item.exp,resume:item.avatar,
        updated:item.createdAt ,
        }
        // { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        // { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        // { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        // { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        // { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        // { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        // { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
        
        ))}

        console.log("avatar",resume)
        console.log("pdf",res)

        const defaultLayoutPluginInstance = defaultLayoutPlugin();

        return<>
        <br />

       
        {/* <Viewer
    fileUrl={`http://localhost:6100/${res}`}
    plugins={[
        // Register plugins
        defaultLayoutPluginInstance,
        
    ]}
/> */}
        {/* <div>
      <Document
        file={`http://localhost:6100/${res}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div> */}
        {/* <Document file={"http://localhost:6100/", + res}>
            <h1>pdf</h1>
            <Page pageNumber={1} />

        </Document> */}
        {/* <img src='assets/job recruting.jpg' alt="" style={{marginLeft:40}} /> */}
        {/* <h2 style={{marginLeft:450}}>find job Seekers</h2> */}
        
        <br />

       
   {/* <div> {rows(resume)}</div> */}
        <Grid container spacing={3} >
        <Grid item xs>
    
        </Grid>
        <Grid  item xs spacing={3} >
            <Card className={classes.cards}>
                <form onSubmit={userLogin}>
                    <Grid container direction="column" alignItems='center' spacing={3} justify="space-around" className={classes.grid}>
                    <span style={{color:'blue',fontSize:25}}>Find job Seekers</span>
                       
                        <Grid item>
                            <TextField id="" label="Skills" varient='outlined'
                             value={skill} onChange={(e)=>setSkills(e.target.value)} />
                        </Grid>
                        <Grid item>
                            <TextField id="" label="Location" varient='outlined'
                             value={locations} onChange={(e)=>setLocation(e.target.value)} />
                        </Grid>
                        <Grid item>
                            <Button varient="contained" color="primary" disableElevation type='submit'>
                                Search
                            </Button><br/>
                            <span style={{color:'red'}}>{error}</span>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Grid>
        <Grid item xs>
    
        </Grid>
        </Grid>
<br />

<br />
<div style={{marginRight:30,marginLeft:30}}>
<div style={{ height: 400, width: '100%', }}>
      <DataGrid rows={rows(resume)} columns={columns} pageSize={5} checkboxSelection />
     
    </div>
</div>
        {/* {resume.map((item,idx)=>( 
            <div key={idx} style={{marginLeft:300,marginRight:700}}>
                <h4 style={{color:'brown'}}>job seeker details :</h4>
                <Card>
               
                    <h6>Name  :{item.fullname}</h6>
                    <h6>Email  :{item.email}</h6>
                    <h6>Phone  :{item.phone}</h6>
                    <h6>Skills  :{item.skills}</h6>
                    <h6>Location  :{item.location}</h6>
                    <h6>Qualification  :{item.qualification}</h6>
                    <h6>Updated date  :{item.createdAt}</h6>
                    <h6>resume : {item.avatar}</h6>
                    <Button onClick={()=>sa(item)} style={{marginLeft:170,marginTop:-30,color:'red'}} aria-label="add to favorites" >
                             save
                             </Button>
                </Card>
                <h3 style={{color:'green'}}>{data1}</h3>
                <br /><br />
            </div>        ))}

 */}



                {/* <table border="1">
                    <tr>
                        <th>name:</th>
                <td>{item.fullname}</td>
                </tr>

                <tr>
                    <th>email:</th>
                <td>{item.email}</td>
                </tr>

                <tr>
                    <th>phone:</th>
                <td>{item.phone} </td>
                </tr>
                <tr>
                    <th>skills:</th>
                <td>{item.skills}</td>
                </tr>
                <tr>
                    <th>location:</th>
                <td>{item.location}</td>
                </tr>
                <tr>
                    <th>Qualification:</th>
                <td>{item.qualification}</td>

                </tr>
                <tr>
                    <th>updated date</th>
                    <td>{item.createdAt} </td>
                </tr>
                </table> */}
                  {/* <Button style={{color:'white',backgroundColor:"green"}} onClick={()=>setData1(item)}>save</Button> */}
              
<h2 style={{marginLeft:550,marginTop:50}}>Resumes</h2>
<hr style={{backgroundColor:'red',height:1,marginBottom:50}}/>
<div style={{
  width: '100%',
  height: '800px',
  backgroundColor: '#e4e4e4',
  overflowY: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems:' center',
}}>
        {/* show pdf conditionally (if we have one)  */}
        {res&&<><Worker workerUrl=
        "https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
          <Viewer fileUrl={ `http://localhost:6100/${res}`}
            plugins={[defaultLayoutPluginInstance]} />
      </Worker></>}

      {/* if we dont have pdf or viewPdf state is null */}
      {!res&&<>No pdf file selected</>}
      </div>
    </>
}

export default FindResume