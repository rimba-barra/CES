Ext.define('Cashier.view.vdrequest.KasbonGrid', {
    extend: 'Cashier.library.template.view.GridDS2Browse',
    alias: 'widget.vdrequestkasbongrid',
    storeConfig: {
        id: 'IDselectedKasbonStore',
        idProperty: 'kasbon_klaim_id',
        extraParams: {
            mode_read: 'kasbonklaimlist'
        }
    },
    simpleSelect: true,
    height: 300,
    bindPrefixName: 'Vdrequest',
    newButtonLabel: 'New Commision',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
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
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'voucher_date_f',
                    hideable: false,
                    text: 'Date'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'voucher_no',
                    hideable: false,
                    text: 'CA No'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'department',
                    hideable: false,
                    text: 'Department'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'amount',
                    hideable: false,
                    text: 'Amount',
                    align: 'right',
                    renderer: Ext.util.Format.numberRenderer('0,000.00')
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'amount_bayar',
                    hideable: false,
                    text: 'Amount Paid',
                    align: 'right',
                    renderer: Ext.util.Format.numberRenderer('0,000.00')
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'amount_selisih',
                    hideable: false,
                    text: 'Amount Balance',
                    align: 'right',
                    renderer: Ext.util.Format.numberRenderer('0,000.00')
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'remainingkasbon',
                    hideable: false,
                    text: 'Amount Remaining',
                    align: 'right',
                    renderer: Ext.util.Format.numberRenderer('0,000.00')
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'amount_kembali',
                    hideable: false,
                    align: 'right',
                    text: 'Amount Cashback'
                },
                {
                    xtype: 'gridcolumn',
                    width: 250,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;

        var dockedItems = [
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'select',
                        disabled: true,
                        //hidden: true,
                        margin: '0 5 0 0',
                        iconCls: 'icon-approve',
                        text: "Pick and Close"
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
                xtype: 'combobox',
                name: 'pt_pt_id',
                fieldLabel: 'Company',
                displayField: 'name',
                valueField: 'pt_id',
                readOnly: false,
                allowBlank: true,
                enforceMaxLength: true,
                enableKeyEvents: true,
                rowdata: null,
                forceSelection: false,
                typeAhead: false,
                dataBinder: 'pt',
                id: 'ptCmsId',
                listeners: {
                    keyup: function (field) {
                        var c = 0;
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
            {
                xtype: 'textfield',
                itemId: 'fskasbon_no',
                name: 'cashbon_number',
                fieldLabel: 'Kasbon No',
                enforceMaxLength: true,
                maxLength: 50
            },
            {
                xtype: 'textfield',
                itemId: 'fskasbondescription',
                name: 'description',
                fieldLabel: 'Description',
                enforceMaxLength: true,
            }
            
        ];
        return x;
    }
});