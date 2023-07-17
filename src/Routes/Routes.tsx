// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Views/Home/Home';
import Tasks from '../Views/Tasks/Tasks';
import TasksForm from '../Views/Tasks/TasksForm/TasksForm';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          options={{
            headerShown: false
          }}
          name="Home">
          {(props) => <Home {...props} />}
        </Stack.Screen>

        <Stack.Screen name="Tasks">
          {(props) => <Tasks {...props} />}
        </Stack.Screen>

        <Stack.Screen options={{title: 'Criar tarefa'}} name="CreateTask">
          {(props) => <TasksForm {...props}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;