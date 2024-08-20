Ext.define('Erems.library.XyReport', {
	controller: null,
	params: {},
	init: function (controller) {
		this.controller = controller;
	},
	/* start added by ahmad riadi 06-02-2017 */
	Reportviewerjs: function (paramList, reportFile) {
		var form, x;
		var form = '<form id="fakeReportFormID" action=' + document.URL + 'resources/stimulsoftjsv2/viewer.php?reportfilelocation=' + reportFile + '.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
		for (x in paramList) {
			if (paramList[x] === null) {
				paramList[x] = '';
			}
			form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
		}
		form += '<input type="submit" value="post"></form>';
		form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
		return form;
	},
	/* end added by ahmad riadi 06-02-2017 */
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
		var me = this.controller;
		return me.getFormdata().down("[name=" + name + "]").getValue() == null ? "ALL" : me.getFormdata().down("[name=" + name + "]").getDisplayValue();
	},
	/* start added by ahmad riadi 06-02-2017 */
	processReportjs: function () {
		var me = this;

		var winId = 'myReportWindow';
		me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		var win = desktop.getWindow(winId);

		if (win) {
			var params = me.params;
			var reportData = me.controller.xyReportProcessParams({params: params, file: 'blank'});
			var reportFile = reportData.file;
			var html = me.Reportviewerjs(reportData.params, reportData.file);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},
	/* end added by ahmad riadi 06-02-2017 */
	processReport: function () {
		var me = this;

		var winId = 'myReportWindow';
		me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		var win = desktop.getWindow(winId);

		if (win) {
			var params = me.params;
			var reportData = me.controller.xyReportProcessParams({params: params, file: 'blank'});
			var reportFile = reportData.file;
			var html = me.generateFakeForm2(reportData.params, reportData.file);
			console.log(reportData.params);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},
	instantWindow: function (panel, width, title, state, id, controller) {
		var me = this.controller;
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
	}



});