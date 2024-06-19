
const poojaService = require('../services/pooja');
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

// CREATE POOJA

router.post('/create-pooja', upload.single("product_image"), async (req, res) => {
    const response = await poojaService.createPooja(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE POOJA

router.post('/update-pooja', upload.single("product_image"), async (req, res) => {
    const response = await poojaService.updatePooja(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE POOJA

router.post('/delete-pooja-by-id', async (req, res) => {
    const response = await poojaService.deletePooja(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET POOJA

router.post('/get-pooja-by-id', async (req, res) => {
    const response = await poojaService.getPoojaById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL POOJA 

router.post('/get-all-pooja', async (req, res) => {
    const response = await poojaService.getAllPooja(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH POOJA

router.post("/search-pooja", async (req, res) => {
    let response = await poojaService.searchPoojaDetails(req);
    if (response.success) {
      res.json(response);
    }  else
     {
      res.status(500).json(response);
    }
});

module.exports = router;