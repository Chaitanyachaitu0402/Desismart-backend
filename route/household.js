const { json } = require('body-parser');
const householdService = require('../services/household');
const route = require('express');
const router = route.Router();
const multer = require('multer')
const path = require('path')

//IMAGE CONFRIGATIONS

const imageconfig = multer.diskStorage
    (
        {
            destination: (req, file, callback) => {
                callback(null, "./storege/userdp")
            },
            filename: (req, file, callback) => {
                callback(null, Date.now() + path.extname(file.originalname));
            }
        }
    )
var upload = multer(
    {
        storage: imageconfig,
        limits: {
            fileSize: 1000000000
        }
    }
);

// CREATE BREAKFAST

router.post('/create-household', upload.single("product_image"), async (req, res) => {
    const response = await householdService.createHouseHold(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE HOUSEHOLD

router.post('/update-household', upload.single("product_image"), async (req, res) => {
    const response = await householdService.updateHouseHold(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE HOUSEHOLD

router.post('/delete-household-by-id', async (req, res) => {
    const response = await householdService.deleteHouseHold(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET HOUSEHOLD

router.post('/get-household-by-id', async (req, res) => {
    const response = await householdService.getHouseHoldById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL HOUSEHOLD 

router.post('/get-all-household', async (req, res) => {
    const response = await householdService.getAllHouseHold(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH HOUSEHOLD

router.post("/search-household", async (req, res) => {
    let response = await householdService.searchHouseHoldDetails(req);
    if (response.success) {
      res.json(response);
    }  else
     {
      res.status(500).json(response);
    }
});

module.exports = router;