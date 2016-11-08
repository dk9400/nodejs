var express = require('express');
var router = express.Router();

var crypto = require('crypto');
var User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
	  title: '首页',
	  layout:'layout'
  });
});

router.get('/user',function(req, res, next) {
	res.render('user');
});
router.post('/post',function(req, res, next) {
	
});


//router.get('/reg',checkNotLogin);
router.get('/reg',function(req, res, next) {
	res.render('reg',{
		title: '用户注册',
		layout:'layout'
	});
});

//router.post('/reg',checkNotLogin);
router.post('/reg',function(req, res, next) {
	//检查密码是否一致
	if(req.body['password-repeat'] != req.body['password']) {
		req.flash('error', '两次输入的密码不一致！');
		return res.redirect('/reg');
	}
	//生成密码的散列值
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).disgest('base64');
	
	var newUser = new User({
		name: req.body.username,
		password: password
	});
	//检查用户名是否存在
	User.get(newUser.name, function(err, user) {
		if(user) {
			err = 'Username already exists.'
		}
		if(err) {
			req.flash('error',err);
			return res.redirect('/reg');
		}
		//如果不存在，则添加用户
		newUser.save(function(err) {
			if(err) {
				req.flash('error', err);
				return res.redirect('/reg');
			}
			req.session.user = newUser;
			req.flash('success', '注册成功');
			res.redirect('/');
		});
	})
});


//router.get('/login', checkNotLogin);
router.get('/login',function(req, res, next) {
	res.render('login', {
		title: '用户登录',
		layout:'layout'
	});
});

//router.post('/login', checkNotLogin);
router.post('/login',function(req, res, next) {
	//生成密码的散列值
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');
	
	User.get(req.body.username, function(err, user) {
		if(!user) {
			req.flash('error', '用户不存在');
			return res.redirect('/login');
		}
		if(user.password != password) {
			req.flash('error', '用户密码错误');
			return res.redirect('/login');
		}
		req.session.user = user;
		req.flash('success', '登录成功');
		res.redirect('/')
	});
});



//router.get('/logout', checkNotLogin);
router.get('/logout',function(req, res, next) {
	req.session.user = null;
	req.flash('success', '登出成功');
	res.redirect('/')
});

function checkLogin(req, res, next) {
	if(!req.session.user) {
		req.flash('error', '未登入');
		return res.redirect('/login', {
			title: '用户登录'
		});
	}
	next();
}

function checkNotLogin(req, res, next) {
	if(req.session.user) {
		req.flash('error', '已登入');
		return res.redirect('/');
	}
	next();
}


module.exports = router;
