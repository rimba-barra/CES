Ext.define('Cashier.view.journal.ChequeGrid', {
    extend: 'Cashier.library.template.view.GridDS2Browse',
    alias: 'widget.voucherchequegrid',
    storeConfig: {
        id: 'IDselectedChequeStore',
        idProperty: 'cheque_id',
        extraParams: {
            mode_read: 'chequelist'
        }
    },
    simpleSelect: true,
    height: 300,
    bindPrefixName: 'Voucher',
    newButtonLabel: 'New Cheque',
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
                    dataIndex: 'bank_bank_name',
                    hideable: false,
                    text: 'Bank'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'cheque_no',
                    hideable: false,
                    text: 'No. Cheque'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'amount',
                    hideable: false,
                    emptyText: 0,
                    text: 'Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'datecolumn',
                    width: 100,
                    dataIndex: 'issued_date',
                    hideable: false,
                    text: 'Issued Date'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'status',
                    hideable: false,
                    text: 'Status'
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
                        hidden: true,
                        margin: '0 5 0 0',
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
                    xtype: 'textfield',
                    itemId: 'fsms_name',
                    name: 'cheque_no',
                    fieldLabel: 'No. Cheque',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'combobox',
                    name: 'status',
                    fieldLabel: 'Status ',
                    queryMode: 'local',
                    valueField: 'status',
                    forceSelection: true,
                    displayField: 'description',
                    store: new Ext.data.JsonStore({
                        fields: ['status', 'description'],
                        data: [
                            {status: '1', description: 'New'},
                            {status: '2', description: 'Cleared'},
                            {status: '3', description: 'Issued'},
                        ]
                    }),
                },
                {
                    xtype: 'combobox',
                    name: 'bank_name',
                    fieldLabel: 'Bank',
                    displayField: 'bank_name',
                    valueField: 'bank_id',
                    queryMode: 'local',
                    dataBinder:'bank',
                },
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
                    dataBinder:'pt',
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
                    xtype: 'datefield',
                    fieldLabel: 'Issued Date Start',
                    name: 'issued_date_start',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Issued Date End',
                    name: 'issued_date_end',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                },
        ];
        return x;
    }
});