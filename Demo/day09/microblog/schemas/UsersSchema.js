var mongoose = require('mongoose');
 //一个mongoons对象
var UsersSchema = new mongoose.Schema({
	name: String,
	paw: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});

//每次执行都会调用,时间更新操作
UsersSchema.pre('save', function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else {
		this.meta.updateAt = Date.now();
	}
	next();
});

//查询的静态方法
UsersSchema.statics = {
	fetch: function(cb) {
		return this.find().sort('meta.updateAt').exec(cb);
	},
	findById: function(id, cb) {
		return this.fundOne({_id: id}).exec(cb);
	}
	
}

module.exports = UsersSchema;