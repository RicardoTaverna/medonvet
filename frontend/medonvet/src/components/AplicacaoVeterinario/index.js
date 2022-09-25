import React from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Skeleton } from 'primereact/skeleton';


import './servico.css'

import { api } from '../../services/api';

export class AplicacaoVeterinario extends React.Component {


    emptyAplicacao = {
        pet: null,
        id: null,
        tipo: '',
        nome_medicamento: '',
        data_aplicacao: '',
        data_reaplicacao: '',
        notificar: true,
    };

    constructor(props) {
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
        };
        this.onLoad = this.onLoad.bind(this); 
        this.openNew = this.openNew.bind(this);
        this.saveAplicacao = this.saveAplicacao.bind(this);
        this.confirmDeleteAplicacao = this.confirmDeleteAplicacao.bind(this);
        this.editAplicacao = this.editAplicacao.bind(this);
        this.deleteAplicacao = this.deleteAplicacao.bind(this);
        this.findIndexById = this.findIndexById.bind(this);
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.hidedeleteAplicacaoDialog = this.hidedeleteAplicacaoDialog.bind(this);
        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.imageBodyTemplate = this.imageBodyTemplate.bind(this);
        this.onInputUserChange = this.onInputUserChange.bind(this);
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

    onLoad = async e => {
        try {
            api.get("/aplicacoes/").then((response) => {
                console.log(response)
                this.setState({
                    aplicacoes: response.data,
                    loading: false
                })
            });
        } catch (err){
            console.log("erro: ", err);
        };
    }

    saveAplicacao = async e => {
        let state = { submitted: true };
        let aplicacoes = [...this.state.aplicacoes];
        let aplicacao = {...this.state.aplicacao};
        
        const { tipo, nome_medicamento, notificar } = this.state.aplicacao
        
        if( !tipo || !nome_medicamento || !notificar  ){
            this.setState(
                {messageError: "Preencha todos os campos para cadastrar a aplicação!"},
                () => this.showError()
            );
        }else{
            if(this.state.aplicacao.id){
                const index = this.findIndexById(this.state.aplicacao.id);
                aplicacoes[index] = aplicacao;
                try {
                    api.put(`/aplicacoes/aplicacao/${this.state.aplicacao.id}/`, aplicacao).then(response => console.log(response))
                    this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Aplicação atualizado', life: 3000 });
                    this.setState({passwordconfirm: ''})
                } catch (err) {
                    console.log(`Erro: ${err}`)
                }
            }else {
                try {
                    api.post(`/aplicacoes/`, aplicacao).then(response =>{
                        console.log(response)
                        this.setState(prevState => ({id: prevState.id + 1}))
                    })
                    
                    this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Aplicação Adicionado', life: 3000 });
                    
                    console.log(aplicacoes)
                    
                } catch (err) {
                    console.log(`Erro: ${err}`)
                }
            }
        }

        state = {
            ...state,
            aplicacoes,
            aplicacaoDialog: false,
            aplicacao: this.emptyAplicacao
        };

        this.setState(state);
    }

    editAplicacao(aplicacao) {
        this.setState({
            aplicacao: { ...aplicacao },
            aplicacaoDialog: true,
        });
    }

    confirmDeleteAplicacao(aplicacao) {
        this.setState({
            aplicacao,
            deleteAplicacaoDialog: true
        });
    }

    deleteAplicacao() {
        let aplicacoes = this.state.aplicacoes.filter(val => val.id !== this.state.aplicacao.id);
        console.log(this.state.aplicacoes.id)
        api.delete(`/aplicacoes/${this.state.aplicacao.id}/`)
        this.setState({
            aplicacoes,
            deleteAplicacaoDialog: false,
            aplicacao: this.emptyAplicacao
        });
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Aplicacao deletado', life: 3000 });
    }

