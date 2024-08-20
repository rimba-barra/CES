Ext.define('Cashier.view.cashaging.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.cashagingformdata',
    layout: 'vbox',
    padding: '0 0 0 10',
    bodyStyle: 'background-color:#dfe8f5;',
    uniquename: "_cashagingformdata",
    border: false,
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
                    layout: 'vbox',
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
                            width: 672,
                            items: [
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    itemId: 'fd_allcompany' + me.uniquename,
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
                                    // Fieldset in Column 1
                                    xtype: 'fieldset',
                                    title: 'Periode',
                                    layout: 'hbox',
                                    padding: '10 10 10 10', //(top, right, bottom, left).
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: '',
                                            itemId: 'fd_periodedate' + me.uniquename,
                                            id: 'periodedate' + me.uniquename,
                                            name: 'periodedate',
                                            format: 'd-m-Y',
                                            submitFormat: 'Y-m-d',
                                            emptyText: 'Periode Date',
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
                                    // Fieldset in Column 1
                                    xtype: 'fieldset',
                                    title: 'Format',
                                    layout: 'hbox',
                                    padding: '10 10 10 10', //(top, right, bottom, left).
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
                                                    boxLabel: 'Detail',
                                                    name: 'format',
                                                    inputValue: 'detail',
                                                    id: 'format1' + me.uniquename,
                                                    checked: true,
                                                    allowBlank: false,
                                                },
                                                {
                                                    xtype: 'splitter',
                                                    width: '10'
                                                },
                                                {
                                                    boxLabel: 'Rekap',
                                                    name: 'format',
                                                    inputValue: 'rekap',
                                                    id: 'format2' + me.uniquename,
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
                                    title: 'Department / Project',
                                    layout: 'hbox',
                                    padding: '10 10 10 10', //(top, right, bottom, left).
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
                                                    boxLabel: 'Department',
                                                    name: 'departmentproject',
                                                    inputValue: 'department',
                                                    id: 'departmentproject1' + me.uniquename,
                                                    allowBlank: false,
                                                    checked: true
                                                },
                                                {
                                                    xtype: 'splitter',
                                                    width: '10'
                                                },
                                                {
                                                    boxLabel: 'Project',
                                                    name: 'departmentproject',
                                                    inputValue: 'project',
                                                    id: 'departmentproject2' + me.uniquename,
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
                                    title: 'Cashbon type',
                                    layout: 'hbox',
                                    padding: '10 10 10 10', //(top, right, bottom, left).
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
                                                    boxLabel: 'General',
                                                    name: 'cashbontype',
                                                    inputValue: 'general',
                                                    id: 'cashbontype1' + me.uniquename,
                                                    allowBlank: false,
                                                    checked: true
                                                },
                                                {
                                                    xtype: 'splitter',
                                                    width: '10'
                                                },
                                                {
                                                    boxLabel: 'Project',
                                                    name: 'cashbontype',
                                                    inputValue: 'project',
                                                    id: 'cashbontype2' + me.uniquename,
                                                    allowBlank: false
                                                },
                                            ]
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
                            title: 'Group',
                            layout: 'hbox',
                            padding: '10 30 20 10', //(top, right, bottom, left).
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
                                            boxLabel: 'Department',
                                            name: 'grouptype',
                                            inputValue: 'department',
                                            id: 'department1' + me.uniquename,
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '10'
                                        },
                                        {
                                            boxLabel: 'Staff',
                                            name: 'grouptype',
                                            inputValue: 'staff',
                                            id: 'department2' + me.uniquename,
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '10'
                                        },
                                        {
                                            boxLabel: 'Company / Project',
                                            name: 'grouptype',
                                            inputValue: 'companyproject',
                                            id: 'department3' + me.uniquename,
                                            allowBlank: false,
                                            checked: true
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
                            // Fieldset in Column 3
                            xtype: 'fieldset',
                            title: 'Department',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'hbox',
                            padding: '10 5 12 10', //(top, right, bottom, left).
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
                                    width: '10'
                                },
                                {
                                    xtype: 'departmentcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_fromdepartment' + me.uniquename,
                                    id: 'fromdepartment' + me.uniquename,
                                    name: 'fromdepartment',
                                    emptyText: '',
                                    width: 100,
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
                                    xtype: 'label',
                                    forId: 'labeldept' + me.uniquename,
                                    text: 'To',
                                    width: 10,
                                    margin: '0 0 0 0'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '5'
                                },
                                {
                                    xtype: 'departmentcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_untildepartment' + me.uniquename,
                                    id: 'untildepartment' + me.uniquename,
                                    name: 'untildepartment',
                                    emptyText: '',
                                    width: 100,
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
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'Type Data',
                    layout: 'hbox',
                    padding: '10 10 10 10', //(top, right, bottom, left).
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
                                    boxLabel: 'Cashbon Cash',
                                    name: 'typedata',
                                    inputValue: 'CASHBON',
                                    id: 'typedata1' + me.uniquename,
                                    allowBlank: false,
                                    checked: true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    boxLabel: 'Cashbon Bank',
                                    name: 'typedata',
                                    inputValue: 'GIRO',
                                    id: 'typedata2' + me.uniquename,
                                    allowBlank: false
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
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 1200,
                    items: [
                        {
                            // Fieldset in Column 3
                            xtype: 'fieldset',
                            title: 'Project',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'hbox',
                            padding: '10 100 12 10', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    itemId: 'fd_allproject' + me.uniquename,
                                    name: 'allproject',
                                    boxLabel: 'All Project',
                                    padding: '0 0 0 0',
                                    margin: '0 0 10 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '60'
                                },
                                {
                                    xtype: 'projectcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_fromproject' + me.uniquename,
                                    id: 'fromfromproject' + me.uniquename,
                                    name: 'fromproject',
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
                                    xtype: 'label',
                                    forId: 'labelproject' + me.uniquename,
                                    text: 'To',
                                    width: 10,
                                    margin: '0 0 0 0'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'projectcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_untilfromproject' + me.uniquename,
                                    id: 'untilfromproject' + me.uniquename,
                                    name: 'untilproject',
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
