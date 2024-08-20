Ext.define('Cashier.view.masterclosing.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.masterclosingpanel',
    requires: ['Cashier.view.masterclosing.FormData'],
    width: 500,
    height: 300,
    itemId: 'MastercoaconfigPanel',
    layout: {
        type: 'border'
    },
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [

                {
                    xtype: 'masterclosingformdata',
                    region: 'center',
                    state:'create'
                }
            ]
        });

        me.callParent(arguments);
    }

});