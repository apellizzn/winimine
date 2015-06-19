'use strict';

describe('WinemineApp', function () {
  var React = require('react/addons');
  var WinemineApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    WinemineApp = require('components/WinemineApp.jsx');
    component = React.createElement(WinemineApp);
  });

  it('should create a new instance of WinemineApp', function () {
    expect(component).toBeDefined();
  });
});
