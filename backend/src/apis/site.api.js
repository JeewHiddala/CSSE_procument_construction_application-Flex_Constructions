const express = require('express');
const router = express.Router();
const siteController = require('../controllers/site.controller');

module.exports = function () {

    router.post('/create', siteController.createSite);        // create site.
    router.get('/', siteController.getAllSitesDetails);       //get all site.


   

    router.get('/:id', siteController.getSelectedSiteDetails);    
    router.patch('/update/:id', siteController.updateSelectedSiteDetails);
    router.delete('/:id', siteController.deleteSite);
    return router;
}

