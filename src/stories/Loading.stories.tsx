import type { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { Loading } from "components/Loading";

export default {
  title: "Loading",
  component: Loading
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => <Loading {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: "lütfen mikrofon kullanımı için izin ver (っ◕‿◕)っ"
};
