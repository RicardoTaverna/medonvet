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
            domingo: false,
            segunda_feira: false,
            terca_feira: false,
            quarta_feira: false,
            quinta_feira: false,
            sexta_feira: false,
            sabado: false,

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

    onUpdate = async e => {
        const { id, veterinario, inicio, termino, intervalo, domingo, segunda_feira, terca_feira, quarta_feira, quinta_feira, sexta_feira, sabado} = this.state
        try {
            const response = await api.put(`/agendamento/horarioatendimento/${id}/`, { 
                veterinario,
                inicio,
                termino,
                intervalo,
                domingo,
                segunda_feira,
                terca_feira,
                quarta_feira,
                quinta_feira,
                sexta_feira,
                sabado
             });
            console.log(response)    
            this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Cadastro atualizado', life: 3000 });        
        } catch (err) {
            this.toast.show({ severity: 'error', summary: 'Erro', detail: "Houve um problema com a atalização, verifique seus os dados inseridos. T.T", life: 3000 });
        } 
    }

    render(){

        return(
            <React.Fragment>
                <Toast ref={(el) => this.toast = el} />
                
                <div className="text-3xl font-mediumtext-900 mb-3">Horário de Funcionamento</div>
                <div className="font-medium text-500 mb-3">Atualize suas informações de funcionamento para disponibilizar a agenda.</div>

                <div className="p-fluid grid">
                    <div className="field col-12 md:col-4">
                        <span className="p-float-label">
                            <InputMask id="inicio" mask="99:99" value={this.state.inicio} placeholder="00:00" slotChar="hh:mm" onChange={(e) => this.setState({inicio: e.value})}></InputMask>
                            <label htmlFor="inicio" className="font-medium mb-2">Horario de Inicio</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-4">                                 
                        <span className="p-float-label">
                            <InputMask id="termino" mask="99:99" value={this.state.termino} placeholder="00:00" slotChar="hh:mm" onChange={(e) => this.setState({termino: e.value})}></InputMask>
                            <label htmlFor="termino" className="font-medium mb-2">Horario de Termino</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-4">
                        <span className="p-float-label">
                            <InputNumber inputId="intervalo" value={this.state.intervalo} onValueChange={(e) => this.setState({intervalo: e.value})} mode="decimal" showButtons min={0} max={720} />
                            <label htmlFor="intervalo" className="font-medium mb-2">Intervalo Atendimento</label>
                        </span>
                    </div>

                    <div className="field col-4 md:col-3">
                        <span className="p-float-label">
                            <ToggleButton checked={this.state.domingo} onChange={(e) => this.setState({domingo: e.value})} onLabel="Domingo" offLabel="Domingo" onIcon="pi pi-check" offIcon="pi pi-times" className="w-full sm:w-10rem" aria-label="Confirmation" />
                        </span>
                    </div>
                    <div className="field col-4 md:col-3">
                        <span className="p-float-label">
                            <ToggleButton checked={this.state.segunda_feira} onChange={(e) => this.setState({segunda_feira: e.value})} onLabel="Segunda-feira" offLabel="Segunda-feira" onIcon="pi pi-check" offIcon="pi pi-times" className="w-full sm:w-10rem" aria-label="Confirmation" />
                        </span>
                    </div>
                    <div className="field col-4 md:col-3">
                        <span className="p-float-label">
                            <ToggleButton checked={this.state.terca_feira} onChange={(e) => this.setState({terca_feira: e.value})} onLabel="Terca-feira" offLabel="Terca-feira" onIcon="pi pi-check" offIcon="pi pi-times" className="w-full sm:w-10rem" aria-label="Confirmation" />
                        </span>
                    </div>
                    <div className="field col-4 md:col-3">
                        <span className="p-float-label">
                            <ToggleButton checked={this.state.quarta_feira} onChange={(e) => this.setState({quarta_feira: e.value})} onLabel="Quarta-feira" offLabel="Quarta-feira" onIcon="pi pi-check" offIcon="pi pi-times" className="w-full sm:w-10rem" aria-label="Confirmation" />
                        </span>
                    </div>
                    <div className="field col-4 md:col-3">
                        <span className="p-float-label">
                            <ToggleButton checked={this.state.quinta_feira} onChange={(e) => this.setState({quinta_feira: e.value})} onLabel="Quinta-feira" offLabel="Quinta-feira" onIcon="pi pi-check" offIcon="pi pi-times" className="w-full sm:w-10rem" aria-label="Confirmation" />
                        </span>
                    </div>
                    <div className="field col-4 md:col-3">
                        <span className="p-float-label">
                            <ToggleButton checked={this.state.sexta_feira} onChange={(e) => this.setState({sexta_feira: e.value})} onLabel="Sexta-feira" offLabel="Sexta-feira" onIcon="pi pi-check" offIcon="pi pi-times" className="w-full sm:w-10rem" aria-label="Confirmation" />
                        </span>
                    </div>
                    <div className="field col-4 md:col-3">
                        <span className="p-float-label">
                            <ToggleButton checked={this.state.sabado} onChange={(e) => this.setState({sabado: e.value})} onLabel="Sábado" offLabel="Sábado" onIcon="pi pi-check" offIcon="pi pi-times" className="w-full sm:w-10rem" aria-label="Confirmation" />
                        </span>
                    </div>
                </div>

                <Button label="Atualizar" onClick={this.onUpdate}  /> 
            </React.Fragment>
        )
    }
}

export default PrestadorConfigHorario;