Ext.define('Erems.view.masterhgbinduk.Grid',{
    extend:'Erems.library.template.view.Grid',
    alias:'widget.masterhgbindukgrid',
    store:'Masterhgbinduk',
    bindPrefixName:'Masterhgbinduk',
   // itemId:'',
    newButtonLabel:'New HGB Induk',
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
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Print',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
                    },
                    {
                        xtype: 'button',
                        action: 'export_excel',
                        itemId: 'btnPrint',
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
    },
    
});


