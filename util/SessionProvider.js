'use client';

import Navbar from '@/components/Navbar';
import {SessionProvider} from 'next-auth/react';

const AuthProvider = ({children})=>{
    return <SessionProvider>
        <Navbar/>
        {children}
    </SessionProvider>
}

export default AuthProvider;