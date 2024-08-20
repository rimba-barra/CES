Ext.define('Erems.view.pengumpulanberkas.GridSprDetail', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.pengumpulanberkasgridsprdetail',
    store: 'Pengumpulanberkasdetail',
   	//bindPrefixName: 'Bankkprakad',
    //newButtonLabel: 'Add New Confirmation',
    height: 200,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
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
                    itemId: 'colms_berkas_spr_detail_id',
                    dataIndex: 'berkas_spr_detail_id',
                    hidden: true,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    dataIndex: 'berkas_code',
                    hidden: true,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_berkas',
                    width: 150,
                    dataIndex: 'berkas_name',
                    hideable: false,
                    text: 'Berkas',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 200,
                    dataIndex: 'berkas_description',
                    hideable: false,
                    text: 'Keterangan'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_status',
                    width: 100,
                    dataIndex: 'berkas_status',
                    hideable: false,
                    text: 'Status'
                }
		
//		me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
	
	generateDockedItems: function() {
		
        var me = this;

        var dockedItems = [
            /*{
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
                        bindAction: me.bindPrefixName+'Create',
                        text: me.newButtonLabel
                    }
                ]
            },*/
            /*{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }*/
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
            align: 'center',
            hideable: false,
            items: [
                
                {   tooltip: 'Edit',
					icon: document.URL+'app/main/images/icons/edit.png',
					handler: function( view, rowIndex, colIndex, item, e, record, row ) {
						this.fireEvent( 'editaction', arguments );
						//console.log(arguments);
					}
                },
                
                {
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