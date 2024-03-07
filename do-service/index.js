// Load dependencies
const aws = require('aws-sdk');
const fs = require('fs')
const express = require('express');
const secretAccessKey = '306mNJvUoXPbMvGB6QeGJ2fMN/kXSq7Nq2doWOU16+c'
const accessKeyId = 'DO00YL28XWF8T43WZ7CE'
const keyName = 'testApiKey'
const endpointPath = 'https://sgp1.digitaloceanspaces.com'
const app = express();

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint(endpointPath);
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  credentials:{accessKeyId,secretAccessKey},forcePathStyle: false,

  region:'ap-southeast-1'
});
const uploadParams = {
  Bucket: 'teststorageapi',
  Key: 'file.jpg', // ตำแหน่งที่ต้องการบันทึกไฟล์ใน Spaces
  Body: fs.createReadStream('./23191005_Background_with_line_wave_pattern_5.jpg'),
  ACL: 'public-read', // กำหนดสิทธิ์ในการอ่านไฟล์
};




app.get('/', function (request, response, next) {
  s3.upload(uploadParams,(err,data)=>{
    if (err) {
      console.error("Error", err);
  } if (data) {
    console.log(data);
  response.end(data.Location)
      console.log("Upload Success", data.Location);
  }
  })
});
app.get('/list', function (request, response, next) {
  var params = {
    Bucket: 'teststorageapi',
    Delimiter: ',',
    Marker: '',
    Prefix: '',
    MaxKeys: 2
  };
  let a= null
  s3.listObjects(params, function(err, data) {
    if (err) console.log(err, err.stack); // รายงานข้อผิดพลาดถ้ามี
    else    {  a= data.Contents}           // แสดงข้อมูลทั้งหมดที่ได้รับ
  });  
  console.log(a);
  response.end(a)
});
app.listen(3001, function () {
  console.log('Server listening on port 3001.');
});