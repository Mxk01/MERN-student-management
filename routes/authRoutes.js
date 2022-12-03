let express = require('express')
let router = express.Router();
let bcrypt = require('bcrypt')

let jwt = require('jsonwebtoken')
let User = require('../models/User');
let dotenv = require('dotenv')
let Course = require('../models/Course')


dotenv.config();

let isUserAuthenticated = async(req,res,next) =>{
   let {authorization} = req.headers;
   // if(req.user.isTeacher) then show the students page,otherwise hide it 
   if(authorization && authorization.startsWith("Bearer")){
   try{
   
      // get token from authorization request headers
      let token = authorization.split(' ')[1];
     
      // get user id (this data was set up on jwt.sign)
      let {_id} =  jwt.verify(token,process.env.JWT_SECRET)
       // finding the user via its id but omitting the password
       req.user = await User.findById(_id).select('--password');
       
      next();
    } 
    catch(e){
       return res.json({message:'You are not authorized to access this resource'})
    } }
    else {
        return res.json({message:'You are not authorized to access this resource'})

    }
    



}
router.post('/register',async(req,res) => {
 
  if(req.body.teacherCode=='JxK021mi21Q')
  {
    
    req.body.isTeacher = true;
    
  }
  let user = new User(req.body);
  req.body.cnp =  await bcrypt.hash(req.body.cnp,10);
 
  user.isTeacher = req.body.isTeacher;
  req.body.password  = await bcrypt.hash(req.body.password,10)
  user.password = req.body.password;
  user.cnp = req.body.cnp;
  User.exists({email:req.body.email},async(err,doc)=>{
      if(err) { return res.json({error:err.message}); }
      else { 
          if(doc){
             console.log(doc);
             return  res.json({error:"User already exists!"})
          }
          else {
            let token =  jwt.sign(
              {
               _id:user._id 
              } ,process.env.JWT_SECRET,{expiresIn:Date.now()+14400000});
             await user.save();
              return res.json({message:token});
          }
      }
  })

}
);



router.delete('/delete-students',async(req,res)=>{
    await User.deleteMany({});
 })
router.post('/login',async(req,res)=>{
    User.exists({email:req.body.email},async(err,doc)=>{
       if(err) { console.log(err.message); }
       else { 
           if(doc){
            
              let user = await User.findById({_id:doc._id});
              let passwordsMatch = await bcrypt.compare(req.body.password,user.password);
    
              let cnpMatch = await bcrypt.compare(req.body.cnp,user.cnp);
              //  console.log(`Do cnps match? ${cnpMatch} , Do passwords match? ${passwordsMatch}`)
              if(passwordsMatch)
              {
               let token = await jwt.sign(
                {
                 _id:user._id 
                } ,process.env.JWT_SECRET,{expiresIn:Date.now()+14400000});
                let {username,isTeacher} = user;
                
              return  res.json({token,username,isTeacher})
              }
            }
           else {
               return res.json({error:"An username with this email doesn't exist!"})
           }
       }
   }) });    


   
      router.put('/change-password',isUserAuthenticated,async(req,res)=>{
        let {password} = req.body;
        let user = await User.findById(req.user._id);
         

        let hashedPass = await bcrypt.hash(password,10);
        console.log(bcrypt.compare(password,user.password));
        if(bcrypt.compare(password,user.password)){
        let updateUser = await User.findByIdAndUpdate(req.user._id,{
          password:hashedPass
        });
        console.log(updateUser);
         if(updateUser){
            return res.json({message:"User succesfully updated!"})
         }else {
            return res.json({message:"An error has occured"})
         }
        }

      })

     router.put('/update-user/:id',async(req,res)=>{
       try {
         let userToUpdate =  await User.findByIdAndUpdate({_id:req.params.id},{
          an : req.body.an,
          departament : req.body.departament 
         });

         return res.json({message:userToUpdate})
         
        }
       catch(e){
          return res.json({error:e.message})
       }
     })


      router.get('/students-list',isUserAuthenticated,async(req,res)=>{
        let isRestantier = req.query.isRestantier;
        let order = req.query.order;
        if(req.user.isTeacher)
        { 
        
          students  = await User.find({hasFailedClasses:isRestantier})
          .where('_id').ne(req.user._id).sort({username:order,email:order});

      
      
              return res.json({message:students});
     
        }
      })

      router.delete('/delete-user/:id',async(req,res)=>{
        let id = req.params.id;
        try {
        let deletedUser = await User.findByIdAndDelete({_id:id});
         if(deletedUser){
         
          return res.json({message:'Studentul a fost sters cu succes!'})
         } 
         else {
          return res.json({message:'Utilizatorul a fost deja sters!'});
         }
      }
        catch(e){
           console.log(e.message)
        }
      });
   
     router.post('/add-course',async(req,res)=>{
      try {  
         let courseExists = await Course.findOne({name:req.body.name});
         if(!courseExists){
      let course = new Course(req.body);
      console.log(req.body);
      course.taughtBy.push(req.body.taughtByTeacherId);
      await course.save()
     
       return res.json({message:course});
         } 
         else {
            return res.json({error:'Un curs cu aceasta denumire exista deja!'})
         }
     }
     catch(e){
       return res.json({error:e.message});
     }
     })
    
     router.get('/teachers-list',isUserAuthenticated,async(req,res)=>{
      try { 
      let teachers = await User.find({isTeacher:true});
      return res.json({message:teachers});
      }
      catch(e){
        return res.json({error:e.message})
      }
     });

     router.get('/courses',isUserAuthenticated,async(req,res)=>{
      try { 
      let courses = await Course.find({});
      return res.json({message:courses});
      }
      catch(e){
        return res.json({error:e.message})
      }
     });


     router.get('/student/:nume',async(req,res)=>{
      if(req.params.nume){
      let student  = await User.findOne({username:req.params.nume}).select('--password')
      
       return res.json({student});
      }
     })

module.exports =  router;