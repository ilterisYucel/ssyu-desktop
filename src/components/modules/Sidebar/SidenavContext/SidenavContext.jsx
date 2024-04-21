import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext } from "react";

const SidenavContext = createContext(
  null
);

export function useSidenav() {
  const sidebar = useContext(SidenavContext);
  return { ...(sidebar) };
}

export function SidenavProvider({
  children,
  ...props
}) {
  const disclosure = useDisclosure();
  return (
    <SidenavContext.Provider value={{ ...disclosure }} {...props}>
      {children}
    </SidenavContext.Provider>
  );
}

export default SidenavProvider;