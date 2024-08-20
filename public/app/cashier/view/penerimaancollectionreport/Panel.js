Ext.define('Cashier.view.penerimaancollectionreport.Panel', {
    extend             : 'Cashier.library.template.view.Panel',
    requires           : ['Cashier.view.penerimaancollectionreport.FormData'],
    alias              : 'widget.penerimaancollectionreportpanel',
    itemId             : 'PenerimaancollectionreportPanel',
    initComponent      : function() {
        var me = this;

        Ext.applyIf(me, 
            {
                items: [
                    {
                        xtype: 'penerimaancollectionreportformdata',
                    },
                ],
           },
        );

        me.callParent(arguments);
    }
   
});
