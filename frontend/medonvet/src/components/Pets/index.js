import React from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './pets.css'

import { api } from '../../services/api';

export class Pets extends React.Component {

    emptyPet = {
        id: null,
        nome: '',
        peso: 0,
        raca: '',
        idade_anos: 0,
        idade_meses: 0,
        sexo: ''
    };

    constructor(props) {
        super(props);

        this.state = {
            pets: null,
            petDialog: false,
            deletePetDialog: false,
            deletePetsDialog: false,
            pet: this.emptyPet,
            selectedPets: null,
            submitted: false,
            globalFilter: null
        };
        this.onLoad = this.onLoad.bind(this);
        this.savePet = this.savePet.bind(this);
        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
        this.confirmDeletePet = this.confirmDeletePet.bind(this);
        this.deletePet = this.deletePet.bind(this);
        this.hideDeleteProductDialog = this.hideDeleteProductDialog.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    }     

    componentDidMount() {
        this.onLoad();
    }

    onLoad = async e => {
        try {
            api.get("/clientes/pet/").then((response) => {
                this.setState({
                    pets: response.data
                })
            });

        } catch (err){
            console.log("erro: ", err);
        };
    }

    savePet = async e => {
        let state = { submitted: true };
        let pets = [...this.state.pets];
        let pet = {...this.state.pet};

        try {
            api.post('/clientes/pet/', pet).then(response => console.log(response))
            this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Pet adicionado', life: 3000 });
        } catch (err) {

            console.log(`Erro: ${err}`)
        }

        state = {
            ...state,
            pets,
            petDialog: false,
            pet: this.emptyPet
        };

        this.setState(state);
    }

    confirmDeletePet(pet) {
        this.setState({
            pet,
            deletePetDialog: true
        });
    }

    deletePet() {
        let pets = this.state.pets.filter(val => val.id !== this.state.pet.id);
        api.delete(`/clientes/pet/${this.state.pet.id}`)
        this.setState({
            pets,
            deletePetDialog: false,
            pet: this.emptyProduct
        });
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Pet foi deletado com sucesso', life: 3000 });
    }
    
    openNew() {
        this.setState({
            pet: this.emptyPet,
            submitted: false,
            petDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            petDialog: false
        });
    }

    hideDeleteProductDialog() {
        this.setState({ deleteProductDialog: false });
    }

    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let pet = {...this.state.pet};
        pet[`${name}`] = val;

        this.setState({ pet });
    }

    onInputNumberChange(e, name) {
        const val = e.value || 0;
        let pet = {...this.state.pet};
        pet[`${name}`] = val;

        this.setState({ pet });
    }

    leftToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="Adicionar" icon="pi pi-plus" className="p-button-success mr-2" onClick={this.openNew} />
                <Button label="Deletar" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedProducts || !this.state.selectedProducts.length} />
            </React.Fragment>
        )
    }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => this.editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeletePet(rowData)} />
            </React.Fragment>
        );
    }

    render() {

        const petDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.savePet} />
            </React.Fragment>
        );

        const deletePetDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeletePetDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deletePet} />
            </React.Fragment>
        );


        return(
            <React.Fragment>
                <div className="p-6">
                    <div className="datatable-crud-demo">
                        <Toast ref={(el) => this.toast = el} />

                        <div className="card">
                            <Toolbar className="mb-4" left={this.leftToolbarTemplate} right={this.rightToolbarTemplate}></Toolbar>

                            <DataTable ref={(el) => this.dt = el} value={this.state.pets} selection={this.state.selectedPets} onSelectionChange={(e) => this.setState({ selectedPets: e.value })}
                                dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                                // globalFilter={this.state.globalFilter} header={header} responsiveLayout="scroll"
                                >
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="imagem" header="Imagem" ></Column>
                                <Column field="id" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="nome" header="Nome" sortable style={{ minWidth: '16rem' }}></Column>
                                <Column field="peso" header="Peso" sortable style={{ minWidth: '8rem' }}></Column>
                                <Column field="raca" header="Raça" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column field="idade" header="Idade" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="sexo" header="Sexo" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column body={this.actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>

                <Dialog visible={this.state.petDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={petDialogFooter} onHide={this.hideDialog}>
                    {this.state.pet.image && <img src={`images/product/${this.state.product.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={this.state.product.image} className="product-image block m-auto pb-3" />}
                    <div className="field">
                        <label htmlFor="nome">Nome</label>
                        <InputText id="nome" value={this.state.pet.nome} onChange={(e) => this.onInputChange(e, 'nome')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.pet.nome })} />
                        {this.state.submitted && !this.state.pet.nome && <small className="p-error">Nome é obrigatório.</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="raca">Raça</label>
                        <InputText id="raca" value={this.state.pet.raca} onChange={(e) => this.onInputChange(e, 'raca')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.pet.raca })} />
                        {this.state.submitted && !this.state.pet.raca && <small className="p-error">Raça é obrigatória.</small>}
                    </div>

                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="peso">Peso</label>
                            <InputNumber id="peso" value={this.state.pet.peso} onValueChange={(e) => this.onInputNumberChange(e, 'peso')} />
                        </div>
                        <div className="field col">
                            <label htmlFor="sexo">Sexo</label>
                            <InputText id="sexo" value={this.state.pet.sexo} onChange={(e) => this.onInputChange(e, 'sexo')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.pet.sexo })} />
                            {this.state.submitted && !this.state.pet.sexo && <small className="p-error">Sexo é obrigatório.</small>}
                        </div>
                    </div>

                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="idade_anos">Idade Anos</label>
                            <InputNumber id="idade_anos" value={this.state.pet.idade_anos} onValueChange={(e) => this.onInputNumberChange(e, 'idade_anos')} integeronly/>
                        </div>
                        <div className="field col">
                            <label htmlFor="idade_meses">Idade Meses</label>
                            <InputNumber id="idade_meses" value={this.state.pet.idade_meses} onValueChange={(e) => this.onInputNumberChange(e, 'idade_meses')} integeronly />
                        </div>
                    </div>
                </Dialog>

                <Dialog visible={this.state.deletePetDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePetDialogFooter} onHide={this.hideDeletePetDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.pet && <span>Você tem certeza que deseja deletar esse pet? <b>{this.state.pet.nome}</b>?</span>}
                    </div>
                </Dialog>

                {/* <Dialog visible={this.state.deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={this.hideDeleteProductsDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.product && <span>Are you sure you want to delete the selected products?</span>}
                    </div>
                </Dialog> */}

            </React.Fragment>
        )
    }
}

export default Pets;