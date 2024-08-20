Ext.define('Cashier.view.journal.AngsuranGrid', {
    extend: 'Cashier.library.template.view.GridDS2Browse',
    alias: 'widget.journalangsurangrid',
    storeConfig: {
        id: 'IDselectedAngsuranJRStore',
        idProperty: 'schedule_ids',
        extraParams: {
            mode_read: 'angsuranlist'
        }
    },
    id: 'browseangsurangrid',
    simpleSelect: true,
    height: 300,
    bindPrefixName: 'Journal',
    newButtonLabel: 'New Unit',
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
//                {
//                    dataIndex: 'cluster_cluster',
//                    text: 'Cluster'
//                },
//                {
//                    dataIndex: 'block_block',
//                    text: 'Block'
//                },
                {
                    dataIndex: 'unit_cluster',
                    text: 'Cluster',
                    width: 150
                },
                {
                    dataIndex: 'unit_unit_number',
                    text: 'Unit Number',
                    width: 80
                },
//                {
//                    dataIndex: 'purchaseletter_no',
//                    text: 'Purchase Letter No.',
//                    width: 150
//                },
//                {
//                    xtype: 'datecolumn',
//                    dataIndex: 'purchase_date',
//                    text: 'Purchase Letter Date'
//                },
//                {
//                    dataIndex: 'type_name',
//                    text: 'Type'
//                },
                {
                    dataIndex: 'description',
                    text: 'Description ',
                    width: 170
                },
                {
                    dataIndex: 'customer_name',
                    text: 'Customer Name',
                    width: 150
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'duedate',
                    text: 'Due Date',
                    format: 'd-m-Y',
                    width: 80
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'amount',
                    text: 'Total',
                    align: 'right',
                    style: 'text-align:left',
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'paid',
                    text: 'Paid',
                    align: 'right',
                    style: 'text-align:left',
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'oppaid',
                    text: 'Op. Unpaid',
                    align: 'right',
                    style: 'text-align:left',
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'remaining_balance',
                    text: 'Unpaid',
                    align: 'right',
                    style: 'text-align:left',
                },
                {
                    dataIndex: 'payment_receipt_no',
                    text: 'No. Receipt',
                    width: 100
                }, {
                    dataIndex: 'journal_journalID',
                    text: 'Journal ID',
                    width: 150
                },
                {
                    dataIndex: 'noAR',
                    text: 'No. AR',
                    width: 100
                },
//                {
//                    xtype: 'numbercolumn',
//                    dataIndex: 'purchaseletter_harga_total_jual',
//                    text: 'Sales Price',
//                },
//                {
//                    dataIndex: 'land_size',
//                    text: 'Land Size'
//                },
//                {
//                    dataIndex: 'building_size',
//                    text: 'Building Size'
//                },
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
                        margin: '0 5 0 0',
                        iconCls: 'icon-approve',
                        text: "Pick AR"
                    },
                    {
                        xtype: 'button',
                        action: 'estimasidenda',
                        id:'btnEstimasiDenda',
                        disabled: true,
                        margin: '0 5 0 0',
                        iconCls: 'icon-approve',
                        text: "Hitung Estimasi Denda"
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
                xtype: 'hiddenfield',
                id: 'scheduleAngsuranId',
                name: 'schedule_id'
            },
            {
                xtype: 'hiddenfield',
                id: 'schedulePaymentflag_id',
                name: 'paymentflag_id',
                value: 0
            },
            {
                xtype: 'hiddenfield',
                id: 'unitscheduleAngsuranId',
                name: 'unit_id'
            },
            {
                xtype: 'hiddenfield',
                id: 'tipeangsuran',
                name: 'tipeangsuran'
            },
            {
                xtype: 'combobox',
                name: 'pt_id',
                fieldLabel: 'Company',
                displayField: 'name',
                valueField: 'pt_id',
                readOnly: false,
                dataBinder: 'pt',
                allowBlank: true,
                enforceMaxLength: true,
                enableKeyEvents: true,
                rowdata: null,
                forceSelection: true,
                id: 'ptArId',
            },
            {
                xtype: 'combobox',
                name: 'project_id',
                fieldLabel: 'Project',
                displayField: 'project_name',
                valueField: 'project_project_id',
                queryMode: 'local',
                dataBinder: 'project',
                forceSelection: true,
                allowBlank: true,
                rowdata: null,
                hidden: true,
                id: 'projectArId',
            },
            {
                xtype: 'textfield',
                name: 'unit_number',
                fieldLabel: 'Unit number',
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                maxLength: 30,
                anchor: '-15',
                width: 100,
                id: 'unitNumberId',
                allowBlank: false,
                listeners: {
                    afterrender: function (field) {
                        field.focus(false, 1000);
                    }
                }
            },
            {
                xtype: 'textfield',
                name: 'cluster_name',
                fieldLabel: 'Cluster Name',
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                maxLength: 30,
                anchor: '-15',
                width: 100,
                id: 'clusterId',
                allowBlank: true,
            },
            {
                xtype: 'textfield',
                name: 'customer_name',
                fieldLabel: 'Customer Name ',
                width: 100,
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                maxLength: 50,
                id: 'customerNameId',
            },
            {
                xtype: 'textfield',
                name: 'purchaseletter_no',
                fieldLabel: 'Purchaseletter No',
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                maxLength: 50,
                width: 100,
                id: 'purchaseletterNoId',
            },
            {
                xtype: 'combobox',
                name: 'block_id',
                displayField: cbf.block.d,
                fieldLabel: 'Block',
                valueField: cbf.block.v,
                dataBinder: 'block',
                anchor: '-15',
                width: 100,
                id: 'blockId',
                hidden: true,
            },
        ];
        return x;
    }
});