Ext.define('Hrd.view.prosesgaji.FormData', {
    alias: 'widget.prosesgajiformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.library.template.view.MoneyField', 'Hrd.library.component.ComboboxDS2'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height: 500,
    initComponent: function() {
        var me = this;





        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'transfer_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employee_employee_id'
                },
                {
                    xtype: 'fieldset',
                    layout: 'vbox',
                    title: '',
                    items: [
                        {
                            xtype: 'ds2combobox',
                            name: 'monthyear_filter',
                            mode_read: 'periode',
                            displayField: 'monthyear',
                            valueField: 'monthyear',
                            fieldLabel: 'Periode'
                        },
                        {
                            xtype: 'textfield',
                            name: 'monthyear',
                            hidden: true,
                            fieldLabel: 'Periode'
                        },
                        {
                            xtype: 'ds2combobox',
                            name: 'group_filter',
                            mode_read: 'group',
                            displayField: 'group',
                            valueField: 'group',
                            fieldLabel: 'Group'
                        },
                        {
                            xtype: 'textfield',
                            name: 'batch',
                            hidden: true,
                            fieldLabel: 'Group'
                        },
                        {
                            xtype: 'ds2combobox',
                            mode_read: 'komponen',
                            name: 'komponengaji_komponengaji_id',
                            displayField: 'code',
                            valueField: 'komponengaji_id',
                            fieldLabel: 'Komponen Gaji'
                        }

                    ]
                },
                {
                    xtype: 'container',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'employee_employee_nik',
                                    fieldLabel: 'NIK / Nama Karyawan',
                                    keepRO: true,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'employee_employee_name',
                                    fieldLabel: '',
                                    keepRO: true,
                                    readOnly: true
                                },
                                {
                                    xtype: 'button',
                                    action: 'lookup_employee',
                                    text: 'BROWSE EMPLOYEE'
                                }
                            ]
                        },
                        {
                            xtype: 'xmoneyfield',
                            fieldLabel: 'Value',
                            name: 'value'
                        },
                        {
                            xtype: 'button',
                            action: 'insert',
                            text: '<< INSERT'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    layout: 'hbox',
                    margin: '150 5 5 5',
                    width: 500,
                    title: '',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Total',
                            name: 'total',
                            keepRO: true,
                            readOnly: true,
                            width: 200,
                            margin: '0 5 0 0'
                        },
                        {
                            xtype: 'xmoneyfield',
                            fieldLabel: '',
                            name: 'total_value',
                            keepRO: true,
                            readOnly: true
                        }
                    ]
                }
            ],
            dockedItems: []
        });

        me.callParent(arguments);
    }
});