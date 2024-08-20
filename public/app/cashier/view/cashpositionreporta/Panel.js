Ext.define('Cashier.view.cashpositionreporta.Panel', {
    extend: 'Ext.form.Panel',
    requires: ['Cashier.view.cashpositionreporta.FormData'],
    alias: 'widget.cashpositionreportapanel',
    itemId: 'CashpositionreportaPanel',
    layout: {
        type: 'border',
    },
    formDataPanelName: 'cashpositionreportaformdata',
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
