Ext.define('Hrd.view.personalischild.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.personalischildformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'nik_group',
                    fieldLabel:'NIK Group'
                },
                {
                    name:'employee_name',
                    fieldLabel:'Employee Name'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Emp Status',
                    name: 'employeestatus_id',
                    store : new Ext.data.SimpleStore({
                    data : [[-1, 'Not a Consultant'], [7, 'Consultant']],
                        fields : ['value', 'text']
                    }),
                    valueField : 'value',
                    displayField : 'text',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Do not count as an employee',
                    name: 'is_child',
                    store : new Ext.data.SimpleStore({
                    data : [[-1, 'Unchecked'], [1, 'Checked']],
                        fields : ['value', 'text']
                    }),
                    valueField : 'value',
                    displayField : 'text',
                },
                {
                    xtype: 'checkbox', 
                    boxLabel: 'have same No. KTP only', 
                    readOnly: false, 
                    name: 'indicator_ktp', 
                    uncheckedValue: '0', 
                    inputValue: '1',
                    checked: true
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});