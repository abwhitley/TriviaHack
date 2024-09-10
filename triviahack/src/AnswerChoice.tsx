import {Button, Card, CardContent, Grid2} from "@mui/material";
import {useState} from "react";
import {blue} from "@mui/material/colors";

interface AnswerChoice {
    text: string,
    choiceLetter: string
}

const AnswerChoice = ({text,choiceLetter}:AnswerChoice) => {
    const [userChoice, setUserChoice] = useState<string>("Error")
    let style = {color:""}

    if(choiceLetter === userChoice){
        style = {color:"blue"}
    }

    return (
        <>
            <Grid2 container spacing={2} sx={{border:'1px solid black'}}>
                <Grid2 size={1}>
                    <Button variant="outlined" sx={{style}} onClick={() => {
                        setUserChoice(choiceLetter)
                    }}>{choiceLetter}</Button>
                </Grid2>
                <Grid2 size={10}>
                    <Card>
                        <CardContent>
                            {text}
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </>
    );
}

export default AnswerChoice;