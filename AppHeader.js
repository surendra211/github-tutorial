import React, { Component } from 'react'
import { AppBar, Toolbar, Grid } from "@material-ui/core"
import { NavLink, Route } from 'react-router-dom'
import Signin from './Signin'
import SignUp from './SignUp'
import Forget from "./Forget"
import PostJob from './PostJob'
import PrivateRoute from "../components/hoc/PrivateRoute"
import PostForm from './PostForm'
import { GetData } from './GetData'
import { getfavorite, isUserLoggedIn, signout } from "../actions/auth-action"
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import FindResume from './FindResume'
import Update from './Update'
import SavedResumes from './SavedResumes'
//import {NavLink,Route} from 'react-router-dom'
function AppHeader() {
    
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (!auth.authenticate) {
            dispatch(isUserLoggedIn())
        }

      
    }, [])

    const logout=()=>{
        dispatch(signout())
    }
    const renderLoggedIn = () => {
        return (
            <span>
                <NavLink to="/post" style={{textDecoration:"None",color:"white",marginLeft:30}}> Post Job</NavLink>
                {/* <NavLink to="/geet" style={{textDecoration:"None",color:"white",marginLeft:10}}> Job details</NavLink> */}
                <NavLink to="/find" style={{textDecoration:"None",color:"white",marginLeft:10}}> Find Resumes</NavLink>
               <NavLink to='/saveresume'> <IconButton aria-label="add to favorites" style={{color:'white', marginLeft: 750}} > <FavoriteIcon />
                           </IconButton></NavLink>
                 < span onClick={logout} style={{ color: 'white', marginLeft: 10, textDecoration: "None" }}>SignOut</ span>
            </span>

        )

    }
    const renderLoggedOut = () => {
        return ( 
            <span>
            <NavLink to='/signup' style={{ color: 'white', marginLeft: 950, textDecoration: "None" }}>SignUp</NavLink>

            <NavLink to='/signin' style={{ marginLeft: 30, color: 'white', textDecoration: "None" }} >SignIn</NavLink>
            </span>
        )
       

    }

    return <>
        <AppBar position="static">
            <Toolbar variant="dense">
                <NavLink to="/" style={{color:"white",textDecoration:"None"}}><h3>job Application</h3></NavLink>
                <h3></h3>
             {auth.authenticate ? renderLoggedIn() : renderLoggedOut()}
            </Toolbar>
        </AppBar>




        <PrivateRoute path='/' exact component={PostJob} />
        <Route path='/signup' component={SignUp}></Route>
        <Route path='/signin' component={Signin}></Route>
        <Route path="/forget" component={Forget}></Route>
        <Route path="/post" component={PostForm} />
        <Route path='/geet' component={GetData} />
        <Route path='/find' component={FindResume} />
        <Route path='/update' component={Update} />
        <Route path='/saveresume' component={SavedResumes} />
        {/* <Signin /> */}
        {/* <SignUp /> */}
    </>

}

export default AppHeader
