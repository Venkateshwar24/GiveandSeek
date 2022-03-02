const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const { mongoose } = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
const usercontroller = require('./controller/userController');
const storycontroller = require('./controller/storyController');
const commentsController = require('./controller/commentsController');
const chatRoomsController = require('./controller/chatRoomsController');
const chatRoomMessageController = require('./controller/chatRoomMessageController');
const { Messages } = require("./models/chatRoomMessage");
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send("It's Working");
})
app.use('/users', usercontroller);
app.use('/stories', storycontroller);
app.use('/stories/comments', commentsController);
app.use('/rooms', chatRoomsController);
app.use('/chatRoomMessages', chatRoomMessageController);
app.use('/FilesUpload/DocumentProofs', express.static('FilesUpload/DocumentProofs'));
const server = app.listen(PORT, () => {
    console.log(`Server running at port ${PORT} successfully!`);
    // chatSystem.chatRoom(server);


    const io = require("socket.io")(server, {
        cors: {
            origin: "http://localhost:4200",
        }
    });

    io.use((socket, next) => {
        socket.id = socket.handshake.query.id;
        //console.log(socket);
        next();
    });

    io.on('connection', (socket) => {
        console.log('connected by ' + socket.id);

        socket.on('disconnection', () => {
            console.log('disconnected' + socket.id);
        })

        socket.on("joinRoom", ({ chatRoomId, userId }) => {
            socket.join(chatRoomId);
            console.log(socket.id + " joined in: " + chatRoomId);
            //socket.broadcast.to(chatRoomId).emit('New User Joined ',{userid:userId,message:"Has joined this room"});
        });

        socket.on("chatMessages", (data) => {
            const chatRoomMessages = new Messages({
                room_id: data.room_id,
                user_id: data.user_id,
                message: data.message,
            });

            chatRoomMessages.save((err) => {
                if (err)
                    console.log(err);
                else {
                    io.in(data.room_id).emit("chatMessages", (data));
                    console.log(data);
                }
            })

        })


    })


});