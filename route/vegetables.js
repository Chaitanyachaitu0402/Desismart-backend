const vegetablesService = require('../services/vegetables');
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

// CREATE VEGETABLES

router.post('/create-vegetables', upload.single("product_image"), async (req, res) => {
    const response = await vegetablesService.createVegetables(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE VEGETABLES

router.post('/update-vegetables', upload.single("product_image"), async (req, res) => {
    const response = await vegetablesService.updateVegetables(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE VEGETABLES

router.post('/delete-vegetables-by-id', async (req, res) => {
    const response = await vegetablesService.deleteVegetables(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET VEGETABLES

router.post('/get-vegetables-by-id', async (req, res) => {
    const response = await vegetablesService.getVegetablesById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL VEGETABLES 

router.post('/get-all-vegetables', async (req, res) => {
    const response = await vegetablesService.getAllVegetables(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH VEGETABLES

router.post("/search-vegetables", async (req, res) => {
    let response = await vegetablesService.searchVegetablesDetails(req);
    if (response.success) {
      res.json(response);
    }  else
     {
      res.status(500).json(response);
    }
});

module.exports = router;