import React, { Component } from 'react';

import './AgendamentoCard.css'

import { Avatar } from 'primereact/avatar';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';


import { api } from '../../services/api';
import VeterinarioAgendaAplicacaoCard from '../VeterinarioAgendaAplicacaoCard';
import VeterinarioAgendaAnamneseCard from '../VeterinarioAgendaAnamneseCard';

class VeterinarioAgendaCard extends Component {

    emptyAplicacao = {
        pet: null,
        id: null,
        tipo: '',
        nome_medicamento: '',
        data_aplicacao: '',
        data_reaplicacao: '',
        notificar: true,
    };
    
    constructor(props){
        super(props);
        this.state = {
            displayDialog: false,
            servicos: null,
            servicoDialog: false,
            deleteServicoDialog: false,
            aplicacao: this.emptyAplicacao,
            selectedServicos: null,
            submitted: false,
            globalFilter: null,
            loading: true,
            id: 0,
        }
        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
        this.onNomeServicoChange = this.onNomeServicoChange.bind(this);
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
    }

    onClick(name, position) {
        console.log("cliquei")
        let state = {
            [`${name}`]: true
        };
        if (position) {
            state = {
                ...state,
                position
            }
        }
        this.setState(state);
    }

    onHide(name) {
        this.setState({
            [`${name}`]: false
        });
    }
    
    onNomeServicoChange(e, name){
        const val = e.value.name || 0;
        let aplicacao = {...this.state.aplicacao};
        aplicacao[`${name}`] = val;
        this.setState({ aplicacao });
    }  

    onInputNumberChange(e, name) {
        const val = e.value || 0;
        let aplicacao = {...this.state.aplicacao};
        aplicacao[`${name}`] = val;

        this.setState({ aplicacao });
    }

    render(){
        return(
            <React.Fragment>
                <div class="card card-agendamento m-2" onClick={() => this.onClick('displayDialog')}>
                    <div class="flex card-container blue-container overflow-hidden">
                        <div class="flex-none flex align-items-center justify-content-center border-round">
                            <Avatar icon="pi pi-user" className="mr-2" size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />
                        </div>
                        <div class="flex-grow-1 flex align-items-right justify-content-right m-2 px-5 py-3 border-round">
                            <div>
                                <div className="font-medium text-xl text-900">{this.props.pet.nome}</div>
                                    <div className="flex align-items-center text-700 flex-wrap">
                                        <div className="mr-5">
                                            <div className='mt-3'>
                                               
                              
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div class="flex-none flex align-items-center justify-content-center m-2 px-5 py-3">
                            <p className='font-light mr-3 text-primary text-left'>{this.props.data} - {this.props.horario_selecionado}</p>
                        </div>
                    </div>                    
                </div>
                <Dialog header="Header" visible={this.state.displayDialog} style={{ width: '750px' }} modal className="p-fluid" onHide={() => this.onHide('displayDialog')}>
                    <div className="field">
                        <VeterinarioAgendaAnamneseCard agendamento={this.props.agendamento}></VeterinarioAgendaAnamneseCard>    
                    </div>
                    <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                        <VeterinarioAgendaAplicacaoCard agendamento={this.props.agendamento} pet={this.props.pet}></VeterinarioAgendaAplicacaoCard>

                    </div>

                </Dialog>
            </React.Fragment>
        )
    }
}

export default VeterinarioAgendaCard;