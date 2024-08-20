Ext.define('Hrd.view.alokasibiaya.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.alokasibiayaformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'alokasibiaya',
                    fieldLabel:'Description'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});