import {createStackNavigator} from '@react-navigation/stack';
import MyTabs from './TabMaterial';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
      options={{
        headerShown  :false,
      }}
      name="Home" component={MyTabs} />
    </Stack.Navigator>
  );
}