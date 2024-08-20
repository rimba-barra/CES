Ext.define('Hrd.view.mastersk.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.masterskformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'name',
                    fieldLabel:'Document Name'
                },
                {
                    name:'nomor',
                    fieldLabel:'Year'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Category',
                    name: 'masterkategorisk_id',
                    displayField: 'name',
                    valueField: 'masterkategorisk_id',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Active',
                    name: 'active',
                    store : new Ext.data.SimpleStore({
                    data : [[-1, 'INACTIVE'], [1, 'ACTIVE']],
                        fields : ['value', 'text']
                    }),
                    valueField : 'value',
                    displayField : 'text',
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});