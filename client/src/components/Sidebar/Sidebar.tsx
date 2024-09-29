"use client"

import { fetchUser } from '@/lib/fetchers';
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { shallow } from 'zustand/shallow';


function Sidebar() {
    const [cookie, setCookie] = useCookies(["security-token"]);
    // console.log(cookie);
    // useEffect(() => {
    //     fetchUser(cookie, setUser)
    // },[cookie.user])

    // useEffect(() => {
    //   fetchUser(email)
    // }, [])
    
  return (
      <div className='w-full md:!block sidebar z-10 border-r-2 border-slate-400  md:w-1/2 lg:w-1/3 p-3 bg-white h-screen'>
          {/* SEARCHBAR */}
          {/* <SearchBar user={myUser}/> */}
          {/* CHATLIST */}
          {/* {myUser && <ChatList mySelf={myUser} />} */}

    </div>
  )
}

export default Sidebar