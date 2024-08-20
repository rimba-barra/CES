Ext.define('Erems.controller.Approvalpricelistopen', {
	extend : 'Erems.library.template.controller.Controllerpopup',
	alias  : 'controller.Approvalpricelistopen',
	views  : ['approvalpricelistopen.Panel', 'approvalpricelistopen.Grid', 'approvalpricelistopen.FormData'],
	stores : ['Approvalpricelistopen'],
	models : ['Approvalpricelist'],
	refs   : [
		{
			ref      : 'grid',
			selector : 'approvalpricelistopengrid'
		},
		{
			ref      : 'formdata',
			selector : 'approvalpricelistopenformdata'
		}
	],
	controllerName : 'approvalpricelistopen',
	fieldName      : '',
	bindPrefixName : 'Approvalpricelistopen',
	formWidth      : 650,
	init           : function (application) {
		var me = this;
		this.control({
			'approvalpricelistopenpanel': {
				beforerender : me.mainPanelBeforeRender,
				afterrender  : this.panelAfterRender
			},
			'approvalpricelistopengrid': {
				afterrender  : this.gridAfterRender,
				itemdblclick : this.gridItemDblClick,
			},
			'approvalpricelistopengrid actioncolumn': {
				afterrender : this.gridActionColumnAfterRender,
				click       : this.gridActionColumnClick,
			},
			'approvalpricelistopenformdata': {
				afterrender: this.formDataAfterRender
			},
			'approvalpricelistopenformdata button[action=approve]': {
				click : function(){
					me.approve_reject('APPROVE');
				}
			},
			'approvalpricelistopenformdata button[action=reject]': {
				click : function(){
					var me = this;
					Ext.create('Ext.window.Window', {
						title       : 'Confirm',
						frame       : true,
						autoScroll  : true,
						anchorSize  : 100,
						bodyBorder  : true,
						bodyPadding : 10,
						width       : 350,
						modal       : true,
						items       : [
							{xtype: 'label', text: 'Silahkan masukan alasan penolakan', padding: '10px 10px 0 10px', labelWidth : '100%'},
							{
								xtype   : 'panel', 
								padding : '0 10px 10px 10px',
								items   : [
									{
										padding   : '0 0 0 0',
										layout    : 'hbox',
										bodyStyle : 'border:0px',
										items     : [
											{
												xtype      : 'xnotefieldEST',
												fieldLabel : '',
												name       : 'notes_reject',
												flex       : 1,
											}
										]
									}
								]
							}
						],
						dockedItems: [
							{
								xtype  : 'toolbar',
								dock   : 'bottom',
								ui     : 'footer',
								layout : { type : 'hbox'},
								items  : [
									'->',
									{
										xtype   : 'button',
										itemId  : 'btnSave',
										padding : 5,
										width   : 75,
										iconCls : 'icon-save',
										text    : 'Save',
										handler : function () {
											me.approve_reject('REJECT', this.up('window').down('[name=notes_reject]').getValue());
											this.up('window').close();
										}
									},
									{
										xtype   : 'button',
										action  : 'cancel',
										itemId  : 'btnCancel',
										padding : 5,
										width   : 75,
										iconCls : 'icon-cancel',
										text    : 'Cancel',
										handler : function () {
											this.up('window').close();
										}
									}
								]
							}
						]
					}).show();
				}
			},
		});
	},
	panelAfterRender : function(el){
		Ext.get('WINDOW-mnu' + this.bindPrefixName).setWidth(720);
	},
	gridAfterRender : function(){
		this.callParent(arguments);

		var me = this;
		if(getCookie("module_menu")){
			var gr           = me.getGrid();
			var gs           = gr.getStore();
			var module_menu  = Ext.JSON.decode(atob(decodeURIComponent(getCookie("module_menu"))));
			var pricelist_id = typeof module_menu.data != 'undefined' ? module_menu.data.pricelist_id : 0;

			var tMo = setTimeout(function(){
				if(pricelist_id > 0){
					var indx = 0;
					gs.each(function (rec, idx) {
						if(rec.get('pricelist_id') == pricelist_id){
							indx = idx;
						}
					});
					gr.getSelectionModel().select(indx);
					me.formDataShow('read');
				}

				deleteCookie("module_menu");
				clearTimeout(tMo);
			}, 500);
		}
	},
	gridItemDblClick: function(el, record, item, index, e, eOpts) {
		var me = this;
		me.formDataShow('read');
	},
	gridActionColumnAfterRender: function(el) {
		var me = this, actitem = el.items, gr = me.getGrid();
		Ext.each(actitem, function(item, index) {
			if (item.iconCls === 'icon-search') {
				item.getClass = function(v, meta, rec) {
					var icn = item.iconCls;
					if(apps.uid == rec.get('next_action_user_id')){
						icn = 'icon-revision';
					}
					return 'ux-actioncolumn ' + icn + ' act-read';
				}
			}
		});
	},
	formDataAfterRender: function (el) {
		var me  = this;
		var rec = me.getGrid().getSelectedRecord();
		me.getHtmlemail(rec);
	},
	getHtmlemail : function(rec){
		var me  = this;
		Ext.Ajax.request({
			url     : 'erems/approvalpricelist/read',
			params  : {mode_read : "getHtmlemail", pricelist_id : rec.get('pricelist_id'), 'status' : rec.get('doc_status')},
			success : function (rsp) {
				me.getFormdata().down('[name=pricelist_id]').setValue(rec.get('pricelist_id'));
				me.getFormdata().down('[name=project_name]').setValue(rec.get('project_name'));
				me.getFormdata().down('[name=status]').setValue(rec.get('status'));
				if(rec.get('doc_status') == 'APPROVE'){	
					me.getFormdata().down('[name=status]').setFieldStyle({'background-color' : '#00FF08', 'color' : '#000000'});
				}
				else if(rec.get('doc_status') == 'REJECT'){
					me.getFormdata().down('[name=status]').setFieldStyle({'background-color' : '#ff0000', 'color' : '#FFFFFF'});
				}

				var res = Ext.decode(rsp.responseText);
				if(res.success){
					me.getFormdata().down('#info').body.setHTML(Ext.decode(res.html))

					var panelID = me.getFormdata().down('#info').up().id + '-innerCt';
					me.getFormdata().down('#boxInfo').setHeight(me.getFormdata().down('#boxInfo').getHeight() + me.getFormdata().down('#info').getHeight() - $('#'+panelID).height());

					if(res.show_btn){
						me.getFormdata().down('toolbar').add(
							{xtype: 'splitter', width : 350},
							{
								xtype      : 'button',
								action     : 'approve',
								itemId     : 'btnApprove',
								padding    : 5,
								width      : 'auto',
								iconCls    : 'icon-approve',
								text       : 'Approve'
							},
							{xtype: 'splitter', width: 2},
							{
								xtype   : 'button',
								action  : 'reject',
								itemId  : 'btnReject',
								padding : 5,
								width   : 75,
								iconCls : 'icon-unapprove',
								text    : 'Reject',
							},
						);
					}
				}
				me.getFormdata().up('window').body.unmask();
			},
			failure : function (e) {
				me.getFormdata().up('window').body.unmask();
				Ext.Msg.show({
					title   : 'Failure',
					msg     : 'Error: Informasi Data Pricelist Gagal.',
					icon    : Ext.Msg.ERROR,
					buttons : Ext.Msg.OK
				});
			}
		});
	},
	approve_reject : function(status, notes=''){
		var me = this, fd = me.getFormdata();

		fd.up('window').body.mask('Proses ' + status + ' Pricelist, Please Wait...');

		Ext.Ajax.request({
			url     : 'erems/approvalpricelist/read',
			params  : {
				mode_read    : "update_status", 
				pricelist_id : fd.down('[name=pricelist_id]').getValue(), 
				status       : status, 
				rejectNotes  : notes
			},
			success : function (rsp) {
				me.getFormdata().up('window').body.unmask();

				var res = Ext.decode(rsp.responseText);

				if(res.success){
					Ext.Msg.show({
						title   : 'Information',
						msg     : res.msg,
						icon    : Ext.Msg.INFO,
						buttons : Ext.Msg.OK,
						fn      : function () {
							me.getFormdata().up('window').close();

							setCookie('module_menu', btoa(Ext.JSON.encode({controller : 'Approvalpricelistopen'})));
							window.location.reload();
						}
					});	
				}
				else{
					Ext.Msg.show({
						title   : 'Failure',
						msg     : res.msg,
						icon    : Ext.Msg.ERROR,
						buttons : Ext.Msg.OK,
						fn      : function () {
							me.getFormdata().up('window').close();
							var gridDepan = me.getGrid();
							var storeDepan = gridDepan.getStore();
							storeDepan.reload();
						}
					});	
				}
			},
			failure : function (e) {
				me.getFormdata().up('window').body.unmask();
				Ext.Msg.show({
					title   : 'Failure',
					msg     : 'Error: Informasi Data Pricelist Gagal ' + status + '.',
					icon    : Ext.Msg.ERROR,
					buttons : Ext.Msg.OK
				});
			}
		});
	},
});