const mongoose= require("mongoose");
const opts = { toJSON: { virtuals: true } };
const addSchema = new mongoose.Schema({
 
    type: {
      type: String,
      
    },
    titre:{
      type: String,
       

    },
    Description: {
      type: String,
      
    }, 
    
      fileData:{
        type: String,
      },
      test:{
        type: Boolean,
        default: false,
      }
    
    
 
    
  },opts);
  
  const ajoute = mongoose.model("ajoute", addSchema);

  module.exports = ajoute;