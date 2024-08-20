Ext.define('Gl.view.kodeprefix.Grid',{
    extend:'Gl.library.template.view.Grid',
    alias:'widget.kodeprefixgrid',
    store:'Kodeprefix',
    bindPrefixName:'Kodeprefix',
   // itemId:'',
    newButtonLabel:'Add New',
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
                /*
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_prefix_id',
                    width: 50,
                    align: 'right',
                    dataIndex: 'prefix_id',
                    text: 'ID'
                },
                */
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_prefix',
                    width: 150,
                    dataIndex: 'prefix',
                    hideable: false,
                    text: 'Kode Prefix '
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 300,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },
                
                /*
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_is_cashflow',
                    width: 300,
                    dataIndex: 'is_cashflow',
                    hideable: true,
                    text: 'Cash Flow'
                },
                */
                
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cashflow',
                    width: 300,
                    dataIndex: 'cashflow',
                    hideable: false,                    
                    text: 'Cash Flow'
                },
                
                /*
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_is_cashier',
                    width: 300,
                    dataIndex: 'is_cashier',
                    hideable: true,
                    text: 'Cashier'
                },
                */
                
               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cashier',
                    width: 300,
                    dataIndex: 'cashier',
                    hideable: false,
                    text: 'Cashier'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_openmonth',
                    width: 300,
                    dataIndex: 'openmonth',
                    hideable: false,
                    text: 'Open Month'
                },
                
                
				
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});


