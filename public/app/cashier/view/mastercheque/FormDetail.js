Ext.define('Cashier.view.mastercheque.FormDetail', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.chequeformdetail',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
    id: 'chequedetailformdataID',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'chequedetail_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'cheque_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbank_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'cheque_type'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'cheque_no',
                            fieldLabel: 'No. Cheque',
                            enforceMaxLength: true,
                            readOnly: true,
                            allowBlank: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 16,
                            anchor: '-5',
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'ID Voucher',
                            name: 'vid',
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'button',
                            action: 'checkvoucher',
                            itemId: 'btnSave',
                            padding: 5,
                            width: 100, iconCls: 'icon-save',
                            text: 'Add Voucher'
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'button',
                            action: 'destroy',
                            itemId: 'btnDelete',
                            disabled: true,
                            padding: 5,
                            width: 100, iconCls: 'icon-delete',
                            text: 'Del Voucher'
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
                    width: 200,
                    items: [
                        {
                            xtype: 'datefield',
                            name: 'issued_date',
                            fieldLabel: 'Issued Date',
                            readOnly: true,
                            format: 'd-m-Y',
//                            listener: function (value, metaData, record, row, col, store, gridView) {
//                                console.log(value);
//                                console.log(metaData);
//                                console.log(record);
//                                var cair_date = moment(record.get('issued_date')).format("DD-MM-YYYY");
//
//                                if (cair_date == "01-01-1900" || !cair_date) {
//                                    return '';
//                                }
//                                else {
//                                    var dt = new Date(cair_date);
//                                    return cair_date;
//                                }
//
//
//                            },
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'button',
                            action: 'changedate',
                            itemId: 'btndate',
                            padding: 5,
                            width: 100, iconCls: 'icon-edit',
                            text: 'Change Date'
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'xmoneyfield',
                            name: 'amount',
                            fieldLabel: 'Total Amount',
                            readOnly: true,
                            fieldStyle: 'background-color:#eee;background-image: none;text-align:right;align:right'
                        }

                    ]
                },
                  {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Description',
                            name: 'description',
                            allowBlank: true,
                            width: 380,
                            height: 50,
//                           
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                       
                       
                        {
                            xtype: 'vendorcombobox',
                            fieldLabel: 'Recipient',
                            name: 'recipient',
                            width: 350,
                            emptyText: 'Ketik / Cari Vendor...',
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            queryMode: 'remote',
                            minChars: 1,
                            rowdata: null,
                            forceSelection: true,
                            typeAhead: true,
                            listeners: {
                                keyup: function (field) {
                                    var c = 0;
                                    var searchString = field.getValue();
                                    if (searchString.length > 0) {

                                        this.store.filterBy(function (record, id) {
                                            if (record.get('vendorname').toLowerCase().indexOf(field.getValue()) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else if (record.get('vendorcode').toLowerCase().indexOf(field.getValue()) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else if (record.get('address').toLowerCase().indexOf(field.getValue()) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else {
                                                return false;
                                                this.store.clearFilter(true);
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
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'detailchequegrid',
                            closable: false,
                            name: 'detailchequegrid',
                            scrollable: 'horizontal',
                            flex: 1
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Histori              ',
                            collapsible: true,
                            //collapsed: true,
                            id: 'fsetTADA',
                            width: '100%',
                            defaults: {anchor: '50%'},
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'chequehistorygrid',
                                    closable: false,
                                    name: 'chequehistorygrid',
                                    scrollable: 'horizontal',
                                    flex: 1
                                }
                            ]
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    type: 'hbox'
                },
                items: [
//                    {
//                        xtype: 'button',
//                        action: 'save',
//                        itemId: 'btnSave',
//                        padding: 5,
//                        width: 75, iconCls: 'icon-save',
//                        text: 'Save'
//                    },
                    {
                        xtype: 'button',
                        action: 'print',
                        itemId: 'btnPrintCheque',             
                        padding: 5,
                        width: 105,
                        iconCls: 'icon-print',
                        text: 'Print'
                    },
                    {
                        xtype: 'tbspacer',
                        flex: 1
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Close',
                      /*  handler: function () {
                            this.up('window').close();
                        }
                    */
                    }
                ]
            }
        ];
        return x;
    },
});

