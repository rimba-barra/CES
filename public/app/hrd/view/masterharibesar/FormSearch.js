Ext.define('Hrd.view.masterharibesar.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.masterharibesarformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'holiday_name',
                    fieldLabel:'Holiday Name'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});