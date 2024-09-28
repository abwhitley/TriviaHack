import {Card, CardContent, Typography} from "@mui/material";

interface QuestionDisplayProps {
    question: string
}

const QuestionDisplay = ({ question }: QuestionDisplayProps) => {

    // Fix "" appearing
    // un URL encode?
    question = question.replace("&quot;","\"").replace("&#039;", "'").replace("&quot;","\"").replace("&#039;", "'");

    return(
        <>
            <Card sx={{ height: "100%", backgroundColor:"rgb(19, 75, 112)"}}>
                <CardContent>
                    <Typography variant='h4'>{ question }</Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default QuestionDisplay;