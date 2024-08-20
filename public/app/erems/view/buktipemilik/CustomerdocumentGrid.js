Ext.define('Erems.view.buktipemilik.Customerdocumentgrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.buktipemilikcustomerdocumentgrid',
    store: 'Mastercustomerdocument',
    requires: [
        //'Erems.library.template.component.Sourcemoneycombobox'
    ],
    height: 100,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'rownumberer'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_filename',
                    width: 150,
                    dataIndex: 'filename',
                    hideable: false,
                    text: 'File Name'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_documenttype_documenttype',
                    width: 150,
                    dataIndex: 'documenttype_documenttype',
                    hideable: false,
                    text: 'Document Type'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 150,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },
				
				me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
	
	generateActionColumn: function() {
		var me = this;
        var ac = {
            xtype: 'actioncolumn',
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'center',
            hideable: false,
            items: [
                {
                    tooltip: 'Download',
					icon: document.URL+'app/main/images/icons/search.png',
					handler: function( view, rowIndex, colIndex, item, e, record, row ) {
						this.fireEvent( 'downloadaction', arguments );
					}
                }
            ]
        };
        return ac;
    },
});