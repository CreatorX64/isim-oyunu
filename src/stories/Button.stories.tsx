import type { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { Button } from "components/Button";
import { PlayIcon } from "icons/PlayIcon";

export default {
  title: "Button",
  component: Button
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "tekrar oyna?"
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  text: "başlamak için tıkla",
  Icon: PlayIcon
};
