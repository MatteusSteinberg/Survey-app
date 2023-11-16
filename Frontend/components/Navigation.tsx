import { Octicons } from "@expo/vector-icons"
import React, { useState } from "react"
import { Modal, Pressable, Text, View } from "react-native"
import DropShadow from "react-native-drop-shadow"
import QRCode from "react-native-qrcode-svg"
import styled from "styled-components/native"
import BackButton from "./elements/BackButton"

interface INavigation {
    navigation?: any
    dashboardActive: boolean
    profileActive: boolean
    share?: boolean
}

const Navigation = (props: INavigation) => {
    const [isModalActive, setIsModalActive] = useState(false)
    const [pinCode, setPincode] = useState("")

    const generateRandomCode = () => {
        let code = ""
        for (let i = 0; i < 6; i++) {
            const digit = Math.floor(Math.random() * 10)
            code += digit.toString()
        }
        setPincode(code)
    }

    const handleShare = () => {
        setIsModalActive(true)
        generateRandomCode()
    }

    return (
        <>
            <SModalOverlay modalActive={isModalActive} />
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
                    }}
                >
                    <SContent>
                        <SMenuItem onPress={() => props.navigation.navigate("DashboardScreen")} active={props.dashboardActive}>
                            <Octicons name="home" size={24} color="black" />
                        </SMenuItem>
                        {props.share ? (
                            <SMenuItemAdd onPress={handleShare}>
                                <Octicons name="paper-airplane" size={24} color="white" />
                            </SMenuItemAdd>
                        ) : (
                            <SMenuItemAdd onPress={() => props.navigation.navigate("CreateScreen")}>
                                <Octicons name="plus" size={24} color="white" />
                            </SMenuItemAdd>
                        )}
                        <SMenuItem onPress={() => props.navigation.navigate("ProfileScreen")} active={props.profileActive}>
                            <Octicons name="person" size={24} color="black" />
                        </SMenuItem>
                    </SContent>
                </DropShadow>
            </SContainer>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalActive}
                onRequestClose={() => {
                    setIsModalActive(false)
                }}
            >
                <SModalInner>
                    <SModalContent>
                        <BackButton color="text" onPress={() => setIsModalActive(false)} title="Share survey" icon="x" />
                        <SModalWrapper>
                            {pinCode !== "" && (
                                <SModalQR>
                                    <SQRCode value={pinCode} size={320} />
                                </SModalQR>
                            )}
                            <SModalDivider />
                            <SModalPinCodeWrapper>
                                <SModalPincode>{pinCode}</SModalPincode>
                            </SModalPinCodeWrapper>
                        </SModalWrapper>
                    </SModalContent>
                </SModalInner>
            </Modal>
        </>
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
    background-color: ${props => props.theme["WHITE"]};
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

    ${props =>
        props.active &&
        `
        background-color: ${props.theme["PRIMARY_COLOR_LIGHT"]};
    `}
`

const SMenuItemAdd = styled(Pressable)`
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: ${props => props.theme["PRIMARY_COLOR"]};
    height: 75px;
    width: 75px;
    border-radius: 21px;
`

const SModalInner = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const SModalContent = styled(View)`
    background-color: white;
    border-radius: 26px;
    padding: 20px;
    margin: 0 5px;
    width: 92%;
`

const SModalOverlay = styled(View)<{ modalActive: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    ${props =>
        props.modalActive &&
        `
        background-color: rgba(0,0,0,0.5);
        z-index: 999;
    `}
`

const SModalWrapper = styled(View)`
    margin-top: 24px;
`

const SModalTitle = styled(Text)`
    font-size: 16px;
    font-family: "Nunito_700Bold";
    margin-bottom: 8px;
`

const SModalPinCodeWrapper = styled(View)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme["PRIMARY_COLOR_LIGHT"]};
    border-radius: 12px;
`

const SModalPincode = styled(Text)`
    font-size: 38px;
    font-family: "Nunito_700Bold";
    color: ${props => props.theme["TEXT"]};
`

const SModalDivider = styled(View)`
    margin-top: 24px;
    margin-bottom: 24px;
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.theme["TEXT"]};
    opacity: 0.1;
    width: 100%;
`

const SQRCode = styled(QRCode)`
    border-radius: 26px;
`

const SModalQR = styled(View)`
    display: flex;
    align-items: center;
    justify-content: center;
`
