Ext.define('Cashier.view.bankpositionreport.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.bankpositionreportformdata',
    layout: 'vbox',
    padding: '0 0 0 10',
    bodyStyle: 'background-color:#dfe8f5;',
    border: false,
    uniquename: "_bankpositionreport",
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
                            width: 643,
                            items: [
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    id: 'allcompany' + me.uniquename,
                                    itemId: 'fd_allcompany' + me.uniquename,
                                    name: 'allcompany',
                                    boxLabel: 'All Company',
                                    padding: '0 0 0 0',
                                    margin: '0 0 10 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    // checked: true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'ptusercombobox',
                                    fieldLabel: '',
                                    id: 'frompt' + me.uniquename,
                                    itemId: 'fd_frompt' + me.uniquename,
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
                                    forId: 'labelpt_' + me.uniquename,
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
                            width: 643,
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
                                    forId: 'labelbank' + me.uniquename,
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
                            layout: 'vbox',
                            padding: '0 20 40 10', //(top, right, bottom, left).
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
                            width: '20'
                        },
                        {
                            // Fieldset in Column 
                            xtype: 'fieldset',
                            title: 'Group',
                            collapsible: false,
                            defaults: {anchor: '90%'},
                            layout: 'vbox',
                            padding: '0 10 10 10', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    itemId: 'fd_allgroup' + me.uniquename,
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
                                    width: '10'
                                },
                                {
                                    xtype: 'groupcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_fromgrouptrans' + me.uniquename,
                                    id: 'fromgrouptrans' + me.uniquename,
                                    name: 'fromgrouptrans',
                                    emptyText: '',
                                    width: 200,
                                    readOnly: false,
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
                                    forId: 'labelgroup' + me.uniquename,
                                    text: 'To',
                                    width: 30,
                                    margin: '0 0 0 20'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'groupcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_untilgrouptrans' + me.uniquename,
                                    id: 'untilgrouptrans' + me.uniquename,
                                    name: 'untilgrouptrans',
                                    emptyText: '',
                                    width: 200,
                                    readOnly: false,
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
                            // Fieldset in Column 
                            xtype: 'fieldcontainer',
                            title: '',
                            // collapsible: false,
                            margin: '-5 0 0 0',
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    // Fieldset in Column 
                                    xtype: 'fieldset',
                                    title: 'Detail Account',
                                    collapsible: false,
                                    defaults: {anchor: '100%'},
                                    layout: 'vbox',
                                    width:212,
                                    padding: '0 20 0 10', //(top, right, bottom, left).
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
                                                    margin: '0 30 0 30',
                                                    id: 'radiodetailaccount1' + me.uniquename,
                                                    allowBlank: false,
                                                    checked: true
                                                },
                                                {
                                                    xtype: 'splitter',
                                                    width: '10'
                                                },
                                                {
                                                    boxLabel: 'No',
                                                    name: 'detailaccount',
                                                    inputValue: 'no',
                                                    id: 'radiodetailaccount2' + me.uniquename,
                                                    allowBlank: false
                                                },
                                            ]
                                        },
                                    ]
                                },
                                {
                                // Fieldset in Column 
                                xtype: 'fieldcontainer',
                                title: '',
                                // collapsible: false,
                                defaults: {anchor: '100%'},
                                layout: 'hbox',
                                items: [
                                    {
                                        // Fieldset in Column 
                                        xtype: 'fieldset',
                                        title: 'Prefix',
                                        collapsible: false,                                 
                                        padding: '0 20 0 10', //(top, right, bottom, left).
                                        items: [
                                            {
                                                xtype: 'checkboxfield',
                                                fieldLabel: '',
                                                itemId: 'fd_filterprefix' + me.uniquename,
                                                name: 'filterprefix',
                                                boxLabel: 'Filter Prefix',
                                                padding: '0 0 0 0',
                                                margin: '0 0 0 0',
                                                boxLabelCls: 'x-form-cb-label small',
                                                inputValue: '1',
                                                uncheckedValue: '0',
                                                checked: false
                                            },
                                            {
                                                xtype: 'button',
                                                action: 'prefix',
                                                itemId: 'btnPrefix',
                                                iconCls: '',
                                                text: 'Prefix',
                                                padding: 5,
                                                margin: '0 0 10 18',
                                            },
                                        ]
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '10'
                                    },
                                    {
                                        // Fieldset in Column 
                                        xtype: 'fieldset',
                                        title: 'Bank or Provider',
                                        collapsible: false,
                                        width:100,
                                        padding: '0 0 0 10', //(top, right, bottom, left).
                                        items: [
                                            {
                                                xtype: 'checkboxfield',
                                                fieldLabel: '',
                                                itemId: 'fd_filterbank' + me.uniquename,
                                                name: 'filterbank',
                                                boxLabel: 'Filter Active',
                                                padding: '0 0 0 0',
                                                margin: '0 0 0 0',
                                                boxLabelCls: 'x-form-cb-label small',
                                                inputValue: 1,
                                                uncheckedValue: 0,
                                                checked: false
                                            }
                                        ]
                                    },
                                    ]
                                }
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
                    padding: '0 0 0 250px',
                    items: [
                        {
                            xtype: 'button',
                            action: 'submit',
                            itemId: 'btnSubmit',
                            iconCls: 'icon-print',
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
