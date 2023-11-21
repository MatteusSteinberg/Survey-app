import React from "react"
import { Image, Text, View } from "react-native"
import styled from "styled-components/native"
import { IForm } from "../../api/interfaces/form.interfaces"
import SurveyCard from "./SurveyCard"

interface ISurveyList {
  setScrollEnabled: React.Dispatch<React.SetStateAction<boolean>>
  isDragging: React.MutableRefObject<boolean>
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>
  modalActive: boolean
  navigation?: any,
  forms?: IForm[]
}

const SurveyList = ({ isDragging, modalActive, setModalActive, setScrollEnabled, forms, navigation }: ISurveyList) => {
  return (
    <SContainer>
      <SHeader>
        <STitle>Your forms</STitle>
        <SCreate onPress={() => navigation.navigate("CreateScreen")}>Create Survey</SCreate>
      </SHeader>
      <SSurveys>
        {forms?.length === 0 && <>
          <SSurveyView>
            <SImage source={require("../assets/noSurveys.jpg")} />
            <SImageText>No surveys to be found...</SImageText>
          </SSurveyView>
        </>}

        {forms?.map((form, index) => <SurveyCard
          modalActive={modalActive}
          setModalActive={setModalActive}
          isDragging={isDragging}
          navigation={navigation}
          setScrollEnabled={setScrollEnabled}
          key={index}
          form={form}
        />)}
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
    color: ${props => props.theme["TEXT"]};
`

const SCreate = styled(Text)`
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.theme["PRIMARY_COLOR_DARK"]};
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
    color: ${props => props.theme["TEXT"]};
    font-family: "Nunito_600SemiBold";
    text-align: center;
    justify-content: flex-start;
    display: flex;
    margin-top: 16px;
`
