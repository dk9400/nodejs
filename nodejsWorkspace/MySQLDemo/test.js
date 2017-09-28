var mysql = require('mysql');
var connection = mysql.createConnection({
    "host":"localhost",
    "user":"root",
    "password":"qwer1234",
    "database":"runoob"
});

connection.connect();

connection.query('SELECT 1+1 AS solution', function(error, results, fields){
	if(error) throw error;
	console.log("The solution is:",results);
});
connection.end();


/**
 * 查
 * slq = 'select * from websites';
 * connection.query(sql,function(err, result){
 *   if(err){
 *    
 *    return;
 *   }	
 * 
 * });
 *
 *
 * 插入数据
 *
 * var addSql = 'insert into websites(Id, name, url) values(0,?,?)';
 * var addSqlParams = ['菜鸟工具', 'http://c.runoob.com', '23453', 'CN'];
 * connection.query(addSql, addSqlParams, function(err, result){
 * 
 * });
 *
 *
 * 更新数据
 *
 * var modSql = 'update websites set name=?, uel=?, where id=?';
 * var modSqlParams = ['菜鸟移动站', 'http://m.runoob.com',6];
 * connection.query(modSql,modSqlParams,function(err, result){
 * 
 * })  
 *
 *
 *
 *
 * 删
 * var delSql = 'delete from websites where id=6';
 * connection.query(delSql,function(err, result) {
 * })
 *
 * 
 * 
 */