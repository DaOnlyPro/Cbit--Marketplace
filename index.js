var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb');


var db = mongoose.connection;


db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name=req.body.name;
    var mobileno=req.body.mobileno;
    var rollno=req.body.rollno;
    var branchsec=req.body.branchsec;
    var email=req.body.email;
    var password=req.body.password;
    var confirmpassword=req.body.confirmpassword;

    var data={
        "name":name,
        "mobileno":mobileno,
        "rollno":rollno,
        "branchsec":branchsec,
        "email":email,
        "password":password,
        "confirmpassword":confirmpassword
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signin.html')

})


app.post("/contact_us",(req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
    var message=req.body.message;

    var data={
        "name":name,
        "email":email,
        "message":message
    }
    db.collection('contacts').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Message Inserted Successfully");
    });

    return res.redirect('index.html')

})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
  });
const User = mongoose.model('users', UserSchema);
app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {

      const user = await User.findOne({ name: username });
      if (!user) {
          return res.status(401).send("<script>alert('Invalid username'); window.location.href = '/signin.html';</script>");
      }

      if (user.password !== password) {
          return res.status(401).send("<script>alert('Invalid password'); window.location.href = '/sigin.html';</script>");
      }
      return res.send("<script>alert('Logged in successfully!'); window.location.href = '/index.html';</script>");
  } catch (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
  }
});

console.log("Listening on PORT 3000");
