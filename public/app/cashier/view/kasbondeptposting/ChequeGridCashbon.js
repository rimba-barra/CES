Ext.define('Cashier.view.kasbondeptposting.ChequeGridCashbon', {
    extend: 'Cashier.library.template.view.GridDS2Browse',
    alias: 'widget.cashbonchequegrid',
    storeConfig: {
        id: 'IDselectedChequeStore',
        idProperty: 'cheque_id',
        extraParams: {
            mode_read: 'chequelist'
        }
    },
    id: 'browseChequeGrid',
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
                    width: 250,
                    dataIndex: 'bank_bank_name',
                    hideable: false,
                    text: 'Bank'
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'cheque_no',
                    hideable: false,
                    text: 'No. Cheque'
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'amount',
                    hideable: false,
                    emptyText: 0,
                    text: 'Amount',
                    align: 'right',
                    style: 'text-align:left',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'datecolumn',
                    width: 100,
                    dataIndex: 'issued_date',
                    hideable: false,
                    text: 'Issued Date',
                    renderer: function (value, metaData, record, row, col, store, gridView) {
                        var tempdate;
                        if (record.get('issued_date')) {
                            var cair_date = moment(record.get('issued_date')).format("DD-MM-YYYY");
                        } else {
                            var cair_date = null;
                        }
                        var now = moment(new Date()).format("DD-MM-YYYY");

                        if (cair_date == "01-01-1900" || !cair_date) {
                            return '';
                        }
                        else {
                            var dt = new Date(cair_date);
                            return cair_date;
                        }


                    },
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'status',
                    hideable: false,
                    text: 'Status'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'pt_name',
                    hideable: false,
                    text: 'Company'
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
                        action: 'createchequein',
                        disabled: true,
                        hidden: true,
                        margin: '0 5 0 0',
                        text: "Add New Cheque In",
                        iconCls: 'icon-new',
                    },
                    {
                        xtype: 'button',
                        action: 'createchequeout',
                        disabled: true,
                        hidden: true,
                        margin: '0 5 0 0',
                        text: "Add New Cheque Out",
                        iconCls: 'icon-new',
                    },
                    {
                        xtype: 'button',
                        action: 'select',
                        disabled: false,
                        hidden: false,
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
                        {status: 'New', description: 'New'},
                        {status: 'Cleared', description: 'Cleared'},
                        {status: 'Issued', description: 'Issued'},
                    ]
                }),
            },
            {

                xtype: 'voucherprefixbankcombobox',
                    name: 'voucherprefix_voucherprefix_id',
                    displayField:'prefix',
                    valueField:'voucherprefix_id',
                    fieldLabel: 'Bank',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
            },
            {

                xtype:'textfield',
                name:'pt_pt_id',
                id:'ptid',
                enforceMaxLength: true,
                rowdata:null,
                hidden:true,
            },

            {

                xtype:'textfield',
                name:'project_id',
                id:'projectid',
                enforceMaxLength: true,
                rowdata:null,
                hidden:true,
            },
            {
                xtype: 'combobox',
                //name: 'pt_pt_id',
                name: 'ptname',
                fieldLabel: 'Company',
                displayField: 'name',
                valueField: 'pt_id',
                readOnly: true,
                allowBlank: true,
                enforceMaxLength: true,
                enableKeyEvents: true,
                rowdata: null,
                forceSelection: false,
                typeAhead: false,
                dataBinder: 'pt',
                 id: 'ptArId',
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