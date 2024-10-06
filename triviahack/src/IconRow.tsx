import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import {Grid2} from "@mui/material";
import {useCallback} from "react";

interface IconRowProps {
    areAnswersCorrect: boolean[];
}

export const IconRow = ({areAnswersCorrect}: IconRowProps) => {

    // const detemrineIcon = (index: number) => {
    //     switch (areAnswersCorrect[index]){
    //         case true:
    //             return (<CheckCircleOutlinedIcon />);
    //         case false:
    //             return (<HighlightOffOutlinedIcon />);
    //         default:
    //             return (<CircleOutlinedIcon />)
    //     }
    // }

    const determineIcon = useCallback((index:number) => {

        switch (areAnswersCorrect[index]){
            case true:
                return (<CheckCircleOutlinedIcon />);
            case false:
                return (<HighlightOffOutlinedIcon />);
            default:
                return (<CircleOutlinedIcon />)
        }
    },[areAnswersCorrect])

    return(
        <>
            <Grid2 container spacing={1} sx={{mr:4}}>
                <Grid2 size={1}>
                    {
                        determineIcon(0)
                    }
                </Grid2>
                <Grid2 size={1}>
                    {
                        determineIcon(1)
                    }
                </Grid2>
                <Grid2 size={1}>
                    {
                        determineIcon(2)
                    }
                </Grid2>
                <Grid2 size={1}>
                    {
                        determineIcon(3)
                    }
                </Grid2>
                <Grid2 size={1}>
                    {
                        determineIcon(4)
                    }
                </Grid2>
                <Grid2 size={1}>
                    {
                        determineIcon(5)
                    }
                </Grid2>
                <Grid2 size={1}>
                    {
                        determineIcon(6)
                    }
                </Grid2>
                <Grid2 size={1}>
                    {
                        determineIcon(7)
                    }
                </Grid2>
                <Grid2 size={1}>
                    {
                        determineIcon(8)
                    }
                </Grid2>
                <Grid2 size={1}>
                    {
                        determineIcon(9)
                    }
                </Grid2>
            </Grid2>
        </>
    );
}

export default IconRow;