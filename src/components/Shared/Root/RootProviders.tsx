import { init, isTMA } from "@telegram-apps/sdk-react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { PropsWithChildren, useMemo, useEffect, useState } from "react";
import RootLayout from "./RootLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootDesktopLayout from "./Desktop/RootDesktopLayout";
import Spinner from "../Loader/Spinner";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "@/styles/theme";

const RootProviders = ({ children }: PropsWithChildren) => {
  const debug = true;
  const [isInTelegramWebApp, setIsInTelegramWebApp] = useState<boolean | null>(
    null
  );
  const manifestUrl = useMemo(() => {
    return new URL("tonconnect-manifest.json", window.location.href).toString();
  }, []);
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  useEffect(() => {
    if (debug) {
      import("eruda").then((lib) => lib.default.init());
    }
  }, [debug]);

  useEffect(() => {
    const checkIsTelegramApp = async () => {
      try {
        const result = await isTMA();
        setIsInTelegramWebApp(result);
        if (result) init();
      } catch (error) {
        console.error("Error checking if in Telegram Web App:", error);
        setIsInTelegramWebApp(false);
      }
    };

    checkIsTelegramApp();
  }, []);

  if (isInTelegramWebApp === null) {
    return <Spinner />;
  }

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
          {isInTelegramWebApp ? (
            <RootLayout>{children}</RootLayout>
          ) : (
            <RootDesktopLayout>{children}</RootDesktopLayout>
          )}
        </ThemeProvider>
      </QueryClientProvider>
    </TonConnectUIProvider>
  );
};
export default RootProviders;
