import React ,{useContext}from "react";
import { Link ,useNavigate} from "react-router-dom";
import { UserContext } from "../App";
const Navbar = () =>{
    const {state ,dispatch}=useContext(UserContext)
    const history=useNavigate()
    const renderList = () =>{
        // console.log(state)
        if(state){
            return[
                    <li><Link to="/profile">Profile</Link></li>,
                    <li><Link to="/mypost">MyPost</Link></li>,
                    <li><Link to="/createpost">CreatePost</Link></li>,
                    <li>
                        <button className="btn #c62828 red darken-3"
                                onClick={()=>{
                                    localStorage.clear()
                                    dispatch({type:"CLEAR"})
                                    history("/login")
                                }}
                                
                        >
                    Logout
                </button>
                    </li>
            ]
        }
        else{
            return[
                    <li><Link to="/login">Login</Link></li>,
                    <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }
    return(
        <nav>
            <div className="nav-wrapper white">
            <Link to={state?"/":"login"} className="brand-logo left">DestiShare</Link>
            <ul id="nav-mobile" className="right ">
                { renderList()}
            </ul>


            </div>
        </nav>
    )
}

export default Navbar