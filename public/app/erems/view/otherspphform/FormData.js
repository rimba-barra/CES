Ext.define('Erems.view.otherspphform.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.otherspphformformdata',
    requires: [],
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
							fieldLabel: 'Form Type',
							name: 'radiogroup_formtype',
							items: [
								{
									xtype: 'radiofield',
									boxLabel: 'Download PPH Form',
									name: 'radio_formtype',
									inputValue: 'download',
									itemId: 'download'
								},
								{
									xtype: 'radiofield',
									boxLabel: 'Import PPH',
									name: 'radio_formtype',
									inputValue: 'import', 
									itemId: 'import'
								},
								
							],
							/*listeners: {
							        change: function(newValue) {
							        	 var value = newValue.radio_formtype;
							        	  var me = Otherspphform;
							        	  console.log(me); return false;
        									 var f = me.getFormdata();
							            if (Ext.isArray(value)) {
							                return;
							            }
							            if (value == 'import') {
							            	
        									  f.down("#periode_startdate").setVisible(true);
            									f.down("#periode_enddate").setVisible(true);
							              //  alert('tes');
							            }
							        }
							    } */
							    
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
							fieldLabel: 'Payment Date',
							labelSeparator:'',
							editable: false,
							hidden: true,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							value: new Date()
						},
						{
							xtype: 'datefield',
							itemId: 'periode_enddate',
							name: 'periode_enddate',
							fieldLabel: 'to',
							labelSeparator:'',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							hidden: true,
							value: new Date()
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
							xtype: 'filefield',
							itemId: 'excel_filename',
							emptyText: 'Select File',
							fieldLabel: 'Excel File',
							name: 'excel_filename',
							buttonText: 'Browse',
							allowBlank: false,
							hidden: true
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
                        action: 'processexcel',
                        itemId: 'process',
                        padding: 5,
                        width: 125,
                        iconCls: 'icon-search',
                        text: 'Process to Excel',
                        hidden:true
                    },
                     {
                        xtype: 'button',
                        action: 'upload',
                        itemId: 'upload',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-search',
                        text: 'Upload',
                        hidden:true
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

