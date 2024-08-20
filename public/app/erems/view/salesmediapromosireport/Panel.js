Ext.define('Erems.view.salesmediapromosireport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.salesmediapromosireport.FormData'],
    alias: 'widget.salesmediapromosireportpanel',
    itemId: 'SalesmediapromosireportPanel',
    formSearchPanelName: 'salesmediapromosireportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'salesmediapromosireportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
