Ext.define('Erems.view.popupgeneralinformation.Grid',{
    extend:'Erems.library.template.view.GridDS2',
    alias:'widget.popupgeneralinformationgrid',
    storeConfig:{
        id:'KartuPiutangGridStore',
        idProperty:'purchaseletter_id',
        extraParams:{}
    },
    bindPrefixName:'Popupgeneralinformation',
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
                dataIndex: 'customer_name',
                text: 'Customer Name'
            },
          
            {
                dataIndex: 'salesman_employee_name',
                text: 'Salesman'
            },

            {   
                xtype: 'numbercolumn',
                dataIndex: 'harga_total_jual',
                align:'right',
                text: 'Total Price'
            },

            {
                xtype: 'numbercolumn',
                dataIndex: 'harga_netto',
                align:'right',
                text: 'Netto Price'
            },

            {
                dataIndex: 'customer_npwp',
                text: 'NPWP'
            },

            {
                xtype: 'numbercolumn',
                dataIndex: 'plafon_kpr',
                align:'right',
                text: 'Plafon KPR'
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
                        action: 'view',
                
                        margin: '0 5 0 0',
                        iconCls: 'icon-form',
            
                        text: 'View'
                    },
                    {
                        xtype: 'button',
                        action: 'kartupiutang',
                        margin: '0 5 0 0',
                        iconCls: 'icon-form',
                        text: 'Kartu Piutang'
                    },
                    {
                        xtype: 'button',
                        action: 'excel',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Excel'
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