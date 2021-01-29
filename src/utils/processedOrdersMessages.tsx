import { whiteTextColor } from './consts';
import { displayTimeEST } from './numberDisplay'

const InvalidOrderReasons = {
  InsufficientBuyingPower: 'InsufficientBuyingPower',
  PositionLimitMet: 'PositionLimitMet',
  SellQuantityGreaterThanOwned: 'SellQuantityGreaterThanOwned',
  NoQuoteData: 'NoQuoteData',
  NoFractionalShares: 'NoFractionalShares'
}

interface OrderValidationInfo {
  invalidReason?: string
  isValid: boolean
}

interface UserOrderData {
  order: string,
  username?: string,
  "tmi-sent-ts"?: string,
  id?: string,
  subscriber?: boolean,
  color?: string,
  "user-id"?: string,
  badges?: {},
  "display-name"?: string;
}

export interface ProcessedOrder {
  orderValidationInfo: OrderValidationInfo
  userOrderData: UserOrderData
  processedTimestamp: number
  executed: boolean
}

const getQuantityFromOrder = (order: string) => {
  const orderComponents = order.split(" ");
  const quantity = Number.parseFloat(orderComponents[2])
  return quantity;
}

const getTickerSymbolFromOrder = (order: string) => {
  const orderComponents: string[] = order.split(" ");
  return orderComponents[1];
}

export const isBuyOrder = (order: string) => {
  const orderComponents = order.split(" ");
  const orderAction = orderComponents[0].substring(1, orderComponents[0].length);
  return orderAction === "BUY";
}

export const isSellOrder = (order: string) => {
  const orderComponents = order.split(" ");
  const orderAction = orderComponents[0].substring(1, orderComponents[0].length);
  return orderAction === "SELL";
}

// A check used to make sure orders from previous days are not being displayed today
const orderFromToday = (processedOrder: ProcessedOrder) => {
  const timestamp = processedOrder.processedTimestamp;
  const now = new Date().toLocaleDateString();
  return new Date(timestamp).toLocaleDateString() === now;
 }

const invalidOrderMessageStrings = (processedOrder: ProcessedOrder) => {
  const reason = processedOrder.orderValidationInfo.invalidReason;
  const order = processedOrder.userOrderData.order;
  const ticker = getTickerSymbolFromOrder(order);
  const quantity = getQuantityFromOrder(order);
  if (reason === InvalidOrderReasons.InsufficientBuyingPower) { return `cannot buy ${quantity} share${quantity > 1 ? 's' : ''} of ${ticker} with current buying power` }
  if (reason === InvalidOrderReasons.NoFractionalShares) { return `invalid order quantity: ${quantity}` }
  if (reason === InvalidOrderReasons.PositionLimitMet) { return `position limit met, cannot buy ${ticker}` }
  if (reason === InvalidOrderReasons.SellQuantityGreaterThanOwned) { return `cannot sell ${quantity} share${quantity > 1 ? 's' : ''} of ${ticker}` }
  if (reason === InvalidOrderReasons.NoQuoteData) { return `no quote data found for ${ticker}` }
}

const createOrderResultMessage = (processedOrder: ProcessedOrder) => {
  if (!processedOrder) { return '' }
  const order = processedOrder.userOrderData.order;
  const ticker = getTickerSymbolFromOrder(order);
  const quantity = getQuantityFromOrder(order);
  if (processedOrder.orderValidationInfo.isValid) {
    if (isBuyOrder(order)) {
      return `bought ${quantity} share${quantity > 1 ? 's' : ''} of ${ticker}` //TODO add prices
    } else if (isSellOrder(order)) {
      return `sold ${quantity} share${quantity > 1 ? 's' : ''} of ${ticker}`
    }
  } else {
    return invalidOrderMessageStrings(processedOrder);
  }
}

export const getUserColor = (processedOrder: ProcessedOrder) => {
  return processedOrder.userOrderData.color ? processedOrder.userOrderData.color : whiteTextColor;
}

export const processedOrderToMessageElement = (processedOrder: ProcessedOrder) => {
  const messageString = createOrderResultMessage(processedOrder);
  if (!messageString) { return; }
  return (
    <p key={`${processedOrder.processedTimestamp}${processedOrder.userOrderData['tmi-sent-ts']}`} style={{paddingBottom: '2%'}}>
      { displayTimeEST(processedOrder.processedTimestamp)}:{' '}
      <span style={{color: getUserColor(processedOrder)}}>
        <b>{processedOrder.userOrderData['display-name']}</b>
      </span>
      {' '}
      {messageString}
    </p>);
}

export const processedOrderToMessageElements = (processedOrders: ProcessedOrder[]) => {
  return processedOrders.map((order) => processedOrderToMessageElement(order));
}