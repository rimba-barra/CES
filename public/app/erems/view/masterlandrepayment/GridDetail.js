Ext.define('Erems.view.masterlandrepayment.GridDetail', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.masterlandrepaymentgriddetail',
    store: 'Masterlandrepaymentdetail',
   	//bindPrefixName: 'Bankkprakad',
    //newButtonLabel: 'Add New Confirmation',
    height: 150,
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
            selModel: { 
                listeners:{
                    // prevent selection of records with invalid descriptions
                    beforerowselect: function(selModel, rowIndex, keepExisting, record) {
                        if ((record.get('description_ok') != true)) {
                            return false;
                        }
                    },
                }        
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_nomor',
                    width     : 40,
                    align     : 'right',
                    dataIndex : 'nomor',
                    hideable  : false,
                    text      : 'No',
                    editor    : {
                        xtype : 'xnumericfieldEST',
					}
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_periode_awal',
                    width: 100,
                    dataIndex: 'periode_awal',
                    hideable: false,
                    text: 'Periode Awal',
					renderer: Ext.util.Format.dateRenderer('d-m-Y'),
					/* editor: {
						xtype: 'datefield',
						format: 'd-m-Y',
						altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
						submitFormat: 'Y-m-d H:i:s.u'
					} */
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_periode_akhir',
                    width: 100,
                    dataIndex: 'periode_akhir',
                    hideable: false,
                    text: 'Periode Akhir',
					renderer: Ext.util.Format.dateRenderer('d-m-Y'),
					/* editor: {
						xtype: 'datefield',
						format: 'd-m-Y',
						altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
						submitFormat: 'Y-m-d H:i:s.u'
					} */
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_nilai_pembayaran',
                    width: 150,
                    dataIndex: 'nilai_pembayaran',
                    hideable: false,
                    text: 'Nilai Pembayaran (Rp)',
					align: 'right',
					editor: {
						xtype: 'textfield',
						maskRe: /[0-9\.]/,
					}
                },
                //added by anas 04102021
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_efisiensi',
                    width: 100,
                    dataIndex: 'efisiensi',
                    hideable: false,
                    text: 'Efisiensi (%)',
                    align: 'right',
                    editor: {
                        xtype: 'textfield',
                        maskRe: /[0-9\.]/,
                    },
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_cogs_netto',
                    width: 150,
                    dataIndex: 'nilai_efisiensi',
                    hideable: false,
                    text: 'COGS Netto / m2',
                    align: 'right',
                    // renderer: function(val, meta, record, rowIndex) {
                    //    var total_cogs = record.get('nilai_pembayaran') / (record.get('efisiensi')/100);
                    //    return Ext.util.Format.currency(total_cogs, ' ', EREMS_GLOBAL_PRECISION);
                    // },
                },
				
				me.generateActionColumn()
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
                /*{
                   	tooltip: 'Edit',
					icon: document.URL+'app/main/images/icons/edit.png',
					handler: function( view, rowIndex, colIndex, item, e, record, row ) {
						this.fireEvent( 'editaction', arguments );
						//console.log(arguments);
					}
                },*/
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
	
	//generateDockedItems: function() {
//		
//        var me = this;
//
//        var dockedItems = [
//            {
//                xtype: 'toolbar',
//                dock: 'top',
//                height: 28,
//                items: [
//                    {
//                        xtype: 'button',
//                        action: 'create',
//                        //hidden: true,
//                        itemId: 'btnNew',
//                        margin: '0 5 0 0',
//                        iconCls: 'icon-new',
//                        //bindAction: me.bindPrefixName+'Create',
//                        text: me.newButtonLabel
//                    }
//                ]
//            }
//        ];
//        return dockedItems;
//    },
//    generateActionColumn: function() {
//        var me = this;
//        var ac = {
//            xtype: 'actioncolumn',
//            //hidden: true,
//            itemId: 'actioncolumn',
//            width: 50,
//            resizable: false,
//            align: 'center',//'right',
//            hideable: false,
//            items: [
//                {
//                    /*text: 'Edit',
//                    iconCls: 'icon-edit',
//                    //bindAction: me.bindPrefixName+'Update',
//                    altText: 'Edit',
//                    tooltip: 'Update'*/
//					
//					tooltip: 'Edit',
//					icon: document.URL+'app/main/images/icons/edit.png',
//					handler: function( view, rowIndex, colIndex, item, e, record, row ) {
//						this.fireEvent( 'editaction', arguments );
//						//console.log(arguments);
//					}
//                },
//                {
//                    /*text: 'Delete',
//                    iconCls: 'icon-delete',
//                    //bindAction: me.bindPrefixName+'Delete',
//                    altText: 'Delete',
//                    tooltip: 'Delete'*/
//					
//					tooltip: 'Delete',
//					icon: document.URL+'app/main/images/icons/delete.png',
//					handler: function( view, rowIndex, colIndex, item, e, record, row ) {
//						this.fireEvent( 'deleteaction', arguments );
//					}
//                }
//            ]
//        };
//        return ac;
//    }
	
});