Ext.define('Erems.view.collagingescrowdatereport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.collagingescrowdatereport.FormData'],
    alias: 'widget.collagingescrowdatereportpanel',
    itemId: 'CollagingescrowreportPanel',
    formSearchPanelName: 'collagingescrowdatereportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'collagingescrowdatereportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
