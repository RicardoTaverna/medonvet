import React, { Component } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { api } from './../../services/api';
import { Toast } from 'primereact/toast';
import { withRouter } from "react-router-dom";




export class CadastroCliente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            passwordconfirm: "",
            groupname: "cliente",
            messageError: "",
         }
         this.onCadastro = this.onCadastro.bind(this);
         this.showError = this.showError.bind(this);
    }
    onCadastro = async e => {
        
        
        const { username,first_name, last_name,email,password,passwordconfirm, groupname } = this.state
        if (!username || !first_name || !last_name || !email || !password || !passwordconfirm) {
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

            try {
                const response = await api.post("/usuarios/clientes/", {  groupname, username, first_name, last_name, email, password });
                console.log(response)
                this.props.history.push('/login')
                
            } catch (err) {
                this.setState(
                    {messageError: "Houve um problema com o cadastro, verifique suas credenciais. T.T"},
                    () => this.showError()
                );
            }
        }
    }

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
export default withRouter(CadastroCliente);