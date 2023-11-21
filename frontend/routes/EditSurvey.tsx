import { ParamListBase, RouteProp } from "@react-navigation/native"
import { IForm } from "../../api/interfaces/form.interfaces"
import useAPI from "../hooks/use-api"
import CreateSurvey from "./CreateSurvey"


interface IEditSurvey {
  navigation?: any,
  route?: RouteProp<ParamListBase>
}

const EditSurvey = ({ navigation, route }: IEditSurvey) => {

  const { id }: { id: string } = route?.params as any

  const { data } = useAPI<IForm>({ url: '/form', id }, { autoGet: !!id })

  return data && <CreateSurvey form={data} id={id} navigation={navigation} />
}

export default EditSurvey