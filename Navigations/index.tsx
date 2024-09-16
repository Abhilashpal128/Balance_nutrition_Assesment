import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from '../components/Header';
import WorkoutMealDetails from '../components/WorkoutMealDetails';
import MealAccordion from '../components/Common/MealAccordian';

export default function AppNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Foods Recall Details"
        component={MealAccordion}
        options={({route}) => ({
          header: () => <Header title={route.name} />, // Dynamic title based on route name
        })}
      />
      <Stack.Screen
        name="Workout Meal Details"
        component={WorkoutMealDetails}
        options={({route}) => ({
          header: () => <Header title={route.name} />, // Dynamic title based on route name
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});
