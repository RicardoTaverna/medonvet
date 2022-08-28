import React from 'react';

import { Divider } from 'primereact/divider';
import { Image } from 'primereact/image';
import { Rating } from 'primereact/rating';

export class PrestadorCard extends React.Component {
    render(){
        return(
            <React.Fragment>
                <div className="col-12 mb-5">
                    <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                        <div className="flex justify-content-start mb-3">
                            <div className="">
                                <Image src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt="Image" width="150" preview />
                            </div>
                            <div className="ml-6">
                                <div className="text-900 font-medium text-xl">Nome Prestador</div>
                                <span className="block text-500 font-medium mb-3">Endereço</span>
                                <span className="text-green-500 font-medium bg-green-100 border-round p-1">Clinica</span>
                                <Divider></Divider>
                                <span className="text-500">Avaliação dos usuários</span>
                                <Rating value={5} readOnly stars={5} cancel={false} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                        <div className="flex justify-content-start mb-3">
                            <div className="">
                                <Image src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt="Image" width="150" preview />
                            </div>
                            <div className="ml-6">
                                <div className="text-900 font-medium text-xl">Nome Prestador</div>
                                <span className="block text-500 font-medium mb-3">Endereço</span>
                                <span className="text-blue-500 font-medium bg-blue-100 border-round p-1">Autônomo</span>
                                <Divider></Divider>
                                <span className="text-500">Avaliação dos usuários</span>
                                <Rating value={5} readOnly stars={5} cancel={false} />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
};

export default PrestadorCard;