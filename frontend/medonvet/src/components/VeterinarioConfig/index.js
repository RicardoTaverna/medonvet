import React, { Component } from 'react';

import { Toast } from 'primereact/toast';

import UsuarioConfigSeguranca from '../UsuarioConfigSeguranca';
import VeterinarioConfigCadastro from '../VeterinarioConfigCadastro';
import UsuarioEndereco from '../UsuarioEndereco';
import PrestadorConfigHorario from '../PrestadorConfigHorario';

class VeterinarioConfig extends Component {

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
                    <div className='col-6'>
                        <div className='grid'>
                            <div className="col-12">
                                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                                    <UsuarioConfigSeguranca></UsuarioConfigSeguranca>     
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                                    <PrestadorConfigHorario></PrestadorConfigHorario>    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 md:col-6 lg:col-6">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <VeterinarioConfigCadastro></VeterinarioConfigCadastro>
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

export default VeterinarioConfig;