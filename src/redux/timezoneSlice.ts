import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIMEZONE_OPTIONS } from '../constants/timezones.const';
import { Timezone, TimezoneState } from '../types/timezone.types';



const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const localClock = 
  TIMEZONE_OPTIONS.find((option) => option.timezone === localTimezone) ||
  { label: 'Local', timezone: 'local', latitude: 0, longitude: 0 };

const initialState: TimezoneState = {
  clocks: [
    localClock,
    { label: 'New York', timezone: 'America/New_York', latitude: 40.7128, longitude: -74.006 }, // 預設時區
  ],
};

const timezoneSlice = createSlice({
  name: 'timezones',
  initialState,
  reducers: {
    updateClock(state, action: PayloadAction<{ index: number; timezone: Timezone }>) {
      const { index, timezone } = action.payload;
      state.clocks[index] = timezone;
    },
  },
});

export const { updateClock } = timezoneSlice.actions;
export default timezoneSlice.reducer;
