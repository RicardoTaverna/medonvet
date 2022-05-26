import React from 'react';

import { api } from './../../services/api';

import ClientApp from '../../pages/ClientApp';
import PrestadorPage from '../PrestadorPage';

class AppPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            groupname: 3,
        };
        this.onLogin = this.onLogin.bind(this)
    }

    componentDidMount(){
        this.onLogin();
    }

    onLogin = async e => {
        try {
            api.get('/usuarios/detalhe/').then((response) => {
                console.log(response);
                this.setState({
                    groupname: response.data.grupo
                });
            });
        } catch (err) {
            console.log(`Erro: ${err}`)
        }
        
    }


    render(){
         
        let page = (<i className="pi pi-spin pi-spinner" style={{'fontSize': '2em'}}></i>)

        if(this.state.groupname === 'cliente'){
            page = (<ClientApp></ClientApp>)
        } else if (this.state.groupname === 'prestador'){
            page = (<PrestadorPage></PrestadorPage>)
        }

        return(
            <React.Fragment>
                {page}
            </React.Fragment>
        )
    }
}

export default AppPage;