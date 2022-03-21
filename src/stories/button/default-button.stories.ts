import { Meta, Story } from '@storybook/angular';
import DefaultButtonComponent from 'app/common/button/default-button/default-button.component';
import ButtonType from 'app/common/button/default-button/model/buttonType.enum';

export default {
  title: 'Example/Buttons/DefaultButton',
  component: DefaultButtonComponent,
  parameters: {
    docs: {
      source: {
        // code: ''
      },

      description: {
        component: 'Кнопка по умолчанию',
      },
    },
  },
} as Meta;

export const Default: Story<DefaultButtonComponent> = (args: DefaultButtonComponent) => ({
  props: {
    ...args,
  },
});

/**
 * По умолчанию
 */
Default.args = {
  labelText: 'Text',
};

/**
 * Подтверждения
 */
export const Active = Default.bind({});

Active.args = {
  buttonType: ButtonType.access,
  labelText: 'Text',
};
