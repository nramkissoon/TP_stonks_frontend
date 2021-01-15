import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { greenTextColor, redTextColor } from '../../utils/consts';
import { displayPercent } from '../../utils/numberDisplay'

const addDataIfExists = (data) => {
  if (data === 'total_cash') return 'Total Cash';
  if (typeof data === 'number') { data = parseFloat(data.toFixed(2)); }
  return data ? data : '';
}

const textColorStyle = (data: number) => {
  if (data === 0) return {};
  return {
    color: data > 0 ? greenTextColor : redTextColor
  }
}

const createRow = (position) => {
  const {
    POSITION,
    asset_type,
    average_cost_per_unit,
    day_gain_percent,
    day_gain_total,
    price,
    mkt_value,
    quantity,
    total_gain_percent,
    total_gain_total,
  } = position;
  return (
    <TableRow key={POSITION}>
      <TableCell component="th" scope="row">{ addDataIfExists(POSITION) }</TableCell>
      <TableCell align="right">{ addDataIfExists(asset_type) }</TableCell>
      <TableCell align="right" style={textColorStyle(day_gain_total)}>{ addDataIfExists(day_gain_total) }</TableCell>
      <TableCell align="right" style={textColorStyle(day_gain_percent)}>{ addDataIfExists(displayPercent(day_gain_percent)) }</TableCell>
      <TableCell align="right">{ addDataIfExists(price) }</TableCell>
      <TableCell align="right">{ addDataIfExists(quantity) }</TableCell>
      <TableCell align="right">{ addDataIfExists(mkt_value) }</TableCell>
      <TableCell align="right">{ addDataIfExists(average_cost_per_unit) }</TableCell>
      <TableCell align="right" style={textColorStyle(total_gain_total)}>{ addDataIfExists(total_gain_total) }</TableCell>
      <TableCell align="right" style={textColorStyle(total_gain_percent)}>{ addDataIfExists(displayPercent(total_gain_percent)) }</TableCell>
    </TableRow>
  );
}

const createOrderedRows = (positions: any[]) => {
  let rows = [];
  positions.forEach((position) => {
    if (position.POSITION === 'total_cash') {
      rows.push(createRow(position));
    } else {
      rows.unshift(createRow(position));
    }
  });
  return rows;
}

const tableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Position</TableCell>
        <TableCell align="right">Asset Type</TableCell>
        <TableCell align="right">Day Change $</TableCell>{/** this is the day gain for the asset NOT entire price * quant */}
        <TableCell align="right">Day Change %</TableCell>
        <TableCell align="right">Price</TableCell>
        <TableCell align="right">Quantity</TableCell>
        <TableCell align="right">Mkt Value</TableCell>
        <TableCell align="right">Cost Per Unit</TableCell>
        <TableCell align="right">Total Gain $</TableCell>
        <TableCell align="right">Total Gain %</TableCell>
      </TableRow>
    </TableHead>
  );
}

export const positionTable = (positions: any[]) => {
  return (
    <TableContainer component={Paper} elevation={3} style={{height: '100%'}}>
      <Table style={{ overflowX: 'auto' }}>
        <caption>Position limit excluding cash: 10 (current number of positions: {positions.length - 1 < 0 ? 0 : positions.length - 1})</caption>
        {tableHead()}
        <TableBody>
          { positions && createOrderedRows(positions) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
