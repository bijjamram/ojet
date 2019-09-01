/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojrouter', 'ojs/ojarraytreedataprovider', 'ojs/ojchart', 'ojs/ojsunburst', 'ojs/ojtoolbar', 'ojs/ojbutton'],
  function (oj, ko, $) {

    function DashboardViewModel(viewParams) {
      var self = this;
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      var self = this;
      self.handler = new oj.ColorAttributeGroupHandler();
      self.data = ko.observableArray();
      self.sunburstData = new oj.ArrayTreeDataProvider(self.data, {
        keyAttributes: 'id',
        childrenAttribute: "products"
      });
      $.ajax({
          url: "https://apex.oracle.com/pls/apex/venks/om/customertoproduct",
          method: "get",
        })
        .done(function (data) {
          // console.log(data);
          self.data(data);
        }).fail(function (xhr) {
          console.log('error callback 2', xhr);
        });
      self.productToCust = ko.observableArray();
      self.productToCustomerData = new oj.ArrayTreeDataProvider(self.productToCust, {
        keyAttributes: 'id',
        childrenAttribute: "products"
      });
      $.ajax({
          url: "https://apex.oracle.com/pls/apex/venks/om/producttocustomer",
          method: "get",
        })
        .done(function (data) {
          //  console.log(data);
          self.productToCust(data);
        }).fail(function (xhr) {
          console.log('error callback 2', xhr);
        });
      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here. 
       * This method might be called multiple times - after the View is created 
       * and inserted into the DOM and after the View is reconnected 
       * after being disconnected.
       */
      //console.log(viewParams);
      //var stateParams = viewParams['ojRouter']['parameters'];
      //console.log(stateParams);
      // Bar chart stuff
      /* toggle button variables */
      self.stackValue = ko.observable('on');
      self.stackLabelValue = ko.observable('on');
      self.orientationValue = ko.observable('vertical');
      self.labelPosition = ko.observable('auto');

      self.toggleOrientation = function () {
        //console.log(self.orientationValue);
        self.orientationValue(self.orientationValue() == 'horizontal' ? 'vertical' : 'horizontal');
      }

      /* chart data */
      var barSeries = [{
          name: "Apple",
          items: [{
              y: 42,
              label: "42"
            }, {
              y: 34,
              label: "34"
            },
            {
              y: 42,
              label: "42"
            }, {
              y: 34,
              label: "34"
            }
          ]
        },
        {
          name: "Google",
          items: [{
              y: 55,
              label: "55"
            }, {
              y: 30,
              label: "30"
            },
            {
              y: 55,
              label: "55"
            }, {
              y: 30,
              label: "30"
            }
          ]
        },
        {
          name: "Microsoft",
          items: [{
              y: 36,
              label: "36"
            }, {
              y: 50,
              label: "50"
            },
            {
              y: 36,
              label: "36"
            }, {
              y: 50,
              label: "50"
            }
          ]
        },
        {
          name: "Yahoo",
          items: [{
              y: 22,
              label: "22"
            }, {
              y: 22,
              label: "22"
            },
            {
              y: 22,
              label: "22"
            }, {
              y: 22,
              label: "22"
            }
          ]
        }
      ];

      var barGroups = ["2012", "2013", "2014"];

      self.barSeriesValue = ko.observableArray(barSeries);
      self.barGroupsValue = ko.observableArray(barGroups);
      self.productSeriesValue = ko.observableArray();


      /* toggle buttons*/
      self.stackLabelOptions = [{
          id: 'labelOff',
          label: 'off',
          value: 'off'
        },
        {
          id: 'labelOn',
          label: 'on',
          value: 'on'
        }
      ];
      self.labelPositionOptions = [{
          id: 'auto',
          label: 'auto',
          value: 'auto'
        },
        {
          id: 'center',
          label: 'center',
          value: 'center'
        },
        {
          id: 'insideBarEdge',
          label: 'insideBarEdge',
          value: 'insideBarEdge'
        },
        {
          id: 'outsideBarEdge',
          label: 'outsideBarEdge',
          value: 'outsideBarEdge'
        },
        {
          id: 'none',
          label: 'none',
          value: 'none'
        }
      ];
      $.ajax({
          url: "https://apex.oracle.com/pls/apex/venks/om/yearlysales",
          method: "get",
        })
        .done(function (data) {
          // console.log(data);
          self.barSeriesValue(data);
        }).fail(function (xhr) {
          console.log('error callback 2', xhr);
        });

      $.ajax({
          url: "https://apex.oracle.com/pls/apex/venks/om/yearlysalesbyproduct",
          method: "get",
        })
        .done(function (data) {
          //  console.log(data);
          self.productSeriesValue(data);
        }).fail(function (xhr) {
          console.log('error callback 2', xhr);
        });
      // self.labelPositionChange = function (event) {
      //   var seriesInfo = ko.toJS(self.barSeriesValue);
      //   for (var i = 0; i < seriesInfo.length; i++) {
      //     for (var j = 0; j < seriesInfo[i].items.length; j++) {
      //       seriesInfo[i].items[j].labelPosition = event.detail.value;
      //     }
      //   }
      //   self.barSeriesValue(seriesInfo);
      // }
      // self.stackValue.subscribe(function (value) {
      //   if (value === 'off') {
      //     self.stackLabelValue('off');
      //   }
      //   document.getElementById('stackLabelToggle').disabled = (value === 'off');
      // });
    }

    //End Bar chart stuff
    self.connected = function () {
      // Implement if needed
    };

    /**
     * Optional ViewModel method invoked after the View is disconnected from the DOM.
     */
    self.disconnected = function () {
      // Implement if needed
    };

    /**
     * Optional ViewModel method invoked after transition to the new View is complete.
     * That includes any possible animation between the old and the new View.
     */
    self.transitionCompleted = function () {
      // Implement if needed
    };


    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);