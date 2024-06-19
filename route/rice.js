const { json } = require('body-parser');
const riceService = require('../services/rice');
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

// CREATE RICE

router.post('/create-rice', upload.single("product_image"), async (req, res) => {
    const response = await riceService.createRice(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE RICE

router.post('/update-rice', upload.single("product_image"), async (req, res) => {
    const response = await riceService.updateRice(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE RICE

router.post('/delete-rice-by-id', async (req, res) => {
    const response = await riceService.deleteRice(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET RICE

router.post('/get-rice-by-id', async (req, res) => {
    const response = await riceService.getRiceById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL RICE 

router.post('/get-all-rice', async (req, res) => {
    const response = await riceService.getAllRice(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH RICE

router.post("/search-rice", async (req, res) => {
    let response = await riceService.searchRiceDetails(req);
    if (response.success) {
      res.json(response);
    }  else
     {
      res.status(500).json(response);
    }
});

module.exports = router;