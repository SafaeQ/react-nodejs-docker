const Room = require("../models/room");
// const Hotel = require("../models/hotel");
const roomValidation = require("../validations/room");


const getAll_rooms = async (req, res) => {
  const rooms = await Room.find();
  if (!rooms) {
    return res.status(400).send("😒 Sorry We can't find any rooms");
  }
  res.status(200).send(rooms);
};

const getAll_roomsByType_Price = async (req, res) => {
  const filter = {}
  if (req.query.type) filter.type = req.query.type
  if (req.query.price) filter.price = req.query.price

  const rooms = await Room.find(filter)
  if (!rooms) {
    return res.status(400).send("😒 Sorry We can't find any rooms");
  }
  res.status(200).send(rooms);
};

const getOne_room = async (req, res) => {
  const id = req.params.id;
  const room = await Room.findById(id);
  if (!room) return res.status(400).send(room);
  res.status(200).send(room);
};

const add_room = async (req, res) => {
  const {
    error
  } = roomValidation.addRoomValidation(req.body);
  
  const uploadedImageFiles = req.files;
  let images = [];
  for (const uploadedImageFile of uploadedImageFiles) {
    images.push(uploadedImageFile.filename);
  }
  const {
    type,
    price,
    hotel_name,
    description
  } = req.body;
  const room = await Room.create({
    type,
    price,
    hotel_name,
    description,
    imagesRoom: images,
  });
  const result = await room.save();
  if (!result) return res.status(400).send("😒 Sorry we can't add your room");
  res.status(200).send(result);
};

const update_room = async (req, res) => {
  const roomId = req.params.id;
  const room = await Room.findById(roomId);
  if (!room)
    return res.status(400).send("Sorry We Can Not Find Room With Given Id!");
  if (req.files.length < 4 || req.files.length > 8) {
    const unwantedImagesRoom = req.files;
    deleteFile.deleteFile(unwantedImagesRoom);
    return res.status(400).send("Please choose between 4 and 8 images");
  }
  const {
    error
  } = roomValidation.updateRoomValidation(req.body);
  if (error) {
    const unwantedImagesRoom = req.files;
    deleteFile.deleteFile(unwantedImagesRoom);
    return res.status(400).send(error.details[0].message);
  }
  let roomImages = room.imagesRoom;
  deleteFile.deleteExistingFile(roomImages);
  const uploadedImageFiles = req.files;
  let images = [];
  for (const uploadedImageFile of uploadedImageFiles) {
    images.push(uploadedImageFile.filename);
  }
  const {
    type,
    price,
    description
  } = req.body;
  const updateRoom = await Room.updateOne({
    _id: roomId,
  }, {
    type,
    price,
    description,
    imagesRoom: images,
  });
  if (updateRoom) return res.status(200).send("Room Updated Successfully!");
  res.send("Ooops Something Goes Wrong!");
};

const removeOne_room = async (req, res) => {
  const id = req.params.id;
  const room = await Room.deleteOne({
    id,
  });
  res.status(200).send("😜 your room has been deleted");
};

const searchForAvailableRoomByDate = async (req, res) => {
  const {
    date_one,
    date_two
  } = req.query;
  const availabeRooms = {
    alreadyAvailable: await Room.find({
      availableDate: null
    }),
    willBeAvailable: await Room.find({
      availableDate: {
        $gte: new Date(date_one),
        $lte: new Date(date_two)
      },
    }),
  };
  res.json({
    message: availabeRooms
  });
};

module.exports = {
  getAll_rooms,
  getOne_room,
  add_room,
  update_room,
  removeOne_room,
  searchForAvailableRoomByDate,
  getAll_roomsByType_Price
};