const { response } = require('express')
const Provider = require('../module/providers')


//add new provider
exports.createProvider = (req,res) =>{
    const provider = new Provider(req.body)
    provider.save().then(response=>{
        res.status(201).json({
            message:"client added successfully",
            response
        })
    })
}

//get all providers
exports.getAllProviders = (req,res)=>{
    Provider.find().then(response=>{
        res.status(200).json({
            response
        })
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving providers."
        });
      });
}

//get one provider
exports.getSingleProvider =(req,res)=>{
    const id = req.params.id

    Provider.findById(id)
    .then(response=>{
        if(!response)
        res.status(404).json({
            message:"not found Provider"
        })
        else res.status(200).json({
            response
        })
    })
    .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Provider" });
      });
}

//update Provider
exports.updateProvider=(req,res)=>{
    const id = req.params.id
    Provider.findByIdAndUpdate(id,req.body)
    .then(response=>{
        if(!response){
            res.status(404).send({
                message:"Can not find id"
            })
        }else res.send({ message: "Provider was updated successfully." ,response });
    })
    .catch(err => {
        res
          .status(500)
          .send({ message: "Error Updating Provider" });
      });
}

//Delete Provider
exports.deleteProvider =(req,res)=>{
    const id = req.params.id
    Provider.findByIdAndDelete(id)
    .then(response=>{
        if(!response){
            res.status(404).json({
                message:"no Provider found"
            })
        }else res.status(200).json({
            message:"Deleted successfully"
        })
    })
    .catch(err => {
        res
          .status(500)
          .send({ message: "Error Deleting Provider" });
      });
}
