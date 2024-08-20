Ext.define('Cashier.view.cashbankpositionreport.Panel', {
    extend: 'Ext.form.Panel',
    requires: ['Cashier.view.cashbankpositionreport.FormData'],
    alias: 'widget.cashbankpositionreportpanel',
    itemId: 'CashbankpositionreportPanel',
    layout: {
        type: 'border',
    },
    formDataPanelName: 'cashbankpositionreportformdata',
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
