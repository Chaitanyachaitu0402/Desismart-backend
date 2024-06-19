const { json } = require('body-parser');
const spicesService = require('../services/spices');
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

// CREATE SPICES

router.post('/create-spices', upload.single("product_image"), async (req, res) => {
    const response = await spicesService.createSpices(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE SPICES

router.post('/update-spices', upload.single("product_image"), async (req, res) => {
    const response = await spicesService.updateSpices(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE SPICES

router.post('/delete-spices-by-id', async (req, res) => {
    const response = await spicesService.deleteSpices(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET SPICES

router.post('/get-spices-by-id', async (req, res) => {
    const response = await spicesService.getSpicesById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL SPICES 

router.post('/get-all-spices', async (req, res) => {
    const response = await spicesService.getAllSpices(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH SPICES

router.post("/search-spices", async (req, res) => {
    let response = await spicesService.searchSpicesDetails(req);
    if (response.success) {
      res.json(response);
    }  else
     {
      res.status(500).json(response);
    }
});

module.exports = router;