import React, { Component } from 'react';

import { Fieldset } from 'primereact/fieldset';

class VeterinarioAgendaDayCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render_day_0: null,
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


        return(
           <React.Fragment>
            <div className='col-4'>
                <Fieldset legend={this.props.horario}>
                    <p>Agendamento</p>
                </Fieldset>
            </div>
                
           </React.Fragment>
        )
    }
}

export default VeterinarioAgendaDayCard;