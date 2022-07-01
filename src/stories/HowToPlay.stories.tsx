import type { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { HowToPlay } from "components/HowToPlay";

export default {
  title: "HowToPlay",
  component: HowToPlay
} as ComponentMeta<typeof HowToPlay>;

const Template: ComponentStory<typeof HowToPlay> = (args) => <HowToPlay {...args} />;

export const Default = Template.bind({});
