import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import Modal from 'react-modal'
import App from './components/App'
import './style/normalize.css'
import './style/skeleton.css'
import './style/custom.css'

Modal.setAppElement('body')

ReactDOM.render(
    <BrowserRouter><App /></BrowserRouter>,
    document.getElementById('root'))

registerServiceWorker()