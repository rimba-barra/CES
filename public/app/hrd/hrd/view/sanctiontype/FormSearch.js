Ext.define('Hrd.view.sanctiontype.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.sanctiontypeformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'sanctiontype',
                    fieldLabel:'Sanction Type'
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