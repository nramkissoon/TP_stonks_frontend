import React from 'react';
import Container from '@material-ui/core/Container';
import { getMostRecentAccountData } from './utils/accountData';
import { positionTable } from './components/positionsTable/positionsTable';
import { accountValueCard } from './components/accountValueCard/accountValueCard';
import { orderRulesCard } from './components/orderRulesCard/orderRulesCard';
import { OrderExecutionFeed } from './components/orderExecutionFeed/orderExecutionFeed';
import { ProcessedOrder } from './utils/processedOrdersMessages'
import { AccountValueChart } from './components/accountValueChart/accountValueChart'

class App extends React.Component {
  updateInterval: NodeJS.Timeout;
  constructor(props) {
    super(props);
    this.updateInterval = null;
  }

  state = {
    accountData: null,
    previousOrderUpdateTimeStamp: 0,
    currentOrderUpdateTimeStamp: 0
  }

  // fetch account data with a given interval
  componentDidMount = async () => {
    try {
      this.updateInterval = setInterval(async () => {
        const startTime = 9 * 60;
        const endTime = 16 * 60 + 30;
        const date = new Date()
        const now = date.getHours() * 60 + date.getMinutes();
        if (startTime <= now && now <= endTime) {
          const accountData = await getMostRecentAccountData('http://localhost:8080/data/account');
          const newPreviousOrderUpdateTimeStamp = this.state.currentOrderUpdateTimeStamp;
          this.setState({
            accountData: accountData,
            previousOrderUpdateTimeStamp: newPreviousOrderUpdateTimeStamp,
            currentOrderUpdateTimeStamp: accountData && accountData.processedOrders ? accountData.processedOrders.timestamp : 0
          });
        }
      }, 10000);
    } catch (e) {
    }
  }

  // clear interval
  componentWillUnmount = () => {
    if (this.updateInterval) { clearInterval(this.updateInterval); }
  }

  render() {
    const { accountData, previousOrderUpdateTimeStamp, currentOrderUpdateTimeStamp }  = this.state;
    let positions = [];
    let accountValue = {};
    let timestamp;
    let processedOrders: ProcessedOrder[] = [];
    if (accountData && accountData.positions) { positions = accountData.positions }
    if (accountData && accountData.accountValue) { accountValue = accountData.accountValue }
    if (accountData && accountData.timestamp) { timestamp = accountData.timestamp }
    if (accountData && accountData.processedOrders && previousOrderUpdateTimeStamp !== currentOrderUpdateTimeStamp) {
      processedOrders = accountData.processedOrders.processedOrders
    }
    return (
      
      <Container maxWidth={false} style={{ height: '100vh', width: '100vw', padding: '0', margin: '0', display: 'flex' }}>
        <Container maxWidth={false} style={{ height: '100vh', width: '70vw', padding: '0', margin: '0' }}>
          <Container maxWidth={false} style={{ height: '45vh', width: '70vw', padding: '10px', margin: '0' }}>
            <AccountValueChart accountValue={accountValue}/>
          </Container>
          <Container maxWidth={false} style={{ height: '55vh', width: '70vw', padding: '10px', margin: '0', overflowY: 'scroll'}}>
            { positionTable(positions) }
          </Container>
        </Container>
        <Container maxWidth={false} style={{ height: '100vh', width: '30vw', padding: '0', margin: '0', paddingRight: '10px' }}>
          <Container maxWidth={false} style={{ height: '35vh', width: '30vw', padding: '10px', margin: '0' }}>
            { accountValueCard(accountValue, timestamp) }
          </Container>
          <Container maxWidth={false} style={{ height: '16vh', width: '30vw', padding: '10px', margin: '0' }}>
            { orderRulesCard() }
          </Container>
          <Container maxWidth={false} style={{ height: '49vh', width: '30vw', padding: '10px', margin: '0' }}>
            <OrderExecutionFeed chatOrders={processedOrders}/>
          </Container>
        </Container>
      </Container>
      );
  }
}


export default App;
