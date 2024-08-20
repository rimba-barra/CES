Ext.define('Erems.controller.Approvalpricelistapprove', {
	extend : 'Erems.library.template.controller.Controllerpopup',
	alias  : 'controller.Approvalpricelistapprove',
	views  : ['approvalpricelistapprove.Panel', 'approvalpricelistapprove.Grid', 'approvalpricelistapprove.FormData'],
	stores : ['Approvalpricelistapprove'],
	models : ['Approvalpricelist'],
	refs   : [
		{
			ref      : 'grid',
			selector : 'approvalpricelistapprovegrid'
		},
		{
			ref      : 'formdata',
			selector : 'approvalpricelistapproveformdata'
		}
	],
	controllerName : 'approvalpricelistapprove',
	fieldName      : '',
	bindPrefixName : 'Approvalpricelistapprove',
	formWidth      : 650,
	init           : function (application) {
		var me = this;
		this.control({
			'approvalpricelistapprovepanel': {
				beforerender : me.mainPanelBeforeRender,
				afterrender  : this.panelAfterRender
			},
			'approvalpricelistapprovegrid': {
				afterrender  : this.gridAfterRender,
				itemdblclick : this.gridItemDblClick,
			},
			'approvalpricelistapprovegrid actioncolumn': {
				afterrender : this.gridActionColumnAfterRender,
				click       : this.gridActionColumnClick,
			},
			'approvalpricelistapproveformdata': {
				afterrender: this.formDataAfterRender
			},
		});
	},
	panelAfterRender : function(el){
		Ext.get('WINDOW-mnu' + this.bindPrefixName).setWidth(720);
	},
	gridItemDblClick: function(el, record, item, index, e, eOpts) {
		var me = this;
		me.formDataShow('read');
	},
	gridActionColumnAfterRender: function(el) {
		var me = this, actitem = el.items;
		Ext.each(actitem, function(item, index) {
			if (item.iconCls === 'icon-search') {
				item.getClass = function(v, meta, rec) {
					return 'ux-actioncolumn ' + item.iconCls + ' act-read';
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
});