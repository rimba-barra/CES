Ext.define('Cashier.view.voucherbyvendor.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.voucherbyvendorformdata',
    layout: 'vbox',
    padding: '0 0 0 10',
    bodyStyle: 'background-color:#dfe8f5;',
    border: false,
    uniqeuname: "_voucherbyvendorformdata",
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
                    id: 'hideparam' + me.uniqeuname,
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
                                    itemId: 'fd_allcompany' + me.uniqeuname,
                                    name: 'allcompany',
                                    boxLabel: 'All Company',
                                    padding: '0 10 0 0',
                                    margin: '0 0 10 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '55'
                                },
                                {
                                    xtype: 'ptusercombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_frompt' + me.uniqeuname,
                                    id: 'frompt' + me.uniqeuname,
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
                                    forId: 'labelpt' + me.uniqeuname,
                                    text: 'To',
                                    width: 30,
                                    margin: '0 0 0 20'
                                },
                                {
                                    xtype: 'ptusercombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_untilpt' + me.uniqeuname,
                                    id: 'untilpt' + me.uniqeuname,
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
                            title: 'Vendor',
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
                                    itemId: 'fd_allvendor' + me.uniqeuname,
                                    name: 'allvendor',
                                    boxLabel: 'All Vendor',
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
                                    xtype: 'vendorcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_fromvendor' + me.uniqeuname,
                                    id: 'fromvendor' + me.uniqeuname,
                                    name: 'fromvendor',
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
                                    forId: 'labelpts' + me.uniqeuname,
                                    text: 'To',
                                    width: 30,
                                    margin: '0 0 0 20'
                                },
                                {
                                    xtype: 'vendorcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_untilvendor' + me.uniqeuname,
                                    id: 'untilvendor' + me.uniqeuname,
                                    name: 'untilvendor',
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
                            title: 'Prefix',
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
                                    itemId: 'fd_allprefix' + me.uniqeuname,
                                    name: 'allprefix',
                                    boxLabel: 'All Prefix',
                                    padding: '0 0 0 0',
                                    margin: '0 0 10 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '70'
                                },
                                {
                                    xtype: 'prefixreportcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_fromprefix' + me.uniqeuname,
                                    id: 'fromprefix' + me.uniqeuname,
                                    name: 'fromprefix',
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
                                    forId: 'labelprefix' + me.uniqeuname,
                                    text: 'To',
                                    width: 30,
                                    margin: '0 0 0 20'
                                },
                                {
                                    xtype: 'prefixreportcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_untilprefix' + me.uniqeuname,
                                    id: 'untilprefix' + me.uniqeuname,
                                    name: 'untilprefix',
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
                            title: 'Type Trans',
                            layout: 'hbox',
                            padding: '30 10 50 10', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: '',
                                    defaultType: 'radiofield',
                                    defaults: {
                                        flex: 3
                                    },
                                    layout: 'hbox',
                                    items: [
                                        {
                                            boxLabel: 'All',
                                            name: 'typetrans',
                                            inputValue: 'all',
                                            id: 'typetrans1' + me.uniqeuname,
                                            allowBlank: false,
                                            checked:true,
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '10'
                                        },
                                        {
                                            boxLabel: 'Cash',
                                            name: 'typetrans',
                                            inputValue: 'KAS',
                                            id: 'typetrans2' + me.uniqeuname,
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '10'
                                        },
                                        {
                                            boxLabel: 'Bank',
                                            name: 'typetrans',
                                            inputValue: 'BANK',
                                            id: 'typetrans3' + me.uniqeuname,
                                            allowBlank: false
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
                            title: 'Group report by',
                            layout: 'hbox',
                            padding: '30 10 50 10', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: '',
                                    defaultType: 'radiofield',
                                    defaults: {
                                        flex: 3
                                    },
                                    layout: 'hbox',
                                    items: [
                                        {
                                            boxLabel: 'Vendor',
                                            name: 'groupreportby',
                                            inputValue: 'vendor',
                                            id: 'groupreportby1' + me.uniqeuname,
                                            allowBlank: false,
                                            checked:true,
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '10'
                                        },
                                        {
                                            boxLabel: 'Date',
                                            name: 'groupreportby',
                                            inputValue: 'date',
                                            id: 'groupreportby2' + me.uniqeuname,
                                            allowBlank: false
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
                            title: 'Data flow type',
                            layout: 'hbox',
                            padding: '30 10 50 10', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: '',
                                    defaultType: 'radiofield',
                                    defaults: {
                                        flex: 3
                                    },
                                    layout: 'hbox',
                                    items: [
                                        {
                                            boxLabel: 'All',
                                            name: 'dataflowby',
                                            inputValue: 'all',
                                            id: 'dataflowby1' + me.uniqeuname,
                                            allowBlank: false,
                                            checked:true,
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '10'
                                        },
                                        {
                                            boxLabel: 'In',
                                            name: 'dataflowby',
                                            inputValue: 'I',
                                            id: 'dataflowby2' + me.uniqeuname,
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '10'
                                        },
                                        {
                                            boxLabel: 'Out',
                                            name: 'dataflowby',
                                            inputValue: 'O',
                                            id: 'dataflowby3' + me.uniqeuname,
                                            allowBlank: false
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
                            padding: '10 10 10 10', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    itemId: 'fd_fromperiode' + me.uniqeuname,
                                    id: 'fromperiode' + me.uniqeuname,
                                    name: 'fromperiode',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'From Date',
                                    width: 100,
                                    readOnly: false,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '5'
                                },
                                {
                                    xtype: 'label',
                                    forId: 'labelto',
                                    text: 'S/d',
                                    margin: '0 0 0 30',
                                    width: 10,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '5'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    itemId: 'fd_untilperiode' + me.uniqeuname,
                                    id: 'untilperiode' + me.uniqeuname,
                                    name: 'untilperiode',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'Until Date',
                                    width: 100,
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
