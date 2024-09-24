import { SDKProvider } from "@telegram-apps/sdk-react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import App from "next/app";
import { PropsWithChildren, useMemo, useEffect } from "react";
import RootLayout from "./RootLayout";
import RootBinding from "./RootBinding";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const RootProviders = ({ children }: PropsWithChildren) => {
  // const debug = useLaunchParams().startParam === "debug";
  const debug = true;

  const manifestUrl = useMemo(() => {
    return new URL("tonconnect-manifest.json", window.location.href).toString();
  }, []);

  useEffect(() => {
    if (debug) {
      import("eruda").then((lib) => lib.default.init());
    }
  }, [debug]);

  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <SDKProvider acceptCustomStyles debug={debug}>
        <QueryClientProvider client={queryClient}>
          <RootLayout>
            <RootBinding>{children}</RootBinding>
          </RootLayout>
        </QueryClientProvider>
      </SDKProvider>
    </TonConnectUIProvider>
  );
};
export default RootProviders;
