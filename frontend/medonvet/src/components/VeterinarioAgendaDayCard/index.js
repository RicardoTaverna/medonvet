import React, { Component } from 'react';
import './VeterinarioAgendaDayCard.css'

import { Chip } from 'primereact/chip';
import { Fieldset } from 'primereact/fieldset';

import { api } from '../../services/api';

class VeterinarioAgendaDayCard extends Component {

    empty_agenda = {
        cliente: null,
        servico: null,
        pet: null,
        data: "",
        horario_selecionado: ""
    }

    constructor(props) {
        super(props);
        this.state = {
            render_day_0: null,
            agendas: [],
        }
        this.renderDaySchedule = this.renderDaySchedule.bind(this);
        this.onLoad = this.onLoad.bind(this);
    }

    componentDidMount(){
        this.onLoad()
    }

    onLoad = async e => {
        try {
            api.get('/agendamento/veterinario/').then((response) => {
                this.setState({ agendas: response.data })
            });
        } catch (err) {
            console.log(`Erro: ${err}`)
        }
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
        let content

        for(let i = 0; i < this.state.agendas.length; i++){
            console.log(this.state.agendas[i].horario_selecionado, this.props.horario)
            if(this.state.agendas[i].horario_selecionado === this.props.horario){
                content = (<Chip label={this.state.agendas[i].pet.nome} image="images/avatar/onyamalimba.png" className="mr-2 mb-2 custom-chip" />)
            } else {
                content = (<p>sem agendamento</p>)
            }
        }
        // console.log(this.state.agenda.horario_selecionado, this.props.horario)

        return(
           <React.Fragment>
            <div className='col-4'>
                <Fieldset legend={this.props.horario}>
                    {content}
                </Fieldset>
            </div>
                
           </React.Fragment>
        )
    }
}

export default VeterinarioAgendaDayCard;