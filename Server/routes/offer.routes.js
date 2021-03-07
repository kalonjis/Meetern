// On instancie le router d'express
const router = require('express').Router();

// On importe les contollers
const offerController = require('../controllers/offerController');


/*On définit les routes et les fonctions liées*/
router.get("/", offerController.readOffer);
router.post("/", offerController.createOffer);
router.put("/:id", offerController.updateOffer);

module.exports = router;
