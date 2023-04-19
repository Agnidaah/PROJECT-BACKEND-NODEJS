const{MongoClient}=require('mongodb');
//const MongoClient=require('mongodb').MongoClient;
const urli='mongodb+srv://gurpreetsinghf22:0HeLmklCbKztvz4Y@cluster0.g3xlq3o.mongodb.net/?retryWrites=true&w=majority';
const database='stats';
const client=new MongoClient(urli);
//-------------------------------------------------------------
const open = require('open');
const fs=require('fs');
const express=require('express');
const http=require('http');
const app=express();
const path=require('path');
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
let fol=path.join(__dirname,'public');
app.get(`/home`,async (req,res)=>{
let result=await client.connect();
    let dbi=result.db(database);
    var colls=await dbi.listCollections().toArray();var rec=[];
    for(var i=0;i<colls.length;i++){
        let collection=dbi.collection(colls[i].name);let response=await collection.find({}).toArray();
        //while(i!=0 && rec[i-1]==undefined){console.log("hello");}
          rec.push(response);
          if(rec[colls.length-1]!=undefined){res.render(`${fol}/home.ejs`,{colls,rec});}
    }
    });
    app.get(`/about`,(_,res)=>{
        res.render(`${fol}/about.ejs`);   });
        var nam=[];
        var na=[];
        const see=(fol)=>
        {const dirpath=path.join(__dirname,`${fol}`);
                    fs.readdirSync(dirpath).forEach(file => {
                        nam.push(file);
                        {var d=[];const dirpath=path.join(__dirname,`${fol}/${file}`);
                        fs.readdirSync(dirpath).forEach(item => {
                            d.push(item);});
                        }na.push(d);
                      });
        }
        var co="";
    app.get(`/work`,(req,res)=>{
        see('works');
        res.render(`${fol}/work.ejs`,{nam,na});nam=[];na=[];
        if(req.query.topic!=undefined){
            try { co = fs.readFileSync(`works/${req.query.topic}`, "utf8"); }
            catch (err) { console.log(err); }
            open("https://orionpax.onrender.com/code");}
        });
        app.get(`/code`,(_,res)=>{
            res.render(`${fol}/code.ejs`,{co});
            });
    app.get(`/blog`,(_,res)=>{
        res.render(`${fol}/blog.ejs`);
        });
    app.get(`/contact`,(_,res)=>{
        res.render(`${fol}/contact.ejs`);
        });
    app.get(`*`,(_,res)=>{
        res.render(`${fol}/pnf.ejs`);
        });
app.listen(5000);