import Checkbox from "expo-checkbox"
import React, { useState } from "react"
import { Pressable, Text, TextInput, View } from "react-native"
import styled from "styled-components/native"

interface IFormFields {}

interface IFormMulitple {
    readonly: boolean
    fieldTitle?: string
}

const FormMulitple = (props: IFormMulitple) => {
    const [formFields, setFormFields] = useState<IFormFields[]>([])
    const [isChecked, setChecked] = useState(false)

    const addFormField = (fieldComponent: IFormFields) => {
        setFormFields([...formFields, fieldComponent])
    }

    return props.readonly ? (
        <SField>
            <SInput editable={false} placeholderTextColor="#232323" placeholder={props.fieldTitle || "Field name"} />
            <SInputHelp>Select 1 or more choices below</SInputHelp>
            <SChoices>
                <SChoice>
                    <Checkbox value={isChecked} onValueChange={setChecked} />
                    <SInputChoice placeholder="Name your choice..." placeholderTextColor="#232323" />
                </SChoice>
            </SChoices>
        </SField>
    ) : (
        <SField>
            <SInput placeholderTextColor="#232323" placeholder="New field..." />
            <SInputHelp>Select 1 or more choices below</SInputHelp>
            <SChoices>
                <SChoice>
                    <Checkbox value={isChecked} onValueChange={setChecked} />
                    <SInputChoice placeholder="Name your choice..." placeholderTextColor="#232323" />
                </SChoice>
                {formFields.map((item, index) => {
                    return (
                        <SChoice>
                            <Checkbox value={isChecked} onValueChange={setChecked} />
                            <SInputChoice placeholder="Name your choice..." placeholderTextColor="#232323" />
                        </SChoice>
                    )
                })}
                <Pressable onPress={() => addFormField(+1)}>
                    <SChoiceAdd>Add new choice</SChoiceAdd>
                </Pressable>
            </SChoices>
        </SField>
    )
}

export default FormMulitple

const SField = styled(View)`
    border: 1px solid rgba(35, 35, 35, 0.2);
    border-radius: 26px;
    padding: 16px;
    margin-bottom: 8px;
`

const SInput = styled(TextInput)`
    border-radius: 8px;
    font-size: 24px;
    width: 100%;
    color: ${props => props.theme["TEXT"]};
    font-family: "Nunito_600SemiBold";
    margin-bottom: 16px;
`

const SInputHelp = styled(Text)`
    margin-bottom: 4px;
    font-size: 14px;
    color: ${props => props.theme["TEXT"]};
    font-family: "Nunito_600SemiBold";
`

const SChoices = styled(View)`
    margin-top: 0px;
`

const SChoice = styled(View)`
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;
`

const SInputChoice = styled(TextInput)`
    border-radius: 8px;
    font-size: 16px;
    width: 100%;
    color: ${props => props.theme["TEXT"]};
    font-family: "Nunito_600SemiBold";
    margin-left: 8px;
`

const SChoiceAdd = styled(Text)`
    margin-top: 4px;
    font-size: 18px;
    color: ${props => props.theme["TEXT"]};
    font-family: "Nunito_600SemiBold";
`
