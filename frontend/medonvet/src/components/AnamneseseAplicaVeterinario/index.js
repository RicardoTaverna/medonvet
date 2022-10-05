import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Skeleton } from 'primereact/skeleton';


import './anamneses.css'

import { api } from '../../services/api';

export class AnamneseseAplicaVeterinario extends React.Component {

    emptyAnamnese = {
        id: null,
        agendamento: null,
        queixa_principal: '',
        frequencia_cardiaca: '',
        frequencia_respiratoria: '',
        linfonodo: '',
        cor_mucosa: '',
        tpc: '',
        hidratacao: '',
    };
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

    constructor(props) {
        super(props);
        this.state = {
            anamneses: null,
            anamnese: this.emptyAnamnese,
            aplicacoes: null,
            aplicacao: this.emptyAplicacao,
            aplicacaoDialog: false,
            deleteAplicacaoDialog: false,
            selectedaplicacoes: null,
            submitted: false,
            globalFilter: null,
            loading: true,
            id: 0,
        };
        this.onLoad = this.onLoad.bind(this); 
        this.onGetAplicacao = this.onGetAplicacao.bind(this); 
        this.viewAplicacao = this.viewAplicacao.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.showError = this.showError.bind(this);
        this.dateBodyTemplate = this.dateBodyTemplate.bind(this);
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
        try {
            await api.get("/anamneses/").then((response) => {
                console.log(response)
                this.setState({
                    anamneses: response.data,
                    loading: false
                })
            });
        } catch (err){
            console.log("erro: ", err);
        };
    }

    onGetAplicacao = async e => {
        try {
            api.get(`/aplicacoes/${e}/`).then((response) => {
                this.setState({
                    aplicacoes: response.data,
                    loading: false
                })
            });
        } catch (err){
            console.log("erro: ", err);
        };
    }

    viewAplicacao(agendamento) {
        console.log('agendamento', agendamento);
        this.setState({
            id: agendamento.id,
            aplicacaoDialog: true,
        });
        this.onGetAplicacao(agendamento.id)
    }

    hideDialog() {
        this.setState({
            submitted: false,
            aplicacaoDialog: false
        });
    }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-shield" className="p-button-rounded button-primary mr-2" onClick={() => this.viewAplicacao(rowData)} />
            </React.Fragment>
        );
    }

    showError() {
        this.toast.show({severity:'error', summary: 'Error', detail: this.state.messageError , life: 3000});
    }

    dateBodyTemplate(rowData) {
        var date = new Date(rowData.data_aplicacao)
        return <span>{date.toUTCString().slice(6, 22)}</span>;
    }
    render() {
        const table = (
            <React.Fragment>
                <DataTable ref={(el) => this.dt = el} value={this.state.anamneses} selection={this.state.selectedaplicacoes} onSelectionChange={(e) => this.setState({ selectedaplicacoes: e.value })}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    // globalFilter={this.state.globalFilter} header={header} responsiveLayout="scroll"
                    >
                    <Column field="id" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="queixa_principal" header="Queixa" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="frequencia_cardiaca" header="Freq. Cardiaca" sortable style={{ minminWidth: '8rem' }}></Column>
                    <Column field="frequencia_respiratoria" header="Freq. Respiratoria" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="linfonodo" header="Linfonodo" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="cor_mucosa" header="Cor Mucosa" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="tpc" header="TPC" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="hidratacao" header="Hidratacao" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="agendamento" header="Agendamento" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column body={this.actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </React.Fragment>
        )

        const skeletonActionButtons = (
            <React.Fragment>
                <div className="flex justify-content-center">
                    <Skeleton shape="circle" size="3rem" className="mr-2"></Skeleton>
                    <Skeleton shape="circle" size="3rem" ></Skeleton>
                </div>
            </React.Fragment>
        )

        const skeleton = (
            <React.Fragment>
                <Skeleton className="mb-4" width="7rem" height="3rem"></Skeleton>
                <DataTable value={Array.from({ length: 5 })} className="p-datatable-striped">
                <Column field="queixa_principal" header="Queixa" sortable style={{ minWidth: '12rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="tipo" header="tipo" sortable style={{ minWidth: '16rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="frequencia_cardiaca" header="Freq. Cardiaca" sortable style={{ minWidth: '8rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="frequencia_respiratoria" header="Freq. Respiratoria" sortable style={{ minWidth: '10rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="linfonodo" header="Linfonodo" sortable style={{ minWidth: '12rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="cor_mucosa" header="Cor Mucosa" sortable style={{ minWidth: '12rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="tpc" header="TPC" sortable style={{ minWidth: '12rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="hidratacao" header="Hidratacao" sortable style={{ minWidth: '12rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="agendamento" header="Agendamento" sortable style={{ minWidth: '12rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column exportable={false} style={{ minWidth: '12rem' }} body={skeletonActionButtons}></Column>
                </DataTable>
            </React.Fragment>

        )

        let datatable = skeleton;

        if(!this.state.loading){
            datatable = table;
        }
       
        let aplicacaoForm = (
            <Dialog visible={this.state.aplicacaoDialog} style={{ width: '750px' }} header="Aplicações" modal className="p-fluid" onHide={this.hideDialog}>
                <div className="card p-fluid">
                    <DataTable value={this.state.aplicacoes} editMode="row" dataKey="id" onRowEditComplete={this.onRowEditComplete1} stripedRows responsiveLayout="scroll">
                        <Column field="id" header="Codigo" bodyStyle={{ textAlign: 'center' }}></Column>
                        <Column field="tipo" header="Tipo" ></Column>
                        <Column field="nome_medicamento" header="Nome Medicamento" ></Column>
                        <Column field="data_aplicacao" body={this.dateBodyTemplate} header="Data Aplicação" ></Column>
                    </DataTable>
                </div> 
            </Dialog>
                    
        )
        return(
            <React.Fragment>
                <div className="p-6">
                    <div className="datatable-crud-demo">
                        <Toast ref={(el) => this.toast = el} />

                        <div className="card">
                            {datatable}
                        </div>
                    </div>
                </div>

                <Dialog visible={this.state.aplicacaoDialog} style={{ width: '750px' }} header="Aplicação" modal className="p-fluid"  onHide={this.hideDialog}>
                    {aplicacaoForm}

                </Dialog>
            </React.Fragment>
        )
    }
}

export default AnamneseseAplicaVeterinario;