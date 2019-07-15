import React, {Component} from 'react';
// import Contacts from './components/contacts';
import Questions from './components/questions';

class App extends Component {
    // render() {
    //     return (
    //         <Contacts contacts={this.state.contacts} />
    //     )
    // }
    
    render() {
        return (
            <Questions questions={this.state.questions} />
        )
    }


    state = {
        questions: []
    };

    componentDidMount() {
        fetch('http://api.demo.dev.apps.bdso.knightpoint.systems/questions')
            .then(res => res.json())
            .then((data) => {
                this.setState({ questions: data.content })
            })
            .catch(console.log)
    }
}

export default App;
