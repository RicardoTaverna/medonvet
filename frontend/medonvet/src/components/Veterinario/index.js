import React from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Skeleton } from 'primereact/skeleton';
import VeterinariosCard from '../VeterinariosCard';
import { mask, unMask} from "remask";

import './veterinario.css'

import { api } from '../../services/api';

export class Veterinario extends React.Component {


    emptyVet = {
        user: {
            id: '',
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
        groupname: 'veterinario',
    };

    constructor(props) {
        super(props);

        this.state = {
            veterinarios: [],
            vets: null,
            vetUpdate: null,
            vetDialog: false,
            isVetUpdate: false,
            deleteVetDialog: false,
            vet: this.emptyVet,
            selectedVets: null,
            submitted: false,
            globalFilter: null,
            loading: true,
            totalSize: 0,
            id: 0,
            passwordconfirm: '',
            showFindVet: true,
            isVetFind: false,
            cpf_cnpjMascarado: '',
        };
        this.onLoad = this.onLoad.bind(this); 
        this.openNew = this.openNew.bind(this);
        this.saveVet = this.saveVet.bind(this);
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
        this.findVet = this.findVet.bind(this);
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

    findVet = async e => {
        let cpf_cnpj = this.state.vet.cpf_cnpj
        try {
            api.get(`/prestadores/veterinario/${this.state.vet.cpf_cnpj}/`).then((response) => {
                console.log(response.data)
                
                if(Object.keys(response.data).length !== 0){
                    this.setState({
                        vet: response.data,
                        showFindVet: false,
                        isVetFind: true
                    })
                } else {
                    this.emptyVet.cpf_cnpj = cpf_cnpj
                    this.setState({
                        showFindVet: false,
                        vet: this.emptyVet,
                    })
                }
            })
        } catch (err){
            console.log("erro: ", err);
        };
    }


    onLoad = async e => {
        try {
            api.get("/prestadores/veterinarios/").then((response) => {
                console.log(response)
                this.setState({
                    vets: response.data,
                    cpf_cnpj: response.data.cpf_cnpj,
                    loading: false
                })
            });

        } catch (err){
            console.log("erro: ", err);
        };
    }

    saveVet = async e => {
        let state = { submitted: true };
        let vets = [...this.state.vets];
        let vet = {...this.state.vet};
        let vetUpdate = { ...this.state.vet};
        const cpfOrCnpj = require('js-cpf-cnpj-validation'); 
        vetUpdate['user'] = vetUpdate.user.id

        if(this.state.vet.id){
            const index = this.findIndexById(this.state.vet.id);
            vets[index] = vet;
            try {
                api.post(`/prestadores/prestadorveterinario/`, {"veterinario": this.state.vet.id}).then(response =>{
                    console.log(response)
                    this.setState(prevState => ({id: prevState.id + 1}))
                })
                
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Veterinario atualizado', life: 3000 });
                this.setState({
                    passwordconfirm: ''
                })
                
                console.log(vets)
                
            } catch (err) {
                console.log(`Erro: ${err}`)
            }

        } else {
            if ( !vet.user.first_name ) {
                this.setState(
                    {messageError: "O Nome do Vet é obrigatório para realizar o cadastro. W.W"}
                );
                this.toast.show({ severity: 'error', summary: 'Erro', detail: 'O campo nome é obrigatório para o cadastro do vet.', life: 3000 });
            }else if (vet.user.password !== this.state.passwordconfirm) {
                this.toast.show({ severity: 'error', summary: 'Erro', detail: "As senhas não coincidem!", life: 3000 });
            } else if(cpfOrCnpj.isCPForCNPJ(this.state.vet.cpf_cnpj)) {

                try {
                    api.post('/prestadores/veterinarios/', vet).then(response => {
                        console.log(response, vet)
                        console.log(this.state.vet.cpf_cnpj)
                        console.log("deu boa")
                        api.get(`/prestadores/veterinario/${this.state.vet.cpf_cnpj}/`).then((response) => {
                            this.setState({
                                vet: response.data
                            })
                            api.post(`/prestadores/prestadorveterinario/`, {"veterinario": this.state.vet.id}).then(response => {
                                this.setState(prevState => ({id: prevState.id + 1}))
                            })
                        })
                    })
                    this.setState({passwordconfirm: ''})
                    this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Veterinario adicionado', life: 3000 });
                } catch (err) {
                    console.log(`Erro: ${err}`)
                    console.log(`Veterinario: ${vet}`)
                    this.setState(
                        {messageError: `Erro: ${err} \n Veterinario: ${vet}`},
                        () => this.showError()
                    );
                }
            }else{
                this.setState(
                    {messageError: "CPF ou CNPJ não é valido"},
                    () => this.showError()
                );
            }
        }

        state = {
            ...state,
            vets,
            vetDialog: false,
            vet: this.emptyVet,
            vetUpdate: null,
            showFindVet: true,
            isVetFind: false
        };

        this.setState(state);
    }

    confirmDeleteVet(vet) {
        this.setState({
            vet,
            deleteVetDialog: true
        });
    }

    deleteVet() {
        let vets = this.state.vets.filter(val => val.id !== this.state.vet.id);
        console.log(this.state.vets.id)
        api.delete(`/prestadores/prestadorveterinario/${this.state.vet.id}/`)
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
            vetDialog: true,
            isVetUpdate: false
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            vetDialog: false,
            showFindVet: true,
            isVetFind: false
        });
    }

