Ext.define('Erems.view.serahterima.Grid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.serahterimagrid',
    storeConfig: {
        id: 'SerahterimaGridStore',
        idProperty: 'serahterima_id',
        extraParams: {}
    },
    bindPrefixName: 'Serahterima',
    newButtonLabel: 'Create New',
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
                    xtype: 'rownumberer'
                },
               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_serahterima_id',
                    width: 100,
                    dataIndex: 'serahterima_id',
                    hidden: true,
                    text: 'serahterima_id'
                },
               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cluster',
                    width: 100,
                    dataIndex: 'cluster_cluster',
                    hideable: false,
                    text: 'Cluster'
                },
               
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'unit_unit_number',
                    hideable: false,
                    text: 'Unit Number'
                },
                {
                    xtype: 'datecolumn',
                    format: 'd-m-Y',
                    width: 100,
                    dataIndex: 'serahterima_date',
                    hideable: false,
                    text: 'Tanggal Serah Terima'
                },
                 {
                    xtype: 'gridcolumn',
                    width: 300,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name'
                },
                {
                    xtype: 'datecolumn',
                    format: 'd-m-Y',
                    width: 100,
                    dataIndex: 'addon',
                    hideable: false,
                    text: 'Addon'
                }
                

               // me.generateActionColumn()
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
                        hidden: false,
                        itemId: 'btnNew',
                        //bindAction: me.bindPrefixName + 'Create',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        hidden: false,
                        itemId: 'btnEdit',
                        //bindAction: me.bindPrefixName + 'Update',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
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