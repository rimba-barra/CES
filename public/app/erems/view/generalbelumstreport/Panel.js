Ext.define('Erems.view.generalbelumstreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.generalbelumstreport.FormData'],
    alias: 'widget.generalbelumstreportpanel',
    itemId: 'GeneralbelumstreportPanel',
    formSearchPanelName: 'generalbelumstreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'generalbelumstreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
