Ext.define('Cashier.view.mergesubcoa.Panel',{
    extend:'Cashier.library.template.view.Panel',
     requires: ['Cashier.view.mergesubcoa.FormData',],
    alias:'widget.mergesubcoapanel',
    itemId:'MergesubcoaPanel',
    formDataPanelName: 'mergesubcoaformdata',   
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
