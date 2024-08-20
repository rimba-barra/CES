Ext.define('Erems.view.pindahkavling.UnitStockGrid', {
    extend: 'Erems.library.template.view.GridDS2Browse',
    alias: 'widget.pindahkavlingunitstockgrid',
    
    storeConfig: {
        id: 'PKSTUnitGridStore',
        idProperty: 'unit_id',
        extraParams: {
            mode_read:'unitlist'
        }
    },
    simpleSelect: true,
    height: 300,
    bindPrefixName: 'Pindahkavling',
    newButtonLabel: 'New Purchaseletter',
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
                xtype: 'gridcolumn',
                width: 11
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'unit_number',
                    text: 'Unit Number'
                },
                {
                    dataIndex: 'block_block',
                    text: 'Block'
                },
                {
                    dataIndex: 'cluster_cluster',
                    text: 'Cluster'
                },
                {
                    dataIndex: 'type_name',
                    text: 'Type'
                },
                {
                    dataIndex: 'productcategory_productcategory',
                    text: 'Product Category'
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
                        iconCls: 'icon-approve',
                        margin: '0 5 0 0',
                        text: "Select Unit"
                    }
                ]
            }
        ];
        return dockedItems;
    }
});