Ext.define('Erems.library.template.controller.ControllerReport', {
	extend: 'Erems.library.template.controller.Controller2',
	alias: 'controller.Controllerreport',
	views: [], /* must override */
	refs: [], /* must override */
	controllerName: 'controllerreport',
	formWidth: 750,
	bindPrefixName: 'Controllerreport',
	localStore: {
		detail: null
	},
	init: function (application) {
		var me = this;
		this.control(); /* must override*/
	},
	generateFakeForm: function (paramList, reportFile) {

		var form = '<form id="fakeReportFormID" action=' + document.URL + 'resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=' + reportFile + '.mrt" target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
		for (var x in paramList) {
			if (paramList[x] === null) {
				paramList[x] = '';
			}
			form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
		}
		form += '<input type="submit" value="post"></form>';
		form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
		return form;
	},
	generateFakeForm2: function (paramList, reportFile) {
		//var form = '<form id="fakeReportFormID" action=resources/stimulsoftjs/viewer.php?reportfilelocation='+reportFile+'.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
		var form = '<form id="fakeReportFormID" action=resources/stimulsoftjsv2/viewer.php?reportfilelocation=' + reportFile + '.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
		for (var x in paramList) {
			if (paramList[x] === null) {
				paramList[x] = '';
			}
			form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
		}
		form += '<input type="submit" value="post"></form>';
		form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
		return form;
	},
	fieldGetDisplayValue: function (name) {
		var me = this;
		return me.getFormdata().down("[name=" + name + "]").getValue() == null ? "ALL" : me.getFormdata().down("[name=" + name + "]").getDisplayValue();
	},
	processReport: function () {
		var me = this;

		var winId = 'myReportWindow';
		me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		var win = desktop.getWindow(winId);

		if (win) {
			var params = me.getFormdata().getForm().getFieldValues();
			var reportData = me.processParams({params: params, file: 'blank'});
			var reportFile = reportData.file;
			console.log(reportData.params);
			var html = me.generateFakeForm2(reportData.params, reportData.file);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},
	instantWindow: function (panel, width, title, state, id, controller) {
		var me = this;
		var formtitle, formicon;


		title = typeof title == 'undefined' ? 'My Window' : title;
		id = typeof id == 'undefined' ? 'myInstantWindow' : id;
		state = typeof state == 'undefined' ? 'create' : state;
		panel = typeof panel == 'undefined' ? 'Panel' : panel;
		width = typeof width == 'undefined' ? 600 : width;
		var controllerFolder = typeof controller === 'undefined' ? me.controllerName : controller;
		formtitle = title;
		formicon = 'icon-form-add';
		var winId = id;



		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: formtitle,
				iconCls: formicon,
				resizable: false,
				minimizable: false,
				maximizable: true,
				width: width,
				renderTo: Ext.getBody(),
				constrain: true,
				constrainHeader: false,
				modal: true,
				layout: 'fit',
				shadow: 'frame',
				shadowOffset: 10,
				border: false,
				items: Ext.create('Erems.view.' + controllerFolder + '.' + panel),
				state: state
			});
		}
		win.show();
	},

	panelAfterRender: function (el) {
		var me = this;

		me.getPanel().up("window").body.mask("Loading...");

		//var arCom = ["cluster_id", "type_id", "productcategory_id"];
		var arCom = me.loadedCbList();
		for (var x in arCom) {
			var cel = me.getPanel().down("[name=" + arCom[x] + "]");
			cel.bindPrefixName = me.bindPrefixName;
			cel.storeUrl = me.controllerName;
			cel.doInit(true, function () {
				//  alert("hello");

			});
		}


		Ext.Ajax.request({
			url: 'erems/' + me.controllerName + '/read',
			success: function (response) {
				me.zendInitLoadedDefault(response);
				me.zendInitLoaded();
			},
			params: {mode_read: 'init'}

		});

	},

	zendInitLoadedDefault: function (response) {
		var me = this;
		me.getFormdata().down("#btnSearch").setDisabled(false);
		var info = Ext.JSON.decode(response.responseText);
		info = info.data;
		me.getFormdata().down("[name=Project]").setValue(info.project.name);
		me.getFormdata().down("[name=Pt]").setValue(info.pt.name);
		me.getFormdata().down("[name=project_id]").setValue(info.project.project_id);
		me.getFormdata().down("[name=pt_id]").setValue(info.pt.pt_id);
		me.zendAddParams(info);
	},

	/*@added 24 Maret 2014*/
	zendAddParams: function (info) {

	},
	loadedCbList: function () {
		var list = [];
		return list;
	},
	/* must override */
	processParams: function (reportData) {
		return reportData;
	},
	/*must override*/
	zendInitLoaded: function () {

	},
	getComboboxText: function (name) {
		var me = this;
		var f = me.getFormdata();
		var text = me.getFormdata().down("[name=" + name + "]").getSelectedText();
		if (text) {
			return text;
		}
		return "ALL"

	},
	getSelectedRadio: function (idElement) {
		var me = this;
		var f = me.getFormdata();
		var checked = f.down("#" + idElement).getChecked();
		var hasil = {
			getValue: function () {
				return checked[0].inputValue;
			},
			getText: function () {
				return checked[0].boxLabel;
			}
		};
		return hasil;
	}


});