import React, { Component } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { api } from './../../services/api';
import { Toast } from 'primereact/toast';
import { withRouter } from "react-router-dom";


export class CadastroPrestador extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            groupname: "prestador",
            messageError: "",
         }
         this.onCadastro = this.onCadastro.bind(this);
         this.showError = this.showError.bind(this);
    }
    onCadastro = async e => {
        
        
        const { username,first_name, last_name, email,password, groupname } = this.state
        if (!username || !password) {
            this.setState(
                {messageError: "Preencha username e senha para continuar!"},
                () => this.showError()
            );
        } else {
            console.log(`username: ${username}| passsword: ${password}`)

            const user = {
                "username": username,
            }
            try {
                const response = await api.post("/usuarios/prestadores/", { username,first_name,last_name ,password, email, groupname });
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
                <Toast ref={(el) => this.toast = el} />
                <span className="p-float-label">
                    <InputText id="username" type="text" className="w-full mb-3" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} />
                    <label htmlFor="username" className="font-medium mb-2">Username</label>
                </span>
                <span className="p-float-label">
                    <InputText id="first_name" type="text" className="w-full mb-3" value={this.state.first_name} onChange={(e) => this.setState({first_name: e.target.value})} />
                    <label htmlFor="first_name" className="font-medium mb-2">Nome</label>
                </span>
                <span className="p-float-label">
                    <InputText id="last_name" type="text" className="w-full mb-3" value={this.state.last_name} onChange={(e) => this.setState({last_name: e.target.value})} />
                    <label htmlFor="last_name" className="font-medium mb-2">Sobrenome</label>
                </span>
                <span className="p-float-label">
                    <InputText id="email" type="email" className="w-full mb-3" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
                    <label htmlFor="email" className="font-medium mb-2">E-mail</label>
                </span>
                <span className="p-float-label">
                    <InputText id="password" type="password" className="w-full mb-3" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} toggleMask feedback={false} />
                    <label htmlFor="password" className="font-medium mb-2">Password</label>
                </span>

                <div className="flex align-items-center justify-content-between mb-6">
                    <a href="/cadastro" className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Esqueceu sua senha?</a>
                </div>

                <Button label="Sign In" icon="pi pi-user" className="w-full" onClick={this.onCadastro} />
            </div>
        );
    }
}

export default withRouter(CadastroPrestador);