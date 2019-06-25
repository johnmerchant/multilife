/** @jsx jsx */
import {jsx} from '@emotion/core';
import {colorNameCss} from '../styles';
import { connect } from "react-redux";
import { State } from "../reducers";
import { Dispatch } from 'redux';
import { newColor } from '../actions/messages';

interface StateProps {
    color?: string;
    colorName?: string;
    playerCount?: number;
}

interface DispatchProps {
    newColor(): void;
}

type Props = StateProps & DispatchProps;

const WelcomeComponent = ({ color, colorName, newColor, playerCount }: Props) => <article>
    <p>Welcome, you have been assigned a shade of <a onClick={newColor} css={[{color}, colorNameCss ]}>{colorName}</a>. Click, drag and release to place cells!</p>
    {typeof playerCount !== 'undefined' && playerCount > 1 ? (<p>There {playerCount-1 === 1 ? 'is' : 'are'} <strong>{playerCount - 1}</strong> {playerCount-1 === 1 ? 'other' : 'others'} here ...</p>) : null}
    <p>What's the objective? None, really. Just click around and have fun watching the patterns form! 🌈</p>
</article>

export const Welcome = connect(
    (state: State) => ({ color: state.game.color, colorName: state.game.colorName, playerCount: state.game.playerCount }),
    (dispatch: Dispatch) => ({ newColor: () => dispatch(newColor()) })
)(WelcomeComponent);