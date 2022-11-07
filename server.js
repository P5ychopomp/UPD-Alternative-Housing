const express = require('express')
const app = express()

//app.use(express.static("public"))

app.get("/", (req,res)=>{ // home page
    res.sendFile('public/index.html',{root: __dirname})
})

app.get("/results", (req,res)=>{ // results page
    res.sendFile('public/results.html',{root: __dirname})
})

app.get("/api/listings", (req,res)=>{ // test api
    if (req.query.key==='sunrise') //get query keyword
        res.json([{name: "sunrise dormitories", address: "street", area: 20, pricing: 5000},{name: "sunrise 2 dormitories", address: "street", area: 20, pricing: 5000}])
    res.end()
})

app.listen(3000)