Ext.define('Cashier.view.unpaidcheque.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.unpaidcheque.FormData'],
    alias: 'widget.unpaidchequepanel',
    itemId: 'UnpaidchequePanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'unpaidchequeformdata',    
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: me.formDataPanelName,
                    region: 'center',                  
                }
            ]
        });

        me.callParent(arguments);
    }
    
});
