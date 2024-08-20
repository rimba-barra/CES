Ext.define('Cashier.view.loanreport.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.loanreportformdata',
    layout: 'vbox',
    padding: '0 0 0 10',
    bodyStyle: 'background-color:#dfe8f5;',
    border: false,
    uniquename: "_loanreportformdata",
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
                                    width: '20'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    itemId: 'fd_allcompany'+me.uniquename,
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
                                    width: '45'
                                },
                                {
                                    xtype: 'ptusercombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_frompt'+me.uniquename,
                                    id: 'frompt'+me.uniquename,
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
                                    forId: 'labelpt'+me.uniquename,
                                    text: 'To',
                                    width: 30,
                                    margin: '0 0 0 20'
                                },
                                {
                                    xtype: 'ptusercombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_untilpt'+me.uniquename,
                                    id: 'untilpt_wusa',
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
                                    width: '40'
                                },
                                {
                                    xtype: 'departmentcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_fromdepartment'+me.uniquename,
                                    id: 'department'+me.uniquename,
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
                                    forId: 'labelpt'+me.uniquename,
                                    text: 'To',
                                    width: 30,
                                    margin: '0 0 0 20'
                                },
                                {
                                    xtype: 'departmentcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_untildepartment'+me.uniquename,
                                    id: 'untildepartment'+me.uniquename,
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
                            title: 'Loaner',
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
                                    itemId: 'fd_alllaoner'+me.uniquename,
                                    name: 'alllaoner',
                                    boxLabel: 'All Loaner',
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
                                    xtype: 'loanercombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_fromloaner'+me.uniquename,
                                    id: 'fromloaner'+me.uniquename,
                                    name: 'fromloaner',
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
                                    forId: 'labelpt'+me.uniquename,
                                    text: 'To',
                                    width: 30,
                                    margin: '0 0 0 20'
                                },
                                {
                                    xtype: 'loanercombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_untilloaner'+me.uniquename,
                                    id: 'untilloaner'+me.uniquename,
                                    name: 'untilloaner',
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
                                    itemId: 'fd_allprefix'+me.uniquename,
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
                                    itemId: 'fd_fromprefix'+me.uniquename,
                                    id: 'fromprefix'+me.uniquename,
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
                                    forId: 'labelpt'+me.uniquename,
                                    text: 'To',
                                    width: 30,
                                    margin: '0 0 0 20'
                                },
                                {
                                    xtype: 'prefixreportcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_untilprefix',
                                    id: 'untilprefix'+me.uniquename,
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
                            // Fieldset in Column 
                            xtype: 'fieldset',
                            title: 'Periode',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'hbox',
                            padding: '20 20 62 10', //(top, right, bottom, left).
                             width: 640,
                            items: [
                                 {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    itemId: 'fd_allperiode'+me.uniquename,
                                    name: 'allperiode',
                                    boxLabel: 'All Periode',
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
