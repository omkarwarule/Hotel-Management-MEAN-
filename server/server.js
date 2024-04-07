
const {MongoClient} = require("mongodb");
const URL = "mongodb://localhost:27017";
express=require('express');
cors=require("cors");
eobj=express();
eobj.use(cors());
port=5555;
eobj.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin",
    "http://localhost:4200");

    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept");

    next();
});
const client = new MongoClient(URL);
eobj.use(express.json());
function starter()
{
    console.log("I can here"+port);
}
eobj.listen(port,starter);
function root(req,res)
{
    res.send("Omkar works....");
}
eobj.get('/',root);


// useful data for restaraunt dashboard 
async function sender(req,res)
{
    // const name = req.params.id;
    let data = await GetConnection();
    data = await data.find().toArray();
    // console.log(name);
    res.send(data);
}
eobj.get('/punes',sender);


async function GetConnection()
{
    let result = await client.connect();
    let db = result.db("admin");
    return db.collection("company");
}

async function ReadData()
{
    let data = await GetConnection();
    data = await data.find().toArray();
    console.log("Data from tha Student Database is : ");
    console.log(data);
}

async function DeleteData(req,res)
{
    const name = req.params.id;
    let data = await GetConnection();
    console.log(name);
    let tp="name";
    let result=await data.deleteOne({id:name});
    if(result.acknowledged)
    {
        console.log("data deleted successfully");
        res.send("data deleted successfully");
    }
}
eobj.delete('/try:id',DeleteData);

async function InsertData(req, res) {
    try {
        let data = await GetConnection();

        // Assuming the data to be inserted is sent in the request body
        const newData = req.params.data;
        // newData.id="100";
        const updateFields = JSON.parse(newData);

        console.log("newData:", updateFields);
        console.log("newData after checks:", updateFields);

        // Use insertOne to insert a new document
        let result = await data.insertOne( updateFields);
       
        if (result.acknowledged) {
            console.log("Data inserted");
            res.send("Data inserted");
        } else {
            console.log("Insertion failed");
            res.status(500).send("Insertion failed");
        }
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).send("Error inserting data");
    }
}



eobj.get('/ghal/:data', InsertData);
async function UpdateData(req, res) {
    const id = req.params.id;
    const newData = req.params.data;
   
    try {
        let data = await GetConnection();
        
        
        const updateFields = JSON.parse(newData);

        let result = await data.updateOne({ id: id }, { $set: updateFields });

        if (result.acknowledged) {
            console.log("data updated");
            res.send("data updated");
        } else {
            console.log("Update failed");
            res.status(500).send("Update failed");
        }
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).send("Error updating data");
    }
}

eobj.get('/up/:id/:data', UpdateData);  
//for take record of people who register for portal
async function GetConnection2()
{
    let result = await client.connect();
    let db = result.db("hotel");
    return db.collection("customer");
}
async function ghal(req,res)
{
    try {
        let data = await GetConnection2();

        // Assuming the data to be inserted is sent in the request body
        const newData = req.params.data;
        console.log(newData);

        const updateFields = JSON.parse(newData);

        console.log("newData:", updateFields);
        console.log("newData after checks:", updateFields);

        // Use insertOne to insert a new document
        let result = await data.insertOne( updateFields);
       
        if (result.acknowledged) {
            console.log("Data inserted");
            res.send("Data inserted");
        } else {
            console.log("Insertion failed");
            res.status(500).send("Insertion failed");
        }
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).send("Error inserting data");
    }
}
eobj.get('/signup/:data',ghal);
async function GetConnection3()
{
    let result = await client.connect();
    let db = result.db("hotel");
    return db.collection("menu");
}
async function sender2(req,res)
{
    // const name = req.params.id;
    let data = await GetConnection3();
    data = await data.find().toArray();
    // console.log(name);
    res.send(data);
}
eobj.get('/menus',sender2);
function main()
{
    let ret;
    ret = GetConnection();
    console.log("Database connected fo management");
    let ret2;
    ret2=GetConnection2();
    console.log("Database connected for customer");
    ret3=GetConnection3();
    console.log("Database connected for consumer-menu");
  // ReadData();
   
    
}
main();
