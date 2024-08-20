Ext.define('Erems.controller.Legalescrowreport', {
	extend : 'Erems.library.template.controller.Controllerreporttb',
	alias  : 'controller.Legalescrowreport',
	views  : ['legalescrowreport.Panel', 'legalescrowreport.FormData', 'masterreport.Panel'],
	requires:[
        'Erems.library.template.component.Projectptcombobox'
	],
	stores : ['Sourcemoney','Masterdata.store.Projectpt'],
	models : ['Sourcemoney','Masterdata.model.Projectpt'],
	refs: [
		{
			ref      : 'panel',
			selector : 'legalescrowreportpanel'
		},
		{
			ref      : 'formdata',
			selector : 'legalescrowreportformdata'
		}

	],
	controllerName : 'legalescrowreport',
	formWidth      : 750,
	fieldName      : 'name',
	comboBoxIdEl   : [],
	bindPrefixName : 'Legalescrowreport',
	localStore     : {},
	project_name   : null,
	pt_name        : null,
	init           : function (application) {
		var me = this;
		this.control({
			'legalescrowreportpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'legalescrowreportformdata': {
				afterrender: this.formDataAfterRender
			},
			'legalescrowreportformdata button[action=save]': {
				click: this.mainDataSave
			},
			'legalescrowreportformdata button[action=process]': {
				click: function () {
					me.processReport();
				}
			},
			'legalescrowreportformdata button[action=reset]': {
				click: this.dataReset
			},
			'legalescrowreportformdata [name=cbf_buildingclass]': {
				change: me.checkboxChange
			},
			'legalescrowreportformdata [name=buildingclass]': {
				select: me.comboboxChange
			},
			'legalescrowreportformdata [name=cbf_pt_id]': {
				change: me.checkboxChange
			},
			'legalescrowreportformdata [name=pt_id]': {
				select: me.comboboxChange
			}
		});
	},
	setData: function () {
		var me, form, values;
		me = this;

		form   = me.getFormdata();
		values = form.getForm().getFieldValues();

		var pt_id_unit = form.down("[name=pt_id]").getValue() ? form.down("[name=pt_id]").getValue() : 0;

		var pt_display = 'ALL';
		if(pt_id_unit > 0){
			pt_display = form.down("[name=pt_id]").getRawValue();
		}

		return Object.assign(values, {
			reportFile   : 'Legalescrowreport',
			project_id   : apps.project,
			project_name : me.project_name,
			pt_id        : apps.pt,
			pt_name      : me.pt_name,
			pt_id_unit   : pt_id_unit,
			pt_display   : pt_display,
			period       : form.down("[name=period]").getValue().getFullYear(),
		});
	},
	processReport: function () {
		var me, winId, win, params, html;
		me = this;
		winId = 'myReportWindow';
		me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		win = desktop.getWindow(winId);

		if(me.getFormdata().down("[name=period]").getValue() == ''){
			Ext.Msg.alert('Info', 'You must select periode !');
			return;
		}

		if (win) {
			params = me.setData();
			html = me.generateFakeForm2(params, params.reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},
	panelAfterRender: function (el) {
		var me = this;

		Ext.Ajax.request({
			url     : 'erems/legalescrowreport/read',
			success : function (response) {
				var info = Ext.JSON.decode(response.responseText);

				me.project_name = info.project_name;
				me.pt_name      = info.pt_name;
			},
		});
		
		var storepp = el.down('[name=pt_id]').getStore();
		storepp.clearFilter(true);
		storepp.filter({
			property      : 'project_id',
			value         : apps.project,
			exactMatch    : true,
			caseSensitive : true
		});
	}
});