Ext.define('Hrd.view.generalparameter.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.generalparameterformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'module_name',
                    fieldLabel:'Module'
                },
                {
                    name:'name',
                    fieldLabel:'Parameter'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});