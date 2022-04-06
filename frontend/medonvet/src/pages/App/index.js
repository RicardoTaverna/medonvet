import React from "react";

import Route from "./../../services/routes";

import PrimeReact from 'primereact/api';
import 'primereact/resources/themes/md-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';

PrimeReact.ripple = true;

class App extends React.Component {
    render (){
        return(
            <Route></Route>
        )
    }
}

export default App;
