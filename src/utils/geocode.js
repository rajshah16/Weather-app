const request = require('request');

const geocode = (address , callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiY29kZXJyYWoxMjM0IiwiYSI6ImNrOGJuY3ZmbDBkdDEzaHFwZXp5cnBmMm8ifQ.dpfAJW1SpYczk5CUtVkY5A&limit=1';
    request({url:url , json:true} , (error , response)=>{
        if(error){
            callback('Unable to find the location' , undefined);
        }
        else if(response.body.features.length === 0){
            callback('Unable to find the location ! Search other' , undefined);
        }else{
            callback(undefined , {
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
            
        }
        
    })
    
}

module.exports = geocode


/*

this is the version 1 of the above code 
This is the intergration of the api for geocoding from mapbox
const url_geo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Borivali.json?access_token=pk.eyJ1IjoiY29kZXJyYWoxMjM0IiwiYSI6ImNrOGJuY3ZmbDBkdDEzaHFwZXp5cnBmMm8ifQ.dpfAJW1SpYczk5CUtVkY5A&limit=1'

request({url:url_geo , json:true} , (error , response)=>{
    if(error){
        console.log("There is no internet !PLS check")
    }
    else if(response.body.features.length === 0){
        console.log("Unable to find the location . Try to find again ")
    }
    else{
        const latitude = response.body.features[0].center[1]
        const longitude = response.body.features[0].center[0]
        console.log(latitude , longitude)

    }
    
 })
 */