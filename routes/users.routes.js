const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const UrlModel = require('../models/url.model');
const userController = require('../controllers/users.controller')

router.route('/').get(userController.getUsers);


router.post('/shorten', async (req, res) => {
    try{        
        const { url } = req.body;
        const shortCode = shortid.generate();
        const shortUrl = `${shortCode}`;
      
        // Save to MongoDB
        await UrlModel.create({ originalUrl: url, shortUrl });
      
        res.json({ url: `http://localhost:3080/${shortUrl}` });
    }catch (e){
        console.log(e);
        res.send({data:null})
    }
  });


module.exports = router;