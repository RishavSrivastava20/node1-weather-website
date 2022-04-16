const request=require('request');

const geocode= (address,callback)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmlzaGF2MWtyIiwiYSI6ImNsMTduemtraTA1dTYzZm80M2Y2NTVva2YifQ.KXXCuKIqi0ZjZW2UqHhoeA&limit=1`
    
    // request({url: url, json:true},(error,response)=>{//old code before destruturing the response object and without directly using url variable which has same variable name as it's property
    request({url, json:true},(error,{ body }={})=>{
        if(error){
            callback('Unable to connect to location services!',undefined);
        }else if(body.features.length===0){
            callback('Unable to find location. Try another search.',undefined)
        }else{
            callback(undefined,{
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports=geocode;