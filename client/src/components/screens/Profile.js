import React,{useState,useEffect, useContext} from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
const Profile = () =>{
    const [mypics,setPics]=useState([])

    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
        })
    },[])
    // console.log(mypics)
    return(
       <div style={{
        maxWidth:"550px",
        margin:"0px auto"
       }}> 
            <div style={{
                    display:"flex",
                    justifyContent:"space-around",
                    margin:"18px 0px",
                    borderBottom:"1px solid grey"
                }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src={state?state.pic:"loading"}
                    alt=" "
                    />
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h6>{mypics.length} post</h6>
                        
                    </div>
                </div>
            </div>

            <div className="gallery" >
                {
                    mypics.map(item=>{
                        // console.log(item)
                        return(
                            <img style={{margin:"10px auto"}} key={item._id} className="item" src={item.photo} alt={item.title} 
                            onClick={()=>{window.location="/mypost"}}

                            
                                // onClick={<Link to="/mypost">{it} </Link>}
                            />

                        )
                    })
                }
                
            </div>
       </div>
    );
}

export default Profile