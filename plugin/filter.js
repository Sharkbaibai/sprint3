exports.authorize = function(req, res, next){
	
	if(!req.session.user_id){
		res.send(i18n.__({phrase:'FAIL_TO_LOGIN', locale:"zh-CN"}));
	}else{
		next();
	}

}