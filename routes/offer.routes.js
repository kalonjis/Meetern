// On instancie le router d'express
const router = require('express').Router();

// On importe les contollers
const offerController = require('../controllers/offerController');


/*On définit les routes et les fonctions liées*/
router.get("/", offerController.getAllOffers);
router.get("/:id", offerController.offerInfo);
router.post("/", offerController.createOffer);
router.put("/:id", offerController.updateOffer);
router.put("/editOfferStatus/:id", offerController.editOfferStatus);
router.delete("/:id", offerController.deleteOffer);

// applications
router.patch("/apply/:id", offerController.apply);
router.patch("/deleteApplication/:id", offerController.deleteApplication);
router.patch("/editApplicationStatus/:id", offerController.editApplicationStatus);
router.patch("/selectStudent/:id", offerController.selectStudent);
router.patch("/unselectStudent/:id", offerController.unselectStudent);

module.exports = router;
