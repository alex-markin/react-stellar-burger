
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type tabs = "Булки" | "Соусы" | "Начинки";

type TabsNavigationState = {
  activeTab: tabs,
}

const initialState: TabsNavigationState = {
  activeTab: "Булки",
};

export const tabsNavigationSlice = createSlice({
  name: 'tabsNavigation',
  initialState,
  reducers: {
    selectTab: (state, action: PayloadAction<tabs>) => {
      state.activeTab = action.payload;
    }
  }
});
