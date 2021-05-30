const { Comment } = require('../models');

const commentData = [
  {
    "comment_text":"here is test comment 1",
    "user_id":"1",
    "post_id":"1"
  },
  {
    "comment_text":"here is test comment 2",
    "user_id":"2",
    "post_id":"1"
  },
  {
    "comment_text":"here is test comment 3",
    "user_id":"2",
    "post_id":"2"
  },
  {
    "comment_text":"here is test comment 4",
    "user_id":"2",
    "post_id":"3"
  },
  {
    "comment_text":"here is test comment 5",
    "user_id":"3",
    "post_id":"3"
  },
  {
    "comment_text":"here is test comment 6",
    "user_id":"4",
    "post_id":"1"
  },
  {
    "comment_text":"here is test comment 7",
    "user_id":"4",
    "post_id":"2"
  },
  {
    "comment_text":"here is test comment 8",
    "user_id":"3",
    "post_id":"1"
  },
];

const seedComment = () => Comment.bulkCreate( commentData );

module.exports = seedComment;
