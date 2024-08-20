Ext.define('Erems.view.generalumlunasblmsp3kreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.generalumlunasblmsp3kreport.FormData'],
    alias: 'widget.generalumlunasblmsp3kreportpanel',
    itemId: 'Generalumlunasblmsp3kreportPanel',
    formSearchPanelName: 'generalumlunasblmsp3kreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'generalumlunasblmsp3kreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
