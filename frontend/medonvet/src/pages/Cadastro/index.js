import React from 'react';



import { SelectButton } from 'primereact/selectbutton';

import CadastroPrestador from '../../components/CadastroPrestador';
import CadastroCliente from '../../components/CadastroCliente';

import CadastroBackgroundCliente from './../../assets/images/cadastroCliente_background.png'
import CadastroBackgroundPrestador from './../../assets/images/cadastro_background.png'
import logo from './../../assets/images/logo2.png'

class Cadastro extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            tipo: '',
            cadastro: '',
            messageError: "",
        }
        this.options = ['cliente', 'prestador'];
        this.changeTipo = this.changeTipo.bind(this);

   }
   
   setStateAsync(state) {
       return new Promise((resolve) => {
            this.setState(state,resolve)
       });
   }

    async changeTipo(e){
        await this.setStateAsync({tipo: e})
       
    }

    render(){

        let cadastro, cadastroImagem;

        if (this.state.tipo == "prestador"){
            cadastro = <CadastroPrestador></CadastroPrestador>
            cadastroImagem = CadastroBackgroundPrestador;
        } else {
            cadastro = <CadastroCliente></CadastroCliente>
            cadastroImagem = CadastroBackgroundCliente;
        }

        return(
            <React.Fragment>
                <div className="layout-main-container">
                    
                    <div className="layout-main">
                        <div className="grid grid-nogutter text-200" style={{ backgroundColor: '#18283F' }}>
                            <div className="col-12 md:col-6 p-6 mt-6">
                                <section>                                    
                                    <div className="text-center mb-5 mt-6">
                                        <img src={logo} alt="hyper" height={100} className="mb-3" />
                                        <div className="text-300 text-3xl font-medium mb-3">Bem vindo!</div>
                                        <span className="text-200 font-medium line-height-3">Já possui uma conta?</span>
                                        <a href="/login" className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Entre agora!</a>
                                    </div>
                                    <SelectButton className="text-center field" value={this.state.tipo} options={this.options} onChange={(e) => {
                                            this.changeTipo(e.value)
                                    }}
                                    />
                                    
                                    {cadastro}

                                </section>
                            </div>
                            <div className="col-12 md:col-6 overflow-hidden">
                                <img src={cadastroImagem} alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Cadastro;