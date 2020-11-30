const mongoclient = require('mongodb').MongoClient
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))

mongoclient.connect('mongodb+srv://ShivanshGupta:india@2006@blogdb.xowev.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology:true})

        
 .then(client=>{
     console.log('Connected to database')
     const db = client.db('Blogs')
     const title = db.collection('Title')
     app.set('view engine','ejs')
     app.listen(3000,function(req,res){
        console.log('server is running')
    })
    app.get('/', function(req,res){
        res.sendFile(__dirname+'/index.html')
    })
    app.get('/blogs',function(req,res){
      db.collection('Title').find().toArray()
        .then(result=>{
            console.log(result)
            res.render('blogs.ejs', {Blogs:result})
        })
        .catch(error=>{
            console.error(error)
            
        })
     })
    
    app.post('/blogs',function(req,res){
        console.log(req.body)
        title.insertOne(req.body)
        .then(result=>{ 
            res.redirect('/blogs')
        })

        .catch(error=>{
            console.error(error)
        })
    })
 })





