import React, { Component } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { api } from './../../services/api';
import { Toast } from 'primereact/toast';
import { withRouter } from "react-router-dom";
import { mask, unMask} from "remask";



export class CadastroPrestador extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            cpf_cnpj: "",
            cpf_cnpjMascarado: "",
            crmv:"",
            password: "",
            passwordconfirm: "",
            groupname: "prestador",
            messageError: "",
         }
         this.onCadastro = this.onCadastro.bind(this);
         this.onMask = this.onMask.bind(this);
         this.showError = this.showError.bind(this);
    }
    onCadastro = async e => {
        
        
        const { username,first_name, last_name,email,cpf_cnpj,crmv,password,passwordconfirm, groupname } = this.state

    
        if (!username || !first_name || !last_name || !email || !cpf_cnpj || !crmv || !password || !passwordconfirm) {
            this.setState(
                {messageError: "Preencha todos os campos para conlcuir seu cadastro!"},
                () => this.showError()
            );
        }else if (password !== passwordconfirm) {
            this.setState(
                {messageError: "As senhas não coincidem!"},
                () => this.showError()
            );
        } else {
            console.log(`username: ${username}| passsword: ${password}`)

            const user = {
                "username": username,
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "password": password,
            }
            try {
                const response = await api.post("/usuarios/prestadores/", { cpf_cnpj,crmv, groupname, user });
                console.log(response)
                console.log(cpf_cnpj)
                this.props.history.push('/login')
                
            } catch (err) {
                console.log(cpf_cnpj)
                this.setState(
                    {messageError: "Houve um problema com o cadastro, verifique suas credenciais. T.T"},
                    () => this.showError()
                );
            }
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


    showError() {
        this.toast.show({severity:'error', summary: 'Error', detail: this.state.messageError , life: 3000});
    }
    render() {

        return (
            
            <div>
                <div className="content-section implementation">
                    <div className="card">
                        <div className="p-fluid grid">
                            <Toast ref={(el) => this.toast = el} />
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
                                    <InputText id="cpf_cnpj" type="text" className="w-full mb-3" value={this.state.cpf_cnpjMascarado} onChange={(e) => this.setState({cpf_cnpjMascarado: this.onMask(e)})} toggleMask feedback={false} />
                                    <label htmlFor="cpf_cnpj" className="font-medium mb-2">CPF/CNPJ</label>
                                </span>
                            </div>
                            <div className="field col-12 md:col-6">
                                <span className="p-float-label">
                                    <InputText id="crmv" type="text" className="w-full mb-3" value={this.state.crmv} onChange={(e) => this.setState({crmv: e.target.value})} toggleMask feedback={false} />
                                    <label htmlFor="crmv" className="font-medium mb-2">CRMV</label>
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

                            <div className="flex align-items-center justify-content-between mb-6">
                                <a href="/cadastro" className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Esqueceu sua senha?</a>
                            </div>

                            <Button label="Criar Conta" icon="pi pi-user" className="w-full" onClick={this.onCadastro} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CadastroPrestador);