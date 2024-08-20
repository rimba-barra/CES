Ext.define('Erems.controller.Revenuesharingprint', {
//	extend: 'Erems.library.template.controller.Controller',
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Revenuesharingprint',
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox'
	],
	views: ['revenuesharingprint.Panel', 'revenuesharingprint.Grid', 'revenuesharingprint.FormSearch'],
	stores: ['Revenuesharingprint', 'Mastercluster', 'Masterblock'],
	models: ['Revenuesharingprint'],
	refs: [
		{
			ref: 'grid',
			selector: 'revenuesharingprintgrid'
		},
		{
			ref: 'formsearch',
			selector: 'revenuesharingprintformsearch'
		}
	],
	controllerName: 'revenuesharingprint',
	fieldName: 'judul',
	bindPrefixName: 'Revenuesharingprint',
	formWidth: 780,
	m_pricetype: [],
	init: function (application) {
		var me = this;
		this.control({
			'revenuesharingprintpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'revenuesharingprintgrid': {
				afterrender: this.gridAfterRender,
////				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
//				selectionchange: this.gridSelectionChange
			},
			'revenuesharingprintgrid toolbar button[action=exportExcel]': {
				click: function (el) {
					this.docPrintExcel(el);
				}
			},
			'revenuesharingprintformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'revenuesharingprintformsearch button[action=search]': {
				click: this.dataSearch
			},
			'revenuesharingprintformsearch button[action=reset]': {
				click: this.dataReset
			},
		});
	},
	docPrintExcel: function (el) {
		var me = this;
		var fields = me.getFormsearch().getValues();
		console.log(fields);
//		return;
		el.up('window').body.mask('Creating Excel File, Please Wait...');
		Ext.Ajax.timeout = 60000 * 30;
		Ext.Ajax.disableCaching = true;
		Ext.Ajax.request({
			url: 'erems/revenuesharingprint/read',
			params: {
				mode_read: 'export_excel',
				block_id: fields.block_id,
				cluster_id: fields.cluster_id,
				customer_name: fields.customer_name,
				unit_number: fields.unit_number
			},
			success: function (response) {
				try {
					var resp = response.responseText;

					if (resp) {
						var info = Ext.JSON.decode(resp);

						if (info.success == true) {
							el.up('window').body.unmask();
							Ext.Msg.show({
								title: 'Info',
								msg: '<a href="' + info.url + '" target="blank">Click Here For Download Excel File</a>',
								icon: Ext.Msg.INFO,
								//buttons: [], //jika ingin tidak ada buttons
								buttons: Ext.Msg.CANCEL,
								buttonText:
										{
											cancel: 'Close',
										}
							});
						} else {
							el.up('window').body.unmask();
							Ext.Msg.show({
								title: 'Failure',
								msg: 'Error: Export to Excel Failed.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					}
				} catch (e) {
					//console.error(e);
					el.up('window').body.unmask();
					Ext.Msg.show({
						title: 'Failure',
						msg: 'Error: Export to Excel Failed.',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			},
			failure: function (e) {
				//console.error(e);
				el.up('window').body.unmask();
				Ext.Msg.show({
					title: 'Failure',
					msg: 'Error: Export to Excel Failed.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
	},
});
