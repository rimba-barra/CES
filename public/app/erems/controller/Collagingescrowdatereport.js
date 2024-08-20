Ext.define('Erems.controller.Collagingescrowdatereport', {
    extend: 'Erems.library.template.controller.Controllerreporttb',
    alias: 'controller.Collagingescrowdatereport',
    views: ['collagingescrowdatereport.Panel', 'collagingescrowdatereport.FormData', 'masterreport.Panel'],
    stores: ['Sourcemoney'],
    models: ['Sourcemoney'],
    refs: [
        {
            ref: 'panel',
            selector: 'collagingescrowdatereportpanel'
        },
        {
            ref: 'formdata',
            selector: 'collagingescrowdatereportformdata'
        }

    ],
    controllerName: 'collagingescrowdatereport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Collagingescrowdatereport',
    localStore: {
        detail: null
    },
    project_name: null,
    pt_name: null,
    init: function (application) {
        var me = this;
        this.control({
            'collagingescrowdatereportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'collagingescrowdatereportformdata': {
                afterrender: this.formDataAfterRender
            },
            'collagingescrowdatereportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'collagingescrowdatereportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'collagingescrowdatereportformdata button[action=process]': {
                click: function () {
                    var me, form, actionexcel;
                    me = this;
                    form = me.getFormdata();
		    /*		
                    actionexcel = form.down("[name='fileexcel']").getValue();
                    if (actionexcel == false) {
                        me.processReport();
                    } else {
                        me.Generateexcel();
                    }
		   */
		   me.processReport();
	
                }
            },
            'collagingescrowdatereportformdata button[action=reset]': {
                click: this.dataReset
            },
            'collagingescrowdatereportformdata [name=cbf_buildingclass]': {
                change: me.checkboxChange
            },
            'collagingescrowdatereportformdata [name=buildingclass]': {
                select: me.comboboxChange
            },
			'collagingescrowdatereportformdata [name=cbf_pt_id]': {
                change: me.checkboxChange
            },
            'collagingescrowdatereportformdata [name=pt_id]': {
                select: me.comboboxChange
            },
            'collagingescrowdatereportformdata [name=cbf_periode_id]': {
                change: me.checkboxChangePeriode
            },
            'collagingescrowdatereportformdata [name=periode_startdate]': {
                change: me.changeDate
            },
            'collagingescrowdatereportformdata [name=periode_enddate]': {
                change: me.changeDate
            },
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
		
        // reportFile = 'Collagingescrowdetail2';
        // values['reportFile'] = reportFile;
        values["reporttype_display"] = 'Detail';
                
        values["group_admin"] = form.down("[name=buildingclass]").getValue();
        var cbf_checked0 = form.down("[name=cbf_buildingclass]").getValue();
        if (cbf_checked0 == '1' || !values["group_admin"]) {
            values["group_admin_display"] = 'ALL';
        } else {
            values["group_admin_display"] = form.down("[name=buildingclass]").getRawValue();
        }
        
        // var tglStart = form.down("[name=proses_date]").getValue();
        // if (tglStart) {
            // var startDate = new Date(tglStart);
            // values["jatuhtempo_date_display"] = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
            // values["jatuhtempo_date"] = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); //for sql query
        // } else {
            // values["jatuhtempo_date_display"] = 'ALL';
            // values["jatuhtempo_date"] = null;
        // }

		var tglStart = form.down("[name=proses_date]").getValue();
        if (tglStart) {
			var startDate = new Date(tglStart);	
			var todayDate = new Date();
			todayDate.setHours(0,0,0,0)
			if (Ext.Date.getElapsed(startDate, todayDate) == 0  ) {
				values["jatuhtempo_date_display"] = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
				values["jatuhtempo_date"] = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); //for sql query
				if (tipe_laporan == '0') {
					reportFile = 'Collagingescrowdetail';
				} else if (tipe_laporan == '1') {
					reportFile = 'CollagingescrowdetailNew';
				}
			} else {
				values["jatuhtempo_date_display"] = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
				values["jatuhtempo_date"] = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); //for sql query
				reportFile = 'Collagingescrowdetail2';
			}
        } else {
            values["jatuhtempo_date_display"] = 'ALL';
            values["jatuhtempo_date"] = null;
			
        }

        values['akad_date_id']    = form.down("[name=cbf_periode_id]").getValue();
        values["akad_date_start"] = '';
        values["akad_date_end"]   = '';

        if (values['akad_date_id']) {
            values["akad_date_display"] = 'ALL';
        } 
        else {
            if(me.getFormdata().down("[name=periode_startdate]").getValue() != null){
                var startDate = new Date(me.getFormdata().down("[name=periode_startdate]").getValue()); 
                values["akad_date_start"]   = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
            }
            if(me.getFormdata().down("[name=periode_enddate]").getValue() != null){
                var endDate   = new Date(me.getFormdata().down("[name=periode_enddate]").getValue()); 
                values["akad_date_end"]     = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();
            }
            values["akad_date_display"] = values["akad_date_start"] + " to " + values["akad_date_end"];
        }

		values['reportFile'] = reportFile;
		values["tipe_laporan"] = tipe_laporan;
        values["project_id"] = apps.project;
        values["pt_id"] = apps.pt;
        return values;
    },
    processReport: function () {
        var me = this, winId, win, params = me.setData(), html;

        winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        win = desktop.getWindow(winId);
        if (win) {
            params = me.setData();
            html = me.generateFakeForm2(params, params.reportFile);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
        }
    },
    Generateexcel: function () {
        var me, form, values, dateNow;
        me = this;
        form = me.getFormdata();
        values = me.setData();
        if (values.radio_laporantype == 'detail') {
            values["mode_read"] = 'exportexcel_detail';
        } else {
            values["mode_read"] = 'exportexcel_rekap';
        }
        Ext.getBody().mask('Export data to excel file, please wait ...');
        Ext.Ajax.request({
            url: 'erems/collagingescrowdatereport/read',
            method: 'POST',
            timeout:4500000,
            params: {
                data: Ext.encode(values),
                actiondata: 'exportdata'
            },
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                window.open(info.msg, '_blank');
                Ext.getBody().unmask();
                Ext.Msg.alert('INFO', 'Export Data Success');
            },
        });
    },

    panelAfterRender: function (el) {
        var me = this;

        Ext.Ajax.request({
            url: 'erems/collagingescrowdatereport/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/collagingescrowdatereport/all');
    },
    changeDate: function () {
        var me = this;
        me.getFormdata().down("[name=cbf_periode_id]").setValue("0");
    },
    checkboxChangePeriode: function (el) {
        var me = this;
        if (el.getValue()) {
            me.getFormdata().down("[name=periode_startdate]").setValue("");
            me.getFormdata().down("[name=periode_enddate]").setValue("");
            el.setValue(1);
        }
    },
});