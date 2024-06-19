const breakfastService = require('../services/breakfast');
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

router.post('/create-breakfast', upload.single("product_image"), async (req, res) => {
    const response = await breakfastService.createBreakFast(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE BREAKFAST

router.post('/update-breakfast', upload.single("product_image"), async (req, res) => {
    const response = await breakfastService.updateBreakFast(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE BREAKFAST

router.post('/delete-breakfast-by-id', async (req, res) => {
    const response = await breakfastService.deleteBreakFast(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET BREAKFAST

router.post('/get-breakfast-by-id', async (req, res) => {
    const response = await breakfastService.getBreakFastById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL BREAKFAST 

router.post('/get-all-breakfast', async (req, res) => {
    const response = await breakfastService.getAllBreakFast(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH BREAKFAST

router.post("/search-breakfast", async (req, res) => {
    let response = await breakfastService.searchBreakFastDetails(req);
    if (response.success) {
      res.json(response);
    }  else
     {
      res.status(500).json(response);
    }
});

module.exports = router;