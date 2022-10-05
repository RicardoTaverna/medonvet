import React, { Component } from 'react';

import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { mask, unMask} from "remask";

import { api } from './../../services/api';

class ClienteConfigCadastro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cpf:"",
            cpfMascarado:"",
            telefone: "",
            telefoneMask: "",
            data_nascimento:"",
            cad_unico:"",
            groupname: "cliente",
            messageError: "",
        }
        this.onMask = this.onMask.bind(this);
        this.onMask2 = this.onMask2.bind(this);
        this.onGetMask = this.onGetMask.bind(this);
        this.onGetMaskTelefone = this.onGetMaskTelefone.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount(){
        this.onEnter();
    }

    onEnter = async e => {
        try {
            api.get('/clientes/detalhe/').then((response) => {
                console.log(response);
                this.setState({
                    cpf: response.data.cpf,
                    telefone: response.data.telefone,
                    data_nascimento: response.data.data_nascimento,
                    cad_unico: response.data.cad_unico,
                });
                this.onGetMask(this.state.cpf)
                this.onGetMaskTelefone(this.state.telefone)
            });
        } catch (err) {
            console.log(`Erro: ${err}`)
        }
    }

    onUpdate = async e => {
        const { cpf, telefone, data_nascimento, cad_unico  } = this.state
        const cpfOrCnpj = require('js-cpf-cnpj-validation'); 
        if(cpfOrCnpj.isCPForCNPJ(cpf)){
            try {
                const response = await api.put("/clientes/detalhe/", { cpf, telefone, data_nascimento, cad_unico });
                console.log(response)    
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Cadastro atualizado', life: 3000 });        
            } catch (err) {
                this.toast.show({ severity: 'error', summary: 'Erro', detail: "Houve um problema com a atualização, verifique seus os dados inseridos. T.T", life: 3000 });
            }
        }else{
            this.toast.show({ severity: 'error', summary: 'Erro', detail: "Houve um problema com seu cadastro. CPF não existente. x.x", life: 3000 });
                
        }
    }

    onMask = (event) => {
        const valorOriginal = unMask(event.target.value)
        const valorMascarado = mask(valorOriginal,[
            '999.999.999-99',
        ]);
        this.setState({cpf: unMask(valorMascarado)})
        return valorMascarado;
    };

    onMask2 = (event) => {
        const valorOriginal = unMask(event.target.value)
        const valorMascarado = mask(valorOriginal,[
            '(99) 99999-9999', 
        ]);
        this.setState({telefone: unMask(valorMascarado)})
        return valorMascarado;
    };

    onGetMask = async e => {
        const valorOriginal = unMask(e)
        const valorMascarado = mask(valorOriginal,[
            '999.999.999-99', 
        ]);
        this.setState({cpfMascarado: valorMascarado})
        return valorMascarado;
    };
    
    onGetMaskTelefone = async e => {
        const valorOriginal = unMask(e)
        console.log(valorOriginal)
        const valorMascarado = mask(valorOriginal,[
            '(99) 99999-9999',
        ]);
        this.setState({telefoneMask: valorMascarado})
        return valorMascarado;
    };

    render(){
        return(
            <React.Fragment>
                <Toast ref={(el) => this.toast = el} />

                    <div className="text-3xl font-mediumtext-900 mb-3">Cadastro</div>
                    <div className="font-medium text-500 mb-3">Atualize suas informações cadastrais.</div>

                    <div className="p-fluid grid">
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <InputText id="cpf" type="text"  className="w-full mb-3" value={this.state.cpfMascarado} onChange={(e) => this.setState({cpfMascarado: this.onMask(e)})}/>
                                <label htmlFor="cpf" className="font-medium mb-2">CPF</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <InputText id="telefone" type="text"  className="w-full mb-3" value={this.state.telefoneMask} onChange={(e) => this.setState({telefoneMask: this.onMask2(e)})}/>
                                <label htmlFor="telefone" className="font-medium mb-2">Telefone</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <Calendar id="data_nascimento" value={this.state.data_nascimento} onChange={(e) => this.setState({ data_nascimento: e.value })} timeOnly hourFormat="12"  />
                                <label htmlFor="data_nascimento" className="font-medium mb-2">Data Nascimento</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <InputText id="cad_unico" type="text" className="w-full mb-3" value={this.state.cad_unico} onChange={(e) => this.setState({cad_unico: e.target.value})} />
                                <label htmlFor="cad_unico" className="font-medium mb-2">CAD UNICO</label>
                            </span>
                        </div>
                    </div>
                    <Button label="Atualizar" onClick={this.onUpdate}  />
                        
            </React.Fragment>
        )
    }
}

export default ClienteConfigCadastro;