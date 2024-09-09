import {useCallback} from "react";
import axios from 'axios';

export interface TriviaData {
    results: TriviaQuestion[]
}

export interface TriviaQuestion {
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}

export interface UseQuestionHook {
    getQuestion: () => Promise<TriviaData>
}

export const useQuestionHook = ():UseQuestionHook => {
    const getQuestion = useCallback(async (): Promise<TriviaData> => {
        const endPoint = 'https://opentdb.com/api.php?amount=10';
        const ts = performance.now();
        const response = await axios.get(endPoint);
        const measure = (performance.now() - ts).toFixed(0);
        console.info(`[GET] time to receive data ${measure}ms`);

        console.log(response.data)
        // console.log(JSON.stringify(response.data))
        return response.data as TriviaData;
    }, []);

    return{
        getQuestion
    }
}