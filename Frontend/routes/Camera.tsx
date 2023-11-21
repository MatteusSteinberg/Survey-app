import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner"
import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"

// Components
import styled from "styled-components/native"
import BackButton from "../components/elements/BackButton"

export default function CameraScreen({ navigation }: any) {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null)
    const [scanned, setScanned] = useState(false)

    useEffect(() => {
        ;(async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === "granted")
        })()
    }, [])

    const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {
        setScanned(true)
        alert(`Bar code with type ${type} and data ${data} has been scanned!`)
        navigation.navigate("DashboardScreen") // Navigate back to Home or any other screen
    }

    if (hasPermission === null) {
        return <Text>Requesting camera permission</Text>
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }

    return (
        <SContainer>
            <SScannerHeader>
                <BackButton color="white" title="Go back" icon="chevron-left" onPress={() => navigation.navigate("PinScreen")} />
            </SScannerHeader>
            <SScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} />
        </SContainer>
    )
}

const SContainer = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 100%;
`

const SScanner = styled(BarCodeScanner)`
    height: 100%;
    width: 100%;
`

const SButtonWrapper = styled(View)`
    position: absolute;
    bottom: 50px;
    padding: 0px 16px;
    width: 100%;
`

const SScannerHeader = styled(View)`
    width: 100%;
    flex: 1;
    left: 16px;
    position: absolute;
    top: 80px;
    z-index: 1000;
`
