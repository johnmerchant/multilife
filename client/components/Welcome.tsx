/** @jsx jsx */
import {jsx} from '@emotion/react';
import React from 'react';
import {colorNameCss} from '../styles';
import { connect } from "react-redux";
import { State } from "../reducers";
import { Dispatch } from 'redux';
import { newColor } from '../actions/messages';
import { welcomeStyle } from '../styles';
import { isTouchDevice } from '../util/touch';

interface StateProps {
    color?: string;
    colorName?: string;
    playerCount?: number;
}

interface DispatchProps {
    newColor(): void;
}

type Props = StateProps & DispatchProps;


const WelcomeComponent = ({ color, colorName, newColor, playerCount }: Props) => 
    <article css={welcomeStyle}>
        <p>Your cells have a shade of <a onClick={newColor} css={[{color}, colorNameCss ]}>{colorName}</a>. {isTouchDevice ? 'Touch' : 'Click'}, drag and release to place cells!</p>
        <p>{typeof playerCount !== 'undefined' && playerCount > 1 ? (<React.Fragment>There {playerCount-1 === 1 ? 'is' : 'are'} <strong>{playerCount - 1}</strong> {playerCount-1 === 1 ? 'other' : 'others'} here ...</React.Fragment>) : null}</p>
    </article>

export const Welcome = connect(
    (state: State) => ({ color: state.game.color, colorName: state.game.colorName, playerCount: state.game.playerCount }),
    (dispatch: Dispatch) => ({ newColor: () => dispatch(newColor()) })
)(WelcomeComponent);