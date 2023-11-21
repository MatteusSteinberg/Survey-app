import { Octicons } from "@expo/vector-icons"
import React from "react"
import { Pressable, Text, View } from "react-native"
import styled from "styled-components/native"

interface IBackButton {
    onPress: () => void
    title: string
    icon: "x" | "chevron-left" | "chevron-right"
    color: "white" | "text"
}

const BackButton = (props: IBackButton) => {
    return (
        <SContainer>
            <SButton onPress={props.onPress}>
                <SButtonIcon color={props.color}>
                    <Octicons name={props.icon} color={props.color} size={24} />
                </SButtonIcon>
                <SButtonText color={props.color}>{props.title}</SButtonText>
            </SButton>
        </SContainer>
    )
}

export default BackButton

const SContainer = styled(View)`
    align-items: flex-start;
    width: 100%;
`

const SButton = styled(Pressable)`
    flex-direction: row;
    align-items: center;
`

const SButtonText = styled(Text)<{ color: string }>`
    font-size: 20px;
    font-weight: 500;
    color: ${props => props.theme["TEXT"]};
    margin-left: 8px;
    font-family: "Nunito_700Bold";

    ${props => props.color === "white" && `color: ${props.theme["WHITE"]}`}
    ${props => props.color === "text" && `color: ${props.theme["TEXT"]}`}
`

const SButtonIcon = styled(View)<{ color: string }>`
    border: 1px solid transparent;
    border-radius: 16px;
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    ${props => props.color === "white" && `border-color: ${props.theme["WHITE"]}`}
    ${props => props.color === "text" && `border-color: ${props.theme["TEXT"]}`}
`
