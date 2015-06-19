'use strict';

describe('MineField', function () {
  var React = require('react/addons');
  var MineField, component;

  beforeEach(function () {
    MineField = require('components/MineField.jsx');
    component = React.createElement(MineField);
  });

  it('should create a new instance of MineField', function () {
    expect(component).toBeDefined();
  });
});
