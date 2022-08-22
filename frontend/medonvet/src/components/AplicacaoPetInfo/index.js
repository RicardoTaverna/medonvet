import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { api } from '../../services/api';

export class AplicacoesPetInfo extends React.Component {
    emptyAplicacao = {
        id: null,
        tipo: "",
        nome_medicamento: "",
        data_aplicacao: ""
    };

    constructor(props) {
        super(props);
        this.state = {
            aplicacoes: [],
            aplicacao: this.emptyAplicacao,
        };
        this.onLoad = this.onLoad.bind(this);
    }

    componentDidMount(){
        this.onLoad()
    }

    onLoad = async e => {
        try {
            api.get(`/aplicacoes/pet/${this.props.id}/`).then((response) => {
                this.setState({
                    aplicacoes: response.data
                })
            });

        } catch (err){
            console.log("erro: ", err);
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="card">
                    <DataTable value={this.state.aplicacoes} stripedRows esponsiveLayout="scroll">
                        <Column field="id" header="Codigo"></Column>
                        <Column field="tipo" header="Tipo"></Column>
                        <Column field="nome_medicamento" header="Nome Medicamento"></Column>
                        <Column field="data_aplicacao" header="Data Aplicação"></Column>
                    </DataTable>
                </div>
            </React.Fragment>
        )
    }
}

export default AplicacoesPetInfo;