Ext.define('Cashier.view.writeoff.Grid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.writeoffgrid',
    bindPrefixName: 'Writeoff',
    storeConfig: {
        id: 'WriteoffGridStore',
        idProperty: 'writeoff_id',
        extraParams: {module: 'writeoff'},
    },
    newButtonLabel: 'Add New',
    initComponent: function() {
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
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_writeoff_no',
                    width: 150,
                    dataIndex: 'writeoff_no',
                    hideable: false,
                    text: 'Writeoff No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_writeoff_date',
                    width: 150,
                    dataIndex: 'addon',
                    hideable: false,
                    text: 'Writeoff Date'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cluster_cluster',
                    width: 150,
                    dataIndex: 'cluster_cluster',
                    hideable: false,
                    text: 'Cluster'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_block_block',
                    width: 150,
                    dataIndex: 'block_block',
                    hideable: false,
                    text: 'Block'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    width: 80,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit Number'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_customer_name',
                    width: 150,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchaseletter_no',
                    width: 150,
                    dataIndex: 'purchaseletter_no',
                    hideable: false,
                    text: 'Purchaseletter No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_writeoff',
                    width: 150,
                    dataIndex: 'writeoff',
                    hideable: false,
                    text: 'Writeoff Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_note',
                    width: 150,
                    dataIndex: 'note',
                    hideable: false,
                    text: 'Notes'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_status',
                    width: 150,
                    dataIndex: 'status',
                    hideable: false,
                    text: 'Status'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_apvbyname',
                    width: 150,
                    dataIndex: 'apvbyname',
                    hideable: false,
                    text: 'Reject/Approve By'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addby',
                    width: 150,
                    dataIndex: 'addby',
                    hideable: false,
                    text: 'Add By'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addon',
                    width: 80,
                    dataIndex: 'addon',
                    hideable: false,
                    text: 'Add On'
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
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'writeoff',
                        disabled: false,
                        itemId: 'btnCreate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'New Write Off',
                        bindAction: me.bindPrefixName + 'Writeoff'
                    },
                    {
                        xtype: 'button',
                        action: 'writeoffspecial',
                        disabled: false,
                        itemId: 'btnSpecial',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'New Special Write Off',
                        bindAction: me.bindPrefixName + 'Writeoffspecial'
                    },
                    {
                        xtype: 'button',
                        action: 'deletes',
                        disabled: true,
                        itemId: 'btnDelete',
                        margin: '0 5 0 0',
                        iconCls: 'icon-delete',
                        text: 'Delete',
                        bindAction: me.bindPrefixName + 'Delete'
                    },
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'bottom',
                height: 28,
                items: [
                    {
                        xtype: 'pagingtoolbar',
                        dock: 'bottom',
                        width: 360,
                        displayInfo: true,
                        store: this.getStore()
                    },
                ]
            },
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 100,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
            ]
        };
        return ac;
    },
});