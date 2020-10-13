export const lightTheme = {
    "--color-solid": "black",
    "--color-surface": "white",
    "--color-primary": "teal"
  };
  
  export const darkTheme = {
    "--color-solid": "#e3e5e0",
    "--color-surface": "#342434",
    "--color-primary": "purple"
  };
  
  export const applyTheme = nextTheme => {
      const theme = nextTheme;
      // console.log(theme);
      Object.keys(theme).map(key => {
        const value = theme[key];
        document.documentElement.style.setProperty(key, value);
      });
  };