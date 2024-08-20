Ext.define('Erems.view.prosescac.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'ProcessCacGridStore',
        idProperty: 'prosescac_id',
        extraParams: {}
    },
    alias:'widget.prosescacgrid',
    
    bindPrefixName:'Prosescac',
   // itemId:'',
    newButtonLabel:'New Proses CAC',
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
                    dataIndex: 'cac_cac_code',
                    text: 'Member Code'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cac_cac_name',
                    text: 'Member Name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'point',
                    width:80,
                    text: 'Point'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'harga_netto',
                    width:200,
                    text: 'Harga Netto'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'harga_jual_total',
                    width:200,
                    text: 'Harga Jual'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'sales_price',
                    width:200,
                    text: 'Harga Sales'
                },
                
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
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
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-search',
                        text: 'View',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Print',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    },
});


