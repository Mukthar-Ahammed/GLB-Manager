import { MongoClient, ObjectId, GridFSBucket } from 'mongodb';
import glbuploader from '../model/model.js';
import dotenv from 'dotenv';
import { Readable } from 'stream';
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
const db = client.db();
const bucket = new GridFSBucket(db, { bucketName: 'glbmodels' });

export const uploadcontroller = async (req, res) => {
  const { name } = req.body;
  const file = req.file;

  if (!name || !file) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const uploadStream = bucket.openUploadStream(file.originalname, {
    metadata: { uploadedBy: 'GLB uploader' },
    contentType: file.mimetype
  });

  const bufferStream = Readable.from(file.buffer);
  bufferStream.pipe(uploadStream)

    .on('error', e => {
      console.error('GridFS upload error:', e);
      res.status(500).json({ message: "Upload failed" });
    })

    .on('finish', async () => {
      const fileId = uploadStream.id;
      console.log("GridFS upload finished, fileId:", fileId);

      try {
        const saved = await new glbuploader({ name, fileId }).save();
        res.status(200).json({ message: "Upload successful", data: saved });
      } catch (dbErr) {
        console.error("DB insert error:", dbErr);
        res.status(500).json({ message: "Database error" });
      }
    });


}

export const viewController= async(req,res)=>{

  try {
    const upload=await glbuploader.find()
    res.status(200).json(upload)
  } catch (error) {
    res.status(500)
    console,log("Internal Server Error",erro)
  }
};


export const streamGLBById = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid file ID" });
  }

  try {
    const _id = new ObjectId(id);
    const files = await db.collection('glbmodels.files').find({ _id }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ message: "File not found" });
    }

    const downloadStream = bucket.openDownloadStream(_id);

    res.setHeader('Content-Type', 'model/gltf-binary');
    res.setHeader('Content-Disposition', 'inline');

    downloadStream.pipe(res).on('error', (err) => {
      console.error('Error streaming file:', err);
      res.status(500).json({ message: "Error retrieving file" });
    });

  } catch (err) {
    console.error('streamGLBById error:', err);
    res.status(500).json({ message: "Server error" });
  }
};


