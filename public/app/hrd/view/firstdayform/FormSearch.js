Ext.define('Hrd.view.firstdayform.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.firstdayformformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'question',
                    fieldLabel:'Question'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Active',
                    name: 'question_active',
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