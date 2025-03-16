// components/TabBarIcon.tsx
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface TabBarIconProps {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ name, color }) => {
  return <Ionicons name={name} size={24} color={color} />;
};

export default TabBarIcon;