const request = require('request')

const forecast = (latitude , longitude , callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=c294541dd1483bc632c58ef5e30e6723&query='+latitude+','+longitude+'&units=f'
    request({url:url , json:true} , (error,response)=>{
        if(error){
            callback("Unable to contact the weather service" , undefined)
        }
        else if(response.body.error){
            callback("Something wrong happened" , undefined)
        }
        else{
            const current = response.body.current
            // const temp = {
            //     weather:current.weather_descriptions[0],
            //     temp: current.temperature,
            //     app_temp:current.feelslike
            // }
            callback(undefined , current.weather_descriptions[0] + " The current temp is "+current.temperature+" it feels like "+current.feelslike)
        }
    })
}

module.exports = forecast

/*

This is the first time I did 

This is the integration of the api of weather from weatherstack
const url = 'http://api.weatherstack.com/current?access_key=c294541dd1483bc632c58ef5e30e6723&query=37.8267,-122.4231&units=f'

request({url:url , json:true} , (error , response)=>{
    // const data = JSON.parse(response.body)
    // This error in the parameter is just for the low level network 

    if(error){
        console.log("Unable to contact the weather service")
    }
    else if(response.body.error){
        // This is used when there is an error in the input 
        console.log("Something wrong has happened")
    }
    else{
        const current = response.body.current
        const current_temp = current.temperature
        const app_temp = current.feelslike
        console.log(current.weather_descriptions[0] + " The current temp is "+current_temp+" it feels like "+app_temp) 
    }
    
})




*/