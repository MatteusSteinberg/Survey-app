import React, { ReactNode } from "react"
import { TextInput, View } from "react-native";
import styled, { css } from "styled-components/native"


interface IInput {
    variant: "primary" | "dark"
    placeholder: string;
    value?: string;
    icon?: React.ReactNode;
}

const Input = (props: IInput) => {
    return (
        <SWrapper {...props}> 
            {props.icon}
            <SInput placeholder={props.placeholder} value={props.value}/>
        </SWrapper>
    )
}

export default Input

const SWrapper = styled(View)<IInput>`
width: 100%;

border: 1px solid transparent;
border-radius: 21px;
padding: 16px;
flex-direction: row;
gap: 8px;

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

const SInput = styled(TextInput)`
width: 100%;
font-size: 20px;
font-family: 'Nunito_600SemiBold';
color: ${props => props.theme["TEXT"]};


&:placeholder{
    font-size: 20px;
    font-family: 'Nunito_600SemiBold';
    color: ${props => props.theme["TEXT"]};
    opacity: 1;
}

`
