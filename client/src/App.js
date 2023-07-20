import React,{useEffect,createContext,useReducer ,useContext} from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter,Route, Routes,useNavigate} from 'react-router-dom';

import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import Createpost from './components/screens/Createpost';
import Mypost from './components/screens/Mypost';
import { reducer ,initialState} from './reducers/userReducer';

export const UserContext = createContext()

const Routing= ()=>{
  const history=useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})

    }else{
      history("/login" )
    }
  },[])
  return(
    
        <Routes>
        <Route path="/" element={<Home/>} />
        
        <Route path="/login" element ={<Login/>} />

        <Route path="/signup" element={<Signup/>} />
        <Route path="/profile" element={  <Profile/>}/>
        <Route path="/createpost" element={  <Createpost/>}/>
        <Route path="/mypost" element={  <Mypost/>}/>


      

      </Routes>

  )
}

function App() {
  const [state, dispatch] = useReducer(reducer,initialState)

  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar/>
      <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
