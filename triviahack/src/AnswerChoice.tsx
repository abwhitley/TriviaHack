import {Button, Card, CardContent, Grid2} from "@mui/material";

interface AnswerChoice {
    text: string,
    choiceLetter: string
}

const AnswerChoice = ({text,choiceLetter}:AnswerChoice) => {
    return (
        <>
            <Grid2 container spacing={2} sx={{border:'1px solid black'}}>
                <Grid2 size={1}>
                    <Button>{choiceLetter}</Button>
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