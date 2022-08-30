import React from 'react';

import { api } from '../../services/api';

import { Toast } from 'primereact/toast';

import UsuarioConfigSeguranca from '../UsuarioConfigSeguranca';
import ClienteConfigCadastro from '../ClienteConfigCadastro';
import UsuarioEndereco from '../UsuarioEndereco';

export class ClienteConfig extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            servicos: [],
            loading: true,
            search: "",
        };
        this.onLoad = this.onLoad.bind(this);
    }

    componentDidMount() {
        this.onLoad();
    }


    onLoad = async e => {
        try {
            api.get("/servicos/").then((response) => {
                console.log(response)
                this.setState({
                    servicos: response.data,
                    loading: false,
                    search: "",
                })
            });

        } catch (err){
            console.log("erro: ", err);
        };
    }

    render() {

        return (
            <React.Fragment>
                <Toast ref={(el) => this.toast = el} />
                <div className="grid px-6 py-3">
                    <div className="col-12 md:col-6 lg:col-6">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <UsuarioConfigSeguranca></UsuarioConfigSeguranca>
                        </div>
                    </div>

                    <div className="col-12 md:col-6 lg:col-6">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <ClienteConfigCadastro></ClienteConfigCadastro>
                        </div>
                    </div>

                    <div className="col-12 md:col-12 lg:col-12">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <UsuarioEndereco></UsuarioEndereco>
                        </div>
                    </div>
                </div>
    
            </React.Fragment>
        )
    }

};

export default ClienteConfig;