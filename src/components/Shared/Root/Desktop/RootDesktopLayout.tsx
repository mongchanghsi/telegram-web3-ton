import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useTonWallet } from "@tonconnect/ui-react";

const RootDesktopLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default RootDesktopLayout;
