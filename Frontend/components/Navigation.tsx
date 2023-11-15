import { Octicons } from "@expo/vector-icons"
import React from "react"
import { Pressable, View } from "react-native"
import DropShadow from "react-native-drop-shadow"
import styled from "styled-components/native"

interface INavigation {
    navigation?: any
}

const Navigation = (props: INavigation) => {
    return (
        <SContainer>
            <DropShadow
                style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 0,
                    },
                    shadowOpacity: 0.08,
                    shadowRadius: 5,
                }}>
                <SContent>
                    <SMenuItem active={true}>
                        <Octicons name="home" size={24} color="black" />
                    </SMenuItem>
                    <SMenuItemAdd>
                        <Octicons name="plus" size={24} color="white" />
                    </SMenuItemAdd>
                    <SMenuItem active={false} onPress={() => props.navigation.navigate("ProfileScreen")}>
                        <Octicons name="person" size={24} color="black" />
                    </SMenuItem>
                </SContent>
            </DropShadow>
        </SContainer>
    )
}

export default Navigation

const SContainer = styled(View)`
    height: 90px;
    position: absolute;
    bottom: 45px;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`

const SContent = styled(View)`
    justify-content: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: fit-content;
    background-color: ${(props) => props.theme["WHITE"]};
    border-radius: 26px;
    padding: 12px;
    gap: 8px;
`

const SMenuItem = styled(Pressable)<{ active: boolean }>`
    justify-content: center;
    align-items: center;
    height: 100%;
    height: 75px;
    width: 75px;

    border-radius: 21px;

    ${(props) =>
        props.active &&
        `
        background-color: ${props.theme["PRIMARY_COLOR_LIGHT"]};
    `}
`

const SMenuItemAdd = styled(Pressable)`
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: ${(props) => props.theme["PRIMARY_COLOR"]};
    height: 75px;
    width: 75px;
    border-radius: 21px;
`
