import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App';

import {enableMapSet} from "immer";

enableMapSet()

ReactDOM.render(<App/>, document.getElementById('app'));