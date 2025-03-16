// app/(tabs)/profile.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Activity } from '@/state/types';

export default function Profile() {
  const activities = useSelector((state: any) => state.activityReducer.activities);
  
  // Calculate some stats
  const totalActivities = activities.length;
  const uniqueNames = new Set(activities.map((a: Activity) => `${a.firstName} ${a.lastName}`)).size;
  
  // Get most recent activity
  const sortedActivities = [...activities].sort((a: Activity, b: Activity) => 
    new Date(b.activityDate).getTime() - new Date(a.activityDate).getTime()
  );
  const recentActivity = sortedActivities.length > 0 ? sortedActivities[0] : null;

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-blue-100 rounded-full justify-center items-center mb-4">
            <Ionicons name="person" size={48} color="#3b82f6" />
          </View>
          <Text className="text-2xl font-bold text-gray-800">Activity Tracker</Text>
          <Text className="text-gray-500">Your personal activity manager</Text>
        </View>

        <View className="bg-white rounded-xl p-5 shadow-sm mb-5 border border-gray-100">
          <Text className="text-lg font-bold text-gray-800 mb-4">Activity Statistics</Text>
          
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-600">Total Activities</Text>
            <Text className="font-semibold text-gray-800">{totalActivities}</Text>
          </View>
          
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-600">Unique People</Text>
            <Text className="font-semibold text-gray-800">{uniqueNames}</Text>
          </View>
          
          {recentActivity && (
            <View className="mt-4 pt-4 border-t border-gray-100">
              <Text className="text-gray-600 mb-2">Most Recent Activity</Text>
              <Text className="font-semibold text-gray-800">{recentActivity.activityName}</Text>
              <Text className="text-gray-500 text-sm">
                {recentActivity.firstName} {recentActivity.lastName} • {recentActivity.activityDate}
              </Text>
            </View>
          )}
        </View>

        <View className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <Text className="text-lg font-bold text-gray-800 mb-4">About This App</Text>
          <Text className="text-gray-600 mb-3">
            This Activity Tracker app helps you keep track of activities for different people.
          </Text>
          <Text className="text-gray-600">
            Built with React Native, Expo Router, Redux, and NativeWind.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}