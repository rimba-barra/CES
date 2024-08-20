Ext.define('Erems.view.pengumpulanberkas.GridDetail', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.pengumpulanberkasgriddetail',
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
                    itemId: 'colms_berkas_id',
                    dataIndex: 'berkas_surat_id',
                    hidden: true,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_berkas_id',
                    dataIndex: 'berkas_id',
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
                    width: 150,
                    dataIndex: 'berkas_description',
                    hideable: false,
                    text: 'Keterangan'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_status',
                    width: 50,
                    dataIndex: 'berkas_status',
                    hideable: false,
                    text: 'Status'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_tgl_tambah',
                    width: 70,
                    dataIndex: 'tgl_tambah',
                    hideable: false,
                    text: 'Tanggal Tambah',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_user_tambah',
                    width: 70,
                    dataIndex: 'user_tambah',
                    hideable: false,
                    text: 'User Tambah'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_tgl_ubah',
                    width: 70,
                    dataIndex: 'tgl_ubah',
                    hideable: false,
                    text: 'Tanggal Ubah',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_user_ubah',
                    width: 70,
                    dataIndex: 'user_ubah',
                    hideable: false,
                    text: 'User Ubah'
                },
		
		me.generateActionColumn()
            ],
            bbar: [
                            '',
                        {
                            xtype: 'tbfill'
                        },
                            '',
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            hidden: false,
                            itemId: 'btnAdd',
                            margin: '0 5 0 0',
                            action: 'add_new',
                            iconCls: 'icon-new',
                            text: 'ADD NEW',
                        },
                        {
                            xtype: 'button',
                            hidden: false,
                            itemId: 'btnGenerate',
                            margin: '0 5 0 0',
                            action: 'generate',
                            iconCls: 'icon-new',
                            text: 'GENERATE BERKAS',
			}
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