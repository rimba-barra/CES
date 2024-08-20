Ext.define('Hrd.view.absentrecord.FormDataTukerOff', {
    alias: 'widget.absentrecordformdatatukeroff',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.ShiftType'],
    frame: true,
    autoScroll: true,
    uniquename: "_absentrecordformdatatukeroff",
    deletedData: {},
    initComponent: function () {
        var me = this;
        var cbf = new Hrd.template.ComboBoxFields();
        Ext.applyIf(me, {
            defaults: {},
            items: [
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
                            xtype: 'hiddenfield',
                            id: 'tukeroff_id' + me.uniquename,
                            name: 'tukeroff_id',
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'project_id' + me.uniquename,
                            name: 'project_id',
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'pt_id' + me.uniquename,
                            name: 'pt_id',
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'employee_id' + me.uniquename,
                            name: 'employee_id',
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'transaksi_id_client' + me.uniquename,
                            name: 'transaksi_id_client',
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    itemId: 'employee_name',
                                    id: 'employee_name' + me.uniquename,
                                    name: 'employee_name',
                                    fieldLabel: 'Nama',
                                    emptyText: 'Manual Input',
                                    width: 300,
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '130'
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'department_id',
                                    id: 'department_id' + me.uniquename,
                                    fieldLabel: 'Department',
                                    width: 300,
                                    displayField: 'department',
                                    valueField: 'department_id',
                                    action: 'resetdetail',
                                    readOnly: true,
                                    allowBlank: true,
                                    emptyText: 'Select Data',
                                    matchFieldWidth: false,
                                    typeAhead: true,
                                    queryMode: 'local',
                                    tpl: Ext.create('Ext.XTemplate',
                                            '<table class="x-grid-table" width="500px" >',
                                            '<tr class="x-grid-row">',
                                            '<th width="100px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                                            '<th width="200px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                                            '</tr>',
                                            '<tpl for=".">',
                                            '<tr class="x-boundlist-item">',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                                            '<td><div class="x-grid-cell x-grid-cell-inner">{department}</div></td>',
                                            '</tr>',
                                            '</tpl>',
                                            '</table>'
                                            ),
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
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Dari Tanggal',
                                    itemId: 'dari_tanggal' + me.uniquename,
                                    id: 'dari_tanggal' + me.uniquename,
                                    name: 'dari_tanggal',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'Auto Value',
                                    width: 240,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '190'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Ke Tanggal',
                                    itemId: 'ke_tanggal' + me.uniquename,
                                    id: 'ke_tanggal' + me.uniquename,
                                    name: 'ke_tanggal',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'Auto Value',
                                    width: 240,
                                    readOnly: true,
                                    allowBlank: true,
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
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Jam In',
                                    itemId: 'jam_masuk' + me.uniquename,
                                    id: 'jam_masuk' + me.uniquename,
                                    name: 'jam_masuk',
                                    emptyText: 'Auto Value',
                                    width: 200,
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
                                    xtype: 'textfield',
                                    fieldLabel: 'Jam Out',
                                    itemId: 'jam_pulang' + me.uniquename,
                                    id: 'jam_pulang' + me.uniquename,
                                    name: 'jam_pulang',
                                    emptyText: 'Auto Value',
                                    width: 200,
                                    readOnly: true,
                                    allowBlank: true,
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
                            items: [
                                {
                                    fieldLabel: 'Dari Shift',
                                    xtype: 'cbshifttype',
                                    name: 'dari_shifttype_id',
                                    id: 'dari_shifttype_id' + me.uniquename,
                                    readOnly: false,
                                    allowBlank: false,
                                },
                                 {
                                    xtype: 'splitter',
                                    width: '170'
                                },
                                {
                                    fieldLabel: 'Ke Shift',
                                    xtype: 'cbshifttype',
                                    name: 'ke_shifttype_id',
                                    id: 'ke_shifttype_id' + me.uniquename,
                                    readOnly: true,
                                    allowBlank: false,
                                },
                            ]
                        },
                        {
                            xtype: 'textareafield',
                            itemId: 'fdms_dari_description' + me.uniquename,
                            id: 'dari_description' + me.uniquename,
                            name: 'dari_description',
                            fieldLabel: "Dari description",
                            emptyText: 'Auto Value',
                            allowBlank: true,
                            readOnly: true,
                            enforceMaxLength: true,
                            grow: true,
                            width: 400,
                        },
                        {
                            xtype: 'textareafield',
                            itemId: 'fdms_ke_description' + me.uniquename,
                            id: 'ke_description' + me.uniquename,
                            name: 'ke_description',
                            fieldLabel: "Ke description",
                            emptyText: 'Auto Value',
                            allowBlank: true,
                            readOnly: true,
                            enforceMaxLength: true,
                            grow: true,
                            width: 400,
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
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
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
});