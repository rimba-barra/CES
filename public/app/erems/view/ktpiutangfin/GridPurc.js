Ext.define('Erems.view.ktpiutangfin.GridPurc', {
    alias: 'widget.ktpiutangfingridpurc',
    bindPrefixName: 'Ktpiutangfin',
    extend: 'Erems.library.template.view.GridDS2',

    storeConfig: {
        id: 'KtpiutangfinGridPurcStore',
        idProperty: 'purchaseletter_id',
        extraParams: {
            mode_read:'purchaselist',
            cluster_id:0,
            unit_id:0
        }
    },

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            columns: [
                {
                    xtype: 'rownumberer',
                    width: 30
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    align: 'right',
                    dataIndex: 'cluster_cluster',
                    text: 'Kawasan'
                }, {
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'unit_unit_number',
                    hideable: false,
                    text: 'Unit Number'
                }, {
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'type_name',
                    hideable: false,
                    text: 'Type'
                }, {
                    xtype: 'datecolumn',
                    width: 100,
                    dataIndex: 'purchase_date',
                    format: 'd-m-Y',
                    hideable: false,
                    text: 'Tanggal Pesanan'
                }, {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'purchaseletter_no',
                    hideable: false,
                    text: 'Nomor Pesanan'
                }, {
                    xtype: 'numbercolumn',
                    width: 100,
                    dataIndex: 'harga_total_jual',
                    hideable: false,
                    align: 'right',
                    text: 'Harga Jual'
                }, {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name'
                }, {
                    xtype: 'numbercolumn',
                    width: 100,
                    dataIndex: 'total_payment',
                    hideable: false,
                    align: 'right',
                    text: 'Total Payment'
                }, {
                    xtype: 'gridcolumn',
                    itemId: 'colms_sales_name',
                    width: 100,
                    dataIndex: 'salesman_employee_name',
                    hideable: false,
                    text: 'Sales Name'
                }, {
                    xtype: 'gridcolumn',
                    itemId: 'colms_member_name',
                    width: 100,
                    dataIndex: 'clubcitra_member',
                    hideable: false,
                    text: 'Member Name'
                },
                {
                    dataIndex: 'api_aci',
                    text: 'ACI',
                    xtype: 'booleancolumn',
                    width: 50,
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
                {
                    xtype: 'datecolumn',
                    width: 100,
                    dataIndex: 'Addon',
                    format: 'd-m-Y',
                    hideable: false,
                    text: 'Tanggal Input'
                },
                        // me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;

        // var ctpl = new Ext.XTemplate('<tpl for="."><div class="x-combo-list-item" >{code} {cluster}</div></tpl>');

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'combobox',
                        queryMode: 'local',
                        fieldLabel: 'Kawasan',
                        name: 'cluster_id',
                        //  displayField: 'code',
                        displayField: 'code',
                        valueField: 'cluster_id',
                     

                    },
                    {
                        xtype: 'combobox',
                        queryMode: 'local',
                        fieldLabel: 'Unit',
                        name: 'unit_id',
                        displayField: 'unit_number',
                        valueField: 'unit_id',

                    },
                    '->',
                    {
                        xtype: 'label',
                        text: 'DATA PURCHASELETTER',
                        //  bodyStyle: 'font-weight:bold,font-size:10px',
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            },
        ];
        return dockedItems;
    },
});