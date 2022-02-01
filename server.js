
const express =  require('express') 
const bodyParser =  require('body-parser') 
const MongoClient= require('mongodb').MongoClient
//const { restart } = require('nodemon')


const app =express()
app.use(bodyParser.urlencoded({extended:true}))
const connectionString = "mongodb+srv://nagalakshmi1:Lakshmi123@cluster0.gvcmx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    MongoClient.connect(connectionString,{useunifiedtopology:true})
      .then(client => {
        console.log('connected to database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')

        app.post('/quotes', (req,res) => {
           quotesCollection.insertOne(req.body)
              .then(result=>{
              res.send(result)
               })
             .catch(error=>console.error(error))
        })
           app.get('/getall',(req,res)=>{
           db.collection('quotes').find().toArray()
              
                 .then(result=>{
                  res.send(result)
            })

            .catch(error=>console.error(error))
        })
        app.put
    

}).catch(console.error) 
        
   

   app.get('/',(req,res) =>{
       res.sendFile(__dirname + '/index.html')  
     })


 const PORT=3000
 app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`)
})