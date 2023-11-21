import { IFormField, IFormFieldOption } from "../../../api/interfaces/form.interfaces"
import FormImage from "./FormImage"
import FormMultiple from "./FormMulitple"
import FormText from "./FormText"

interface IFormController {
  isEditing?: boolean,
  formField: IFormField,
  onChange: (path: string, value: any) => void,
  onOptionChange: (path: string, value: any, optionOrder: number) => void,
}

const FormController = ({ formField, isEditing, onChange, onOptionChange }: IFormController) => {

  const handleTitleChange = (title: string) => {
    onChange('fieldTitle', title)
  }

  const handleTextChange = (text: string) => {
    onChange('answer.text', text)
  }

  const handleAddOption = () => {
    const nextOrder = (formField.options || []).length + 1
    onChange('options', [...(formField.options || []), { order: nextOrder }] as IFormFieldOption[])
  }

  const handleOptionEdit = (path: string, value: any, order: number) => {
    onOptionChange(path, value, order)
  }

  const isAnswering = !isEditing

  return <>
    {formField.type === "text" && <FormText {...formField}
      isAnswering={isAnswering}
      onTitleChange={handleTitleChange}
      onTextAnswerChange={handleTextChange}
    />}
    {formField.type === "multiple" && <FormMultiple {...formField}
      isAnswering={isAnswering}
      onAddOption={handleAddOption}
      onOptionChange={handleOptionEdit}
      onTitleChange={handleTitleChange}
    />}
    {formField.type === "image" && <FormImage {...formField}
      isAnswering={isAnswering}
      onTitleChange={handleTitleChange}

    />}
  </>
}

export default FormController