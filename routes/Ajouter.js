const express = require("express");
const router = express.Router();
const ajoute = require("../models/reclamation") ;
const Admin = require("../models/Admin");

///Ajouter une reclamation 
router.post("/reclamer", async(req,res)=>{
        const ajouter = await new ajoute({
       type:req.body.type,
       titre:req.body.titre,
       Description:req.body.Description,
       fileData :  req.body.fileData
     
    })
   
    try{
        
        const savedajouter = await ajouter.save();
   
            res.send( savedajouter);
    }catch(err){
        res.send({message:err})
    }
    });

   //affichier tous les reclamation

   router.get("/allreclamation",async(req,res)=>{
    try{
        const ajouter= await ajoute.find();
        res.send(ajouter);
    }catch(err){res.json({message:err})}
    })
   

    ///////Supprimer par id de la reclamation

    router.delete("/supprimer/:id", async (req, res) => {
        try {
          const deleteajoute = await ajoute.findByIdAndDelete({
            _id: req.params.id,
          });
          console.log(deleteajoute);
          res.send("deleted");
        } catch (err) {
          res.json({ message: err });
        }
      });




    

 //Delet operateur
 
router.post("/login",async(req,res)=>{

  /////VALIDATE INCOMING ADMIN DATA
  const { error } = loginschema.validate(req.body); ///validate all the incoming data in the body
  if (error) return res.status(403).send(error.details[0].message);


  try{
    const admin= await Admin.findOne({email:req.body.email})
    if (!admin) return res.status(403).send("Account doesn't exists");

   
    const validpassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    //console.log(validpassword);
    if (!validpassword) return res.status(400).send("password is incorrect");
    const access_token = jwt.sign(
      { Admin: admin._id },
      process.env.ACCESS_TOKEN
    );
    res.send(access_token)
  } catch(err){
    res.send({message:err}) 
  }
})

module.exports=router;