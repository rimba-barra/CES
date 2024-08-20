Ext.define('Cashier.view.bankreport.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.bankreportformdata',
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    uniquename:"_bankreport",
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
                    name: 'hideparam',
                    id: 'hideparam'+me.uniquename,
                    value: 'default'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit',
                        padding: '0 0 0 0', //(top, right, bottom, left).
                    },
                    items: [
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            // Fieldset in Column 1
                            xtype: 'fieldset',
                            title: 'Type Trans',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            padding: '0 0 0 10', //(top, right, bottom, left).
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
                                            id: 'typetrans1'+me.uniquename,
                                            allowBlank: false
                                        },
                                        {
                                            boxLabel: 'Out',
                                            name: 'typetrans',
                                            inputValue: 'O',
                                            id: 'typetrans2'+me.uniquename,
                                            allowBlank: false
                                        },
                                        {
                                            boxLabel: 'All',
                                            name: 'typetrans',
                                            inputValue: 'All',
                                            id: 'typetrans3'+me.uniquename,
                                            allowBlank: false,
                                            checked:true,
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
                            title: 'Data Index by',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            padding: '0 0 0 10', //(top, right, bottom, left).
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
                                            xtype: 'fieldcontainer',
                                            fieldLabel: '',
                                            defaultType: 'radiofield',
                                            defaults: {
                                                flex: 3
                                            },
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    boxLabel: 'Voucher No.',
                                                    name: 'dataindexby',
                                                    inputValue: 'voucherno',
                                                    id: 'dataindexby1'+me.uniquename,
                                                    allowBlank: false,
                                                    checked:true,
                                                },
                                                {
                                                    boxLabel: 'Voucher Date',
                                                    name: 'dataindexby',
                                                    inputValue: 'voucherdate',
                                                    id: 'dataindexby2'+me.uniquename,
                                                    allowBlank: false
                                                },
                                                {
                                                    boxLabel: 'Department',
                                                    name: 'dataindexby',
                                                    inputValue: 'department',
                                                    id: 'dataindexby3'+me.uniquename,
                                                    allowBlank: false
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '15'
                                        },
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
                                                    boxLabel: 'Payment Date',
                                                    name: 'dataindexby',
                                                    inputValue: 'paymentdate',
                                                    id: 'dataindexby4'+me.uniquename,
                                                    allowBlank: false
                                                },
                                                {
                                                    boxLabel: 'Cheque / Giro no',
                                                    name: 'dataindexby',
                                                    inputValue: 'chequegirono',
                                                    id: 'dataindexby5'+me.uniquename,
                                                    allowBlank: false
                                                },
                                                {
                                                    boxLabel: 'Amount / Value',
                                                    name: 'dataindexby',
                                                    inputValue: 'amountvalue',
                                                    id: 'dataindexby6'+me.uniquename,
                                                    allowBlank: false
                                                },
                                            ]
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            // Fieldset in Column 1
                            xtype: 'fieldset',
                            title: 'Detail Account',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            padding: '0 100 35 10', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: '',
                                    defaultType: 'radiofield',
                                    defaults: {
                                        flex: 2
                                    },
                                    layout: 'hbox',
                                    padding: '0 0 0 0', //(top, right, bottom, left).
                                    items: [
                                        {
                                            boxLabel: 'Yes',
                                            name: 'detailaccount',
                                            inputValue: 'yes',
                                            id: 'detailaccount1'+me.uniquename,
                                            allowBlank: false,
                                            checked:true,
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '10'
                                        },
                                        {
                                            boxLabel: 'No',
                                            name: 'detailaccount',
                                            inputValue: 'no',
                                            id: 'detailaccount2'+me.uniquename,
                                            allowBlank: false
                                        },
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: '',
                                    defaultType: 'radiofield',
                                    defaults: {
                                        flex: 2
                                    },
                                    layout: 'hbox',
                                    padding: '0 0 0 0', //(top, right, bottom, left).
                                    items: [
                                        {
                                            boxLabel: 'Vers. 1',
                                            name: 'newversion',
                                            inputValue: 'yes',
                                            id: 'newversion1'+me.uniquename,
                                            allowBlank: false,
                                            checked:true
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '10'
                                        },
                                        {
                                            boxLabel: 'Vers. 2',
                                            name: 'newversion',
                                            inputValue: 'no',
                                            id: 'newversion2'+me.uniquename,
                                            allowBlank: false,
                                            checked:false                                            
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            // Fieldset in Column 2
                            xtype: 'fieldset',
                            title: 'Periode',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            padding: '0 10 0 10', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    itemId: 'fd_fromperiode'+me.uniquename,
                                    id: 'fromperiode'+me.uniquename,
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
                                    xtype: 'splitter',
                                    width: '50'
                                },
                                {
                                    xtype: 'label',
                                    forId: 'labelto',
                                    text: 'S/d',
                                    margin: '0 0 0 50',
                                    width: 30,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '50'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    itemId: 'fd_untilperiode'+me.uniquename,
                                    id: 'untilperiode'+me.uniquename,
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
                    margin: '0 0 0 10', //(top, right, bottom, left).
                    items: [
                        {
                            // Fieldset in Column 3
                            xtype: 'fieldset',
                            title: 'Company',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            padding: '0 10 10 10', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'splitter',
                                    width: '50'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    itemId: 'fd_allcompany'+me.uniquename,
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
                                    itemId: 'fd_frompt'+me.uniquename,
                                    id: 'frompt'+me.uniquename,
                                    name: 'frompt',
                                    emptyText: '',
                                    width: 190,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '15'
                                },
                                {
                                    xtype: 'label',
                                    forId: 'labelpt',
                                    text: 'To',
                                    width: 30,
                                    margin: '0 0 0 70'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '15'
                                },
                                {
                                    xtype: 'ptusercombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_untilpt'+me.uniquename,
                                    id: 'untilpt'+me.uniquename,
                                    name: 'untilpt',
                                    emptyText: '',
                                    width: 190,
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
                            // Fieldset in Column 3
                            xtype: 'fieldset',
                            title: 'Department',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            padding: '0 10 10 10', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'splitter',
                                    width: '50'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    itemId: 'fd_alldepartment'+me.uniquename,
                                    name: 'alldepartment',
                                    boxLabel: 'All Department',
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
                                    xtype: 'departmentcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_fromdepartment'+me.uniquename,
                                    id: 'fromdepartment'+me.uniquename,
                                    name: 'fromdepartment',
                                    emptyText: '',
                                    width: 190,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '15'
                                },
                                {
                                    xtype: 'label',
                                    forId: 'labeldept',
                                    text: 'To',
                                    width: 30,
                                    margin: '0 0 0 70'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '15'
                                },
                                {
                                    xtype: 'departmentcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_untildepartment'+me.uniquename,
                                    id: 'untildepartment'+me.uniquename,
                                    name: 'untildepartment',
                                    emptyText: '',
                                    width: 190,
                                    allowBlank: false,
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
                            // Fieldset in Column 3
                            xtype: 'fieldset',
                            title: 'Group',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            padding: '0 60 58 10', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'splitter',
                                    width: '50'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    itemId: 'fd_allgroup'+me.uniquename,
                                    name: 'allgroup',
                                    boxLabel: 'All Group',
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
                                    xtype: 'groupcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_grouptrans'+me.uniquename,
                                    id: 'grouptrans_id'+me.uniquename,
                                    name: 'grouptrans_id',
                                    emptyText: '',
                                    width: 200,
                                    readOnly: false,
                                    allowBlank: false,
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
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    margin: '0 0 0 10', //(top, right, bottom, left).
                    items: [
                        {
                            // Fieldset in Column 3
                            xtype: 'fieldset',
                            title: 'Chart of Account',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'hbox',
                            padding: '0 60 10 10', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'splitter',
                                    width: '50'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    itemId: 'fd_allcoa'+me.uniquename,
                                    name: 'allcoa',
                                    boxLabel: 'All Chart of Account',
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
                                    xtype: 'coarptcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_fromcoa'+me.uniquename,
                                    id: 'fromcoa'+me.uniquename,
                                    name: 'fromcoa',
                                    emptyText: '',
                                    width: 190,
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
                                    xtype: 'label',
                                    forId: 'labelpt_2ddsdss',
                                    text: 'To',
                                    width: 30,
                                    margin: '0 0 0 30'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '15'
                                },
                                {
                                    xtype: 'coarptcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_untilcoa'+me.uniquename,
                                    id: 'untilcoa'+me.uniquename,
                                    name: 'untilcoa',
                                    emptyText: '',
                                    width: 190,
                                    allowBlank: false,
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
                    height: 20
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 300px',
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
