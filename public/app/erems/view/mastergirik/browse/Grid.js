Ext.define('Erems.view.mastergirik.browse.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.mastergirikbrowsegrid',
    store: 'Mastergirik',
    bindPrefixName: 'Mastergirik',
    
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
                    dataIndex: 'girik_id',
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
                    itemId: 'colms_hgbinduk',
                    width: 150,
                    dataIndex: 'girik_no',
                    hideable: false,
                    text: 'Girik No.'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_date',
                    width: 100,
                    dataIndex: 'girik_date',
                    hideable: false,
                    text: 'Girik Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_luas',
                    width: 100,
                    dataIndex: 'luas',
                    hideable: false,
                    text: 'Luas'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_pemilik',
                    width: 150,
                    dataIndex: 'pemilik',
                    hideable: false,
                    text: 'Pemilik'
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
                        text: 'Select Girik'
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