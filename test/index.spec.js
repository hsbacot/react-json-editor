import React from 'react';
import expect from 'expect';
import { createRenderer } from 'react-addons-test-utils';

import JSONEditor from '../src/index';

const BASIC_DATA = { a: 1, b: 'c' };

function render(component) {
  const renderer = createRenderer();
  renderer.render(component);
  return renderer.getRenderOutput();
}

describe('JSONTree', () => {
  it('should render basic tree', () => {
    const result = render(<JSONEditor data={BASIC_DATA} />);

    expect(result.type).toBe('ul');
  });
});
