import React, { Component } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Toast } from 'primereact/toast';


import { api } from './../../services/api';

class VeterinarioAgendaDayCard extends Component {

    emptyPet = {
        id: null,
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
            render_day_0: null,
            horario: '',
            pets: null,
            pet: this.emptyPet,
            selectedPet: null,
        }
        this.renderDaySchedule = this.renderDaySchedule.bind(this);
        this.onAgendamento = this.onAgendamento.bind(this);
        this.imageBodyTemplate = this.imageBodyTemplate.bind(this);
        this.onOverlay = this.onOverlay.bind(this)
    }

    onOverlay = async e => {
        this.op.toggle(e)
        try {
            api.get("/clientes/pet/").then((response) => {
                this.setState({
                    pets: response.data,
                    loading: false
                })
            });

        } catch (err){
            console.log("erro: ", err);
            this.toast.show({ severity: 'warn', summary: 'Successful', detail: `Problemas no agendamento: ${err};`, life: 3000 });
        };
    }

    onAgendamento = async e => {
        let horarioList = this.props.horario.split(' ')
        let horario_selecionado = horarioList[0]
        let horario = horario_selecionado
        let data = this.props.date
        let veterinario = this.props.veterinario
        let servico = this.props.servicoId
        let pet = e.value.id
        try {
            await api.post('/agendamento/', {data, horario_selecionado, veterinario, servico, pet}).then(
                pet = e.value.nome,
                api.post('/emailer/apointment/', { data, horario, veterinario, pet })
            )
            this.toast.show({ severity: 'info', summary: 'Successful', detail: 'Agendamento Realizado', life: 3000 });
        } catch (err){
            console.log("erro: ", err);
            this.toast.show({ severity: 'warn', summary: 'Successful', detail: `Problemas no agendamento: ${err};`, life: 3000 });
        };
    }


    renderDaySchedule(day, day_number){
        if(this.state.dia_6 === true){
            if(this.day === day_number){
                return true
            }
            return false
        }
        return false
    }

    imageBodyTemplate(rowData) {
        return <img src={`http://127.0.0.1:8000${rowData.imagem}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.imagem} className="product-image" />
    }

    render(){


        return(
           <React.Fragment>
               <Toast ref={(el) => this.toast = el}/>
                <div className='col-4 m-2 p-2'>
                    <Button label={this.props.horario} className="p-button-outlined p-button-plain p-button-lg" onClick={(e) => this.onOverlay(e)} />
                </div>
                
                <OverlayPanel ref={(el) => this.op = el} showCloseIcon id="overlay_panel" style={{width: '450px'}} className="overlaypanel-demo">
                    <DataTable value={this.state.pets} selectionMode="single" paginator rows={5} selection={this.state.selectedPet} onSelectionChange={this.onAgendamento}>
                        <Column field="imagem" header="Imagem" body={this.imageBodyTemplate} ></Column>
                        <Column field="nome" header="Nome" sortable style={{ minWidth: '16rem' }}></Column>
                    </DataTable>
                </OverlayPanel>
           </React.Fragment>
        )
    }
}

export default VeterinarioAgendaDayCard;