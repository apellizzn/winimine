'use strict';

describe('MineField', function () {
  var React = require('react/addons');
  var MineField, component;

  beforeEach(function () {
    MineField = require('components/MineField.jsx');
    component = React.createElement(MineField, { rows: 3, columns: 2, bombs: 3 });
  });

  it('should create a new instance of MineField', function () {
    expect(component).toBeDefined();
  });
});
