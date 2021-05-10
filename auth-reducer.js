import { authConstants } from "../actions/constants"

const initState={
user:{
    email:"",
    password:"",
    token:''
},
authenticate:false,
authenticating:false,
email1:""
}

export const authReducer=(state=initState,action)=>{
    console.log(action)
    switch( action.type){
        case authConstants.LOGIN_REQUEST: 
        state={
            ...state,
           authenticating:true
        }
        break;
        case authConstants.LOGIN_SUCCESS:
            state={
                ...state,
                user:action.payload.user,
                token:action.payload.token,
                authenticating:false,
                authenticate:true,
                //email1:action.payload.user.email
            }
            break;
            case authConstants.LOGOUT_SUCCESS:
                state ={
                    ...initState
                }
                break

                
                  
    }

    return state
}

let favorite=[]
export const addReducer=(state=favorite,action)=>{
    switch(action.type){
        case authConstants.ADD_FAVOURITEL:
            
            
              //return [ ...state,action.payload]
              break;

            case authConstants.GET_FAVOURITE:
                 console.log("reducer",action.payload)
                return [action.payload]
            
              case authConstants.DELETE_FAVORITE:
            //let del=state.findIndex((e)=>e.id===action.payload)
              return [...state.slice(0,action.payload), ...state.slice(action.payload+1)]
         
        default:
            return state
           
            }
           //default: 
           //console.log("reducer",state) 
             return state 
    }
