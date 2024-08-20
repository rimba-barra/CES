Ext.define('Hrd.view.jobfunction.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.jobfunctionformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'jobfunction',
                    fieldLabel:'Jobfunction Name'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});