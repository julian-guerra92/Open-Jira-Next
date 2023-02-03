import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
   sidemenuOpen: boolean;
   isAddingEntry: boolean;
   isDraggingEntry: boolean;
}

interface Props {
   children: JSX.Element | JSX.Element[];
}

const UI_INITIAL_STATE: UIState = {
   sidemenuOpen: false,
   isAddingEntry: false,
   isDraggingEntry: false
}

export const UIProvider = ({ children }: Props) => {

   const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

   const openSideMenu = () => {
      dispatch({ type: 'UI - Open Sidebar' });
   }

   const closeSideMenu = () => {
      dispatch({ type: 'UI - Close Sidebar' });
   }

   const setIsAddingEntry = (isAdding: boolean) => {
      dispatch({ type: 'UI - Is Adding Entry', payload: isAdding });
   }

   const setIsDraggingEntry = (isDragging: boolean) => {
      dispatch({ type: 'UI - Is Dragging Entry', payload: isDragging });
   }

   return (
      <UIContext.Provider value={{
         ...state,
         //Methods
         openSideMenu,
         closeSideMenu,
         setIsAddingEntry,
         setIsDraggingEntry
      }}>
         {children}
      </UIContext.Provider>
   )
}