Ext.define('Hrd.view.rangkingpa.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.rangkingpaformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'name',
                    fieldLabel:'Rangking'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});