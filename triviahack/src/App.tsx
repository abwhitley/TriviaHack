import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Timer from "./Timer";
import AnswerChoice from "./AnswerChoice";
import QuestionDisplay from "./QuestionDisplay";
import {Button, Grid2} from "@mui/material";
import {TriviaData, TriviaQuestion, useQuestionHook} from "./apiClient";
import questionDisplay from "./QuestionDisplay";

function App() {

    const { getQuestion } = useQuestionHook();

    const [questions, setQuestions] = useState<TriviaData | undefined>(undefined)
    const [currentQuestion, setCurrentQuestion] = useState<TriviaQuestion | undefined>(undefined)

    const handleStartGame = () => {
        getQuestion().then(r => setQuestions(r))
        // console.log(JSON.stringify(questions));
        console.log(questions?.results[0].question)
        questions ? setCurrentQuestion(questions.results[0]) : setCurrentQuestion(undefined)
    }

  return (
    <>
        <Grid2 container spacing={2}>
            <Grid2 size={4}>
                <Timer />
            </Grid2>
            <Grid2 size={8}>
                <QuestionDisplay question={currentQuestion ? currentQuestion.question : "Wait One Moment"} />
            </Grid2>
            <Grid2 size={12}>
                <AnswerChoice choiceLetter={"A"} text={currentQuestion ? currentQuestion.incorrect_answers[0] : "Wait One Moment"}/>
                <AnswerChoice choiceLetter={"B"} text={currentQuestion ? currentQuestion.incorrect_answers[1] : "Wait One Moment"}/>
                <AnswerChoice choiceLetter={"C"} text={currentQuestion ? currentQuestion.incorrect_answers[2] : "Wait One Moment"}/>
                <AnswerChoice choiceLetter={"D"} text={currentQuestion ? currentQuestion.correct_answer : "Wait One Moment"}/>
            </Grid2>
            <Grid2 size={12}>
                <Button variant='contained' onClick={handleStartGame}>New Game</Button>
            </Grid2>
        </Grid2>

    </>
  );
}

export default App;
