Ext.define('Erems.view.salesdireksireport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.salesdireksireportformdata',
    ////// added by erwin.st 20052021
    requires: [
		'Erems.library.template.component.Projectptcombobox',

		//added by anas 09062021
		'Erems.library.template.component.Clustercombobox'
    ],
    // requires: [],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
	width: 700,
	//height: 300,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

		var dateNow = new Date();

		var tahun = [];
		tahunAwal = 2000;
		while (tahunAwal<=2100){
			 tahun.push([tahunAwal]);
			 tahunAwal++;
		}
		
		var bulan = [];
		bulanAwal = 1;
		while (bulanAwal<=12){
			 bulan.push([bulanAwal]);
			 bulanAwal++;
		}
		
		var tanggal = [];
		tglAwal = 1;
		while (tglAwal<=31){
			 tanggal.push([tglAwal]);
			 tglAwal++;
		}
	
		var tahunStore = new Ext.data.SimpleStore
		({
			  fields : ['tahun'],
			  data : tahun
		});
		
		var bulanStore = new Ext.data.SimpleStore
		({
			  fields : ['bulan'],
			  data : bulan
		});
		
		var tanggalStore = new Ext.data.SimpleStore
		({
			  fields : ['tanggal'],
			  data : tanggal
		});

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            items: [
				{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
						{
							xtype: 'radiogroup',
							width: 650,
							fieldLabel: 'Report Type',
							name: 'radiogroup_reporttype',
							items: [
								{
									xtype: 'radiofield',
									boxLabel: 'Detail',
									name: 'radio_reporttype',
									inputValue: 'detail',
									itemId: 'detail',
									checked: true
								},
								{
									xtype: 'radiofield',
									boxLabel: 'Summary',
									name: 'radio_reporttype',
									inputValue: 'summary', 
									itemId: 'summary'
								},
								{
									xtype: 'radiofield',
									boxLabel: 'Summary Daily Format',
									name: 'radio_reporttype',
									width: 150,
									inputValue: 'summary2', 
									itemId: 'summary2'
								},
								// added by rico 18052022
								{
									xtype: 'radiofield',
									boxLabel: 'Penjualan Netto (SH3A)',
									name: 'radio_reporttype',
									width: 200,
									inputValue: 'penjualan_netto', 
									itemId: 'penjualan_netto'
								},
								
								/* report surabaya
								{
									xtype: 'radiofield',
									boxLabel: '1 Year Target',
									name: 'radio_reporttype',
									inputValue: 'summary_target', 
									itemId: 'summary_target',
										  listeners: {
						                          change : function(cb, value) {
						                                if (value) {
						                                	Ext.ComponentQuery.query('#bulan')[0].hide();
						                                	Ext.ComponentQuery.query('#tanggal')[0].hide();
						                                }else{
						                                	Ext.ComponentQuery.query('#bulan')[0].show();
						                                	Ext.ComponentQuery.query('#tanggal')[0].show();
						                                }
						                           }
						                     }
								}
								*/
							]
						}
                    ]
                },
				{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
							xtype: 'datefield',
							itemId: 'periode_startdate',
							name: 'periode_startdate',
							fieldLabel: 'Periode Date',
							labelSeparator:'',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							value: new Date()
						},
						{
							xtype: 'label',
							styleHtmlContent: false,
							width: 5,
							text:'to'
						},
						{
							xtype: 'datefield',
							itemId: 'periode_enddate',
							name: 'periode_enddate',
							labelSeparator:'',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							value: new Date()
						}
                    ]
                },
                ////// added by erwin.st 20052021
                {
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					items: [
						{
							xtype: 'projectptcombobox',
							name: 'pt_id',
							fieldLabel: 'Unit PT Name',
							valueField: 'pt_id',
							reportParams: true,
							width: '80%',
                            forceSelection:true,
                            listeners:{
                                beforequery: function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                }
                            }
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_pt_id',
							checked: true,
							inputValue: '1',
							uncheckedValue: '0',
							margin: '0 5px 0 0',
							width: 20
						},
						{
							xtype: 'label',
							text: 'ALL'
						}
					]
				}

				// {
                    // xtype: 'container',
                    // layout: 'vbox',
                    // margin: '0 0 5px 0',
                    // defaults: {
                        // margin: '0 0 5px 0'
                    // },
                    // items: [
                        // {
							// xtype : 'combo',
							// itemId : 'tahun',
							// name: 'tahun',
							// fieldLabel : 'Tahun',
							// store : tahunStore,
							// queryMode : 'local',
							// displayField : 'tahun',
							// valueField : 'tahun',
							// editable : true,
							// typeAhead: true,
							// value: dateNow.getFullYear(),
							// allowBlank: false
						// },
						// {
							// xtype : 'combo',
							// itemId : 'bulan',
							// name: 'bulan',
							// fieldLabel : 'Bulan',
							// store : bulanStore,
							// queryMode : 'local',
							// displayField : 'bulan',
							// valueField : 'bulan',
							// editable : true,
							// typeAhead: true,
							// value: dateNow.getMonth()+1
						// },
						// {
							// xtype : 'combo',
							// itemId : 'tanggal',
							// name: 'tanggal',
							// fieldLabel : 'Tanggal',
							// store : tanggalStore,
							// queryMode : 'local',
							// displayField : 'tanggal',
							// valueField : 'tanggal',
							// editable : true,
							// typeAhead: true,
							// value: dateNow.getDate()
						// }
                    // ]
                // }

                //added by anas 09062021
				,
                {
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					items: [
						{
							xtype: 'clustercombobox',
							name: 'cluster_id',
							fieldLabel: 'Cluster / Tower',
							valueField: 'cluster_id',
							reportParams: true,
							width: '80%',
                            forceSelection:true,
                            listeners:{
                                beforequery: function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                }
                            }

							// xtype: 'combobox',
       //                      name: 'cluster_id',
       //                      fieldLabel: 'Cluster / Tower',
       //                      displayField: cbf.cluster.d,
       //                      valueField: cbf.cluster.v,
       //                      reportParams: true
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_cluster_id',
							checked: true,
							inputValue: '1',
							uncheckedValue: '0',
							margin: '0 5px 0 0',
							width: 20
						},
						{
							xtype: 'label',
							text: 'ALL'
						}
					]
				}
            ]

        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'process',
                        itemId: 'btnSearch',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-search',
                        text: 'Process'
                    },
                    {
                        xtype: 'button',
                        action: 'reset',
                        itemId: 'btnReset',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-reset',
                        text: 'Reset'
                    }
                ]
            }
        ];
        return dockedItems;
    }
});

