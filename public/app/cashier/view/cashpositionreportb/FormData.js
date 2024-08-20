Ext.define('Cashier.view.cashpositionreportb.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.cashpositionreportbformdata',
    layout: 'vbox',
    padding: '0 0 0 10',
    bodyStyle: 'background-color:#dfe8f5;',
    border: false,
    uniquename: "_cashpositionreportb",
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
                            width: 710,
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
                                    // checked: true
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
                            title: 'Option Prefix Cash',
                            layout: 'hbox',
                            padding: '10 0 15 10', //(top, right, bottom, left).
                            width: 300,
                            items: [
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'voucherprefixcashcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_prefixcash' + me.uniquename,
                                    id: 'prefixcash' + me.uniquename,
                                    name: 'prefixcash',
                                    emptyText: '',
                                    width: 250,
                                    dynamicdata: 1,
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
                                    padding: '10 0 10 10', //(top, right, bottom, left).
                                    width: 400,
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
                                            itemId: 'fd_grouptrans_id' + me.uniquename,
                                            id: 'grouptrans_id' + me.uniquename,
                                            name: 'grouptrans_id',
                                            emptyText: '',
                                            width: 250,
                                            allowBlank: true,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            rowdata: null
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
                            // Fieldset in Column 
                            xtype: 'fieldset',
                            title: 'Periode',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'hbox',
                            padding: '20 20 40 10', //(top, right, bottom, left).
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
                            padding: '10 50 50 10', //(top, right, bottom, left).
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
                                            checked: true
                                        },
                                    ]
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
                            title: 'Back Date',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            padding: '10 4 43 10', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    itemId: 'fd_backdate' + me.uniquename,
                                    name: 'backdate',
                                    boxLabel: 'Backdate',
                                    padding: '0 0 0 0',
                                    margin: '0 0 10 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: false
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
                            title: 'Option Format',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            padding: '10 50 0 10', //(top, right, bottom, left).
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
                                            boxLabel: 'Detail Cash',
                                            name: 'optionformat',
                                            inputValue: 'detailcash',
                                            id: 'optionformat1' + me.uniquename,
                                            allowBlank: false,
                                            checked: true
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '32'
                                        },
                                        {
                                            boxLabel: 'Summary',
                                            name: 'optionformat',
                                            inputValue: 'summary',
                                            id: 'optionformat2' + me.uniquename,
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '32'
                                        },
                                        {
                                            boxLabel: 'Summary All',
                                            name: 'optionformat',
                                            inputValue: 'summaryall',
                                            id: 'optionformat3' + me.uniquename,
                                            allowBlank: false
                                        },
                                    ]
                                },{
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Beginning Balance',
                                    defaultType: 'radiofield',
                                    labelWidth: '75%',
                                    id: 'beginningbalanceoptions',
                                    layout: 'hbox',
                                    margin: '10 0 10 0',
                                    items: [
                                        {
                                            boxLabel: 'Yes',
                                            name: 'is_begbal',
                                            inputValue: '1',
                                            id: 'is_begbal1' + me.uniquename,
                                            allowBlank: false,
                                            margin: '0 0 0 10'
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '53',
                                            margin: '0 0 0 10'
                                        },
                                        {
                                            boxLabel: 'No',
                                            name: 'is_begbal',
                                            inputValue: '0',
                                            id: 'is_begbal0' + me.uniquename,
                                            allowBlank: false,
                                            checked: true
                                        }
                                    ]
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
                            title: 'Setup',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            padding: '5 230 10 10', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    itemId: 'fd_includecashbon' + me.uniquename,
                                    name: 'includecashbon',
                                    boxLabel: 'Include Cashbon',
                                    padding: '0 0 0 0',
                                    margin: '0 0 10 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: true
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    itemId: 'fd_calculateallcashbon' + me.uniquename,
                                    name: 'calculateallcashbon',
                                    boxLabel: 'Calculate All Cashbon',
                                    padding: '0 0 0 0',
                                    margin: '0 0 10 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: true
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    itemId: 'fd_showdetalcashbon' + me.uniquename,
                                    name: 'showdetalcashbon',
                                    boxLabel: 'Show detail Cashbon',
                                    padding: '0 0 0 0',
                                    margin: '0 0 10 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: true
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    itemId: 'fd_showdetalloan' + me.uniquename,
                                    name: 'showdetalloan',
                                    boxLabel: 'Show detail Loan',
                                    padding: '0 0 0 0',
                                    margin: '0 0 10 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: false
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
                    padding: '0 0 0 270px',
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
