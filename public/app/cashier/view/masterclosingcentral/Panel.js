Ext.define('Cashier.view.masterclosingcentral.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.masterclosingcentralpanel',
    requires: ['Cashier.view.masterclosingcentral.FormData'],
    // width: 500,
    height: 300,
    itemId: 'MastercoaconfigPanel',//'MastercoaconfigPanel',
    layout: {
        type: 'border'
    },
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [

                {
                    xtype: 'masterclosingcentralformdata',
                    region: 'center',
                    state:'create'
                }
            ]
        });

        me.callParent(arguments);
    }

});