Ext.define('Cashier.view.printvoucher.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.printvoucherformdata',
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    uniquename: '_rprintvoucher',
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
                    // Fieldset in Column 3
                    xtype: 'fieldset',
                    title: 'Company',
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'hbox',
                    width: 490,
                    padding: '0 0 0 0', //(top, right, bottom, left).
                    items: [
                        {
                            xtype: 'splitter',
                            width: '50'
                        },
                        {
                            xtype: 'ptusercombobox',
                            fieldLabel: '',
                            itemId: 'fd_frompt' + me.uniquename,
                            id: 'frompt' + me.uniquename,
                            name: 'frompt',
                            emptyText: '',
                            width: 190,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'label',
                            forId: 'labelpt' + me.uniquename,
                            text: 'To',
                            width: 20,
                            margin: '0 0 0 20'
                        },
                        {
                            xtype: 'ptusercombobox',
                            fieldLabel: '',
                            itemId: 'fd_untilpt' + me.uniquename,
                            id: 'untilpt' + me.uniquename,
                            name: 'untilpt',
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
                            title: 'Selection by',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            padding: '0 0 0 0', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: '',
                                    defaultType: 'radiofield',
                                    allowBlank: false,
                                    defaults: {
                                        flex: 3
                                    },
                                    layout: 'vbox',
                                    items: [
                                        {
                                            boxLabel: 'Receive Date',
                                            name: 'selectionby',
                                            inputValue: 'receivedate',
                                            id: 'radio1' + me.uniquename,
                                            allowBlank: false
                                        },
                                        {
                                            boxLabel: 'Voucher Date',
                                            name: 'selectionby',
                                            inputValue: 'voucherdate',
                                            id: 'radio2' + me.uniquename,
                                            allowBlank: false
                                        },
                                        {
                                            boxLabel: 'Voucher No.',
                                            name: 'selectionby',
                                            inputValue: 'voucherno',
                                            id: 'radio3' + me.uniquename,
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
                            padding: '0 0 0 0', //(top, right, bottom, left).
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
                            // Fieldset in Column 3
                            xtype: 'fieldset',
                            title: 'Voucher No.',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            padding: '0 0 0 0', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'voucherkasbankcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_fromvoucherno' + me.uniquename,
                                    id: 'fromvoucherno' + me.uniquename,
                                    name: 'fromvoucherno',
                                    emptyText: '',
                                    width: 200,
                                    allowBlank: true,
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
                                    forId: 'labelvoucherno' + me.uniquename,
                                    text: 'To',
                                    width: 30,
                                    margin: '0 0 0 50'

                                },
                                {
                                    xtype: 'splitter',
                                    width: '50'
                                },
                                {
                                    xtype: 'voucherkasbankcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_untilvoucherno' + me.uniquename,
                                    id: 'untilvoucherno' + me.uniquename,
                                    name: 'untilvoucherno',
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
                    height: 20
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 180px',
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
