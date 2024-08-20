Ext.define('Erems.view.masterhgbinduk.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masterhgbindukformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
	height: 600,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

		Ext.applyIf(me, {
            defaults: {
                //labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'hgbinduk_id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_hgbcode',
                    name: 'code',
                    fieldLabel: 'HGB / HPL Code',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[A-Za-z0-9\s\,\.\/\-]/,
                    maxLength: 50,
                    anchor: '-5',
					allowBlank: false
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_hgbindukno',
                    name: 'hgbinduk',
                    fieldLabel: 'HGB / HPL No.',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[A-Za-z0-9\s\,\.\/\-]/,
                    maxLength: 50,
                    anchor: '-5',
					allowBlank: false
                },
				{
					xtype: 'datefield',
					fieldLabel: 'HGB / HPL Date',
					anchor: '-5',
					name: 'date',
					flex: 1,
					format: 'd-m-Y',
					altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
					submitFormat: 'Y-m-d H:i:s.u',
					allowBlank: false,
					editable:false
				},
				{
					xtype      : 'xgeneralfieldEST',
					itemId     : 'fdms_desa',
					name       : 'desa',
					fieldLabel : 'Desa',
					anchor     : '-5',
					maxLength  : 50,
					allowBlank : false,
                },
				{
                    xtype: 'textfield',
                    itemId: 'fdms_gs',
                    name: 'gs',
                    fieldLabel: 'GS No.',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[A-Za-z0-9\s\,\.\/\-]/,
                    maxLength: 50,
                    anchor: '-5',
					allowBlank: false
                },
				{
					xtype: 'datefield',
					fieldLabel: 'GS Date',
					anchor: '-5',
					name: 'gs_date',
					flex: 1,
					format: 'd-m-Y',
					altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
					submitFormat: 'Y-m-d H:i:s.u',
					allowBlank: false,
					editable:false
				},
				{
					xtype      : 'xnumericfieldEST',
					itemId     : 'fdms_luas',
					name       : 'luas',
					fieldLabel : 'Land Size',
					allowBlank : false,
					maxLength  : 50,
					anchor     : '-5',
					allowBlank : false
                },
				{
					xtype      : 'xnumericfieldEST',
					itemId     : 'fdms_kecamatan_id',
					name       : 'kecamatan_id',
					fieldLabel : 'Kecamatan ID',
					anchor     : '-5',
					maxLength  : 50,
                },{
                    xtype: 'textfield',
                    itemId: 'fdms_nop_induk',
                    name: 'nop_induk',
                    fieldLabel: 'NOP Induk',
                    enforceMaxLength: true,
                    maskRe: /[A-Za-z0-9\s\,\.\/\-]/,
                    maxLength: 100,
                    anchor: '-5'
                },
				/*{
                    xtype: 'kecamatancombobox',
                    itemId: 'fdms_kecamatan_id',
                    name: 'kecamatan_id',
                    anchor:'-15'

                },*/
				{
					xtype: 'fieldset',
					bodyPadding: 10, 
					width: '100%',
					title: 'Additional Information',
					items: [
						{
							xtype: 'checkboxfield',
							boxLabel: 'HPL',
							itemId: 'is_hpl',											
							name: 'is_hpl',
							inputValue: '1',
							uncheckedValue: '0',
						},
						{
							padding: '5px 0 0 0',
							layout: 'hbox',
							bodyStyle: 'border:0px',
							items: [{
									xtype: 'datefield',
									fieldLabel: 'Tgl Jatuh Tempo',
									anchor: '-5',
									name: 'jatuhtempo_date',
									flex: 1,
									format: 'd-m-Y',
									altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
									submitFormat: 'Y-m-d H:i:s.u',
									editable:false
								}, {
									xtype: 'splitter', width: 20,
								}, {
									xtype: 'textfield',
									fieldLabel: 'Sisa Luas',
									anchor: '-5',
									name: 'luas_sisa',
									flex: 1,
									maskRe: /[0-9\.]/
								}]
						},
						{
							padding: '5px 0 0 0',
							layout: 'hbox',
							bodyStyle: 'border:0px',
							items: [{
									xtype: 'textfield',
									fieldLabel: 'Akta No',
									anchor: '-5',
									name: 'akta_no',
                   					maskRe: /[A-Za-z0-9\s\,\.\/\-]/,
									flex: 1,
									enforceMaxLength:true,
									maxLength:50
								}, {
									xtype: 'splitter', width: 20,
								}, {
									xtype: 'textfield',
									fieldLabel: 'NIB No',
									anchor: '-5',
									name: 'nib_no',
                   					maskRe: /[A-Za-z0-9\s\,\.\/\-]/,
									flex: 1,
									enforceMaxLength:true,
									maxLength:50
								}]
						},
						{
							padding: '5px 0 0 0',
							layout: 'hbox',
							bodyStyle: 'border:0px',
							items: [{
									xtype:'combobox',
									fieldLabel:'Project Name',
									itemId:'project_id_owner',
									name:'project_id_owner',
									displayField:'project_name',
									valueField:'project_id',
									queryMode:'local',
									anchor: '-5',
									flex: 1,
				                    typeAhead: true,
				                    queryMode: 'local',
				                    lastQuery: '',
				                    forceSelection:true,
				                    listeners:{
				                        beforequery: function(record){
				                            record.query = new RegExp(record.query, 'i');
				                            record.forceAll = true;
				                        }
				                    }
								}]
						},
						{
							padding: '5px 0 0 0',
							layout: 'hbox',
							bodyStyle: 'border:0px',
							items: [{
									xtype:'combobox',
									fieldLabel:'PT Name',
									itemId:'pt_id_owner',
									name:'pt_id_owner',
									displayField:'pt_name',
									valueField:'pt_id',
									queryMode:'local',
									anchor: '-5',
									flex: 1,
									readOnly:true,
				                    typeAhead: true,
				                    queryMode: 'local',
				                    lastQuery: '',
				                    forceSelection:true,
				                    listeners:{
				                        beforequery: function(record){
				                            record.query = new RegExp(record.query, 'i');
				                            record.forceAll = true;
				                        }
				                    }
								}]
						},
						{
							xtype: 'fieldset',
							bodyPadding: 10, 
							width: '100%',
							title: 'Lokasi Tanah',
							items: [
								{
									padding: '5px 0 0 0',
									layout: 'hbox',
									bodyStyle: 'border:0px',
									items: [
										{
											xtype      : 'xgeneralfieldEST',
											fieldLabel : 'Kelurahan',
											anchor     : '-5',
											name       : 'kelurahan',
											flex       : 1,
											maxLength  : 50
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
									padding   : '5px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'xgeneralfieldEST',
											fieldLabel : 'Kab / Kodya',
											anchor     : '-5',
											name       : 'kabupaten',
											flex       : 1,
											maxLength  : 50
										}
									]
								},
								{
									padding   : '5px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'xgeneralfieldEST',
											fieldLabel : 'Keterangan 1',
											name       : 'keterangan_1',
											anchor     : '-5',
											flex       : 1,
											maxLength  : 50
										}
									]
								},
								{
									padding   : '5px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'xgeneralfieldEST',
											fieldLabel : 'Keterangan 2',
											name       : 'keterangan_2',
											anchor     : '-5',
											flex       : 1,
											maxLength  : 50
										}
									]
								}
							]
						}
					]
				}
			],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

