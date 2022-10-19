import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {lightTheme} from '../../config/theme';
import FindInn from './screens/find-inn';
import FindInnDetail from './screens/find-inn-detail';
import {translate} from '../../constants/translate';

export default function FinnInnContainer() {
  const HomeStack = createStackNavigator();

  return (
    <HomeStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle: {
          backgroundColor: lightTheme.primary,
        },
        headerTitleAlign: 'center',
        headerTintColor: 'white',
      }}>
      <HomeStack.Screen
        name={'FindInnFindInn'}
        component={FindInn}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={'FindInnDetailFindInnDetail'}
        component={FindInnDetail}
        options={{
          headerTitle: translate.findInnDetail,
        }}
      />
    </HomeStack.Navigator>
  );
}
