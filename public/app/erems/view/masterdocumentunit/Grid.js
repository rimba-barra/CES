Ext.define('Erems.view.masterdocumentunit.Grid',{
    extend:'Erems.library.template.view.GridDS2',
    alias:'widget.masterdocumentunitgrid',
    storeConfig:{
        id:'MasterDocumentUnitGridStore',
        idProperty:'unit_id',
        extraParams:{}
    },
    bindPrefixName:'Masterdocumentunit',
    newButtonLabel:'New Document Unit',
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
                    dataIndex: 'unit_id',
                    text: 'ID',
                    width:50
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'unit_number',
                    text: 'Kav. Number',
                    width:100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cluster_cluster',
                    text: 'Cluster',
                    width:150
                },{
                    xtype: 'gridcolumn',
                    dataIndex: 'block_block',
                    text: 'Block Name',
                    width:100
                },{
                    xtype: 'gridcolumn',
                    dataIndex: 'pt_name',
                    text: 'PT. Name',
                    width:150
                },{
                    xtype: 'gridcolumn',
                    dataIndex: 'type_name',
                    text: 'Type',
                    width:100
                },{
                    xtype: 'gridcolumn',
                    dataIndex: 'customer_name',
                    text: 'Customer',
                    width:100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'productcategory_productcategory',
                    text: 'Category',
                    width:100
                },{
                    xtype: 'gridcolumn',
                    dataIndex: 'land_size',
                    text: 'Land Size',
                    width:70
                },{
                    xtype: 'gridcolumn',
                    dataIndex: 'building_size',
                    text: 'Building Size',
                    width:70
                },{
                    xtype: 'gridcolumn',
                    dataIndex: 'kelebihan',
                    text: 'Kelebihan',
                    width:70
                },{
                    xtype: 'gridcolumn',
                    dataIndex: 'floor',
                    text: 'Floor',
                    width:70
                },{
                    xtype: 'gridcolumn',
                    dataIndex: 'floor_size',
                    text: 'Floor size',
                    width:70
                },{
                    xtype: 'gridcolumn',
                    dataIndex: 'bedroom',
                    text: 'Bedroom',
                    width:70
                },{
                    xtype: 'gridcolumn',
                    dataIndex: 'bathroom',
                    text: 'Bathroom',
                    width:70
                },{
                    xtype: 'gridcolumn',
                    dataIndex: 'electricity',
                    text: 'Electricity',
                    width:70
                },{
                    xtype: 'gridcolumn',
                    dataIndex: 'unitstatus_status',
                    text: 'Status',
                    width:100
                },{  
                    xtype: 'gridcolumn',
                    dataIndex: 'progress',
                    text: 'Progress ( % )',
                    width:100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'useradd',
                    text: 'Added By',
                    width:100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'Addon',
                    text: 'Added Date',
                    width:100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'useredit',
                    text: 'Edited By',
                    width:100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'Modion',
                    text: 'Edited Date',
                    width:100
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
                        name: 'btnEditName',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
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
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,            
        };
        return ac;
    }
});


