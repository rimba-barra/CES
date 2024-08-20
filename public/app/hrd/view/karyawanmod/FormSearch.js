Ext.define('Hrd.view.karyawanmod.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.karyawanmodformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'karyawanmod',
                    fieldLabel:'Description'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});