    hideDeleteVetDialog() {
        this.setState({ deleteVetDialog: false });
    }

    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let vet = {...this.state.vet};
        if( name === "cpf_cnpj"){
            const valorOriginal = unMask(e.target.value)
            const valorMascarado = mask(valorOriginal,[
                '999.999.999-99',
                '99.999.999/9999-99'
            ]);
            vet[`${name}`] = unMask(valorMascarado);
            this.setState({ vet });
            return valorMascarado;

        }else{
            vet[`${name}`] = val;

            this.setState({ vet });
        }
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-secondary" onClick={() => this.confirmDeleteVet(rowData)} />
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
        let dialog = ""
        let findVet = (
            <Dialog visible={this.state.vetDialog} style={{ width: '750px' }} header="Cadastrar Novo Veterinário" modal className="p-fluid"  onHide={this.hideDialog}>
            
                <div className="grid p-fluid">
                    <p>Digite o CPF ou CNPJ a ser cadastrado, se ele já existir em nossa base de dados traremos as informações preenchidas. =)</p>
                    <div className="col-12 md:col-12">
                        <div className="p-inputgroup">
                            <InputText placeholder="CPF ou CNPJ" value={this.state.cpf_cnpjMascarado} onChange={(e) => this.setState({cpf_cnpjMascarado: this.onInputChange(e, 'cpf_cnpj')})} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.cpf_cnpjMascarado })} />
                            <Button label="Localizar Cadastro" onClick={this.findVet}/>
                        </div>
                    </div>
                </div>

            </Dialog>

        )
        

        let vetForm = (
            <Dialog visible={this.state.vetDialog} style={{ width: '750px' }} header="Cadastrar Novo Veterinário" modal className="p-fluid" footer={vetDialogFooter} onHide={this.hideDialog}>

                <div className="field">
                    <label htmlFor="first_name">Nome</label>
                    <InputText id="first_name" value={this.state.vet.user.first_name} onChange={(e) => this.onInputUserChange(e, 'first_name')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.vet.user.first_name })} disabled={this.state.isVetFind}/>
                    {this.state.submitted && !this.state.vet.user.first_name && <small className="p-error">Nome é obrigatório.</small>}
                </div>

                <div className="field">
                    <label htmlFor="last_name">Sobrenome</label>
                    <InputText  id="last_name" value={this.state.vet.user.last_name} onChange={(e) => this.onInputUserChange(e, 'last_name')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.vet.user.last_name })} disabled={this.state.isVetFind}  />
                    {this.state.submitted && !this.state.vet.user.last_name && <small className="p-error">Sobrenome é obrigatória.</small>}
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="email">E-mail</label>
                        <InputText id="email" value={this.state.vet.user.email} onChange={(e) => this.onInputUserChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.vet.user.email })} disabled={this.state.isVetFind} />
                        {this.state.submitted && !this.state.vet.user.email && <small className="p-error">E-mail é obrigatória.</small>}
                    </div>
                    <div className="field col">
                        <label htmlFor="username">Username</label>
                        <InputText id="username" value={this.state.vet.user.username} onChange={(e) => this.onInputUserChange(e, 'username')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.vet.user.username })} disabled={this.state.isVetFind}  />
                        {this.state.submitted && !this.state.vet.user.username && <small className="p-error">Username é obrigatório.</small>}
                    </div>
                </div>

                <div className="formgrid grid" >
                    <div className="field col" hidden={this.state.isVetFind}>
                        <label htmlFor="password">Senha</label>
                        <InputText id="password" type="password" value={this.state.vet.user.password} onChange={(e) => this.onInputUserChange(e, 'password')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.vet.user.password })}/>
                        {this.state.submitted && !this.state.vet.user.password && <small className="p-error">Senha é obrigatória.</small>}
                    </div>
                    <div className="field col" hidden={this.state.isVetFind}>
                        <label htmlFor="passwordconfirm">Confirmação de Senha</label>
                        <InputText id="passwordconfirm" type="password" value={this.state.passwordconfirm} onChange={(e) => this.setState({passwordconfirm: e.target.value})} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.passwordconfirm })} />
                        {this.state.submitted && !this.state.passwordconfirm && <small className="p-error">Senha é obrigatório.</small>}
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="crmv">CRMV</label>
                        <InputText id="crmv" value={this.state.vet.crmv} onChange={(e) => this.onInputChange(e, 'crmv')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.vet.crmv })} disabled={this.state.isVetFind}/>
                        {this.state.submitted && !this.state.vet.crmv && <small className="p-error">CRMV é obrigatória.</small>}
                    </div>
                    <div className="field col">
                        <label htmlFor="cpf_cnpj">CPF-CNPJ</label>
                        <InputText id="cpf_cnpj" value={this.state.cpf_cnpjMascarado} onChange={(e) => this.setState({cpf_cnpjMascarado: this.onInputChange(e, 'cpf_cnpj')})} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.cpf_cnpjMascarado })} disabled={this.state.isVetFind}/>
                        {this.state.submitted && !this.state.cpf_cnpjMascarado && <small className="p-error">CPF-CNPJ é obrigatório.</small>}
                    </div>
                </div>

                <div className="field col-12 md:col-12" hidden={this.state.isVetFind}>
                    <label htmlFor="descricao" className="font-medium mb-2">Biografia</label>
                    <InputTextarea  id="descricao" rows={5} value={this.state.descricao} className={classNames({ 'p-invalid': this.state.submitted && !this.state.vet.descricao })} onChange={(e) => this.setState({descricao: e.target.value})}/>
                </div>
            </Dialog>
                    
        )

        if (this.state.showFindVet) {
            dialog = findVet   
        } else {
            dialog = vetForm
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

                <Dialog visible={this.state.vetDialog} style={{ width: '750px' }} header="Cadastrar Novo Veterinário" modal className="p-fluid" footer={vetDialogFooter} onHide={this.hideDialog}>
                    {dialog}

                </Dialog>

                <Dialog visible={this.state.deleteVetDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteVetDialogFooter} onHide={this.hideDeleteVetDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.vet && <span>Você tem certeza que deseja deletar esse Veterinario? <b>{this.state.vet.user.first_name}</b>?</span>}
                    </div>
                </Dialog>

            </React.Fragment>
        )
    }
}

export default Veterinario;