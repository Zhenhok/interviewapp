import {ImageSourcePropType} from 'react-native';
import {IconsKeys} from '.';

export type TabIconsCollectionType = {
  aboutApp: TabIconType;
  qoutes: TabIconType;
};

type TabIconType = {
  active: ImageSourcePropType;
  inactive: ImageSourcePropType;
};

export type IconsListType = {
  [key in keyof IconsKeys]: IconType;
};

type IconType = {
  path: ImageSourcePropType;
  size: ImageSize;
};

type ImageSize = {
  width: number;
  height: number;
};
