const Storage = require("@google-cloud/storage")
const config = {
    CLOUD_BUCKET: 'coba-multer',
    PROJECT_ID: 'hacktiv8-198016',
}
const storage = Storage({
    projectId: config.PROJECT_ID,
    keyFilename: './gcs.json'
});

// set which bucket
const bucket = storage.bucket(config.CLOUD_BUCKET);

// just a helper to create absolute path to GCS
function getPublicUrl(filename) {
    return `https://storage.googleapis.com/${config.CLOUD_BUCKET}/${filename}`;
}

let ImgUpload = {};
// the real middleware

ImgUpload.sendUploadToGCS = (req, res, next) => {
    if (!req.files) {
        return next('upload mungkin gagal');
    }

    const bulkupload = req.files.map((data) => {
        const gcsname = Date.now() + '.' + data.originalname.split('.').pop();
        const file = bucket.file(gcsname);

        // // prepare the stream
        const stream = file.createWriteStream({
            metadata: {
                contentType: data.mimetype
            }
        });

        // // handle when upload error
        stream.on('error', (err) => {
            data.cloudStorageError = err;
            next(err);
        });

        // // handle when upload finish
        stream.on('finish', () => {
            data.cloudStorageObject = gcsname;
            file.makePublic(). //make the uploaded file public
            then(() => {
                data.cloudStoragePublicUrl = getPublicUrl(gcsname);
                next();
            });
        });

        // // write the file
        stream.end(data.buffer);

    })
}

module.exports = ImgUpload