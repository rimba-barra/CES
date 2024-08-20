Ext.define('Hrd.view.globalparameter.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.globalparameterformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'globalparameter',
                    fieldLabel:'Description'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});