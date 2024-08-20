Ext.define('Gl.view.subcoalist.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Gl.view.subcoalist.FormData'],
    alias: 'widget.subcoalistpanel',
    itemId: 'SubcoalistPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'subcoalistformdata',    
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
