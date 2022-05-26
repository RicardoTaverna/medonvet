import React, { Component } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { mask, unMask} from "remask";

import { api } from './../../services/api';

class PrestadorConfig extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            cpf_cnpj: "",
            crmv:"",
            password: "",
            passwordconfirm: "",
            descricao: "",
            groupname: "prestador",
            messageError: "",
        }
        this.onMask = this.onMask.bind(this);
        this.onEnter = this.onEnter.bind(this);
    }

    componentDidMount(){
        this.onEnter();
    }

    onEnter = async e => {
        try {
            api.get('/prestadores/detalhe/').then((response) => {
                console.log(response);
                this.setState({
                    username: response.data.user.username,
                    first_name: response.data.user.first_name,
                    last_name: response.data.user.last_name,
                    email: response.data.user.email,
                    cpf_cnpj: response.data.cpf_cnpj,
                    crmv: response.data.crmv,
                    descricao: response.data.descricao
                });
            });
        } catch (err) {
            console.log(`Erro: ${err}`)
        }
        
    }

    onUpdate = async e => {
        const { username, first_name, last_name, email, cpf_cnpj, crmv, descricao } = this.state
        const user = {
            "username": username,
            "first_name": first_name,
            "last_name": last_name,
            "email": email
        }
        try {
            const response = await api.post("/usuarios/prestadores/", { cpf_cnpj, crmv, descricao, user });
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
        return valorMascarado;
    };


    render(){
        return(
            <React.Fragment>
                <Toast ref={(el) => this.toast = el} />
                <div className="grid px-6 py-3">
                    <div className="col-12 md:col-12 lg:col-12">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <div className="text-3xl font-mediumtext-900 mb-3">Cadastro</div>
                            <div className="font-medium text-500 mb-3">Atualize suas informações cadastrais.</div>

                            <div className="p-fluid grid">
                                <div className="field col-12 md:col-6">
                                    <span className="p-float-label">
                                        <InputText id="username" type="text" className="w-full mb-3" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} />
                                        <label htmlFor="username" className="font-medium mb-2">Username</label>
                                    </span>
                                </div>
                                <div className="field col-12 md:col-6">                                 
                                    <span className="p-float-label">
                                        <InputText id="email" type="email" className="w-full mb-3" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
                                        <label htmlFor="email" className="font-medium mb-2">E-mail</label>
                                    </span>
                                </div>
                                <div className="field col-12 md:col-6">
                                    <span className="p-float-label">
                                            <InputText id="first_name" type="text" className="w-full mb-3" value={this.state.first_name} onChange={(e) => this.setState({first_name: e.target.value})} />
                                            <label htmlFor="first_name" className="font-medium mb-2">Nome</label>
                                    </span>
                                </div>
                                <div className="field col-12 md:col-6">
                                    <span className="p-float-label">
                                        <InputText id="last_name" type="text" className="w-full mb-3" value={this.state.last_name} onChange={(e) => this.setState({last_name: e.target.value})} />
                                        <label htmlFor="last_name" className="font-medium mb-2">Sobrenome</label>
                                    </span>
                                </div>
                                <div className="field col-12 md:col-6">
                                    <span className="p-float-label">
                                        <InputText id="cpf_cnpj" type="text" className="w-full mb-3" value={this.state.cpf_cnpj} onChange={(e) => this.setState({cpf_cnpj: this.onMask(e)})}/>
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
                            </div>
                            <Button label="Atualizar" onClick={this.onUpdate}  />

                            <Divider />

                            <div className="text-3xl font-mediumtext-900 mb-3">Endereço</div>
                            <div className="font-medium text-500 mb-3">Atualize suas informações de endereço.</div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default PrestadorConfig;