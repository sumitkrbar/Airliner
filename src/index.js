const express = require('express');

const {ServerConfig} = require('./config')
const apiRoutes = require('./routes')

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api', apiRoutes);

//fallback route
app.use((req, res, next) => {
    return res.status(404).json({
      message: 'Route not found',
      path: req.originalUrl
    });
  });
  

app.listen(ServerConfig.PORT, ()=>{
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});