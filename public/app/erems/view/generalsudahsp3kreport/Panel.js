Ext.define('Erems.view.generalsudahsp3kreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.generalsudahsp3kreport.FormData'],
    alias: 'widget.generalsudahsp3kreportpanel',
    itemId: 'Generalsudahsp3kreportPanel',
    formSearchPanelName: 'generalsudahsp3kreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'generalsudahsp3kreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
