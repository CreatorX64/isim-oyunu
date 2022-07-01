import type { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { PlayerStatus } from "components/PlayerStatus";

export default {
  title: "PlayerStatus",
  component: PlayerStatus
} as ComponentMeta<typeof PlayerStatus>;

const Template: ComponentStory<typeof PlayerStatus> = (args) => <PlayerStatus {...args} />;

export const ActivePlayer = Template.bind({});
ActivePlayer.args = {
  playerName: "oyuncu",
  isActive: true
};

export const FirstInactivePlayer = Template.bind({});
FirstInactivePlayer.args = {
  playerName: "oyuncu"
};

export const InactivePlayer = Template.bind({});
InactivePlayer.args = {
  playerName: "oyuncu",
  latestGuess: "ahmet"
};

export const WinnerColored = Template.bind({});
WinnerColored.args = {
  playerName: "oyuncu",
  theme: "winner",
  resultMessage: "18 kelime bildin"
};

export const WinnerNoColor = Template.bind({});
WinnerNoColor.args = {
  playerName: "bilgisayar",
  resultMessage: "凸(¬‿¬)凸"
};

export const LoserColored = Template.bind({});
LoserColored.args = {
  playerName: "oyuncu",
  theme: "loser",
  resultMessage: "18 kelime bildin"
};

export const LoserNoColor = Template.bind({});
LoserNoColor.args = {
  playerName: "bilgisayar",
  resultMessage: "ಥ_ಥ"
};
