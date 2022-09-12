import React, { Component } from 'react';

import { Fieldset } from 'primereact/fieldset';
import { Chip } from 'primereact/chip';

import { api } from './../../services/api';

class VeterinarioAgendaDay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render_day_0: null,
            render_day_1: null,
            render_day_2: null,
            render_day_3: null,
            render_day_4: null,
            render_day_5: null,

            timeArray: [],
            agendamento: [],
        }
        this.renderDaySchedule = this.renderDaySchedule.bind(this);
        this.onRender = this.onRender.bind(this);
    }  

    componentDidMount(){
        this.onRender();
    }

    onRender = async e => {
        try {
            await api.get(`/agendamento/veterinario/${this.props.veterinario}/${this.props.date}/`).then((response) => {
                this.setState({ agendamento: response.data })
            })
        } catch (err){
            console.log("erro: ", err);
        };

        let intervalo = this.props.intervalo
        let inicio = this.props.inicio
        let termino = this.props.termino
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


    renderDaySchedule(day, day_number){
        if(this.state.dia_6 === true){
            if(this.day === day_number){
                return true
            }
            return false
        }
        return false
    }

    render(){

        let { timeArray } = this.state

        return(
           <React.Fragment>
                <div className='grid'>

                    {timeArray.map(
                        time => <div className='col-4'>
                                    <Fieldset legend={time}>
                                        <Chip label="Nome" className="mr-2 mb-2 custom-chip" />
                                    </Fieldset>
                                </div>
                    )}
  
                </div>
                
           </React.Fragment>
        )
    }
}

export default VeterinarioAgendaDay;