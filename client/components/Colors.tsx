/** @jsx jsx */
import { jsx } from '@emotion/core';

import { populationListStyle } from '../styles';
import { ColorRanking } from "../../models";
import { connect } from 'react-redux';
import { State } from '../reducers';


interface StateProps {
    colorRanking?: ColorRanking;
    myColor?: string;
}

type Props = StateProps;

const ColorsComponent = ({ colorRanking, myColor }: Props) => { 
    if (!colorRanking) return <div/>;

    return <div>
        <h4>Population</h4>
        <ol css={populationListStyle}>
            {colorRanking.map(({ color, name, count }, i) => <li key={'k' + i}>
                <span style={{display: 'inline-block', boxShadow: '0 0 2px ' + color, backgroundColor: color, width: '12px', height: '12px'}}></span>
                {name}
                &nbsp;
                {count}
                &nbsp;
                {name === myColor ? <em>You</em> : null}
            </li>)}
        </ol>
    </div>
};

export const Colors = connect(
    (state: State) => ({ colorRanking: state.game.colorRanking, myColor: state.game.colorName })
)(ColorsComponent);