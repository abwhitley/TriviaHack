import React, { useState } from 'react';
import './App.css';
import Timer from "./Timer";
import AnswerChoice from "./AnswerChoice";
import QuestionDisplay from "./QuestionDisplay";
import {Button, Grid2} from "@mui/material";
import {TriviaData, TriviaQuestion, useQuestionHook} from "./apiClient";

function App() {

    const { getQuestion } = useQuestionHook();

    const [questions, setQuestions] = useState<TriviaData | undefined>(undefined);
    const [currentQuestion, setCurrentQuestion] = useState<TriviaQuestion | undefined>(undefined);
    const [correctAnswer, setCorrectAnswer] = useState<string>("");
    const [allAnswerChoices, setAllAnswerChoices] = useState<string[]>([""]);

    const handleStartGame = () => {
        getQuestion().then(r => setQuestions(r));
        questions ? setCurrentQuestion(questions.results[0]) : setCurrentQuestion(undefined);
        questions ? setCorrectAnswer(questions.results[0].correct_answer) : setCorrectAnswer("Error");
        questions ? setAllAnswerChoices([...questions.results[0].incorrect_answers, questions.results[0].correct_answer]) : setAllAnswerChoices(["Error"]);
    }

  return (
    <>
        <Grid2 container spacing={ 2 }>
            <Grid2 size={ 4 }>
                <Timer />
            </Grid2>
            <Grid2 size={ 8 }>
                <QuestionDisplay question={ currentQuestion ? currentQuestion.question : "Wait One Moment" } />
            </Grid2>
            <Grid2 size={ 12 }>
                {
                    allAnswerChoices.map((choice, key) => {
                        let letter : string = "A";
                        let index: number = allAnswerChoices.indexOf(choice);

                        switch (index){
                            case 0:
                                letter = "A";
                                break;
                            case 1:
                                letter = "B";
                                break;
                            case 2:
                                letter = "C";
                                break;
                            case 3:
                                letter = "D";
                                break;
                            default:
                                letter = "Error";
                                break;
                        }
                        return(
                            <>
                                <AnswerChoice choiceLetter={ letter } text={ choice }/>
                            </>
                        );
                    })
                }
            </Grid2>
            <Grid2 size={ 12 }>
                <Button variant='contained' onClick={ handleStartGame }>New Game</Button>
            </Grid2>
        </Grid2>

    </>
  );
}

export default App;
