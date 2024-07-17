import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../main.ts";
import "../output.css";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Button",
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: { type: "select" },
    },
    variant: {
      options: ["primary", "secondary", "soft"],
      control: { type: "select" },
    },
    rounded: {
      control: { type: "boolean" },
    },
    circular: {
      control: { type: "boolean" },
    },
  },
  args: {
    children: "Button text",
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const PrimaryLarge: Story = {
  args: {
    size: "lg",
    variant: "primary",
  },
};

export const PrimaryExtraSmall: Story = {
  args: {
    size: "xs",
    variant: "primary",
  },
};

export const SecondaryLarge: Story = {
  args: {
    size: "lg",
    variant: "secondary",
  },
};

export const SoftLarge: Story = {
  args: {
    size: "lg",
    variant: "soft",
  },
};

export const PrimaryLargeRounded: Story = {
  args: {
    size: "lg",
    variant: "primary",
    rounded: true,
  },
};

export const PrimaryLargeWithIcon: Story = {
  args: {
    size: "lg",
    variant: "primary",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
    iconPosition: "start",
  },
};

export const PrimaryLargeCircular: Story = {
  args: {
    size: "lg",
    variant: "primary",
    circular: true,
    children: "",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    ),
  },
};
