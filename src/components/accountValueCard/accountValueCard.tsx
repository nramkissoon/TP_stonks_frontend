import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { greenTextColor, redTextColor, whiteTextColor } from '../../utils/consts';
import { displayCurrency, displayPercent, displayTimeEST } from './../../utils/numberDisplay'

const textStyle = (data: number) => {
  if (data === 0) return {color: whiteTextColor};
  return {
    color: data > 0 ? greenTextColor : redTextColor
  }
}

export const accountMktValue = (mktValue: number) => {
  if (mktValue === null) { return; }
  if (mktValue === undefined) { return; }
  return (<h1 style={{ textAlign: 'center', fontSize: '4em' }}>{ displayCurrency(mktValue) }</h1>);
}

export const accountMktValueChange = (percentChange: number, totalChange: number) => {
  if (percentChange === null || totalChange === null) { return; }
  if (percentChange === undefined || totalChange === undefined) { return; }
  return (
    <h1 style={{ textAlign: 'center', fontSize: '2em' }}>
      <span style={textStyle(totalChange)}>
        {displayCurrency(totalChange) + ' (' + displayPercent(percentChange) + ')'}
      </span>
    </h1>
  );
}

export const accountValueCard = (accountValue: any, timeStamp: number) => {
  const { mkt_value, day_gain_percent, day_gain_total, total_gain_total, total_gain_percent } = accountValue;
  return (
    <Card elevation={3} style={{height: '100%', overflowY: 'auto', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
      <CardContent>
        <p style={{ textAlign: 'center' }}>Account Value</p>
        { accountMktValue(mkt_value) }
        <p style={{ textAlign: 'center', paddingTop: '1%' }}>Day Change</p>
        { accountMktValueChange(day_gain_percent, day_gain_total) }
        <p style={{ textAlign: 'center', paddingTop: '1%' }}>Net Change</p>
        { accountMktValueChange(total_gain_percent, total_gain_total) }
        <p style={{ textAlign: 'center', paddingTop: '1%' }}>Last Updated</p>
        <h1 style={{ textAlign: 'center', fontSize: '1.5em' }}>
          { displayTimeEST(timeStamp) }
        </h1>
      </CardContent>
    </Card>
  );
}
