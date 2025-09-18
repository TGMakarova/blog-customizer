import type { Meta, StoryObj } from '@storybook/react';

import { Article } from './Article';

const meta = {
  component: Article,
  tags: ['autodocs']
} satisfies Meta<typeof Article>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};