Ext.define('Hrd.view.masterkategorisk.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.masterkategoriskformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'name',
                    fieldLabel:'Masterkategori Name'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});