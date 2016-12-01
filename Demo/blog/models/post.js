var mongodb = require('./db');

function Post(name, title, post) {
  this.name = name;
  this.title = title;
  this.post = post;
}

Post.prototype.save = function(callback) {
  var date = new Date();
  var time = {
    date: date,
    year: date.getFullYear(),
    month: date.getMonth()+1,
    day: date.getDate(),
    hour: date.getHours,
    minute: date.getMinutes
  };
  var post = {
    name: this.name,
    time: time,
    title: this.title,
    post: this.post
  };
  mongodb.open(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('posts', function(err, collection) {
      if(err) {
        mongodb.close();
        return callback(err);
      }
      collection.insert(post, {safe: true}, function(err, post) {
        mongodb.close();
        callback(null);
      });
    }); 
  });
};

Post.get = function(name, callback) {
  mongodb.open(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('posts', function(err, collection) {
      if(err) {
        mongodb.close();
        return callback(err);
      }
      var query = {};
      if(name) {
        query.name = name;
      }
      //根据query对象查询文章
      collection.find(query).sort({time: -1}).toArray(function(err, docs) {
        mongodb.close();
        if(err) {
          return callback(err);
        }
        callback(null, docs);
      });
    });
  });
};



module.exports = Post;