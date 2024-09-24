"use client";

import { useDidMount } from "@/hooks/common/useDidMount";
import { ErrorBoundary } from "../Error/ErrorBoundary";
import ErrorView from "@/views/ErrorView";
import { PropsWithChildren } from "react";
import RootProviders from "./RootProviders";

// TODO: Update loading UI
const Root = (props: PropsWithChildren) => {
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorView}>
      <RootProviders {...props} />
    </ErrorBoundary>
  ) : (
    <div className="root__loading">Loading</div>
  );
};

export default Root;
