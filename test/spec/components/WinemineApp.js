'use strict';

describe('WinimineApp', function () {
  var React = require('react/addons');
  var WinimineApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    WinimineApp = require('components/WinimineApp.jsx');
    component = React.createElement(WinimineApp);
  });

  it('should create a new instance of WinimineApp', function () {
    expect(component).toBeDefined();
  });
});
