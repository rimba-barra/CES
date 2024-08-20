Ext.define('Cashier.view.reportbankpaymentvoucher.SelecteddataGrid', {
    extend     : 'Cashier.library.template.view.GridDS2Browse',
    alias      : 'widget.reportbankpaymentvoucherselecteddatagrid',
    storeConfig: {
        id         : 'IDselectedCustomerStore',
        idProperty : 'cheque_id',
        extraParams: {
            mode_read: 'reportlist'
        }
    },
    simpleSelect  : true,
    height        : 300,
    bindPrefixName: 'Reportbankpaymentvoucher',
    newButtonLabel: 'New Customer',
    initComponent : function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig : {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            defaults: {
                xtype: 'gridcolumn',
                width: 11
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 90,
                    dataIndex: 'cheque_no',
                    hideable : false,
                    text     : 'Giro No'
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 100,
                    dataIndex: 'giro_date',
                    hideable : false,
                    text     : 'Giro Date'
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 250,
                    dataIndex: 'description',
                    hideable : false,
                    text     : 'Keterangan'
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 200,
                    dataIndex: 'Penerima',
                    hideable : false,
                    text     : 'Penerima'
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 100,
                    dataIndex: 'amount',
                    hideable : false,
                    text     : 'Amount',
                    renderer : Ext.util.Format.numberRenderer('0,000.00'),
                    emptyText: 0,
                },

                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;

        var dockedItems = [
             /*  {
                xtype      : 'pagingtoolbar',
                dock       : 'bottom',
                width      : 360,
                displayInfo: true,
                store      : this.getStore()
            }, */
            {
                xtype : 'toolbar',
                dock  : 'top',
                height: 28,
                items : [
                    {
                        xtype   : 'button',
                        action  : 'select',
                        disabled: true,
                            //hidden: true,
                        margin : '0 5 0 0',
                        iconCls: 'icon-approve',
                        text   : "Pick and Print"
                    },
                   {
                        xtype  : 'button',
                        action : 'cancel',
                        margin : '0 5 0 0',
                        iconCls: 'icon-cancel',
                        text   : 'Cancel',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return dockedItems;
    },
    getFormSearch: function () {

        var cbf = new Cashier.template.ComboBoxFields();

        var x = [
            {
                xtype           : 'combobox',
                name            : 'pt_pt_id',
                fieldLabel      : 'Company',
                displayField    : 'name',
                valueField      : 'pt_id',
                readOnly        : false,
                allowBlank      : true,
                enforceMaxLength: true,
                enableKeyEvents : true,
                rowdata         : null,
                forceSelection  : false,
                typeAhead       : false,
                dataBinder      : 'pt',
                id              : 'ptArId',
                listeners       : {
                    keyup: function (field) {
                        var c            = 0;
                        var searchString = field.getValue();

                        if (searchString) {

                            this.store.filterBy(function (record, id) {

                                if (record.get('name').toLowerCase().indexOf(field.getValue()) > -1) {
                                    return true;
                                    this.store.clearFilter(true);
                                }

                                else {
                                    return false;
                                    this.store.clearFilter(true);
                                }
                            });
                        }

                    },
                    buffer: 300,
                },
            },            
        ];
        return x;
    } 
});