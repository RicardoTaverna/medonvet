import React from 'react';

import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { ScrollPanel } from 'primereact/scrollpanel';

import ClientePrestadoresMapa from '../ClientePrestadoresMapa'
import PrestadorCard from '../PrestadorCard';

export class ClientePrestadores extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            search: "",
        };
    }

    render(){
        return(
            <React.Fragment>
                <div className="card">
                    <div className='p-6'>
                        <div className="grid formgrid">
                            <div className="field col-12">
                                <span className="p-float-label p-input-icon-left">
                                    <i className="pi pi-search" />
                                    <InputText id="lefticon" value={this.state.value2} onChange={(e) => this.setState({ search: e.target.value })} />
                                    <label htmlFor="lefticon">Procurar Veterinário ou Clínica</label>
                                </span>
                            </div>
                    
                            <div className="col-6 flex align-items-center justify-content-center mt-6">
                                <div className="p-fluid">
                                    <ScrollPanel style={{ width: '150%', height: '400px' }}>
                                        <PrestadorCard></PrestadorCard>
                                    </ScrollPanel>
                                </div>
                            </div>
                            <div className="col-2">
                                <Divider layout="vertical"></Divider>
                            </div>
                            <div className="col-4 flex align-items-center justify-content-center">
                                <ClientePrestadoresMapa></ClientePrestadoresMapa>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ClientePrestadores;