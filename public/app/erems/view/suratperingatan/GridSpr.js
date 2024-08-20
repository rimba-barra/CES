Ext.define('Erems.view.suratperingatan.GridSpr',{
    extend:'Erems.library.template.view.Grid',
    alias:'widget.suratperingatangridspr',
    store:'Suratperingatanspr',
//    store:'Suratperingatan',
//    bindPrefixName:'Suratperingatan',
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
                    width: 150,
                    dataIndex: 'suratperingatan_no',
                    text: 'Nomor'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_spr_date',
                    width: 100,
                    dataIndex: 'suratperingatan_date',
                    hideable: false,
                    text: 'SPr Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_spr_index',
                    width: 50,
                    dataIndex: 'suratperingatan_index',
                    hideable: false,
                    text: 'SPr ke'
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_spr_next_date',
                    width: 100,
                    dataIndex: 'suratperingatan_next_date',
                    hideable: false,
                    text: 'Plan Date',
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
                        text: 'View SPr',
                        disabled: true,
                        
                    },
                    {
                        xtype: 'button',
                        action: 'cetak_spr',
                        itemId: 'btnCetakSpr',
                        margin: '0 5 0 0',
                        text: 'Cetak SPr',
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


