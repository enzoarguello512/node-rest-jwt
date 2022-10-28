import { v2 as cloudinary } from 'cloudinary';
import config from 'config';
import { UploadedFile } from 'express-fileupload';
import { BadRequestError } from '../../common/error/bad.request.error';
import BaseError from '../../common/error/base.error';

class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: config.get<string>('cloudinary.cloudname'),
      api_key: config.get<string>('cloudinary.apikey'),
      api_secret: config.get<string>('cloudinary.apisecret'),
    });
  }

  public async uploadImage(file: UploadedFile, folder: 'Users' | 'Products') {
    try {
      if (process.env.NODE_ENV === 'test') {
        return { secure_url: 'secure url', public_id: 'public id' };
      }

      const filetypes = /jpeg|jpg|png|webp/;
      const mimetype = filetypes.test(file?.mimetype);
      if (!mimetype) {
        throw new BadRequestError(
          'The image extension must be: .jpg, .jpeg, .png or webp',
          'uploadImage'
        );
      }
      if (file?.size > 1024 * 1024) {
        throw new BadRequestError(
          'The image exceeds the allowed size, it must be less than 1mb',
          'uploadImage'
        );
      }
      const { tempFilePath } = file;
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        tempFilePath,
        { folder }
      );

      return { secure_url, public_id };
    } catch (err) {
      if (err instanceof BaseError) throw err;
      throw new BaseError('Failed to upload image', err, 'uploadImage');
    }
  }

  public async deleteImage(publicId: string) {
    if (process.env.NODE_ENV === 'test') return;

    if (typeof publicId !== 'string')
      throw new BadRequestError(
        'ImageId must be of type string',
        'deleteImage'
      );

    await cloudinary.uploader.destroy(publicId);
  }
}

export default new CloudinaryService();
