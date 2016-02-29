// For login & logout


var express = require('express');
var router = express.Router();
var i18n = require('i18n');
var filter = require('../plugin/filter');

/* Test. */
router.get('/', filter.authorize ,function(req, res, next) {


  res.send('respond with a resource');
});

/* Login by userId & psw */
router.get('/:username/:password', function(req, res, next) {
//  res.send('respond with a resource' + req.params.userId + "=====>"+ i18n.__({phrase:'hello world!', locale:"zh-CN"}));

    // 校验
    req.assert('username', "用户名不能为空").notEmpty();
    req.assert('password', "密码不能为空").notEmpty();
    var errors = req.validationErrors();
    if(errors && errors.length>0)
    {
      var ermsg = [];
      for(var i=0;i<errors.length;i++)
      {
        ermsg.push(errors[i].msg);
      }
      var json={title:'管理后台-- 请先登录',error:ermsg.join("\n")};
      //res.render('admin/login', json);
      res.send(i18n.__({phrase:'BAD_NAME_PSW', locale:"zh-CN"}));
      return;
    }
    var userid = req.body.username;
    var pwd = req.body.password;
    var ip = req.ip;
    userbiz.checkUser(userid,pwd,ip,function(err,user){
      if(!!err){
        var json={title:'管理后台-- 请先登录',error:err};
        res.render('admin/login', json);
      }
      else{
        req.session.user_id = user.user_id;
        req.session.user = user;
        res.redirect("/admin/index");
      }
     
    });
});

module.exports = router;