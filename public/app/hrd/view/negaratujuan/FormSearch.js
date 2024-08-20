Ext.define('Hrd.view.negaratujuan.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.negaratujuanformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'negaratujuan',
                    fieldLabel:'Negaratujuan Name'
                },
                {
                    name:'code',
                    fieldLabel:'Code'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});