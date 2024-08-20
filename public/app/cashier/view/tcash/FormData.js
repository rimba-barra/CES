Ext.define('Cashier.view.tcash.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.tcashformdata',
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
                    name: 'hideparam',
                    id: 'hideparam_c',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'coa_id',
                    id: 'coa_id_rrr',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbank_id',
                    id: 'kasbank_id_c',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'project_id',
                    id: 'project_id_aswq',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'prefix_id',
                    id: 'prefix_id_eeee',
                },
                {xtype: 'tbspacer', height: 10},
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
                            itemId: 'fd_pt_id_qq',
                            id: 'pt_id_qq',
                            name: 'pt_id',
                            width: 560,
                            emptyText: 'Pt / Company',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'label',
                            forId: 'lblstatus_iii',
                            text: 'Status',
                            width: 80,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'label',
                            forId: 'lblstatus',
                            text: 'OPEN',
                            style: {
                                color: '#ff0000'
                            },
                            itemId: 'lblstatus_iii',
                            id: 'lblstatus_iiii',
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
                            xtype: 'datefield',
                            fieldLabel: 'Accept Date',
                            itemId: 'fd_accept_date',
                            id: 'accept_date_qq',
                            name: 'accept_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 300,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Transaction No.',
                            itemId: 'fd_transno',
                            id: 'transno_c',
                            name: 'transno',
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
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Data flow',
                            defaultType: 'radiofield',
                            defaults: {
                                flex: 3
                            },
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'IN TRANS',
                                    name: 'dataflow',
                                    inputValue: 'I',
                                    id: 'radio1_qq',
                                    allowBlank: false
                                },
                                 {
                            xtype: 'splitter',
                            width: '10'
                        },
                                {
                                    boxLabel: 'OUT TRANS',
                                    name: 'dataflow',
                                    inputValue: 'O',
                                    id: 'radio2_qq',
                                    allowBlank: false
                                }
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
                    items: [
                        {
                            xtype: 'deptprefixcombobox',
                            fieldLabel: 'Departement',
                            itemId: 'fd_department_id',
                            id: 'department_id_c',
                            name: 'department_id',
                            emptyText: '',
                            width: 560,
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
                            xtype: 'voucherprefixcombobox',
                            fieldLabel: 'Prefix',
                            itemId: 'fd_voucherprefix_id',
                            id: 'voucherprefix_id_qq',
                            name: 'voucherprefix_id',
                            emptyText: '',
                            width: 300,
                            allowBlank: false,
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
                            fieldLabel: 'Voucher No.',
                            itemId: 'fd_voucher_no',
                            id: 'voucher_no_c',
                            name: 'voucher_no',
                            emptyText: 'Auto Generate',
                            width: 200,
                            readOnly: true,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Date',
                            itemId: 'fd_kasbank_date',
                            id: 'kasbank_date_c',
                            name: 'kasbank_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'Date',
                            width: 230,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                {xtype: 'tbspacer', height: 10},
                {
                    xtype: 'checkboxfield',
                    fieldLabel: '',
                    itemId: 'fd_kasbon_paid',
                    id: 'kasbon_paid_qq',
                    name: 'kasbon_paid',
                    boxLabel: 'Pelunasan Cashbon (Cash in Advance)',
                    padding: '0 0 0 0',
                    margin: '0 0 0 105',
                    boxLabelCls: 'x-form-cb-label small',
                    inputValue: '1',
                    uncheckedValue: '0',
                    checked: false
                },
                {xtype: 'tbspacer', height: 10},
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
                            anchor: '100%',
                            itemId: 'fd_amount_wsqadd',
                            id: 'amount_c',
                            name: 'amount',
                            fieldLabel: 'Amount',   
                            emptyText: 'Manual Input',
                            value: 0, 
                            width: 300,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: false,
                            allowBlank: false,                            
                            enableKeyEvents: true,
                            rowdata: null
                        },  
                        {
                            xtype: 'splitter',
                            width: '50'
                        },
                        {
                            xtype: 'groupcombobox',
                            fieldLabel: 'Group Trans',
                            itemId: 'fd_grouptrans_id',
                            id: 'grouptrans_id_eeee',
                            name: 'grouptrans_id',
                            emptyText: '',
                            width: 400,
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
                            fieldLabel: 'Account Code',
                            itemId: 'fd_coa',
                            id: 'coa_c',
                            name: 'coa',
                            emptyText: 'Auto Value',
                            width: 300,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_coaname',
                            id: 'coaname_c',
                            name: 'coaname',
                            emptyText: 'Auto Value',
                            width: 400,
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
                            xtype: 'textareafield',
                            itemId: 'fdms_description',
                            id: 'description_c',
                            name: 'description',
                            fieldLabel: 'Description',
                            allowBlank: true,
                            enforceMaxLength: true,
                            grow: true,
                            width: 750,
                        },
                    ]
                },
                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'FOR CASHBON',
                    collapsible: false,
                    defaults: {anchor: '100%'},
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
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Cashbon Date',
                                    itemId: 'fd_cashbon_date',
                                    id: 'cashbon_date_eeee',
                                    name: 'cashbon_date',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    readOnly: true,
                                    width: 300,
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
                                    xtype: 'cashbonstatuscombobox',
                                    fieldLabel: 'Cashbon Paid',
                                    itemId: 'fd_cashbon_paid',
                                    id: 'cashbon_paid_c',
                                    name: 'cashbon_paid',
                                    emptyText: '',
                                    width: 300,
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
                                    xtype: 'employeecombobox',
                                    fieldLabel: 'Create by',
                                    itemId: 'fd_cashbon_create_by',
                                    id: 'cashbon_create_by_eeee',
                                    name: 'cashbon_create_by',
                                    emptyText: '',
                                    width: 300,
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
                                    xtype: 'projectptallcombobox',
                                    fieldLabel: 'For Project',
                                    itemId: 'fd_cashbon_project_id',
                                    id: 'cashbon_project_id_c',
                                    name: 'cashbon_project_id',
                                    emptyText: 'Select Project or Input Manual',
                                    width: 300,
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
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'FOR COA DETAIL',
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'tcashcoadetailgrid',
                            itemId: 'fd_tcashcoadetailgrid',
                            id: 'tcashcoadetailgrid_c',
                            name: 'tcashcoadetailgrid',
                            title: 'Coa Detail',
                            width: '98%',
                            height: 200,
                            padding: '20px 0 0 20px',
                            enableKeyEvents: true,
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
                                        itemId: 'fd_totalheader_eeee',
                                        id: 'totalheader',
                                        name: 'totalheader',
                                        fieldLabel: 'Total Header',   
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
                                        itemId: 'fd_totaldetail_eeeee',
                                        id: 'totaldetail',
                                        name: 'totaldetail',
                                        fieldLabel: 'Total Detail Coa',   
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
                                        rowdata: null
                                    },  
                                    
                                    {
                                        xtype: 'splitter',
                                        width: '20'
                                    },
                                     {
                                        xtype: 'xmoneyfield',                         
                                        anchor: '100%',
                                        itemId: 'fd_balance_eeee',
                                        id: 'balance',
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
                                        rowdata: null
                                    },  
                                    
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
                                        action: 'createvendor',
                                        itemId: 'btnCreateVendor',
                                        padding: 5,
                                        width: 100,
                                        iconCls: 'icon-plus',
                                        text: 'Input Vendor'
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '550'
                                    },
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

