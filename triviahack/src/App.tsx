import React from 'react';
import logo from './logo.svg';
import './App.css';
import Timer from "./Timer";
import AnswerChoice from "./AnswerChoice";
import QuestionDisplay from "./QuestionDisplay";
import {Grid2} from "@mui/material";

function App() {
  return (
    <>
        <Grid2 container spacing={2}>
            <Grid2 size={4}>
                <Timer />
            </Grid2>
            <Grid2 size={8}>
                <QuestionDisplay question={"Do you know what you are doing?"} />
            </Grid2>
        </Grid2>
        <AnswerChoice choiceLetter={"A"} text={"Random Answer that is close to right but wrong"}/>
        <AnswerChoice choiceLetter={"B"} text={"Random Answer that is close to right but wrong"}/>
        <AnswerChoice choiceLetter={"C"} text={"Random Answer that is close to right but wrong"}/>
        <AnswerChoice choiceLetter={"D"} text={"Random Answer that is close to right but wrong"}/>
    </>
  );
}

export default App;
