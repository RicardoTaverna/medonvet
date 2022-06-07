import React from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Skeleton } from 'primereact/skeleton';
import VeterinariosCard from '../VeterinariosCard';

import './veterinario.css'

import { api } from '../../services/api';

export class Veterinario extends React.Component {


    emptyVet = {
        user: {
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        },
        id: null,
        cpf_cnpj: '',
        crmv: '',
        descricao: '',
    };

    constructor(props) {
        super(props);

        this.state = {
            veterinarios: [],
            vets: null,
            vetDialog: false,
            deleteVetDialog: false,
            vet: this.emptyVet,
            selectedVets: null,
            submitted: false,
            globalFilter: null,
            loading: true,
            totalSize: 0,
            idAux: 0,
        };
        this.onLoad = this.onLoad.bind(this);
        this.openNew = this.openNew.bind(this);
        this.saveVet = this.saveVet.bind(this);
        this.editVet = this.editVet.bind(this);
        this.confirmDeleteVet = this.confirmDeleteVet.bind(this);
        this.deleteVet = this.deleteVet.bind(this);
        this.findIndexById = this.findIndexById.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.hideDeleteVetDialog = this.hideDeleteVetDialog.bind(this);
        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.imageBodyTemplate = this.imageBodyTemplate.bind(this);
        this.onInputUserChange = this.onInputUserChange.bind(this);
    }     

