import { Meta, Story } from '@storybook/angular';
import SelectButtonComponent from 'app/common/button/select-button/select-button.component';

export default {
  title: 'Example/Buttons/SelectButton',
  component: SelectButtonComponent,

  parameters: {
    docs: {
      description: {
        component: 'Список кнопок',
      },
    },
  },
} as Meta;

export const Default: Story<SelectButtonComponent> = (args: SelectButtonComponent) => ({
  props: { options: args.options },
});

Default.args = {
  options: [
    {
      id: 0,
      name: 'test1',
    },
    {
      id: 1,
      name: 'test2',
    },
    {
      id: 2,
      name: 'test3',
    },
    {
      id: 3,
      name: 'test4',
    },
  ],
};
