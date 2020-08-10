'use strict'
require('dotenv').config()

const AWS = require('aws-sdk')

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
})

const s3 = new AWS.S3()

const fs = require('fs')
const mime = require('mime-types')

// return a promise that is resolved or rejected
// based on if s3.upload succeeds or not
const s3Upload = function (file, originalName, newName) {
  const bucketName = process.env.BUCKET_NAME
  console.log('file is ', file)
  // get mimetype from file name
  const contentType = mime.lookup(originalName)

  // get extension from mime type
  const extension = mime.extension(contentType)

  // file path is from root of directory where file is run from
  const stream = fs.createReadStream(file)

  const params = {
    // the bucket we upload it to
    Bucket: bucketName,
    // the title of the image
    // Key: 'key.' + extension,
    Key: `${newName}.${extension}`,
    // the actual file or contents of the file
    Body: stream,
    ContentType: contentType
  }

  return new Promise((resolve, reject) => {
    // upload file to s3
    s3.upload(params, function (err, data) {
      // if it fails then promise rejects
      if (err) {
        reject(err)
      // if it succeeds then promise resolves with data
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = s3Upload
