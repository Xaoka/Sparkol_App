import React, { useState, useEffect, CSSProperties } from 'react';
import axios from 'axios';

export default function Login()
{
    const [animationStarted, setAnimationStarted] = useState(false);
    const [clickedLogin, setClickedLogin] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");
    const [loginFailed, setLoginFailed] = useState(false);

    const fadeTime = 1.5;
    useEffect(() => {
        setTimeout(() => setAnimationStarted(true), 250);
    }, [])

    function lineStyle(line: number): CSSProperties
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
    function lineStyleForm(line: number): CSSProperties
    {
        const show = showLoginForm;
        return {
            fontSize: 100,
            opacity: show ? 1 : 0,
            transform: `translateY(${show ? 0 : -50}px)`,
            transitionDuration: `${showLoginForm ? 0.5 : fadeTime}s`,
            transitionDelay: `${showLoginForm ? 0 : line*fadeTime}s`
        };
    }

    function transitionToLogin()
    {
        setClickedLogin(true);
        setTimeout(() => setShowLoginForm(true), 500);
    }

    async function submitLogin(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        event.stopPropagation();
        try
        {
            const response = await axios.post(`http://localhost:3333/login`, { username: usernameInput, password: passwordInput })
            if (response.data.token)
            {
                const verificationResponse = await axios.get(`http://localhost:3333/verifyToken`, { headers: { "Authorization": `Bearer ${response.data.token}` }});
                if (verificationResponse.status === 200)
                {
    
                }
                else
                {
                    //TODO
                }
            }
            else
            {
                //TODO
                setLoginFailed(true);
            }
        }
        catch (error)
        {
            setLoginFailed(true);
        }
    }

    if (showLoginForm)
    {
        return <div style={{margin: `100px 200px`}}>
            <div style={lineStyleForm(0)} >{loginFailed ? "That didn't seem right" : "Who are you?"}</div>
            <form onSubmit={submitLogin}>
                <input type="text" name="username" style={lineStyleForm(0)} autoComplete="username" placeholder="username" onChange={(evt) => setUsernameInput(evt.target.value)}/>
                <input type="password" name="password" style={lineStyleForm(0)} autoComplete="password" placeholder="password" onChange={(evt) => setPasswordInput(evt.target.value)}/>
            <button style={{...lineStyleForm(2), float: "right"}} >🡆</button>
            </form>
        </div>
    }

    return <div style={{margin: `100px 200px`}}>
            <div style={lineStyle(0)} >Hey</div>
            <div style={lineStyle(1)} >Let's get you logged in.</div>
            <button style={{...lineStyle(2), float: "right"}} onClick={transitionToLogin}>🡆</button>
        </div>
}