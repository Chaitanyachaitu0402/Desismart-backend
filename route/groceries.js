const { json } = require('body-parser');
const groceriesService = require('../services/groceries');
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

// CREATE GROCERIES

router.post('/create-groceries', upload.single("product_image"), async (req, res) => {
    const response = await groceriesService.createGroceries(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE GROCERIES

router.post('/update-groceries', upload.single("product_image"), async (req, res) => {
    const response = await groceriesService.updateGroceries(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE GROCERIES

router.post('/delete-groceries-by-id', async (req, res) => {
    const response = await groceriesService.deleteGroceries(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET GROCERIES

router.post('/get-groceries-by-id', async (req, res) => {
    const response = await groceriesService.getGroceriesById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL GROCERIES 

router.post('/get-all-groceries', async (req, res) => {
    const response = await groceriesService.getAllGroceries(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH GROCERIES

router.post("/search-groceries", async (req, res) => {
    let response = await groceriesService.searchGroceriesDetails(req);
    if (response.success) {
      res.json(response);
    }  else
     {
      res.status(500).json(response);
    }
});

module.exports = router;