const roomRouter = require('express').Router()
const multer = require("multer");
const {
    getAll_rooms,
    getOne_room,
    add_room,
    update_room,
    removeOne_room,
    
} = require('../controllers/room.controller')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "rooms");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const uploadRoom = multer({
    storage: storage,
  });

roomRouter
    .get('/rooms', getAll_rooms)
    .get('/room/:id', getOne_room)
    .post('/add-room',uploadRoom.array("imagesRoom", 20), add_room)
    .put('/room/:id/update', update_room)
    .delete('/room/:id/delete', removeOne_room)
    

module.exports = roomRouter

