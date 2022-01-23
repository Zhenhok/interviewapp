import React, {FC, ReactNode, useEffect, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface IProps {
  children?: ReactNode;
  style?: ViewStyle;
}

const Page: FC<IProps> = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Page;
