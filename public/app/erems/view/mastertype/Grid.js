Ext.define('Erems.view.mastertype.Grid',{
    extend      : 'Erems.library.template.view.GridDS2',
    alias       : 'widget.mastertypegrid',
    storeConfig : {
        id          : 'MasterTypeGridStore',
        idProperty  : 'type_id',
        extraParams : {}
    },
    bindPrefixName : 'Mastertype',
    newButtonLabel : 'New Type',
    initComponent  : function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu : me.generateContextMenu(),
            dockedItems : me.generateDockedItems(),
            viewConfig  : {},
            selModel    : Ext.create('Ext.selection.CheckboxModel', {}),
            columns     : [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype     : 'gridcolumn',
                    header    : 'floorplan_leftaccess',
                    dataIndex : 'floorplan_leftaccess',
                    hidden    : true
                },
                {
                    xtype     : 'gridcolumn',
                    header    : 'floorplan_rightaccess',
                    dataIndex : 'floorplan_rightaccess',
                    hidden    : true
                },
                {
                    xtype     : 'gridcolumn',
                    width     : 50,
                    dataIndex : 'code',
                    text      : 'Type<br>Code'
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_name',
                    width     : 100,
                    dataIndex : 'name',
                    hideable  : false,
                    text      : 'Type'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_side',
                    width     : 110,
                    dataIndex : 'productcategory_productcategory',
                    hideable  : false,
                    text      : 'Product category'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_cluster',
                    width     : 110,
                    dataIndex : 'cluster_cluster',
                    hideable  : false,
                    text      : 'Cluster'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_land_size',
                    width     : 55,
                    dataIndex : 'land_size',
                    hideable  : false,
                    text      : 'Land size',
                    align     : 'right',
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_building_size',
                    width     : 70,
                    dataIndex : 'building_size',
                    hideable  : false,
                    text      : 'Building size',
                    align     : 'right',
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_floor_size',
                    width     : 60,
                    dataIndex : 'floor_size',
                    hideable  : false,
                    text      : 'Floor size',
                    align     : 'right',
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_floor',
                    width     : 35,
                    dataIndex : 'floor',
                    hideable  : false,
                    text      : 'Floor',
                    align     : 'right',
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_bedroom',
                    width     : 60,
                    dataIndex : 'bedroom',
                    hideable  : false,
                    text      : 'Bedroom'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_bathroom',
                    width     : 60,
                    dataIndex : 'bathroom',
                    hideable  : false,
                    text      : 'Bathroom'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_electricty',
                    width     : 55,
                    dataIndex : 'electricity',
                    hideable  : false,
                    text      : 'Electricity',
                    align     : 'right',
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_building_class',
                    width     : 80,
                    dataIndex : 'building_class',
                    hideable  : false,
                    text      : 'Building class'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_salesgroup',
                    width     : 80,
                    dataIndex : 'salesgroup',
                    hideable  : false,
                    text      : 'Sales Group'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_launching_start',
                    width     : 90,
                    dataIndex : 'launching_start',
                    hideable  : false,
                    text      : 'Launching Start',
                    align     : 'center'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_launching_end',
                    width     : 90,
                    dataIndex : 'launching_end',
                    hideable  : false,
                    text      : 'Launching End',
                    align     : 'center'
                },
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});