Ext.define('Hrd.view.groupemployee.FormData', {
    extend: 'Hrd.library.template.view.FormData',
    alias: 'widget.groupemployeeformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 420,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'mode_read',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'groupemployee_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'addby',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'approve_user_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'contract_ke',
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: '100%',
                    },
                    items: [
                        {
                            xtype: 'employeecombobox',
                            itemId: 'fd_employee_id',
                            name: 'employee_id',
                            id: 'employee_id',
                            fieldLabel: 'Nama',
                            width: 500,
                            labelWidth: 140,
                            allowBlank: false,
                            readOnly: false,
                            enableKeyEvents: true,
                            enforceMaxLength: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'NIK',
                            itemId: 'fd_employee_nik',
                            id: 'employee_nik',
                            name: 'employee_nik',
                            width: 300,
                            labelWidth: 140,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Tanggal Masuk Kerja',
                            itemId: 'fdms_hire_date',
                            id: 'hire_date',
                            name: 'hire_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'dd-mm-YYYY',
                            width: 300,
                            labelWidth: 140,
                            readOnly: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            hidden: true
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Status Karyawan',
                            labelWidth: 140,
                            defaultType: 'radiofield',
                            defaults: {
                                layout: 'fit'
                            },
                            hidden: true,
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    align: 'right',
                                    bodyBorder: false,
                                    defaults: {
                                        layout: 'fit'
                                    },
                                    margin: '0 0 0 0', //(top, right, bottom, left).
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'Kontrak  Tgl',
                                            name: 'employeestatus',
                                            inputValue: '',
                                            id: 'employeestatus1',
                                            allowBlank: true,
                                            checked: false,
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '5'
                                        },
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: '',
                                            itemId: 'fd_mulaikontrak',
                                            id: 'mulaikontrak',
                                            name: 'mulaikontrak',
                                            format: 'd-m-Y',
                                            submitFormat: 'Y-m-d',
                                            emptyText: 'dd-mm-YYYY',
                                            width: 120,
                                            readOnly: true,
                                            allowBlank: true,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            rowdata: null
                                        },
                                        {
                                            xtype: 'label',
                                            forId: 'labelto',
                                            text: 's/d',
                                            margin: '0 10 0 10', //(top, right, bottom, left).
                                            width: 10,
                                        },
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: '',
                                            itemId: 'fd_berakhirkontrak',
                                            id: 'berakhirkontrak',
                                            name: 'berakhirkontrak',
                                            format: 'd-m-Y',
                                            submitFormat: 'Y-m-d',
                                            emptyText: 'dd-mm-YYYY',
                                            width: 120,
                                            readOnly: true,
                                            allowBlank: true,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            rowdata: null
                                        },
                                    ]
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    align: 'right',
                                    bodyBorder: false,
                                    defaults: {
                                        layout: 'fit'
                                    },
                                    margin: '0 0 0 0', //(top, right, bottom, left).
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'Pegawai Tetap sejak tanggal',
                                            name: 'employeestatus',
                                            inputValue: 'permanent',
                                            id: 'employeestatus3',
                                            allowBlank: true
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '5'
                                        },
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: '',
                                            itemId: 'fd_assignation_date',
                                            id: 'assignation_date',
                                            name: 'assignation_date',
                                            format: 'd-m-Y',
                                            submitFormat: 'Y-m-d',
                                            emptyText: 'dd-mm-YYYY',
                                            width: 120,
                                            readOnly: true,
                                            allowBlank: true,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            rowdata: null
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Departemen',
                            itemId: 'fd_department',
                            id: 'department',
                            name: 'department',
                            width: 350,
                            labelWidth: 140,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null, 
                            readOnly: true,
                             //untuk set readonly ketika update
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Jabatan',
                            itemId: 'fd_position',
                            id: 'position',
                            name: 'position',
                            queryMode: 'local',
                            width: 350,
                            labelWidth: 140,
                            readOnly: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Banding',
                            itemId: 'fd_banding',
                            id: 'banding',
                            name: 'banding',
                            width: 350,
                            labelWidth: 140,
                            readOnly: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Job Family',
                            itemId: 'fd_jobfamily',
                            id: 'jobfamily',
                            name: 'jobfamily',
                            width: 350,
                            labelWidth: 140,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            readOnly: true,
                        },
                        {
                            xtype: 'groupcombobox',
                            fieldLabel: 'Group (Golongan)',
                            itemId: 'fd_group_id',
                            id: 'group_id',
                            name: 'group_id',
                            width: 350,
                            labelWidth: 140,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
			    queryMode:'local',
                            displayField: 'code'
                        },
                        {
                            xtype: 'textareafield',
                            itemId: 'fdms_note',
                            name: 'note',
                            fieldLabel: 'Notes',
                            width: 710,
                            height:50,
                            labelWidth: 140,
                            allowBlank: true,
                            readOnly: false,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                        },
                    ]                
                }
            ],
            dockedItems: me.generateDockedItemCustome()
        });

        me.callParent(arguments);
    },
     generateDockedItemCustome: function() {
        var x = [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                padding: 6,
                type: 'hbox'
            },
            items: [
            {
                xtype: 'button',
                action: 'save',
                itemId: 'btnSave',
                padding: 5,
                width: 75,
                iconCls: 'icon-save',
                text: 'Save'
            },
            {
                xtype: 'button',
                action: 'cancel',
                itemId: 'btnCancel',
                padding: 5,
                width: 75,
                iconCls: 'icon-cancel',
                text: 'Cancel',
                handler: function() {
                    this.up('window').close();
                }
            }
            ]
        }
        ];
        return x;
    },

});

