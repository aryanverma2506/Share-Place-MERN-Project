import React from "react";

import AuthProvider from "./auth/AuthProvider";

function AllContextProvider(
  props: React.PropsWithChildren
): React.ReactElement {
  return <AuthProvider children={props.children} />;
}

export default AllContextProvider;
