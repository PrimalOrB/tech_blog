const { Post } = require('../models');

const postData = [
  {
    "title":"test1-1",
    "content":"this is test comment 1",
    "user_id":1
  },
  {
    "title":"test1-2",
    "content":"this is test comment 1-2",
    "user_id":1
  },
  {
    "title":"test2-1",
    "content":"this is test comment 2-1",
    "user_id":2
  },
  {
    "title":"test3-1",
    "content":"this is test comment 3-1",
    "user_id":3
  },
  {
    "title":"test3-2",
    "content":"this is test comment 3-2",
    "user_id":3
  },
  {
    "title":"test4-1",
    "content":"this is test comment 4-1",
    "user_id":4
  },
  {
    "title":"test4-2",
    "content":"this is test comment 4-2",
    "user_id":4
  },
  
];

const seedPost = () => Post.bulkCreate( postData );

module.exports = seedPost;
