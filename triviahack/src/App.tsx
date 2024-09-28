import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import Timer from "./Timer";
import AnswerChoice from "./AnswerChoice";
import QuestionDisplay from "./QuestionDisplay";
import {Button, Grid2} from "@mui/material";
import {TriviaData, TriviaQuestion, useQuestionHook} from "./apiClient";
import {all} from "axios";

function App() {

    const { getQuestion } = useQuestionHook();

    const [questions, setQuestions] = useState<TriviaData | undefined>(undefined);
    const [currentQuestion, setCurrentQuestion] = useState<TriviaQuestion | undefined>(undefined);
    const [correctAnswer, setCorrectAnswer] = useState<string>("");
    const [allAnswerChoices, setAllAnswerChoices] = useState<string[]>([""]);
    const [userChoice, setUserChoice] = useState<string>("");
    const [buttonSelected, setButtonSelected] = useState<string>("");
    let letter : string = "A";


    const handleStartGame = useCallback(() => {

        getQuestion().then((r)=>{
                // console.log("R is populated")
                setQuestions((prevState) => {
                    // console.log("Made it in the setQuestions")
                    // console.log(`This is R: ${JSON.stringify(r)}`)
                    setCurrentQuestion(r.results[0]);
                    setCorrectAnswer(r.results[0].correct_answer);
                    setAllAnswerChoices([...r.results[0].incorrect_answers, r.results[0].correct_answer]);
                    return r
                })

        })

        // questions ? setCurrentQuestion(questions.results[0]) : setCurrentQuestion(undefined);
        // questions ? setCorrectAnswer(questions.results[0].correct_answer) : setCorrectAnswer("Error");
        // questions ? setAllAnswerChoices([...questions.results[0].incorrect_answers, questions.results[0].correct_answer]) : setAllAnswerChoices(["Error"]);
    },[questions, currentQuestion, correctAnswer, allAnswerChoices])

    useEffect(() => {

    }, [questions, currentQuestion, correctAnswer, allAnswerChoices]);

  return (

    <div>
        <Grid2 container spacing={ 2 } sx={{mt:2}}>
            <Grid2 size={ 2 }>
                <Timer />
            </Grid2>
            <Grid2 size={ 8 }>
                <QuestionDisplay question={ currentQuestion ? currentQuestion.question : "Wait One Moment" } />
            </Grid2>
            <Grid2 size={ 12 }>
                {
                    allAnswerChoices.map((choice, key) => {
                        let index: number = allAnswerChoices.indexOf(choice);

                        switch (key){
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
                                <AnswerChoice choiceLetter={ letter } text={ choice } userChoice={userChoice} setUserChoice={setUserChoice} buttonSelected={buttonSelected} setButtonSelected={setButtonSelected}/>
                            </>
                        );
                    })
                }
            </Grid2>
            <Grid2 size={ 12 }>
                <Button variant='contained' sx={{ml:2}} onClick={ () => {
                    handleStartGame()
                } }>New Game</Button>
            </Grid2>
        </Grid2>

    </div>
  );
}

export default App;
