const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express()
app.use(cors());
const server = http.createServer(app)
app.use(express.json());
const PORT = process.env.PORT || 5000

const uri = process.env.ATLAS_URI || process.env.MONGODB_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})



const coordinatesRouter = require('./routes/coordinates');
app.use('/coordinate', coordinatesRouter);

const autesRoute = require('./routes/auth');
app.use('/user', autesRoute);
const cardsRoute = require('./routes/card');
app.use('/cards', cardsRoute);

const io = socketIo(server)
const locationMap = new Map()
//const arrayFiltred = []
io.on('connection', socket => {


/*  socket.on('join', (username) => {

    socket.join(username, () => {
      console.log(`a new puce has been connected to ${username}`);
    })

  })
*/
  socket.on('updateLocation', cli => {
    locationMap.set(socket.id, cli)
  })



  socket.on('requestLocations', (userId) => {
    //console.log(username);
    //console.log(Array.from(locationMap)[0]);
    /*arrayFiltred = [];
    arrayFiltred = Array.from(locationMap).filter(element => element[1].username === )*/
    socket.emit('locationsUpdate', Array.from(locationMap).filter(element => element[1].card.user == userId))
    // Array.from(locationMap).map(elemnt => console.log(elemnt[1].username));
    console.log(Array.from(locationMap))
  })

  socket.on('disconnect', () => {
    locationMap.delete(socket.id)
  })


})

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
}

server.listen(PORT, err => {
  if (err) {
    throw err
  }

  console.log('server started on port 5000')
})