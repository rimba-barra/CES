Ext.define('Hrd.view.rotasi.FormData', {
    alias: 'widget.rotasiformdata',
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
                                    fieldLabel: 'Divisi',
                                    name: 'division_code',
                                    readOnly: true,
                                    keepRO: true,
                                    flex: 3
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Jabatan',
                            name: 'position_position',
                            readOnly: true,
                            width: 250,
                            keepRO: true
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
                                    title: 'Rotasi',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            name: 'new_department_id',
                                            fieldLabel: 'Department baru',
                                            displayField: 'code',
                                            valueField: 'department_id',
                                        },
                                        {
                                            xtype: 'combobox',
                                            name: 'new_division_id',
                                            fieldLabel: 'Divisi baru',
                                            displayField: 'code',
                                            valueField: 'division_id',
                                        },
                                        {
                                            xtype: 'combobox',
                                            name: 'new_position_id',
                                            fieldLabel: 'Jabatan baru',
                                            displayField: 'position',
                                            valueField: 'position_id',
                                        },
                                         {
                                            xtype: 'checkbox',
                                            checked:true,
                                            name:'is_atasan_karyawan',
                                            fieldLabel:' ',
                                            boxLabel: 'Ambil dari data Karyawan',
                                            inputValue: 1,
                                        },
                                        {
                                            xtype: 'combobox',
                                            name: 'new_atasan_id',
                                            fieldLabel: 'Atasan baru',
                                            width: 400,
                                            displayField: 'employee_name',
                                            valueField: 'employee_id'
                                        },
                                       
                                        {
                                            xtype: 'textfield',
                                            hidden:true,
                                            fieldLabel: 'Atasan baru',
                                            name: 'new_atasan_nama',
                                            width: 400

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