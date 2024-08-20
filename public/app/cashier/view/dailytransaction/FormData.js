Ext.define('Cashier.view.dailytransaction.FormData', {
    extend       : 'Ext.form.Panel',
    alias        : 'widget.dailytransactionformdata',
    layout       : 'vbox',
    bodyStyle    : 'background-color:#dfe8f5;',
    id           : 'dailytransactionID',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype : 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'hiddenfield',
                    name : 'hideparam',
                    value: 'default'
                },
                {
                    xtype    : 'panel',
                    layout   : 'vbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border   : false,
                    padding  : '0 0 0 20px',
                    items    : [
                       {
                            xtype     : 'fieldcontainer',
                            fieldLabel: 'PT',
                            layout    : 'hbox',
                            items     : [                               
                                    {
                                        xtype          : 'ptprojectcombobox',
                                        fieldLabel     : '',
                                        emptyText      : 'Select PT',
                                        name           : 'pt_id',
                                        allowBlank     : false,
                                        enableKeyEvents: true
                                    },
                            ]
                        },  
                        {
                            xtype     : 'radiogroup',
                            fieldLabel: 'Data Journal',
                            itemId    : 'datajournal',
                            layout    : 'hbox',
                            items     : [
                                {
                                    boxLabel  : 'Alldata',
                                    xtype     : 'radiofield',
                                    name      : 'journal',
                                    inputValue: '1',
                                    itemId    : 'radiodatajournal1',
                                    checked   : true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '30'
                                },
                                {
                                    boxLabel  : 'Journal Not Balance',
                                    xtype     : 'radiofield',
                                    name      : 'journal',
                                    inputValue: '2',
                                    itemId    : 'radiodatajournal2'
                                }
                            ]
                        },
                        {
                            xtype     : 'radiogroup',
                            fieldLabel: 'Sub Detail',
                            itemId    : 'datasubdetail',
                            layout    : 'hbox',
                            items     : [
                                {
                                    boxLabel  : 'No',
                                    xtype     : 'radiofield',
                                    name      : 'subdetail',
                                    inputValue: '1',
                                    itemId    : 'radiosubdetail1',
                                    checked   : true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '50'
                                },
                                {
                                    boxLabel  : 'Yes',
                                    xtype     : 'radiofield',
                                    name      : 'subdetail',
                                    inputValue: '2',
                                    itemId    : 'radiosubdetail2'
                                }
                            ]
                        }

                    ]
                },
                {
                    xtype    : 'panel',
                    layout   : 'vbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border   : false,
                    padding  : '0 0 0 20px',
                    items    : [
                        {
                            xtype     : 'radiogroup',
                            fieldLabel: 'Base On',
                            itemId    : 'baseon',
                            layout    : 'vbox',
                            items     : [
                                {
                                    xtype : 'fieldcontainer',
                                    layout: 'hbox',
                                    items : [
                                        {
                                            boxLabel  : 'Voucher Date',
                                            xtype     : 'radiofield',
                                            name      : 'baseondata',
                                            inputValue: '1',
                                            itemId    : 'radiobaseon1',
                                            checked   : true
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '55'
                                        },
                                        {
                                            xtype          : 'datefield',
                                            emptyText      : 'From transaction date',
                                            name           : 'dailytrxfromdate',
                                            allowBlank     : true,
                                            enableKeyEvents: true,
                                            format         : 'd-m-Y',
                                            submitFormat   : 'Y-m-d'
                                        },
                                        {
                                            xtype : 'label',
                                            forId : 'lbl1',
                                            text  : 'To',
                                            margin: '2 10 10 10'
                                        },
                                        {
                                            xtype          : 'datefield',
                                            emptyText      : 'Until transaction date',
                                            name           : 'dailytrxuntildate',
                                            allowBlank     : true,
                                            enableKeyEvents: true,
                                            format         : 'd-m-Y',
                                            submitFormat   : 'Y-m-d'
                                        }
                                    ]
                                },
                                {
                                    xtype : 'fieldcontainer',
                                    layout: 'hbox',
                                    items : [
                                        {
                                            boxLabel  : 'Account Code',
                                            xtype     : 'radiofield',
                                            name      : 'baseondata',
                                            inputValue: '2',
                                            itemId    : 'radiobaseon2'
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '54'
                                        },
                                        {
                                            hidden    : true,
                                            xtype     : 'textfield',
                                            fieldLabel: '',
                                            value     : '0',
                                            emptyText : 'Select COA',
                                            name      : 'dailycoa_id',
                                            allowBlank: true,
                                        },
                                        {
                                            hidden    : true,
                                            xtype     : 'textfield',
                                            fieldLabel: '',
                                            emptyText : 'Select COA',
                                            name      : 'namecoa',
                                            value     : 'x',
                                            allowBlank: true,
                                        },
                                        
                                        {
                                            xtype          : 'coacombogrid',
                                            fieldLabel     : '',
                                            emptyText      : 'Select COA',
                                            name           : 'coastart_id',
                                            allowBlank     : true,
                                            enableKeyEvents: true,
                                            forceSelection : true,
                                            typeAhead      : true,
                                            listeners      : {
                                                keyup: function (field) {
                                                    var me           = this;
                                                    var c            = 0;
                                                    var searchString = field.getValue().toLowerCase();
                                                    var store        = field.getPicker().getStore();
                                                    if (searchString) {
                
                                                        store.filterBy(function (record, id) {
                                                            if (record.get('name').toLowerCase().indexOf(searchString) > -1) {
                                                                return true;
                                                                store.clearFilter(true);
                                                            } else if (record.get('coa').indexOf(searchString) > -1) {
                                                                return true;
                                                                store.clearFilter(true);
                                                            } else {
                                                                return false;
                                                                store.clearFilter(true);
                                                            }
                                                        });
                                                    }
                                                },
                                                buffer: 300,
                                            },
                                        },
                                        {
                                            xtype : 'label',
                                            forId : 'lbl1',
                                            text  : 'To',
                                            margin: '2 10 10 10'
                                        },
                                        {
                                            xtype          : 'coacombogrid',
                                            fieldLabel     : '',
                                            emptyText      : 'Select COA',
                                            name           : 'coaend_id',
                                            allowBlank     : true,
                                            enableKeyEvents: true,
                                            typeAhead      : true,
                                            forceSelection : true,
                                            listeners      : {
                                                keyup: function (field) {
                                                    var me           = this;
                                                    var c            = 0;
                                                    var searchString = field.getValue().toLowerCase();
                                                    var store        = field.getPicker().getStore();
                                                    if (searchString) {
                
                                                        store.filterBy(function (record, id) {
                                                            if (record.get('name').toLowerCase().indexOf(searchString) > -1) {
                                                                return true;
                                                                store.clearFilter(true);
                                                            } else if (record.get('coa').indexOf(searchString) > -1) {
                                                                return true;
                                                                store.clearFilter(true);
                                                            } else {
                                                                return false;
                                                                store.clearFilter(true);
                                                            }
                                                        });
                                                    }
                                                },
                                                buffer: 300,
                                            },
                                        },
                                    ]
                                },
                                {
                                    xtype : 'fieldcontainer',
                                    layout: 'hbox',
                                    items : [
                                        {
                                            boxLabel  : 'Voucher Type',
                                            xtype     : 'radiofield',
                                            name      : 'baseondata',
                                            inputValue: '3',
                                            itemId    : 'radiobaseon3'
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '53'
                                        },
                                        {
                                            xtype     : 'prefixcombobox',
                                            fieldLabel: '',
                                            emptyText : 'From Prefix',
                                            name      : 'dailyprefix_id_from',
                                            allowBlank: true,
                                        },
                                        {
                                            xtype : 'label',
                                            forId : 'lbl1',
                                            text  : 'To',
                                            margin: '2 10 10 10'
                                        },
                                        {
                                            xtype     : 'prefixcombobox',
                                            fieldLabel: '',
                                            emptyText : 'Until Prefix',
                                            name      : 'dailyprefix_id_until',
                                            allowBlank: true,
                                        },
                                    ]
                                },
                                {
                                    xtype : 'fieldcontainer',
                                    layout: 'hbox',
                                    items : [
                                        {
                                            xtype: 'splitter',
                                            width: '19'
                                        },
                                        {
                                            xtype : 'label',
                                            forId : 'lbl1',
                                            text  : 'Voucher No',
                                            margin: '2 7 1 10'
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '50'
                                        },
                                        {
                                              //xtype: 'vouchernocombobox',
                                            xtype           : 'journalcombobox',
                                            fieldLabel      : '',
                                            emptyText       : 'From Voucher No',
                                            name            : 'journal_id_from',
                                            allowBlank      : true,
                                            enforceMaxLength: true,
                                            enableKeyEvents : true,
                                            forceSelection  : true,
                                            rowdata         : null,
                        
                                        },
                                        {
                                            xtype : 'label',
                                            forId : 'lbl1',
                                            text  : 'To',
                                            margin: '2 10 10 10'
                                        },
                                        {
                                             // xtype: 'vouchernocombobox',
                                            xtype           : 'journalcombobox',
                                            fieldLabel      : '',
                                            emptyText       : 'Until Voucher No',
                                            name            : 'journal_id_until',
                                            allowBlank      : true,
                                            enforceMaxLength: true,
                                            enableKeyEvents : true,
                                            forceSelection  : true,
                                            rowdata         : null,
                                        },
                                    ]
                                }
                            ]},
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    padding: '0 0 0 20px',
                    items  : [
                        {xtype: 'tbspacer', height: 5, width: 20},
                        {
                            xtype         : 'checkboxfield',
                            itemId        : 'no_addby',
                            name          : 'no_addby',
                            boxLabel      : 'Hide Create By',
                            inputValue    : '1',
                            uncheckedValue: '0',
                        },
                    ]
                },
                {
                    xtype : 'tbspacer',
                    height: 20
                },
                {
                    xtype  : 'panel',
                    layout : 'hbox',
                    border : false,
                    padding: '0 0 0 290px',
                    items  : [
                        {
                            xtype  : 'button',
                            action : 'submit',
                            itemId : 'btnSubmit',
                            iconCls: 'icon-submit',
                            text   : 'Submit',
                            padding: 5,
                        },
                        {
                            xtype  : 'button',
                            action : 'cancel',
                            itemId : 'btnCancel',
                            iconCls: 'icon-cancel',
                            padding: 5,
                            text   : 'Cancel',
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
