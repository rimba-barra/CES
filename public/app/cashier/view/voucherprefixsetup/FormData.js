Ext.define('Cashier.view.voucherprefixsetup.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.voucherprefixsetupformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 430,
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
                    name: 'pt_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'project_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'voucherprefix_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'subgl_code',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kelsub_id',
                },
                {  
                    xtype: 'checkboxfield',
                    fieldLabel: '',
                    itemId: 'fd_active',
                    name: 'active',
                    boxLabel: 'Active',
                    padding: '0 0 0 0',
                    margin: '0 0 0 15',
                    boxLabelCls: 'x-form-cb-label small',
                    inputValue: '1',
                    uncheckedValue: '0',
                    checked: true
                },
                {xtype: 'tbspacer', height: 10},
                {
                    xtype: 'projectptallcombobox',
                    fieldLabel: 'Pt/Company',
                    itemId: 'fd_projectpt_id',
                    id: 'projectpt_id',
                    name: 'projectpt_id',
                    width: 300,
                    emptyText: 'Project Company',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
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
                            xtype: 'prefixcombobox',
                            fieldLabel: 'Prefix',
                            itemId: 'fd_prefix_id',
                            id: 'prefix_id',
                            name: 'prefix_id',
                            width: 300,
                            emptyText: 'Select Prefix',
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
                            fieldLabel: '',
                            itemId: 'fd_prefixdesc',
                            id: 'prefixdesc',
                            name: 'prefixdesc',
                            emptyText: 'Prefix Description',
                            width: 450,
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
                            xtype: 'coacombobox',
                            fieldLabel: 'Account Code',
                            itemId: 'fd_coa_id',
                            id: 'coa_id',
                            name: 'coa_id',
                            width: 300,
                            emptyText: 'Select Account Code',
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
                            fieldLabel: '',
                            itemId: 'fd_coaname',
                            id: 'coaname',
                            name: 'coaname',
                            emptyText: 'Account code Description',
                            width: 450,
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
                            fieldLabel: 'Temporary Prefix',
                            itemId: 'fd_temp_prefix',
                            id: 'temp_prefix',
                            name: 'temp_prefix',
                            width: 300,
                            maxLength: 5,
                            emptyText: 'Temporary Prefix',
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
//                        {
//                            xtype: 'fieldcontainer',
//                            fieldLabel: 'Data flow',
//                            defaultType: 'radiofield',
//                            defaults: {
//                                flex: 3
//                            },
//                            layout: 'hbox',
//                            items: [
//                                {
//                                    boxLabel: 'In',
//                                    name: 'in_out',
//                                    inputValue: 'I',
//                                    id: 'radio1',
//                                    allowBlank: false
//                                },
//                                {
//                                    xtype: 'splitter',
//                                    width: '10'
//                                },
//                                {
//                                    boxLabel: 'Out',
//                                    name: 'in_out',
//                                    inputValue: 'O',
//                                    id: 'radio2',
//                                    allowBlank: false
//                                }
//                            ]
//                        },

//Rizal 21 Mei 2019 di hidden sekali create lgsg ngebuat I dan O
                        {
                            xtype: 'combobox',
                            name: 'in_out',
                            fieldLabel: 'Dataflow',
                            queryMode: 'local',
                            allowBlank:false,
                            valueField: 'status',
                            msgTarget: "side",
                            blankText: 'This should not be blank!',
                            displayField: 'description',
                            store: new Ext.data.JsonStore({
                                fields: ['status', 'description'],
                                data: [
                                    {status: 'I', description: 'IN'},
                                    {status: 'O', description: 'OUT'},
                                    {status: 'IO', description: 'IN & OUT'},
                                ]
                            }),
                        },
//                        {
//                            xtype: 'hiddenfield',
//                            name: 'in_out',
//                        },
                        //
                       
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaultType: 'radiofield',
                    fieldLabel: 'Liquid *',
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            boxLabel  : 'Yes',
                            name      : 'is_liquid',
                            inputValue: '1',
                            id        : 'is_liquid1'
                        },
                        {
                            boxLabel  : 'No',
                            name      : 'is_liquid',
                            inputValue: '0',
                            id        : 'is_liquid0',
                            margin    : '0 0 0 15'
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
                            xtype: 'statuscombobox',
                            fieldLabel: 'Payment Type',
                            emptyText: 'Select Bank/Cash',
                            itemId: 'fdms_cash_bank',
                            name: 'cash_bank',
                            allowBlank: false,
                            enforceMaxLength: true,
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
                            xtype: 'bankcombobox',
                            fieldLabel: 'Bank',
                            emptyText: 'Select Bank',
                            itemId: 'fdms_bank_id',
                            name: 'bank_id',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            hidden:true,
                        },
                        {
                            xtype: 'banktypecombobox',
                            fieldLabel: 'Bank Type',
                            emptyText: 'Select Bank Type',
                            itemId: 'fdms_banktype_id',
                            name: 'banktype_id',
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            hidden:true,
                            margin: '0 0 0 15'
                        },
                    ]
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Description',
                    itemId: 'fd_description',
                    id: 'description',
                    name: 'description',
                    width: 20,
                    emptyText: '',
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
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
                            fieldLabel: 'Account Number',
                            itemId: 'fd_no_acc',
                            id: 'no_acc',
                            name: 'no_acc',
                            width: 300,
                            emptyText: '',
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
                    name: 'containerAccounttype',
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'accounttypecombobox',
                            fieldLabel: 'Account Type',
                            itemId: 'fd_account_type_id',
                            id: 'account_type_id',
                            name: 'account_type_id',
                            width: 300,
                            emptyText: 'Select Account Type',
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true
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
                            xtype: 'voucherprefixsetupcombobox',
                            fieldLabel: 'Reference Prefix',
                            itemId: 'fd_reference_id',
                            id: 'reference_id',
                            name: 'reference_id',
                            width: 400,
                            emptyText: '',
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
                            xtype: 'paymentviacombobox',
                            fieldLabel: 'Payment Via',
                            itemId: 'fd_paymentvia_id',
                            id: 'payment_via_id',
                            name: 'payment_via_id',
                            width: 300,
                            emptyText: '',
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            hidden: true
                        },
                    ]
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: '',
                    itemId: 'fd_is_posting',
                    name: 'is_posting',
                    boxLabel: 'Posting',
                    padding: '0 0 0 0',
                    margin: '0 0 0 110',
                    boxLabelCls: 'x-form-cb-label small',
                    inputValue: '1',
                    uncheckedValue: '0',
                    checked: true
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
                            xtype: 'subglcombobox',
                            fieldLabel: 'Default Sub',
                            itemId: 'fd_subgl_id' + me.uniquename,
                            id: 'subgl_id' + me.uniquename,
                            name: 'subgl_id',
                            emptyText: 'Ketik Sub Code...',
                            width: 300,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            queryMode: 'remote',
                            minChars: 2,
                            forceSelection:true,
                            typeAhead:false,
                            listeners:{
                                        
                                keyup: function(field){
                                    var c = 0;
                                       var searchString = field.getValue();

                                       if (searchString) {

                                       this.store.filterBy(function (record, id) {
                                        if( record.get('subdesc').toLowerCase().indexOf(field.getValue()) > -1) { 
                                            return true;
                                            this.store.clearFilter(true);
                                        }
                                        else if (record.get('subcode').toLowerCase().indexOf(field.getValue()) > -1) {
                                            return true;
                                            this.store.clearFilter(true);
                                        }
                                        else if (record.get('code1').toLowerCase().indexOf(field.getValue()) > -1) {
                                            return true;
                                            this.store.clearFilter(true);
                                        }
                                        else if (record.get('code2').toLowerCase().indexOf(field.getValue()) > -1) {
                                            return true;
                                            this.store.clearFilter(true);
                                        }
                                        else {
                                            return false;
                                            this.store.clearFilter(true);
                                        }
                                        });
                                       }

                                },
                                buffer:300,
                            },
                        },
                    ]
                },
                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'Fixed Account',
                    hidden:true,
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'fd_is_fixed',
                            name: 'is_fixed',
                            boxLabel: 'Account Fixed',
                            padding: '0 0 0 0',
                            margin: '0 0 0 15',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: false
                        },
                        {xtype: 'tbspacer', height: 20},
                        {
                            xtype: 'coacombobox',
                            fieldLabel: 'Acc. Fixed Code',
                            itemId: 'fd_fixed_coa_id',
                            id: 'fixed_coa_id',
                            name: 'fixed_coa_id',
                            width: 300,
                            emptyText: 'Select Account Fixed Code',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            readOnly:false,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Fixed Description',
                            itemId: 'fd_fixed_account_desc',
                            id: 'fixed_account_desc',
                            name: 'fixed_account_desc',
                            width: 800,
                            emptyText: '',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            readOnly:false,
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    hidden:true,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            // Fieldset in Column 2
                            xtype: 'fieldset',
                            title: 'Limit Date',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    itemId: 'fd_is_limitdate',
                                    name: 'is_limitdate',
                                    boxLabel: 'Use Limit Date',
                                    padding: '0 0 0 0',
                                    margin: '0 0 0 15',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: true
                                },
                                {xtype: 'tbspacer', height: 20},
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Limit Date',
                                    emptyText: 'Limit Date',
                                    name: 'limitdate',
                                    allowBlank: false,
                                    enableKeyEvents: true,
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    readOnly:false,
                                },
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '180'
                        },
                        {
                            // Fieldset in Column 3
                            xtype: 'fieldset',
                            title: 'Limit Amount',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    itemId: 'fd_is_limitamount',
                                    name: 'is_limitamount',
                                    boxLabel: 'Use Limit Amount',
                                    padding: '0 0 0 0',
                                    margin: '0 0 0 15',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: true
                                },
                                {xtype: 'tbspacer', height: 20},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Min Amount',
                                    itemId: 'fd_limit_min',
                                    id: 'limit_min',
                                    name: 'limit_min',
                                    width: 300,
                                    emptyText: '',
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    readOnly:false,
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Max Amount',
                                    itemId: 'fd_limit_max',
                                    id: 'limit_max',
                                    name: 'limit_max',
                                    width: 300,
                                    emptyText: '',
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    readOnly:false,
                                },
                            ]
                        }
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
                padding: '0 0 0 320',
                layout: {
                    padding: 6,
                    type: 'hbox',
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
            }
        ];
        return x;
    }
});

