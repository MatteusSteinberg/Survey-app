import { Schema, model } from 'mongoose';
import { ISubmission } from '../interfaces/submission.interfaces';
import formatDocument from '../lib/plugins/format-document';

const submissionSchema = new Schema<ISubmission>({
  submittedBy: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'User'
  },
  form: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Form'
  },
  deviceId: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});
// add plugin that converts mongoose to json
submissionSchema.plugin(formatDocument);

const submissionModel = model<ISubmission>('Submission', submissionSchema);

export default submissionModel;