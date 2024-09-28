import {Button, Card, CardContent, Grid2} from "@mui/material";
import {useCallback, useEffect, useState} from "react";

interface AnswerChoice {
    text: string,
    choiceLetter: string,
    userChoice: string,
    setUserChoice: (a:string) => void,
    buttonSelected: string,
    setButtonSelected: (a:string) => void,
}

const AnswerChoice = ({ text,choiceLetter,userChoice, setUserChoice, buttonSelected, setButtonSelected }: AnswerChoice) => {
    const [buttonStyle, setButtonStyle] = useState<"text" | "contained" | "outlined" |undefined>("outlined");

    useEffect(() => {
        if (buttonSelected === choiceLetter){
            setButtonStyle("contained")
        } else {
            setButtonStyle("outlined")
        }
    }, [buttonSelected]);

    let style = {ml:2, mt:1};

    text = text.replace("&quot;","\"").replace("&#039;", "'").replace("&quot;","\"").replace("&#039;", "'").replace("&#039;", "'");


    return (
        <>
            <Grid2 container spacing={ 1 } sx={{mt:2}}>
                <Grid2 size={ 1 }>
                    {/*<Button variant="outlined" sx={{ style }} onClick={handleClick}>{ choiceLetter }</Button>*/}
                    <Button variant={buttonStyle} sx={style} onClick={() => {
                            setButtonSelected(choiceLetter)
                        }}>{choiceLetter}</Button>
                </Grid2>
                <Grid2 size={1}><></></Grid2>
                <Grid2 size={ 8 }>
                    <Card sx={{backgroundColor:"rgb(80, 140, 155)"}}>
                        <CardContent>
                            { text }
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </>
    );
}

export default AnswerChoice;