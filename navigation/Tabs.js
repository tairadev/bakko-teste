import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screen/Login';
import Logout from '../screen/Logout';
import Eventos from '../screen/Eventos';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false
    }}>
      <Tab.Screen 
        name="Eventos" 
        component={Eventos} 
      />
      <Tab.Screen 
        name="Login" 
        component={Login} 
      />
      <Tab.Screen 
        name="Eventos 2" 
        component={Eventos} 
      />
      <Tab.Screen 
        name="Logout" 
        component={Logout} 
      />
    </Tab.Navigator>
  );
}