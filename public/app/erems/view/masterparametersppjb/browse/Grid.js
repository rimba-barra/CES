Ext.define('Erems.view.masterparametersppjb.browse.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.masterparametersppjbbrowsegrid',
    store: 'Masterparametersppjb',
    bindPrefixName: 'Masterparametersppjb',
    
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
                    dataIndex: 'parametersppjb_id',
                    text: 'ID'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 50,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_name_01',
                    width: 100,
                    dataIndex: 'name_01',
                    hideable: false,
                    text: 'Nama 1'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_position_01',
                    width: 150,
                    dataIndex: 'position_01',
                    hideable: false,
                    text: 'Jabatan 1'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_name_02',
                    width: 100,
                    dataIndex: 'name_02',
                    hideable: false,
                    text: 'Nama 2'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_position_02',
                    width: 150,
                    dataIndex: 'position_02',
                    hideable: false,
                    text: 'Jabatan 2'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_akta_no',
                    width: 50,
                    align: 'right',
                    dataIndex: 'akta_no',
					hideable: false,
                    text: 'Akta No'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_akta_date',
                    width: 150,
                    dataIndex: 'akta_date',
					hideable: false,
                    text: 'Akta Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_account_name',
                    width: 150,
                    align: 'left',
                    dataIndex: 'account_name',
                    hideable: false,
                    text: 'Atas Nama'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_account_no',
                    width: 150,
                    align: 'left',
                    dataIndex: 'account_no',
                    hideable: false,
                    text: 'Nomor dan Bank'
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
                        text: 'Select Parameter'
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