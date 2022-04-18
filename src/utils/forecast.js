const request=require('request');

const forecast=(latitude,longitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=965e1794338bf54e89e737cc16b8ce62&query=${latitude},${longitude}`;
    
    // request({url: url, json:true},(error,response)=>{//old code without destructuring the response object and without directly using url variable which has same variable name as it's property
    request({url, json:true},(error,{ body }={})=>{//destructuing body from response object
        if(error){
            callback('Unable to connect to weather service!',undefined);
        }else if(body.error){  
            callback('Unable to find location!',undefined)
        }else{
            callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`)
        }
    })
}

module.exports=forecast;