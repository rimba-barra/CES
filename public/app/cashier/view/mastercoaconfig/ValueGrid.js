Ext.define('Cashier.view.mastercoaconfig.ValueGrid', {
    extend: 'Cashier.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterCoaDetailGridStore',
        idProperty: 'coa_config_detail_id',
        extraParams: {
            mode_read:'detail'
        }
    },
    bindPrefixName: 'mastercoaconfig',
    alias: 'widget.mastercoaconfigvaluegrid',
    newButtonLabel: 'Add new coa account',
    height: 200,
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
                    itemId: 'colpf_id',
                    width: 70,
                    align: 'right',
                    dataIndex: 'code',
                    text: 'Coa Code'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    align: 'right',
                    dataIndex: 'coa_name',
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    align: 'right',
                    dataIndex: 'cashflowtype_cashflowtype',
                    text: 'Cashflow'
                },
//                {
//                    xtype: 'gridcolumn',
//                    width: 90,
//                    align: 'right',
//                    dataIndex: 'type',
//                    text: 'Dataflow'
//                },
                
                {
                    xtype: 'gridcolumn',
                    itemId: 'colpf_codes',
                    width: 60,
                    dataIndex: 'persen',
                    hideable: false,
                    text: 'Persen'
                },
                {
                    xtype: 'gridcolumn',
                    width: 50,
                    dataIndex: 'kelsub_kelsub',
                    hideable: false,
                    text: 'Kelsub'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'cluster_cluster',
                    hideable: false,
                    text: 'Cluster'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'type',
                    text: 'Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colpf_code',
                    width: 150,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
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
                        //hidden: fal,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        //bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        //disabled: true,
                        //hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        //bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        //disabled: true,
                       // hidden: true,
                        itemId: 'btnDelete',
                        //bindAction: me.bindPrefixName + 'Delete',
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
    },
//    generateDockedItems: function() {
//        var me = this;
//
//        var dockedItems = [
//            {
//                xtype: 'toolbar',
//                dock: 'bottom',
//                height: 28,
//                ui: 'footer',
//                layout: {
//                    type: 'hbox',
//                    pack: 'end'
//                },
//                items: [
//                    {
//                        xtype: 'button',
//                        action: 'value_add',
//                        name:'value_add',
//                        hidden: false,
//                        itemId: 'btnEdit',
//                        margin: '0 5 0 0',
//                        text: 'Add new coa account'
//                    }
//
//                ]
//            }
//
//        ];
//        return dockedItems;
//    }
});