// components/ActivityCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteActivity } from '../state/actions';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { router } from 'expo-router';

interface Activity {
  id: string;
  firstName: string;
  lastName: string;
  activityName: string;
  activityDate: string;
}

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    router.push({
      pathname: '/(tabs)/listActivity',
      params: { id: activity.id }
    });
  };

  const handleDelete = () => {
    dispatch(deleteActivity(activity.id));
  };

  // Format date for display
  const formattedDate = activity.activityDate ? 
    format(new Date(activity.activityDate), 'MMMM dd, yyyy') : 
    'No date';

  return (
    <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800">{activity.activityName}</Text>
          <Text className="text-gray-600 mt-1">{activity.firstName} {activity.lastName}</Text>
          <Text className="text-gray-500 text-sm mt-2">{formattedDate}</Text>
        </View>
        <View className="flex-row">
          <TouchableOpacity 
            onPress={handleEdit}
            className="p-2 mr-1 rounded-full bg-blue-50"
          >
            <Ionicons name="pencil" size={18} color="#3b82f6" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleDelete}
            className="p-2 rounded-full bg-red-50"
          >
            <Ionicons name="trash-outline" size={18} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ActivityCard;