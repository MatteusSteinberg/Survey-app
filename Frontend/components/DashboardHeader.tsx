import { Calendar } from "@nandorojo/heroicons/24/outline";
import { format } from 'date-fns';
import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

interface IDashboardHeader { }

const DashboardHeader = (props: IDashboardHeader) => {
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
    </SContainer>
  )
}

export default DashboardHeader

const SContainer = styled(View)`
    position: relative;
    width: 100%;
    height: 270px;
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
  gap: 5px;
`

const SDateText = styled(Text)`
  color: white;
  opacity: 0.6;
`

const SDateIcon = styled(View)`
  
`

const SCalendar = styled(Calendar)`
  height: 24px;
  width: 24px;
  color: white;
  opacity: 0.5;
`