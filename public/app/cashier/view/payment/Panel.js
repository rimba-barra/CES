Ext.define('Cashier.view.payment.Panel', {
    extend: 'Ext.panel.Panel',
    requires: ['Cashier.view.payment.Grid', 'Cashier.view.payment.FormSearch'],
    alias: 'widget.paymentpanel',
    itemId: 'PaymentPanel',
    bodyStyle: 'background-color:#dfe8f5;',
    layout: {
        type: 'vbox', // Arrange child items vertically
        align: 'stretch', // Each takes up full width
        padding: 2
    },
    gridPanelName: 'paymentgrid',
    formSearchPanelName: 'paymentformsearch',
    formviewdata: 'paymentformview',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldcontainer',
                    align: 'right',
                    region: 'center',
                    bodyBorder: false,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'vbox',
                            border: false,
                            items: [
                                {
                                    xtype: me.formSearchPanelName,
                                    width: 800,
                                },
                                {
                                    xtype: me.gridPanelName,
                                    flex: 1,
                                    height: 360,
                                    width: 800,
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'vbox',
                            border: false,
                            bodyBorder: false,                           
                            items: [
                                {
                                    xtype: me.formviewdata,
                                    padding: '0 0 0 10px',
                                    width: 500,
                                    
                                },
                                
                            ]
                        },
                    ]
                },
            ],
        });

        me.callParent(arguments);
    }
});

