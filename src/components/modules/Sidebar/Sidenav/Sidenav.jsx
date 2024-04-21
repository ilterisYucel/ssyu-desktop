import React, { useState } from "react";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

import {
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  DrawerBody,
  Icon,
} from "@chakra-ui/react";
import { SiWwise } from "react-icons/si";
import { SidenavProvider, useSidenav } from "../SidenavContext/index.js";
import SidenavItems from "../SidenavItems/index.js";

export default function Sidenav({ navItems }) {
  const { onOpen, isOpen, onClose } = useSidenav();

  return (
    <React.Fragment>
      <SidenavProvider>
        <Tooltip label="menü" placement="right">
          <IconButton
            size="lg"
            aria-label="menu"
            display={{ base: "flex", md: "none" }}
            background="transparent"
            borderRadius="xl"
            onClick={onOpen}
            icon={<FiMenu />}
          />
        </Tooltip>

        <VStack spacing="5" as="nav" display={{ base: "none", md: "flex" }}>
          <Icon as={SiWwise} boxSize={8} />
          <SidenavItems navItems={navItems} />
        </VStack>
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>SSYU</DrawerHeader>
            <DrawerBody>
              <SidenavItems navItems={navItems} mode="over" />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </SidenavProvider>
    </React.Fragment>
  );
}
