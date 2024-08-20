Ext.define('Hrd.view.promosidemosi.FormData', {
    alias: 'widget.promosidemosiformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.AbsentType'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height: 500,
    initComponent: function() {
        var me = this;




        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'changestatus_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employee_employee_id'
                },
                {
                    xtype: 'container',
                    layout: 'vbox',
                    defaults: {
                        xtype: 'container',
                        layout: 'hbox',
                        width: '100%',
                        defaults: {
                            xtype: 'textfield',
                            margin: '0 5 5 0'

                        }
                    },
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'NIK / Nama',
                                    name: 'employee_employee_nik',
                                    readOnly: true,
                                    keepRO: true,
                                    flex: 2
                                },
                                {
                                    fieldLabel: '',
                                    name: 'employee_employee_name',
                                    readOnly: true,
                                    keepRO: true,
                                    flex: 3
                                },
                                {
                                    xtype: 'button',
                                    border: 1,
                                    text: 'BROWSE..',
                                    action: 'lookup_employee',
                                    width: 100
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Departemen',
                                    name: 'department_code',
                                    keepRO: true,
                                    readOnly: true,
                                    flex: 2
                                },
                                {
                                    fieldLabel: '',
                                    name: 'department_department',
                                    readOnly: true,
                                    keepRO: true,
                                    flex: 3
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Golongan',
                                    name: 'group_code',
                                    readOnly: true,
                                    keepRO: true,
                                    flex: 1
                                },
                                {
                                    fieldLabel: 'Jabatan',
                                    name: 'position_position',
                                    readOnly: true,
                                    keepRO: true,
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                flex: 1,
                                xtype: 'fieldset',
                                layout: 'vbox'

                            },
                            items: [
                                {
                                    title: 'Promosi / Demosi',
                                    items: [
                                       /* {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            defaults: {
                                                xtype: 'radiofield',
                                                name: 'change_mode'
                                            },
                                            items: [
                                                {
                                                    boxLabel: 'Promosi',
                                                    checked: true,
                                                    inputvalue: '1',
                                                },
                                                {
                                                    boxLabel: 'Demosi',
                                                    inputValue: '2'
                                                }
                                            ]
                                        },*/
                                        {
                                            xtype: 'radiogroup',
                                            fieldLabel: '',
                                            // Arrange radio buttons into two columns, distributed vertically
                                            columns: 2,
                                            vertical: true,
                                            defaults:{
                                                width:75
                                            },
                                            items: [
                                                {boxLabel: 'Promosi', name: 'change_mode', inputValue: '1',checked: true,},
                                                {boxLabel: 'Demosi', name: 'change_mode', inputValue: '2'},
                                            ]
                                        },
                                        {
                                            xtype: 'combobox',
                                            name: 'new_group_id',
                                            fieldLabel: 'Golongan baru',
                                            displayField: 'code',
                                            valueField: 'group_id',
                                        },
                                        {
                                            xtype: 'combobox',
                                            name: 'new_position_id',
                                            fieldLabel: 'Jabatan baru',
                                            displayField: 'position',
                                            valueField: 'position_id',
                                        },
                                        {
                                            xtype: 'dfdatefield',
                                            name: 'effective_date',
                                            fieldLabel: 'Tanggal efektif'
                                        }
                                    ]
                                },
                                {
                                    title: 'Approval',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            defaults: {
                                                xtype: 'radio',
                                                name: 'is_approve'
                                            },
                                            items: [
                                                {
                                                    boxLabel: 'Ya',
                                                    inputValue: 1
                                                },
                                                {
                                                    boxLabel: 'Tidak',
                                                    checked: true,
                                                    inputValue: 0
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'sk_number',
                                            fieldLabel: 'SK'
                                        }
                                    ]
                                }
                            ]
                        }

                    ]
                },
            ],
            dockedItems: []
        });

        me.callParent(arguments);
    }
});