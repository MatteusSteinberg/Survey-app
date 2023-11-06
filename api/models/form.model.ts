import { Schema, model } from 'mongoose';
import { IForm } from '../interfaces/form.interfaces';
import formatDocument from '../lib/plugins/format-document';

const formSchema = new Schema<IForm>({
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  pin: {
    type: Number,
    required: false
  }
}, {
  timestamps: true,
});
// add plugin that converts mongoose to json
formSchema.plugin(formatDocument);

const formModel = model<IForm>('Form', formSchema);

export default formModel;