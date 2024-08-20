Ext.define('Cashier.view.kasbondeptapprove.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.kasbondeptapproveformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 470,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: "_fdkasbondeptapprove",
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
                    id: 'hideparam' + me.uniquename,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kasbondept_id' + me.uniquename,
                    name: 'kasbondept_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kasbon_id' + me.uniquename,
                    name: 'kasbon_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'voucher_id' + me.uniquename,
                    name: 'voucher_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kasbank_id' + me.uniquename,
                    name: 'kasbank_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'approvename' + me.uniquename,
                    name: 'approvename',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'status' + me.uniquename,
                    name: 'status',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'projectname' + me.uniquename,
                    name: 'projectname',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'ptname',
                    name: 'ptname',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'prefixdept' + me.uniquename,
                    name: 'prefixdept',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'other_made_by' + me.uniquename,
                    name: 'other_made_by',
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
                            xtype: 'ptusercombobox',
                            fieldLabel: 'Pt/Company',
                            itemId: 'fd_pt_id' + me.uniquename,
                            id: 'pt_id_b123',
                            name: 'pt_id',
                            width: 350,
                            emptyText: 'Pt / Company',
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype: 'label',
                            forId: 'lblstatus' + me.uniquename,
                            text: 'Status',
                            width: 100,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'label',
                            forId: 'lblstatus',
                            text: '',
                            style: {
                                color: '#ff0000'
                            },
                            itemId: 'fd_lblstatus' + me.uniquename,
                            id: 'lblstatus__b123',
                            name: 'lblstatus',
                            width: 100,
                            allowBlank: false,
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
                            xtype: 'departmentcombobox',
                            fieldLabel: 'Department',
                            itemId: 'fd_department_id' + me.uniquename,
                            id: 'department_id' + me.uniquename,
                            name: 'department_id',
                            width: 350,
                            emptyText: 'Department',
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'CA Date',
                            itemId: 'fd_voucher_date' + me.uniquename,
                            id: 'voucher_date' + me.uniquename,
                            name: 'voucher_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 250,
                            emptyText: 'Manual Input',
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
                            xtype: 'employeehrdcombobox',
                            fieldLabel: 'User for cashbon',
                            itemId: 'fd_made_by' + me.uniquename,
                            id: 'made_by' + me.uniquename,
                            name: 'made_by',
                            width: 350,
                            emptyText: 'Select user for cashbon',
                            matchFieldWidth: false,
                            readOnly: true,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                         {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'CA No.',
                            itemId: 'fd_voucher_no' + me.uniquename,
                            id: 'voucher_no' + me.uniquename,
                            name: 'voucher_no',
                            emptyText: 'Auto Value',
                            width: 250,
                            readOnly: true,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
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
                    items: [
                        {
                            xtype: 'employeehrdcombobox',
                            fieldLabel: 'Approve By',
                            itemId: 'fd_approveby_id' + me.uniquename,
                            id: 'approveby_id' + me.uniquename,
                            name: 'approveby_id',
                            width: 350,
                            emptyText: 'Approve By',
                            readOnly: false,
                            allowBlank: false,
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
                            xtype: 'xmoneyfield',
                            minValue: 0,
                            itemId: 'fs_amount' + me.uniquename,
                            name: 'amount',
                            id: 'amount' + me.uniquename,
                            fieldLabel: 'Amount',
                            emptyText: 'Manual Input',
                            width: 350,
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            readOnly: true,
                            allowBlank: false,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 30,
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Cashback',
                            itemId: 'fd_' + me.uniquename,
                            id: 'amount_kembali' + me.uniquename,
                            name: 'amount_kembali',
                            emptyText: 'Auto Value',
                            width: 250,
                            readOnly: true,
                            allowBlank: false,
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
                            xtype: 'textareafield',
                            itemId: 'fdms_description' + me.uniquename,
                            id: 'description' + me.uniquename,
                            name: 'description',
                            fieldLabel: 'Description',
                            allowBlank: false,
                            enforceMaxLength: true,
                            grow: true,
                            width: 750,
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'tabpanel',
                            itemId: 'kasbondeptapprovetab',
                            name: 'kasbondeptapprovetab',
                            width: 750,
                            height: 200,
                            activeTab: 0,
                            defaults: {layout: 'fit'},
                            items: [
                                {
                                    title: 'DETAIL COA',
                                    xtype: 'kasbondeptapprovegriddetail',
                                    name: 'gridtabkasbondeptapprovedetail',
                                    id: 'gridtabkasbondeptapprovedetail',
                                    readOnly: false,
                                },
                                {
                                    title: 'DETAIL SUB COA',
                                    xtype: 'kasbondeptapprovegridsubdetail',
                                    name: 'gridtabkasbondeptapprovesubdetail',
                                    id: 'gridtabkasbondeptapprovesubdetail',
                                    readOnly: false,
                                },
                                 {
                                    title: 'ATTACHMENTS',
                                    xtype: 'kasbondeptapprovegridsubdetail',
                                    name: 'gridtabkasbondeptapprovesubdetail',
                                    id: 'gridtabkasbondeptapprovesubdetail',
                                    readOnly: false,
                                },
                            ],
                        }
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var me = this;
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                padding: '0 0 0 0',
                layout: {
                    padding: 6,
                    type: 'hbox',
                },
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
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                align: 'right',
                                bodyBorder: false,
                                defaults: {
                                    layout: 'fit'
                                },
                                items: [
                                    {
                                        xtype: 'splitter',
                                        width: '20'
                                    },
                                    {
                                        xtype: 'xmoneyfield',
                                        anchor: '100%',
                                        itemId: 'fd_totaldetail',
                                        id: 'totaldetail' + me.uniquename,
                                        name: 'totaldetail',
                                        fieldLabel: 'Total Detail',
                                        emptyText: 'Auto Value',
                                        width: 240,
                                        value: 0,
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                        enforceMaxLength: true,
                                        readOnly: true,
                                        allowBlank: false,
                                        enableKeyEvents: true,
                                        rowdata: null
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '20'
                                    },
                                    {
                                        xtype: 'xmoneyfield',
                                        anchor: '100%',
                                        itemId: 'fd_balance',
                                        id: 'balance' + me.uniquename,
                                        name: 'balance',
                                        fieldLabel: 'Balance',
                                        emptyText: 'Auto Value',
                                        value: 0,
                                        width: 240,
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                        enforceMaxLength: true,
                                        readOnly: true,
                                        allowBlank: false,
                                        enableKeyEvents: true,
                                        rowdata: null},
                                ]
                            },
                            {xtype: 'tbspacer', height: 5},
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
                                    },
                                ]
                            },
                        ]
                    },
                ]
            }
        ];
        return x;
    }
});

