Ext.define('Cashier.view.tbank.FormOuttrans', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.tbankformouttrans',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 600,
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
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbank_id',
                    id: 'kasbank_id_qqq',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbankdetail_id',
                    id: 'kasbankdetail_id_qqq',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'department_id',
                    id: 'department_id_qqq',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'coa_id',
                    id: 'coa_qqq',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'accept_date',
                    id: 'accept_date_qqq',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'coa',
                    id: 'coa_qqq',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'coaname',
                    id: 'coaname_qqq',
                },
                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'DETAIL SELECTED CASH ADVANCE',
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Cash Advance No.',
                                    itemId: 'fd_voucher_no',
                                    id: 'voucher_no_qqq',
                                    name: 'voucher_no',
                                    emptyText: 'Auto Value',
                                    width: 300,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '130'
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: 'Amount',
                                    itemId: 'fd_amountcia',
                                    id: 'amount_qqq',
                                    name: 'amount',
                                    emptyText: 'Auto Value',
                                    width: 400,
                                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
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
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Project Name',
                                    itemId: 'fd_projectname',
                                    id: 'projectname_qqq',
                                    name: 'projectname',
                                    emptyText: 'Auto Value',
                                    width: 400,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '30'
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: 'Applied Amount',
                                    itemId: 'fd_apamountcia',
                                    id: 'apamountcia',
                                    name: 'amount',
                                    value: 0,
                                    emptyText: 'Auto Value',
                                    width: 400,
                                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
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
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Pt / Company',
                                    itemId: 'fd_ptname',
                                    id: 'ptname_qqq',
                                    name: 'ptname',
                                    emptyText: 'Auto Value',
                                    width: 400,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '30'
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: 'Remaining Balance',
                                    itemId: 'fd_remainingbal',
                                    id: 'remainingbal_qqq',
                                    name: 'balance',
                                    emptyText: 'Auto Value',
                                    width: 400,
                                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
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
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Department',
                                    itemId: 'fd_department',
                                    id: 'department_f',
                                    name: 'department',
                                    emptyText: 'Auto Value',
                                    width: 400,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '30'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Apply Amount',
                                    itemId: 'fd_applyamount',
                                    id: 'applyamount',
                                    name: 'applyamount',
                                    emptyText: 'Auto Value',
                                    width: 300,
                                    readOnly: false,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'button',
                                    action: 'apmount',
                                    itemId: 'btnApmount',
                                    padding: 3,
                                    width: 70,
                                    iconCls: '',
                                    text: 'Apply'
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
                                    xtype: 'textfield',
                                    fieldLabel: 'Employee Name',
                                    itemId: 'fd_employeename',
                                    id: 'employeename_f',
                                    name: 'made_by',
                                    emptyText: 'Auto Value',
                                    width: 400,
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
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textareafield',
                                    itemId: 'fdms_description',
                                    id: 'description_g',
                                    name: 'description',
                                    fieldLabel: 'Description',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    grow: true,
                                    width: 400,
                                }, 
                                {
                                    xtype: 'splitter',
                                    width: '30'
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: 'Total Amount',
                                    itemId: 'fd_totalamountcia',
                                    id: 'totalamountcia',
                                    name: 'totalamountcia',
                                    value: 0,
                                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    emptyText: 'Auto Value',
                                    width: 400,
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
                    // Fieldset in Column 2
                    xtype: 'fieldset',
                    title: 'CASH ADVANCE LIST',
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'tbankciagrid',
                            itemId: 'fd_tbankciagrid',
                            id: 'tbankciagrid_g',
                            name: 'tbankciagrid',
                            title: 'Cash Advance List',
                            width: '98%',
                            height: 200,
                            padding: '20px 0 0 20px',
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
                    padding: '0 0 0 720',
                    type: 'hbox',
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'ok',
                        itemId: 'btnOk',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Ok'
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

