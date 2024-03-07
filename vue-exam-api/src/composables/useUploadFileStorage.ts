// import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
// import aws from 'aws-sdk'
// import multer from 'multer'
// import multerS3 from 'multer-s3'

// export function useUploadFileStorage() {
//     const spacesEndpoint = new aws.Endpoint(
//         'https://teststorageapi.sgp1.digitaloceanspaces.com'
//     )
//     const s3 = new aws.S3({
//         endpoint: spacesEndpoint,
//     })

//     const uploadObject = async (data: File) => {
//         console.log(data)
//         const file = data
//         // ตัวอย่างชื่อไฟล์ที่ต้องการอัปโหลด
//         multer({
//             storage: multerS3({
//                 s3: s3,
//                 bucket: 'teststorageapi',
//                 acl: 'public-read',
//                 contentType: multerS3.AUTO_CONTENT_TYPE,
//                 metadata: (req: any, file: any, cb: any) => {
//                     cb(null, { fieldName: file.fieldname })
//                 },
//                 key: (req: any, file: any, cb: any) => {
//                     cb(null, Date.now().toString() + file.originalname)
//                 },
//             }),
//         }).array('upload', 1)
//     }

//     return {
//         uploadFile: uploadObject,
//     }
// }
