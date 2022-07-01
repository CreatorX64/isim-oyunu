import type { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { Timer } from "components/Timer";

export default {
  title: "Timer",
  component: Timer,
  decorators: [(story) => <div style={{ backgroundColor: "var(--color-gray-200)" }}>{story()}</div>]
} as ComponentMeta<typeof Timer>;

const Template: ComponentStory<typeof Timer> = (args) => <Timer {...args} />;

export const Default = Template.bind({});
Default.args = {
  seconds: 8
};

export const MinutesPassed = Template.bind({});
MinutesPassed.args = {
  seconds: 325 // 05:25
};

export const ZeroPassed = Template.bind({});
ZeroPassed.args = {
  seconds: 0
};
