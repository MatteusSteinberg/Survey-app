import React from "react"
import { View } from "react-native"
import styled from "styled-components/native"
import LogoSmall from "../assets/LogoSmall"

interface IAuthHeader {}

const AuthHeader = (props: IAuthHeader) => {
    return (
        <SContainer>
            <SLogo>
                <LogoSmall LogoHeight={44} LogoWidth={39} />
            </SLogo>
        </SContainer>
    )
}

export default AuthHeader

const SContainer = styled(View)`
    position: relative;
    width: 100%;
    height: 170px;
    background-color: ${props => props.theme["PRIMARY_COLOR"]};
    align-items: center;
    justify-content: center;
    border-bottom-left-radius: 65px;
    border-bottom-right-radius: 65px;
`

const SLogo = styled(View)`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 10;
    margin-bottom: 80px;
    height: 100%;
`
