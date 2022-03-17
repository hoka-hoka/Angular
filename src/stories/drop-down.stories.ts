import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import SharedModule from 'shared/shared.module';

import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { IconSpriteModule } from 'ng-svg-icon-sprite';
import { FormsModule } from '@angular/forms';

import DropDownComponent from 'common/drop-down/drop-down.component';
import FilterComponent from 'common/filter/filter.component';

export default {
  title: 'Example/DropDownComponent',
  component: DropDownComponent,
  decorators: [
    moduleMetadata({
      declarations: [FilterComponent],
      imports: [BrowserModule, BrowserAnimationsModule, SharedModule, IconSpriteModule, FormsModule]
    })
  ],
  parameters: {}
} as Meta;

const Template: Story<DropDownComponent> = (args: DropDownComponent) => ({
  props: {
    options: args.options,
    placeHolder: args.placeHolder,
    action: args.action,
    filter: args.filter
  }
});

const options = [
  { id: 0, name: 'Vasia0' },
  { id: 1, name: 'Vasia1' },
  { id: 2, name: 'Vasia2' },
  { id: 3, name: 'Vasia3' },
  { id: 4, name: 'Vasia4' },
  { id: 5, name: 'Vasia5' },
  { id: 6, name: 'Vasia6' },
  { id: 7, name: 'Vasia7' },
  { id: 8, name: 'Vasia8' }
];

export const Basic = Template.bind({});
Basic.args = {
  options,
  placeHolder: 'Select a option'
  // action: true
};

export const Active = Template.bind({});
Active.args = {
  options,
  placeHolder: 'Select a option',
  action: true
};

export const Filtering = Template.bind({});
Filtering.args = {
  options,
  placeHolder: 'Select a option',
  action: true,
  filter: true
};
