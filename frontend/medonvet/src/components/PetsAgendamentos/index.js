import React from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { api } from '../../services/api';

export class PetsAgendamento extends React.Component {
    emptyAgendamento = {
        id: null,
        data: "",
        horario_selecionado: "",
        veterinario: "",
        servico: ""
    };

    constructor(props) {
        super(props);
        this.state = {
            agendamentos: [],
            agendamento: this.emptyAgendamento,
        };
        this.onLoad = this.onLoad.bind(this);
        this.veterinarioBody = this.veterinarioBody.bind(this);
        this.servicoBody = this.servicoBody.bind(this);
    }

    componentDidMount(){
        this.onLoad()
    }

    onLoad = async e => {
        try {
            api.get(`/agendamento/pet/detalhe/${this.props.id}/`).then((response) => {
                this.setState({
                    agendamentos: response.data
                })
            });

        } catch (err){
            console.log("erro: ", err);
        };
    }

    veterinarioBody(rowData){
        return `${rowData.veterinario.user.first_name} ${rowData.veterinario.user.last_name}`
    }

    servicoBody(rowData){
        return rowData.servico.nome
    }


    render() {
        return (
            <React.Fragment>
                <div className="card">
                    <DataTable value={this.state.agendamentos} stripedRows esponsiveLayout="scroll">
                        <Column field="id" header="Codigo"></Column>
                        <Column field="data" header="Data"></Column>
                        <Column field="horario_selecionado" header="Horário"></Column>
                        <Column field="veterinario" header="Veterinário(a)" body={this.veterinarioBody}></Column>
                        <Column field="servico" header="Serviço" body={this.servicoBody}></Column>
                    </DataTable>
                </div>
            </React.Fragment>
        )
    }
}

export default PetsAgendamento;