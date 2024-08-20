Ext.define('Hrd.view.lookup.accessgroupdetail.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.lookupaccessgroupdetailformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
					fieldLabel:'Code',
					name:'code'  
                },
                {
					fieldLabel:'Group',
					name:'group'                      
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});