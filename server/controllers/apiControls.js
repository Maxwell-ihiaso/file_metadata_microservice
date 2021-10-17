const createError = require('http-errors');
const path = require('path');
const multer = require('multer');
const { nextTick } = require('process');

// multer storage settings 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/files')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().substring(0, 10) + '-'+ file.fieldname + path.extname(file.originalname));
    }
})

// middlewares 
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    }
});

// Handlers 
const uploadControls = async (req, res, next) =>{
    try {
        const file = await req.file;
        if (!file) {
            return res.render('index', {
                msg: `First select a file to upload`
            })
        }
    
        res.status(200).json({
            "name": file.originalname,
            "type": file.mimetype,
            "size": file.size
            })

    } catch (error) {
        next(error)
    }
}


module.exports = {
    upload,
    uploadControls
}