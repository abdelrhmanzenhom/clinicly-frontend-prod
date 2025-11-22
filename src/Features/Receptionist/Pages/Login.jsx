import React, { useEffect, useState } from 'react'

export default function Login() {
    const [userData, setUserData] = useState([])
    useEffect(()=>{
        try {

            await fetch("hsdhjshjsda")
        }
catch (err) {
    console.log(err);
}
    },[])


  return (
    <div>{userData}</div>
  )
}
