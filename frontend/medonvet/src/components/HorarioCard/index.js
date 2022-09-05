import React, { Component } from 'react';

import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { api } from './../../services/api';

class VeterinarioAgendaDayCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render_day_0: null,
            horario: ''
        }
        this.renderDaySchedule = this.renderDaySchedule.bind(this);
        this.onAgendamento = this.onAgendamento.bind(this);
    }

    onAgendamento = async e => {

        let horarioList = this.props.horario.split(' ')
        let horario_selecionado = horarioList[0]
        let data = this.props.date.toISOString().slice(0, 10)
        let funcionamento = this.props.horarioId
        let servico = this.props.servicoId
        try {
            api.post('/agendamento/', {data, horario_selecionado, funcionamento, servico})
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

    render(){


        return(
           <React.Fragment>
               <Toast ref={(el) => this.toast = el}/>
                <div className='col-4'>
                    <Button label={this.props.horario} className="p-button-raised p-button-text p-button-plain" onClick={() => this.onAgendamento()} />
                </div>
                
           </React.Fragment>
        )
    }
}

export default VeterinarioAgendaDayCard;