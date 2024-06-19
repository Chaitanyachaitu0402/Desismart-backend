const { json } = require('body-parser');
const pickelsService = require('../services/pickels');
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

// CREATE PICKELS

router.post('/create-pickels', upload.single("product_image"), async (req, res) => {
    const response = await pickelsService.createPickels(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE PICKELS

router.post('/update-pickels', upload.single("product_image"), async (req, res) => {
    const response = await pickelsService.updatePickels(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE PICKELS

router.post('/delete-pickels-by-id', async (req, res) => {
    const response = await pickelsService.deletePickels(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET PICKELS

router.post('/get-pickels-by-id', async (req, res) => {
    const response = await pickelsService.getPickelsById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL PICKELS 

router.post('/get-all-pickels', async (req, res) => {
    const response = await pickelsService.getAllPickels(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH PICKELS

router.post("/search-pickels", async (req, res) => {
    let response = await pickelsService.searchPickelsDetails(req);
    if (response.success) {
      res.json(response);
    }  else
     {
      res.status(500).json(response);
    }
});

module.exports = router;