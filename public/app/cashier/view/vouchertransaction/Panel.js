Ext.define('Cashier.view.vouchertransaction.Panel', {
    extend: 'Ext.form.Panel',
    requires: ['Cashier.view.vouchertransaction.FormData'],
    alias: 'widget.vouchertransactionpanel',
    itemId: 'VouchertransactionPanel',
    layout: {
        type: 'border',
    },
    formDataPanelName: 'vouchertransactionformdata',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: me.formDataPanelName,
                    region: 'center',
                }
            ]
        });
        me.callParent(arguments);
    }

});
