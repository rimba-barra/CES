Ext.define('Erems.view.mastergirik.FormData', {
	extend: 'Main.library.FormData',
	
	alias: 'widget.MastergirikFormData',
	itemId: 'MastergirikFormData',
	
	width: 800,
	//height: 600,

	initComponent: function() {
		var me = this;
        Ext.applyIf(me, {
			items: [
				{
                    xtype: 'hiddenfield',
                    itemId: 'girik_id',
                    name: 'girik_id'
				},
				{xtype: 'panel', bodyPadding: 10, title: 'GIRIK INFORMATION', collapsible: true,
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    flex: 3,
                                    bodyStyle: 'border:0px',
                                    items: [
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Kode',
													allowBlank: false,
                                                    anchor: '-5',
                                                    name: 'code'
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Pemilik',
                                                    anchor: '-5',
                                                    name: 'pemilik',
													allowBlank: false,
                                                    flex: 1
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'No. KTP',
                                                    anchor: '-5',
                                                    name: 'ktp_no',
                                                    flex: 1
                                                }]
                                        },
										{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [{
                                                    xtype      : 'xaddressfieldEST',
                                                    fieldLabel : 'Alamat',
                                                    anchor     : '-5',
                                                    name       : 'alamat_pemilik',
                                                    flex       : 1
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'No. Girik',
                                                    anchor: '-5',
                                                    name: 'girik_no',
                                                    flex: 1,
													allowBlank: false
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tanggal',
                                                    anchor: '-5',
                                                    name: 'girik_date',
                                                    flex: 1,
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u'
                                                }]
                                        },
										{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [{
                                                    xtype      : 'xaddressfieldEST',
                                                    fieldLabel : 'Terletak di Jalan/Gang/RT',
                                                    anchor     : '-5',
                                                    name       : 'alamat',
                                                    flex       : 1
                                                }]
                                        },
										{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype      : 'xgeneralfieldEST',
                                                    fieldLabel : 'Kelurahan',
                                                    name       : 'kelurahan',
                                                    anchor     : '-5',
                                                    flex       : 1
                                                }, 
                                                {
                                                    xtype: 'splitter', width: 20,
                                                }, 
                                                {
                                                    xtype      : 'xgeneralfieldEST',
                                                    fieldLabel : 'Kecamatan',
                                                    name       : 'kecamatan',
                                                    anchor     : '-5',
                                                    flex       : 1
                                                }
                                            ]
                                        },
										{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype      : 'xgeneralfieldEST',
                                                    fieldLabel : 'Kota',
                                                    name       : 'kota',
                                                    anchor     : '-5',
                                                    flex       : 1
                                                }, 
                                                {
                                                    xtype: 'splitter', width: 20,
                                                }, 
                                                {
                                                    xtype      : 'textfield',
                                                    fieldLabel : 'Luas Tanah',
                                                    anchor     : '-5',
                                                    name       : 'luas',
                                                    flex       : 1,
                                                    maskRe     : /[0-9\.]/,
                                                    allowBlank : false
                                                }
                                            ]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Panjang',
                                                    anchor: '-5',
                                                    name: 'panjang',
													flex: 1,
													maskRe: /[0-9\.]/
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Lebar',
                                                    anchor: '-5',
                                                    name: 'lebar',
                                                    flex: 1,
													maskRe: /[0-9\.]/
                                                }]
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                },
				{xtype: 'panel', bodyPadding: 10, title: 'DETAIL HISTORI TANAH', collapsible: true,
                    width: '100%',
                    items: [
						{
							xtype: 'panel',
                            layout: 'fit',
                            bodyStyle: 'border:0px',
                            items: [
								{
									xtype: 'MastergirikDetailGrid',
									title: 'Detail Histori Tanah',
									height: 200,
									margin: '10 0 5 0'
								}
							]
						}
					]
				}
			]
		});
		me.callParent(arguments);
	}
});