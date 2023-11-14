import React from "react"
import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native"
import { styled } from "styled-components/native"
import DashboardHeader from "../components/DashboardHeader"
import { Button } from "../components/elements"
import { useAuth } from "../hooks/use-auth"

interface IDashboard { }

const DashboardScreen = (props: IDashboard) => {
  const { unauthenticate } = useAuth()

  return <>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <SHeader>
          <DashboardHeader />
        </SHeader>
        <SContainer>
          <SContent>
            <Button title="Log out" variant="primary-outline" onPress={unauthenticate} />
          </SContent>
        </SContainer>
      </ScrollView>
    </TouchableWithoutFeedback>
  </>
}

const SContainer = styled(View)`
    padding: 0 16px 20px 16px;
    height: 100%;
    background-color: ${props => props.theme["WHITE"]};
    justify-content: space-between;
`

const SHeader = styled(View)`
    background-color: ${props => props.theme["WHITE"]};
`

const SContent = styled(View)`
    flex: 1;
    justify-content: flex-start;
    margin-top: 32px;
    height: 100%;
    align-items: center;
`

export default DashboardScreen
