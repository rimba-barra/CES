Ext.define('Erems.view.complaint.FormDataDetailSurat', {
	extend   : 'Erems.library.template.view.FormData',
	alias    : 'widget.complaintformdatadetailsurat',
	requires : [
		'Erems.library.template.component.Jenissuratcombobox',
		'Erems.library.template.component.Undangancombobox',
	],
	frame       : true,
	autoScroll  : true,
	anchorSize  : 100,
	height      : 350,
	bodyBorder  : true,
	bodyPadding : 10,
	bodyStyle   : 'padding:5px 5px 0',
	defaults    : {
		border : false,
		xtype  : 'panel',
		flex   : 1,
		layout : ''
	},
	initComponent : function () {
		var me = this;

		function dateOneYear() {
			var x = 12;
			var CurrentDate = new Date();
			CurrentDate.setMonth(CurrentDate.getMonth() + x);
			return CurrentDate;
		}

		Ext.applyIf(me, {
			items : [
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_aftersales_surat_id',
					name   : 'aftersales_surat_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_aftersales_id',
					name   : 'aftersales_id'
				},
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'Nomor Surat / Telpon', 
					collapsible : true,
					width       : '100%',
					items       : [
						{
							xtype     : 'panel',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype     : 'panel',
									width     : '100%',
									flex      : 3,
									bodyStyle : 'border:0px',
									items     : [  
										{
											xtype          : 'checkboxfield',
											anchor         : '100%',
											fieldLabel     : '',
											boxLabel       : 'Hadir',
											name           : 'is_hadir',
											inputValue     : 1,
											uncheckedValue : 0,
											hidden         : true,
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype            : 'jenissuratcombobox',
													fieldLabel       : 'Letter Type',
													itemId           : 'fd_jenissurat',
													id               : 'jenissurat',
													name             : 'jenis_surat',
													emptyText        : 'Please Select',
													anchor           : '-5',
													allowBlank       : false,
													enforceMaxLength : true,
													enableKeyEvents  : true,
													rowdata          : null,
													listeners        :{
														beforequery : function(record){
															record.query = new RegExp(record.query, 'i');
															record.forceAll = true;
														}
													}
												},
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype            : 'undangancombobox',
													fieldLabel       : 'Undangan',
													itemId           : 'fd_undangan',
													id               : 'undangan',
													name             : 'undangan',
													emptyText        : 'Please Select',
													anchor           : '-5',
													allowBlank       : false,
													editable         : false,
													enforceMaxLength : true,
													enableKeyEvents  : true,
													rowdata          : null,
													listeners        : {
														beforequery : function(record){
															record.query = new RegExp(record.query, 'i');
															record.forceAll = true;
														}
													}
												},
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Letter / Telp No.',
													anchor     : '-5',
													name       : 'surat_no',
													flex       : 1,
													allowBlank : false
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype        : 'datefield',
													fieldLabel   : 'Send Date',
													anchor       : '-5',
													name         : 'send_date',
													flex         : 1,
													allowBlank   : false,
													format       : 'd-m-Y',
													altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat : 'Y-m-d H:i:s.u'
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype        : 'datefield',
													fieldLabel   : 'Undangan Date',
													anchor       : '-5',
													name         : 'undangan_date',
													flex         : 1,
													allowBlank   : false,
													format       : 'd-m-Y',
													altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat : 'Y-m-d H:i:s.u'
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xnotefieldEST',
													fieldLabel : 'Keterangan',
													anchor     : '-5',
													name       : 'keterangan',
													flex       : 1,
												}
											]
										},
									]
								},
							]
						}
					]
				},
			],
			dockedItems: me.generateDockedItem()
		});

		me.callParent(arguments);
	}
});