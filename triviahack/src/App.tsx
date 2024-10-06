import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import Timer from "./Timer";
import AnswerChoice from "./AnswerChoice";
import QuestionDisplay from "./QuestionDisplay";
import {Button, Card, CardContent, Grid2, Typography} from "@mui/material";
import {TriviaData, TriviaQuestion, useQuestionHook} from "./apiClient";
import {all} from "axios";
import {queryByRole} from "@testing-library/react";
import IconRow from "./IconRow";

function App() {

    const { getQuestion } = useQuestionHook();

    const [questions, setQuestions] = useState<TriviaData | undefined>(undefined);
    const [currentQuestion, setCurrentQuestion] = useState<TriviaQuestion | undefined>(undefined);
    const [correctAnswer, setCorrectAnswer] = useState<string>("");
    const [allAnswerChoices, setAllAnswerChoices] = useState<string[]>([""]);
    const [userChoice, setUserChoice] = useState<string>("");
    const [buttonSelected, setButtonSelected] = useState<string>("");
    let letter : string = "A";
    const [answerSelected, setAnswerSelected] = useState<string>("");
    const [index, setIndex] = useState(0);
    const [areAnswersCorrect, setAreAnswersCorrect] = useState<boolean[]>([]);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);


    const handleStartGame = useCallback(() => {

        getQuestion().then((r)=>{
                // console.log("R is populated")
                setQuestions((prevState) => {
                    // console.log("Made it in the setQuestions")
                    // console.log(`This is R: ${JSON.stringify(r)}`)
                    setCurrentQuestion(r.results[index]);
                    setCorrectAnswer(r.results[index].correct_answer);
                    setAllAnswerChoices([...r.results[index].incorrect_answers, r.results[index].correct_answer]);
                    return r
                })

        })
    },[index])

    // useEffect(() => {
    //     if(currentQuestion){
    //         setCorrectAnswer(currentQuestion.correct_answer)
    //         setAllAnswerChoices([...currentQuestion.incorrect_answers, currentQuestion.correct_answer])
    //     }
    // }, [currentQuestion]);

    useEffect(() => {
        if(index === 9){
            determineScore()
        } else {
            changeQuestion()
        }
    }, [index]);


    const changeQuestion = () => {
        if (questions){
            setAllAnswerChoices(()=> {
                setCurrentQuestion(questions.results[index]);
                setCorrectAnswer(questions.results[index].correct_answer);
                return [...questions.results[index].incorrect_answers, questions.results[index].correct_answer];
            })
        }
    }

    const determineScore = () => {
        let questionsCorrect = 0
        areAnswersCorrect.forEach((value) =>{
            if(value){
                questionsCorrect++;
            }
        })

        setScore(questionsCorrect);
    }

    const displayScore = () => {
        if(showScore){
            return(
                <Card>
                    <CardContent>
                        <Typography>You scored {score}/10</Typography>
                    </CardContent>
                </Card>
            );
        }
    }

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
                                <AnswerChoice choiceLetter={ letter } text={ choice } userChoice={userChoice} setUserChoice={setUserChoice} buttonSelected={buttonSelected} setButtonSelected={setButtonSelected} setAnswerSelected={setAnswerSelected} currentQuestion={currentQuestion}/>
                            </>
                        );
                    })
                }
            </Grid2>
            <Grid2 size={2}>
                <div></div>
            </Grid2>
            <Grid2 size={10}>
                <IconRow areAnswersCorrect={areAnswersCorrect}/>
            </Grid2>
            <Grid2 size={1}>
                <Button variant='contained' onClick={()=>{
                    if(answerSelected === correctAnswer){
                        console.log("You guessed Correct")
                        setAreAnswersCorrect((prevState) => {
                            setIndex(index + 1);
                            return [...prevState, true]
                        })
                    } else {
                        console.log("Incorrect")
                        setAreAnswersCorrect((prevState) => {
                            setIndex(index + 1);
                            return [...prevState, false];
                        })
                    }

                }}>Submit</Button>
            </Grid2>
            <Grid2 size={ 12 }>
                <Button variant='contained' sx={{ml:2}} onClick={ () => {
                    handleStartGame()
                } }>New Game</Button>
            </Grid2>
            <Grid2 size={12}>
                {
                    showScore
                }
            </Grid2>

        </Grid2>

    </div>
  );
}

export default App;
