import { Schema, model } from 'mongoose';
import { ISubmission } from '../interfaces/submission.interfaces';
import formatDocument from '../lib/plugins/format-document';

const submissionSchema = new Schema<ISubmission>({
  form: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Form'
  },
  deviceId: {
    type: String,
    required: true
  },
  answers: {
    type: Map,
    of: Schema.Types.Mixed
  }
}, {
  timestamps: true,
});
// add plugin that converts mongoose to json
submissionSchema.plugin(formatDocument);

const submissionModel = model<ISubmission>('Submission', submissionSchema);

export default submissionModel;