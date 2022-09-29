import React, { Component } from 'react';

import './AccordionDemo.css';
import './AgendamentoCard.css'

import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

import { api } from '../../services/api';

class VeterinarioAgendaAplicacaoCard extends Component {

    emptyAplicacao = {
        pet: null,
        anamneses: null,
        id: null,
        tipo: '',
        nome_medicamento: '',
        data_aplicacao: '',
        data_reaplicacao: '',
        notificar: null,
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
            anamneses: null,
            activeIndex: null,
        }
        this.onClick = this.onClick.bind(this);
        this.textEditor = this.textEditor.bind(this);
        this.onRowEditComplete1 = this.onRowEditComplete1.bind(this);
        this.onClickAccordion = this.onClickAccordion.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.saveAplicacao = this.saveAplicacao.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.onNotificarChange = this.onNotificarChange.bind(this);
        this.showError = this.showError.bind(this);
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

    onClickAccordion(itemIndex) {
        let activeIndex = this.state.activeIndex ? [...this.state.activeIndex] : [];

        if (activeIndex.length === 0) {
        activeIndex.push(itemIndex);
        } else {
        const index = activeIndex.indexOf(itemIndex);
        if (index === -1) {
            activeIndex.push(itemIndex);
        } else {
            activeIndex.splice(index, 1);
        }
        }

        this.setState({ activeIndex });
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
        const { anamneses } = this.state
        try {
            await api.get(`/anamneses/anamneses/${agendamento}/`).then((response) => {
                console.log(response);
                this.setState({ 
                    anamneses: response.data.id
                })  
                api.get(`/aplicacoes/${response.data.id}/`).then((response) => {
                    console.log(response);
                    this.setState({ aplicacoes: response.data })
                })  
            })
           
            console.log(this.state.aplicacoes)
            
        } catch (err) {
            console.log(`Erro: ${err}`)
        }
    }

    saveAplicacao = async e => {
        let state = { submitted: true };
        let pet = this.props.pet.id
        let agendamento = this.props.agendamento;

        const { tipo, nome_medicamento, notificar } = this.state.aplicacao
        const { anamneses } = this.state
        console.log('anamneses ',anamneses)
        
        if( !tipo || !nome_medicamento || !notificar  ){
            this.setState(
                {messageError: "Preencha todos os campos para cadastrar a aplicação!"},
                () => this.showError()
            );
        }else{
            try {
               await api.post(`/aplicacoes/`, {tipo, nome_medicamento, notificar, pet, anamneses}).then(response =>{
                    console.log("response post")
                    console.log(this.state.anamneses)
                    console.log(response)
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
            aplicacao: this.emptyAplicacao,
        };

        this.setState(state);
    }

    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let aplicacao = {...this.state.aplicacao};
        aplicacao[`${name}`] = val;
        this.setState({ aplicacao: aplicacao });
    }

    onNotificarChange(e) {
        let aplicacao = {...this.state.aplicacao};
        aplicacao[`notificar`] = e;
        this.setState({ aplicacao: aplicacao });
    }

    showError() {
        this.toast.show({severity:'error', summary: 'Error', detail: this.state.messageError , life: 3000});
    } 

    onRowEditComplete1(e) {
        let aplicacoes = [...this.state.aplicacoes];
        let { newData, index } = e;
        console.log(newData, index);
        aplicacoes[index] = newData;

        this.setState({ aplicacoes });

        let id = aplicacoes[index].id;
        let tipo = aplicacoes[index].tipo;
        let nome_medicamento = aplicacoes[index].nome_medicamento;
        let pet = aplicacoes[index].pet;

        console.log('aplicacao',aplicacoes)
        api.put(`/aplicacoes/aplicacao/${id}/`, {tipo, nome_medicamento,pet}).then(response =>{
            console.log("response PUT")
            console.log(this.state.anamneses)
            console.log(response)
            this.setState(prevState => ({id: prevState.id + 1}))
        })
    }

    textEditor(options) {    
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }

    render(){
        const status = [
            { label: 'Sim', value: '1' },
            { label: 'Não', value: '0' },
        ];

        return(
  
            <React.Fragment>
            <Toast ref={(el) => this.toast = el} />
                <div className="pt-2 pb-4">
                    <Button icon={this.state.activeIndex && this.state.activeIndex.some((index) => index === 0) ? 'pi pi-minus' : 'pi pi-plus'} label="Adicionar Aplicação" onClick={() => this.onClickAccordion(0)} className="p-button-text" />
                </div>
                <Accordion multiple activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({ activeIndex: e.index })}>
                    <AccordionTab header="Nova Aplicação">
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
                                <Dropdown value={this.state.aplicacao.notificar} options={status} onChange={(e) => this.onNotificarChange(e.value)} placeholder="Deseja ser Notificado?"/>           
                            </div>
                        </div>   
                        <Button label="Atualizar" onClick={this.saveAplicacao}  />   
                    </AccordionTab>
                </Accordion>
                <div className="card p-fluid">
                    <h5>Aplicações</h5>
                    <DataTable value={this.state.aplicacoes} editMode="row" dataKey="id" onRowEditComplete={this.onRowEditComplete1} stripedRows responsiveLayout="scroll">
                        <Column field="id" header="Codigo"></Column>
                        <Column field="tipo" header="Tipo"  editor={(options) => this.textEditor(options)} style={{ width: '50%' }}></Column>
                        <Column field="nome_medicamento" header="Nome Medicamento" editor={(options) => this.textEditor(options)} style={{ width: '20%' }}></Column>
                        <Column field="data_aplicacao" header="Data Aplicação" style={{ width: '50%' }}></Column>
                        <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                    </DataTable>
                </div>

            </React.Fragment>
        )
    }
}

export default VeterinarioAgendaAplicacaoCard;