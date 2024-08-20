Ext.define('Erems.view.marketingstock.browse.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.marketingstockbrowsegrid',
    store: 'Marketingstock',
    bindPrefixName: 'Marketingstock',
    
    newButtonLabel: 'New Marketingstock',
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
                    dataIndex: 'cluster_code',
                    text: 'Code'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 100,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Block'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_kawasanname',
                    width: 100,
                    dataIndex: 'cluster',
                    hideable: false,
                    text: 'Kawasan name'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_landsize',
                    width: 80,
                    dataIndex: 'land_size',
                    hideable: false,
                    text: 'Land Size'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelebihan',
                    width: 100,
                    dataIndex: 'kelebihan',
                    hideable: false,
                    text: 'Land Over size'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_building_size',
                    width: 80,
                    dataIndex: 'building_size',
                    hideable: false,
                    text: 'Building Size'
                },{
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_jual_tunai',
                    width: 120,
                    dataIndex: 'hargajual_tunai',
                    hideable: false,
                    text: 'Hrg Jual Total Tunai'
                },{
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_jual_kpr',
                    width: 120,
                    dataIndex: 'hargajual_kpr',
                    hideable: false,
                    text: 'Hrg Jual Total KPR'
                },{
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_jual_inhouse',
                    width: 120,
                    dataIndex: 'hargajual_inhouse',
                    hideable: false,
                    text: 'Hrg Jual Total Inhouse'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_state',
                    width: 50,
                    dataIndex: 'status',
                    hideable: false,
                    text: 'State'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_progress',
                    width: 60,
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
         
                items: [
                    {
                        xtype: 'button',
                        action: 'select',
                        hidden: false,
                        itemId: 'btnNews',
                        margin: '0 5 0 0',
                        padding:5,
                        iconCls: 'icon-approve',
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