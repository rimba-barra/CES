Ext.define('Cashier.view.chequeclearing.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.chequeclearingformdata',
    layout: 'vbox',
    padding: '0 0 0 10',
    bodyStyle: 'background-color:#dfe8f5;',
    border: false,
    frame: true,
    autoScroll: true,
    uniquename: "_chequeclearing",
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'hiddenfield',
                    id: 'hideparam' + me.uniquename,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'splitter',
                    width: '20'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 1200,
                    items: [
                        {
                            // Fieldset in Column 1
                            xtype: 'fieldset',
                            title: 'Company',
                            layout: 'hbox',
                            padding: '10 10 10 10', //(top, right, bottom, left).
                            width: 640,
                            items: [
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    itemId: 'fd_allcompany' + me.uniquename,
                                    name: 'allcompany',
                                    boxLabel: 'All Company',
                                    padding: '0 0 0 0',
                                    margin: '0 0 10 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'ptusercombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_frompt' + me.uniquename,
                                    id: 'frompt' + me.uniquename,
                                    name: 'frompt',
                                    emptyText: '',
                                    width: 200,
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
                                    xtype: 'label',
                                    forId: 'labelpt' + me.uniquename,
                                    text: 'To',
                                    width: 30,
                                    margin: '0 0 0 20'
                                },
                                {
                                    xtype: 'ptusercombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_untilpt' + me.uniquename,
                                    id: 'untilpt' + me.uniquename,
                                    name: 'untilpt',
                                    emptyText: '',
                                    width: 200,
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
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 1200,
                    items: [
                        {
                            // Fieldset in Column 1
                            xtype: 'fieldset',
                            title: 'Bank',
                            layout: 'hbox',
                            padding: '10 0 10 10', //(top, right, bottom, left).
                            width: 640,
                            items: [
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    itemId: 'fd_allbank' + me.uniquename,
                                    name: 'allbank',
                                    boxLabel: 'All Bank',
                                    padding: '0 0 0 0',
                                    margin: '0 0 10 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '40'
                                },
                                {
                                    xtype: 'voucherprefixbankcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_frombank' + me.uniquename,
                                    id: 'frombank' + me.uniquename,
                                    name: 'frombank',
                                    emptyText: '',
                                    width: 200,
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
                                    xtype: 'label',
                                    forId: 'labelpts' + me.uniquename,
                                    text: 'To',
                                    width: 30,
                                    margin: '0 0 0 20'
                                },
                                {
                                    xtype: 'voucherprefixbankcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_untilbank' + me.uniquename,
                                    id: 'untilbank' + me.uniquename,
                                    name: 'untilbank',
                                    emptyText: '',
                                    width: 200,
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
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 1200,
                    items: [
                        {
                            // Fieldset in Column 
                            xtype: 'fieldset',
                            title: 'Periode',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'hbox',
                            padding: '20 20 62 10', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    itemId: 'fd_fromperiode' + me.uniquename,
                                    id: 'fromperiode' + me.uniquename,
                                    name: 'fromperiode',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'From Date',
                                    width: 150,
                                    readOnly: false,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'label',
                                    forId: 'labelto',
                                    text: 'S/d',
                                    margin: '0 0 0 30',
                                    width: 30,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    itemId: 'fd_untilperiode' + me.uniquename,
                                    id: 'untilperiode' + me.uniquename,
                                    name: 'untilperiode',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'Until Date',
                                    width: 150,
                                    readOnly: false,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            // Fieldset in Column 1
                            xtype: 'fieldset',
                            title: 'Type Trans',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            padding: '0 10 25 10', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: '',
                                    defaultType: 'radiofield',
                                    defaults: {
                                        flex: 3
                                    },
                                    layout: 'vbox',
                                    items: [
                                        {
                                            boxLabel: 'In',
                                            name: 'typetrans',
                                            inputValue: 'I',
                                            id: 'typetrans1' + me.uniquename,
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '10'
                                        },
                                        {
                                            boxLabel: 'Out',
                                            name: 'typetrans',
                                            inputValue: 'O',
                                            id: 'typetrans2' + me.uniquename,
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '10'
                                        },
                                        {
                                            boxLabel: 'All',
                                            name: 'typetrans',
                                            inputValue: 'all',
                                            id: 'typetrans3' + me.uniquename,
                                            allowBlank: false,
                                            checked: true,
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '30'
                        },
                        {
                            // Fieldset in Column 1
                            xtype: 'fieldset',
                            title: 'Status',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            padding: '0 20 0 10', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: '',
                                    defaultType: 'radiofield',
                                    defaults: {
                                        flex: 4
                                    },
                                    layout: 'vbox',
                                    items: [
                                        {
                                            boxLabel: 'Posting',
                                            name: 'statusdata',
                                            inputValue: 'posting',
                                            id: 'statusdata1' + me.uniquename,
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '5'
                                        },
                                        {
                                            boxLabel: 'No Posting',
                                            name: 'statusdata',
                                            inputValue: 'noposting',
                                            id: 'statusdata2' + me.uniquename,
                                            allowBlank: false
                                        },                                      
                                        {
                                            xtype: 'splitter',
                                            width: '5'
                                        },
                                        {
                                            boxLabel: 'All',
                                            name: 'statusdata',
                                            inputValue: 'all',
                                            id: 'statusdata5' + me.uniquename,
                                            allowBlank: false,
                                            checked: true,
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
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 1200,
                    items: [
                        {
                            // Fieldset in Column 1
                            xtype: 'fieldset',
                            title: 'Status Transaction',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            padding: '0 20 0 10', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: '',
                                    defaultType: 'radiofield',
                                    defaults: {
                                        flex: 4
                                    },
                                    layout: 'vbox',
                                    items: [
                                        {
                                            boxLabel: 'Paid',
                                            name: 'chequegirostatus',
                                            inputValue: 'PAID',
                                            id: 'chequegirostatus1' + me.uniquename,
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '5'
                                        },
                                        {
                                            boxLabel: 'Processed',
                                            name: 'chequegirostatus',
                                            inputValue: 'PROCESSED',
                                            id: 'chequegirostatus2' + me.uniquename,
                                            allowBlank: false
                                        },                                                                            
                                        {
                                            xtype: 'splitter',
                                            width: '5'
                                        },
                                        {
                                            boxLabel: 'Not Processed',
                                            name: 'chequegirostatus',
                                            inputValue: 'UNPROCESSED',
                                            id: 'chequegirostatus3' + me.uniquename,
                                            allowBlank: false
                                        }, 
                                         {
                                            xtype: 'splitter',
                                            width: '5'
                                        },
                                        {
                                            boxLabel: 'Reject',
                                            name: 'chequegirostatus',
                                            inputValue: 'REJECTED',
                                            id: 'chequegirostatus4' + me.uniquename,
                                            allowBlank: false
                                        },
                                        {
                                            boxLabel: 'All',
                                            name: 'chequegirostatus',
                                            inputValue: 'all',
                                            id: 'chequegirostatus5' + me.uniquename,
                                            allowBlank: false,
                                            checked: true,
                                        },
                                      
                                    ]
                                },
                                 {
                            // Fieldset in Column 1
                            xtype: 'fieldset',
                            title: 'Report File',
                            layout: 'hbox',
                            padding: '10 0 15 10', //(top, right, bottom, left).
                            width: 650,
                            items: [
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'reportfilecombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_reportfile' + me.uniquename,
                                    id: 'reportfile',
                                    name: 'reportfile',
                                    emptyText: '',
                                    width: 200,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '5'
                                },
                                {
                                    xtype: 'button',
                                    action: 'settingdetailcoa',
                                    itemId: 'btnSettingdetailcoa',
                                    iconCls: '',
                                    text: 'Setting detail coa',
                                    padding: 5,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '5'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    itemId: 'fd_allvoucher' + me.uniquename,
                                    name: 'allvoucher',
                                    boxLabel: 'All Voucher',
                                    padding: '0 0 0 0',
                                    margin: '0 0 10 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: true
                                },
                            ]
                        },
                            ]
                        },
                        
                    ]
                },
//                {
//                    xtype: 'fieldcontainer',
//                    layout: 'hbox',
//                    bodyBorder: false,
//                    defaults: {
//                        layout: 'fit'
//                    },
//                    width: 1200,
//                    items: [
//                        {
//                            // Fieldset in Column 1
//                            xtype: 'fieldset',
//                            title: 'Report File',
//                            layout: 'hbox',
//                            padding: '10 0 15 10', //(top, right, bottom, left).
//                            width: 650,
//                            items: [
//                                {
//                                    xtype: 'splitter',
//                                    width: '10'
//                                },
//                                {
//                                    xtype: 'reportfilecombobox',
//                                    fieldLabel: '',
//                                    itemId: 'fd_reportfile' + me.uniquename,
//                                    id: 'reportfile',
//                                    name: 'reportfile',
//                                    emptyText: '',
//                                    width: 200,
//                                    allowBlank: true,
//                                    enforceMaxLength: true,
//                                    enableKeyEvents: true,
//                                    rowdata: null
//                                },
//                                {
//                                    xtype: 'splitter',
//                                    width: '5'
//                                },
//                                {
//                                    xtype: 'button',
//                                    action: 'settingdetailcoa',
//                                    itemId: 'btnSettingdetailcoa',
//                                    iconCls: '',
//                                    text: 'Setting detail coa',
//                                    padding: 5,
//                                },
//                                {
//                                    xtype: 'splitter',
//                                    width: '5'
//                                },
//                                {
//                                    xtype: 'checkboxfield',
//                                    fieldLabel: '',
//                                    itemId: 'fd_allvoucher' + me.uniquename,
//                                    name: 'allvoucher',
//                                    boxLabel: 'All Voucher',
//                                    padding: '0 0 0 0',
//                                    margin: '0 0 10 0',
//                                    boxLabelCls: 'x-form-cb-label small',
//                                    inputValue: '1',
//                                    uncheckedValue: '0',
//                                    checked: true
//                                },
//                            ]
//                        },
//                    ]
//                },
                {
                    xtype: 'splitter',
                    width: '10'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 1200,
                    items: [
                        {
                            // Fieldset in Column 1
                            xtype: 'fieldset',
                            title: 'Range Approval',
                            layout: 'hbox',
                            padding: '10 0 15 10', //(top, right, bottom, left).
                            width: 650,
                            items: [
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    itemId: 'fd_allrangeapproval' + me.uniquename,
                                    name: 'allrangeapproval',
                                    boxLabel: 'All Range Approval',
                                    padding: '0 0 0 0',
                                    margin: '0 0 10 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'rangeapprovecombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_rangeapproval' + me.uniquename,
                                    id: 'rangeapproval',
                                    name: 'rangeapproval',
                                    emptyText: '',
                                    width: 200,
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
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 250px',
                    items: [
                        {
                            xtype: 'button',
                            action: 'submit',
                            itemId: 'btnSubmit',
                            iconCls: 'icon-submit',
                            text: 'Submit',
                            padding: 5,
                        },
                        {
                            xtype: 'button',
                            action: 'cancel',
                            itemId: 'btnCancel',
                            iconCls: 'icon-cancel',
                            padding: 5,
                            text: 'Cancel',
                            handler: function () {
                                this.up('window').close();
                            }
                        }
                    ]
                }
            ],
        });
        me.callParent(arguments);
    },
});
