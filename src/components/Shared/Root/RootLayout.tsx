import styled, { css } from "styled-components";
import styles from "@/styles";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import BottomNavigation from "../Navigation/BottomNavigation";
import TopNavigation from "../Navigation/TopNavigation";

const RootLayoutContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (min-width: ${styles.breakpoints.medium}) {
    flex-direction: row;
    align-items: flex-start;
  }

  ${({ theme }) => css`
    background: ${theme.colors.background};
  `}
`;

const RootLayoutContent = styled.div<{
  topOffset: number;
  bottomOffset: number;
  viewportHeight: number;
}>`
  position: relative;
  width: 100%;
  padding: 12px 24px;
  box-sizing: border-box;

  overflow-y: auto;
  overflow-x: hidden;

  ${({ topOffset, bottomOffset, viewportHeight }) => css`
    height: calc(${viewportHeight}px - ${topOffset}px - ${bottomOffset}px);
    margin-top: ${topOffset}px;
  `}
`;

const RootLayout = ({ children }: PropsWithChildren) => {
  const topNavigationRef = useRef<HTMLDivElement>(null);
  const [topNavigationOffset, setTopNavigationOffset] = useState<number>(0);

  const bottomNavigationRef = useRef<HTMLDivElement>(null);
  const [bottomNavigationOffset, setBottomNavigationOffset] =
    useState<number>(0);

  const [viewportHeight, setViewportHeight] = useState<number>(
    window.innerHeight
  );

  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const initialViewportHeight = window.innerHeight;

  useEffect(() => {
    setTopNavigationOffset(topNavigationRef.current?.clientHeight ?? 0);
    setBottomNavigationOffset(bottomNavigationRef.current?.clientHeight ?? 0);
  }, [topNavigationRef.current, bottomNavigationRef.current]);

  useEffect(() => {
    const handleResize = () => {
      const currentViewportHeight =
        window.visualViewport?.height || window.innerHeight;
      setViewportHeight(currentViewportHeight);
      setIsKeyboardVisible(currentViewportHeight < initialViewportHeight * 0.8);
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <TopNavigation ref={topNavigationRef} />
      <BottomNavigation ref={bottomNavigationRef} />
      <RootLayoutContainer>
        <RootLayoutContent
          viewportHeight={viewportHeight}
          topOffset={topNavigationOffset}
          bottomOffset={isKeyboardVisible ? 0 : bottomNavigationOffset}
        >
          {children}
        </RootLayoutContent>
      </RootLayoutContainer>
    </>
  );
};

export default RootLayout;
