Ext.define('Erems.view.otherspphform.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.otherspphform.FormData'],
    alias: 'widget.otherspphformpanel',
    itemId: 'OtherspphformPanel',
    formSearchPanelName: 'otherspphformformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'otherspphformformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
