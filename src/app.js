//There is one way that we have to declare first nodejs module then npm module
const path = require('path') // Node.js module so it is not downloaded
const express = require('express') // Npm module
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000   


const request  = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const publicDir = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialPath = path.join(__dirname , '../templates/partials')

// Setting the handlebar engine and views location
app.set('view engine' , 'hbs')
/*
The below command is used because an express default finds the views folder 
so we rename it to the templates folder and given the values of views to the 
templates folder 
 */
app.set('views' , viewsPath) 
hbs.registerPartials(partialPath)


// app.use is to modify the express and set the static file in the public folder
app.use(express.static(publicDir))





app.get('' , (req , res)=>{
    res.render('index' , {
        title:'Weather App',
        name:'Raj Shah'
    })

})

app.get('/about' , (req , res)=>{
    res.render('about' , {
        title:'About me',
        name:'Raj Shah'
    })

})

app.get('/help' , (req , res)=>{
    res.render('help' , {
        title:'This is the help page',
        name : 'Raj Shah'
    })
})

app.get('/weather' , (req , res)=>{
    if(!req.query.address){
        return res.send({
            error:"You should provide a string"
        })
    }

    geocode(req.query.address , (error , {latitude , longitude , location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude , longitude , (error , forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
   
})

app.get('/products' , (req , res)=>{
    if(!req.query.search){
        // This is done in order to stop 
        return res.send({
            error:'Your should give search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*' , (req , res)=>{
    res.render('404' , {
        title:'Article',
        name:'Raj Shah',
        errormsg:'Sry not found the article'
    })
})

app.get('*' , (req , res)=>{
    res.render('404' , {
        title:'Page not found',
        errormsg:"This is 404 msg",
        name:'Raj Shah'
    })
})

app.listen(port , ()=>{
    console.log("The web is running on "+ port)
})


// Extra INFO
// console.log(__dirname)
// console.log(path.join(__dirname , '../public'))