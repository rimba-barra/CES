Ext.define('Erems.view.sppjb.Grid', {
    extend         : 'Erems.library.template.view.Grid',
    alias          : 'widget.sppjbgrid',
    store          : 'Sppjb',
    bindPrefixName : 'Sppjb',
    newButtonLabel : 'New SPPJB',
    initComponent  : function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu : me.generateContextMenu(),
            dockedItems : me.generateDockedItems(),
            viewConfig  : {},
            selModel    : Ext.create('Ext.selection.CheckboxModel', {}),
            columns     : [
                {
                    xtype : 'rownumberer',
                    width : 35
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_sppjb_no',
                    width     : 175,
                    dataIndex : 'sppjb_no',
                    hideable  : false,
                    text      : 'SPPJB No.'
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_sppjb_date',
                    width     : 150,
                    dataIndex : 'sppjb_date',
                    hideable  : false,
                    text      : 'SPPJB Date',
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_cluster',
                    width     : 100,
                    align     : 'right',
                    dataIndex : 'cluster',
                    text      : 'Cluster'
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_block',
                    width     : 60,
                    dataIndex : 'block',
                    hideable  : false,
                    text      : 'Block'
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_unit_number',
                    width     : 60,
                    dataIndex : 'unit_number',
                    hideable  : false,
                    text      : 'Unit'
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_sppjb_name',
                    width     : 100,
                    align     : 'right',
                    dataIndex : 'sppjb_name',
                    text      : 'SPPJB Name'
                },
                {
                    xtype     : 'gridcolumn',
                    width     : 100,
                    dataIndex : 'more_customers',
                    text      : 'More Customer',
                    itemId    : 'td_more_customer',
                    hidden    : true,
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_sppjb_address',
                    width     : 150,
                    align     : 'right',
                    dataIndex : 'sppjb_address',
                    text      : 'SPPJB Address'
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_atasnama',
                    width     : 150,
                    dataIndex : 'atasnama',
                    hideable  : false,
                    text      : 'Atas Nama'
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_sppjb_ktp',
                    width     : 150,
                    dataIndex : 'sppjb_ktp',
                    hideable  : false,
                    text      : 'KTP Number'
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_sppjb_npwp',
                    width     : 150,
                    dataIndex : 'sppjb_npwp',
                    hideable  : false,
                    text      : 'NPWP'
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_electricity',
                    width     : 60,
                    dataIndex : 'electricity',
                    hideable  : false,
                    text      : 'Electricity'
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_purchaseletter_no',
                    width     : 175,
                    dataIndex : 'purchaseletter_no',
                    hideable  : false,
                    text      : 'Purchase Letter No'
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_serahterima_date',
                    width     : 150,
                    dataIndex : 'serahterima_date',
                    hideable  : false,
                    text      : 'Hand Over Date',
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_tandatangan_date',
                    width     : 150,
                    dataIndex : 'tandatangan_date',
                    hideable  : false,
                    text      : 'Sign Date',
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_suratkuasa_date',
                    width     : 150,
                    dataIndex : 'suratkuasa_date',
                    hideable  : false,
                    text      : 'Tanggal SK',
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_note',
                    width     : 175,
                    dataIndex : 'note',
                    hideable  : false,
                    text      : 'Note'
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_addby_user',
                    width     : 100,
                    dataIndex : 'addby_user',
                    hideable  : false,
                    text      : 'Added By'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_addon',
                    width     : 100,
                    dataIndex : 'addon',
                    hideable  : false,
                    text      : 'Added Date',
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_modiby_user',
                    width     : 100,
                    dataIndex : 'modiby_user',
                    hideable  : false,
                    text      : 'Last Modified By'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_modion',
                    width     : 100,
                    dataIndex : 'modion',
                    hideable  : false,
                    text      : 'Last Modified Date',
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y')
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
                xtype  : 'toolbar',
                dock   : 'top',
                height : 28,
                items  : [
                    {
                        xtype      : 'button',
                        action     : 'create',
                        hidden     : true,
                        itemId     : 'btnNew',
                        margin     : '0 5 0 0',
                        iconCls    : 'icon-new',
                        bindAction : me.bindPrefixName + 'Create',
                        text       : me.newButtonLabel
                    },
                    {
                        xtype      : 'button',
                        action     : 'update',
                        disabled   : true,
                        hidden     : true,
                        itemId     : 'btnEdit',
                        margin     : '0 5 0 0',
                        iconCls    : 'icon-edit',
                        text       : 'Edit',
                        bindAction : me.bindPrefixName + 'Update'
                    },
                    {
                        xtype      : 'button',
                        action     : 'destroy',
                        disabled   : true,
                        hidden     : true,
                        itemId     : 'btnDelete',
                        bindAction : me.bindPrefixName + 'Delete',
                        iconCls    : 'icon-delete',
                        text       : 'Delete Selected'
                    },
                    {
                        xtype    : 'button',
                        action   : 'print',
                        disabled : true,
                        itemId   : 'btnPrint',
                        margin   : '0 5 0 0',
                        iconCls  : 'icon-print',
                        text     : 'Print'
                    }
                ]
            },
            {
                xtype       : 'pagingtoolbar',
                dock        : 'bottom',
                width       : 360,
                displayInfo : true,
                store       : this.getStore()
            }
        ];
        return dockedItems;
    },
	
	generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype     : 'actioncolumn',
            hidden    : true,
            itemId    : 'actioncolumn',
            width     : 50,
            resizable : false,
            align     : 'right',
            hideable  : false,
            items     : [
                {
                    text       : 'Edit',
                    iconCls    : 'icon-edit',
                    bindAction : me.bindPrefixName+'Update',
                    altText    : 'Edit',
                    tooltip    : 'Edit'
                },
                {
                    text       : 'Delete',
                    iconCls    : 'icon-delete',
                    bindAction : me.bindPrefixName+'Delete',
                    altText    : 'Delete',
                    tooltip    : 'Delete'
                },
				{
                    text       : 'View',
                    iconCls    : 'icon-search',
                    className  :'view',
                    bindAction : me.bindPrefixName + 'Read',
                    altText    : 'View',
                    tooltip    : 'View'
                }
            ]
        };
        return ac;
    }
	
});