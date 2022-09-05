import React, { Component } from 'react';

import { Fieldset } from 'primereact/fieldset';
import VeterinarioAgendaDayCard from '../VeterinarioAgendaDayCard';

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
            render_day_6: null,
        }
        this.renderDaySchedule = this.renderDaySchedule.bind(this);
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
        let intervalo = this.props.intervalo
        let inicio = this.props.inicio
        let termino = this.props.termino
        let timeArray = [];
        let d = new Date();
        let m = Math.ceil(d.getMinutes() / intervalo) * intervalo;

        console.log(inicio)

        for (let i = inicio-1; i <= termino-1; i++) {
            for (let j = m; j <= 59; j += intervalo) {
                let mf = j === 0 ? '00' : j;
                let hf = i > 12 ? (i - 12) : i;
                let amPm = i >= 12 && i < 24 ? 'PM' : 'AM';
                timeArray.push(hf + ':' + mf + ' ' +  amPm);
            }
            m = 0;
        }


        return(
           <React.Fragment>
                <div className='grid'>

                    {timeArray.map(
                        time => <VeterinarioAgendaDayCard
                        horario={time}></VeterinarioAgendaDayCard>
                    )}
  
                </div>
                
           </React.Fragment>
        )
    }
}

export default VeterinarioAgendaDay;