import { getInitProfileData } from '@/lib/spotify/init-spotify-auth'
import React from 'react'

async function Homepage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] };
}) {
    const initData = await getInitProfileData(searchParams)

    return (
        <div>
            {JSON.stringify(initData)}
            <p>hi</p>
        </div>
    )
}

export default Homepage