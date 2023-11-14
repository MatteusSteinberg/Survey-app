import { Calendar } from "@nandorojo/heroicons/24/outline";
import { format } from 'date-fns';
import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { useAuth } from "../hooks/use-auth";
import Input from "./elements/Input";

interface IDashboardHeader { }

const DashboardHeader = (props: IDashboardHeader) => {

  const { user } = useAuth()

  const date = new Date()
  const formattedDate = format(date, 'EEE, dd MMM yyyy')

  return (
    <SContainer>
      <SDateContainer>
        <SDateIcon >
          <SCalendar />
        </SDateIcon>
        <SDateText>{formattedDate.toUpperCase()}</SDateText>
      </SDateContainer>

      <SWelcomeContainer>
        <SWelcome>Welcome back</SWelcome>
        <SWelcomeUsernameContainer>
          <SWelcomeUsername>{user?.username}! 👋</SWelcomeUsername>
        </SWelcomeUsernameContainer>
      </SWelcomeContainer>

      <SSearchFormContainer>
        <Input icon="magnifying-glass" variant="dark" placeholder="Search for a form..." />
      </SSearchFormContainer>
    </SContainer>
  )
}

export default DashboardHeader

const SContainer = styled(View)`
    position: relative;
    width: 100%;
    height: 281px;
    background-color: ${props => props.theme["PRIMARY_COLOR"]};
    align-items: start;
    padding-top: 60px;
    justify-content: start;
    border-bottom-left-radius: 65px;
    border-bottom-right-radius: 65px;
    display: flex;
    padding-left: 16px;
    padding-right: 16px;
`

const SDateContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

const SDateText = styled(Text)`
  color: white;
  opacity: 0.6;
  font-size: 12px;
`

const SDateIcon = styled(View)`
  
`

const SWelcomeContainer = styled(View)`
  margin-top: 25px;
`

const SWelcome = styled(Text)`
  color: white;
  opacity: 0.5;
`

const SWelcomeUsernameContainer = styled(View)`
  display: flex;
  flex-direction: row;
`

const SWelcomeUsername = styled(Text)`
  font-size: 32px;
  font-weight: 700;
  color: white;
`

const SCalendar = styled(Calendar)`
  height: 24px;
  width: 24px;
  color: white;
  opacity: 0.5;
`

const SSearchFormContainer = styled(View)`
  margin-top: 12px;
  width: 100%;
`