Ext.define('Cashier.view.copyjournal.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.copyjournal.FormData'],
    alias: 'widget.copyjournalpanel',
    itemId: 'CopyjournalPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'copyjournalformdata',    
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
