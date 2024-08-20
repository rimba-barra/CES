Ext.define('Hrd.view.registertrainingbytype.FormData', {
    alias: 'widget.registertrainingbytypeformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields', 'Hrd.view.registertrainingbytype.GridEmployee', 'Hrd.view.registertrainingbytype.GridDetailDate'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();


        var gradeStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: [{
                    number: 1, name: '1. Kurang'
                }, {
                    number: 2, name: '2. Cukup'
                }, {
                    number: 3, name: '3. Baik'
                }, {
                    number: 4, name: '4. Sangat Baik'
                }, {
                    number: 5, name: '5. Tidak Ada'
                }]
        });


        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'training_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'scheduletraining_scheduletraining_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employee_employee_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'trainingdetail_id'
                },
                {
                    xtype: 'fieldset',
                    title: 'Training',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                flex: 1,
                                xtype: 'textfield',
                                readOnly: true,
                                size: 30,
                                margin: '0 10px 10px 0',
                            },
                            items: [
                                {
                                    name: 'programtraining_code', fieldLabel: 'Kode Training',
                                    keepRO: true,
                                    width: 300,
                                    flex: null
                                }, {
                                    xtype: 'button',
                                    text: 'Browse',
                                    action: 'browse',
                                    disabled: true,
                                    flex: null,
                                    width: 100
                                }, {
                                    name: 'programtraining_theme',
                                    keepRO: true,
                                    fieldLabel: '',
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                flex: 1,
                                xtype: 'dfdatefield',
                                readOnly: true,
                                size: 30,
                                margin: '0 10px 10px 0',
                            },
                            items: [
                                {
                                    name: 'scheduletraining_start_date', fieldLabel: 'Periode',
                                    keepRO: true,
                                }, {
                                    name: 'scheduletraining_end_date',
                                    fieldLabel: ' s/d ',
                                    keepRO: true,
                                }, {
                                    name: 'effective_date',
                                    submitFormat: 'Y-m-d',
                                    fieldLabel: 'Efektif Tanggal',
                                }
                            ]
                        },
                        {
                            name: 'programtraining_theme2',
                            readOnly: true,
                            xtype: 'textfield',
                            keepRO: true,
                            fieldLabel: 'Tema Training',
                            width: 500
                        },
                        {
                            xtype: 'textfield',
                            name: 'programtraining_cost',
                            readOnly: true,
                            keepRO: true,
                            fieldLabel: 'Biaya'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Karyawan',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'container'

                    },
                    items: [
                        {
                            width: 400,
                            items: [
                                {
                                    xtype: 'registertrainingbytypeemgrid',
                                    height: 300,
                                    flex: 1
                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'Training',
                                    width: 400,
                                    margin: '10px',
                                    items: [
                                        {
                                            xtype: 'registertrainingbytypeddgrid',
                                            height: 200
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            flex: 1,
                            margin: '0 0 0 10px',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'vbox',
                                    defaults: {
                                        flex: 1,
                                        xtype: 'textfield',
                                        readOnly: true,
                                        size: 30,
                                        margin: '0 10px 10px 0',
                                    },
                                    items: [
                                        {
                                            name: 'employee_employee_nik',
                                            fieldLabel: ' N.I.K',
                                            keepRO: true,
                                            width: 300,
                                            flex: null
                                        }, {
                                            name: 'employee_employee_name',
                                            keepRO: true,
                                            fieldLabel: 'Nama'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'vbox',
                                    defaults: {
                                        flex: 1,
                                        xtype: 'textfield',
                                        readOnly: true,
                                        size: 30,
                                        margin: '0 10px 10px 0',
                                    },
                                    items: [
                                        {
                                            name: 'department_code', fieldLabel: 'Departemen',
                                            keepRO: true,
                                        }, {
                                            name: 'group_code',
                                            keepRO: true,
                                            fieldLabel: 'Golongan',
                                            hidden:true
                                        },
                                    ]
                                },
                                {
                                    xtype: 'checkbox',
                                    fieldLabel: 'Sertifikat',
                                    name: 'certificate',
                                    inputValue: '1',
                                    uncheckedValue: '0'
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    fieldLabel: 'Status',
                                    width: 400,
                                    bodyStyle: 'background:none;border:0;',
                                    defaults: {
                                        xtype: 'radiofield',
                                        flex: 1
                                    },
                                    items: [
                                        {
                                            boxLabel: 'Lulus',
                                            name: 'training_status',
                                            checked: true,
                                            inputValue: '1'
                                        }, {
                                            boxLabel: 'Mengulang',
                                            name: 'training_status',
                                            inputValue: '2'
                                        }, {
                                            boxLabel: 'Tanpa Status',
                                            name: 'training_status',
                                            inputValue: '3'
                                        }
                                    ]
                                },
                                {
                                    name: 'point', fieldLabel: 'Nilai',
                                    xtype: 'textfield',
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        flex: 1,
                                        xtype: 'textfield',
                                       
                                        size: 30,
                                        margin: '0 10px 10px 0',
                                    },
                                    items: [
                                        {
                                            name: 'duration',
                                            readOnly:true,
                                            keepRO:true,
                                            fieldLabel: 'Durasi',
                                        }, {
                                            width:'100px',
                                            xtype: 'label',
                                            text: 'hh:mm'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'vbox',
                                    defaults: {
                                        flex: 1,
                                        readOnly: true,
                                        margin: '0 10px 10px 0',
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            store: gradeStore,
                                            displayField: 'name',
                                            valueField: 'number',
                                            name: 'grade', fieldLabel: 'Penilaian Training',
                                        }, {
                                            xtype: 'checkbox',
                                            name: 'is_updateattendance',
                                            boxLabel: 'Update kehadiran',
                                            inputValue: '1'
                                        },
                                    ]
                                }
                            ]
                        }




                    ]
                }
            ],
            dockedItems: []

        });

        me.callParent(arguments);
    }

});