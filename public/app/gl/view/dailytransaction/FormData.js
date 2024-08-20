Ext.define('Gl.view.dailytransaction.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.dailytransactionformdata',
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
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
                    xtype: 'panel',
                    layout: 'vbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,
                    padding: '0 0 0 20px',
                    items: [
                        {
                            xtype: 'radiogroup',
                            fieldLabel: 'Data Journal',
                            itemId: 'datajournal',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'Alldata',
                                    xtype: 'radiofield',
                                    name: 'journal',
                                    inputValue: '1',
                                    itemId: 'radiodatajournal1',
                                    checked:true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '30'
                                },
                                {
                                    boxLabel: 'Before Posting',
                                    xtype: 'radiofield',
                                    name: 'journal',
                                    inputValue: '2',
                                    itemId: 'radiodatajournal2'
                                }
                            ]
                        },
                        {
                            xtype: 'radiogroup',
                            fieldLabel: 'Sub Detail',
                            itemId: 'datasubdetail',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'No',
                                    xtype: 'radiofield',
                                    name: 'subdetail',
                                    inputValue: '1',
                                    itemId: 'radiosubdetail1',
                                    checked:true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '50'
                                },
                                {
                                    boxLabel: 'Yes',
                                    xtype: 'radiofield',
                                    name: 'subdetail',
                                    inputValue: '2',
                                    itemId: 'radiosubdetail2'
                                }
                            ]
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,
                    padding: '0 0 0 20px',
                    items: [
                        {
                            xtype: 'radiogroup',
                            fieldLabel: 'Base On',
                            itemId: 'baseon',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            boxLabel: 'Voucher Date',
                                            xtype: 'radiofield',
                                            name: 'baseondata',
                                            inputValue: '1',
                                            itemId: 'radiobaseon1',
                                            checked:true
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '55'
                                        },
                                        {
                                            xtype: 'datefield',
                                            emptyText: 'From input date',
                                            name: 'dailyinputfromdate',
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            format: 'd-m-Y',
                                            submitFormat: 'Y-m-d'
                                        },
                                        {
                                            xtype: 'label',
                                            forId: 'lbl1',
                                            text: 'To',
                                            margin: '2 10 10 10'
                                        },
                                        {
                                            xtype: 'datefield',
                                            emptyText: 'Until input date',
                                            name: 'dailyinputuntildate',
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            format: 'd-m-Y',
                                            submitFormat: 'Y-m-d'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'splitter',
                                            width: '15'
                                        },
                                        {
                                            xtype: 'label',
                                            forId: 'lbl1',
                                            text: '',
                                            margin: '2 7 1 10'
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '117'
                                        },
                                        {
                                            xtype: 'datefield',
                                            emptyText: 'From transaction date',
                                            name: 'dailytrxfromdate',
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            format: 'd-m-Y',
                                            submitFormat: 'Y-m-d'
                                        },
                                        {
                                            xtype: 'label',
                                            forId: 'lbl1',
                                            text: 'To',
                                            margin: '2 10 10 10'
                                        },
                                        {
                                            xtype: 'datefield',
                                            emptyText: 'Until transaction date',
                                            name: 'dailytrxuntildate',
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            format: 'd-m-Y',
                                            submitFormat: 'Y-m-d'
                                        }

                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            boxLabel: 'Account Code',
                                            xtype: 'radiofield',
                                            name: 'baseondata',
                                            inputValue: '2',
                                            itemId: 'radiobaseon2'
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '50'
                                        },
                                        {
                                            xtype: 'coacombobox',
                                            fieldLabel: '',
                                            emptyText: 'Select COA',
                                            name: 'dailycoa_id',
                                            allowBlank: true,
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '32'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: '',
                                            emptyText: 'Name of COA',
                                            name: 'namecoa',
                                            width: '400',
                                            allowBlank: true,
                                        },
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            boxLabel: 'Voucher Type',
                                            xtype: 'radiofield',
                                            name: 'baseondata',
                                            inputValue: '3',
                                            itemId: 'radiobaseon3'
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '50'
                                        },
                                        {
                                            xtype: 'prefixcombobox',
                                            fieldLabel: '',
                                            emptyText: 'From Prefix',
                                            name: 'dailyprefix_id_from',
                                            allowBlank: true,
                                        },
                                        {
                                            xtype: 'label',
                                            forId: 'lbl1',
                                            text: 'To',
                                            margin: '2 10 10 10'
                                        },
                                        {
                                            xtype: 'prefixcombobox',
                                            fieldLabel: '',
                                            emptyText: 'Until Prefix',
                                            name: 'dailyprefix_id_until',
                                            allowBlank: true,
                                        },
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'splitter',
                                            width: '15'
                                        },
                                        {
                                            xtype: 'label',
                                            forId: 'lbl1',
                                            text: 'Voucher No',
                                            margin: '2 7 1 10'
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '50'
                                        },
                                        {
                                            xtype: 'vouchernocombobox',
                                            fieldLabel: '',
                                            emptyText: 'From Voucher No',
                                            name: 'journal_id_from',
                                            allowBlank: true,
                                        },
                                        {
                                            xtype: 'label',
                                            forId: 'lbl1',
                                            text: 'To',
                                            margin: '2 10 10 10'
                                        },
                                        {
                                            xtype: 'vouchernocombobox',
                                            fieldLabel: '',
                                            emptyText: 'Until Voucher No',
                                            name: 'journal_id_until',
                                            allowBlank: true,
                                        },
                                    ]
                                }
                            ]},
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
                    padding: '0 0 0 380px',
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
