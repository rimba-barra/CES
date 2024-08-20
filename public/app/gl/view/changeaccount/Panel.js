Ext.define('Gl.view.changeaccount.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Gl.view.changeaccount.FormData'],
    alias: 'widget.changeaccountpanel',
    itemId: 'ChangeaccountPanel',   
    layout: {
        type: 'vbox',       
    },
    formDataPanelName: 'changeaccountformdata',    
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
