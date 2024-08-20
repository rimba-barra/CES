Ext.define('Erems.view.constrencanastreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.constrencanastreport.FormData'],
    alias: 'widget.constrencanastreportpanel',
    itemId: 'ConstrencanastreportPanel',
    formSearchPanelName: 'constrencanastreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'constrencanastreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
