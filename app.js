const express=require('express');
const ejs=require('ejs');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const todos=[];

const app=express();
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));

//mongodb connection

mongoose.connect('mongodb+srv://gokul:gokul123@cluster0.bfqncdt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('mongodb connected successfully!!')
})

//schema
const todoSchema= new mongoose.Schema({
    title:{ type:String,required:true},
    desc:{type:String,required:true},
    isCompleted:{type:Boolean,required:false}
})

//model
const Todos=new mongoose.model('todos',todoSchema);


app.get('/',async (req,res)=>{
     
    let todos= await Todos.find();
     res.render('index',{todos:todos})
})

app.post('/create',(req,res)=>
{
    let task=req.body.task
    let descr=req.body.desc
     
    let data=new Todos({
        title:task,
        desc:descr,
    })
    data.save();
    console.log('desc')
    res.redirect('/')
    
})

app.get('/delete/:id', async(req,res)=>
{
     const id=req.params.id;
     let data= await Todos.findByIdAndDelete(id);
     res.redirect('/')
})

app.listen('8000',(req,res)=>
{
    console.log('server running in 8000')
})