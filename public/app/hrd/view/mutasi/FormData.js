Ext.define('Hrd.view.mutasi.FormData', {
    alias: 'widget.mutasiformdata',
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
                                    width: 300
                                },
                                {
                                    fieldLabel: '',
                                    name: 'employee_employee_name',
                                    readOnly: true,
                                    keepRO: true,
                                    width: 400
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
                            xtype: 'textfield',
                            fieldLabel: 'Departemen',
                            name: 'department_code',
                            width: 300,
                            keepRO: true,
                            readOnly: true,
                        },
                        {
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Jabatan',
                                    name: 'position_position',
                                    readOnly: true,
                                    width: 250,
                                    keepRO: true
                                },
                                {
                                    fieldLabel: 'Golongan',
                                    name: 'group_code',
                                    readOnly: true,
                                    keepRO: true,
                                    width: 250,
                                    hidden:true
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            name: 'old_costcenter1',
                            readOnly: true,
                            keepRO: true,
                            width: 300,
                            fieldLabel: 'Cost Center 1',
                        },
                        {
                            xtype: 'textfield',
                            name: 'old_costcenter2',
                            readOnly: true,
                            width: 300,
                            keepRO: true,
                            fieldLabel: 'Cost Center 2',
                        },
                        {
                            xtype: 'textfield',
                            name: 'old_costcenter3',
                            readOnly: true,
                            width: 300,
                            keepRO: true,
                            fieldLabel: 'Cost Center 3',
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
                                    title: 'Mutasi',
                                    items: [

 					/*
                                        {
                                            xtype: 'combobox',
                                            name: 'new_project_id',
                                            fieldLabel: 'Perusahaan baru',
                                            displayField: 'code',
                                            valueField: 'project_id',
                                        },
					*/
					 {
                                            xtype: 'combobox',
                                            name: 'new_project_id',
                                            fieldLabel: 'Perusahaan baru',
                                            displayField: 'name',
                                            valueField: 'project_id',
                                            matchFieldWidth: false,
                                            typeAhead: true,
                                            queryMode: 'local',
                                            tpl: Ext.create('Ext.XTemplate',
                                                    '<table class="x-grid-table" width="500px" >',
                                                    '<tr class="x-grid-row">',
                                                    '<th width="200px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                                                    '</tr>',
                                                    '<tpl for=".">',
                                                    '<tr class="x-boundlist-item">',
                                                    '<td><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                                                    '</tr>',
                                                    '</tpl>',
                                                    '</table>'
                                                    ),
                                        },					
                                        {
                                            xtype: 'combobox',
                                            name: 'new_department_id',
                                            fieldLabel: 'Department baru',
                                            displayField: 'code',
                                            valueField: 'department_id',
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
                                            xtype: 'combobox',
                                            displayField: 'name',
                                            valueField: 'alokasibiaya_id',
                                            name: 'new_costcenter1',
                                            width:400,
                                            fieldLabel: 'Cost Center 1 baru',
                                        },
                                        {
                                            xtype: 'combobox',
                                            displayField: 'name',
                                            valueField: 'alokasibiaya_id',
                                            name: 'new_costcenter2',
                                            width:400,
                                            fieldLabel: 'Cost Center 2 baru',
                                        },
                                        {
                                            xtype: 'combobox',
                                            displayField: 'name',
                                            valueField: 'alokasibiaya_id',
                                            width:400,
                                            name: 'new_costcenter3',
                                            fieldLabel: 'Cost Center 3 baru',
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