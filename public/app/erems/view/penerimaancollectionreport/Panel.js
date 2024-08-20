Ext.define('Erems.view.penerimaancollectionreport.Panel', {
    extend              : 'Erems.library.template.view.Panel',
    requires            : ['Erems.view.penerimaancollectionreport.FormData'],
    alias               : 'widget.penerimaancollectionreportpanel',
    itemId              : 'PenerimaancollectionreportPanel',
    formSearchPanelName : 'penerimaancollectionreportformsearch',
    layout              : 'vbox',
    align: 'stretch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, 
            {
                items: [
                    {
                        xtype: 'penerimaancollectionreportformdata'
                    },
                ],
           },
        );

        me.callParent(arguments);
    }
   
});
