Ext.define('Hrd.view.setnomorsuratdinas.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.setnomorsuratdinasformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'setnomorsuratdinas',
                    fieldLabel:'Description'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});