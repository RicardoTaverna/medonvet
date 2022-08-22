import React, { Component } from 'react';

import { Toast } from 'primereact/toast';

import PrestadorConfigSeguranca from '../PrestadorConfigSeguranca';
import VeterinarioConfigCadastro from '../VeterinarioConfigCadastro';

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
                    <div className="col-12 md:col-6 lg:col-6">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <PrestadorConfigSeguranca></PrestadorConfigSeguranca>     
                        </div>
                    </div>

                    <div className="col-12 md:col-6 lg:col-6">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <VeterinarioConfigCadastro></VeterinarioConfigCadastro>
                        </div>
                    </div>

                    <div className="col-12 md:col-12 lg:col-12">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <div className="text-3xl font-mediumtext-900 mb-3">Endereço</div>
                            <div className="font-medium text-500 mb-3">Atualize suas informações de endereço.</div>
                            <div className="p-fluid grid">

                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default VeterinarioConfig;