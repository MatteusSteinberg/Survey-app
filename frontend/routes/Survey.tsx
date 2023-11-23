import { ParamListBase, RouteProp } from "@react-navigation/native"
import { produce } from "immer"
import React, { useState } from "react"
import { Keyboard, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native"
import { getUniqueId } from "react-native-device-info"
import styled from "styled-components/native"
import { IForm } from "../../api/interfaces/form.interfaces"
import { ISubmission } from "../../api/interfaces/submission.interfaces"
import { Button } from "../components/elements"
import FormController from "../components/fields/FormController"
import useAPI from "../hooks/use-api"

interface IProfileScreen {
  navigation?: any,
  route?: RouteProp<ParamListBase>
}

const SurveyScreen = ({ navigation, route }: IProfileScreen) => {
  const [submission, setSubmission] = useState<ISubmission>({})


  const { id }: { id: string } = route?.params as any

  const { data } = useAPI<IForm>({ url: '/form', id }, { autoGet: !!id })

  const handleAnswer = (id: string, answer: any) => {
    setSubmission(produce(submissionDraft => {
      if (!submissionDraft.answers) submissionDraft.answers = {}

      submissionDraft.answers[id] = answer
    }))
  }

  const { create } = useAPI({ url: "/submission" })

  const handleSubmit = async () => {

    const userSubmission = {
      ...submission,
      form: data?.id,
      deviceId: await getUniqueId(),
    } as ISubmission

    const result = await create({ body: userSubmission })

    if (!result.error) {
      navigation.navigate("PinScreen")
    }
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SScroll bounces={false}>
          <SHeader>
            <SSurveyHeader>
              <SSurveyTitle>{data?.name}</SSurveyTitle>
            </SSurveyHeader>
          </SHeader>
          <SContainer>
            <SContent>
              {(data?.fields || []).map((formField, index) => {

                return (
                  <SField>
                    <FormController
                      key={formField.order}
                      onAnswer={(answer) => handleAnswer(formField._id, answer)}
                      isEditing={false}
                      formField={formField}
                    />
                  </SField>
                )
              })}
            </SContent>
          </SContainer>
        </SScroll>
      </TouchableWithoutFeedback>
      <SButton>
        <Button variant="primary" title="Submit survey" onPress={handleSubmit} />
      </SButton>
    </>
  )
}

export default SurveyScreen

const SContainer = styled(View)`
    padding: 0 16px 120px 16px;
    height: 100%;
    background-color: ${props => props.theme["WHITE"]};
    justify-content: space-between;
`

const SHeader = styled(View)`
    background-color: ${props => props.theme["WHITE"]};
`

const SSurveyHeader = styled(View)`
    position: relative;
    width: 100%;
    height: 160px;
    background-color: ${props => props.theme["PRIMARY_COLOR"]};
    align-items: center;
    justify-content: flex-end;
    border-bottom-left-radius: 65px;
    border-bottom-right-radius: 65px;
    padding: 42px 16px;
`

const SSurveyTitle = styled(Text)`
    font-size: 28px;
    font-weight: bold;
    color: ${props => props.theme["WHITE"]};
    font-family: "Nunito_700Bold";
`

const SContent = styled(View)`
    flex: 1;
    justify-content: flex-start;
    margin-top: 32px;
    height: 100%;
`

const SField = styled(View)`
    width: 100%;
    position: relative;
`

const SScroll = styled(ScrollView)`
    width: 100%;
    text-align: center;
    height: 100%;
`

const SButton = styled(View)`
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 16px 20px 16px;
    background-color: ${props => props.theme["WHITE"]};
`
