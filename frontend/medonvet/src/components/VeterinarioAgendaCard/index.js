import React, { Component } from 'react';

import './AgendamentoCard.css'

import { Avatar } from 'primereact/avatar';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import { ToggleButton } from 'primereact/togglebutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';

import { api } from '../../services/api';

class VeterinarioAgendaCard extends Component {

    emptyServico = {
        prestador: null,
        veterinario: null,
        id: null,
        nome: '',
        descricao: '',
        valor: '',
        status_servico: '',
    };
    
    constructor(props){
        super(props);
        this.state = {
            displayDialog: false,
            servicos: null,
            servicoDialog: false,
            deleteServicoDialog: false,
            servico: this.emptyServico,
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
        let servico = {...this.state.servico};
        servico[`${name}`] = val;
        this.setState({ servico });
    }  

    onInputNumberChange(e, name) {
        const val = e.value || 0;
        let servico = {...this.state.servico};
        servico[`${name}`] = val;

        this.setState({ servico });
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
                                                <span>{this.props.servico.nome} </span>
                                                <span className='bg-green-100 border-round p-1'> R${this.props.servico.valor}</span>

                                            </div>
                                            <p>{this.props.servico.descricao}</p>
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
                        <label htmlFor="tipo">Tipo</label>
                        <InputText id="tipo" value={this.state.servico.tipo} onChange={(e) => this.onInputUserChange(e, 'tipo')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.servico.tipo })} />
                        {this.state.submitted && !this.state.servico.tipo && <small className="p-error">Tipo é obrigatório.</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="valor" className="font-medium mb-2">Valor</label>
                        <InputNumber id="valor" value={this.state.servico.valor} onValueChange={(e) => this.onInputNumberChange(e, 'valor')} showButtons  mode="currency" currency="BRL" required autoFocus className={classNames({ 'p-invalid': this.state.submitted })}  />
                        {this.state.submitted && !this.state.servico.valor && <small className="p-error">Valor é obrigatória.</small>}
                    </div>

                    <div className="field mt-6 ml-3">
                        <div className='grid'>
                            <label htmlFor="status_servico" className="font-medium mb-2">Status do Serviço</label>
                            <ToggleButton checked={this.state.servico.status_servico} onChange={(e) => this.onInputSwitch(e, 'status_servico')} onLabel="Ativado" offLabel="Desativado" onIcon="pi pi-check" offIcon="pi pi-times" className="w-full sm:w-10rem ml-3" aria-label="Confirmation" />
                            {this.state.submitted && !this.state.servico.status_servico && <small className="p-error">Status é obrigatório.</small>}
                        </div>
                    </div>

                    <div className="field col-12 md:col-12" >
                        <label htmlFor="descricao" className="font-medium mb-2">Descrição</label>
                        <InputTextarea  id="descricao" rows={5} value={this.state.descricao} className={classNames({ 'p-invalid': this.state.submitted})} onChange={(e) => this.onInputUserChange(e, 'descricao')}/>
                    </div>
                </Dialog>
            </React.Fragment>
        )
    }
}

export default VeterinarioAgendaCard;