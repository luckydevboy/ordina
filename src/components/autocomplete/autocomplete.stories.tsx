import Autocomplete from "./autocomplete.tsx";
import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
  title: "Autocomplete",
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Autocomplete>;

export const Default: Story = {
  args: {
    placeholder: "Search...",
  },
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <>
        <Autocomplete
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          searchField="name"
          apiUrl={`http://localhost:3000/api/v1/search?q=${value}`}
        />
      </>
    );
  },
};
