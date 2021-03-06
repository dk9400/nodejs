var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');
var Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res) {
  Post.get(null, function(err, posts) {
    if(err) {
      posts = [];
    }
    res.render('index', { 
      title: '主页',
      user: req.session.user,
      posts: posts,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });

});



router.get('/reg',checkNoLogin);
router.get('/reg', function(req, res) {
  res.render('reg', { 
    title: '注册',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});
router.post('/reg',checkNoLogin);
router.post('/reg', function(req, res) {
  var password = req.body.password;
  var password_re = req.body['password-repeat'];
  //检验用户两次输入的密码是否一致
  if(password_re != password) {
    req.flash('error', '两次输入的密码不一致！');
    return res.redirect('/reg');
  }
  //生成密码的md5值
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('hex');
  var newUser = new User({
    name: req.body.name,
    password: password,
    email: req.body.email
  });
  //检查用户名是否已经存在
  User.get(newUser.name, function(err, user) {
    if(user) {
      req.flash('error', '用户已存在！');
      return res.redirect('/reg');
    }
    newUser.save(function(err, user) {
      if(err) {
        req.flsh('error', err);
        return res.redirect('/reg');
      }
          req.session.user = user;
    req.flash('success', '注册成功！');
    res.redirect('/');
    });

  });
});



router.get('/login',checkNoLogin);
router.get('/login', function(req, res) {
  res.render('login', {
    title: '登录',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});
router.post('/login',checkNoLogin);
router.post('/login', function(req, res) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('hex');
  
  User.get(req.body.name, function(err, user) {
    if(!user) {
      req.flash('error', '用户不存在！');
      return res.redirect('/login');
    }
    if(user.password != password) {
      req.flash('error', '密码错误！');
      return res.redirect('/login');
    }
    req.session.user = user;
    req.flash('success', '登录成功！');
    res.redirect('/');
  });
});



router.get('/post',checkLogin);
router.get('/post', function(req, res) {
  res.render('post', { 
    title: '发表',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});
router.post('/post',checkLogin);
router.post('/post', function(req, res) {
  var currentUser = req.session.user;
  var post = new Post(currentUser.name, req.body.title, req.body.post);
  post.save(function(err) {
    if(err) {
      req.flash('error', err);
      return res.redirect('/');
    }
    req.flash('success','发布成功！');
    res.redirect('/');
  });
});


router.get('/logout',checkLogin);
router.get('/logout', function(req, res) {
  req.session.user = null;
  req.flash('success', '登出成功！');
  res.redirect('/');
});


function checkLogin(req, res, next) {
  if(!req.session.user) {
    req.flash('error', '未登录！');
    res.redirect('/login');
  }
  next();
}

function checkNoLogin(req, res, next) {
  if(req.session.user) {
    req.flash('error', '已登录！');
    res.redirect('back');
  }
  next();
}


module.exports = router;
