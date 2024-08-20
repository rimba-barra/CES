Ext.define('Cashier.view.kartupiutangsurabaya.Grid',{
    extend:'Cashier.library.template.view.GridDS2',
    alias:'widget.kartupiutangsurabayagrid',
    storeConfig:{
        id:'KartuPiutangGridStore',
        idProperty:'purchaseletter_id',
        extraParams:{}
    },
    bindPrefixName:'Kartupiutangsurabaya',
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
                text: 'Purchase Letter No',
                width:150
            },
            {
                xtype:'datecolumn',
                format:'d-m-Y',
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
                xtype:'numbercolumn',
                dataIndex: 'payment_total_payment',
                text: 'Total Payment'
            },
            {
                dataIndex: 'salesman_employee_name',
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
                       // hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                       // bindAction: me.bindPrefixName + 'Print',
                        iconCls: 'icon-print',
                        text: 'Print / Save (for Internal)'
                    }
                    // edited by Rizal 13-02-2019 
                    ,{
                        xtype: 'button',
                        action: 'printcustomer',
                        //hidden: false,
                        itemId: 'btnPrintCustomer',
                        margin: '0 5 0 0',
                        //bindAction: me.bindPrefixName + 'Print2',
                        iconCls: 'icon-print',
                        text: 'Print / Save (for Customer)'
                    }
                    //
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
