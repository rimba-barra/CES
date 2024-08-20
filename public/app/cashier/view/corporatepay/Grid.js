Ext.define('Cashier.view.corporatepay.Grid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.corporatepaygrid',
    bindPrefixName: 'Corporatepay',
    storeConfig: {
        id: 'CorporatepayGridStore',
        idProperty: 'writeoff_id',
        extraParams: {module: 'corporatepay'},
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
                me.generateActionColumn(),
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_corporatepay_filename',
                    width: 150,
                    dataIndex: 'filename',
                    hideable: false,
                    text: 'Filename'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_corporatepay_filedate',
                    width: 150,
                    dataIndex: 'filedate',
                    hideable: false,
                    text: 'File Date',
                    
                    renderer: function (value, metaData, record, row, col, store, gridView) {
                        return moment(record.get('filedate')).format("DD-MM-YYYY");
                    },
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_corporatepay_debitsource',
                    width: 150,
                    dataIndex: 'debitsource',
                    hideable: false,
                    text: 'Debitsource'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_corporatepay_status',
                    width: 150,
                    dataIndex: 'status',
                    hideable: false,
                    text: 'Status',
                    renderer: function (value) {
                        if (value == '1') {
                            return '<span style="color:orange">OPEN</span>';
                        } else if (value == '2') {
                            return '<span style="color:blue">CLOSED</span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_corporatepay_createdby',
                    width: 80,
                    dataIndex: 'addbyname',
                    hideable: false,
                    text: 'Created By'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_corporatepay_addon',
                    width: 150,
                    dataIndex: 'addon',
                    hideable: false,
                    text: 'Created On'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_corporatepay_downloaded_times',
                    width: 150,
                    dataIndex: 'downloaded_times',
                    hideable: false,
                    text: 'Downloaded time(s)'
                },
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
                        action: 'create',
                        hidden: true,
                        itemId: 'btnCreate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add new',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        hidden: true,
                        disabled:true,
                        itemId: 'btnUpdate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        hidden: true,
                        disabled:true,
                        itemId: 'btnDestroy',
                        margin: '0 5 0 0',
                        iconCls: 'icon-delete',
                        text: 'Delete',
                        bindAction: me.bindPrefixName + 'Delete'
                    },
                    // SEFTIAN ALFREDO 03/11/21
                    {
                        xtype: 'button',
                        action: 'export',
                        hidden: true,
                        disabled:true,
                        itemId: 'btnExport',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Export',
                        bindAction: me.bindPrefixName + 'Export'
                    },
                    {
                        xtype: 'button',
                        action: 'close',
                        hidden: true,
                        disabled:true,
                        itemId: 'btnClose',
                        margin: '0 5 0 0',
                        iconCls: 'icon-archive',
                        text: 'Flag as Closed',
                        bindAction: me.bindPrefixName + 'Close'
                    },
                ]
            },{
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
            hidden: false,
            itemId: 'actioncolumn',
            width: 150,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Export',
                    iconCls: 'icon-print',
                    bindAction: me.bindPrefixName + 'Export',
                    altText: 'Export',
                    tooltip: 'Export'
                },
            ]
        };
        return ac;
    },
});