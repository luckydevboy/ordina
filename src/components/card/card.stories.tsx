import Card from "./card";

export default {
  title: "Card",
  component: Card,
  tags: ["autodocs"],
};

export const Default = {
  args: {
    title: "Card title",
    subTitle: "Card sub title",
    children: <p>Hello world!</p>,
  },
};
