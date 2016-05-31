import React from 'react';
import { storiesOf } from '@kadira/storybook';
import JEHarness from '../editorHarness';

storiesOf('JSON Editor', module)
  .add('with data', () => (

    <JEHarness />
  ));
