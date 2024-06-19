const { json } = require('body-parser');
const beveragesService = require('../services/beverages');
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

// CREATE BEVERAGES

router.post('/create-beverages', upload.single("product_image"), async (req, res) => {
    const response = await beveragesService.createBeverages(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE BEVERAGES

router.post('/update-beverages', upload.single("product_image"), async (req, res) => {
    const response = await beveragesService.updateBeverages(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE BEVERAGES

router.post('/delete-beverages-by-id', async (req, res) => {
    const response = await beveragesService.deleteBeverages(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET BEVERAGES

router.post('/get-beverages-by-id', async (req, res) => {
    const response = await beveragesService.getBeveragesById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL BEVERAGES 

router.post('/get-all-beverages', async (req, res) => {
    const response = await beveragesService.getAllBeverages(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH BEVERAGES

router.post("/search-beverages", async (req, res) => {
    let response = await beveragesService.searchBeveragesDetails(req);
    if (response.success) {
      res.json(response);
    }  else
     {
      res.status(500).json(response);
    }
});

module.exports = router;