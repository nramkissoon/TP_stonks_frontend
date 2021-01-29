import {
  UPDATE_INTERVAL_DEV,
  UPDATE_INTERVAL_PROD,
  ACCOUNT_DATA_API_URL,
  ENV_DEV,
  ENV_PROD
} from './consts';

export interface ConfigValues {
  updateInterval: number, 
  accountDataApiUrl: string,
  isProductionEnvironment: boolean
}

export const config = () => {
  const configValues: ConfigValues = {
    updateInterval: 1,
    accountDataApiUrl: ACCOUNT_DATA_API_URL,
    isProductionEnvironment: false,
  }
  if (process.env.NODE_ENV === ENV_DEV) {
    configValues.updateInterval = UPDATE_INTERVAL_DEV;
  } else if (process.env.NODE_ENV === ENV_PROD) {
    configValues.updateInterval = UPDATE_INTERVAL_PROD;
    configValues.isProductionEnvironment = true;
  }

  return configValues;
}