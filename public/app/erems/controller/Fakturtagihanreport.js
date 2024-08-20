Ext.define('Erems.controller.Fakturtagihanreport', {
	extend: 'Erems.library.template.controller.Controllerreporttb',
	alias: 'controller.Fakturtagihanreport',
	views: [
		'fakturtagihanreport.Panel', 'fakturtagihanreport.FormData', 'masterreport.Panel'
				//added by anas 10052021
				, 'fakturtagihanreport.GridUnit'
	],
	requires: ['Erems.library.box.tools.Tools', 'Erems.library.box.Config'],
	//added by anas 10052021
	stores: ['Fakturtagihanreportunit'],
	refs: [
		{
			ref: 'panel',
			selector: 'fakturtagihanreportpanel'
		},
		{
			ref: 'formdata',
			selector: 'fakturtagihanreportformdata'
		},

		//added by anas 10052021
		{
			ref: 'gridunit',
			selector: 'fakturtagihanreportgridunit'
		}
		//end added by anas

	],
	controllerName: 'fakturtagihanreport',
	formWidth: 750,
	fieldName: 'name',
	comboBoxIdEl: [],
	bindPrefixName: 'Fakturtagihanreport',
	tools: null,
	myConfig: null,
	REPORT_FILE: null,
	sendEmailReport: null,
	localStore: {
		detail: null
	},
	project_name: null,
	pt_name: null,
	pt_address: null,
	pt_phone: null,

	//added by anas 10052021
	dataListUnit: [],
	//end added by anas

	constructor: function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});

		if (typeof Stimulsoft === "undefined") {
			Ext.Loader.injectScriptElement(document.URL + 'resources/stimulsoftjsv3/scripts/stimulsoft.reports.js?v3', function () {
				console.log("[INFO] Sti loaded.");
			}, function () {
				console.log("[INFO] error load Sti.");
			});
		}
	},
	init: function (application) {
		var me = this;

		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});

		this.control({
			'fakturtagihanreportpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'fakturtagihanreportformdata': {
				afterrender: this.formDataAfterRender
			},
			'fakturtagihanreportformdata button[action=save]': {
				click: this.mainDataSave
			},
			'fakturtagihanreportformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'fakturtagihanreportformdata button[action=process]': {
				click: function () {
					me.processReport();
				}
			},
			'fakturtagihanreportformdata button[action=sendEmail]': {
				click: function () {
					me.sendEmail();
				}
			},
			'fakturtagihanreportformdata button[action=reset]': {
				click: this.dataReset
			},
			'fakturtagihanreportformdata [name=cbf_buildingclass]': {
				change: me.checkboxChange
			},
			'fakturtagihanreportformdata [name=buildingclass]': {
				select: me.comboboxChange
			},

			//added by anas 10052021
			'fakturtagihanreportformdata [name=is_changeunit]': {
				change: function (el) {
					if (el.getValue()) {
						me.getFormdata().down('[name=fs_changeunit_search]').setDisabled(true);
						me.getFormdata().down('[name=grid_unit]').setDisabled(true);
						me.getFormdata().down("[name=src_unit_lama]").setValue('');
						me.getGridunit().getStore().removeAll();
					} else {
						me.getFormdata().down('[name=fs_changeunit_search]').setDisabled(false);
						me.getFormdata().down('[name=grid_unit]').setDisabled(false);
						me.loadUnit();
					}
				}
			},

			'fakturtagihanreportformdata button[action=browse_unit_lama]': {
				click: function () {
					me.loadUnit()
				}
			},
			'fakturtagihanreportformdata button[action=reset_unit]': {
				click: function () {
					me.getFormdata().down("[name=src_unit_lama]").setValue('');
					me.loadUnit();
				}
			},
			//end added by anas
			'fakturtagihanreportgridunit': {
				selectionchange: this.gridSelectionChange
			},

		});
	},

	gridSelectionChange: function () {
		var me = this;
		var grid = me.getGridunit(), row = grid.getSelectionModel().getSelection();
		var boolEmail = true;

		// added by rico 23022023
		if(row.length > 5){
			boolEmail = true;
		}else{
			for (var i = 0;i<row.length;i++) {
				if(row[i].data.email == ''){
					boolEmail = true;
					break;
				}else{
					boolEmail = false;
				}
			}
		}

		me.getFormdata().down('[action=sendEmail]').setDisabled(boolEmail);
	},

	processReport: function () {
		var me = this;
		var winId = 'myReportWindow';
		me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
		var win = desktop.getWindow(winId);

		if (win) {
			var params = me.getFormdata().getForm().getFieldValues();

			var dateNow = new Date();

			var periode_date = me.getFormdata().down("[name=periode_date]").getValue();
			var print_date = me.getFormdata().down("[name=print_date]").getValue();

			if (periode_date) {
				var periodeDate = new Date(periode_date);
				params["param_periode_date"] = periodeDate.getFullYear() + "-" + (periodeDate.getMonth() + 1) + "-" + periodeDate.getDate(); //for sql query
			} else {
				params["param_periode_date"] = null;
			}

			if (print_date) {
				var printDate = new Date(print_date);
				params["print_date_display"] = ("0" + printDate.getDate()).slice(-2) + "-" + (("0" + (printDate.getMonth() + 1)).slice(-2)) + "-" + printDate.getFullYear();
				//params["param_print_date"] = printDate.getFullYear()+"-"+(printDate.getMonth()+ 1)+"-"+printDate.getDate(); //for sql query
			} else {
				params["print_date_display"] = null;
				//params["param_print_date"] = null;
			}


			//header
			params["project_name"] = me.project_name;
			params["pt_name"] = me.pt_name.replace(".", "");
			params["tgl_sekarang"] = dateNow.getDate() + "-" + (dateNow.getMonth() + 1) + "-" + dateNow.getFullYear();
			params["time_sekarang"] = dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds();
			var reportFile = me.REPORT_FILE;

			params["group_admin_display"] = me.getFormdata().down("[name=buildingclass]").getValue();
			if (params["group_admin_display"] == null) {
				params["group_admin_display"] = '';
			}

			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;
			params["pt_address"] = me.pt_address;
			params["pt_phone"] = me.pt_phone;
			// params["logo_url"] = window.location.protocol+"//"+window.location.host+'/app/erems/library/images/'; //http://localhost:8090/app/erems/library/image/ptsnip.jpg

			//ceslive - updated by rico 29112021
			// params["logo_url"] = window.location.protocol+"//"+window.location.host+'/webapps/Ciputra/public/app/erems/library/images/';

			//cestest
			params["logo_url"] = document.URL + '/app/erems/library/images/';

			//local
			// params["logo_url"] = window.location.protocol+"//"+window.location.host+'/webapps/public/app/erems/library/images/';


			//added by anas 10052021
			var data = [];
			var is_changeunit = me.getFormdata().down("[name=is_changeunit]").getValue();
			if (is_changeunit){
				data = [];
			} else {
				var row = me.getGridunit().getSelectionModel().getSelection();
				for (var i = 0; i < row.length; i++) {
					// data[i] = me.getGridunit().getStore().getAt(row[i].index).get("unit_unit_id");
					//updated by anas 21102021
					data[i] = row[i].data.unit_id;
				}
			}

			params["list_unit"] = data.length > 0 ? data.join("~") : '';
			//end added by anas


			//console.log(params);
			Ext.Ajax.timeout = 60000 * 30;
			Ext.Ajax.request({
				url: 'erems/fakturtagihanreport/update',
				params: {
					project_id: params["project_id"],
					pt_id: params["pt_id"],
					param_periode_date: params["param_periode_date"],
					group_admin_display: params["group_admin_display"]

							//added by anas 10052021
					, list_unit: data.length > 0 ? data.join("~") : ''
							//end added by anas
				},
				success: function (response) {
					try {
						var resp = response.responseText;

						if (resp) {
							var info = Ext.JSON.decode(resp);

							if (info.success == true) {
								var html = me.generateFakeForm(params, info.allData, reportFile);
								win.down("#MyReportPanel").body.setHTML(html);
								$("#fakeReportFormID").submit();
							} else {
								Ext.Msg.show({
									title: 'Failure',
									msg: 'Error: Create Faktur Tagihan Report Failed.',
									icon: Ext.Msg.ERROR,
									buttons: Ext.Msg.OK
								});
							}
						}
					} catch (e) {
						//console.error(e);
						//me.getFormdata().up('window').body.unmask();
						Ext.Msg.show({
							title: 'Failure',
							msg: 'Error: Create Faktur Tagihan Report Failed.',
							icon: Ext.Msg.ERROR,
							buttons: Ext.Msg.OK
						});
					}
				},
				failure: function (e) {
					//console.error(e);
					//me.getFormdata().up('window').body.unmask();
					Ext.Msg.show({
						title: 'Failure',
						msg: 'Error: Create Faktur Tagihan Report Failed.',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			});


		}
	},

	sendEmail: function () {
		var me = this;
		me.getFormdata().up('window').body.mask('Processing report and send email to customer, please wait ...');

//		if (win) {
		var params = me.getFormdata().getForm().getFieldValues();

		var dateNow = new Date();

		var periode_date = me.getFormdata().down("[name=periode_date]").getValue();
		var print_date = me.getFormdata().down("[name=print_date]").getValue();

		if (periode_date) {
			var periodeDate = new Date(periode_date);
			params["param_periode_date"] = periodeDate.getFullYear() + "-" + (periodeDate.getMonth() + 1) + "-" + periodeDate.getDate(); //for sql query
		} else {
			params["param_periode_date"] = null;
		}

		if (print_date) {
			var printDate = new Date(print_date);
			params["print_date_display"] = ("0" + printDate.getDate()).slice(-2) + "-" + (("0" + (printDate.getMonth() + 1)).slice(-2)) + "-" + printDate.getFullYear();
			//params["param_print_date"] = printDate.getFullYear()+"-"+(printDate.getMonth()+ 1)+"-"+printDate.getDate(); //for sql query
		} else {
			params["print_date_display"] = null;
			//params["param_print_date"] = null;
		}


		//header
		params["project_name"] = me.project_name;
		params["pt_name"] = me.pt_name.replace(".", "");
		params["tgl_sekarang"] = dateNow.getDate() + "-" + (dateNow.getMonth() + 1) + "-" + dateNow.getFullYear();
		params["time_sekarang"] = dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds();
		var reportFile = me.REPORT_FILE;

		params["group_admin_display"] = me.getFormdata().down("[name=buildingclass]").getValue();
		if (params["group_admin_display"] == null) {
			params["group_admin_display"] = '';
		}

		params["project_id"] = apps.project;
		params["pt_id"] = apps.pt;
		params["pt_address"] = me.pt_address;
		params["pt_phone"] = me.pt_phone;
		// params["logo_url"] = window.location.protocol+"//"+window.location.host+'/app/erems/library/images/'; //http://localhost:8090/app/erems/library/image/ptsnip.jpg

		//ceslive - updated by rico 29112021
		// params["logo_url"] = window.location.protocol+"//"+window.location.host+'/webapps/Ciputra/public/app/erems/library/images/';

		//cestest
		params["logo_url"] = document.URL + '/app/erems/library/images/';

		//local
		// params["logo_url"] = window.location.protocol+"//"+window.location.host+'/webapps/public/app/erems/library/images/';


		//added by anas 10052021
		var data = [];
		var is_changeunit = me.getFormdata().down("[name=is_changeunit]").getValue();
		if (is_changeunit){
			data = [];
		} else {
			var row = me.getGridunit().getSelectionModel().getSelection();
			for (var i = 0; i < row.length; i++) {
				params["list_unit"] = data.length > 0 ? data.join("~") : '';

				Ext.Ajax.timeout = 60000 * 30;
				Ext.Ajax.request({
					url: 'erems/fakturtagihanreport/update',
					params: {
						project_id: params["project_id"],
						pt_id: params["pt_id"],
						param_periode_date: params["param_periode_date"],
						group_admin_display: params["group_admin_display"],
						list_unit: row[i].data.unit_id
					},
					success: function (response) {
						try {
							var resp = response.responseText;

							if (resp) {
								var info = Ext.JSON.decode(resp);

								if (info.success == true) {
									me.generateStiAndSendEmail(params, info.allData, reportFile);
								} else {
									me.getFormdata().up('window').body.unmask();
									Ext.Msg.show({
										title: 'Failure',
										msg: 'Error: Create Faktur Tagihan Report Failed.',
										icon: Ext.Msg.ERROR,
										buttons: Ext.Msg.OK
									});
								}
							}
						} catch (e) {
							me.getFormdata().up('window').body.unmask();
							Ext.Msg.show({
								title: 'Failure',
								msg: 'Error: Create Faktur Tagihan Report Failed.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					},
					failure: function (e) {
						//console.error(e);
						me.getFormdata().up('window').body.unmask();
						Ext.Msg.show({
							title: 'Failure',
							msg: 'Error: Create Faktur Tagihan Report Failed.',
							icon: Ext.Msg.ERROR,
							buttons: Ext.Msg.OK
						});
					}
				});
			}
		}


	},

	generateFakeForm: function (paramList, allData, reportFile) {
		var form, x;
		var form = '<form id="fakeReportFormID" action=' + document.URL + 'resources/stimulsoftjsv3/viewer_erems.php?reportfilelocation=' + reportFile + '.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
		for (x in paramList) {
			if (paramList[x] === null) {
				paramList[x] = '';
			}
			form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
		}
		form += '<textarea name="allData">' + btoa(JSON.stringify(allData)) + '</textarea>';
		form += '<input type="submit" value="post"></form>';
		form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
		return form;
	},

	generateStiAndSendEmail: function (paramList, allData, reportFile) {
		var me = this, x, y;
		Stimulsoft.Base.StiLicense.loadFromFile(document.URL + 'resources/stimulsoftjsv3/stimulsoft/license.key');
		var report = new Stimulsoft.Report.StiReport();
		report.loadFile(document.URL + "app/erems/reportjs/" + reportFile + ".mrt");
		report.reportName = reportFile;
		for (x in paramList) {
			if (paramList[x] === null) {
				paramList[x] = '';
			}
			if (report.dictionary.variables.getByName(x)) {
				report.dictionary.variables.getByName(x).valueObject = paramList[x];
			}
		}

		for (y in allData) {
			console.log(y + '=');
			console.log(allData[y]);
			var dataSet = new Stimulsoft.System.Data.DataSet(y); // nama DataSet harus sama dengan report
			dataSet.readJson(JSON.stringify(allData[y]));
			report.dictionary.databases.clear();
			report.regData(dataSet.dataSetName, "", dataSet);
		}



		// Create an PDF settings instance. You can change export settings.
		var pdfSettings = new Stimulsoft.Report.Export.StiPdfExportSettings();
		var pdfService = new Stimulsoft.Report.Export.StiPdfExportService();
		var stream = new Stimulsoft.System.IO.MemoryStream();
		report.renderAsync(function () {
			pdfService.exportToAsync(function () {
				var data = stream.toArray();
				var blob = new Blob([new Uint8Array(data)], {type: "application/pdf"});

//				var fileUrl = URL.createObjectURL(blob);
//				window.open(fileUrl);
				var blobData = new FormData();
				blobData.append('file', blob);
				blobData.append('mode_read', 'sendemail');
				blobData.append('allData', btoa(JSON.stringify(allData)));

				$.ajax({
					type: 'POST',
					url: 'erems/fakturtagihanreport/read',
					data: blobData,
					contentType: false,
					cache: false,
					processData: false,
					success: function (response) {
						me.getFormdata().up('window').body.unmask();
						var resp = JSON.parse(response);
						if (resp.status_sendmail == true) {
							me.myAlert('Success', resp.msg);
						} else {
							me.myAlert('Failure', resp.msg);
						}
					}
				});
			}, report, stream, pdfSettings);
		}, false);
	},

	myAlert: function (title, message) {
		Ext.create('Ext.window.Window', {
			width: 300,
			height: 120,
			autoDestroy: true,
			title: title,
			modal: true,
			layout: 'fit',
			bodyStyle: 'border:none; background-color: transparent;',
			buttonAlign: 'center',
			items: [{
					xtype: 'container',
					html: message
				}],
			buttons: [{
					text: 'Ok',
					listeners: {
						click: {
							fn: function (item, e) {
								this.up('window').close();
							}
						}
					}
				}]
		}).show();
	},
	panelAfterRender: function (el) {
		var me = this;

		Ext.Ajax.request({
			url: 'erems/fakturtagihanreport/read',
			success: function (response) {
				var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name;
			},
			//params: {mode_read: 'init'}
		});
		//   me.loadReport(el, 'erems/fakturtagihanreport/all');

		Ext.Ajax.request({
			url: 'erems/fakturpajak/ptdetail',
			params: {
				"pt_id": apps.pt,
				"pt_name": '',
				"start": 0,
				"limit": 0,
			},
			success: function (response) {
				var info = Ext.JSON.decode(response.responseText);
				me.pt_address = info.data[0].address;
				me.pt_phone = info.data[0].phone;
			}
		});

		me.tools.ajax({
			params: {},
			success: function (data) {
				me.REPORT_FILE = data.REPORT_FILE;
				me.sendEmailReport = data.sendEmailReport;
				if (me.sendEmailReport == 1) {
					me.getFormdata().down('[action=sendEmail]').show();
				}
			}
		}).read('detailGenco');

	},

	//added by anas 10052021
	formDataAfterRender: function (el) {
		var me = this;
//        if (me.storeProcess.length > 0 && typeof me.storeProcess == 'string') {
//            var sp = 'me.get' + me.storeProcess + 'Store()';
//            me.storeProcess = eval(sp);
//        }
		me.storeProcess = me.createSpProcessObj(me.storeProcess);
		me.fdar().init();

		me.loadComboBoxStore(el);
		var state = el.up('window').state;

		if (state == 'create') {
			me.fdar().create();
		} else if (state == 'update') {
			me.fdar().update();
		}
		me.getFormdata().down('[name=fs_changeunit_search]').setDisabled(true);
		me.getFormdata().down('[name=grid_unit]').setDisabled(true);

	},

	loadUnit: function () {
		var me = this;
		var griddetail = me.getGridunit();
		var store = griddetail.getStore();

		me.getGridunit().getStore().load({
			params: {
				unit_number: me.getFormdata().down("[name=src_unit_lama]").getValue(),
				due_date: me.getFormdata().down("[name=periode_date]").getValue(), // added by rico 12052023
			},
			// callback: function (rec) {
			// }
		});
		// console.log(griddetail.getStore());
	},

	//end added by anas

});