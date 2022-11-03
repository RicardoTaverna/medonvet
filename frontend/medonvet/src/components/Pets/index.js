import React from 'react';
import {v4 as uuidv4} from 'uuid';

import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Skeleton } from 'primereact/skeleton';

import './pets.css'

import { api, imgApi } from '../../services/api';
import AplicacoesPetInfo from '../AplicacaoPetInfo';
import PetsAgendamento from '../PetsAgendamentos';

export class Pets extends React.Component {

    _isMounted = false;

    emptyPet = {
        id: null,
        imagem:"",
        nome: '',
        peso: 0,
        raca: '',
        tipo: '',
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
            consultasDialog: false,
            aplicacoesDialog: false,
            pet: this.emptyPet,
            selectedPets: null,
            submitted: false,
            globalFilter: null,
            loading: true,
            totalSize: 0,
            id: 0
        };
        this.onLoad = this.onLoad.bind(this);
        this.openNew = this.openNew.bind(this);
        this.savePet = this.savePet.bind(this);
        this.editPet = this.editPet.bind(this);
        this.confirmDeletePet = this.confirmDeletePet.bind(this);
        this.deletePet = this.deletePet.bind(this);
        this.findIndexById = this.findIndexById.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.hideDeletePetDialog = this.hideDeletePetDialog.bind(this);
        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.imageBodyTemplate = this.imageBodyTemplate.bind(this);
        this.consultasPet = this.consultasPet.bind(this);
        this.aplicacoesPet = this.aplicacoesPet.bind(this);
        this.onUploadImage = this.onUploadImage.bind(this);
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
            api.get("/clientes/pet/").then((response) => {
                this.setState({
                    pets: response.data,
                    loading: false
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
            
            
            if ( !pet.nome ) {
                this.setState(
                    {messageError: "O Nome do pet é obrigatório para realizar o cadastro. W.W"}
                );
                this.toast.show({ severity: 'error', summary: 'Erro', detail: 'O campo nome é obrigatório para o cadastro do pet.', life: 3000 });
            } else {

                if(this.state.pet.id){
                    const index = this.findIndexById(this.state.pet.id);
                   
                    pets[index] = pet;
                    try {
                        api.put(`/clientes/pet/${this.state.pet.id}/`, pet).then(response => console.log(response))
                        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Pet atualizado', life: 3000 });
                    } catch (err) {
                        console.log(`Erro: ${err}`)
                    }

                } else {
                    try {
                        api.post('/clientes/pet/', pet).then(response  => {
                            console.log(response, pet)
                            this.setState(prevState => ({id: prevState.id + 1}))
                     })
                        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Pet adicionado', life: 3000 });
                    } catch (err) {
                        console.log(`Erro: ${err}`)
                        console.log(`Pet: ${pet}`)
                    }
                }

                state = {
                    ...state,
                    pets,
                    petDialog: false,
                    pet: this.emptyPet
                };
        
                this.setState(state);
            }
    }

    editPet(pet) {
            this.setState({
                pet: { ...pet },
                petDialog: true
            });
    }

    confirmDeletePet(pet) {
        this.setState({
            pet,
            deletePetDialog: true
        });
    }

    deletePet() {

            let pets = this.state.pets.filter(val => val.id !== this.state.pet.id);
    
            api.delete(`/clientes/pet/${this.state.pet.id}/`)
            this.setState({
                pets,
                deletePetDialog: false,
                pet: this.emptyPet
            });
            this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Pet deletado', life: 3000 });
    }

    consultasPet(pet){
        this.setState({
            pet: { ...pet },
            consultasDialog: true
        });
    }

    aplicacoesPet(pet){
        this.setState({
            pet: { ...pet },
            aplicacoesDialog: true
        });
    }


    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.state.pets.length; i++) {
            if (this.state.pets[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
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
            petDialog: false,
            aplicacoesDialog: false,
            consultasDialog: false, 
        });
    }

    hideDeletePetDialog() {
        this.setState({ deletePetDialog: false });
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
                <Button label="Adicionar" icon="pi pi-plus" className="button-primary mr-2" onClick={this.openNew} />
            </React.Fragment>
        )
    }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-heart-fill" className="p-button-rounded p-button-primary mr-2" onClick={() => this.consultasPet(rowData)}/>
                <Button icon="pi pi-shield" className="p-button-rounded p-button-success mr-2" onClick={() => this.aplicacoesPet(rowData)}/>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-secondary mr-2" onClick={() => this.editPet(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => this.confirmDeletePet(rowData)} />
            </React.Fragment>
        );
    }

    imageBodyTemplate(rowData) {
        return <img src={rowData.imagem} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.imagem} className="product-image" />
    }

    async onUploadImage(event){
        const file = event.files[0];
        let blob = await fetch(file.objectURL).then(r => r.blob()); //blob:url
        let in_file = blob
        let userid = this.state.pet.id
        let uid = uuidv4()

        const formData = new FormData()
        formData.append('userid', userid)
        formData.append('in_file', in_file)
        formData.append('uid', uid)

        try{
            await imgApi.post('/image/', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then((response) => {
                console.log(response)
                let imagem = `http://127.0.0.1:8001${response.data.data[0].image_url}`
                api.put(`/clientes/pet/${userid}/`, { imagem })
            })
        } catch (err) {
            console.log(`Erro: ${err}`)
        }
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
        
        const table = (
            <React.Fragment>
                <Toolbar className="mb-4" left={this.leftToolbarTemplate}></Toolbar>
                <DataTable ref={(el) => this.dt = el} value={this.state.pets} selection={this.state.selectedPets} onSelectionChange={(e) => this.setState({ selectedPets: e.value })}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    // globalFilter={this.state.globalFilter} header={header} responsiveLayout="scroll"
                    >
                    <Column field="imagem" header="Imagem" body={this.imageBodyTemplate} ></Column>
                    <Column field="id" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="nome" header="Nome" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="peso" header="Peso" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="raca" header="Raça" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="tipo" header="Tipo" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="data_nascimento" header="Idade" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="sexo" header="Sexo" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column body={this.actionBodyTemplate} exportable={false} style={{ minWidth: '16rem' }}></Column>
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
                    <Column field="nome" header="Nome" sortable style={{ minWidth: '16rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="peso" header="Peso" sortable style={{ minWidth: '8rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="raca" header="Raça" sortable style={{ minWidth: '10rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="idade" header="Idade" sortable style={{ minWidth: '12rem' }} body={<Skeleton></Skeleton>}></Column>
                    <Column field="sexo" header="Sexo" sortable style={{ minWidth: '12rem' }} body={<Skeleton></Skeleton>}></Column>
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

                <Dialog visible={this.state.petDialog} style={{ width: '750px' }} header="Pet Detalhes" modal className="p-fluid" footer={petDialogFooter} onHide={this.hideDialog}>
                    {/* {this.state.pet.imagem && <img src={`http://127.0.0.1:8000${this.state.pet.imagem}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={this.state.pet.imagem} className="product-image block m-auto pb-3" />} */}
                    <div className="field">
                        <FileUpload chooseLabel="Imagem do Pet" mode="basic" name="demo[]" accept="image/*" maxFileSize={1000000} customUpload uploadHandler={this.onUploadImage} />
                    </div>

                    <div className="field">
                        <label htmlFor="nome">Nome</label>
                        <InputText id="nome" value={this.state.pet.nome} onChange={(e) => this.onInputChange(e, 'nome')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.pet.nome })} />
                        {this.state.submitted && !this.state.pet.nome && <small className="p-error">Nome é obrigatório.</small>}
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="raca">Raça</label>
                            <InputText id="raca" value={this.state.pet.raca} onChange={(e) => this.onInputChange(e, 'raca')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.pet.raca })} />
                            {this.state.submitted && !this.state.pet.raca && <small className="p-error">Raça é obrigatória.</small>}
                        </div>
                        <div className="field col">
                            <label htmlFor="tipo">Tipo</label>
                            <InputText id="tipo" value={this.state.pet.tipo} onChange={(e) => this.onInputChange(e, 'tipo')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.pet.tipo })} />
                            {this.state.submitted && !this.state.pet.tipo && <small className="p-error">Tipo do pet é obrigatório (Cachorro, gato...).</small>}
                        </div>
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

                <Dialog visible={this.state.consultasDialog} style={{ width: '950px' }} header="Consultas Realizadas" modal className="p-fluid" onHide={this.hideDialog}>
                    <PetsAgendamento
                        key={this.state.pet.id}
                        id={this.state.pet.id}
                    >

                    </PetsAgendamento>
                </Dialog>

                <Dialog visible={this.state.aplicacoesDialog} style={{ width: '950px' }} header="Carteirinha de Aplicações" modal className="p-fluid" onHide={this.hideDialog}>
                    <div class="card">
                        <div class="grid">
                            <div class="col-4 sticky top-0">
                               <img src={this.state.pet.imagem} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={this.state.pet.imagem} className="product-image" />
                            </div>
                            <div class="col-8">
                                <AplicacoesPetInfo
                                key={this.state.pet.id}
                                id={this.state.pet.id}
                                >
                                </AplicacoesPetInfo>
                            </div>
                        </div>
                    </div>
                </Dialog>


            </React.Fragment>
        )
    }
}

export default Pets;