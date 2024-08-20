Ext.define('Erems.view.masterpbbinduk.browse.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.masterpbbindukbrowsegrid',
    store: 'Masterpbbinduk',
    bindPrefixName: 'Masterpbbinduk',
    
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
                    dataIndex: 'pbbinduk_id',
                    text: 'ID'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 150,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_nopinduk',
                    width: 150,
                    dataIndex: 'nopinduk',
                    hideable: false,
                    text: 'NOP Induk'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_kecamatan_id',
                    width: 150,
                    dataIndex: 'kecamatan_id',
                    hideable: false,
                    text: 'Kecamatan ID'
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
                        text: 'Select PBB Induk'
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