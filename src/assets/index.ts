import {ImageSourcePropType} from 'react-native';
import {IconsListType, TabIconsCollectionType} from './types';

export const TabIconsCollection: TabIconsCollectionType = {
  aboutApp: {
    active: require('./icons/aboutActive.png'),
    inactive: require('./icons/aboutInactive.png'),
  },
  qoutes: {
    active: require('./icons/quotesActive.png'),
    inactive: require('./icons/quotesInactive.png'),
  },
};

export const NoImageIcon: ImageSourcePropType = require('./icons/noIcon.png');

export const Icons: IconsListType = {
  bidIcon: {
    path: require('./icons/bidIcon.png'),
    size: {width: 20, height: 20},
  },
  lastSaleIcon: {
    path: require('./icons/lastSaleIcon.png'),
    size: {width: 20, height: 20},
  },
};

export type IconsKeys = {
  bidIcon: string;
  lastSaleIcon: string;
};
