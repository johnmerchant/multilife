/** @jsx jsx */
import {jsx} from '@emotion/core';
import { connect } from "react-redux";
import { State } from "../reducers";

interface StateProps {
    color?: string;
    colorName?: string;
}

const WelcomeComponent = ({ color, colorName }: StateProps) => <article>
    <p>Welcome, you have been assigned a shade of <strong css={{ color }}>{colorName}</strong>. Click anywhere to place a cell!</p>
    <p>What's the objective? None, really. Just click around and have fun watching the patterns form! 🌈</p>
</article>

export const Welcome = connect(
    (state: State) => ({ color: state.game.color, colorName: state.game.colorName })
)(WelcomeComponent);