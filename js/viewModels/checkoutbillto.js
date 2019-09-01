/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojarraydataprovider', 'ojs/ojcheckboxset', 'ojs/ojselectcombobox', 'ojs/ojlabel',
        'ojs/ojrouter', 'ojs/ojdialog'
    ],
    function (oj, ko, $) {

        function CheckoutbilltoViewModel() {
            var self = this;
            var router = oj.Router.rootInstance;

            self.router = router;
            // Below are a set of the ViewModel methods invoked by the oj-module component.
            // Please reference the oj-module jsDoc for additional information.
            self.buttonClick = function (e, d) {
                //  console.log(e.currentTarget.id);
                if (e.currentTarget.id == 'previous') {
                    self.router.go('checkout');

                }
                if (e.currentTarget.id == 'next') {
                    if (self.selectedItems().length == 0) {
                        console.log(self.selectedItems().length);
                        self.open();
                    } else {
                        self.router.go('payment');
                    }

                }

            }

            self.close = function (event) {
                document.getElementById('modal').close();
            }

            self.open = function (event) {
                document.getElementById('modal').open();
            }
            self.allItems = ko.observableArray([{
                    "id": "id1",
                    "name": 'John Doe',
                    "address": '200 Oracle Parkway',
                    "city": "Redwood City",
                    "state": "California",
                    "country": 'USA',
                    "zip": '940085',
                    "phone": '480-321-4500'
                },
                {
                    "id": "id2",
                    "name": 'Tools',
                    "version": '10.3.6',
                    "nodes": 2,
                    "cpu": 2,
                    "type": 'Java Cloud Service Virtual Image',
                    "balancer": 1,
                    "memory": 8
                },
                {
                    "id": "id3",
                    "name": 'Base',
                    "version": '10.3.6',
                    "nodes": 2,
                    "cpu": 2,
                    "type": 'Java Cloud Service Virtual Image',
                    "balancer": 1,
                    "memory": 8
                },
                {
                    "id": "id4",
                    "name": 'Environment',
                    "version": '10.3.6',
                    "nodes": 2,
                    "cpu": 2,
                    "type": 'Java Cloud Service Virtual Image',
                    "balancer": 1,
                    "memory": 8
                },
                {
                    "id": "id5",
                    "name": 'Security',
                    "version": '10.3.6',
                    "nodes": 2,
                    "cpu": 2,
                    "type": 'Java Cloud Service Virtual Image',
                    "balancer": 1,
                    "memory": 8
                }
            ]);

            jQuery.getJSON("https://apex.oracle.com/pls/apex/venks/om/address").
            then(function (data) {
                self.allItems(data.items);
            });
            self.selectedItems = ko.observable([]);

            self.selectedSelectionMode = ko.observable('single');

            self.currentItem = ko.observable();

            self.dataProvider = new oj.ArrayDataProvider(self.allItems, {
                idAttribute: "id"
            });


            self.handleCheckbox = function (id) {
                return self.selectedItems().indexOf(id.toString()) == -1 ? [] : ["checked"];
            };

            self.checkboxListener = function (event) {
                if (event.detail != null) {
                    var value = event.detail.value;
                    var newSelectedItems;
                    var id = event.target.dataset.rowId;
                    if (value.length > 0) {
                        if (self.selectedSelectionMode() === "single") {
                            newSelectedItems = [id];
                        } else {
                            var idx = self.selectedItems().indexOf(id);
                            newSelectedItems = idx == -1 ? self.selectedItems().concat([id]) : self.selectedItems();
                        }
                        self.currentItem(id);
                    } else {
                        var idx = self.selectedItems().indexOf(id);
                        newSelectedItems = self.selectedItems();
                        if (idx != -1) {
                            //newSelectedItems.splice(idx, 1);
                        }
                        self.currentItem('');
                    }
                    self.selectedItems(newSelectedItems);
                }
            }
            /**
             * Optional ViewModel method invoked after the View is inserted into the
             * document DOM.  The application can put logic that requires the DOM being
             * attached here. 
             * This method might be called multiple times - after the View is created 
             * and inserted into the DOM and after the View is reconnected 
             * after being disconnected.
             */
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
        return new CheckoutbilltoViewModel();
    }
);