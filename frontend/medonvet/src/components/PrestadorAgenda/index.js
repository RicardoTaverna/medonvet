import React, { Component } from 'react';
import "./PrestadorAgenda.css"

import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';


import { api } from './../../services/api';
import PrestadorConfigHorario from '../PrestadorConfigHorario'
import VeterinarioAgendaDay from '../VeterinarioAgendaDay';

class PrestadorAgenda extends Component {
    
    today = new Date();
    day = this.today.getDay();
    month = this.today.getMonth();
    year = this.today.getFullYear();

    constructor(props) {
        super(props);
        this.state = {
            today: "",
            monthName: "",
            dayName: this.today.toLocaleString("pt-br", { weekday: 'long' }),
            id: null,
            veterinario: null,
            inicio: 0,
            termino: 0,
            intervalo: 0,
            dia_0: null,
            dia_1: null,
            dia_2: null,
            dia_3: null,
            dia_4: null,
            dia_5: null,
            dia_6: null,


        };
        this.monthTemplate = this.monthTemplate.bind(this);
        this.onLoad = this.onLoad.bind(this);
    }

    componentDidMount(){
        this.onLoad()
        this.setState({
            monthName: this.monthTemplate(),
            // dayName: this.state.today.toLocaleString("pt-br", { weekday: 'long' })
        })
        console.log(this.state.inicio)
    }

    monthTemplate(){
        let monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        return monthNames[this.month]
    }

    onLoad = async e => {
        try {
            await api.get('/agendamento/horarioatendimento/veterinario/').then((response) => {
                this.setState({
                    id: response.data.id,
                    veterinario: response.data.veterinario,
                    inicio: response.data.inicio,
                    termino: response.data.termino,
                    intervalo: response.data.intervalo,
                    domingo: response.data.domingo,
                    segunda_feira: response.data.segunda_feira,
                    terca_feira: response.data.terca_feira,
                    quarta_feira: response.data.quarta_feira,
                    quinta_feira: response.data.quinta_feira,
                    sexta_feira: response.data.sexta_feira,
                    sabado: response.data.sabado,
                })
                console.log(response);
                
            });
        } catch (err) {
            console.log(`Erro: ${err}`)
        }
    }

    render(){

        return(
            <React.Fragment>
                <div>
                    <div className='p-6 '>
                        <div className='grid shadow-5 surface-0'>
                            <div className='col-4 side-panel'>
                                <p class="text-xl w-10">Agenda</p>
                                <div className='mt-3 mb-3'>
                                    <Button label="Criar Evento" icon="pi pi-plus" iconPos="right" className="p-button-outlined col-12" />
                                </div>
                                <Calendar className='col-12' value={this.state.today} onChange={(e) => this.setState({ today: e.value })} inline showWeek />
                                <div className='col-12'>
                                    <PrestadorConfigHorario></PrestadorConfigHorario>
                                </div>
                            </div>
                            <div className='col-8 center-panel'>
                                <div className='grid'>
                                    <div className='col-12 center-top-panel'>
                                        <div className='grid flex align-content-center flex-wrap'>
                                            <div className='col-3 flex align-items-center justify-content-center'>
                                                <p class="text-xl w-10 text-700">{this.state.monthName} {this.year}</p>
                                            </div>
                                            <div className='col-1 flex align-items-center justify-content-center'>
                                                <Button label="Hoje" className="p-button-raised p-button-help p-button-text" />
                                            </div>
                                           
                                        </div>
                                        
                                            
                                    </div>
                                    <div className='col-12'>
                                        <p class="text-xl w-10 ml-2 text-700">{this.state.dayName} {this.state.today}</p>
                                        <VeterinarioAgendaDay
                                        key={1}
                                        inicio={this.state.inicio}
                                        termino={this.state.termino}
                                        intervalo={this.state.intervalo}>

                                        </VeterinarioAgendaDay>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                
            </React.Fragment>
        )
    }
}

export default PrestadorAgenda