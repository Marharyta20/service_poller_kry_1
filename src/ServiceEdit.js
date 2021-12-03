import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from './AppNavbar';

class ServiceEdit extends Component {

    emptyItem = {
        name: '',
        url: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            isValid: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const service = await (await fetch(`/services/${this.props.match.params.id}`)).json();
            this.setState({item: service});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name === 'url') {
            const isValid = !value || this.urlPatternValidation(value);
            this.setState({
                isValid
            });
        }
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/services' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/services');
    }

    urlPatternValidation = url => {
        const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
        return regex.test(url);
    };

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Service' : 'Add Service'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">URL</Label>
                        <Input type="text" name="url" id="url" value={item.url || ''}
                               onChange={this.handleChange} autoComplete="url"/>
                        {!this.state.isValid && (
                            <div style={{color: "#F61C04"}}>URL is not valid.</div>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit" disabled={!this.state.isValid}>Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/services">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }

}

export default withRouter(ServiceEdit);