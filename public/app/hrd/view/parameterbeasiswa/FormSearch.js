Ext.define('Hrd.view.parameterbeasiswa.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.parameterbeasiswaformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'parameterbeasiswa',
                    fieldLabel:'Description'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});