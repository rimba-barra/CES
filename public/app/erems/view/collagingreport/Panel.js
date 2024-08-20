Ext.define('Erems.view.collagingreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.collagingreport.FormData'],
    alias: 'widget.collagingreportpanel',
    itemId: 'CollagingreportPanel',
    formSearchPanelName: 'collagingreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'collagingreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
