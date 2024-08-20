Ext.define('Erems.view.collkprperbankreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.collkprperbankreport.FormData'],
    alias: 'widget.collkprperbankreportpanel',
    itemId: 'CollkprperbankreportPanel',
    formSearchPanelName: 'collkprperbankreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'collkprperbankreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
