const geocode=require('./utils/geocode.js');
const forecast=require('./utils/forecast.js');

const path=require('path');
const express=require('express');//it is a npm module to create web servers
const hbs=require('hbs');

const app=express();

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname, '..', '/public');//to get to the public folder for index.html
const viewsPath= path.join(__dirname,'../templates/views');//changing the name of the handlerbar folder to templates instead of views(which is the default name)
const partialsPath=path.join(__dirname,'../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');//set handlebars in express.it allows to set a value for a given express setting. handlebars are used to create dynamic templates
app.set('views',viewsPath);//changing thh path of view folder to template folder for handlebar setup
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));//we provided the path it to static, which in some way configures our express application

//app.com-localhost:3000
//app.com/help-localhost:3000/help

// app.get('', (req, res)=>{//app.com,  app.com/help-- so /help will pe passed as 1st parameter and 2nd is callback which will take request and provide response from the sever
//     res.send('<h1>Hello Express!</h1>');//sending back HTML response
// });//now this is not required bczz we are using app.use as static function to html

// app.get('/help',(req,res)=>{//sending back JSON
//     res.send([{//on visiting this page we are going to get a JSON response back, express is going to detect, we have provided an object and it is automatically going to stringify the JSON for us and it is going to sent that to the requester correctly 
//         name: 'Rishav',
//         age: 24
//     },{
//         name:'Shubham',
//         age:25
//     }])
// })//Instead of this using html page for this

app.get('',(req,res)=>{//homepage to render dynamic page using handlebar
    res.render('index',{
        title: 'Weather',
        name:'Rishav'
    });//by calling response render express goes off and it gets that views folder. It then converts it into html and to make sure HTML gets backl to the requester
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Rishav'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some hepful text',
        title:'Help',
        name: 'Rishav'
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude,location }={})=>{
        if(error){
           return res.send({ error }); //As key and value has same name so we ahve used shothand
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({ error });//As key and value has same name
            }
            res.send({
                Forecast: forecastData,
                location, //key and value has same name so have used shorthand
                address: req.query.address
           })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){  //if search is not provided as a query string in url
        return res.send({
            error: 'You must provide a search term'
        })
    }
    //we have not used these below code in else instead we have used return in the above sent response bcz if we will send more than one response will give error in terminal
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Rishav',
        errorMessage: 'Help article not found.'
    })
    // res.send('Help article not found');
})

//For 404 page render
app.get('*',(req,res)=>{  //--(*)- means match anything that hasn't been matched so far. Express proviodes us with the wild card character(*)
    res.render('404',{
        title: '404',
        name: 'Rishav',
        errorMessage: 'Page Not Found.'
    })
    // res.send('My 404 page'); //Fopr the wild card character everything will be a match, so will keep this at the last
})

app.listen(3000,()=>{//3000 is a common development port
    console.log('Server is up on port 3000.')
});