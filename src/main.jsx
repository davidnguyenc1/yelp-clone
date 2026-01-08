import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </>
);
