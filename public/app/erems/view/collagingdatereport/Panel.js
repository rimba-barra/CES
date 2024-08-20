Ext.define('Erems.view.collagingdatereport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.collagingdatereport.FormData'],
    alias: 'widget.collagingdatereportpanel',
    itemId: 'CollagingdatereportPanel',
    formSearchPanelName: 'collagingdatereportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'collagingdatereportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
