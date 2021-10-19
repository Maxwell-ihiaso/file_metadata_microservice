const FileSchema = require('../Model/FileSchema');
const createError = require('http-errors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

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
        fileSize: 5000000
    }
});

// Handlers 
const uploadControls = async (req, res, next) =>{
    try {
        const file = req.file;
        if (!file) {
            return res.render('index', {
                msg: `First select a file to upload`
            })
        }
        
        const fileAccess = fs.readFileSync(req.file.path);
        const parseFile = fileAccess.toString('base64');
        await FileSchema.create({
            "name": file.originalname,
            "type": file.mimetype,
            "size": file.size,
            "image": Buffer.from(parseFile, 'base64'),
            "path": file.path
        }).then(result => {
            res
            .status(200)
            .json({
                "name": result.name,
                "type": result.type,
                "size": result.size
                })
        }).catch(error => {throw createError.InternalServerError(error)})
    } catch (error) {
        next(error)
    }
}


module.exports = {
    upload,
    uploadControls
}