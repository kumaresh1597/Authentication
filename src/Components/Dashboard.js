import axios from 'axios';
import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashBoard = ()=>{

    const[user,setUser] = useState({});
    const navigate = useNavigate();
    let id_from_local_storage;
    useEffect(()=>{
            let token_from_local_storage = localStorage.getItem("token");
            if(!token_from_local_storage){
                navigate("/");
            }else{
                id_from_local_storage = localStorage.getItem("id");
                localStorage.clear();
            }
            
    },[])

    useEffect(()=>{
        getUserDetails();
    },[])

    async function getUserDetails(){
        try {
            const response = await axios.get(`https://dummyjson.com/users/${id_from_local_storage}`)
            console.log(response.data);
            setUser(response.data);
        } catch (error) {
            alert(error.response.data.message);
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
                    <h3>Date of Birth : {user.birthDate}</h3>
                    <h3>Blood group : {user.bloodGroup}</h3>
                    <h3>Age : {user.age}</h3>
                    <h3>Email : {user.email}</h3>
                    <h3>Mobile : {user.phone}</h3>
                    
                </div>   
                )
            } 
              
        </div>
    )
}


export default DashBoard;