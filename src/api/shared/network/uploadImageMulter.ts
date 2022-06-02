import multer from 'multer';

const storageMulter = multer.diskStorage({
  destination: './public/imgs',
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    const fileName = `${file.fieldname}-${Date.now()}.${ext}`;
    file.path = `${process.env.HOST}:${process.env.PORT}/${process.env.PUBLIC_IMAGES}/${fileName}`;
    req.body.filePath = `${process.env.HOST}:${process.env.PORT}/${process.env.PUBLIC_IMAGES}/${fileName}`;

    cb(null, fileName);
  }
});

export const uploadImageMiddelware = multer({ storage: storageMulter });
