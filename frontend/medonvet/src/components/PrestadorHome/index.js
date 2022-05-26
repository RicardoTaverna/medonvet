import React, { Component } from 'react';

import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Avatar } from 'primereact/avatar';
import { Rating } from 'primereact/rating';

class PrestadorHome extends Component {

    render(){
        return (
            <React.Fragment>
                <div className="grid px-6 py-3">
                    <div className="col-12 md:col-6 lg:col-3">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Orders</span>
                                    <div className="text-900 font-medium text-xl">152</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
                                </div>
                            </div>
                            <span className="text-green-500 font-medium">24 new </span>
                            <span className="text-500">since last visit</span>
                        </div>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Revenue</span>
                                    <div className="text-900 font-medium text-xl">$2.100</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="pi pi-map-marker text-orange-500 text-xl"></i>
                                </div>
                            </div>
                            <span className="text-green-500 font-medium">%52+ </span>
                            <span className="text-500">since last week</span>
                        </div>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Customers</span>
                                    <div className="text-900 font-medium text-xl">28441</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="pi pi-inbox text-cyan-500 text-xl"></i>
                                </div>
                            </div>
                            <span className="text-green-500 font-medium">520  </span>
                            <span className="text-500">newly registered</span>
                        </div>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Comments</span>
                                    <div className="text-900 font-medium text-xl">152 Unread</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="pi pi-comment text-purple-500 text-xl"></i>
                                </div>
                            </div>
                            <span className="text-green-500 font-medium">85 </span>
                            <span className="text-500">responded</span>
                        </div>
                    </div>
                </div>

                <div className="grid px-6 py-3">
                    <div className="col-12 md:col-12 lg:col-6">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="text-900 mb-3">Veterinários</span>
                                </div>
                                <div className="flex align-items-center justify-content-center">
                                    <Menu model={this.teamItens} popup ref={el => this.menu = el} id="popup_menu" />
                                    <Button icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-plain" aria-label="Filter" onClick={(event) => this.menu.toggle(event)} aria-controls="popup_menu" aria-haspopup />
                                </div>
                            </div>
                            <div class="card">
                                <div class="flex card-container blue-container overflow-hidden">
                                    <div class="flex-none flex align-items-center justify-content-center border-round">
                                        <Avatar label="V" className="mr-2" size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />
                                    </div>
                                    <div class="flex-grow-1 flex align-items-right justify-content-right m-2 px-5 py-3 border-round">
                                        <div>
                                            <div className="font-medium text-xl text-900">Ygor Stengrat</div>
                                                <div className="flex align-items-center text-700 flex-wrap">
                                                    <div className="mr-5">
                                                        <small>Clinico Geral</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <div class="flex-none flex align-items-center justify-content-center m-2 px-5 py-3 border-round">
                                        <Button icon="pi pi-facebook" className="p-button-rounded p-button-text p-button-plain"/>
                                        <Button icon="pi pi-linkedin" className="p-button-rounded p-button-text p-button-plain"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 md:col-12 lg:col-6">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="text-900 mb-3">Ultimos Serviços</span>
                                </div>
                                <div className="flex align-items-center justify-content-center">
                                    <Menu model={this.teamItens} popup ref={el => this.menu = el} id="popup_menu" />
                                    <Button icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-plain" aria-label="Filter" onClick={(event) => this.menu.toggle(event)} aria-controls="popup_menu" aria-haspopup />
                                </div>
                            </div>
                            <div class="card">
                                <div class="flex card-container blue-container overflow-hidden">
                                    <div class="flex-none flex align-items-center justify-content-center border-round">
                                        <Avatar icon="pi pi-user" className="mr-2" size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />
                                    </div>
                                    <div class="flex-grow-1 flex align-items-right justify-content-right m-2 px-5 py-3 border-round">
                                        <div>
                                            <div className="font-medium text-xl text-900">Nome do Pet</div>
                                                <div className="flex align-items-center text-700 flex-wrap">
                                                    <div className="mr-5">
                                                        <span>Serviço prestado </span>
                                                        <span className='bg-green-100 border-round p-1'> R$250.00</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <div class="flex-none flex align-items-center justify-content-center m-2 px-5 py-3">
                                        <Rating value={4} readOnly stars={5} cancel={false} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default PrestadorHome;