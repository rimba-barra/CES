Ext.define('Cashier.view.cashpositionreportb.Panel', {
    extend: 'Ext.form.Panel',
    requires: ['Cashier.view.cashpositionreportb.FormData'],
    alias: 'widget.cashpositionreportbpanel',
    itemId: 'CashpositionreportbPanel',
    layout: {
        type: 'border',
    },
    formDataPanelName: 'cashpositionreportbformdata',
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
