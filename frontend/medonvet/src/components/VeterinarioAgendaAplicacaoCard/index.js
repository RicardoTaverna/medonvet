import React, { Component } from 'react';

import './AccordionDemo.css';
import './AgendamentoCard.css'

import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';

import { api } from '../../services/api';

class VeterinarioAgendaAplicacaoCard extends Component {

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
            aplicacoes: null,
            aplicacaoDialog: false,
            deleteAplicacaoDialog: false,
            aplicacao: this.emptyAplicacao,
            selectedaplicacoes: null,
            submitted: false,
            globalFilter: null,
            loading: true,
            id: 0,
        }
        this.onClick = this.onClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.saveAplicacao = this.saveAplicacao.bind(this);
        this.onLoad = this.onLoad.bind(this);
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

    componentDidMount() {
        this.onLoad();
    }

    componentDidUpdate(prevProps, prevState) {

        if(this.state.id !== prevState.id) {
            this.onLoad();
        }
    }

    onLoad = async e => {
        let agendamento = this.props.agendamento
        let pet = this.props.pet.id
        console.log("testando")
        const { aplicacao, aplicacoes } = this.state

        try {
            await api.get(`/anamneses/anamneses/${agendamento}/`).then((response) => {
                console.log(response);
                this.setState({ aplicacoes: response.data.aplicacao })
                console.log(this.state.aplicacoes)
                
            })
            api.get(`/aplicacoes/${this.state.aplicacoes}/`).then((response) => {
                console.log(response);
                this.setState({ aplicacao: response.data })
            })
            console.log(this.state.aplicacao)
            
        } catch (err) {
            console.log(`Erro: ${err}`)
        }
    }

    saveAplicacao = async e => {
        let state = { submitted: true };
        let aplicacao = {...this.state.aplicacao};
        let pet = this.props.pet.id
        let agendamento = this.props.agendamento;

        const { tipo, nome_medicamento, notificar } = this.state.aplicacao
        console.log(pet)
        
        if( !tipo || !nome_medicamento || !notificar  ){
            this.setState(
                {messageError: "Preencha todos os campos para cadastrar a aplicação!"},
                () => this.showError()
            );
        }else{
            try {
                api.post(`/aplicacoes/`, {tipo, nome_medicamento, notificar, pet}).then(response =>{
                    console.log(response)
                    aplicacao = response.data.id;
                    api.put(`/anamneses/anamneses/`, {agendamento, aplicacao})
                    this.setState(prevState => ({id: prevState.id + 1}))
                })
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Aplicação Adicionado', life: 3000 });
                
            } catch (err) {
                console.log(`Erro: ${err}`)
            }
            
        }

        state = {
            ...state,
            aplicacaoDialog: false,
        };

        this.setState(state);
    }

    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let aplicacao = {...this.state.aplicacao};
        aplicacao[`${name}`] = val;
        this.setState({ aplicacao: aplicacao });
    }

    render(){
        return(
            <React.Fragment>


                        <div className="field">
                            <label htmlFor="tipo">Tipo</label>
                            <InputText id="tipo" value={this.state.aplicacao.tipo} onChange={(e) => this.onInputChange(e, 'tipo')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.aplicacao.tipo })} />
                            {this.state.submitted && !this.state.aplicacao.tipo && <small className="p-error">Tipo é obrigatório.</small>}
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="nome_medicamento">Nome Medicamento</label>
                                <InputText id="nome_medicamento" value={this.state.aplicacao.nome_medicamento} onChange={(e) => this.onInputChange(e, 'nome_medicamento')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.aplicacao.nome_medicamento })} />
                                {this.state.submitted && !this.state.aplicacao.nome_medicamento && <small className="p-error">Medicamento é obrigatório.</small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="notificar">Status</label>
                                <InputText id="notificar" value={this.state.aplicacao.notificar} onValueChange={(e) => this.onInputChange(e, 'notificar')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.aplicacao.notificar })}   />
                                {this.state.submitted && !this.state.aplicacao.notificar && <small className="p-error">Status é obrigatório.</small>}
                            </div>
                        </div>   
                        <Button label="Atualizar" onClick={this.saveAplicacao}  />

                        <div className="pt-2 pb-4">
                            <Button icon={this.state.activeIndex && this.state.activeIndex.some((index) => index === 0) ? 'pi pi-minus' : 'pi pi-plus'} label="Toggle 1st" onClick={() => this.onClick(0)} className="p-button-text" />
                        </div>
                        <Accordion multiple activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({ activeIndex: e.index })}>
                        <AccordionTab header="Header I">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </AccordionTab>
                    </Accordion>


            </React.Fragment>
        )
    }
}

export default VeterinarioAgendaAplicacaoCard;