import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const confing: ThemeConfig = {
    initialColorMode: 'dark'
}

const theme = extendTheme({confing});

export default theme;
