import React, { Component } from 'react';

import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Divider } from 'primereact/divider';
import { Image } from 'primereact/image';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { mask, unMask} from "remask";

import { api } from './../../services/api';

class PrestadorConfigCadastro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            crmv: "",
            avatar: "",
            descricao: "",
            capaa: "",
            cpf_cnpj: "",
            cpf_cnpjMascarado: "",
            inicioAtendimento: "",
            fimAtendimento: "",
            groupname: "prestador",
            messageError: "",
        }
        this.onMask = this.onMask.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount(){
        this.onEnter();
    }

    onEnter = async e => {
        try {
            api.get('/prestadores/detalhe/').then((response) => {
                console.log(response);
                this.setState({
                    cpf_cnpj: response.data.cpf_cnpj,
                    crmv: response.data.crmv,
                    descricao: response.data.descricao,
                    avatar: response.data.avatar,
                    capa: response.data.capa,
                    fimAtendimento: response.data.fimAtendimento,
                    inicioAtendimento: response.data.inicioAtendimento
                });
            });
        } catch (err) {
            console.log(`Erro: ${err}`)
        }
        
    }

    onUpdate = async e => {
        const { cpf_cnpj, crmv, descricao } = this.state
        
        try {
            const response = await api.put("/prestadores/detalhe/", { cpf_cnpj, crmv, descricao });
            console.log(response)    
            this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Cadastro atualizado', life: 3000 });        
        } catch (err) {

            this.toast.show({ severity: 'error', summary: 'Erro', detail: "Houve um problema com a atalização, verifique seus os dados inseridos. T.T", life: 3000 });
            
        }
    }

    onMask = (event) => {
        const valorOriginal = unMask(event.target.value)
        const valorMascarado = mask(valorOriginal,[
            '999.999.999-99', 
            '99.999.999/9999-99'
        ]);
        this.setState({cpf_cnpj: unMask(valorMascarado)})
        return valorMascarado;
    };


    render(){
        return(
            <React.Fragment>
                <Toast ref={(el) => this.toast = el} />

                    
                    <div className="text-3xl font-mediumtext-900 mb-3">Cadastro</div>
                    <div className="p-fluid grid">
                        <div className="field col-12 md:col-6">
                            <div className="font-medium text-500 mb-3">Alterar foto de perfil.</div>
                            <a href=''>
                                <Avatar icon="pi pi-user" className="mr-2" size="xlarge" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />
                            </a>
                        </div>
                        <Divider></Divider>

                        <div className="field col-12 md:col-6">
                            <div className="font-medium text-500 mb-3">Alterar foto da capa.</div>
                            <a href=''>
                                <Image src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt="Image" width="200" height="100" />
                            </a>
                        </div>
                        <Divider></Divider>
                        <div className="field col-12 md:col-12">
                            <div className="font-medium text-500 mb-3">Atualize suas informações cadastrais.</div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <InputText id="cpf_cnpj" type="text" className="w-full mb-3" value={this.state.cpf_cnpj} onChange={(e) => this.setState({cpf_cnpjMascarado: this.onMask(e)})}/>
                                <label htmlFor="cpf_cnpj" className="font-medium mb-2">CPF/CNPJ</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <InputText id="crmv" type="text" className="w-full mb-3" value={this.state.crmv} onChange={(e) => this.setState({crmv: e.target.value})} />
                                <label htmlFor="crmv" className="font-medium mb-2">CRMV</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-12">
                            <span className="p-float-label">
                                <InputTextarea  id="descricao" className="w-full mb-3" rows={5} value={this.state.descricao} onChange={(e) => this.setState({descricao: e.target.value})} />
                                <label htmlFor="descricao" className="font-medium mb-2">Biografia</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <Calendar id="inicioAtendimento" value={this.state.inicioAtendimento} onChange={(e) => this.setState({ inicioAtendimento: e.value })} timeOnly hourFormat="12"  />
                                <label htmlFor="inicioAtendimento" className="font-medium mb-2">inicioAtendimento</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <Calendar id="fimAtendimento" value={this.state.fimAtendimento} onChange={(e) => this.setState({ fimAtendimento: e.value })} timeOnly hourFormat="12"  />
                                <label htmlFor="fimAtendimento" className="font-medium mb-2">fimAtendimento</label>
                            </span>
                        </div>
                    </div>
                    <Button label="Atualizar" onClick={this.onUpdate}  />
    
                        

            </React.Fragment>
        )
    }
}

export default PrestadorConfigCadastro;