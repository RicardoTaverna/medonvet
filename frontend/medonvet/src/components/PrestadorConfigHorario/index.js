import React, { Component } from 'react';

import { Button } from 'primereact/button';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import { ToggleButton } from 'primereact/togglebutton';

import { api } from './../../services/api';

class PrestadorConfigHorario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageError: "",
            id: null,
            veterinario: null,
            inicio: null,
            termino: null,
            intervalo: "",
            dia_0: false,
            dia_1: false,
            dia_2: false,
            dia_3: false,
            dia_4: false,
            dia_5: false,
            dia_6: false,

        }
        this.onLoad = this.onLoad.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount(){
        this.onLoad()
    }

    onLoad = async e => {
        try {
            api.get('/agendamento/horarioatendimento/veterinario/').then((response) => {
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
                })
                console.log(response);
            });
        } catch (err) {
            console.log(`Erro: ${err}`)
        }
    }

    onUpdate = async e => {
        const { id, veterinario, inicio, termino, intervalo, dia_0, dia_1, dia_2, dia_3, dia_4, dia_5, dia_6} = this.state
        try {
            const response = await api.put(`/agendamento/horarioatendimento/${id}/`, { 
                veterinario,
                inicio,
                termino,
                intervalo,
                dia_0,
                dia_1,
                dia_2,
                dia_3,
                dia_4,
                dia_5,
                dia_6
             });
            console.log(response)    
            this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Horário de funcionamento atualizado', life: 3000 });        
        } catch (err) {
            this.toast.show({ severity: 'error', summary: 'Erro', detail: `Houve um problema com a atualização, verifique seus os dados inseridos. T.T - ${err}`, life: 3000 });
        } 
    }

    render(){

        return(

            <React.Fragment>
                <Toast ref={(el) => this.toast = el} />
                
                <div className="text-3xl font-mediumtext-900 mb-3">Horário de Funcionamento</div>
                <div className="font-medium text-500 mb-3">Atualize suas informações de funcionamento para disponibilizar a agenda.</div>

                <div className="p-fluid grid">
                    <div className="field col-12 md:col-5">
                        <span className="p-float-label">
                            <InputNumber inputId="inicio" value={this.state.inicio} onValueChange={(e) => this.setState({inicio: e.value})} mode="decimal" showButtons min={0} max={23} />
                            <label htmlFor="inicio" className="font-medium mb-2">Horario de Inicio</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-5">                                 
                        <span className="p-float-label">
                            <InputNumber inputId="termino" value={this.state.termino} onValueChange={(e) => this.setState({termino: e.value})} mode="decimal" showButtons min={1} max={24} />
                            <label htmlFor="termino" className="font-medium mb-2">Horario de Termino</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-10">
                        <span className="p-float-label">
                            <InputNumber inputId="intervalo" value={this.state.intervalo} onValueChange={(e) => this.setState({intervalo: e.value})} mode="decimal" showButtons min={0} max={720} />
                            <label htmlFor="intervalo" className="font-medium mb-2">Intervalo Atendimento</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <ToggleButton checked={this.state.dia_0} onChange={(e) => this.setState({dia_0: e.value})} onLabel="Domingo" offLabel="Domingo" onIcon="pi pi-check" offIcon="pi pi-times" className="w-full sm:w-10rem" aria-label="Confirmation" />
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <ToggleButton checked={this.state.dia_1} onChange={(e) => this.setState({dia_1: e.value})} onLabel="Segunda-feira" offLabel="Segunda-feira" onIcon="pi pi-check" offIcon="pi pi-times" className="w-full sm:w-10rem" aria-label="Confirmation" />
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <ToggleButton checked={this.state.dia_2} onChange={(e) => this.setState({dia_2: e.value})} onLabel="Terca-feira" offLabel="Terca-feira" onIcon="pi pi-check" offIcon="pi pi-times" className="w-full sm:w-10rem" aria-label="Confirmation" />
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <ToggleButton checked={this.state.dia_3} onChange={(e) => this.setState({dia_3: e.value})} onLabel="Quarta-feira" offLabel="Quarta-feira" onIcon="pi pi-check" offIcon="pi pi-times" className="w-full sm:w-10rem" aria-label="Confirmation" />
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <ToggleButton checked={this.state.dia_4} onChange={(e) => this.setState({dia_4: e.value})} onLabel="Quinta-feira" offLabel="Quinta-feira" onIcon="pi pi-check" offIcon="pi pi-times" className="w-full sm:w-10rem" aria-label="Confirmation" />
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <ToggleButton checked={this.state.dia_5} onChange={(e) => this.setState({dia_5: e.value})} onLabel="Sexta-feira" offLabel="Sexta-feira" onIcon="pi pi-check" offIcon="pi pi-times" className="w-full sm:w-10rem" aria-label="Confirmation" />
                        </span>
                    </div>
                    <div className="field col-4 md:col-3">
                        <span className="p-float-label">
                            <ToggleButton checked={this.state.dia_6} onChange={(e) => this.setState({dia_6: e.value})} onLabel="Sábado" offLabel="Sábado" onIcon="pi pi-check" offIcon="pi pi-times" className="w-full sm:w-10rem" aria-label="Confirmation" />
                        </span>
                    </div>
                </div>

                <Button label="Atualizar" onClick={this.onUpdate}  /> 
            </React.Fragment>
        )
    }
}

export default PrestadorConfigHorario;