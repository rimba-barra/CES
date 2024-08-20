Ext.define('Hrd.view.lookup.organizationchart.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.lookuporganizationchartformsearch',
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