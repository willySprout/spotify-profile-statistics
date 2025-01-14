"use client"

import { useRouter } from 'next/navigation';
import React from 'react'

function Homepage() {
    const router = useRouter()

    const handleLogin = () => {
        router.push('/api/login');
    };

    return (
        <div>
            <button onClick={handleLogin}>login</button>
            <p>hi</p>
        </div>
    )
}

export default Homepage