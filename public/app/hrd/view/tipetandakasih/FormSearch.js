Ext.define('Hrd.view.tipetandakasih.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.tipetandakasihformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'tipetandakasih',
                    fieldLabel:'Description'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});