/** @jsx jsx */
import {jsx} from '@emotion/core';
import { connect } from 'react-redux';
import { useMemo } from 'react';
import { ColorRanking } from "../../models";
import { State } from "../reducers";
import { titleStyle, titleCharStyle } from '../styles';

interface StateProps {
    colors?: ColorRanking
}

interface OwnProps {
    text: string;
}

type Props = StateProps & OwnProps;

const TitleComponent = ({text, colors}: Props) => {
    if (!colors || colors.length === 0) return <h1 css={titleStyle}>{text}</h1>;
    const charColors = 
        useMemo(() => [...text].map((char, i) => ({
            char,
            color: colors[i % colors.length].color
        })), 
        [text, colors]);
    return <h1 css={titleStyle}>
        {charColors.map(({ char, color }, i) => 
            <span key={'c'+i} css={[{ color, textShadow: `0 0 4px ${color}` }, titleCharStyle]}>{char}</span>)}
    </h1>;
}

export const Title = connect(
    (state: State) => ({ colors: state.game.colorRanking }),
    (dispatch) => ({ })
)(TitleComponent);