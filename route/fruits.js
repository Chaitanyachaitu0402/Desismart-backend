const fruitsService = require('../services/fruits');
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

// CREATE FRUITS

router.post('/create-fruits', upload.single("product_image"), async (req, res) => {
    const response = await fruitsService.createFruits(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE FRUITS

router.post('/update-fruits', upload.single("product_image"), async (req, res) => {
    const response = await fruitsService.updateFruits(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE FRUITS

router.post('/delete-fruits-by-id', async (req, res) => {
    const response = await fruitsService.deleteFruits(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET FRUITS

router.post('/get-fruits-by-id', async (req, res) => {
    const response = await fruitsService.getFruitsById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL FRUITS 

router.post('/get-all-fruits', async (req, res) => {
    const response = await fruitsService.getAllFruits(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH FRUITS

router.post("/search-fruits", async (req, res) => {
    let response = await fruitsService.searchFruitsDetails(req);
    if (response.success) {
      res.json(response);
    }  else
     {
      res.status(500).json(response);
    }
});

module.exports = router;