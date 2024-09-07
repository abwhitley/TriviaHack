import {Card, CardContent, Typography} from "@mui/material";

interface QuestionDisplayProps {
    question: string
}

const QuestionDisplay = ({question}:QuestionDisplayProps) => {
    return(
        <>
            <Card sx={{height: "100%"}}>
                <CardContent>
                    <Typography variant='h4'>{question}</Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default QuestionDisplay;