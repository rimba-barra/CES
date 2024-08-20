Ext.define('Cashier.view.reportarkawasan.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportarkawasanpanel',
    requires: ['Cashier.view.reportarkawasan.FormData'],
    itemId: 'MastercoaconfigPanel',
    autoHeight: true,
    layout: 'border',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'reportarkawasanformdata',
                    region: 'center',
                    state: 'create',
                   autoHeight: true
                }
            ]
        });

        me.callParent(arguments);
    }

});
