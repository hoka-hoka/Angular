import { Meta, Story } from '@storybook/angular';

import BooleanButtonComponent from 'common/button/boolean-button/boolean-button.component';
import ButtonType from 'common/button/default-button/model/buttonType.enum';

export default {
  title: 'Example/Buttons/BooleanButton',
  component: BooleanButtonComponent,
  argTypes: {
    disableText: {
      table: {
        category: 'Text'
      }
    },

    activeText: {
      table: {
        category: 'Text'
      }
    }
  },

  /**
   * Настройка примера кода в документации
   */
  parameters: {
    docs: {
      source: {
        // code: ''
      },

      description: {
        component: 'Переключаемая кнопка'
      }
    }
  }
} as Meta;

export const Default: Story<BooleanButtonComponent> = (args: BooleanButtonComponent) => ({
  props: {
    disableText: 'off',
    activeText: 'on',
    buttonType: args.buttonType,
    action: args.action,
    btnText: args.action ? args.activeText : args.disableText
  }
});

/**
 * История пассивного состояния
 */
Default.args = {
  disableText: 'off',
  activeText: 'on',
  action: false
};

/**
 * История активного состояния
 */
export const Active = Default.bind({});

Active.args = {
  buttonType: ButtonType.access,
  disableText: 'off',
  activeText: 'on',
  action: true
};
