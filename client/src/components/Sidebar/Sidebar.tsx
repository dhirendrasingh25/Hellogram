"use client";

import { fetchUser } from '@/lib/fetchers';
import React, { useEffect } from 'react';
import { useUser } from '@/store/useStore';
import { shallow } from 'zustand/shallow';
import SearchBar from './SearchBar';

function Sidebar() {

    const myUser = useUser((state) => state.myUser, shallow);
    const setUser = useUser((state) => state.setUser);

    useEffect(() => {
        if (!myUser) {
            getUser();
        }
    }, [myUser]); 

    const getUser = async () => {
        try {
            await fetchUser(setUser);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

  return (
    <div className='w-full md:!block sidebar z-10 border-r-2 border-slate-400  md:w-1/2 lg:w-1/3 p-3 bg-white h-screen'>
          <SearchBar user={myUser}/>
          {/* {myUser && <ChatList mySelf={myUser} />} */}
    </div>
  );
}

export default Sidebar;
