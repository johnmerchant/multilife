import { connect } from "react-redux";
import { Dispatch } from 'redux';
import { State } from "../reducers";
import React, {useState, useEffect} from 'react';
import { setSpeed } from "../actions";
import {useDebouncedCallback} from 'use-debounce';

type DispatchProps = { setSpeed(speed: number): void };
type StateProps = { speed?: number };
type OwnProps = { min: number, max: number };
type Props = OwnProps & StateProps & DispatchProps;

const SpeedComponent = ({ min, max, speed, setSpeed }: Props) => {
    const [state, setState] = useState(speed);
    const [setSpeedCallback] = useDebouncedCallback((value: number) => setState(value), 100);
    useEffect(() => { 
        if (state) { 
            setSpeed(state);
        }
    }, [state]);
    return <div>
        <label>Interval:</label>
        <span>{speed}ms</span>
        <input type="range" min={min} max={max} defaultValue={String(state)} onChange={(event) => setSpeedCallback(parseInt(event.target.value))} />
    </div>;
};

export const Speed = connect(
    (state: State) => ({ speed: state.game.speed }),
    (dispatch: Dispatch) => ({ setSpeed: (speed: number) => dispatch(setSpeed(speed)) })
)(SpeedComponent);