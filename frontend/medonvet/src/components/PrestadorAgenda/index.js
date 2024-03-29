import React, { Component } from 'react';
import "./PrestadorAgenda.css"

import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Fieldset } from 'primereact/fieldset';
import { Chip } from 'primereact/chip';


import { api } from './../../services/api';
import PrestadorConfigHorario from '../PrestadorConfigHorario'

class PrestadorAgenda extends Component {
    
    today = new Date();
    day = this.today.getDay();
    thisDay = this.today.getDate();
    month = this.today.getMonth();
    year = this.today.getFullYear();

    constructor(props) {
        super(props);
        this.state = {
            today: this.today,
            weekday: "",
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
            timeArray: [],
            agendamento: [],


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
                    dia_0: response.data.dia_0,
                    dia_1: response.data.dia_1,
                    dia_2: response.data.dia_2,
                    dia_3: response.data.dia_3,
                    dia_4: response.data.dia_4,
                    dia_5: response.data.dia_5,
                    dia_6: response.data.dia_6,
                    weekday: this.day,
                })
                console.log('vet = ', response.data.veterinario)
                
            });
            await api.get(`/agendamento/veterinario/${this.state.veterinario}/${this.state.today.toISOString().slice(0, 10)}/`).then((response) => {
                this.setState({ agendamento: response.data })
            });
        } catch (err) {
            console.log(`Erro: ${err}`)
        }

        let intervalo = this.state.intervalo
        let inicio = this.state.inicio
        let termino = this.state.termino
        let timeArray = [];
        let d = new Date();
        let m = Math.ceil(d.getMinutes() / intervalo) * intervalo;

        for (let i = inicio-1; i <= termino-1; i++) {
            for (let j = m; j <= 59; j += intervalo) {
                let mf = j === 0 ? '00' : j;
                let hf = i > 24 ? i : i;

                let flag = false
                for(let count = 0; count < this.state.agendamento.length; count ++){
                    if(this.state.agendamento[count].horario_selecionado === hf + ':' + mf){
                        flag = true;
                    }
                }
                if(flag){
                    timeArray.push(hf + ':' + mf);
                }
            }
            m = 0;
        }
        this.setState({ timeArray: timeArray })

    }

    render(){

        let { timeArray } = this.state

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
                                            <div className='col-5 flex align-items-center justify-content-center'>
                                                <p class="text-xl w-10 ml-2 mr-2 text-700">{this.state.dayName} - {this.state.today.getDate()}</p>
                                                <p class="text-xl w-10 text-700">{this.state.monthName} {this.year}</p>
                                            </div>
                                           
                                        </div>
                                        
                                            
                                    </div>
                                    <div className='col-12'>
                                        
                                        <div className='grid'>

                                            {timeArray.map(
                                                time => <div className='col-4'>
                                                            <Fieldset legend={time}>
                                                                <Chip label="Nome" className="mr-2 mb-2 bg-primary" />
                                                            </Fieldset>
                                                        </div>
                                            )}

                                        </div>
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