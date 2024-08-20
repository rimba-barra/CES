Ext.define('Hrd.view.groupposition.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.grouppositionformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'groupposition',
                    fieldLabel:'Group Position Name'
                },
                {
                    name:'code',
                    fieldLabel:'Code'
                },
                {
                    name:'description',
                    fieldLabel:'Description'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});