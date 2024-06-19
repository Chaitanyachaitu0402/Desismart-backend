const { json } = require('body-parser');
const sweets_savouries_Service = require('../services/sweets_savouries');
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

// CREATE SWEETS AND SAVOURIES

router.post('/create-sweets-savouries', upload.single("product_image"), async (req, res) => {
    const response = await sweets_savouries_Service.createSweetsSavouries(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE SWEETS AND SAVOURIES

router.post('/update-sweets-savouries', upload.single("product_image"), async (req, res) => {
    const response = await sweets_savouries_Service.updateSweetsSavouries(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE SWEETS AND SAVOURIES

router.post('/delete-sweets-savouries-by-id', async (req, res) => {
    const response = await sweets_savouries_Service.deleteSweetsSavouries(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET SWEETS AND SAVOURIES

router.post('/get-sweets-savouries-by-id', async (req, res) => {
    const response = await sweets_savouries_Service.getSweetsSavouriesById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL SWEETS AND SAVOURIES 

router.post('/get-all-sweets-savouries', async (req, res) => {
    const response = await sweets_savouries_Service.getAllSweetsSavouries(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH SWEETS AND SAVOURIES

router.post("/search-sweets-savouries", async (req, res) => {
    let response = await sweets_savouries_Service.searchSweetsSavouriesDetails(req);
    if (response.success) {
      res.json(response);
    }  else
     {
      res.status(500).json(response);
    }
});

module.exports = router;