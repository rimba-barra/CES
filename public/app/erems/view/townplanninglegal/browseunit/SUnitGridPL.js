Ext.define('Erems.view.townplanninglegal.browseunit.SUnitGridPL', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.sunitgridpl',
    store: 'Unit',
    bindPrefixName: 'Townplanninglegal',
    newButtonLabel: 'New townplanninglegal',
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
                    dataIndex: 'code',
                    text: 'Code'
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
                    itemId: 'colms_unit_number',
                    width: 100,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit Number'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pt_name',
                    width: 100,
                    dataIndex: 'pt_name',
                    hideable: false,
                    text: 'PT Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_type_name',
                    width: 100,
                    dataIndex: 'type_name',
                    hideable: false,
                    text: 'Type Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_tanah',
                    width: 100,
                    dataIndex: 'tanah',
                    hideable: false,
                    text: 'Tanah'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelebihan',
                    width: 100,
                    dataIndex: 'kelebihan',
                    hideable: false,
                    text: 'Kelebihan Tanah'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_bangunan',
                    width: 100,
                    dataIndex: 'bangunan',
                    hideable: false,
                    text: 'Bangunan'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_total_tunai',
                    width: 100,
                    dataIndex: 'total_tunai',
                    hideable: false,
                    text: 'Total Tunai'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_total_kpr',
                    width: 100,
                    dataIndex: 'total_kpr',
                    hideable: false,
                    text: 'Total KPR'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_total_inhouse',
                    width: 100,
                    dataIndex: 'total_inhouse',
                    hideable: false,
                    text: 'Total Inhouse'
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