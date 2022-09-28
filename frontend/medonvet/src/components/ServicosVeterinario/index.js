import React from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { ToggleButton } from 'primereact/togglebutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';


import './servico.css'

import { api } from '../../services/api';

export class ServicosVeterinario extends React.Component {


    emptyServico = {
        prestador: null,
        veterinario: null,
        id: null,
        nome: '',
        descricao: '',
        valor: '',
        status_servico: '',
    };

    constructor(props) {
        super(props);

        this.state = {
            servicos: null,
            servicoDialog: false,
            deleteServicoDialog: false,
            servico: this.emptyServico,
            selectedServicos: null,
            submitted: false,
            globalFilter: null,
            loading: true,
            id: 0,
        };

        this.onLoad = this.onLoad.bind(this); 
        this.openNew = this.openNew.bind(this);
        this.saveServico = this.saveServico.bind(this);
        this.confirmDeleteServico = this.confirmDeleteServico.bind(this);
        this.editServico = this.editServico.bind(this);
        this.deleteServico = this.deleteServico.bind(this);
        this.findIndexById = this.findIndexById.bind(this);
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.hidedeleteServicoDialog = this.hidedeleteServicoDialog.bind(this);
        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.imageBodyTemplate = this.imageBodyTemplate.bind(this);
        this.onInputUserChange = this.onInputUserChange.bind(this);
        this.showError = this.showError.bind(this);
        this.onNomeServicoChange = this.onNomeServicoChange.bind(this);
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
            api.get("/servicos/servico/").then((response) => {
                console.log(response)
                this.setState({
                    servicos: response.data,
                    loading: false
                })
            });

        } catch (err){
            console.log("erro: ", err);
        };
    }

    saveServico = async e => {
        let state = { submitted: true };
        let servicos = [...this.state.servicos];
        let servico = {...this.state.servico};
        
        const { nome, descricao, valor } = this.state.servico
        
        if( !nome || !descricao || !valor ){
            this.setState(
                {messageError: "Preencha todos os campos para cadastrar o servico!"},
                () => this.showError()
            );
        }else{
            if(this.state.servico.id){
                const index = this.findIndexById(this.state.servico.id);
                servicos[index] = servico;
                try {
                    api.put(`/servicos/servico/${this.state.servico.id}/`, servico).then(response => console.log(response))
                    this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Serviço atualizado', life: 3000 });
                    this.setState({passwordconfirm: ''})
                } catch (err) {
                    console.log(`Erro: ${err}`)
                }
            }else {
                try {
                    api.post(`/servicos/`, servico).then(response =>{
                        console.log(response)
                        this.setState(prevState => ({id: prevState.id + 1}))
                    })
                    
                    this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Serviço Adicionado', life: 3000 });
                    
                    console.log(servicos)
                    
                } catch (err) {
                    console.log(`Erro: ${err}`)
                }
            }
        }

        state = {
            ...state,
            servicos,
            servicoDialog: false,
            servico: this.emptyServico
        };

        this.setState(state);
    }

    editServico(servico) {
        this.setState({
            servico: { ...servico },
            servicoDialog: true,
        });
    }

    confirmDeleteServico(servico) {
        this.setState({
            servico,
            deleteServicoDialog: true
        });
    }

    deleteServico() {
        let servicos = this.state.servicos.filter(val => val.id !== this.state.servico.id);
        console.log(this.state.servicos.id)
        api.delete(`/servicos/servico/${this.state.servico.id}/`)
        this.setState({
            servicos,
            deleteServicoDialog: false,
            servico: this.emptyServico
        });
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Servico deletado', life: 3000 });
    }


    findIndexById(id) {
        let index = - 1;
        for (let i = 0; i < this.state.servicos.length; i++) {
            if (this.state.servicos[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    openNew() {
        this.setState({
            servico: this.emptyServico,
            submitted: false,
            servicoDialog: true,
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            servicoDialog: false
        });
    }

    hidedeleteServicoDialog() {
        this.setState({ deleteServicoDialog: false });
    }

    onInputUserChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let servico = {...this.state.servico};
        servico[`${name}`] = val;
        console.log(servico)
        this.setState({ servico: servico });
    }

    onInputNumberChange(e, name) {
        const val = e.value || 0;
        let servico = {...this.state.servico};
        servico[`${name}`] = val;

        this.setState({ servico });
    }

    onInputSwitch(e, name) {
        let val = e.value || 0;
        let servico = {...this.state.servico};

        if(val === true){
            val = 1;
        } else {
            val = 0;
        }

        servico[`${name}`] = val;

        this.setState({ servico });
    }

    onNomeServicoChange(e){
        let servico = {...this.state.servico};
        servico[`nome`] = e;
        this.setState({ servico });
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
                <Button icon="pi pi-pencil" className="p-button-rounded button-primary mr-2" onClick={() => this.editServico(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-secondary" onClick={() => this.confirmDeleteServico(rowData)} />
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
        const servicoNome = [
            { label: 'Aplicação', value: 'Aplicação' },
            { label: 'Consulta', value: 'Consulta'  },
            { label: 'Cirurgia', value: 'Cirurgia'  },
            { label: 'Medicamento', value: 'Medicamento'  },
            { label: 'Vacina', value: 'Vacina'  }
        ];

        const servicoDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveServico} />
            </React.Fragment>
        );

        const deleteServicoDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hidedeleteServicoDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteServico} />
            </React.Fragment>
        );
        
        const statusBodyTemplate = rowData => {
            if(rowData.status_servico === 1){
                return <span className='text-green-700 bg-green-100 p-2'>Ativo</span>
            } else {
                return <span className='text-yellow-700 bg-yellow-100 p-2'>Inativo</span>
            }
            
        }

        const table = (
            <React.Fragment>
                <Toolbar className="mb-4" left={this.leftToolbarTemplate}></Toolbar>
                <DataTable ref={(el) => this.dt = el} value={this.state.servicos} selection={this.state.selectedServicos} onSelectionChange={(e) => this.setState({ selectedServicos: e.value })}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    // globalFilter={this.state.globalFilter} header={header} responsiveLayout="scroll"
                    >
                    <Column field="id" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="nome" header="Nome" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="descricao" header="Descricao" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="valor" header="Valor" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
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
                    <Column field="nome" header="Nome" sortable style={{ minWidth: '16rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="descricao" header="Descricao" sortable style={{ minWidth: '8rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="valor" header="Valor" sortable style={{ minWidth: '10rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="status_servico" header="Status" sortable style={{ minWidth: '12rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column exportable={false} style={{ minWidth: '12rem' }} body={skeletonActionButtons}></Column>
                </DataTable>

            </React.Fragment>

        )

        let datatable = skeleton;

        if(!this.state.loading){
            datatable = table;
        }
        let dialog = ""
       
        let servicoForm = (
            <Dialog visible={this.state.servicoDialog} style={{ width: '750px' }} header="Cadastrar Novo Serviço" modal className="p-fluid" footer={servicoDialogFooter} onHide={this.hideDialog}>

                <div className="field">
                    <label htmlFor="nome" className="font-medium mb-2">Nome</label>
                    <Dropdown id="nome" value={this.state.servico.nome} options={servicoNome} onChange={(e) => this.onNomeServicoChange(e.value)} placeholder="Escolha o Serviço"/>   

                    {this.state.submitted && !this.state.servico.nome && <small className="p-error">Nome é obrigatório.</small>}
                            
                            
                </div>

                <div className="field">
                    <label htmlFor="valor" className="font-medium mb-2">Valor</label>
                    <InputNumber id="valor" value={this.state.servico.valor} onValueChange={(e) => this.onInputNumberChange(e, 'valor')} showButtons  mode="currency" currency="BRL" required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.servico.valor })}  />
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
                    <InputTextarea  id="descricao" rows={5} value={this.state.descricao} className={classNames({ 'p-invalid': this.state.submitted && !this.state.servico.descricao })} onChange={(e) => this.onInputUserChange(e, 'descricao')}/>
                </div>
            </Dialog>
                    
        )

        dialog = servicoForm   

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

                <Dialog visible={this.state.servicoDialog} style={{ width: '750px' }} header="Cadastrar Novo Serviço" modal className="p-fluid" footer={servicoDialogFooter} onHide={this.hideDialog}>
                    {dialog}

                </Dialog>

                <Dialog visible={this.state.deleteServicoDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteServicoDialogFooter} onHide={this.hidedeleteServicoDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.servico && <span>Você tem certeza que deseja deletar esse Servico? <b>{this.state.servico.nome}</b>?</span>}
                    </div>
                </Dialog>

            </React.Fragment>
        )
    }
}

export default ServicosVeterinario;