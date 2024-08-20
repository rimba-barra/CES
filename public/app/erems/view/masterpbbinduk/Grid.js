Ext.define('Erems.view.masterpbbinduk.Grid',{
    extend:'Erems.library.template.view.Grid',
    alias:'widget.masterpbbindukgrid',
    store:'Masterpbbinduk',
    bindPrefixName:'Masterpbbinduk',
   // itemId:'',
    newButtonLabel:'New PBB Induk',
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
                    text: 'PBB Induk'
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
				
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});


