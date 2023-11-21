import React, { useState } from "react"
import { Keyboard, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native"
import styled from "styled-components/native"
import ImageAnswer from "../components/Answers/ImageAnswer"
import MultipleAnswer from "../components/Answers/MultipleAnswer"
import TextAnswer from "../components/Answers/TextAnswer"
import Navigation from "../components/Navigation"
import BackButton from "../components/elements/BackButton"

interface IAnswers {
    navigation?: any
    surveyTitle: string
}

const AnswersScreen = (props: IAnswers) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <SModalOverlay modalActive={showModal} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SScroll bounces={false}>
                    <SHeader>
                        <SAnswersHeader>
                            <BackButton color="white" title={props.surveyTitle || "Untitled"} icon="chevron-left" onPress={() => props.navigation.navigate("DashboardScreen")} />
                            <SReplies>
                                <SRepliesNumber>51</SRepliesNumber>
                                <SRepliesText>Replies</SRepliesText>
                            </SReplies>
                        </SAnswersHeader>
                    </SHeader>
                    <SContainer>
                        <SContent>
                            <TextAnswer fieldName="Write your animal" />
                            <MultipleAnswer fieldName="Choose your favorite animal and leave" />
                            <ImageAnswer fieldName="Upload your favorite animal" />
                        </SContent>
                    </SContainer>
                </SScroll>
            </TouchableWithoutFeedback>
            <Navigation navigation={props.navigation} profileActive={false} dashboardActive={false} share />
        </>
    )
}

export default AnswersScreen

const SModalOverlay = styled(View)<{ modalActive: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ${props =>
        props.modalActive &&
        `
        background-color: rgba(0,0,0,0.5);
        z-index: 999;
    `}
`

const SContainer = styled(View)`
    padding: 0 16px 160px 16px;
    height: 100%;
    background-color: ${props => props.theme["WHITE"]};
    justify-content: space-between;
`

const SHeader = styled(View)`
    background-color: ${props => props.theme["WHITE"]};
    padding-bottom: 15%;
`

const SAnswersHeader = styled(View)`
    position: relative;
    width: 100%;
    height: 200px;
    background-color: ${props => props.theme["PRIMARY_COLOR"]};
    align-items: center;
    justify-content: flex-start;
    border-bottom-left-radius: 65px;
    border-bottom-right-radius: 65px;
    padding: 70px 16px 16px 16px;
`

const SContent = styled(View)`
    flex: 1;
    justify-content: flex-start;
    margin-top: 32px;
    height: 100%;
    gap: 16px;
`

const SScroll = styled(ScrollView)`
    width: 100%;
    text-align: center;
    height: 100%;
`

const SReplies = styled(View)`
    position: absolute;
    bottom: -50px;
    align-items: center;
    background-color: ${props => props.theme["PRIMARY_COLOR_DARK"]};
    border-radius: 26px;
    padding: 16px 22px;
`

const SRepliesNumber = styled(Text)`
    font-size: 38px;
    color: ${props => props.theme["WHITE"]};
    font-family: "Nunito_700Bold";
`

const SRepliesText = styled(Text)`
    font-family: "Nunito_600SemiBold";
    font-size: 20px;
    color: ${props => props.theme["WHITE"]};
`
