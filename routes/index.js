
const dbOp = require('../db/nosql');

//query strings
const allUsersQuery = 'SELECT * FROM users.user';
const byUserNameQuery = 'select * from users.user where first_name=?';
const addUserQuery = 'INSERT INTO users.user(first_name,lastname) VALUES(?,?)';
const deleteUserQuery='DELETE FROM users.user where first_name=?';

module.exports = function (app) {

  
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/../index.html');

    });

    app.get('/users', function (req, res) {


        dbOp.execute(allUsersQuery, [], function (err, result) {
            if (err) {
                res.status(400).send({ msg: err });
            } else {
                res.json({
                    users: result.rows
                });
            }
        });
    });

    app.get('/users/:firstname',function(req,res){
        dbOp.execute(byUserNameQuery,[req.params.firstname],function(err,result){
            if(err){
                res.status(404).send({ msg: err });
            }else{
                if(result.rows.length>0){
                    res.json({
                        firstname: result.rows[0].first_name,
                        lastname: result.rows[0].lastname
                    });
                }
                else{
                    res.status(404).send({ msg: 'User not found with that first name.' });
                }
               
            }
        });
    });

    app.post("/users", (req, res) => {
        dbOp.execute(addUserQuery,[req.body.firstName,req.body.lastName],
        function(err,result){
            if(err){
                res.status(500).send({ msg: err });
            }else{
                console.log('User added here');
                res.redirect('/');
            }
        });
    });

    app.delete('/users/:username',(req,res)=>{
        dbOp.execute(deleteUserQuery,[req.params.username],function(err,result){
            if(err){
                res.status(500).send({msg:err});
            }else{
                res.json(result);
            }
        });
    });

    const PORT = 3000;
    app.listen(PORT);
    console.log("Listening on port ", PORT);

}
