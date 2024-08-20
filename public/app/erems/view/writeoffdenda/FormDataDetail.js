Ext.define('Erems.view.writeoffdenda.FormDataDetail', {
	extend      : 'Erems.library.template.view.FormData',
	alias       : 'widget.writeoffdendaformdatadetail',
	requires    : [],
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
	initComponent : function() {
		var me = this;

		function dateOneYear(){
			var x = 12;
			var CurrentDate = new Date();
			CurrentDate.setMonth(CurrentDate.getMonth()+x);
			return CurrentDate;
		}

		Ext.applyIf(me, {
			items : [
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_writeoffdetail_id',
					name   : 'writeoffdetail_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_writeoff_id',
					name   : 'writeoff_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_pl_id',
					name   : 'purchaseletter_id'
				},
				{ 
					xtype       : 'panel', 
					bodyPadding : 10, 
					// title       : 'DETAIL WRITE OFF', 
					// collapsible : true,
					width       : '100%',
					items       : [
						{
							xtype     : 'panel',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype     : 'container',
									width     : '100%',
									flex      : 3,
									bodyStyle : 'border:0px',
									items     : [
										{
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : '100%',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Schedule',
													anchor     : '-5',
													name       : 'schedule_id',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important; width : 260px;',
												}, 
												{
													xtype: 'splitter', width: 5,
												}, 
												{
													xtype   : 'button',
													text    : 'Browse',
													itemId  : 'fd_browse_schedule_btn',
													padding : '2px 5px',
													action  : 'browse_schedule',
													iconCls : 'icon-search',
													style   : 'background-color:#FFC000;',
													margin  : '0 70px 0 0'
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
													fieldLabel : 'Description',
													anchor     : '-5',
													name       : 'description',
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
													xtype      : 'textfield',
													fieldLabel : 'Type',
													anchor     : '-5',
													name       : 'scheduletype',
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
													xtype      : 'textfield',
													fieldLabel : 'Denda Amount',
													anchor     : '-5',
													name       : 'denda',
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
													xtype      : 'textfield',
													fieldLabel : 'Remaining Denda',
													anchor     : '-5',
													name       : 'remaining_denda',
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
													xtype   : 'label',
													text    : 'Write Off',
													padding : '2px 0',
											    },
												{
													xtype  : 'button',
													text   : 'Full',
													action : 'full_wo',
													style  : 'background-color:#FFC000;',
													margin : '0 10px 0 15px'
												},
												{
													xtype           : 'textfield',
													// fieldLabel      : 'Write Off',
													fieldLabel      : '',
													anchor          : '-5',
													name            : 'writeoff',
													flex            : 1,
													maskRe          : /[0-9\.]/,
													enableKeyEvents : true,
													currencyFormat  : true,
												},
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype          : 'textfield',
													fieldLabel     : 'After Write Off',
													anchor         : '-5',
													name           : 'after_writeoff',
													currencyFormat : true,
													flex           : 1,
													readOnly       : true,
													fieldStyle     : 'background:none;background-color:#F2F2F2 !important;'
												}
											]
										},
									]
								},
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