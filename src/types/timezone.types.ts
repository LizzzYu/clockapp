export interface Timezone {
  label: string;
  timezone: string;
  latitude: number;
  longitude: number;
}

export interface TimezoneState {
  clocks: Timezone[];
}