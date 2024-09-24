"use client";

import { usePathname, useRouter } from "next/navigation";
import { forwardRef, LegacyRef, useEffect } from "react";
import {
  BottomNavigationContainer,
  BottomNavigationIcon,
  BottomNavigationItem,
  BottomNavigationItemLabel,
} from "./style";
import NAVIGATION from "@/utils/navigation";
import Image from "next/image";
import { isTrue } from "@/utils/styled-helper";
import Link from "next/link";

const BottomNavigation = forwardRef((_, ref: LegacyRef<HTMLElement>) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleRoute = (path: string) => {};

  return (
    <BottomNavigationContainer ref={ref}>
      {NAVIGATION.map((_navigation) => (
        <Link key={_navigation.id} href={_navigation.href} style={{ flex: 1 }}>
          <BottomNavigationItem>
            <BottomNavigationIcon
              selected={isTrue(_navigation.href === pathname)}
            >
              <Image src={_navigation.icon} alt={_navigation.id} fill />
            </BottomNavigationIcon>
            <BottomNavigationItemLabel
              selected={isTrue(_navigation.href === pathname)}
            >
              {_navigation.label}
            </BottomNavigationItemLabel>
          </BottomNavigationItem>
        </Link>
      ))}
    </BottomNavigationContainer>
  );
});

export default BottomNavigation;
