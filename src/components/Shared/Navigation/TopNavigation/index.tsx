import { TopNavigationContainer, TopNavigationLogo } from "./style";
import { LegacyRef, forwardRef } from "react";
import Image from "next/image";
import TonIcon from "@/assets/icons/ton.svg";
import { TonConnectButton } from "@tonconnect/ui-react";

const TopNavigation = forwardRef((_, ref: LegacyRef<HTMLElement>) => {
  return (
    <TopNavigationContainer ref={ref}>
      <TopNavigationLogo>
        <Image src={TonIcon} alt="Ton Icon" fill />
      </TopNavigationLogo>
      <TonConnectButton />
    </TopNavigationContainer>
  );
});

export default TopNavigation;
