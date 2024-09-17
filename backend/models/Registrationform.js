const mongoose=require('mongoose');

const RegistrationFormSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
})

const RegFormModel=mongoose.model('Reg_form',RegistrationFormSchema);
module.exports=RegFormModel;