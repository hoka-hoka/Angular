import { animate, state, style, transition, trigger } from '@angular/animations';

const showOptions = trigger('openClose', [
  state(
    'open',
    style({
      opacity: '*',
    }),
  ),
  state(
    'closed',
    style({
      opacity: '0',
    }),
  ),
  transition('open <=> closed', [animate('300ms')]),
]);

export default showOptions;
