import styled, { css } from "styled-components";
import styles from "@/styles";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import BottomNavigation from "../Navigation/BottomNavigation";
import TopNavigation from "../Navigation/TopNavigation";
import { useTonWallet } from "@tonconnect/ui-react";

const RootLayoutContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (min-width: ${styles.breakpoints.medium}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const RootLayoutContent = styled.div<{
  topOffset: number;
  bottomOffset: number;
}>`
  position: relative;
  width: 100%;
  padding: 12px 24px;
  box-sizing: border-box;

  overflow-y: auto;
  overflow-x: hidden;

  ${({ topOffset, bottomOffset }) => css`
    min-height: calc(
      100vh - ${topOffset}px - ${bottomOffset}px
    ); /* old browsers */
    min-height: calc(
      100dvh - ${topOffset}px - ${bottomOffset}px
    ); /* new browsers */

    max-height: calc(
      100vh - ${topOffset}px - ${bottomOffset}px
    ); /* old browsers */
    max-height: calc(
      100dvh - ${topOffset}px - ${bottomOffset}px
    ); /* new browsers */

    margin-top: ${topOffset}px;
  `}
`;

const RootLayout = ({ children }: PropsWithChildren) => {
  const wallet = useTonWallet();

  const topNavigationRef = useRef<HTMLDivElement>(null);
  const [topNavigationOffset, setTopNavigationOffset] = useState<number>(0);

  const bottomNavigationRef = useRef<HTMLDivElement>(null);
  const [bottomNavigationOffset, setBottomNavigationOffset] =
    useState<number>(0);

  useEffect(() => {
    setTopNavigationOffset(topNavigationRef.current?.clientHeight ?? 0);
    setBottomNavigationOffset(bottomNavigationRef.current?.clientHeight ?? 0);
  }, [topNavigationRef.current, bottomNavigationRef.current]);

  return (
    <>
      <TopNavigation ref={topNavigationRef} />
      {wallet && <BottomNavigation ref={bottomNavigationRef} />}
      <RootLayoutContainer>
        <RootLayoutContent
          topOffset={topNavigationOffset}
          bottomOffset={bottomNavigationOffset}
        >
          {children}
        </RootLayoutContent>
      </RootLayoutContainer>
    </>
  );
};

export default RootLayout;
