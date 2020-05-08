import React, { Component } from 'react'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';

export default class Card extends Component {
    state = {
        Deletevisible: false,
        Updatevisible: false,
        name: this.props.card.name
    }
    deleteCard = () => {

        this.props.deleteCard(this.props.card._id)
        this.setState({
            Deletevisible: false
        })
    }
    updateCard = () => {
        const cardUpdated = {
            _id : this.props.card._id,
            name : this.state.name
        }
        this.props.updateCard(cardUpdated)
        this.setState({
            Updatevisible: false
        })
    }
    render() {
        const footer = (
            <div>
                <Button icon="pi pi-check" label="Update" style={{ backgroundColor: "#ffc107" }} onClick={this.updateCard} />
                <Button label="Cancel" style={{ backgroundColor: "#c8c8c8" }} icon="pi pi-times" onClick={() => this.setState({ Updatevisible: false })} />
            </div>
        );

        return (
            
            <tr>
                <td>{this.props.card.name}</td>
                <td>
                    <div className='actions' style={{ marginBottom: 0 }}>
                        <div style={{ flexGrow: 1 }}>
                            <img alt='updateCard' className='crud' src="/images/square.png" onClick={(e) => this.setState({ Updatevisible: true, name:this.props.card.name})} style={{ marginBottom: 0 }} height="30" width="30"></img>

                        </div>
                        <div style={{ flexGrow: 1}}>
                            <img alt='deleteCard' className='crud' src="/images/button.png" onClick={(e) => this.setState({ Deletevisible: true })} style={{ marginBottom: 0 }} height="30" width="30"></img>
                        </div>
                        <div style={{ flexGrow: 1, marginRight: 25 }}>
                            <Link to={"/Route/"+this.props.card._id}>
                            <img alt='deleteCard' className='crud' src="/images/route.png" onClick={(e) => this.setState({ Deletevisible: true })} style={{ marginBottom: 0 }} height="30" width="30"></img>
                            </Link>
                        </div>
                    </div>

                </td>
                <Dialog  header="Are you sure you want to delete this card" visible={this.state.Deletevisible} style={{ width: '27vw' }} modal={true} onHide={() => this.setState({ Deletevisible: false })}>
                    <Button icon="pi pi-check" label='Ok' onClick={this.deleteCard} />
                    <Button label="Cancel" style={{ backgroundColor: "#c8c8c8", float: "right" }} icon="pi pi-times" onClick={() => this.setState({ Deletevisible: false })} />

                </Dialog>
                <Dialog footer={footer} header="Update card" visible={this.state.Updatevisible} style={{ width: '30vw' }} modal={true} onHide={() => this.setState({ Updatevisible: false })}>
                <span className="p-float-label" style={{ marginTop: 10 }}>
                        <InputText id="in" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                        <label htmlFor="in">Name</label>
                    </span>
                </Dialog>
            </tr>
        )
    }
}
