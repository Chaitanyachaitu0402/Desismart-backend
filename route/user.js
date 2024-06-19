const userService = require('../services/user');
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

// CREATE USER

router.post('/create-user', upload.single("profilepic"), async (req, res) => {
    const response = await userService.createUser(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// LOGIN 

router.post('/login-user', async (req, res) => {
    const response = await userService.userLogin(req.body);
    if (response.success) {
        res.json(response)
    } else {    
        res.status(500).json(response);
    }
});

// UPDATE USER

router.post('/update-user', upload.single("profilepic"), async (req, res) => {
    const response = await userService.updateUser(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE USER

router.post('/delete-user-by-id', async (req, res) => {
    const response = await userService.deleteUser(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET USER

router.post('/get-user-by-id', async (req, res) => {
    const response = await userService.getUserById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL USERS 

router.post('/get-all-user', async (req, res) => {
    const response = await userService.getAllUser(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH USER DETAILS

router.post('/search-user-details', async (req, res) => {
    const response = await userService.searchUserDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// COUNT

router.post('/count-user-details', async (req, res) => {
    const response = await userService.countUserDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// RESET PASSWORD

router.post("/reset-password", async (req, res) => {
    let response = await userService.resetPassword(req);
    if (response.success) {
      res.json(response);
    }  else
     {
      res.status(500).json(response);
    }
});

module.exports = router;