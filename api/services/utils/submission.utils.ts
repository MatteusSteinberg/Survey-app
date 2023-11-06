import formModel from "models/form.model"
import { FilterQuery, HydratedDocument } from "mongoose"
import { ISubmission, ISubmissionFilter } from "../../interfaces/submission.interfaces"
import { IUser } from "../../interfaces/user.interfaces"
import submissionModel from "../../models/submission.model"


namespace Submission {
  export const submit = async (submission: ISubmission, user?: IUser) => {

  }

  const query = async (filter: ISubmissionFilter) => {
    const q: FilterQuery<HydratedDocument<ISubmission>> = {}

    if (filter.formCreatedBy) {
      const forms = await formModel.find({ createdBy: filter.formCreatedBy }).select('_id')
      q._id = { $in: forms.map(v => v._id) }
    }

    return q
  }

  export const index = async (filter: ISubmissionFilter) => {
    const q = query(filter)

    return await submissionModel.find(q)
  }
}

export default Submission