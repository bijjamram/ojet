/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojarraydataprovider', 'ojs/ojknockout', , 'ojs/ojlabel',
    'ojs/ojinputtext', 'ojs/ojarraydataprovider', 'ojs/ojrouter', 'ojs/ojdialog',
    'ojs/ojtable', 'ojs/ojbutton'
  ],
  function (oj, ko, $, ArrayDataProvider) {

    function OrdersViewModel() {
      var self = this;
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here. 
       * This method might be called multiple times - after the View is created 
       * and inserted into the DOM and after the View is reconnected 
       * after being disconnected.
       */
      self.val = ko.observable("Venkatesh");
      self.page = 1;
      var router = oj.Router.rootInstance;

      self.router = router;
      self.data = ko.observableArray();
      self.orderDetails = ko.observableArray();
      self.orderNumber = ko.observable();
      self.customerName = ko.observable();
      self.address = ko.observable();
      self.phone = ko.observable();


      jQuery.getJSON("https://apex.oracle.com/pls/apex/venks/om/orders").
      then(function (data) {
        self.data(data.items);
        // console.log(data.items);
      });


      jQuery.getJSON("https://apex.oracle.com/pls/apex/venks/om/order/10145").
      then(function (data) {
        // console.log(self.page);
        self.orderDetails(data.items);
        //console.log($parent);
        // console.log(self.orderDetails);
      });
      //console.log(self.orderDetails);
      self.orderDetailsDataProvider = new ArrayDataProvider(self.orderDetails, {
        keyAttributes: 'id'
      });
      self.dataprovider = new ArrayDataProvider(self.data, {
        keyAttributes: 'ordernumber'
      });
      self.columnArray = [{
          "headerText": "Order Number",
          "field": "ordernumber",
          "renderer": oj.KnockoutTemplateUtils.getRenderer("ordernumber", true),
          "template": "orderDetailsLink"
        },
        {
          "headerText": "Department Name",
          "field": "customername"
        },
        {
          "headerText": "Location Id",
          "field": "contactfirstname"
        },
        {
          "headerText": "Manager Id",
          "field": "orderdate"
        },
        {
          "headerText": "Employee Count",
          "field": "status",
          "footerTemplate": "totalFooterTemplate"
        },
        {
          "headerText": "Rating",
          "field": "Rating",
          "template": "ratingCellTemplate"
        }
      ];

      self.orderDetailcolumnArray = [{
          "headerText": "Line Id",
          "field": "orderlinenumber",
          "sortable": "disabled"
        },
        {
          "headerText": "Product Line",
          "field": "productline",
        },
        {
          "headerText": "Quantity",
          "field": "quantityordered",
        },
        {
          "headerText": "Price",
          "field": "priceeach",
        },
        {
          "headerText": "Status",
          "field": "status",
        },
        {
          "headerText": "Order Date",
          "field": "orderdate",
        }
      ];

      /*

        */
      self.linkClicked = function (event, data, bindingContext) {
        //console.log('Link clicked');
        //console.log(data);
        console.log(event);
        self.router.go('customers/' + event);

      }

      self.close = function (event) {
        document.getElementById('modalDialog1').close();
      }

      self.openModal = function (event) {
        //console.log(data);
        jQuery.getJSON("https://apex.oracle.com/pls/apex/venks/om/order/" + event).then(function (jSonData) {
          // console.log(self.page);
          self.orderDetails(jSonData.items);
          self.customerName(jSonData.items[0].customername);
          self.orderNumber(jSonData.items[0].ordernumber);
          self.phone(jSonData.items[0].phone);
          self.address(jSonData.items[0].addressline1 + ', ' + jSonData.items[0].city +
            ', ' + jSonData.items[0].state + ', ' + jSonData.items[0].country + ', ' + jSonData.items[0].postalcode);

          //console.log(self.customerName);
          document.getElementById('modalDialog1').open();
          //console.log($parent);
          // console.log(self.orderDetails);
        });

      }


      self.buttonClick = function (event) {
        // console.log('inside');
        //console.log(event);
        if (event.currentTarget.id == 'next') {
          self.page = +self.page + 1;
        }

        if (event.currentTarget.id == 'prev' & self.page > 0) {
          self.page = +self.page - 1;
        }

        jQuery.getJSON("https://apex.oracle.com/pls/apex/venks/om/orders?page=" + self.page).
        then(function (data) {
          //console.log(data.items);
          self.data(data.items);
          //console.log(data.items);
          //self.dataprovider = new ArrayDataProvider(self.data, {keyAttributes: 'ordernumber'});
          //console.log(self.dataprovider);
        });
      }

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
    }


    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new OrdersViewModel();
  }
);