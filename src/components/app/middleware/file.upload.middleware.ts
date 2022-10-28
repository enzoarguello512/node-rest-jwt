import fileUpload from 'express-fileupload';

// Upload config
const uploadOptions = {
  useTempFiles: true,
  tempFileDir: '/tmp/',
};

// File upload middleware
export default fileUpload(uploadOptions);
