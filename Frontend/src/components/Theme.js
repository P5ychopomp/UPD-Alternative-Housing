import { extendTheme } from "@chakra-ui/react";

const Theme = extendTheme({
  fonts: {
    heading: `'Source Sans Pro', sans-serif`,
    body: `'Source Sans Pro', sans-serif`,
  },
  colors: {
    upd: {
      50: "#FFE1DF",
      100: "#FFBFC5",
      200: "#E19CA5",
      300: "#C57983",
      400: "#B0606B",
      500: "#994352",
      600: "#8B3B4B",
      700: "#792E3F",
      800: "#692338",
      900: "#58152E",
    },
  },
});

export default Theme;
