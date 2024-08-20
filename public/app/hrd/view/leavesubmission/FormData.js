Ext.define('Hrd.view.leavesubmission.FormData', {
    alias: 'widget.leavesubmissionformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.AbsentType', 'Hrd.view.leavesubmission.GridLeave'],
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
                    name: 'leave_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employee_employee_id'
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'NIK/Name',
                    labelWidth: 100,
                    // The body area will contain three text fields, arranged
                    // horizontally, separated by draggable splitters.
                    layout: 'hbox',
                    width: '100%',
                    defaults: {
                        xtype: 'textfield',
                        margin: '0 5 0 0'
                    },
                    items: [{
                            width: 100,
                            name: 'employee_nik',
                            readOnly: true,
                            keepRO: true
                        }, {
                            flex: 1,
                            name: 'employee_name',
                            readOnly: true,
                            keepRO: true
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        flex: 1,
                        xtype: 'textfield',
                        margin: '0 20px 10px 0'
                    },
                    items: [
                        {
                            fieldLabel: 'Tanggal Masuk',
                            name: 'hire_date',
                            readOnly: true,
                            keepRO: true
                        },
                        {
                            fieldLabel: 'Departemen',
                            name: 'department_department',
                            readOnly: true,
                            keepRO: true
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'cbabsenttype',
                            fieldLabel: 'Jenis Cuti',
                            name: 'absenttype_absenttype_id',
                            width: 400,
                            preLoad: true,
                            margin: '0 0 5 0'
                        },
                        {
                            margin: '0 0 10px 20px',
                            xtype: 'textfield',
                            fieldLabel: 'Jatah Cuti',
                            name: 'leave_quota',
                            
                            readOnly: true,
                            keepRO: true
                        },
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        flex: 1
                    },
                    items: [
                        {
                            xtype: 'leavesubmissiongridleave',
                            height: 300,
                            margin: '0 20px 0 0'
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Pengajuan Cuti',
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Lama Cuti',
                                    layout: 'hbox',
                                    width: '100%',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            name: 'duration',
                                            maskRe: /[0-9]/,
                                            readOnly: true,
                                            keepRO: true,
                                            value: 1,
                                            flex: 1
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Hari Kerja',
                                            flex: 1,
                                            margin: '0 5'
                                        },
                                        {
                                            xtype: 'checkbox',
                                            boxLabel: '1/2 Hari',
                                            name: 'is_halfday',
                                            inputValue: '1',
                                            flex: 1
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Tanggal',
                                    layout: 'hbox',
                                    flex: 1,
                                    width: '100%',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            name: 'start_date',
                                            format: 'd/m/Y',
                                            value: new Date(),
                                            submitFormat: 'Y-m-d',
                                            readOnly: true,
                                            flex: 1
                                        },
                                        {
                                            xtype: 'label',
                                            text: 's/d',
                                            width: 30,
                                            margin: '0 5'
                                        },
                                        {
                                            xtype: 'datefield',
                                            format: 'd/m/Y',
                                            submitFormat: 'Y-m-d',
                                            value: new Date(),
                                            readOnly: true,
                                            name: 'end_date',
                                            flex: 1
                                        }
                                    ]
                                },
                                {
                                    xtype: 'textareafield',
                                    width: 500,
                                    height: 150,
                                    name: 'note',
                                    readOnly: true,
                                    fieldLabel: 'Untuk Keperluan'
                                },
				{
                                    xtype: 'textareafield',
                                    width: 500,
                                    height: 100,
                                    name: 'description',
                                    readOnly: true,
                                    fieldLabel: 'Keterangan'
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