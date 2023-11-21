import React from "react"
import { ScrollView, Text, View } from "react-native"
import styled from "styled-components/native"

interface ITextAnswer {
    fieldName: string
}

const MultipleAnswer = (props: ITextAnswer) => {
    return (
        <>
            <SField>
                <SFieldName>{props.fieldName}</SFieldName>
                <SFieldAnswers horizontal>
                    <SFieldAnswer>
                        <SFieldAnswerText>21</SFieldAnswerText>
                        <SFieldAnswerTitle>Yes</SFieldAnswerTitle>
                    </SFieldAnswer>
                    <SFieldAnswer>
                        <SFieldAnswerText>30</SFieldAnswerText>
                        <SFieldAnswerTitle>No</SFieldAnswerTitle>
                    </SFieldAnswer>
                </SFieldAnswers>
            </SField>
        </>
    )
}

export default MultipleAnswer

const SField = styled(View)`
    background-color: ${props => props.theme["PRIMARY_COLOR_LIGHT"]};
    border-radius: 26px;
    padding: 16px;
    margin-bottom: 8px;
`

const SFieldName = styled(Text)`
    border-radius: 8px;
    font-size: 24px;
    width: 100%;
    color: ${props => props.theme["TEXT"]};
    font-family: "Nunito_700Bold";
    margin-bottom: 2px;
`

const SFieldAnswers = styled(ScrollView)`
    flex-direction: row;
    margin-top: 16px;
`

const SFieldAnswer = styled(View)`
    text-align: center;
    margin-right: 22px;

    &:last-child {
        margin-right: 0;
    }
`

const SFieldAnswerText = styled(Text)`
    font-size: 22px;
    text-align: center;
    color: ${props => props.theme["TEXT"]};
    font-family: "Nunito_500Medium";
`

const SFieldAnswerTitle = styled(Text)`
    font-size: 22px;
    color: ${props => props.theme["TEXT"]};
    font-family: "Nunito_700Bold";
`
