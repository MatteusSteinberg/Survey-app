import React from "react"
import { Image, Text, View } from "react-native"
import styled from "styled-components/native"
import SurveyCard from "./SurveyCard"

interface ISurveyList {
    setScrollEnabled: React.Dispatch<React.SetStateAction<boolean>>
    isDragging: React.MutableRefObject<boolean>
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>
    modalActive: boolean
}

const SurveyArr = [
    {
        title: "What OS do you pefer?",
        replies: 47,
    },
    {
        title: "What animal do you prefer?",
        replies: 47,
    },
    {
        title: "Favorite Language?",
        replies: 47,
    },
    {
        title: "Are you an idiot?",
        replies: 47,
    },
    {
        title: "Your spirit animal?",
        replies: 47,
    },
    {
        title: "What starsign are you?",
        replies: 47,
    },
    {
        title: "What OS do you pefer?",
        replies: 47,
    },
]

const SurveyList = (props: ISurveyList) => {
    return (
        <SContainer>
            <SHeader>
                <STitle>Your forms</STitle>
                <SCreate>Create Survey</SCreate>
            </SHeader>
            <SSurveys>
                {SurveyArr.length < 0 ? (
                    <SSurveyView>
                        <SImage source={require("../assets/noSurveys.jpg")} />
                        <SImageText>No surveys to be found...</SImageText>
                    </SSurveyView>
                ) : (
                    SurveyArr.map((survey, index) => <SurveyCard modalActive={props.modalActive} setModalActive={props.setModalActive} isDragging={props.isDragging} setScrollEnabled={props.setScrollEnabled} key={index} title={survey.title} replies={survey.replies} />)
                )}
            </SSurveys>
        </SContainer>
    )
}

export default SurveyList

const SContainer = styled(View)`
    padding: 0 0px 120px 0px;
    height: 100%;
`

const SHeader = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const STitle = styled(Text)`
    font-size: 24px;
    font-weight: 600;
    font-family: "Nunito_700Bold";
    color: ${(props) => props.theme["TEXT"]};
`

const SCreate = styled(Text)`
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => props.theme["PRIMARY_COLOR_DARK"]};
    opacity: 0.5;
    font-family: "Nunito_600SemiBold";
`

const SSurveys = styled(View)`
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
`

const SSurveyView = styled(View)`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 32px;
`

const SImage = styled(Image)`
    width: 100%;
    height: 100%;
    max-width: 250px;
    max-height: 250px;
    margin: 0 auto;
`

const SImageText = styled(Text)`
    font-size: 22px;
    font-weight: 600;
    color: ${(props) => props.theme["TEXT"]};
    font-family: "Nunito_600SemiBold";
    text-align: center;
    justify-content: flex-start;
    display: flex;
    margin-top: 16px;
`
