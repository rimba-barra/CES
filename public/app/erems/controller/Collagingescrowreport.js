Ext.define('Erems.controller.Collagingescrowreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb',
    alias: 'controller.Collagingescrowreport',
    views: ['collagingescrowreport.Panel', 'collagingescrowreport.FormData', 'masterreport.Panel'],
    requires: [
        'Erems.library.template.component.Bankcombobox',
        'Erems.library.template.component.Buildingclasscombobox',
        'Erems.library.template.component.Projectptcombobox'
    ],
    stores: ['Sourcemoney','Masterdata.store.Bank','Masterdata.store.Projectpt'],
    models: ['Sourcemoney','Masterdata.model.Bank','Masterdata.model.Projectpt'],
    refs: [
        {
            ref: 'panel',
            selector: 'collagingescrowreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'collagingescrowreportformdata'
        }

    ],
    controllerName: 'collagingescrowreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Collagingescrowreport',
    localStore: {
        detail: null
    },
    project_name: null,
    pt_name: null,
    init: function (application) {
        var me = this;
        this.control({
            'collagingescrowreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'collagingescrowreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'collagingescrowreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'collagingescrowreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'collagingescrowreportformdata button[action=process]': {
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
            'collagingescrowreportformdata button[action=reset]': {
                click: this.dataReset
            },
            'collagingescrowreportformdata [name=cbf_buildingclass]': {
                change: me.checkboxChange
            },
            'collagingescrowreportformdata [name=buildingclass]': {
                select: me.comboboxChange
            },
			'collagingescrowreportformdata [name=cbf_pt_id]': {
                change: me.checkboxChange
            },
            'collagingescrowreportformdata [name=pt_id]': {
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
        if (select_laporan == "rekap") {
            reportFile = 'Collagingescrowsummary';
            values["reporttype_display"] = 'Rekap';
        } else if (select_laporan == "detail") {
            if (tipe_laporan == 'gross') {
                reportFile = 'Collagingescrowdetail';
                values["reporttype_display"] = 'Detail';
            } else if (tipe_laporan == 'netto') {
                reportFile = 'CollagingescrowdetailNew';
                values["reporttype_display"] = 'Detail';
            }
        }
        values['reportFile'] = reportFile;
        values["group_admin"] = form.down("[name=buildingclass]").getValue();
        var cbf_checked0 = form.down("[name=cbf_buildingclass]").getValue();
        if (cbf_checked0 == '1' || !values["group_admin"]) {
            values["group_admin_display"] = 'ALL';
        } else {
            values["group_admin_display"] = form.down("[name=buildingclass]").getRawValue();
        }

        // var tglStart = form.down("[name=jatuhtempo_date]").getValue();
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
			if(tglStart.includes("Today")){
				var startDate = new Date();
				values["jatuhtempo_date_display"] = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
				values["jatuhtempo_date"] = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); //for sql query
			} else {
				values["jatuhtempo_date_display"] = tglStart;
				values["jatuhtempo_date"] = tglStart.split("-").reverse().join("-"); //for sql query
			}
		} else {
            values["jatuhtempo_date_display"] = 'ALL';
            values["jatuhtempo_date"] = null;
        }
		
		values["pt_id_unit"] = form.down("[name=pt_id]").getValue();
        var cbf_checked2 = form.down("[name=cbf_pt_id]").getValue();
        if (cbf_checked2 == '1' || !values["pt_id"]) {
            values["pt_display"] = 'ALL';
        } else {
            values["pt_display"] = form.down("[name=pt_id]").getRawValue();
        }

        values["project_id"] = apps.project;
        values["pt_id"] = apps.pt;
        return values;
    },
    processReport: function () {
        var me, winId, win, params, html;
        me = this;
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
            url: 'erems/collagingescrowreport/read',
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
            url: 'erems/collagingescrowreport/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/collagingescrowreport/all');
		
		
		Ext.Ajax.request({
			url:'erems/collagingreport/read',
			params:{
				read_type_mode: 'aging_prosesdate',
				aging_type: 'escrow'
			},
			success:function(response){ 
				var me = this;	
				var resp = response.responseText;
				if(resp) {
					var data = Ext.JSON.decode(resp);
					var storeData = data.data[0];
					var store  = Ext.create('Ext.data.Store', {
						 fields:["proses_date"],
						 data:storeData,
						 autoLoad: true
					});
					el.down('[name=proses_date]').bindStore(store);
					el.down('[name=proses_date]').select(store.getAt(0));
				}
			}
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