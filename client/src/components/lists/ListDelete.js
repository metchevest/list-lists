import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from '../Modal';
import history from '../../history';

import { fetchList, deleteList } from "../../actions";

class ListDelete extends React.Component {

    componentDidMount(){

        this.props.fetchList(this.props.match.params.id);

    }
    
    deleteAction(){
        this.props.deleteList(this.props.match.params.id);
    }

    renderActions(){
        return (
            <React.Fragment>
                <button onClick={() => this.deleteAction()} className="ui primary button">Eliminar</button>
                <Link to="/" className="ui button">Cancelar</Link>
            </React.Fragment>
        );
    }

    renderContact(){

        if (!this.props.list){
            return ' Desea eliminar la lista ?'
        }

        return `Desea eliminar la lista con id -> ${this.props.list.id} y nombre -> ${this.props.list.name} ?`
        
    }

    render(){      
        return (  
            <Modal 
                title="Eliminar lista"
                content={this.renderContact()}
                onDismiss= { () => history.push("/") }
                actions= { this.renderActions() }

            />
        );}
}

const mapStateToProps = (state, ownProps) => {
    return {
        list: state.lists[ownProps.match.params.id]
    };
};

export default connect(mapStateToProps, { fetchList, deleteList })(ListDelete);