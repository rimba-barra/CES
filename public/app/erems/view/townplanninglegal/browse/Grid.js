Ext.define('Erems.view.townplanning.browse.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.townplanningbrowsegrid',
    store:'Unit',
    bindPrefixName:'Townplanninglegal',
   // itemId:'',
    newButtonLabel:'New Town Planning',
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
                    itemId: 'colms_id',
                    width: 60,
                    align: 'right',
                    dataIndex: 'unit_id',
                    text: 'ID'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    width: 100,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Kav. Number'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cluster',
                    width: 200,
                    dataIndex: 'cluster',
                    hideable: false,
                    text: 'Cluster'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_block',
                    width: 110,
                    dataIndex: 'block',
                    hideable: false,
                    text: 'Block Name'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_pt',
                    width: 110,
                    dataIndex: 'pt_id',
                    hideable: false,
                    text: 'PT. Name'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_type',
                    width: 110,
                    dataIndex: 'type_name',
                    hideable: false,
                    text: 'Type'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_productcategory',
                    width: 110,
                    dataIndex: 'productcategory',
                    hideable: false,
                    text: 'Category'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_land_size',
                    width: 110,
                    dataIndex: 'land_size',
                    hideable: false,
                    text: 'Land Size'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_building_size',
                    width: 110,
                    dataIndex: 'building_size',
                    hideable: false,
                    text: 'Building Size'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelebihan',
                    width: 110,
                    dataIndex: 'kelebihan',
                    hideable: false,
                    text: 'Kelebihan'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_floor',
                    width: 110,
                    dataIndex: 'floor',
                    hideable: false,
                    text: 'Floor'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_floor_size',
                    width: 110,
                    dataIndex: 'floor_size',
                    hideable: false,
                    text: 'Floor size'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_bedroom',
                    width: 110,
                    dataIndex: 'bedroom',
                    hideable: false,
                    text: 'Bedroom'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_bathroom',
                    width: 110,
                    dataIndex: 'bathroom',
                    hideable: false,
                    text: 'Bathroom'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_electricity',
                    width: 110,
                    dataIndex: 'electricity',
                    hideable: false,
                    text: 'Electricity'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_administrative',
                    width: 110,
                    dataIndex: 'state_administrative',
                    hideable: false,
                    text: 'Status'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_progress',
                    width: 110,
                    dataIndex: 'progress',
                    hideable: false,
                    text: 'Progress'
                }
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
         
                items: [
                    {
                        xtype: 'button',
                        action: 'select',
                        hidden: false,
                        itemId: 'btnNews',
                        margin: '0 5 0 0',
                        padding:5,
                        iconCls: 'icon-new',
                        //bindAction: me.bindPrefixName+'SelectUnit',
                        text: 'Select Unit'
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