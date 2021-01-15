import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Line } from 'react-chartjs-2';
import { whiteTextColor, greenTextColor, redTextColor } from './../../utils/consts'

const createLineChart = (data, lineColor) => {
  return (
    <Line
      data={{
        datasets: [{
          data: data,
          borderColor: lineColor,
          lineTension: 0,
        }]
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Account Value (Day)',
          fontColor: whiteTextColor,
          fontSize: 18
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            position: 'right',
            scaleLabel: {
              labelString: '( $ )',
              fontColor: whiteTextColor,
              display: true
            },
            gridLines: {
              display: true,
              color: 'grey',
              borderDash: [10, 8]
            },
            ticks: {
              fontColor: 'white',
            },
          }],
          xAxes: [{
            type: 'time',
            distribution: 'linear',
            time: {
              displayFormats: {
                second: 'h:mm:ss a'
              }
            },
            gridLines: {
              display: true,
              color: '#303030',
              borderDash: [10, 8]
            },
            ticks: {
              fontColor: 'white',
              source: 'data',
              maxRotation: 60,
              minRotation: 60,
              maxTicksLimit: 50,
              autoSkip: true,
            }
          }]
        }
      }}
    />
  )
}

export class AccountValueChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountValueDataPoints: [],
      lineColor: whiteTextColor
    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    let newDataPoint = {
      x: nextProps.accountValue.timestamp,
      y: nextProps.accountValue.mkt_value
    }
    let lineColor = state.lineColor;
    if (nextProps.accountValue) {
      lineColor = nextProps.accountValue['day_gain_total'] >= 0 ? greenTextColor : redTextColor;
    }
    let newArr;
    if (newDataPoint.x) {
      newArr = state.accountValueDataPoints.concat([newDataPoint]);
    } else {
      newArr = state.accountValueDataPoints
    }
    return {
      accountValueDataPoints: newArr,
      lineColor: lineColor
    };
  }

  render() {
    const data: [] = this.state.accountValueDataPoints;
    const lineColor = this.state.lineColor;
    return (
      <Card elevation={3} style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
        <CardContent style={{height: '100%', overflowY: 'auto', flex: 1}}>
          <Card elevation={3} style={{height: '100%', overflowY: 'auto', background: '#000', flex: 1}}>
            <CardContent style={{position: 'relative', height: '100%',}}>
              {createLineChart(data, lineColor)}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    )
  }
}