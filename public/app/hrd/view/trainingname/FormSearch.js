Ext.define('Hrd.view.trainingname.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.trainingnameformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'trainingname',
                    fieldLabel:'Training Name'
                },
                {
                    name:'vendor',
                    fieldLabel:'Vendor'
                },
                // {
                //     xtype: 'combobox',
                //     fieldLabel: 'Budget Type',
                //     name: 'trainingcaption_id',
                //     displayField: 'caption',
                //     valueField: 'trainingcaption_id',
                // },
                // {
                //     xtype: 'combobox',
                //     fieldLabel: 'Competency',
                //     name: 'competency_name_id',
                //     displayField: 'competency_name',
                //     valueField: 'competency_name_id',
                // },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Skill Type',
                    name: 'skill',
                    store : new Ext.data.SimpleStore({
                    data : [['Technical Skill', 'Technical Skill'], ['Soft Skill', 'Soft Skill'], ['Both', 'Both']],
                        fields : ['value', 'text']
                    }),
                    valueField : 'value',
                    displayField : 'text',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Training Type',
                    name: 'type',
                    store : new Ext.data.SimpleStore({
                    data : [['In House', 'In House'], ['Internal', 'Internal'], ['Public', 'Public']],
                        fields : ['value', 'text']
                    }),
                    valueField : 'value',
                    displayField : 'text',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Certificate',
                    name: 'certificate',
                    store : new Ext.data.SimpleStore({
                    data : [['Yes', 'Yes'], ['No', 'No'], ['Hold', 'Hold']],
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