import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

import DropDownComponent from 'app/modules/drop-down/drop-down.component';
import DropDownModule from 'app/modules/drop-down/drop-down.module';

export default {
  title: 'Example/DropDownComponent',
  component: DropDownComponent,
  decorators: [
    moduleMetadata({
      imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        AngularSvgIconModule.forRoot(),
        FormsModule,
        DropDownModule,
      ],
    }),
  ],
  parameters: {},
} as Meta;

const Template: Story<DropDownComponent> = (args: DropDownComponent) => ({
  props: {
    options: args.options,
    placeHolder: args.placeHolder,
    active: args.active,
    filter: args.filter,
  },
});

const options = [
  { id: 0, value: 'Vasia0' },
  { id: 1, value: 'Vasia1' },
  { id: 2, value: 'Vasia2' },
  { id: 3, value: 'Vasia3' },
  { id: 4, value: 'Vasia4' },
  { id: 5, value: 'Vasia5' },
  { id: 6, value: 'Vasia6' },
  { id: 7, value: 'Vasia7' },
  { id: 8, value: 'Vasia8' },
];

export const Basic = Template.bind({});
Basic.args = {
  options,
  placeHolder: 'Select a option',
};

export const Active = Template.bind({});
Active.args = {
  options,
  placeHolder: 'Select a option',
  active: true,
};

export const Filtering = Template.bind({});
Filtering.args = {
  options,
  placeHolder: 'Select a option',
  active: true,
  filter: true,
};
