import React from "react"
import { Text, View } from "react-native"
import styled from "styled-components/native"
import Pattern from "../assets/Pattern"

interface ISurveyCard {
    title: string
    replies?: number
}

const SurveyCard = (props: ISurveyCard) => {
    return (
        <SSurveyCard>
            <STitle>{props.title}</STitle>
            <SReplies>{props.replies} Replies</SReplies>
            <SPattern color="#274CEE" PatternWidth={240} PatternHeight={290} />
        </SSurveyCard>
    )
}

export default SurveyCard

const SSurveyCard = styled(View)`
    background-color: ${(props) => props.theme["PRIMARY_COLOR_LIGHT"]};
    width: 100%;
    border-radius: 26px;
    position: relative;
    padding: 30px 20px;
    overflow: hidden;
`

const STitle = styled(Text)`
    font-size: 24px;
    font-family: "Nunito_800ExtraBold";
`

const SReplies = styled(Text)`
    font-size: 16px;
    font-family: "Nunito_700Bold";
    color: ${(props) => props.theme["PRIMARY_COLOR_DARK"]};
    opacity: 0.7;
`

const SPattern = styled(Pattern)`
    position: absolute;
    top: -50%;
    right: -50%;
    transform-origin: center center;
    z-index: -1;
    transform: scale(1);
    opacity: 0.3;
`
