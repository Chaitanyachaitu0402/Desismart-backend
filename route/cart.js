const cartService = require('../services/cart');
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

// CREATE CART

router.post('/create-cart', upload.single("cart_image"), async (req, res) => {
    const response = await cartService.createCart(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE CART

router.post('/update-cart', upload.single("cart_image"), async (req, res) => {
    const response = await cartService.updateCart(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE CART

router.post('/delete-cart-by-id', async (req, res) => {
    const response = await cartService.deleteCart(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET CART

router.post('/get-cart-by-id', async (req, res) => {
    const response = await cartService.getCartById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL CART 

router.post('/get-all-cart', async (req, res) => {
    const response = await cartService.getAllCart(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH CART

router.post("/search-cart", async (req, res) => {
    let response = await cartService.searchCartDetails(req);
    if (response.success) {
      res.json(response);
    }  else
     {
      res.status(500).json(response);
    }
});

module.exports = router;