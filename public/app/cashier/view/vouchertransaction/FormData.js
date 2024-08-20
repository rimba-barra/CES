Ext.define('Cashier.view.vouchertransaction.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.vouchertransactionformdata',
    layout: 'vbox',
    padding: '0 0 0 10',
    bodyStyle: 'background-color:#dfe8f5;',
    border: false,
    uniquename: '_fvouchertransaction',
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
                    id: 'hideparam' + me.uniquename,
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
                                    xtype: 'ptreportcombobox',
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
                                    xtype: 'ptreportcombobox',
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
                                    width: '65'
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
                            title: 'Department',
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
                                    itemId: 'fd_alldepartment' + me.uniquename,
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
                                    width: '40'
                                },
                                {
                                    xtype: 'departmentcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_fromdepartment' + me.uniquename,
                                    id: 'fromdepartment' + me.uniquename,
                                    name: 'fromdepartment',
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
                                    xtype: 'departmentcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_untildepartment' + me.uniquename,
                                    id: 'untildepartment' + me.uniquename,
                                    name: 'untildepartment',
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
                                            checked: true,
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
                            title: 'Type Flow',
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
                                            checked: true,
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
                            // Fieldset in Column 1
                            xtype: 'fieldset',
                            title: 'Group By',
                            layout: 'hbox',
                            padding: '30 10 50 10', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: '',
                                    defaultType: 'radiofield',
                                    defaults: {
                                        flex: 4
                                    },
                                    layout: 'hbox',
                                    items: [
                                        {
                                            boxLabel: 'List',
                                            name: 'groupby',
                                            inputValue: 'list',
                                            id: 'groupby1' + me.uniqeuname,
                                            allowBlank: false,
                                            checked: true,
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '10'
                                        },
                                        {
                                            boxLabel: 'Dept',
                                            name: 'groupby',
                                            inputValue: 'dept',
                                            id: 'groupby2' + me.uniqeuname,
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '10'
                                        },
                                        {
                                            boxLabel: 'Vendor',
                                            name: 'groupby',
                                            inputValue: 'vendor',
                                            id: 'groupby3' + me.uniqeuname,
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '10'
                                        },
                                        {
                                            boxLabel: 'Date',
                                            name: 'groupby',
                                            inputValue: 'date',
                                            id: 'dataflowby4' + me.uniqeuname,
                                            allowBlank: false
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
                            width: '10'
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'fd_detailcoa' + me.uniquename,
                            name: 'detailcoa',
                            boxLabel: 'With detail coa',
                            padding: '0 0 0 0',
                            margin: '0 0 10 0',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: false
                        },
                        {
                            xtype: 'splitter',
                            width: '180'
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            bodyStyle: 'background-color:#dfe8f5;',
                            border: false,
                            padding: '10 100 30 50', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'button',
                                    action: 'submit',
                                    itemId: 'btnSubmit',
                                    iconCls: 'icon-submit',
                                    text: 'Submit',
                                    padding: 20,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'button',
                                    action: 'cancel',
                                    itemId: 'btnCancel',
                                    iconCls: 'icon-cancel',
                                    padding: 20,
                                    text: 'Cancel',
                                    handler: function () {
                                        this.up('window').close();
                                    }
                                }
                            ]
                        }
                    ]
                },
            ],
        });
        me.callParent(arguments);
    },
});