    findIndexById(id) {
        let index = - 1;
        for (let i = 0; i < this.state.aplicacoes.length; i++) {
            if (this.state.aplicacoes[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    openNew() {
        this.setState({
            aplicacao: this.emptyAplicacao,
            submitted: false,
            aplicacaoDialog: true,
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            aplicacaoDialog: false
        });
    }

    hidedeleteAplicacaoDialog() {
        this.setState({ deleteAplicacaoDialog: false });
    }

    onInputUserChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let aplicacao = {...this.state.aplicacao};
        aplicacao[`${name}`] = val;
        console.log(aplicacao)
        this.setState({ aplicacao: aplicacao });
    }

    onInputNumberChange(e, name) {
        const val = e.value || 0;
        let aplicacao = {...this.state.aplicacao};
        aplicacao[`${name}`] = val;

        this.setState({ aplicacao });
    }

    leftToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="Adicionar" icon="pi pi-plus" className="button-primary mr-2" onClick={this.openNew} />
            </React.Fragment>
        )
    }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded button-primary mr-2" onClick={() => this.editAplicacao(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-secondary" onClick={() => this.confirmDeleteAplicacao(rowData)} />
            </React.Fragment>
        );
    }

    imageBodyTemplate(rowData) {
        return <img src={`http://127.0.0.1:8000${rowData.imagem}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.imagem} className="product-image" />
    }

    showError() {
        this.toast.show({severity:'error', summary: 'Error', detail: this.state.messageError , life: 3000});
    }
    render() {

        const aplicacaoDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveAplicacao} />
            </React.Fragment>
        );

        const deleteAplicacaoDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hidedeleteAplicacaoDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteAplicacao} />
            </React.Fragment>
        );

        const table = (
            <React.Fragment>
                <Toolbar className="mb-4" left={this.leftToolbarTemplate}></Toolbar>
                <DataTable ref={(el) => this.dt = el} value={this.state.aplicacoes} selection={this.state.selectedaplicacoes} onSelectionChange={(e) => this.setState({ selectedaplicacoes: e.value })}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    // globalFilter={this.state.globalFilter} header={header} responsiveLayout="scroll"
                    >
                    <Column field="id" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="tipo" header="Tipo" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="nome_medicamento" header="Medicamento" sortable style={{ minminWidth: '8rem' }}></Column>
                    <Column field="notificar" header="Notificar" sortable style={{ minWidth: '10rem' }}></Column>
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
                    <Column field="id" header="Código" sortable style={{ minWidth: '12rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="tipo" header="tipo" sortable style={{ minWidth: '16rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="nome_medicamento" header="nome_medicamento" sortable style={{ minWidth: '8rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="notificar" header="notificar" sortable style={{ minWidth: '10rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="status_aplicacao" header="Status" sortable style={{ minWidth: '12rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column exportable={false} style={{ minWidth: '12rem' }} body={skeletonActionButtons}></Column>
                </DataTable>

            </React.Fragment>

        )

        let datatable = skeleton;

        if(!this.state.loading){
            datatable = table;
        }
        let dialog = ""
       
        let aplicacaoForm = (
            <Dialog visible={this.state.aplicacaoDialog} style={{ width: '750px' }} header="Cadastrar Nova Aplicação" modal className="p-fluid" footer={aplicacaoDialogFooter} onHide={this.hideDialog}>

                <div className="field">
                    <label htmlFor="tipo">Tipo</label>
                    <InputText id="tipo" value={this.state.aplicacao.tipo} onChange={(e) => this.onInputUserChange(e, 'tipo')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.aplicacao.tipo })} />
                    {this.state.submitted && !this.state.aplicacao.tipo && <small className="p-error">Tipo é obrigatório.</small>}
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="nome_medicamento">Nome Medicamento</label>
                        <InputText id="nome_medicamento" value={this.state.aplicacao.nome_medicamento} onChange={(e) => this.onInputUserChange(e, 'nome_medicamento')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.aplicacao.nome_medicamento })} />
                        {this.state.submitted && !this.state.aplicacao.nome_medicamento && <small className="p-error">Medicamento é obrigatório.</small>}
                    </div>
                    <div className="field col">
                        <label htmlFor="notificar">Status</label>
                        <InputNumber id="notificar" value={this.state.aplicacao.notificar} onValueChange={(e) => this.onInputNumberChange(e, 'notificar')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.aplicacao.notificar })}   />
                        {this.state.submitted && !this.state.aplicacao.notificar && <small className="p-error">Status é obrigatório.</small>}
                    </div>
                </div>
            </Dialog>
                    
        )

        dialog = aplicacaoForm   

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

                <Dialog visible={this.state.aplicacaoDialog} style={{ width: '750px' }} header="Cadastrar Novo Aplicação" modal className="p-fluid" footer={aplicacaoDialogFooter} onHide={this.hideDialog}>
                    {dialog}

                </Dialog>

                <Dialog visible={this.state.deleteAplicacaoDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteAplicacaoDialogFooter} onHide={this.hidedeleteAplicacaoDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.aplicacao && <span>Você tem certeza que deseja deletar esse Aplicacao? <b>{this.state.aplicacao.nome}</b>?</span>}
                    </div>
                </Dialog>

            </React.Fragment>
        )
    }
}

export default AplicacaoVeterinario;