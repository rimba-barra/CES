Ext.define('Erems.view.buktipemilik.BankGridAkad', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.buktipemilikbankgridakad',
    store: 'Bankkprakad',
   	bindPrefixName: 'Bankkprakad',
    newButtonLabel: 'Add New Confirmation',
    height: 150,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_akadconfirmation_index',
                    width: 100,
                    //align: 'right',
                    dataIndex: 'akadconfirmation_index',
					hideable: false,
                    text: 'Confirmation'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_akadconfirmation_date',
                    width: 100,
                    dataIndex: 'akadconfirmation_date',
                    hideable: false,
                    text: 'Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_akadconfirmation_status',
                    width: 150,
                    //align: 'right',
                    dataIndex: 'akadconfirmation_status',
					hideable: false,
                    text: 'Status'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_akadconfirmation_note',
                    width: 150,
                    //align: 'right',
                    dataIndex: 'akadconfirmation_note',
					hideable: false,
                    text: 'Notes'
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
                        //hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        disabled: true,
                        //bindAction: me.bindPrefixName+'Create',
                        text: me.newButtonLabel
                    }
                ]
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            //hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'center',//'right',
            hideable: false,
            items: [
                {
                    /*text: 'Edit',
                    iconCls: 'icon-edit',
                    //bindAction: me.bindPrefixName+'Update',
                    altText: 'Edit',
                    tooltip: 'Update'*/
					
					tooltip: 'Edit',
					icon: document.URL+'app/main/images/icons/edit.png',
					handler: function( view, rowIndex, colIndex, item, e, record, row ) {
						this.fireEvent( 'editaction', arguments );
						//console.log(arguments);
					}
                },
                {
                    /*text: 'Delete',
                    iconCls: 'icon-delete',
                    //bindAction: me.bindPrefixName+'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'*/
					
					tooltip: 'Delete',
					icon: document.URL+'app/main/images/icons/delete.png',
					handler: function( view, rowIndex, colIndex, item, e, record, row ) {
						this.fireEvent( 'deleteaction', arguments );
					}
                }
            ]
        };
        return ac;
    }
	
});