import React, { useState } from 'react';

export const myContext = React.createContext();

const Provider = children => {
  const [theme, setTheme] = useState('study');
  debugger;

  return (
    <myContext.Provider value={{
      theme,
      changeTheme: () => setTheme(!theme)
    }}>
      {children}
    </myContext.Provider>
  )
};

export default Provider