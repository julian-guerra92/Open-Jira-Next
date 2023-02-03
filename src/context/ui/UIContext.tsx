
import { createContext } from 'react';

interface ContextProps {
   sidemenuOpen: boolean;
   isAddingEntry: boolean;
   isDraggingEntry: boolean;
   //Methods
   closeSideMenu: () => void;
   openSideMenu: () => void;
   setIsAddingEntry: (isActive: boolean) => void;
   setIsDraggingEntry: (isDragging: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);