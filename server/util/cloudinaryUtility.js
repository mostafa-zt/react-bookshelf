const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const config = require('../config/config').get(process.env.NODE_ENV);

cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET
});

const streamUpload = (file) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream({ folder: 'bookshelf' },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );

        streamifier.createReadStream(file.buffer).pipe(stream);
    });
};

const removeFile = (publicId) => {
    return cloudinary.uploader.destroy(publicId);
}

module.exports = { streamUpload, removeFile }