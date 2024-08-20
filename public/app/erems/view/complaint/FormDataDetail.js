Ext.define('Erems.view.complaint.FormDataDetail', {
	extend   : 'Erems.library.template.view.FormData',
	alias    : 'widget.complaintformdatadetail',
	requires :[
		'Erems.library.template.component.Complainttypecombobox',
		'Erems.library.template.component.Contractortbcombobox',
		'Erems.library.template.component.Employeecombobox',
		'Erems.view.complaint.DetailGridImages'
	],
	frame       : true,
	autoScroll  : true,
	anchorSize  : 100,
	height      : 560,
	bodyBorder  : true,
	bodyPadding : 10,
	bodyStyle   : 'padding:5px 5px 0',
	defaults    : {
		border : false,
		xtype  : 'panel',
		flex   : 1,
		layout : ''
	},
	initComponent: function() {
		var me = this;

		function dateOneYear(){
			var x = 12;
			var CurrentDate = new Date();
			CurrentDate.setMonth(CurrentDate.getMonth()+x);
			return CurrentDate;
		}

		Ext.applyIf(me, {
			items: [
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_aftersales_complaint_id',
					name   : 'aftersales_complaint_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_aftersales_id',
					name   : 'aftersales_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_unit_id',
					name   : 'unit_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_temp_id_detail',
					name   : 'temp_id_detail'
				},
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'DETAIL COMPLAINT', 
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
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Complaint No.',
													anchor     : '-5',
													name       : 'complaint_no',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
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
													fieldLabel   : 'Complaint Date',
													anchor       : '-5',
													name         : 'complaint_date',
													flex         : 1,
													allowBlank   : false,
													value        : new Date(),
													format       : 'd-m-Y',
													altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat : 'Y-m-d H:i:s.u'
												}, 
												{xtype : 'splitter', width: 20},
												{
													xtype      : 'employeecombobox',
													anchor     : '-5',
													itemId     :'fd_employeecombobox',
													flex       : 1,
													fieldLabel : 'Pengawas',
													name       : 'pengawas_id',
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'complainttypecombobox',
													anchor     : '-5',
													itemId     :'fd_complainttype',
													flex       : 1,
													fieldLabel : 'Complaint Type',
													name       : 'complainttype_id',
													allowBlank : false
												}, 
												{xtype : 'splitter', width: 20},
												{
													xtype      : 'contractortbcombobox',
													anchor     : '-5',
													itemId     :'fd_contractor',
													flex       : 1,
													fieldLabel : 'Contractor',
													name       : 'contractor_id',
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xnumericfieldEST',
													fieldLabel : 'Working Estimation',
													anchor     : '-5',
													name       : 'estimation',
													width      : '30%',
													labelWidth : 120,
													allowBlank : false,
													maxLength  : 10
												},
												{xtype : 'label', text: 'Days', flex: 1, margin: '0 0 0 5px'},
												{xtype : 'splitter', width: 5},
												{
													layout    : 'hbox',
													bodyStyle : 'border:0px',
													width     : '100%',
													flex      : 4,
													items     : [
														{
															xtype        : 'datefield',
															fieldLabel   : 'Start Date',
															anchor       : '-5',
															name         : 'start_date',
															labelWidth   : 70,
															width        : '49%',
															allowBlank   : false,
															format       : 'd-m-Y',
															altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
															submitFormat : 'Y-m-d H:i:s.u'
														},
														{xtype : 'splitter', width: 9}, 
														{
															xtype        : 'datefield',
															fieldLabel   : 'End Date',
															anchor       : '-5',
															name         : 'end_date',
															labelWidth   : 65,
															width        : '47%',
															allowBlank   : false,
															format       : 'd-m-Y',
															altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
															submitFormat : 'Y-m-d H:i:s.u'
														}
													]
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
													fieldLabel : 'Detail Complaint',
													anchor     : '-5',
													name       : 'detail_complaint',
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
				/* DETAIL IMAGES COMPLAINT */
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'DETAIL IMAGES COMPLAINT', 
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
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype  : 'complaintdetailgridimages',
													width  : '100%',
													itemId : 'MyDetailGridImages'
												}
											]
										}
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