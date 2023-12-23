import React,{useContext, useEffect, useState} from 'react'
import UserContext from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const LogIn = ()=>{

    const [user, setUser] = useState({username: "", password: ""})
    let{username,password} = user;

   const navigate = useNavigate();

    const {token,setToken} = useContext(UserContext);

    useEffect(()=>{
        if(token || localStorage.getItem("token")){
            navigate("/dashboard");
        }
    },[])

    function updateInput(e){
        let x = e.target.name
        setUser({...user,  [x]: e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault();
        console.log(username);
        console.log(password);
        if(!username || !password){
            alert("Please fill all the feilds");
            return;
        }

        try {
            
            fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password,
            })
            })
            .then(res => res.json())
            .then(res=>(
                console.log(res),
                setToken(res.token),
                localStorage.setItem("token",res.token),
                localStorage.setItem("id",res.id),
                setUser({email: "", password: ""}),
                alert("User Logged in successully"),
                navigate("/dashboard")
            ));
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='log-in-div'>
            <div className='logo'>
                <p>Sign in to your account</p>
            </div>
            <div className='enter-data'>
              <form className='input-div' onSubmit={handleSubmit}>
                <input type='text' placeholder='Username' name='username' onChange={updateInput} value={username}/>
                <input type='password' placeholder='Password' name='password' onChange={updateInput} value={password}/>
                <div style={{display:"flex", justifyContent:"center"}}>
                <button className='log-in-btn' type='submit'>LogIn</button> 
                </div>                             
              </form>
            </div>
            <div className='sign-up-option'>
                <p>Don't have an account? <a className='sign-up-link' href='#'>Sign up</a></p>
            </div> 
        </div>
    )
}


export default LogIn;