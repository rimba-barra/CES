Ext.define('Cashier.view.printvoucher.Panel', {
    extend: 'Ext.form.Panel',
    requires: ['Cashier.view.printvoucher.FormData'],
    alias: 'widget.printvoucherpanel',
    itemId: 'PrintvoucherPanel',
    layout: {
        type: 'border',
    },
    formDataPanelName: 'printvoucherformdata',
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
