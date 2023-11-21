import { Schema, model } from 'mongoose';
import { IForm, IFormField, IFormFieldOption } from '../interfaces/form.interfaces';
import formatDocument from '../lib/plugins/format-document';

const formFieldOptionSchema = new Schema<IFormFieldOption>({
  name: {
    type: String,
    required: false
  },
  order: {
    type: Number,
    required: false
  }
})

const formFieldSchema = new Schema<IFormField>({
  fieldTitle: {
    type: String,
    required: false
  },
  options: {
    type: [formFieldOptionSchema],
    required: false
  },
  order: {
    type: Number,
    required: false
  },
  type: {
    type: String,
    required: false
  }
})

const formSchema = new Schema<IForm>({
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  pin: {
    type: Number,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  fields: {
    type: [formFieldSchema],
    required: false
  }
}, {
  timestamps: true,
});
// add plugin that converts mongoose to json
formSchema.plugin(formatDocument);

const formModel = model<IForm>('Form', formSchema);

export default formModel;