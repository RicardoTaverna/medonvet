import React, { Component } from 'react';

import { Toast } from 'primereact/toast';

import UsuarioConfigSeguranca from '../UsuarioConfigSeguranca';
import PrestadorConfigCadastro from '../PrestadorConfigCadastro';
import UsuarioEndereco from '../UsuarioEndereco';

class PrestadorConfig extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageError: "",
        }
    }

    render(){
        return(
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
                            <PrestadorConfigCadastro></PrestadorConfigCadastro>
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
}

export default PrestadorConfig;