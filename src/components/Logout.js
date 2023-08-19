import React,{useContext, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App';

const Logout = () => {
    const {state,dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    const callHome = async () => {
        try {
          const res = await fetch('./logout', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              "Content-Type": 'application/json'
            },
            credentials: "include",
          });
    
          const data = await res.json();
          if(data){
            dispatch({type:"LOGOUT"});
            navigate('/login');
          } 
          if (res.status !== 200) {
            const error = new Error(res.error);
            throw error;
          }
          
        } catch (error) {
          console.log(error);
        }
      }
    
      useEffect(() => {
        callHome();
      }, []);

  return (
    <>
    </>
  )
}

export default Logout