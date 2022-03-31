import { animate, state, style, transition, trigger } from '@angular/animations';

const openClosePanel = trigger('openClosePanel', [
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

export default openClosePanel;
