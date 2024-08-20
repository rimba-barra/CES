Ext.define('Erems.view.masterfakturpajakcounter.Grid',{
    extend:'Erems.library.template.view.Grid',
    alias:'widget.masterfakturpajakcountergrid',
    store:'Masterfakturpajakcounter',
    bindPrefixName:'Masterfakturpajakcounter',
   // itemId:'',
    newButtonLabel:'New Faktur Pajak',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
			plugins: [
				Ext.create('Ext.grid.plugin.CellEditing', {
					ptype: 'cellediting',
					clicksToEdit: 1
				})
			],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_fakturpajak_counter_id',
                    width: 50,
                    align: 'right',
                    dataIndex: 'fakturpajak_counter_id',
                    text: 'ID'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_project_name',
                    width: 150,
                    dataIndex: 'project_name',
                    hideable: false,
                    text: 'Project Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_year',
                    width: 150,
                    dataIndex: 'year',
                    hideable: false,
                    text: 'Tahun',
					align: 'right',
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_counter',
                    width: 150,
                    dataIndex: 'counter',
                    hideable: false,
                    text: 'Last Counter',
					align: 'right',
					editor: {
						xtype: 'numberfield',
						allowBlank: false,
						minValue: 0
					}
                },
				
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});


