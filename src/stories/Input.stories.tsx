import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Input from "../components/Input";
import "../output.css";

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    className: "w-96",
    placeholder: "you@example.com",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const InputWithLabelAndHelpText: Story = {
  args: {
    label: "Email",
    helpText: "We'll only use this for spam.",
  },
};

export const InputWithLabelAndValidationError: Story = {
  args: {
    label: "Email",
    error: "We'll only use this for spam.",
  },
};

export const InputWithHiddenLabel: Story = {
  args: {},
};

export const InputWithDisabledState: Story = {
  args: {
    disabled: true,
  },
};
