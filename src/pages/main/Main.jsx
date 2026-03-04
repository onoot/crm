import React, { useState } from 'react';
 import { alpha } from '@mui/material/styles';
import MainGrid from '../../components/MainGrid';
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


const Main = () => {
  const theme = useTheme();
 

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Box sx={{ display: 'flex' }}>
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <MainGrid />
          </Stack>
        </Box>
      </Box>
    </SignInContainer>
  );
};

export default Main;