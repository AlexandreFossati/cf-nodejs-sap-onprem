const { JWTStrategy } = require('@sap/xssec')
const xsenv = require('@sap/xsenv')
const passport = require('passport')
const express = require('express')
const axios = require('axios')
const SapCfAxios = require('sap-cf-axios').default
const destination = SapCfAxios('OnPremDestination') //name of the destination in the subaccount

const app = express()
const port = process.env.port || 8080

const envUAA = xsenv.getServices({ uaa: { tag: 'xsuaa' } }).uaa
const jwtStrat = new JWTStrategy(envUAA)
passport.use(jwtStrat)

app.use(passport.initialize())
app.use(passport.authenticate('JWT', {session: false}))

app.get('/', async (req, res) => {
    res.send(`service is available`)    
})

app.get('/cg1', async (req, res) => {
    try {
        const response = await destination({
            method: "GET",
            url: "/sap/opu/odata/sap/ZVA0_GW_OEM_ORDERS_SRV/IdocSet"
        })    
        res.send(response.data)

    } catch(e) {
        res.send(e)
    }
    
})

app.get('/google', async (req, res) => {
    try {
        const response = await axios({
            method: "GET",
            url: "https://www.google.com/"
        })
        res.send(response.data)

    } catch(e) {        
        res.send(e)
    }
    
})

app.listen(port, console.log(`listening on port ${port}`))