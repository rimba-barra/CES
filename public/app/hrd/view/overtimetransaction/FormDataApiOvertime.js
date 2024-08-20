Ext.define('Hrd.view.overtimetransaction.FormDataApiOvertime', {
    alias: 'widget.overtimeformdataapiovertime',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    uniquename: "_overtimeformdataapiovertime",
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
                            id: 'lembur_id' + me.uniquename,
                            name: 'lembur_id',
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
                            id: 'employee_id_user_api' + me.uniquename,
                            name: 'employee_id_user_api',
                        },                        
                        {
                            xtype: 'hiddenfield',
                            id: 'employee_id_hod_api' + me.uniquename,
                            name: 'employee_id_hod_api',
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'employee_id_cc_api' + me.uniquename,
                            name: 'employee_id_cc_api',
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
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    itemId: 'department',
                                    id: 'department',
                                    name: 'department',
                                    fieldLabel: 'Department',
                                    emptyText: 'Auto Value',
                                    width: 300,
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    allowBlank: true,
                                    enableKeyEvents: true,
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
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    itemId: 'position',
                                    id: 'position',
                                    name: 'position',
                                    fieldLabel: 'Position',
                                    emptyText: 'Auto Value',
                                    width: 300,
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    allowBlank: true,
                                    enableKeyEvents: true,
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
                                    fieldLabel: 'Overtime In',
                                    itemId: 'lembur_dari' + me.uniquename,
                                    id: 'lembur_dari' + me.uniquename,
                                    name: 'lembur_dari',   
                                    format: 'd-m-Y g:i:s',
                                    submitFormat: 'Y-m-d g:i:s',
                                    emptyText: '',
                                    width: 240,
                                    readOnly: true,
                                    allowBlank: true,                                   
                                },
                                {
                                    xtype: 'splitter',
                                    width: '190'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Overtime Out',
                                    itemId: 'lembur_sampai' + me.uniquename,
                                    id: 'lembur_sampai' + me.uniquename,
                                    name: 'lembur_sampai',  
                                    format: 'd-m-Y g:i:s',
                                    submitFormat: 'Y-m-d g:i:s',
                                    emptyText: '',
                                    width: 240,
                                    readOnly: true,
                                    allowBlank: true,                                   
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
                            xtype: 'textfield',
                            anchor: '100%',
                            itemId: 'statusovertime',
                            id: 'statusovertime',
                            name: 'statusovertime',
                            fieldLabel: 'Status Data',
                            emptyText: 'Auto Value',
                            width: 300,
                            readOnly: true,
                            allowBlank: true,
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            itemId: 'overtimetype',
                            id: 'overtimetype',
                            name: 'overtimetype',
                            fieldLabel: 'Overtime Type',
                            emptyText: 'Auto Value',
                            width: 300,
                            readOnly: true,
                            allowBlank: true,
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
                    /*
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    */
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