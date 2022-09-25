import React, { Component } from 'react';

import './AgendamentoCard.css'


import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';


import { api } from '../../services/api';

class VeterinarioAgendaAnamneseCard extends Component {

    emptyAnamnese = {
        agendamento: null,
        aplicacao: null,
        id: null,
        queixa_principal: '',
        frequencia_cardiaca: '',
        frequencia_respiratoria: '',
        linfonodo: '',
        cor_mucosa: '',
        tpc: '',
        hidratacao: '',
    };
    
    constructor(props){
        super(props);
        this.state = {
            anamneses: null,
            anamnese: this.emptyAnamnese,
            submitted: false,
            id: 0,
        }
        this.onClick = this.onClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.saveAnamnese = this.saveAnamnese.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.showError = this.showError.bind(this);
    }

    componentDidMount() {
        this.onLoad();
}

    componentDidUpdate(prevProps, prevState) {

        if(this.state.id !== prevState.id) {
            this.onLoad();
        }
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

    
    onLoad = async e => {
        let agendamento = this.props.agendamento
        console.log("testando")

        try {
            await api.get(`/anamneses/anamneses/${agendamento}/`).then((response) => {
                console.log(response);
                this.setState({ anamnese: response.data })
            })
        } catch (err) {
            console.log(`Erro: ${err}`)
        }
    }

    showError() {
        this.toast.show({severity:'error', summary: 'Error', detail: this.state.messageError , life: 3000});
    } 

    saveAnamnese = async e => {
        let state = { submitted: true };
        let agendamento = this.props.agendamento

        const { queixa_principal, frequencia_cardiaca, frequencia_respiratoria, linfonodo, cor_mucosa, tpc,hidratacao  } = this.state.anamnese
        console.log(agendamento)
        
        if( !queixa_principal || !frequencia_cardiaca || !frequencia_respiratoria || !linfonodo || !cor_mucosa || !tpc || !hidratacao  ){
            this.setState(
                {messageError: "Preencha todos os campos para cadastrar a anamnese!"},
                () => this.showError()
            );
        }else{
            try {
                api.put(`/anamneses/anamneses/`, {queixa_principal, frequencia_cardiaca, frequencia_respiratoria, linfonodo, cor_mucosa, tpc,hidratacao, agendamento}).then(response =>{
                    console.log(response)
                    this.setState(prevState => ({id: prevState.id + 1}))
                })
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Anamnese Adicionado', life: 3000 });          
            } catch (err) {
                console.log(`Erro: ${err}`)
            }  
        }

        state = {
            ...state,
        };
        this.setState(state);
    }

    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let anamnese = {...this.state.anamnese};
        anamnese[`${name}`] = val;
        this.setState({ anamnese: anamnese });
    }

    render(){
        return(
            <React.Fragment>
            <div className="field">
                <label htmlFor="queixa_principal">Queixa Principal</label>
                <InputText id="queixa_principal" value={this.state.anamnese.queixa_principal} onChange={(e) => this.onInputChange(e, 'queixa_principal')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.anamnese.queixa_principal })} />
                {this.state.submitted && !this.state.anamnese.queixa_principal && <small className="p-error">Queixa é obrigatório.</small>}
            </div>
            <div className="formgrid grid">
                <div className="field col">
                    <label htmlFor="frequencia_cardiaca">Frequencia Cardiaca</label>
                    <InputText id="frequencia_cardiaca" value={this.state.anamnese.frequencia_cardiaca} onChange={(e) => this.onInputChange(e, 'frequencia_cardiaca')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.anamnese.frequencia_cardiaca })} />
                    {this.state.submitted && !this.state.anamnese.frequencia_cardiaca && <small className="p-error">Frequencia Cardiaca é obrigatório.</small>}
                </div>
                <div className="field col">
                    <label htmlFor="frequencia_respiratoria">Frequencia Respiratoria</label>
                    <InputText id="frequencia_respiratoria" value={this.state.anamnese.frequencia_respiratoria} onChange={(e) => this.onInputChange(e, 'frequencia_respiratoria')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.anamnese.frequencia_respiratoria })}   />
                    {this.state.submitted && !this.state.anamnese.frequencia_respiratoria && <small className="p-error">Frequencia Respiratoria é obrigatório.</small>}
                </div>
            </div>
            <div className="formgrid grid">
                <div className="field col">
                    <label htmlFor="linfonodo">Linfonodo</label>
                    <InputText id="linfonodo" value={this.state.anamnese.linfonodo} onChange={(e) => this.onInputChange(e, 'linfonodo')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.anamnese.linfonodo })} />
                    {this.state.submitted && !this.state.anamnese.linfonodo && <small className="p-error">Linfonodo é obrigatório.</small>}
                </div>
                <div className="field col">
                    <label htmlFor="cor_mucosa">Cor Mucosa</label>
                    <InputText id="cor_mucosa" value={this.state.anamnese.cor_mucosa} onChange={(e) => this.onInputChange(e, 'cor_mucosa')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.anamnese.cor_mucosa })}   />
                    {this.state.submitted && !this.state.anamnese.cor_mucosa && <small className="p-error">Cor Mucosa é obrigatório.</small>}
                </div>
            </div> 
            <div className="formgrid grid">
                <div className="field col">
                    <label htmlFor="tpc">TPC</label>
                    <InputText id="tpc" value={this.state.anamnese.tpc} onChange={(e) => this.onInputChange(e, 'tpc')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.anamnese.tpc })} />
                    {this.state.submitted && !this.state.anamnese.tpc && <small className="p-error">TPC é obrigatório.</small>}
                </div>
                <div className="field col">
                    <label htmlFor="hidratacao">Hidratacao</label>
                    <InputText id="hidratacao" value={this.state.anamnese.hidratacao} onChange={(e) => this.onInputChange(e, 'hidratacao')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.anamnese.hidratacao })}   />
                    {this.state.submitted && !this.state.anamnese.hidratacao && <small className="p-error">Hidratacao é obrigatório.</small>}
                </div>
            </div> 
            <Button label="Atualizar" onClick={this.saveAnamnese}  />
            </React.Fragment>
        )
    }
}

export default VeterinarioAgendaAnamneseCard;