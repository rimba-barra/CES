Ext.define('Cashier.view.chequeclearing.Panel', {
    extend: 'Ext.form.Panel',
    requires: ['Cashier.view.chequeclearing.FormData'],
    alias: 'widget.chequeclearingpanel',
    itemId: 'ChequeclearingPanel',
    layout: {
        type: 'border',
    },
    formDataPanelName: 'chequeclearingformdata',
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
