/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojarraydataprovider', 'toastr', 'ojs/ojrouter',
    'ojs/ojknockout', 'ojs/ojlistview', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojlabel', 'ojs/ojgauge',
    'ojs/ojfilmstrip',
  ],
  function (oj, ko, $, ArrayDataProvider, toastr, router) {


    function HomeViewModel() {
      var self = this;
      self.localStorage = window.localStorage;


      //replace setTimeout to an event handler when you are able to find a better event to attach this to to.
      //Currently assuming that the dom will be loaded in 2000 seconds and the list item will be available for attaching.
      //JBox needs the list item to be a part of the DOM before you can attach it to that.
      $(document).ready(function () {
        setTimeout(function () {
          self.jbox = new jBox('Tooltip', {
            attach: '.rating',
            delayOpen: 500,
            content: $('#jboxContainer'),
            position: {
              x: 'center',
              y: 'bottom'
            },
            offset: {
              x: -62,
              y: 0
            },
            theme: 'TooltipBorder',
            onClose: function () {
              $('.bar-1').css("width", "0%");
              $('.bar-2').css("width", "0%");
              $('.bar-3').css("width", "0%");
              $('.bar-4').css("width", "0%");
              $('.bar-5').css("width", '0%');
              $('#one').text('');
              $('#two').text('');
              $('#three').text('');
              $('#four').text('');
              $('#five').text('');
            },
            onOpen: function (e) {
              //Refresh the product ratings
              //If there is delay in getting the ratings
              //console.log(e);
              function checkFlag() {
                if ($('.oj-listview-item.oj-hover').data() === undefined) {
                  //console.log('inside undefined');
                  window.setTimeout(checkFlag, 100);
                  /* this checks the flag every 100 milliseconds*/
                } else {
                  //console.log('defined');
                  //console.log($('.oj-listview-item.oj-hover').data().data.id);
                  jQuery.getJSON("https://apex.oracle.com/pls/apex/venks/om/ratings/" + $('.oj-listview-item.oj-hover').data().data.id).
                  then(function (data) {
                    if (data.items.length > 0) {
                      // console.log('repainting the rating bars');
                      //console.log($('.oj-listview-item.oj-hover').data().data.id);
                      $('.bar-1').css("width", data.items[0].one + "%");
                      $('.bar-2').css("width", data.items[0].two + "%");
                      $('.bar-3').css("width", data.items[0].three + "%");
                      $('.bar-4').css("width", data.items[0].four + "%");
                      $('.bar-5').css("width", data.items[0].five + '%');
                      $('#one').text(data.items[0].one_star);
                      $('#two').text(data.items[0].two_star);
                      $('#three').text(data.items[0].three_star);
                      $('#four').text(data.items[0].four_star);
                      $('#five').text(data.items[0].five_star);

                    }
                  });
                  /* do something*/
                }
              }
              checkFlag();


            },
          })
        }, 2000);
      });

      //film strip start
      self.chemicals = [{
          name: 'Water Shoes',
          image: 'css/images/4.jpg'

        },
        {
          name: 'Family Size Tent',
          image: 'css/images/5.jpg'

        },
        {
          name: 'Lights',
          image: 'css/images/6.jpg'

        },
        {
          name: 'Repair',
          image: 'css/images/1.jpg'
        },
        {
          name: 'Ice Box',
          image: 'css/images/2.jpg'

        },
        {
          name: 'Sleeping Bag',
          image: 'css/images/3.jpg'

        },
        {
          name: 'Harness',
          image: 'css/images/7.jpg'

        },
        {
          name: 'Camel Back - Hydra Pack',
          image: 'css/images/8.jpg'

        },
        {
          name: 'Chair',
          image: 'css/images/9.jpg'

        },
        {
          name: 'Lights',
          image: 'css/images/10.jpg'

        },
        {
          name: 'Air mattress',
          image: 'css/images/11.jpg'

        },
        {
          name: 'Vessel',
          image: 'css/images/12.jpg'

        }
      ];

      self.currentNavArrowPlacement = ko.observable("adjacent");
      self.currentNavArrowVisibility = ko.observable("auto");

      getItemInitialDisplay = function (index) {
        return index < 3 ? '' : 'none';
      };
      //film strip end

      self.showRatings = function () {
        //
      }
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
      self.data = ko.observableArray();
      self.cartData = ko.observableArray();
      //self.localStorage.setItem('cart', []);

      // self.cartData(
      //   JSON.parse(self.localStorage.getItem('cart'))
      // );
      self.total = ko.observable();
      self.categoryData = ko.observableArray();
      toastr.options.timeOut = 1000;
      var router = oj.Router.rootInstance;

      self.router = router;

      // self.handleAfterRender = function (e, d) {
      //   console.log('Inside handleAfterRender');
      //   console.log(e, d);
      //   console.log(d);

      // }
      jQuery.getJSON("https://apex.oracle.com/pls/apex/venks/om/products").
      then(function (data) {
        self.data(data.items);
      });
      jQuery.getJSON("https://apex.oracle.com/pls/apex/venks/om/categories").
      then(function (data) {
        self.categoryData(data.items);
        //console.log(data.items);
      });
      self.dataprovider = new ArrayDataProvider(self.data, {
        keyAttributes: 'ordernumber'
      });
      self.cartDataProvider = new ArrayDataProvider(self.cartData, {
        keyAttributes: 'id'
      });
      self.categoryDataProvider = new ArrayDataProvider(self.categoryData, {
        keyAttributes: 'id'
      });

      self.quantityChanged = function (event, data, bindingContext) {
        //console.log('inside quantity changed');
        //console.log(event.id);
        //console.log(event.quantity());
        self.cartData().find((item) => item.id === event.id).quantity(event.quantity());
        self.calculateTotal();
      }

      self.calculateTotal = function () {
        var total = 0;
        cartCount(0);
        self.cartData().map((item) => {
          //console.log(item.price);
          //console.log(item.quantity());
          total = (total + Number(item.price) * Number(item.quantity()));
          //console.log(+cartCount() + 1);
          cartCountUpdate(+cartCount() + 1);
          //console.log(total);
        });
        //console.log(cartCount());
        self.total(total.toLocaleString());
      }
      self.categorySelected = function (event, data, bindingContext) {
        //console.log('category selected');
        //console.log(event.detail.value[0]);
        jQuery.getJSON("https://apex.oracle.com/pls/apex/venks/om/products?category=" + event.detail.value[0]).
        then(function (data) {
          self.data(data.items);
          console.log(data.items);
        });

        // console.log(data);
      }

      self.emptyCart = function () {
        self.cartData([]);
        cartCountUpdate('123');
        self.total(0);
      }

      self.removeItemFromCart = function (event, data) {

        //console.log(event.id);
        //console.log(data.data.id);

        //self.cartData().findInde((item) => item.id === data.data.id).quantity(event.detail.value);

        //console.log(self.cartData().findIndex((item) => item.id === data.data.id));
        self.cartData().splice(self.cartData().findIndex((item) => item.id === event.id), 1);

        self.cartData(self.cartData());
        self.calculateTotal();
        toastr.warning('Item removed from cart');

        // jQuery.getJSON("https://apex.oracle.com/pls/apex/venks/om/products?category=" + event.detail.value[0]).
        // then(function (data) {
        //   self.data(data.items);
        //   console.log(data.items);
        // });

        // console.log(data);
      }
      self.addToCart = function (event, data, bindingContext) {
        // console.log(event);

        const b = self.cartData().find((item) => item.id === data.data.id);
        //console.log(b);

        if (b === undefined) {
          self.cartData.push({
            "id": data.data.id,
            "item_description": data.data.item_description,
            "price": data.data.price,
            "fprice": data.data.fprice,
            "quantity": ko.observable(1)
          });
          toastr.success('Item ' + data.data.item_description + ' added to cart');
          self.calculateTotal();
          // console.log(self.cartData());


        } else {
          //var qty = self.cartData().find((item) => item.id === data.data.id).quantity() + 1;
          self.cartData().find((item) => item.id === data.data.id).quantity(+self.cartData().find((item) => item.id === data.data.id).quantity() + 1);
          //console.log(self.cartData());
          toastr.info('Item allready in the cart');
          self.calculateTotal();
          //console.log(self.cartData());
        }
        //console.log(event);
        //self.router.go('customers/' + event);

      }

      self.checkOut = function (event, data, bindingContext) {
        //console.log('Link clicked');
        //console.log(data);
        //console.log(event);
        self.router.go('checkout/' + event);

      }
      self.connected = function () {
        // Implement if needed
        //console.log(JSON.parse(ko.toJSON(self.localStorage.getItem('cart'))));
        //self.cartData(JSON.parse(ko.toJS(self.localStorage.getItem('cart'))));
      };

      self.handleBindingsApplied = function (info) {
        // Executes after all the bindings applied and all jet components are ready in view
        console.log('inside handle bindings--Bindings applied');
      };
      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function () {
        self.localStorage.setItem('cart', ko.toJSON(self.cartData()));
        // console.log(self.localStorage.getItem('cart'));
      };



      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function () {
        // Implement if needed

      };
    }

    // /* Mutation Observer */
    // // Select the node that will be observed for mutations
    // self.targetNode = document.getElementById('listView');

    // // Options for the observer (which mutations to observe)
    // self.config = {
    //   attributes: true,
    //   childList: true,
    //   subtree: true
    // };

    // // Callback function to execute when mutations are observed
    // self.callback = function (mutationsList, observer) {
    //   for (var mutation of mutationsList) {
    //     if (mutation.type == 'childList') {
    //       //console.log('A child node has been added or removed.');
    //       console.log(self.jbox);
    //       self.jbox.attach('.rating');
    //     } else if (mutation.type == 'attributes') {
    //       //console.log('The ' + mutation.attributeName + ' attribute was modified.');
    //     }
    //   }
    // };

    // // Create an observer instance linked to the callback function
    // self.observer = new MutationObserver(self.callback);
    // //console.log(observer);

    // // Start observing the target node for configured mutations
    // $(document).ready(function () {
    //   //console.log("ready!");
    //   self.targetNode = document.getElementById('listViewContainer');
    //   //  console.log(targetNode);

    //   self.observer.observe(self.targetNode, self.config);

    // });

    // // Later, you can stop observing
    // self.observer.disconnect();

    // /*End Mutation Observer */
    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new HomeViewModel();
  }
);