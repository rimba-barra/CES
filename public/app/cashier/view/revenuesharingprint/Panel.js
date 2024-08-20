Ext.define('Cashier.view.revenuesharingprint.Panel', {
    extend             : 'Cashier.library.template.view.Panel',
    requires           : ['Cashier.view.revenuesharingprint.Grid', 'Cashier.view.revenuesharingprint.FormSearch'],
    alias              : 'widget.revenuesharingprintpanel',
    itemId             : 'RevenuesharingprintPanel',
    gridPanelName      : 'revenuesharingprintgrid',
    formSearchPanelName: 'revenuesharingprintformsearch'
});
