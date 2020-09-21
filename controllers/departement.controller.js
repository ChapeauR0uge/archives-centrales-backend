/*Import du model*/
const Departement = require('../models/departement.model').model;

/*Import fonction création/Suppression de service*/
const service = require('../controllers/service.controller');

const getDepartements =
    (req, res) =>
        Departement.find().select('-__v -createdAt')
                 .then( sv => res.status(200).json(sv) );


const getDepartementWithService =
    (req, res) =>
        Departement.findOne({'dep_id': req.params.depId})
                   .populate('services')
                   .then(dep => res.status(200).json(dep));
/*
* Récupère les details archives d'un département
* GET /:depId
*/
const getDetail =
    (req, res) =>
        Departement.findOne({ 'dep_id' : req.params.depId })
                 .then( arc => res.status(200).json(arc) );

/*Creation d'un département
* POST /
*/
const createDepartement =
    (req, res) => {
        let newDep = { ...req.body };
        Departement.create(newDep)
                   .then(dep => res.status(200).json(dep))
                   .catch( err => res.status(400).json(err) );

    }

/*
* Mise à jour d'un departement
* PUT /:depId
*/
const updateDepartement =
    (req, res) =>
        Departement.findOneAndUpdate( {'dep_id': req.params.depId} , { ...req.body }, { new : true } )
                    .then( (departement) => res.status(200).json(departement))
                    .catch( err => res.status(400).json(err));

/*
* Suppression d'un département
* DELETE /:depId
*/
const deleteDepartement =
    async (req, res) => {
        /*Récupération du département*/
        let depid = await Departement.findOne({'dep_id':req.params.depId});

        /*Récupération de la liste des services*/
        let services = depid.services;

        /*Suppression des services*/
        await services.map( (serviceId) =>
                service.eraseService( serviceId )
        );

        /*Suppresion du département*/
        await Departement.findByIdAndRemove( depid._id )
                    .exec( () => res.status(200).end() )
                    .catch( err => res.status(400).json(err));
    }

/*Creation d'un service dans un département
* POST /:depId/create
*/
const createServiceInDepartement =
    async (req, res) => {
        /*Récupération du département*/
        let depid = await Departement.findOne({'dep_id':req.params.depId});

        /*Récupération du service crée avec en dep_id l'id du departement*/
        let newService = await service.createService({dep_id: depid._id, ...req.body});

        /*Mise a jour du departement*/
        Departement.updateOne({_id: depid._id}, {$push:{services:newService._id}})
                   .then(() => res.status(200).json(newService));
    }

/*
* Suppresion d'un service dans le tableau Services
*/
const deleteServiceInDep =
    (depId, serviceId) =>
        Departement.updateOne( {_id: depId}, { $pull:{ services:serviceId } } )
                    .then( () => console.log(serviceId + " deleted") );

/*For APIRest*/
module.exports.getDetail = getDetail;
module.exports.getDepartements = getDepartements;
module.exports.getDepartementWithService = getDepartementWithService;
module.exports.createDepartement = createDepartement;
module.exports.updateDepartement = updateDepartement;
module.exports.createServiceInDepartement = createServiceInDepartement;
module.exports.deleteDepartement = deleteDepartement;

/*For Service*/
module.exports.deleteServiceInDep = deleteServiceInDep;
