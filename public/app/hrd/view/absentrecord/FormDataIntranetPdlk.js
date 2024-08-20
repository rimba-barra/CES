Ext.define('Hrd.view.absentrecord.FormDataIntranetPdlk', {
    alias: 'widget.absentrecordformdataintranetpdlk',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    uniquename: "_absentrecordformdataintranetpdlk",
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
                            id: 'tugas_id' + me.uniquename,
                            name: 'tugas_id',
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'employee_id_ces' + me.uniquename,
                            name: 'employee_id_ces',
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'user_id_ces' + me.uniquename,
                            name: 'user_id_ces',
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'project_id_ces' + me.uniquename,
                            name: 'project_id_ces',
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'pt_id_ces' + me.uniquename,
                            name: 'pt_id_ces',
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'absenttype_id_default' + me.uniquename,
                            name: 'absenttype_id_default',
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'hrd_comment_default' + me.uniquename,
                            name: 'hrd_comment_default',
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'employee_id_user_intranet' + me.uniquename,
                            name: 'employee_id_user_intranet',
                        },                        
                        {
                            xtype: 'hiddenfield',
                            id: 'employee_id_hod_intranet' + me.uniquename,
                            name: 'employee_id_hod_intranet',
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'employee_id_cc_intranet' + me.uniquename,
                            name: 'employee_id_cc_intranet',
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
                                    itemId: 'nama',
                                    id: 'name',
                                    name: 'name',
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
                                    fieldLabel: 'Department',
                                    width: 300,
                                    displayField: 'department',
                                    valueField: 'department_id',
                                    action: 'resetdetail',
                                    readOnly: true,
                                    allowBlank: false,
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
                                    fieldLabel: 'Tanggal Masuk',
                                    itemId: 'hire_date' + me.uniquename,
                                    id: 'hire_date' + me.uniquename,
                                    name: 'hire_date',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'From Date',
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
                                    xtype: 'combobox',
                                    name: 'position_id',
                                    fieldLabel: 'Position',
                                    width: 300,
                                    displayField: 'description',
                                    valueField: 'position_id',
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
                                            '<th width="100px"><div class="x-column-header x-column-header-inner">Position</div></th>',
                                            '</tr>',
                                            '<tpl for=".">',
                                            '<tr class="x-boundlist-item">',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
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
                                    fieldLabel: 'Tanggal Berangkat',
                                    itemId: 'start_date' + me.uniquename,
                                    id: 'start_date' + me.uniquename,
                                    name: 'start_date',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: '',
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
                                    fieldLabel: 'Tanggal Kembali',
                                    itemId: 'end_date' + me.uniquename,
                                    id: 'end_date' + me.uniquename,
                                    name: 'end_date',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: '',
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
                            xtype: 'textfield',
                            anchor: '100%',
                            itemId: 'approve_by',
                            id: 'approve_by',
                            name: 'approve_by',
                            fieldLabel: 'Report to',
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
                            xtype: 'textareafield',
                            itemId: 'description' + me.uniquename,
                            id: 'description' + me.uniquename,
                            name: 'description',
                            fieldLabel: 'Keperluan',
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            grow: true,
                            width: '100%',
                        },
                       {
                            xtype: 'statuspdlkcombobox',
                            fieldLabel: 'Status',
                            itemId: 'fd_status' + me.uniquename,
                            id: 'status' + me.uniquename,
                            name: 'status',
                            width: 250,
                            emptyText: 'Select Status Data',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textareafield',
                            itemId: 'hrd_comment+' + me.uniquename,
                            id: 'hrd_comment' + me.uniquename,
                            name: 'hrd_comment',
                            fieldLabel: 'HRD Comment',
                            readOnly: false,
                            allowBlank: true,
                            enforceMaxLength: true,
                            grow: true,
                            width: '100%',
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'fd_sendmail' + me.uniquename,
                            name: 'sendmail',
                            boxLabel: 'Send Email',
                            padding: '0 0 0 0',
                            margin: '0 0 10 0',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: false
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