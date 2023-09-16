const express = require('express');
const router = express.Router();

// socket.io controller part
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(express);

const { Comment } = require('../models/commentModel');

const io = socketIo(server, {
  transports: ["websocket", "polling"]
});

const addComment = async (data) => {
    try {
      const { username, text, reviewId, userId } = data;
      const comment = await Comment.create({
        username,
        text,
        reviewId,
        userId
      });
      io.emit('new-comment', { username: comment.username, text: comment.text });
    } catch (error) {
      console.error('Error creating comment:', error);
    }
}

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('new-comment', addComment);
});

server.listen(6700, () => {
    console.log(`socket.io is listening on port 6700`);
});

// api controller part
const { getAllComments, getCommentsByReviewId } = require('../controllers/commentController');

router.get('/', getAllComments);
router.get('/:reviewId', getCommentsByReviewId);

module.exports = router;