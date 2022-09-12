import React, { Component } from 'react';
import './AgendamentoCard.css'

import { Avatar } from 'primereact/avatar';
import { Dialog } from 'primereact/dialog';

import { api } from '../../services/api';

class VeterinarioAgendaCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayDialog: false,

        }
        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
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
                <Dialog header="Header" visible={this.state.displayDialog} style={{ width: '50vw' }} onHide={() => this.onHide('displayDialog')}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Dialog>
            </React.Fragment>
        )
    }
}

export default VeterinarioAgendaCard;