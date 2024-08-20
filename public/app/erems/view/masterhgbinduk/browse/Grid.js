Ext.define('Erems.view.masterhgbinduk.browse.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.masterhgbindukbrowsegrid',
    store: 'Masterhgbinduk',
    bindPrefixName: 'Masterhgbinduk',
    
    newButtonLabel: 'New',
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
                    width: 50,
                    align: 'right',
                    dataIndex: 'hgbinduk_id',
                    text: 'ID'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 150,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'HGB Induk Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_hgbinduk',
                    width: 150,
                    dataIndex: 'hgbinduk',
                    hideable: false,
                    text: 'HGB Induk No'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_kecamatan_id',
                    width: 150,
                    dataIndex: 'kecamatan_id',
                    hideable: false,
                    text: 'Kecamatan ID'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_desa',
                    width: 150,
                    dataIndex: 'desa',
                    hideable: false,
                    text: 'Desa'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_date',
                    width: 100,
                    dataIndex: 'date',
                    hideable: false,
                    text: 'HGB Induk Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_gs',
                    width: 150,
                    dataIndex: 'gs',
                    hideable: false,
                    text: 'HGB Induk GS'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_gs_date',
                    width: 150,
                    dataIndex: 'gs_date',
                    hideable: false,
                    text: 'HGB Induk GS Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_luas',
                    width: 150,
                    dataIndex: 'luas',
                    hideable: false,
                    text: 'HGB Induk Luas'
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
                        text: 'Select HGB Induk'
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