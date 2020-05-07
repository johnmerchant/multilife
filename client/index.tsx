import React from 'react';
import ReactDOM from 'react-dom';
import {enableMapSet} from "immer";

import {App} from './components/App';

enableMapSet()

ReactDOM.render(<App/>, document.getElementById('app'));