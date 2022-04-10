import React from 'react';



import { api } from './../../services/api';
import { Toast } from 'primereact/toast';

import CadastroPrestador from '../../components/CadastroPrestador';

import CadastroBackground from './../../assets/images/cadastro_background.png'
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
            groupname: "prestador",
            messageError: "",
        }
 

   }


    render(){
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
                                    

                                    <CadastroPrestador></CadastroPrestador>
                                </section>
                            </div>
                            <div className="col-12 md:col-6 overflow-hidden">
                                <img src={CadastroBackground} alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Cadastro;