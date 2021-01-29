import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// TODO create cycling card with different info such as time to market open/close

export const orderRulesCard = () => {
  return (
    <Card elevation={3} style={{height: '100%', overflowY: 'auto', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
      <CardContent>
        <p style={{ textAlign: 'center', paddingBottom: '2%' }}>
          Supported Orders In Chat
        </p>
        <h1 style={{ textAlign: 'center', fontSize: '1.4em' }}>
          !BUY TICKER QUANTITY
        </h1>
        <h1 style={{ textAlign: 'center', fontSize: '1.4em' }}>
          !SELL TICKER QUANTITY
        </h1>
        <p style={{ textAlign: 'center', paddingTop: '2%' }}>
          Example: !BUY AAPL 10
        </p>
      </CardContent>
    </Card>
  );
}