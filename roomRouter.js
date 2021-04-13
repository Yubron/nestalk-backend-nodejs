const express = require('express');
const roomRouter = express.Router();

const { Room } = require('./model/Room');

/** 
* @swagger
*     components:
*         schemas:
*             Room:
*                 type: object
*                 required:
*                     - roomName
*                     - participants
*                 properties:
*                     roomName:
*                         type: string
*                         description: The title of room.
*                     participants:
*                         type: array
*                         items:
*                             type: string
*                         example:
*                           - 6069cea386c04aea0109b9d6
*                           - 6069ceb47ade83ea25939527
*                         description: The id of participant in the room.
*                     chats:
*                         type: array
*                         items:
*                             type: string
*                         example:
*                           - 6069cea386c04aea0109b9d6
*                           - 6069ceb47ade83ea25939527
*                         description: The id of chat in the room.
*                     createdAt:
*                         type: string
*                         format: date
*                         description: The date of the record creation.
*                     updatedAt:
*                         type: string
*                         format: date
*                         description: The date of the record update.
*/

/**
*  @swagger
*  tags:
*    name: Room
*    description: API to manage your rooms.
*/

/**
*  @swagger
*  paths:
*   /:
*     get:
*       summary: Lists all the rooms
*       tags: [Room]
*       responses:
*         "200":
*           description: The list of rooms.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Room'
*/
roomRouter.get('/', (req, res) => {
  Room.find()
    .exec((err, rooms) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, rooms });
    })
})

/**
*  @swagger
*  paths:
*   /{roomId}:
*     get:
*       summary: Get the room using roomId
*       parameters:
*         - in: path
*           name: roomId
*           schema:
*             type: string
*           required: true
*       tags: [Room]
*       responses:
*         "200":
*           description: Get the room.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Room'
*/
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

/**
*  @swagger
*  paths:
*   /:
*     post:
*       summary: Creates a new room
*       tags: [Room]
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:      # Request body contents
*               type: object
*               properties:
*                 roomName:
*                   type: string
*                 participants:
*                   type: string
*               example:   # Sample object
*                 roomName: test room 
*                 participants: ["6069ceb47ade83ea25939527", "6069cec384b4bfea45f9ed55"]
*       responses:
*         "200":
*           description: The created room.
*           content:
*             application/json:
*               schema:      # Request body contents
*                 type: object
*                 properties:
*                   roomName:
*                     type: string
*                   participants:
*                     type: string
*                 example:   # Sample object
*                   success: true
*                   room:
*                     type: object
*                     properties:
*                       participants: ["6069ceb47ade83ea25939527", "6069cec384b4bfea45f9ed55"]
*                       chat: []
*                       _id: "606de447f154b66b7e739fbd"
*                       roomName: test room
*                       createdAt: 2021-04-07T16:56:39.825Z
*                       updatedAt: 2021-04-07T16:56:39.825Z
*                       __v: 0
*/
roomRouter.post('/', (req, res) => {
  const body = {
    roomName: req.body.roomName,
    participants: req.body.participants,
  }
  const room = new Room(body);
  room.save((err, room) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, room });
  })
})

/**
*  @swagger
*  paths:
*   /{roomId}:
*     delete:
*       summary: Delete the room using roomId
*       parameters:
*         - in: path
*           name: roomId
*           schema:
*             type: string
*           required: true
*       tags: [Room]
*       responses:
*         "200":
*           description: Delete the room.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Room'
*/
roomRouter.delete('/:roomId', (req, res) => {

  Room.findOneAndDelete({ _id: req.params.roomId })
    .exec((err, result) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    })

})

/**
*  @swagger
*  paths:
*   /userJoinRoom:
*     patch:
*       summary: Add participants into room
*       tags: [Room]
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:      # Request body contents
*               type: object
*               properties:
*                 roomId:
*                   type: string
*                 userId:
*                   type: string
*               example:   # Sample object
*                 roomId: "606e9be87cf70018eff84497" 
*                 userId: "6069ceb47ade83ea25939527"
*       responses:
*         "200":
*           description: user join the room.
*           content:
*             application/json:
*               schema:      # Request body contents
*                 type: object
*                 properties:
*                   success:
*                     type: string
*                 example:   # Sample object
*                   success: true
*/
roomRouter.patch('/userJoinRoom', (req, res) => {
  Room.update(
    { _id: req.body.roomId },
    { $push: { participants: req.body.userId } },
  ).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  })
})

/**
*  @swagger
*  paths:
*   /userLeaveRoom:
*     patch:
*       summary: Remove participants into room
*       tags: [Room]
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:      # Request body contents
*               type: object
*               properties:
*                 roomId:
*                   type: string
*                 userId:
*                   type: string
*               example:   # Sample object
*                 roomId: "606e9be87cf70018eff84497" 
*                 userId: "6069ceb47ade83ea25939527"
*       responses:
*         "200":
*           description: user leave the room.
*           content:
*             application/json:
*               schema:      # Request body contents
*                 type: object
*                 properties:
*                   success:
*                     type: string
*                 example:   # Sample object
*                   success: true
*/
roomRouter.patch('/userLeaveRoom', (req, res) => {
  Room.update(
    { _id: req.body.roomId },
    { $pull: { participants: req.body.userId } },
  ).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  })
})

/**
*  @swagger
*  paths:
*   /renameRoom:
*     patch:
*       summary: Rename the room name
*       tags: [Room]
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:      # Request body contents
*               type: object
*               properties:
*                 roomId:
*                   type: string
*                 roomName:
*                   type: string
*               example:   # Sample object
*                 roomId: "606e9be87cf70018eff84497" 
*                 roomName: "rename room name"
*       responses:
*         "200":
*           description: Rename the room name.
*           content:
*             application/json:
*               schema:      # Request body contents
*                 type: object
*                 properties:
*                   success:
*                     type: string
*                 example:   # Sample object
*                   success: true
*/
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
