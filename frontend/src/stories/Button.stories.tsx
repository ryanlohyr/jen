import type { Meta, StoryObj } from "@storybook/react";

// import { Button } from "./Button";
import { Button } from "@/components/ui/button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
type ButtonPropsAndCustomArgs = React.ComponentProps<typeof Button> & {
  label?: string;
};

const meta: Meta<ButtonPropsAndCustomArgs> = {
  title: "ui/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  render: ({ label, ...args }) => <Button {...args}>{label}</Button>,
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    variant: "default",
    label: "Primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    label: "Secondary",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    label: "Destructive",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    label: "Ghost",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    label: "Link",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    label: "Outline",
  },
};
