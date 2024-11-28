import { ComponentType } from "@/types/component";
import { Component } from "./types";
import { generateRandomString } from "@/util";

export const defaultComponentValues: { [key in ComponentType]: Component } = {
  [ComponentType.Grid]: {
    id: generateRandomString(),
    type: ComponentType.Grid,
    children: [
      {
        id: generateRandomString(),
        component: null,
      },
      {
        id: generateRandomString(),
        component: null,
      },
    ],
  },
  [ComponentType.Text]: {
    id: generateRandomString(),
    type: ComponentType.Text,
    children: null,
  },
  [ComponentType.RichText]: {
    id: generateRandomString(),
    type: ComponentType.RichText,
    children: null,
  },
  [ComponentType.Image]: {
    id: generateRandomString(),
    type: ComponentType.Image,
    children: null,
  },
  [ComponentType.Banner]: {
    id: generateRandomString(),
    type: ComponentType.Banner,
    children: [
      {
        id: generateRandomString(),
        component: {
          id: generateRandomString(),
          type: ComponentType.Image,
          children: null,
        },
      },
      {
        id: generateRandomString(),
        component: {
          id: generateRandomString(),
          type: ComponentType.Text,
          children: null,
        },
      },
    ],
  },
};
