Ext.define('Cashier.view.journal.AngsuranEmptyGrid', {
    extend: 'Cashier.library.template.view.GridDS2Browse',
    alias: 'widget.journalangsuranemptygrid',
    storeConfig: {
        id: 'IDselectedAngsuranJRESStore',
        idProperty: 'schedule_id',
        extraParams: {
            mode_read: 'angsuranlist'
        }
    },
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
                {
                    dataIndex: 'noAR',
                    text: 'No. AR',
                    width: 100
                },
                {
                    dataIndex: 'payment_receipt_no',
                    text: 'No. Invoice',
                    width: 80
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
                    width: 80
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'amount',
                    text: 'Total',
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'remaining_balance',
                    text: 'Op. Unpaid',
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'remaining_balance',
                    text: 'Unpaid',
                },
                {
                    dataIndex: '',
                    text: 'Type',
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
                        text: "Pick AR"
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
                xtype: 'textfield',
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
               // forceSelection: true,
                id: 'ptArId',
            },
            {
                xtype: 'textfield',
                name: 'project_id',
                fieldLabel: 'Project',
                displayField: 'project_name',
                valueField: 'project_project_id',
                queryMode: 'local',
                dataBinder: 'project',
               // forceSelection: true,
                allowBlank: true,
               // rowdata: null,
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
                name: 'block_id',
                displayField: cbf.block.d,
                fieldLabel: 'Block',
                valueField: cbf.block.v,
                dataBinder: 'block',
                anchor: '-15',
                width: 100,
                id: 'blockId',
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
                xtype: 'textfield',
                name: 'customer_name',
                fieldLabel: 'Customer Name ',
                width: 100,
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                maxLength: 50,
                id: 'customerNameId',
            },
        ];
        return x;
    }
});