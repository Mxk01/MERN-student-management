let express = require('express');
let http = require('http')
let app = express();
let mongoose = require('mongoose');
let cors = require('cors')
let server = http.createServer(app);
let authRoutes = require('./routes/authRoutes')
mongoose.connect('mongodb://127.0.0.1/test').then(()=>console.log('Connected to mongo'))
.catch(e=>console.log(e))

const {Server} = require("socket.io");
// Server is a class
const io = new Server(server,{
    cors : {
        // origin is where we accept requests from
        origin :'http://localhost:3000',
        methods:['GET','POST']
    }
});

app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cors())
app.use('/auth',authRoutes)

let onlineUsers = [];

let addUser = (username,socketId) => {
 // some checks if any of the array elements matches a condition 
  //  !onlineUsers.some(user => user.username === username ) means if no user matches this condition 
  // then just push  the {username,id}  ,bc the second condition  will execute
  !onlineUsers.some(user => user.username === username) && onlineUsers.push({username,socketId});
}
let deleteUser = (socketId) => {
  onlineUsers = onlineUsers.filter(user => user.socketId != socketId);
}

let findUser = (username) => {
    onlineUser = onlineUsers.find(user => user.username == username);
}


io.on('connection',(socket)=>{

    socket.emit('user-connected',true);
    io.emit('message','Hello everyone');
    // socket.on('new-user',(username)=>{
    //     addUser(username,socket.id);
    // })

    // when the student connected emit a message to all teachers
    socket.on('student-connected',(message)=>{
        socket.broadcast.emit('receive-notification',message);
    })
    socket.on('disconnect',()=>{
        console.log('Someone has left!')
        deleteUser(socket.id);
    })
})


server.listen(5000,()=>console.log('Listening to port 5000'));