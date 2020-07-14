import React, { useState, useEffect, CSSProperties } from 'react';

export default function Login()
{
    const [animationStarted, setAnimationStarted] = useState(false);
    const [clickedLogin, setClickedLogin] = useState(false);

    const fadeTime = 1.5;
    useEffect(() => {
        setTimeout(() => setAnimationStarted(true), 250);
    }, [])

    function lineStyle(line: number)
    {
        const show = animationStarted && !clickedLogin;
        return {
            fontSize: 100,
            opacity: show ? 1 : 0,
            transform: `translateY(${show ? 0 : -50}px)`,
            transitionDuration: `${clickedLogin ? 0.5 : fadeTime}s`,
            transitionDelay: `${clickedLogin ? 0 : line*fadeTime}s`
        };
    }

    return <div style={{margin: `100px 200px`}}>
            <div style={lineStyle(0)} >Hey</div>
            <div style={lineStyle(1)} >Let's get you logged in.</div>
            <button style={{...lineStyle(2), float: "right"}} onClick={() => setClickedLogin(true)}>🡆</button>
        </div>
}