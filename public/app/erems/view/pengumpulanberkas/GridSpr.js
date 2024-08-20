Ext.define('Erems.view.pengumpulanberkas.GridSpr',{
    extend:'Erems.library.template.view.Grid',
    alias:'widget.pengumpulanberkasgridspr',
    store:'Pengumpulanberkasspr',
//    store:'Pengumpulanberkas',
//    bindPrefixName:'Pengumpulanberkas',
   // itemId:'',
//    newButtonLabel:'New',
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
                    xtype: 'rownumberer',
                    width: 40,
                    resizable: true
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_spr_no',
                    width: 200,
                    dataIndex: 'spr_no',
                    text: 'Nomor SPr Berkas'
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_spr_index',
                    width: 200,
                    dataIndex: 'spr_index',
                    hideable: false,
                    text: 'SPr ke'
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_spr_date',
                    width: 200,
                    dataIndex: 'spr_date',
                    hideable: false,
                    text: 'Tanggal SPr Berkas',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_spr_next_date',
                    width: 200,
                    dataIndex: 'spr_next_date',
                    hideable: false,
                    text: 'Due Date SPr',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
		
                
				
//                me.generateActionColumn()
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
                        action: 'view_spr',
                        itemId: 'btnView',
                        margin: '0 5 0 0',
                        text: 'View',
                        disabled: true,
                        
                    },
                    {
                        xtype: 'button',
                        action: 'cetak_spr',
                        itemId: 'btnCetakSpr',
                        margin: '0 5 0 0',
                        text: 'Cetak SPr Berkas',
                        disabled: true,
                    },

                ]
            },
//            {
//                xtype: 'pagingtoolbar',
//                dock: 'bottom',
//                width: 360,
//                displayInfo: true,
//                store: this.getStore()
//            }
        ];
        return dockedItems;
    },

});


