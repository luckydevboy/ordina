import type { Meta, StoryObj } from "@storybook/react";

import Datepicker from "../components/DatePicker";

const meta = {
  title: "Datepicker",
  component: Datepicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Datepicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: (day: number) => console.log(day),
    firstDayOfWeek: "Saturday",
  },
};
