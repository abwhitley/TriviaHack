import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid2, Typography } from '@mui/material';

const Timer = () => {
    const countDownFrom: number = 5;   // doesn't need to be a state variable

    const [time, setTime] = useState<number>(countDownFrom);                // initial countdown time set to 60 seconds
    const [isActive, setIsActive] = useState<boolean>(false);     // Timer status (running or stopped)
    const timerRef = useRef<NodeJS.Timer| undefined>(undefined);          // reference to the timer interval

    /**
     * Starts a new timer when isActive === true.
     */
    useEffect(() => {
        if (isActive) {
            timerRef.current = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(timerRef.current);
                        setIsActive(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timerRef.current);   // cleanup the interval on unmount or stop
    }, [isActive]);

    /**
     * Starts a new timer (only if isActive === false && time > 0s)
     */
    const handleStart = () => {
        if (!isActive && time > 0) {
            setIsActive(true);  // starts the timer
        }
    };

    /**
     * Stops/pauses the current timer and deallocates the
     * reference to the timer that is being deallocated.
     */
    const handlePause = () => {
        setIsActive(false);             // stops/pauses the timer
        clearInterval(timerRef.current);      // dereference the old timer
    };

    /**
     * Resets the current timer to the "countDownFrom"
     * value (does NOT restart the timer).
     */
    const handleReset = () => {
        setIsActive(false);
        clearInterval(timerRef.current);      // clear the interval to dereference the old timer
        setTime(countDownFrom);               // reset the timer to "countDownFrom" seconds
    };

    return (
        // <Grid container spacing={ 2 }>
        //     <Grid item xs={ 12 }>
        //         <Typography variant='h1'>{ time }s</Typography>
        //     </Grid>
        //     <Grid item xs={ 12 }>
        //         <Button variant='contained' sx={{ mr: 2 }} onClick={ handleStart } disabled={ isActive || time === 0 }>Start</Button>
        //         <Button variant='contained' sx={{ mr: 2 }} onClick={ handlePause } disabled={ !isActive }>Pause</Button>
        //         <Button variant='contained' onClick={ handleReset } disabled={ time === countDownFrom && !isActive }>Reset</Button>
        //     </Grid>
        // </Grid>
        <Grid2 container spacing={2}>
            <Grid2 size={8}>
                <Typography variant='h1' sx={{ml:2}}>{ time }s</Typography>
            </Grid2>
            <Grid2 size={8}>
                <Button variant='contained' sx={{ mr: 2, ml: 2 }} onClick={ handleStart } disabled={ isActive || time === 0 }>Start</Button>
                {/*<Button variant='contained' sx={{ mr: 2 }} onClick={ handlePause } disabled={ !isActive }>Pause</Button>*/}
                {/*<Button variant='contained' onClick={ handleReset } disabled={ time === countDownFrom && !isActive }>Reset</Button>`*/}
            </Grid2>
        </Grid2>
    );
};

export default Timer;