Ext.define('Erems.view.collgirojatuhtemporeport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.collgirojatuhtemporeport.FormData'],
    alias: 'widget.collgirojatuhtemporeportpanel',
    itemId: 'CollgirojatuhtemporeportPanel',
    formSearchPanelName: 'collgirojatuhtemporeportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'collgirojatuhtemporeportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
