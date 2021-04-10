const Client = require('../module/clients')



//add new client
exports.addClient = (req, res) => {
    const client = new Client(req.body)
    client.save().then(response => {
        res.status(201).json({
            message: "client added successfully",
            response
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err.message || "some error occurred"
        })
    })
}


//get All Client info
exports.getAllClients = (req, res) => {
    Client.find()
        .then(data => {
            res.status(200).json({
                data
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "some error occurred"
            })
        })
}

//Get Single  Client info
exports.getSingleClient = (req, res) => {
    const {
        id
    } = req.params

    Client.findById(id)
        .then(data => {
            if (!data)
                res.status(404).json({
                    message: "client not found"
                })
            else
                res.status(200).json({
                    data
                })

        })
        .catch(err => {
            res.status(500).json({
                message: ({
                    message: "Error has occurred "
                })
            })
        })
}

//update Client info
exports.updateClient = (req, res) => {
    const {
        id
    } = req.params
    Client.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data)
                res.status(404).json({
                    message: "Can't find data"
                })
            else res.status(200).json({
                data
            })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    message: " Error occurred"
                })
        })
}

//Delete Client info
exports.deleteClient =(req,res)=>{
    const {id} = req.params
    Client.findByIdAndDelete(id)
    .then(data=>{
        if(!data)
        res.status(404).json({
            message:"Client couldn't be found"
        })
        else res.status(200).json({
            message:"Client data deleted successfully"
        })
    })
    .catch(err=>{
        res.status(500).json({
            message:"Error occurred"
        })
    })
}