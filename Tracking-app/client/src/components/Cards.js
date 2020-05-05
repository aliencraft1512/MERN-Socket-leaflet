import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getCards,updateCard, addCard ,deleteCard} from '../actions/cardActions';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import '../css/Cards.css';
import Navbarrr from './Navbarrr';
import { Redirect } from "react-router-dom";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import Card from './Card';
import {Growl} from 'primereact/growl';

class Cards extends Component {
    state = {
        visible: false,
        name: ''
    }
    componentDidMount() {
        if (JSON.parse(localStorage.getItem('login'))) {
            axios.get('http://localhost:5000/cards/getCards',
                {
                    headers: {
                        "x-auth-token": JSON.parse(localStorage.getItem('login')).token
                    }
                }
            ).then(res => this.props.getCards(res.data))
        }
    }
    cancelAddCard = () => {
        this.setState({
            name: '',
            visible: false
        })
    }
    showSuccess() {
        this.growl.show({severity: 'success', summary: 'Success Message', detail: 'Card added successfully!'});
    }
    showWarn() {
        this.growl.show({severity: 'success', summary: 'Success Message', detail: 'Card Updated successfully!'});
    }
    showInfo() {
        this.growl.show({severity: 'success', summary: 'Success Message', detail: 'Card Deleted successfully!'});
    }
    addNewCard = () => {
        axios.post('http://localhost:5000/cards/save', { name: this.state.name },{headers: {"x-auth-token": this.props.token}})
            .then(res => this.props.addCard(res.data))
            .then(
                this.setState({
                    name: '',
                    visible: false
                })
            )
            .then(this.showSuccess())
    }
    deleteCard = (id) => {
        axios.delete('http://localhost:5000/cards/delete/'+id,{headers: {"x-auth-token": this.props.token}})
            .then(this.props.deleteCard(id))
            .then(this.showInfo())
    }
    updateCard = (card) => {
        axios.put('http://localhost:5000/cards/update/'+card._id,card,{headers: {"x-auth-token": this.props.token}})
            .then(res=> this.props.updateCard(res.data))
            .then(this.showWarn())
    }
    
    render() {
        if (!this.props.token) {
            return <Redirect to='/login' />
        }
        const footer = (
            <div>
                <Button icon="pi pi-check" label="Submit" style={{ backgroundColor: "rgb(29, 196, 86)" }} onClick={this.addNewCard} />
                <Button label="Cancel" style={{ backgroundColor: "#c8c8c8" }} icon="pi pi-times" onClick={this.cancelAddCard} />
            </div>
        );

        return (
            <div>
       <Navbarrr></Navbarrr>
                <div className="flex-containerr">
                    <div style={{ flexGrow: 2 }}>
                    <Growl position='topleft' style={{marginTop:88}} ref={(el) => this.growl = el} />
                        <img id="addButton" className='crud' src="/images/signs.png" height="50" width="50" onClick={(e) => this.setState({ visible: true })}></img>
                    </div>
                    <div style={{ flexGrow: 4 }}>
                        <Table bordered hover size="sm" >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th style={{ textAlign: "center", width: '15%' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.cards.map(card => {
                                        return (
                                            <Card card={card} updateCard={this.updateCard} deleteCard={this.deleteCard}></Card>
                                        )
                                    })
                                }



                            </tbody>
                        </Table>
                    </div>
                    <div style={{ flexGrow: 1 }}></div>


                </div>
                <Dialog footer={footer} header="Add new card" visible={this.state.visible} style={{ width: '30vw' }} modal={true} onHide={() => this.setState({ visible: false })}>
                    <span className="p-float-label" style={{ marginTop: 10 }}>
                        <InputText id="in" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                        <label htmlFor="in">Name</label>
                    </span>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.cards.cards,
        token: state.auth.token

    }
}
export default connect(mapStateToProps, { getCards, addCard ,updateCard, deleteCard})(Cards);