Ext.define('Hrd.view.lookup.organizationchartparent.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.lookuporganizationchartparentformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    fieldLabel:'Description',
                    name:'description'  
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});