import React, { Component } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { mask, unMask} from "remask";

import { api } from './../../services/api';

class CadastroVeterinario extends Component {

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
            groupname: "veterinario",
            messageError: "",
        }
        this.onMask = this.onMask.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.showError = this.showError.bind(this);
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
        const { username, first_name, last_name, email, cpf_cnpj,groupname, crmv, descricao, password,passwordconfirm } = this.state
        const cpfOrCnpj = require('js-cpf-cnpj-validation'); 
        const user = {
            "username": username,
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password": password
        }
        if (password !== passwordconfirm) {
            this.toast.show({ severity: 'error', summary: 'Erro', detail: "As senhas não coincidem!", life: 3000 });
        }else if(cpfOrCnpj.isCPForCNPJ(cpf_cnpj)){
            try {
                const response = await api.post("/prestadores/veterinarios/", { cpf_cnpj, crmv, groupname, descricao, user });
                console.log(response)    
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Cadastro atualizado', life: 3000 });        
            } catch (err) {

                this.toast.show({ severity: 'error', summary: 'Erro', detail: "Houve um problema com a atalização, verifique seus os dados inseridos. T.T", life: 3000 });
                
            }
        }else{
            this.setState(
                {messageError: "CPF ou CNPJ não é valido"},
                () => this.showError()
            );
        }
    }

    onMask = (event) => {
        const valorOriginal = unMask(event.target.value)
        const valorMascarado = mask(valorOriginal,[
            '999.999.999-99', 
            '99.999.999/9999-99'
        ]);
        this.setState({cpf_cnpj: unMask(valorOriginal)});
        return valorMascarado;
    };

    showError() {
        this.toast.show({severity:'error', summary: 'Error', detail: this.state.messageError , life: 3000});
    }

    render(){
        return(
            <React.Fragment>
                <Toast ref={(el) => this.toast = el} />
                <div className="grid px-6 py-3">
                    <div className="col-12 md:col-12 lg:col-12">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <div className="text-3xl font-mediumtext-900 mb-3">Adicionar Veterinário</div>
                            <div className="font-medium text-500 mb-3">Adicione as informações do veterinário a ser cadastrado.</div>

                            <div className="text-xl text-600 mb-3">Informações do usuário</div>
                            <Divider />
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
                                    <InputText id="password" type="password" className="w-full mb-3" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} toggleMask feedback={false} />
                                    <label htmlFor="password" className="font-medium mb-2">Senha</label>
                                </span>
                                </div>
                                <div className="field col-12 md:col-6">
                                    <span className="p-float-label">
                                        <InputText id="passwordconfirm" type="password" className="w-full mb-3" value={this.state.passwordconfirm} onChange={(e) => this.setState({passwordconfirm: e.target.value})} toggleMask feedback={false} />
                                        <label htmlFor="passwordconfirm" className="font-medium mb-2">Confirmar Senha</label>
                                    </span>
                                </div>
                            </div>
                            <Divider />
                            <div className="text-xl text-600 mb-3">Informações do Veterinário</div>
                            <div className="p-fluid grid">

                                <div className="field col-12 md:col-6">
                                    <span className="p-float-label">
                                        <InputText id="cpf_cnpj" type="text" className="w-full mb-3" value={this.state.cpf_cnpjMascarado} onChange={(e) => this.setState({cpf_cnpjMascarado: this.onMask(e)})}/>
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
                            <Button label="Adicionar" onClick={this.onUpdate}  />

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default CadastroVeterinario;