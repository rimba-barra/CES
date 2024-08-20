Ext.define('Hrd.view.mutation.FormData', {
    extend: 'Hrd.library.template.view.FormData',
    alias: 'widget.mutationformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 550,
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
                    name: 'changestatus_id',
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
                    name: 'old_costcenter1',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'old_costcenter2',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'old_costcenter3',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'old_section_id',
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
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'label',
                            forId: 'lblmutasi1',
                            text: 'FORMULIR PERUBAHAN DATA KARYAWAN',
                            margin: '2 0 5 160', //top,right,bottom,left
                            style: {
                                font: 'normal 16px tahoma !important'
                            }
                        },
                        {
                            xtype: 'label',
                            forId: 'lblmutasi2',
                            text: 'Setelah menimbang adanya Kebutuhan Management, Kompetensi, Prestasi, Masa Kerja dari ',
                        }

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
                            xtype: 'changestatustypecombobox',
                            itemId: 'fd_changetype_id',
                            name: 'changetype_id',
                            id: 'changetype_id',
                            fieldLabel: 'Perubahan Data',
                            width: 300,
                            labelWidth: 140,
                            allowBlank: false,
                            readOnly: false,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                             //untuk set readonly ketika update

                        },
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
                            enforceMaxLength: true,
                             //untuk set readonly ketika update
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
                            width: 570,
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
                                            boxLabel: 'Kontrak  Tanggal',
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
                    layout: 'vbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'label',
                            name: 'lblmutasi3',
                            forId: 'lblmutasi3',
                            text: 'Maka kami menggunakan MUTASI bagi yang bersangkutan sbb :',
                        }

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
                            width: '50'
                        },
                        {
                            xtype: 'label',
                            name: 'lblmutasi4',
                            forId: 'lblmutasi4',
                            text: 'Mutasi Dari',
                        },
                        {
                            xtype: 'splitter',
                            width: '200'
                        },
                        {
                            xtype: 'label',
                            name: 'lblmutasi6',
                            forId: 'lblmutasi6',
                            text: 'Mutasi Ke',
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
                            fieldLabel: 'Proyek',
                            itemId: 'fd_projectname',
                            id: 'projectname',
                            name: 'projectname',
                            width: 280,
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
                            xtype: 'projectcombobox',
                            fieldLabel: 'Proyek',
                            itemId: 'fd_new_project_id',
                            id: 'new_project_id',
                            name: 'new_project_id',
                            width: 280,
                            allowBlank: false,
                             //untuk set readonly ketika update
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
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
                            fieldLabel: 'PT',
                            itemId: 'fd_ptname',
                            id: 'ptname',
                            name: 'ptname',
                            width: 280,
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
                            width: 280,
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
                            xtype: 'textfield',
                            fieldLabel: 'Departemen',
                            itemId: 'fd_department',
                            id: 'department',
                            name: 'department',
                            width: 280,
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
                            width: 280,
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
                            xtype: 'textfield',
                            fieldLabel: 'Section',
                            itemId: 'fd_section',
                            id: 'section',
                            name: 'section',
                            width: 280,
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
                            xtype: 'sectiondepartmentcombobox',
                            fieldLabel: 'Section',
                            itemId: 'fd_new_section_id',
                            id: 'new_section_id',
                            name: 'new_section_id',
                            width: 280,
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
                            xtype: 'jobfamilycombobox',
                            fieldLabel: 'Job Family',
                            itemId: 'fd_old_jobfamily_id',
                            id: 'old_jobfamily_id',
                            name: 'old_jobfamily_id',
                            width: 280,
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
                            width: 280,
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
                            fieldLabel: 'Position',
                            itemId: 'fd_old_position_id',
                            id: 'old_position_id',
                            name: 'old_position_id',
                            queryMode: 'local',
                            displayField: 'description', //mengambil data dari store
                            width: 280,
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
                            fieldLabel: 'Position',
                            itemId: 'fd_new_position_id',
                            id: 'new_position_id',
                            name: 'new_position_id',
                            queryMode: 'local',
                            displayField: 'description', //mengambil data dari store
                            width: 280,
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
                            width: 280,
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
                            width: 280,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
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
                            width: 280,
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
                            xtype: 'groupcombobox',
                            fieldLabel: 'Golongan',
                            itemId: 'fd_new_group_id_display',
                            id: 'new_group_id_display',
                            name: 'new_group_id_display',
                            width: 280,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
			    queryMode:'local',
                            displayField: 'code',	
                             //untuk set readonly ketika update
                            editable:false
                        }
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
                            fieldLabel: 'Golongan',
                            itemId: 'fd_groupname_display',
                            id: 'groupname_display',
                            name: 'groupname_display',
                            width: 280,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,                            
                        },
                        {
                            xtype: 'groupcombobox',
                            fieldLabel: 'New Golongan',
                            itemId: 'fd_new_group_id',
                            id: 'new_group_id',
                            name: 'new_group_id',
                            width: 280,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
			    queryMode:'local',
                            displayField: 'code',
                            //editable:false, 
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
                    margin: '10 0 0 0', //(top, right, bottom, left).
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Atasan Langsung',
                            itemId: 'fd_reporttoname',
                            id: 'reporttoname',
                            name: 'reporttoname',
                            readOnly: true,
                            width: 280,
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
                            width: 280,
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
                            width: 280,
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
                            width: 280,
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
                            xtype: 'textfield',
                            fieldLabel: 'Alokasi Biaya 1',
                            itemId: 'fd_alokasibiaya1',
                            id: 'alokasibiaya1',
                            name: 'alokasibiaya1',
                            width: 280,
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
                            xtype: 'alokasibiayacombobox',
                            fieldLabel: 'Alokasi Biaya 1',
                            itemId: 'fd_new_costcenter1',
                            id: 'new_costcenter1',
                            name: 'new_costcenter1',
                            width: 280,
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
                            xtype: 'textfield',
                            fieldLabel: 'Alokasi Biaya 2',
                            itemId: 'fd_alokasibiaya2',
                            id: 'alokasibiaya2',
                            name: 'alokasibiaya2',
                            width: 280,
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
                            xtype: 'alokasibiayacombobox',
                            fieldLabel: 'Alokasi Biaya 2',
                            itemId: 'fd_new_costcenter2',
                            id: 'new_costcenter2',
                            name: 'new_costcenter2',
                            width: 280,
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
                            xtype: 'textfield',
                            fieldLabel: 'Alokasi Biaya 3',
                            itemId: 'fd_alokasibiaya3',
                            id: 'alokasibiaya3',
                            name: 'alokasibiaya3',
                            width: 280,
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
                            xtype: 'alokasibiayacombobox',
                            fieldLabel: 'Alokasi Biaya 3',
                            itemId: 'fd_new_costcenter3',
                            id: 'new_costcenter3',
                            name: 'new_costcenter3',
                            width: 280,
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
                            xtype: 'textfield',
                            fieldLabel: 'Working Days',
                            itemId: 'fd_hari_kerja_perminggu',
                            id: 'old_hari_kerja_perminggu',
                            name: 'old_hari_kerja_perminggu',
                            width: 280,
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
                            xtype: 'combobox',
                            fieldLabel: 'Working Days',
                            itemId: 'fd_new_hari_kerja_perminggu',
                            id: 'new_hari_kerja_perminggu',
                            name: 'new_hari_kerja_perminggu',
                            width: 280,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            valueField : 'value',
                            displayField : 'text',
                            store : new Ext.data.SimpleStore({
                                data : [[5, '5'],
                                        [6, '6']],
                                id : 0,
                                fields : ['value', 'text']
                            }),
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
                            xtype: 'datefield',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            itemId: 'fdms_effective_date',
                            name: 'effective_date',
                            fieldLabel: 'Efektif Per Tanggal',
                            width: 250,
                            labelWidth: 140,
                            allowBlank: false,
                            readOnly: false,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'fdms_reason',
                            name: 'reason',
                            fieldLabel: 'Dengan Pertimbangan',
                            width: 570,
                            labelWidth: 140,
                            allowBlank: false,
                            readOnly: false,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                        },
                        {
                            xtype: 'label',
                            forId: 'lblmutasi4',
                            width: 600,
                            labelWidth: 400,
                            text: 'Penambahan/Perubahan/Penyesuaian Tugas dan Lain-lain(bila ada)',
                        },
                        {
                            xtype: 'textareafield',
                            itemId: 'fdms_note',
                            name: 'note',
                            fieldLabel: '',
                            width: 560,
                            labelWidth: 140,
                            allowBlank: false,
                            readOnly: false,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: '100%',
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'fdms_sk_number',
                            name: 'sk_number',
                            fieldLabel: 'SK No.',
                            width: 300,
                            labelWidth: 140,
                            allowBlank: true,
                            readOnly: false,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
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
                            xtype: 'approvaltransfercombobox',
                            fieldLabel: 'Approval by',
                            itemId: 'fd_generalparameter_id',
                            id: 'generalparameter_id',
                            name: 'generalparameter_id',
                            width: 300,
                            labelWidth: 140,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
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

