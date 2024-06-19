const contactService = require ('../services/contact');
const route = require('express');
const router = route.Router();

// CREATE CONTACT

router.post('/create-contact', async (req, res) => {
    const response = await contactService.createContact(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})


// GET CONTACT

router.post('/get-contact-by-id', async (req, res) => {
    const response = await contactService.getContactById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL CONTACT 

router.post('/get-all-contact', async (req, res) => {
    const response = await contactService.getAllContact(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


module.exports = router;