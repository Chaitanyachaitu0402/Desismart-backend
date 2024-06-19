const { json } = require('body-parser');
const funpartyService = require('../services/fun_party');
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

// CREATE FUN PARTY

router.post('/create-fun-party', upload.single("product_image"), async (req, res) => {
    const response = await funpartyService.createFunParty(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE FUN PARTY

router.post('/update-fun-party', upload.single("product_image"), async (req, res) => {
    const response = await funpartyService.updateFunParty(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE FUN PARTY

router.post('/delete-fun-party-by-id', async (req, res) => {
    const response = await funpartyService.deleteFunParty(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET FUN PARTY BY ID

router.post('/get-fun-party-by-id', async (req, res) => {
    const response = await funpartyService.getFunPartyById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL FUN PARTY 

router.post('/get-all-fun-party', async (req, res) => {
    const response = await funpartyService.getAllFunParty(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH FUN PARTY

router.post("/search-fun-party", async (req, res) => {
    let response = await funpartyService.searchFunPartyDetails(req);
    if (response.success) {
      res.json(response);
    }  else
     {
      res.status(500).json(response);
    }
});

module.exports = router;