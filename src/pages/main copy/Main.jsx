import React, { useState } from 'react';
import {
  Box,
  Divider,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  IconButton,
  Tooltip,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  LocalHospital as LocalHospitalIcon,
  CalendarMonth as CalendarMonthIcon,
  AccessTime as AccessTimeIcon,
  CalendarToday as CalendarTodayIcon,
  AttachMoney as AttachMoneyIcon,
  Group as GroupIcon,
  MedicalServices as MedicalServicesIcon
} from '@mui/icons-material';
import { 
    Card,
    SignInContainer,
} from '../../UI/card';


const AnalyticsDashboard = () => {
  const theme = useTheme();
 

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined" sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
         
      </Card>
    </SignInContainer>
  );
};

export default AnalyticsDashboard;