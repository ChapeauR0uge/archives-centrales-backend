/*Import du model*/
const Service = require('../models/service.model').model;

/*Import fonction création/Suppression de service dans département*/
const departement = require('../controllers/departement.controller');

/*Récupère la liste de tout les services avec le nom du département
* GET /
*/
const getServices =
    (req, res) =>
        Service.find().select('-__v -createdAt')
                .populate({path: "dep_id", select:"name"})
                .then( (service) => res.status(200).json(service) );


/* Récupère les détails d'un service
*/
const getService =
    (req, res) =>
        Service.findById( req.params.id )
                .then( (service) => res.status(200).json(service) );
/*
* Supprime un service.
* DELETE /:id
*/
const deleteService =
    async (req, res) => {
        let serviceId = req.params.id;
        let depId = await Service.findById(serviceId);

        /*Suppression de l'id dans le tableau*/
        departement.deleteServiceInDep(depId.dep_id, serviceId);

        Service.findByIdAndRemove( serviceId )
                .then( () => res.status(200).end() );
            }

/*
* Mise à jour d'un service
* PUT /:id
*/
const updateService =
    (req, res) =>
        Service.findByIdAndUpdate( req.params.id , { ...req.body }, { new : true } )
                .populate({path: "dep_id", select:"name"})
                .then( (service) => res.status(200).json(service) );
/*
* Create a Service
*
*/

const createService =
     (newService) =>
        Service.create(newService);

/*
* Suppression d'un service.
* Indispensable de traité la promesse sinon erreur
*/
const eraseService =
    (serviceId) =>
        Service.findByIdAndRemove( serviceId )
                .then((usr) => console.log(usr.service_name+' deleted'));


/*For APIRest*/
module.exports.getServices = getServices;
module.exports.getService = getService;
module.exports.deleteService = deleteService;
module.exports.updateService = updateService;

/*For Département*/
module.exports.eraseService = eraseService;
module.exports.createService = createService;
