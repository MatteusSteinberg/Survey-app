import React, { useState } from "react"
import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native"
import styled from "styled-components/native"
import BackButton from "../elements/BackButton"

interface ITextAnswer {
    fieldName: string
}

const ImageAnswer = (props: ITextAnswer) => {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <>
            <SField onPress={() => setModalVisible(true)}>
                <SFieldName>{props.fieldName}</SFieldName>
                <SFieldReplies>51 Images uploaded</SFieldReplies>
            </SField>
            <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <SModalHeader>
                    <BackButton color="text" title="Close modal" icon="x" onPress={() => setModalVisible(false)} />
                </SModalHeader>
                <SScroll bounces={false}>
                    <SModalAnswers>
                        <SModalAnswersText>Answers</SModalAnswersText>
                        <SModalAnswersItems>
                            <SModalAnswerImage source={require("../../assets/placeholder.jpg")} />
                            <SModalAnswerImage source={require("../../assets/placeholder.jpg")} />
                            <SModalAnswerImage source={require("../../assets/placeholder.jpg")} />
                        </SModalAnswersItems>
                    </SModalAnswers>
                </SScroll>
            </Modal>
        </>
    )
}

export default ImageAnswer

const SField = styled(Pressable)`
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

const SFieldReplies = styled(Text)`
    font-size: 20px;
    color: ${props => props.theme["TEXT"]};
    font-family: "Nunito_500Medium";
`

const SModalHeader = styled(View)`
    padding: 60px 0px 20px 16px;
    border-bottom: 1px solid rgba(35, 35, 35, 0.2);
`

const SScroll = styled(ScrollView)`
    width: 100%;
    height: 100%;
    position: relative;
`

const SModalAnswers = styled(View)`
    padding: 0px 16px;
`

const SModalAnswersText = styled(Text)`
    font-size: 24px;
    font-family: "Nunito_700Bold";
    color: ${props => props.theme["TEXT"]};
    margin-bottom: 16px;
`

const SModalAnswersItems = styled(View)`
    width: 100%;
    position: relative;
`

const SModalAnswerImage = styled(Image)`
    width: 100%;
    margin-bottom: 16px;
`
