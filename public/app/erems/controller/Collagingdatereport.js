Ext.define('Erems.controller.Collagingdatereport', {
    extend: 'Erems.library.template.controller.Controllerreporttb',
    alias: 'controller.Collagingdatereport',
    views: ['collagingdatereport.Panel', 'collagingdatereport.FormData', 'masterreport.Panel'],
    stores: ['Sourcemoney'],
    models: ['Sourcemoney'],
    refs: [
        {
            ref: 'panel',
            selector: 'collagingdatereportpanel'
        },
        {
            ref: 'formdata',
            selector: 'collagingdatereportformdata'
        }

    ],
    controllerName: 'collagingdatereport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Collagingdatereport',
    localStore: {
        detail: null
    },
    project_name: null,
    pt_name: null,
    init: function (application) {
        var me = this;
        this.control({
            'collagingdatereportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'collagingdatereportformdata': {
                afterrender: this.formDataAfterRender
            },
            'collagingdatereportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'collagingdatereportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'collagingdatereportformdata button[action=process]': {
                click: function () {
					me.processReport();
                }
            },
            'collagingdatereportformdata button[action=reset]': {
                click: this.dataReset
            },
            'collagingdatereportformdata [name=cbf_buildingclass]': {
                change: me.checkboxChange
            },
            'collagingdatereportformdata [name=buildingclass]': {
                select: me.comboboxChange
            },
            'collagingdatereportformdata [name=cbf_sourcemoney_id]': {
                change: me.checkboxChange
            },
            'collagingdatereportformdata [name=sourcemoney_id]': {
                select: me.comboboxChange
            }
        });
    },
    setData: function () {
        var me, form, values, dateNow;
        me = this;
        form = me.getFormdata();
        values = form.getForm().getFieldValues();
        dateNow = new Date();
        //header
        values["project_name"] = me.project_name;
        values["pt_name"] = me.pt_name;
        values["tgl_sekarang"] = dateNow.getDate() + "-" + (dateNow.getMonth() + 1) + "-" + dateNow.getFullYear();
        values["time_sekarang"] = dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds();
        var reportFile = null;
        var select_laporan = form.down("[name=radiogroup_laporantype]").getValue().radio_laporantype;
		var tipe_laporan = form.down("[name=radiogroup_grossnetto]").getValue().radio_grossnetto;
        //if (select_laporan == "rekap") {
        //    reportFile = 'Collagingsummary';
        //    values["reporttype_display"] = 'Rekap';
        //} else if (select_laporan == "detail") {
        //    reportFile = 'Collagingdetaildate';
        //    values["reporttype_display"] = 'Detail';
        //}
        //values['reportfile'] = reportFile;
        values['data_unit'] = form.down("[name=radiogroup_dataunit]").getValue();
        values["group_admin"] = form.down("[name=buildingclass]").getValue();
        var cbf_checked0 = form.down("[name=cbf_buildingclass]").getValue();
        if (cbf_checked0 == '1' || !values["group_admin"]) {
            values["group_admin_display"] = 'ALL';
        } else {
            values["group_admin_display"] = form.down("[name=buildingclass]").getRawValue();
        }

        values["sourcemoney_id"] = form.down("[name=sourcemoney_id]").getValue();
        var cbf_checked1 = form.down("[name=cbf_sourcemoney_id]").getValue();
        if (cbf_checked1 == '1' || !values["sourcemoney_id"]) {
            values["sourcemoney_display"] = 'ALL';
        } else {
            values["sourcemoney_display"] = form.down("[name=sourcemoney_id]").getRawValue();
        }

        var tglStart = form.down("[name=jatuhtempo_date]").getValue();
        if (tglStart) {
			var startDate = new Date(tglStart);	
			var todayDate = new Date();
			todayDate.setHours(0,0,0,0)
			if (Ext.Date.getElapsed(startDate, todayDate) == 0  ) {
				values["jatuhtempo_date_display"] = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
				values["jatuhtempo_date"] = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); //for sql query
				if (tipe_laporan == '0') {
					reportFile = 'Collagingdetail';
				} else if (tipe_laporan == '1') {
					reportFile = 'Collagingdetail_new';
				}
			} else {
				values["jatuhtempo_date_display"] = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
				values["jatuhtempo_date"] = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); //for sql query
				reportFile = 'Collagingdetaildate';
			}
        } else {
            values["jatuhtempo_date_display"] = 'ALL';
            values["jatuhtempo_date"] = null;
			
        }
		
		// var tglStart = form.down("[name=proses_date]").getValue();
		// if (tglStart) {
			// if(tglStart.includes("Today")){
				// var startDate = new Date();
				// values["jatuhtempo_date_display"] = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
				// values["jatuhtempo_date"] = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); //for sql query
			// } else {
				// values["jatuhtempo_date_display"] = tglStart;
				// values["jatuhtempo_date"] = tglStart.split("-").reverse().join("-"); //for sql query
			// }
		// } else {
            // values["jatuhtempo_date_display"] = 'ALL';
            // values["jatuhtempo_date"] = null;
        // }
		values['reportfile'] = reportFile;
		values["tipe_laporan"] = tipe_laporan;
        values["project_id"] = apps.project;
        values["pt_id"] = apps.pt;
        return values;
    },
    processReport: function () {
        var me = this;
        var winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var win = desktop.getWindow(winId);
        if (win) {
            var params = me.setData();
			console.log(params);
            var html = me.generateFakeForm2(params, params['reportfile']);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
        }
    },
    panelAfterRender: function (el) {
        var me = this;
        Ext.Ajax.request({
            url: 'erems/collagingdatereport/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/collagingdatereport/all');
    }

});