Ext.define('Cashier.view.juploadsh1.Panel', {
    extend: 'Cashier.library.template.view.Panel', 
    requires: ['Cashier.view.juploadsh1.FormData'],
    alias: 'widget.juploadsh1panel',
    itemId: 'Juploadsh1Panel',   
    formDataPanelName: 'juploadsh1formdata',    
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: me.formDataPanelName,
                    region: 'center',
                    height: 500,           
                }
            ]
        });

        me.callParent(arguments);
    }
    
});
