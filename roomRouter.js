const express = require('express');
const roomRouter = express.Router();

const { Room } = require('./model/Room');

// GET ALL ROOMS INFO
roomRouter.get('/', (req, res) => {
  Room.find()
    .exec((err, rooms) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, rooms });
    })
})

// GET ROOM INFO
roomRouter.get('/:roomId', (req, res) => {
  Room.findById(req.params.roomId)
    .exec((err, room) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, room });
    })
})

// GET PARTICIPANTS FROM ROOM
roomRouter.get('/participants/:roomId', (req, res) => {
  Room.findOne({ _id: req.params.roomId })
    .select('participants')
    // .populate('participants')   해당 라인을 추가하면 400 에러가 나는데 음.. 이유를 잘 모르겠습니다 ㅜ
    .exec((err, data) => {
      if (err) return res.status(400).send(err);
      console.log(data);
      res.status(200).json({ success: true, data });
    })
})

// GET CHATS FROM ROOM 
roomRouter.get('/chats/:roomId', (req, res) => {
  Room.findById(req.params.roomId)
    .select('chats')
    .exec((err, chats) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, chats });
    })
})

// POST ROOM
roomRouter.post('/', (req, res) => {
  const body = {
    roomName: req.body.roomName,
    participants: req.body.participants,
  }
  const room = new Room(body);
  room.save((err, doc) => {
    if (err) return res.status(400).send(err);
    console.log(doc);
    res.status(200).json({ success: true });
  })
})

// DELETE ROOM
roomRouter.delete('/', (req, res) => {
  const body = { _id: req.body.roomId };

  Room.findOneAndDelete(body)
    .exec((err, result) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    })

})

// ADD PARTICIPANT INTO ROOM
roomRouter.patch('/userJoinRoom', (req, res) => {
  Room.update(
    { _id: req.body.roomId },
    { $push: { participants: req.body.userId } },
  ).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  })
})

// REMOVE PARTICIPANT INTO ROOM
roomRouter.patch('/userLeaveRoom', (req, res) => {
  Room.update(
    { _id: req.body.roomId },
    { $pull: { participants: req.body.userId } },
  ).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  })
})

// RENAME ROOMNAME
roomRouter.patch('/renameRoom', (req, res) => {
  Room.updateOne(
    { _id: req.body.roomId },
    { $set: { roomName: req.body.roomName } },
  ).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  })
})

module.exports = roomRouter;
