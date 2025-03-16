// app/_layout.tsx
import '../globals.css'
import { Tabs } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../state/store';
import TabBarIcon from '../components/TabBarIcon';
import { StatusBar } from 'expo-status-bar';

export default function AppLayout() {
  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#3b82f6',
          tabBarInactiveTintColor: '#94a3b8',
          tabBarStyle: {
            elevation: 0,
            borderTopWidth: 1,
            borderTopColor: '#e2e8f0',
            height: 60,
            paddingBottom: 10,
          },
          headerStyle: {
            backgroundColor: '#ffffff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#f1f5f9',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}
      >
        <Tabs.Screen
          name="listActivity"
          options={{
            title: 'Activities',
            tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          }}
        />
        <Tabs.Screen
          name="addActivity"
          options={{
            title: 'Add Activity',
            tabBarIcon: ({ color }) => <TabBarIcon name="add-circle" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
          }}
        />
      </Tabs>
    </Provider>
  );
}