// Load dependencies
const aws = require('aws-sdk')
const express = require('express')
const fs = require('fs')
const multer = require('multer');
const path = require('path');
const cors = require('cors')
const secretAccessKey = '306mNJvUoXPbMvGB6QeGJ2fMN/kXSq7Nq2doWOU16+c'
const accessKeyId = 'DO00YL28XWF8T43WZ7CE'
const keyName = 'testApiKey'
const endpointPath = 'https://sgp1.digitaloceanspaces.com'
const storageUrl = 'https://teststorageapi.sgp1.digitaloceanspaces.com'
const app = express()
app.use(cors())
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, '');
  },
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// กำหนดว่าจะใช้ storage ที่เรากำหนดไว้
const upload = multer({ storage: storage });

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint(endpointPath)
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  credentials: { accessKeyId, secretAccessKey }, forcePathStyle: false,

  region: 'ap-southeast-1'
})





app.post('/uploadFile',upload.single('file'),async function (request, response) {
  if (!request.file || Object.keys(request.file).length === 0) {
    return response.status(400).send('No files were uploaded.')
  }
  const uploadedFile = request.file
  const uploadParams = {
    Bucket: 'teststorageapi',
    Key: uploadedFile.originalname,
    Body: fs.createReadStream(`./${uploadedFile.path}`),
    ACL: 'public-read', 
    ContentType:uploadedFile.mimetype
  }
  console.log(uploadParams)
  const res = await s3.upload({...uploadParams}).promise()
  if(res!=null && res.Location != undefined){
    fs.unlink(uploadedFile.path,(err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return;
      }
      console.log('File deleted successfully');
    });
  }
  response.json(res)
})
app.get('/list', async function (request, response, next) {
  let a = null
  await s3.listObjects({
    Bucket: 'teststorageapi'
  }, function (err, data) {
    if (err != null) {
      response.json(err)
    }
    else {
      console.log(data.Contents)
      response.json(data.Contents?.map(x => `${storageUrl}/${x.Key}`))
    }
  })
})
app.listen(3001, function () {
  console.log('Server listening on port 3001.')
})