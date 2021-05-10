import {NavLink} from "react-router-dom"
import {Button} from "@material-ui/core"
const PostJob=(props)=>{ 
    return<>
    <br />
    <br />
    <br />
    <img src='assets/images job.jpg' alt="" style={{marginLeft:440}} />
    
    <h1 style={{marginLeft:250,fontSize:60}}>Let's Make Your Next Great</h1>
    <h1 style={{marginLeft:450,fontSize:60}}>Hire, fast</h1>
  
<Button variant="contained" color="primary"  style={{marginLeft:590,marginTop:50,}}>
  <NavLink to="/post" style={{textDecoration:"None",color:"white"}}> Post A Job</NavLink>
</Button>
    </>
}
export default PostJob