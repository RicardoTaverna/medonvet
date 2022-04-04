import React from "react";

import Route from "./../../services/routes";

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';

import PrimeReact from 'primereact/api';
import 'primereact/resources/themes/md-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';

// import './../../assets/demo/flags/flags.css';
// import './../../assets/demo/Demos.scss';
// import './../../assets/layout/layout.scss';
// import './../../App.scss';

PrimeReact.ripple = true;

class App extends React.Component {
    render (){
        return(
            <Route></Route>
        )
    }
}

export default App;
