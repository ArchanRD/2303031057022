import React, { useState } from 'react'
import { useEffect } from 'react';

const Redirect = () => {
    const params = new URLSearchParams(window.location.search);
    const shortcode = window.location.pathname.substring(1);


    const handleRedirect = async () => {
        const res = await fetch(`http://localhost:8000/${shortcode}`, {
            method: "GET",
        })

        const resJson = await res.json();
        console.log(resJson.url)
        
        window.location.href= resJson.url;
    }

    useEffect(() => {
        handleRedirect()
    }, [])
    return (
        <div>
            <h2>Redirect Page</h2>
            <div>URL Parameters:</div>
            {Array.from(params.entries()).map(([key, value]) => (
                <div key={key}>
                    {key}: {value}
                </div>
            ))}
        </div>
    )
}

export default Redirect