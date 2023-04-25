//Solomon Hearn wrote this without chatGPT
import { CssBaseline, Typography} from '@mui/material'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'


const Layout = (props) => {


    // const [loginToken, setLoginToken] = useState(null)

    return (
        <>
            <CssBaseline/>
        
            loginStatus = {props.loginStatus}
            setLoginStatus = {props.setLoginStatus}
            
            <Outlet loginToken={props.loginStatus} setLoginToken={props.setLoginStatus}/> {/** Renders currently selected route */}
            <footer className={classes.footer}>
                <Typography variant='h6' align='center' gutterBottom>
                    GPT Prompt Practice
                </Typography>
                <Typography variant='subtitle1' align='center' color='inherit'>
                    Made by Solomon Hearn & Gabe Denton
                </Typography>
            </footer>
        </>
    )
}

export default Layout