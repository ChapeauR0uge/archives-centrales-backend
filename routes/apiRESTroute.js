const express = require('express');
const router = express.Router();

// import controller for resources
const departement = require('../controllers/departement.controller');
const service = require('../controllers/service.controller');
const user = require('../controllers/user.controller');

// import middleswars
const { auth , upload } = require('../middlewares');

//Routes for departement
router.get( '/departements', departement.getDepartements );
router.post( '/departements', [auth.verifyToken, auth.isAdmin], departement.createDepartement );

router.get( '/departements/:depId', departement.getDetail );
router.put( '/departements/:depId', [auth.verifyToken, auth.isAdmin], departement.updateDepartement );
router.delete( '/departements/:depId', [auth.verifyToken, auth.isAdmin], departement.deleteDepartement );

router.get( '/departements/:depId/services',  departement.getDepartementWithService );
router.post( '/departements/:depId/services', [auth.verifyToken, auth.isAdmin], departement.createServiceInDepartement );

//Routes for Services
router.get('/services', service.getServices);
router.get('/services/:id', service.getService);
router.delete('/services/:id', [auth.verifyToken, auth.isAdmin], service.deleteService);
router.put('/services/:id', [auth.verifyToken, auth.isAdmin], service.updateService);

//Routes for users

module.exports = router;
