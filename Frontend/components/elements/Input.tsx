import { Octicons } from "@expo/vector-icons"
import React from "react"
import { TextInput, View } from "react-native"
import styled, { css } from "styled-components/native"

interface IInput {
    variant: "primary" | "dark"
    placeholder: string
    value?: string
    icon?: string
    textContentType?: any
    onChangeText?: (v: string) => void
    secureTextEntry?: boolean
}

const Input = (props: IInput) => {
    return (
        <SWrapper {...props}>
            <SIcon name={props.icon as any} color="#232323" size={20} />
            <SInput secureTextEntry={props.secureTextEntry} textContentType={props.textContentType} onChangeText={props.onChangeText} placeholderTextColor="#232323" placeholder={props.placeholder} value={props.value} />
        </SWrapper>
    )
}

export default Input

const SWrapper = styled(View)<IInput>`
    width: 100%;

    border: 1px solid transparent;
    border-radius: 21px;
    padding: 18px 8px;
    flex-direction: row;
    gap: 12px;

    ${props =>
        props.variant === "primary" &&
        css`
            border-color: ${props.theme["PRIMARY_COLOR"]};
        `}

    ${props =>
        props.variant === "dark" &&
        css`
            border-color: ${props.theme["TEXT"]};
        `}
`

const SIcon = styled(Octicons)`
    padding-top: 2px;
`

const SInput = styled(TextInput)`
    width: 100%;
    font-size: 18px;
    font-family: "Nunito_600SemiBold";
    color: ${props => props.theme["TEXT"]};

    &::placeholder {
        font-size: 18px;
        font-family: "Nunito_600SemiBold";
        color: ${props => props.theme["TEXT"]} !important;
    }
`
