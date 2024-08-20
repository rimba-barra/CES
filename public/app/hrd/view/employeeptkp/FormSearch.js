Ext.define('Hrd.view.employeeptkp.FormSearch', {
    extend: 'Hrd.library.template.view.FormSearch',
    alias: 'widget.employeeptkpformsearch',
    uniquename: '_employeeptkpformsearch',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'mode_read',
                    value: 'default'
                },
                {
                    xtype: 'numberfield',
                    itemId: 'fdms_periode',
                    name: 'periode',
                    fieldLabel: 'Periode',
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    anchor: '50%',
                    value: Ext.Date.format(new Date(), 'Y')
                },
                {
                    xtype: 'ptkpcombobox',
                    itemId: 'fsc_ptkp_id',
                    name: 'ptkp_id',
                    id: 'fsc_ptkp_id',
                    fieldLabel: 'PTKP',
                    width: 100,
                    labelWidth: 140,
                    enableKeyEvents: true,
                    enforceMaxLength: true
                },
                {
                    xtype: 'combobox',
                    itemId: 'fsc_sex',
                    name: 'sex',
                    id: 'fsc_sex',
                    fieldLabel: 'Sex',
                    width: 80,
                    labelWidth: 140,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    store: new Ext.data.SimpleStore({
                        fields: ['id', 'value'],
                        data: [
                            ['all', 'All'],
                            ['M', 'Male'],
                            ['F', 'Female']
                        ]
                    }),
                    displayField: 'value',
                    valueField: 'id',
                    anchor: '50%'
                },
                {
                    xtype: 'combobox',
                    itemId: 'fsc_marriagestatus_id',
                    name: 'marriagestatus_id',
                    id: 'fsc_marriagestatus_id',
                    fieldLabel: 'Marriage Status',
                    width: 80,
                    labelWidth: 140,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    store: new Ext.data.SimpleStore({
                        fields: ['id', 'value'],
                        data: [
                            ['all', 'All'],
                            ['1', 'Single'],
                            ['2', 'Married'],
                            ['3', 'Janda / Duda']
                        ]
                    }),
                    displayField: 'value',
                    valueField: 'id',
                    anchor: '50%'
                },
                {
                    xtype: 'numberfield',
                    itemId: 'fdms_child',
                    name: 'child',
                    fieldLabel: 'Child',
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    anchor: '50%'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsc_employee_name',
                    name: 'employee_name',
                    fieldLabel: 'Employee Name',
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'combobox',
                    itemId: 'fsc_checked',
                    name: 'checked',
                    id: 'fsc_checked',
                    fieldLabel: 'Checked',
                    width: 80,
                    labelWidth: 140,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    store: new Ext.data.SimpleStore({
                        fields: ['id', 'value'],
                        data: [
                            ['all', 'All'],
                            ['1', 'True'],
                            ['0', 'False']
                        ]
                    }),
                    displayField: 'value',
                    valueField: 'id',
                    anchor: '50%'
                },
                {
                    xtype: 'combobox',
                    itemId: 'fsc_applied',
                    name: 'applied',
                    id: 'fsc_applied',
                    fieldLabel: 'Applied',
                    width: 80,
                    labelWidth: 140,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    store: new Ext.data.SimpleStore({
                        fields: ['id', 'value'],
                        data: [
                            ['all', 'All'],
                            ['1', 'True'],
                            ['0', 'False']
                        ]
                    }),
                    displayField: 'value',
                    valueField: 'id',
                    anchor: '50%'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
