const express = require('express');
const {
    addClient,
    getAllClients,
    getSingleClient,
    updateClient,
    deleteClient
} = require('../controller/clients');
const {
    createProvider,
    getAllProviders,
    getSingleProvider,
    updateProvider,
    deleteProvider
} = require('../controller/providers');
const router = express.Router();

//provider endpoints
router.get('/providers', getAllProviders)
router.get('/provider/:id', getSingleProvider)
router.post('/create-provider', createProvider)
router.put('/provider/:id', updateProvider)
router.delete('/provider/:id', deleteProvider)


//client endpoints
router.post('/create-client', addClient)
router.get('/clients', getAllClients)
router.get('/client/:id', getSingleClient)
router.put('/client/:id', updateClient)
router.delete('/client/:id', deleteClient)




module.exports = router