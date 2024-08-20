Ext.define('Erems.view.masterpricelist.GridDetail', {
    extend         : 'Erems.library.template.view.Grid',
    alias          : 'widget.masterpricelistgriddetail',
    store          : 'Masterpricelistdetail',
    bindPrefixName :'Masterpricelistdetail',
    height         : 300,
    width          : 500,
    initComponent  : function() {
        var me = this;
        Ext.applyIf(me, {
            contextMenu : me.generateContextMenu(),
            dockedItems : me.generateDockedItems(),
            viewConfig  : {},
            selModel    : Ext.create('Ext.selection.CheckboxModel', { selType: 'checkboxmodel', mode : "SINGLE", allowDeselect: true }),
            columns     : [
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_cluster',
                    dataIndex : 'cluster',
                    text      : 'Kawasan'
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_unit_number',
                    dataIndex : 'unit_number',
                    text      : 'Unit Number'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_type_name',
                    dataIndex : 'type_name',
                    text      : 'Tipe'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_land_size',
                    dataIndex : 'land_size',
                    text      : 'Luas Tanah'
                },
                {
                    xtype     : 'numbercolumn',
                    align     : 'right',
                    itemId    : 'colms_harga_tanahmentahpermeter',
                    width     : 115,
                    dataIndex : 'harga_tanahmentahpermeter',
                    text      : 'Tanah Mentah/m2'
                },
                {
                    xtype     : 'numbercolumn',
                    align     : 'right',
                    itemId    : 'colms_harga_tanahdevcostpermeter',
                    width     : 115,
                    dataIndex : 'harga_tanahdevcostpermeter',
                    text      : 'Tanah Devcost/m2'
                },
                {
                    xtype     : 'numbercolumn',
                    align     : 'right',
                    itemId    : 'colms_harga_tanahhpp',
                    width     : 115,
                    dataIndex : 'harga_tanahhpp',
                    text      : 'Tanah HPP/m2'
                },
                {
                    xtype     : 'numbercolumn',
                    align     : 'right',
                    itemId    : 'colms_harga_tanahpermeter',
                    width     : 115,
                    dataIndex : 'harga_tanahpermeter',
                    text      : 'Harga Jual Tanah/m2'
                },
                {
                    xtype     : 'numbercolumn',
                    align     :'right',
                    itemId    : 'colms_total_hargatanah',
                    width     : 120,
                    dataIndex : 'total_hargatanah',
                    text      : 'Total Harga Tanah'
                },
                {
                    xtype     : 'numbercolumn',
                    align     : 'right',
                    itemId    : 'colms_total_tanah_hpp',
                    width     : 120,
                    dataIndex : 'total_tanah_hpp',
                    text      : 'Total HPP Tanah'
                },
                {
                    xtype     : 'numbercolumn',
                    align     : 'right',
                    itemId    : 'colms_harga_tanah_margin',
                    width     : 120,
                    dataIndex : 'harga_tanah_margin',
                    text      : 'Margin Tanah'
                },
                {
                    xtype     : 'numbercolumn',
                    align     : 'right',
                    itemId    : 'colms_harga_tanah_margin_persen',
                    width     : 120,
                    dataIndex : 'harga_tanah_margin_persen',
                    text      : 'Margin Tanah %'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_building_size',
                    dataIndex : 'building_size',
                    text      : 'Luas Bangunan'
                },
                {
                    xtype     : 'numbercolumn',
                    align     : 'right',
                    itemId    : 'colms_harga_bangunanhpp',
                    width     : 135,
                    dataIndex : 'harga_bangunanhpp',
                    text      : 'Harga Bangunan HPP/m2'
                },
                {
                    xtype     : 'numbercolumn',
                    align     : 'right',
                    itemId    : 'colms_harga_bangunanpermeter',
                    width     : 135,
                    dataIndex : 'harga_bangunanpermeter',
                    text      : 'Harga Jual Bangunan/m2'
                },
                {
                    xtype     : 'numbercolumn',
                    align     : 'right',
                    itemId    : 'colms_total_hargabangunan',
                    width     : 120,
                    dataIndex : 'total_hargabangunan',
                    text      : 'Total Harga Bangunan'
                },
                {
                    xtype     : 'numbercolumn',
                    align     : 'right',
                    itemId    : 'colms_total_bangunan_hpp',
                    width     : 120,
                    dataIndex : 'total_bangunan_hpp',
                    text      : 'Total HPP Bangunan'
                },
                {
                    xtype     : 'numbercolumn',
                    align     : 'right',
                    itemId    : 'colms_harga_bangunan_margin',
                    width     : 120,
                    dataIndex : 'harga_bangunan_margin',
                    text      : 'Margin Bangunan'
                },
                {
                    xtype     : 'numbercolumn',
                    align     : 'right',
                    itemId    : 'colms_harga_bangunan_margin_persen',
                    width     : 120,
                    dataIndex : 'harga_bangunan_margin_persen',
                    text      : 'Margin Bangunan %'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_harga_netto',
                    dataIndex : 'harga_netto',
                    align     : 'right',
                    text      : 'Harga Cash Bottom'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_harga_netto_grossup',
                    dataIndex : 'harga_netto_grossup',
                    align     : 'right',
                    text      : 'Harga Cash Bottom Grossup'
                },
                {
                    xtype     : 'numbercolumn',
                    align     : 'right',
                    itemId    : 'colms_total_hpptanahbangunan',
                    width     : 150,
                    dataIndex : 'total_hpptanahbangunan',
                    text      : 'Total HPP Tanah&Bangunan'
                },
                {
                    xtype     : 'numbercolumn',
                    align     : 'right',
                    itemId    : 'colms_total_margin',
                    dataIndex : 'total_margin',
                    text      : 'Total Margin'
                },
                {
                    xtype     : 'numbercolumn',
                    align     : 'right',
                    itemId    : 'colms_persentase_margin',
                    width     : 120,
                    dataIndex : 'persentase_margin',
                    text      : 'Persentase Margin'
                }
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
                        itemId     : 'btnNew',
                        margin     : '0 5 0 0',
                        iconCls    : 'icon-new',
                        bindAction : me.bindPrefixName + 'Create',
                        text       : 'Add'
                    },
                    {
                        xtype      : 'button',
                        action     : 'updateDetail',
                        itemId     : 'btnEdit',
                        iconCls    : 'icon-edit',
                        bindAction : me.bindPrefixName + 'Update',
                        text       : 'Edit',
                        disabled   : true,
                        ctxMenu    : true,
                    },
                    {
                        xtype      : 'button',
                        action     : 'destroyDetail',
                        itemId     : 'btnDelete',
                        iconCls    : 'icon-delete',
                        bindAction : me.bindPrefixName + 'Delete',
                        text       : 'Delete Selected',
                        disabled   : true,
                        ctxMenu    : true,
                    },
                    {
                        xtype      : 'button',
                        margin     : '0 0 0 5',
                        action     : 'generate',
                        iconCls    : 'icon-new',
                        bindAction : me.bindPrefixName + 'Generate',
                        text       : 'Generate'
                    },
                    {
                        xtype      : 'button',
                        margin     : '0 0 0 5',
                        action     : 'readDetail',
                        itemId     : 'btnView',
                        iconCls    : 'icon-search',
                        bindAction : me.bindPrefixName + 'Read',
                        text       : 'View',
                        disabled   : true,
                        ctxMenu    : true,
                    },
                ]
            }
        ];
        return dockedItems;
    },
});