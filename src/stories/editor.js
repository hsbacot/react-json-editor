import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import JSONTree from '../index';
import JEHarness from '../editorHarness';
import * as DotObject from 'dot-object';

//let json = {
//  hunter: {
//    name: "hunter",
//    age: 26,
//    random: {
//      nested: true,
//      brother: "Theo"
//    }
//  }
//};
//
//DotObject.copy('', '', {}, {});
//
//const updateValue = (value, keyPath) => {
//  let pathArray = [...keyPath];
//  let path = pathArray.reverse();
//  let dotPath = path.join('.');
//  json = DotObject.copy('value', dotPath, { value }, json);
//  console.log(json);
//
//
//};

storiesOf('JSON Editor', module)
  .add('with data', () => (

    <JEHarness/>
  ))
  .add('with no text', () => (
    <button></button>
  ));
