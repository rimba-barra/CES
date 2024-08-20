Ext.define('Hrd.view.cleansingdata.FormData', {
    extend: 'Hrd.library.template.view.FormData',
    alias: 'widget.cleansingdataformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 620,
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
                    name: 'cleansingdata_id',
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
                    name: 'old_project_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'old_pt_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'old_department_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'old_group_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'old_reportto_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'contract_ke',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'approvalby',
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
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Status Karyawan',
                            labelWidth: 140,
                            defaultType: 'radiofield',
                            defaults: {
                                layout: 'fit'
                            },
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
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    margin: '10 0 0 0', //(top, right, bottom, left).
                    items: [
                        {
                            xtype: 'splitter',
                            width: '150'
                        },
                        {
                            xtype: 'label',
                            name: 'lblmutasi4',
                            forId: 'lblmutasi4',
                            text: 'Dari',
                        },
                        {
                            xtype: 'splitter',
                            width: '350'
                        },
                        {
                            xtype: 'label',
                            name: 'lblmutasi6',
                            forId: 'lblmutasi6',
                            text: 'Menjadi',
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    }, 
                    hidden:true,
                    margin: '10 0 0 0', //(top, right, bottom, left).
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Proyek',
                            itemId: 'fd_projectname',
                            id: 'projectname',
                            name: 'projectname',
                            width: 350,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null, 
                            hidden:true
                        },
                        {
                            xtype: 'splitter',
                            width: '10', 
                            hidden:true
                        },
                        {
                            xtype: 'projectcombobox',
                            fieldLabel: 'Proyek',
                            itemId: 'fd_new_project_id',
                            id: 'new_project_id',
                            name: 'new_project_id',
                            width: 350,
                            allowBlank: false,
                             //untuk set readonly ketika update
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            readOnly: true, 
                            hidden:true
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    hidden:true,
                    margin: '10 0 0 0', //(top, right, bottom, left).
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'PT',
                            itemId: 'fd_ptname',
                            id: 'ptname',
                            name: 'ptname',
                            width: 350,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'ptcombobox',
                            fieldLabel: 'PT',
                            itemId: 'fd_new_pt_id',
                            id: 'new_pt_id' + me.uniquename,
                            name: 'new_pt_id',
                            width: 350,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            readOnly: true,
                             //untuk set readonly ketika update
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    margin: '10 0 0 0', //(top, right, bottom, left).
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Departemen',
                            itemId: 'fd_department',
                            id: 'department',
                            name: 'department',
                            width: 350,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'departmentcombobox',
                            fieldLabel: 'Departemen',
                            itemId: 'fd_new_department_id',
                            id: 'new_department_id',
                            name: 'new_department_id',
                            width: 350,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            value:'department_id'
                             //untuk set readonly ketika update
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    margin: '10 0 0 0', //(top, right, bottom, left).
                    items: [
                        {
                            xtype: 'jobfamilycombobox',
                            fieldLabel: 'Job Family',
                            itemId: 'fd_old_jobfamily_id',
                            id: 'old_jobfamily_id',
                            name: 'old_jobfamily_id',
                            width: 350,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,

                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'jobfamilycombobox',
                            fieldLabel: 'Job Family',
                            itemId: 'fd_new_jobfamily_id',
                            id: 'new_jobfamily_id',
                            name: 'new_jobfamily_id',
                            width: 350,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                             //untuk set readonly ketika update
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    margin: '10 0 0 0', //(top, right, bottom, left).
                    items: [
                        {
                            xtype: 'positioncombobox',
                            fieldLabel: 'Jabatan',
                            itemId: 'fd_old_position_id',
                            id: 'old_position_id',
                            name: 'old_position_id',
                            queryMode: 'local',
                            displayField: 'description', //mengambil data dari store
                            width: 350,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'positioncombobox',
                            fieldLabel: 'Jabatan',
                            itemId: 'fd_new_position_id',
                            id: 'new_position_id',
                            name: 'new_position_id',
                            queryMode: 'local',
                            displayField: 'description', //mengambil data dari store
                            width: 350,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                             //untuk set readonly ketika update
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    margin: '10 0 0 0', //(top, right, bottom, left).
                    items: [
                        {
                            xtype: 'bandingcombobox',
                            fieldLabel: 'Banding',
                            itemId: 'fd_old_banding_id',
                            id: 'old_banding_id',
                            name: 'old_banding_id',
                            width: 350,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'bandingcombobox',
                            fieldLabel: 'Banding',
                            itemId: 'fd_new_banding_id',
                            id: 'new_banding_id',
                            name: 'new_banding_id',
                            width: 350,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            readOnly: false,
                             //untuk set readonly ketika update
                            editable:false
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    margin: '10 0 0 0', //(top, right, bottom, left).
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Golongan',
                            itemId: 'fd_groupname',
                            id: 'groupname',
                            name: 'groupname',
                            width: 350,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Golongan',
                            itemId: 'fd_groupname_display',
                            id: 'groupname_display',
                            name: 'groupname_display',
                            width: 350,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            hidden:true
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'groupcombobox',
                            fieldLabel: 'Golongan New',
                            itemId: 'fd_new_group_id',
                            id: 'new_group_id',
                            name: 'new_group_id',
                            width: 350,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
			    queryMode:'local',
                            displayField: 'code',	
                             //untuk set readonly ketika update
                            editable:false, 
                            hidden:true
                        },
                        {
                            xtype: 'groupcombobox',
                            fieldLabel: 'Golongan',
                            itemId: 'fd_new_group_id_display',
                            id: 'new_group_id_display',
                            name: 'new_group_id_display',
                            width: 350,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
			    queryMode:'local',
                            displayField: 'code',	
                             //untuk set readonly ketika update
                            editable:false
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    margin: '10 0 0 0', //(top, right, bottom, left).
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Atasan Langsung',
                            itemId: 'fd_reporttoname',
                            id: 'reporttoname',
                            name: 'reporttoname',
                            readOnly: true,
                            width: 350,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'reporttocombobox',
                            fieldLabel: 'Atasan Langsung',
                            itemId: 'fd_new_reportto_id',
                            id: 'new_reportto_id',
                            name: 'new_reportto_id',
                            width: 350,
                            //readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                             //untuk set readonly ketika update
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    margin: '10 0 0 0', //(top, right, bottom, left).
                    items: [
                        {
                            xtype: 'positioncombobox',
                            fieldLabel: 'Jabatan Atasan Langsung',
                            itemId: 'fd_old_reportto_position_id',
                            id: 'old_reportto_position_id',
                            name: 'old_reportto_position_id',
                            queryMode: 'local',
                            displayField: 'description', //mengambil data dari store
                            width: 350,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'positioncombobox',
                            fieldLabel: 'Jabatan Atasan Langsung',
                            itemId: 'fd_new_reportto_position_id',
                            id: 'new_reportto_position_id',
                            name: 'new_reportto_position_id',
                            queryMode: 'local',
                            displayField: 'description', //mengambil data dari store
                            width: 350,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            readOnly: true,
                             //untuk set readonly ketika update
                        },
                    ]
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
                            xtype: 'label',
                            forId: 'lblmutasi4',
                            width: 600,
                            labelWidth: 400,
                            text: 'Notes',
                        },
                        {
                            xtype: 'textareafield',
                            itemId: 'fdms_note',
                            name: 'note',
                            fieldLabel: '',
                            width: 710,
                            height:50,
                            labelWidth: 140,
                            allowBlank: true,
                            readOnly: false,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                        },
                    ]
                },
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
                action: 'approve',
                itemId: 'btnApprove',
                padding: 5,
                width: 75,
                iconCls: 'icon-approve',
                text: 'Approve'
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

