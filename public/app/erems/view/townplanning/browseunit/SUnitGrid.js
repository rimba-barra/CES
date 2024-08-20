Ext.define('Erems.view.townplanning.browseunit.SUnitGrid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.sunitgrid',
    store: 'Unit',
    bindPrefixName: 'Townplanning',
    
    newButtonLabel: 'New townplanning',
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
                    itemId: 'colms_cluster',
                    width: 100,
                    dataIndex: 'cluster',
                    hideable: false,
                    text: 'Cluster'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_block',
                    width: 100,
                    dataIndex: 'block',
                    hideable: false,
                    text: 'Block name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kavnumber',
                    width: 100,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Kav. number'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pt_name',
                    width: 100,
                    dataIndex: 'pt_name',
                    hideable: false,
                    text: 'PT.Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_typename',
                    width: 100,
                    dataIndex: 'type_name',
                    hideable: false,
                    text: 'Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_category',
                    width: 100,
                    dataIndex: 'productcategory',
                    hideable: false,
                    text: 'Category'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_land_size',
                    width: 100,
                    dataIndex: 'land_size',
                    hideable: false,
                    text: 'Land Size'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_building_size',
                    width: 100,
                    dataIndex: 'building_size',
                    hideable: false,
                    text: 'Building Size'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelebihan',
                    width: 100,
                    dataIndex: 'kelebihan',
                    hideable: false,
                    text: 'Kelebihan'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_floor',
                    width: 100,
                    dataIndex: 'floor',
                    hideable: false,
                    text: 'Floor'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_status',
                    width: 100,
                    dataIndex: 'admistrative_state',
                    hideable: false,
                    text: 'Status'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_progress',
                    width: 100,
                    dataIndex: 'progress',
                    hideable: false,
                    text: 'Progress'
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
                dock: 'bottom',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'select',
                        hidden: false,
                        itemId: 'btnNews',
                        margin: '0 5 0 0',
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