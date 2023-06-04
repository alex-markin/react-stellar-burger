
import { createSlice } from '@reduxjs/toolkit';

export const tabsNavigationSlice = createSlice({
  name: 'tabsNavigation',
  initialState: {
    activeTab: "Булки",
  },
  reducers: {
    selectTab: (state, action) => {
      state.activeTab = action.payload;
    }
  }
});