    componentDidMount() {
            this.onLoad();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.idAux !== prevState.idAux){
            this.onLoad();
        }
    }


    onLoad = async e => {
        try {
            api.get("/prestadores/veterinario/").then((response) => {
                this.setState({
                    vets: response.data,
                    loading: false
                })
                console.log(this.state.vets)
            });

        } catch (err){
            console.log("erro: ", err);
        };
    }

    saveVet = async e => {
            let state = { submitted: true };
            let vets = [...this.state.vets];
            let vet = {...this.state.vet};
        
            if ( !vet.user.first_name ) {
                this.setState(
                    {messageError: "O Nome do Vet é obrigatório para realizar o cadastro. W.W"}
                );
                this.toast.show({ severity: 'error', summary: 'Erro', detail: 'O campo nome é obrigatório para o cadastro do vet.', life: 3000 });
            } else {

                if(this.state.vet.id){
                    const index = this.findIndexById(this.state.vet.id);
                    vets[index] = vet;
                    try {
                        api.put(`/prestadores/veterinario/${this.state.vet.id}/`, vet).then(response => console.log(response))
                        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Veterinario atualizado', life: 3000 });
                    } catch (err) {
                        console.log(`Erro: ${err}`)
                    }

                } else {
                    try {
                        api.post('/prestadores/veterinario/', vet).then(response => {
                            console.log(response, vet)
                            this.setState(prevState => ({idAux: prevState.idAux +1}))
                        })
                        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Veterinario adicionado', life: 3000 });
                    } catch (err) {
                        console.log(`Erro: ${err}`)
                        console.log(`Veterinario: ${vet}`)
                    }
                }

                state = {
                    ...state,
                    vets,
                    vetDialog: false,
                    vet: this.emptyVet
                };
        
                this.setState(state);
            }
    }

    editVet(vet) {
            this.setState({
                vet: { ...vet },
                vetDialog: true
            });
    }

    confirmDeleteVet(vet) {
        this.setState({
            vet,
            deleteVetDialog: true
        });
    }

    deleteVet() {
        let vets = this.state.vets.filter(val => val.id !== this.state.vet.id);

        api.delete(`/prestadores/veterinario/${this.state.vet.id}/`)
        this.setState({
            vets,
            deleteVetDialog: false,
            vet: this.emptyVet
        });
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Veterinario deletado', life: 3000 });
    }


    findIndexById(id) {
        let index = - 1;
        for (let i = 0; i < this.state.vets.length; i++) {
            if (this.state.vets[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }
    
    openNew() {
        this.setState({
            vet: this.emptyVet,
            submitted: false,
            vetDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            vetDialog: false
        });
    }

    hideDeleteVetDialog() {
        this.setState({ deleteVetDialog: false });
    }

    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let vet = {...this.state.vet};
        vet[`${name}`] = val;

        this.setState({ vet });
    }

    onInputUserChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let vet = {...this.state.vet};
        let user = { ...this.state.vet.user}
        user[`${name}`] = val;
        vet['user'] = user;
        console.log(vet)
        this.setState({ vet: vet });
    }

    onInputNumberChange(e, name) {
        const val = e.value || 0;
        let vet = {...this.state.vet};
        vet[`${name}`] = val;

        this.setState({ vet });
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
                <Button icon="pi pi-pencil" className="p-button-rounded button-primary mr-2" onClick={() => this.editVet(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-secondary" onClick={() => this.confirmDeleteVet(rowData)} />
            </React.Fragment>
        );
    }

    imageBodyTemplate(rowData) {
        return <img src={`http://127.0.0.1:8000${rowData.imagem}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.imagem} className="product-image" />
    }

    render() {
        let { veterinarios } = this.state 
        const vetDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveVet} />
            </React.Fragment>
        );

        const deleteVetDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteVetDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteVet} />
            </React.Fragment>
        );
        
        const table = (
            <React.Fragment>
                <Toolbar className="mb-4" left={this.leftToolbarTemplate}></Toolbar>
                <DataTable ref={(el) => this.dt = el} value={this.state.vets} selection={this.state.selectedVets} onSelectionChange={(e) => this.setState({ selectedVets: e.value })}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    // globalFilter={this.state.globalFilter} header={header} responsiveLayout="scroll"
                    >
                    <Column field="imagem" header="Imagem" body={this.imageBodyTemplate} ></Column>
                    <Column field="id" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="user.first_name" header="Nome" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="user.last_name" header="Sobrenome" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="user.username" header="Usuario" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="crmv" header="CRMV" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="cpf_cnpj" header="CPF-CNPJ" sortable style={{ minWidth: '12rem' }}></Column>
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
                    <Column field="imagem" header="Imagem" body={<Skeleton shape="circle" size="3rem" className="mr-2"></Skeleton>} ></Column>
                    <Column field="id" header="Código" sortable style={{ minWidth: '12rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="first_name" header="Nome" sortable style={{ minWidth: '16rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="last_name" header="Sobrenome" sortable style={{ minWidth: '8rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="username" header="Usuario" sortable style={{ minWidth: '10rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="crmv" header="CRMV" sortable style={{ minWidth: '12rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="cpf_cnpj" header="CPF-CNPJ" sortable style={{ minWidth: '12rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column exportable={false} style={{ minWidth: '12rem' }} body={skeletonActionButtons}></Column>
                </DataTable>

            </React.Fragment>

        )

        let datatable = skeleton;

        if(!this.state.loading){
            datatable = table;
        }

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
                { veterinarios.map(
                                veterinario =><VeterinariosCard
                                    key={veterinario.id}
                                    id={veterinario.id}
                                    first_name={veterinario.user.first_name}
                                    last_name={veterinario.user.last_name}
                                    username={veterinario.user.username}>
                                </VeterinariosCard>
                            )}
                <Dialog visible={this.state.vetDialog} style={{ width: '750px' }} header="Veterinario Details" modal className="p-fluid" footer={vetDialogFooter} onHide={this.hideDialog}>
                    {/* {this.state.pet.imagem && <img src={`http://127.0.0.1:8000${this.state.pet.imagem}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={this.state.pet.imagem} className="product-image block m-auto pb-3" />} */}
                    
                    <div className="field">
                        <label htmlFor="first_name">Nome</label>
                        <InputText id="first_name" value={this.state.vet.user.first_name} onChange={(e) => this.onInputUserChange(e, 'first_name')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.vet.user.first_name })} />
                        {this.state.submitted && !this.state.vet.user.first_name && <small className="p-error">Nome é obrigatório.</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="last_name">Sobrenome</label>
                        <InputText id="last_name" value={this.state.vet.user.last_name} onChange={(e) => this.onInputUserChange(e, 'last_name')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.vet.user.last_name })} />
                        {this.state.submitted && !this.state.vet.user.last_name && <small className="p-error">Sobrenome é obrigatória.</small>}
                    </div>

                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="email">E-mail</label>
                            <InputText id="email" value={this.state.vet.user.email} onChange={(e) => this.onInputUserChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.vet.user.email })} />
                            {this.state.submitted && !this.state.vet.user.email && <small className="p-error">E-mail é obrigatória.</small>}
                        </div>
                        <div className="field col">
                            <label htmlFor="username">Username</label>
                            <InputText id="username" value={this.state.vet.user.username} onChange={(e) => this.onInputUserChange(e, 'username')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.vet.user.username })} />
                            {this.state.submitted && !this.state.vet.user.username && <small className="p-error">Username é obrigatório.</small>}
                        </div>
                    </div>

                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="crmv">CRMV</label>
                            <InputText id="crmv" value={this.state.vet.crmv} onChange={(e) => this.onInputChange(e, 'crmv')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.vet.crmv })} />
                            {this.state.submitted && !this.state.vet.crmv && <small className="p-error">CRMV é obrigatória.</small>}
                        </div>
                        <div className="field col">
                            <label htmlFor="cpf_cnpj">CPF-CNPJ</label>
                            <InputText id="cpf_cnpj" value={this.state.vet.cpf_cnpj} onChange={(e) => this.onInputChange(e, 'cpf_cnpj')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.vet.cpf_cnpj })} />
                            {this.state.submitted && !this.state.vet.cpf_cnpj && <small className="p-error">CPF-CNPJ é obrigatório.</small>}
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="password">Senha</label>
                            <InputText id="password" type="password" value={this.state.vet.user.password} onChange={(e) => this.onInputUserChange(e, 'password')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.vet.user.password })} />
                            {this.state.submitted && !this.state.vet.user.password && <small className="p-error">Senha é obrigatória.</small>}
                        </div>
                        <div className="field col">
                            <label htmlFor="passwordconfirm">Senha</label>
                            <InputText id="passwordconfirm" type="password" value={this.state.vet.passwordconfirm} onChange={(e) => this.onInputChange(e, 'passwordconfirm')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.vet.passwordconfirm })} />
                            {this.state.submitted && !this.state.vet.passwordconfirm && <small className="p-error">Senha é obrigatório.</small>}
                        </div>
                    </div>

                </Dialog>

                <Dialog visible={this.state.deleteVetDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteVetDialogFooter} onHide={this.hideDeleteVetDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.vet && <span>Você tem certeza que deseja deletar esse Veterinario? <b>{this.state.vet.nome}</b>?</span>}
                    </div>
                </Dialog>

            </React.Fragment>
        )
    }
}

export default Veterinario;