import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const DashBoard = ()=>{

    const[user,setUser] = useState({});
    const {token,setToken} = useContext(UserContext);
    const {id,setId} = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        if(token === ""){
            let token_from_local_storage = localStorage.getItem("token");
            let id_from_local_storage = localStorage.getItem("id");
            if(token_from_local_storage){
                setToken(token_from_local_storage);
                setId(id_from_local_storage);
            }else{
                navigate("/")
            }
        }
    },[])

    useEffect(()=>{
        getUserDetails();
        setToken("");
        setId("");
    },[])

    async function getUserDetails(){
        try {
            const response = await axios.get(`https://dummyjson.com/users/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }})
            setUser(response);
        } catch (error) {
            alert(error)
        }
    }
  
    return(
        <div>
            <h1>DashBoard</h1>
            
            {
                user && (<div>
                    <img src={user.image}/>
                    <h3>First Nmae : {user.firstName}</h3>
                    <h3>Last Name : {user.lastName}</h3>
                    <h3>Gender : {user.gender}</h3>
                </div>   
                )
            } 
              
        </div>
    )
}


export default DashBoard;