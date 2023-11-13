import { Schema, model } from 'mongoose';
import { IFile } from '../interfaces/file.interfaces';
import formatDocument from '../lib/plugins/format-document';

const fileSchema = new Schema<IFile>({
  type: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true
  },
  contentType: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

// add plugin that converts mongoose to json
fileSchema.plugin(formatDocument);

const fileModel = model<IFile>('File', fileSchema);

export default fileModel;