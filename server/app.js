const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'))

dotenv.config({ path: './config.env' });


mongoose.connect(process.env.DB_URI,{
    createIndexes:false,
    useNewUrlParser: true ,
    useUnifiedTopology: true ,
   
}).then(con=>{
//   console.log(con.connection)  
console.log('connection successful')
}).catch(err => console.log(err));

const app = express();



app.use(cors())

app.use(bodyParser.json());




app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1',require('./routes'))



const PORT = process.env.PORT || 3000;

app.listen(PORT , () =>{
  console.log('App is running on port: ' + PORT);
});