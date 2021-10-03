import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Api from '../api';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from './list-item';
import uuid from 'react-uuid';
import '../styles.css';

class MessageList extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      priority1: [],
      priority2: [],
      priority3: []
    }
  }

  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message)
    },
  });

  componentDidMount() {
    this.api.start()
  }

  messageCallback(message) {
    // Reformatting the api into separate priority lists with an ID
    const formattedMessage = {
      message: message.message,
      priority: message.priority,
      id: uuid()
    };

    if (message.priority === 1) {
      this.setState({
        priority1: [
          formattedMessage,
          ...this.state.priority1
        ],
      })
    } else if (message.priority === 2) {
      this.setState({
        priority2: [
          formattedMessage,
          ...this.state.priority2
        ],
      })
    } else {
      this.setState({
        priority3: [
          formattedMessage,
          ...this.state.priority3
        ],
      })
    }
  }

  renderButton() {
    const isApiStarted = this.api.isStarted()
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          if (isApiStarted) {
            this.api.stop()
          } else {
            this.api.start()
          }
          this.forceUpdate()
        }}
      >
        {isApiStarted ? 'Stop Messages' : 'Start Messages'}
      </Button>
    )
  }

  clearButton() {
    return (
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          this.setState({
            priority1: [],
            priority2: [],
            priority3: [],
          })
        }}
      >
        Clear
      </Button>
    )
  }

  clearMessage(item) {
    if (item.priority === 1) {
      this.setState({priority1: this.state.priority1.filter(function(formattedMessage) {
          return formattedMessage.id !== item.id
        })});
    } else if (item.priority === 2) {
      this.setState({priority2: this.state.priority2.filter(function(formattedMessage) {
          return formattedMessage.id !== item.id
        })});
    } else {
      this.setState({priority3: this.state.priority3.filter(function(formattedMessage) {
          return formattedMessage.id !== item.id
        })});
    }
  }

  render() {

    return (
      <div>
        <Grid container justify="center" className="buttonContainer">
          {this.renderButton()}
          {this.clearButton()}
        </Grid>
        <Grid container spacing={3} justify="center">
          <Grid item xs={3}>
            <Typography variant="h4" component="h2">Error Type 1</Typography>
            <Typography variant="h6" component="h3">Count: {this.state.priority1.length}</Typography>
            {
              this.state.priority1.map((item) => {
                return (
                  <ListItem key={item.id} item={item} color='#F56236' clearMessage={(item) => this.clearMessage(item)} />
                );
              })
            }
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h4" component="h2">Warning Type 2</Typography>
            <Typography variant="h6" component="h3">Count: {this.state.priority2.length}</Typography>
            {
              this.state.priority2.map((item) => {
                return (
                  <ListItem key={item.id} item={item} color='#FCE788' clearMessage={(item) => this.clearMessage(item)} />
                );
              })
            }
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h4" component="h2">Info Type 3</Typography>
            <Typography variant="h6" component="h3">Count: {this.state.priority3.length}</Typography>
            {
              this.state.priority3.map((item) => {
                return (
                  <ListItem key={item.id} item={item} color='#88FCA3' clearMessage={(item) => this.clearMessage(item)} />
                );
              })
            }
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default MessageList
