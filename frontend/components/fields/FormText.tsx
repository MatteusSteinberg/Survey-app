import React from "react"
import { Text, TextInput, View } from "react-native"
import styled from "styled-components/native"

interface IFormText {
    readonly: boolean
    fieldTitle?: string
}

const FormText = (props: IFormText) => {
    return props.readonly ? (
        <SField>
            <SInput editable={false} placeholderTextColor="#232323" placeholder={props.fieldTitle || "Field name"} />
            <SInputHelp>Write your answer in the field below</SInputHelp>
            <SAnswerField placeholder="Answer here..." placeholderTextColor="#232323" />
        </SField>
    ) : (
        <SField>
            <SInput placeholderTextColor="#232323" placeholder="New field..." />
            <SInputHelp>Write your answer in the field below</SInputHelp>
            <SAnswerField aria-disabled placeholder="Answer here..." placeholderTextColor="#232323" />
        </SField>
    )
}

export default FormText

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

const SAnswerField = styled(TextInput)`
    background-color: rgba(35, 35, 35, 0.05);
    width: 100%;
    font-size: 18px;
    font-family: "Nunito_600SemiBold";
    color: ${props => props.theme["TEXT"]};
    border-radius: 14px;
    padding: 12px 18px;
    &::placeholder {
        font-size: 18px;
        font-family: "Nunito_600SemiBold";
        color: ${props => props.theme["WHITE"]} !important;
    }
`
