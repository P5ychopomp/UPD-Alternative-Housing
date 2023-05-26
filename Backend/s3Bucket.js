const multer = require('multer')
const {S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand} = require('@aws-sdk/client-s3')
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner')
const crypto = require('crypto')
const sharp = require('sharp')

// S3_config
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials:{
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
});

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

const randomImageName = (bytes=32)=>crypto.randomBytes(bytes).toString('hex')

async function getSignedImgUrl(req, res, next){
    for (const listing of req.data){
        if (!listing.img_url)
            return res.json(req.data)

        const getObjectParams = {
            Bucket: bucketName,
            Key: listing.img_url,
        }
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        listing.image_url = url
    }
    res.json(req.data)
}

async function imgUpload(req, res, next){
    console.log("req.body", req.body)
    console.log("req.file", req.file)

    if (!req.file) // if no image uploaded
        return next()

    // resize image
    const buffer = await sharp(req.file.buffer).resize({height: 1080, width: 1920, fit:"contain"}).toBuffer()

    const imageName = !req.imgName ? randomImageName() : req.imgName

    const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: buffer,
        ContentType: req.file.mimetype,

    }
    const command = new PutObjectCommand(params)

    await s3.send(command)

    req.body.img = imageName
    next()
}

async function deleteImg(req, res, next){
    console.log(req.imgName)

    if (!req.imgName)
        return next()

    const params = {
        Bucket: bucketName,
        Key: req.imgName
    }

    const Command = new DeleteObjectCommand(params)

    await s3.send(Command)

    next()
}

module.exports = {
    upload,
    getSignedImgUrl,
    imgUpload,
    deleteImg
}