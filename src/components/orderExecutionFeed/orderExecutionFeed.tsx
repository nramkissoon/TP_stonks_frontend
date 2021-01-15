import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { ProcessedOrder, processedOrderToMessageElements } from './../../utils/processedOrdersMessages'

export class OrderExecutionFeed extends React.Component {
  messagesEnd;
  constructor(props) {
    super(props);
    this.state = {
      chatOrders: []
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  
  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let newMessageArr: ProcessedOrder[] = prevState.chatOrders.concat(nextProps.chatOrders);
    if (newMessageArr.length > 100) { // delete some to preserve memory
      const numberToDelete = prevState.chatOrders.length;
      for (let i = 0; i < numberToDelete; i += 1) {
        newMessageArr.shift();
      }
    }
    return {
        chatOrders: newMessageArr
      };
    }

  render() {
    const { chatOrders } = this.state;
    return (
      <Card elevation={3} style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
        <CardContent style={{height: '100%', overflowY: 'auto', flex: 1}}>
          <Card elevation={3} style={{height: '100%', overflowY: 'auto', background: '#000', flex: 1}}>
            <CardContent>
              {processedOrderToMessageElements(chatOrders)}
              <div style={{float:"left", clear: "both"}} ref={(el) => { this.messagesEnd = el; }}></div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    )
  }
}