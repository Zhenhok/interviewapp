import React, {useRef} from 'react';
import {
  NavigationContainer,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {FC} from 'react';
import {AboutAppScreen, QuotesScreen} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, ImageSourcePropType} from 'react-native';
import {NoImageIcon, TabIconsCollection} from '../assets';

const TabStack = createBottomTabNavigator();

const AppRoutes: FC = () => {
  const getIcon = (
    focused: boolean,
    route: RouteProp<ParamListBase, string>
  ) => {
    let icon: ImageSourcePropType = NoImageIcon;
    switch (route.name) {
      case 'AboutAppScreen':
        icon = focused
          ? TabIconsCollection.aboutApp.active
          : TabIconsCollection.aboutApp.inactive;
        break;
      case 'QuotesScreen':
        icon = focused
          ? TabIconsCollection.qoutes.active
          : TabIconsCollection.qoutes.inactive;
        break;
    }
    return <Image source={icon} style={{width: 25, height: 25}} />;
  };

  return (
    <NavigationContainer>
      <TabStack.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => getIcon(focused, route),
        })}
        initialRouteName="AboutAppScreen"
      >
        <TabStack.Screen
          name="AboutAppScreen"
          component={AboutAppScreen}
          options={{title: 'О приложении'}}
        />
        <TabStack.Screen
          name="QuotesScreen"
          component={QuotesScreen}
          options={{title: 'Котировки'}}
        />
      </TabStack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
