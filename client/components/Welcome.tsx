/** @jsx jsx */
import {jsx} from '@emotion/core';
import {colorNameCss} from '../styles';
import { connect } from "react-redux";
import { State } from "../reducers";
import { Dispatch } from 'redux';
import { newColor } from '../actions';

interface StateProps {
    color?: string;
    colorName?: string;
}

interface DispatchProps {
    newColor(): void;
}

type Props = StateProps & DispatchProps;

const WelcomeComponent = ({ color, colorName, newColor }: Props) => <article>
    <p>Welcome, you have been assigned a shade of <a onClick={newColor} css={[{color}, colorNameCss ]}>{colorName}</a>. Click anywhere to place a cell!</p>
    <p>What's the objective? None, really. Just click around and have fun watching the patterns form! 🌈</p>
</article>

export const Welcome = connect(
    (state: State) => ({ color: state.game.color, colorName: state.game.colorName }),
    (dispatch: Dispatch) => ({ newColor: () => dispatch(newColor()) })
)(WelcomeComponent);