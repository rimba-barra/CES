Ext.define('Erems.view.popuphargadatastock.Grid', {
    extend         : 'Erems.library.template.view.Grid',
    alias          : 'widget.popuphargadatastockgrid',
    store          : 'Popuphargadatastock',
    bindPrefixName : '',
    newButtonLabel : 'New',
    initComponent  : function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu : me.generateContextMenu(),
            dockedItems : me.generateDockedItems(),
            viewConfig  : {},
            selModel    : {},
            defaults    : {
                xtype : 'gridcolumn',
                width : 100,
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_id',
                    width     : 60,
                    align     : 'right',
                    dataIndex : 'cluster_code',
                    text      : 'Code'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_code',
                    width     : 100,
                    dataIndex : 'unit_number',
                    hideable  : false,
                    text      : 'Unit Number'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_kawasanname',
                    width     : 100,
                    dataIndex : 'cluster',
                    hideable  : false,
                    text      : 'Kawasan name'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_nama_type',
                    width     : 100,
                    dataIndex : 'nama_type',
                    hideable  : false,
                    text      : 'Type'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_landsize',
                    width     : 80,
                    dataIndex : 'land_size',
                    hideable  : false,
                    text      : 'Land Size'
                },
                {
                    itemId: 'colms_kelebihan',
                    xtype     : 'gridcolumn',
                    width     : 100,
                    dataIndex : 'kelebihan',
                    hideable  : false,
                    text      : 'Land Over size'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_building_size',
                    width     : 80,
                    dataIndex : 'building_size',
                    hideable  : false,
                    text      : 'Building Size'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_harga_jual_tunai',
                    width     : 120,
                    dataIndex : 'harga_jual_total_tunai',
                    hideable  : false,
                    text      : 'Hrg Jual Total Tunai'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_harga_jual_kpr',
                    width     : 120,
                    dataIndex : 'harga_jual_total_kpr',
                    hideable  : false,
                    text      : 'Hrg Jual Total KPR'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_harga_jual_inhouse',
                    width     : 120,
                    dataIndex : 'harga_jual_total_inhouse',
                    hideable  : false,
                    text      : 'Hrg Jual Total Inhouse'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_state',
                    width     : 50,
                    dataIndex : 'state',
                    hideable  : false,
                    text      : 'State'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_progress',
                    width     : 60,
                    dataIndex : 'progress',
                    hideable  : false,
                    text      : 'Progress'
                },
                {
                    xtype     :'booleancolumn',
                    dataIndex : 'is_readysell',
                    text      : 'Siap Jual',
                    falseText : ' ',
                    trueText  : '&#10003;'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_virtualaccount_bca',
                    dataIndex : 'unit_virtualaccount_bca',
                    hideable  : false,
                    text      : 'VA BCA'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_virtualaccount_mandiri',
                    dataIndex : 'unit_virtualaccount_mandiri',
                    hideable  : false,
                    text      : 'VA MANDIRI'
                },
                {
                    xtype     :'booleancolumn',
                    dataIndex : 'is_holdmanagement',
                    text      : 'Hold Management',
                    falseText : ' ',
                    trueText  : '&#10003;'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_notes_holdmanagement',
                    dataIndex : 'notes_holdmanagement',
                    hideable  : false,
                    text      : 'Notes Hold Management'
                },
                {
                    itemId    : 'colms_last_updated',
                    dataIndex : 'last_updated',
                    text      : 'Last<br>Updated',
                    width     : 80,
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
                    align     : 'center'
                },
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
                        action: 'export_excel',
                        itemId: 'btnExport',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Export Excel'
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
