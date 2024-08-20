Ext.define('Erems.view.kartupiutang.Gridc',{
    extend:'Erems.library.template.view.Grid',
    alias:'widget.kartupiutangcgrid',
   // store:'Kartupiutang',
    bindPrefixName:'Kartupiutang',
    newButtonLabel:'New Expense_no',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {

                }),
            defaults: {
                xtype:'gridcolumn',
                width: 100,
                hidden:false
            },
            columns: [
            {
                xtype: 'rownumberer'
            },
            {
                dataIndex: 'purchaseletter_no',
                text: 'Purchase Letter No'
            },
            {
                dataIndex: 'purchase_date',
                text: 'Purchase Date'
            },
            {
                dataIndex: 'cluster_cluster',
                text: 'Cluster'
            },
            {
                dataIndex: 'block_block',
                text: 'Block Name'
            },
            {
                dataIndex: 'unit_unit_number',
                text: 'Unit No.'
            },
            {
                dataIndex: 'type_name',
                text: 'Type'
            },
            {
                dataIndex: 'productcategory_productcategory',
                text: 'Category'
            },
            {
                dataIndex: 'customer_name',
                text: 'Customer Name'
            },
            {
                dataIndex: 'total_payment',
                text: 'Total Payment'
            },
            {
                dataIndex: 'salesman_name',
                text: 'Salesman'
            },
                
            me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Kartu Piutang',
                    iconCls: 'icon-form',
                    bindAction: me.bindPrefixName + 'View',
                    altText: 'Kartu Piutang',
                    className:'view',
                    tooltip: 'Kartu Piutang'
                }
            ]
        };
        return ac;
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
                        itemId: 'btnView',
                        margin: '0 5 0 0',
                        iconCls: 'icon-form',
                        bindAction: me.bindPrefixName + 'View',
                        text: 'View'
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
    }
});