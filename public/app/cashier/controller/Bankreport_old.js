Ext.define('Cashier.controller.Bankreport', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Bankreport',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Groupcombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Coarptcombobox',
    ],
    views: [
        'bankreport.Panel',
        'bankreport.FormData'
    ],
    stores: [
        'Ptbyuser',
        'Grouptransaction',
        'Coa'
    ],
    models: [
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'bankreportformdata'
        },
        {
            ref: 'paneldata',
            selector: 'bankreportpanel'
        }
    ],
    controllerName: 'bankreport',
    fieldName: '',
    bindPrefixName: 'Bankreport',
    urlprocess: 'cashier/bankreport/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null, cluster: null,
    value: null,
    statusdetail: null, statusdetaildesc: null, periode: null, filtercoa: null,
    fromcoa: null, untilcoa: null, fromdate: null, untildate: null, arraydata: null,
    form: null, mymask: null,
    init: function (application) {
        var me = this;
        me.mymask = new Ext.LoadMask(Ext.getBody(), {msg: "Please wait..."});

        this.control({
            'bankreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.windowsHeight(me.bindPrefixName, 500);
                    me.windowsWidht(me.bindPrefixName, 800);
                    me.panelAfterRender();
                }
            },
            'bankreportformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRender();
                },
                boxready: function () {
                    this.formDataReady();
                }
            },
            'bankreportformdata [name=detailaccount]': {
                change: function (the, newValue, oldValue, eOpts) {
                    var me, form, detailaccount;
                    me = this;
                    form = me.getFormdata();
                    detailaccount = me.getValRadio(form, "detailaccount");
                    if (detailaccount !== undefined) {
                        if (detailaccount !== 'yes') {
                            me.Fdisable(form, "allcoa", true);
                        } else {
                            me.Fdisable(form, "allcoa", false);
                        }
                        me.fromuntilcoa(true);
                    }
                },
            },
            'bankreportformdata [name=allcompany]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilcompany(newValue);

                },
            },
            'bankreportformdata [name=alldepartment]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntildepartment(newValue);

                },
            },
            'bankreportformdata [name=allgroup]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilgroup(newValue);

                },
            },
            'bankreportformdata [name=allcoa]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilcoa(newValue);
                    if (newValue == false) {
                        me.getStoreCoa();
                    }

                },
            },
            'bankreportformdata button[action=submit]': {
                click: function () {
                    this.showReport();
                }
            }
        });
    },
    arrayData: function () {
        var me;
        me = this;
        me.value = me.form.getValues();
        me.value["project_name"] = me.project_name;
        me.value["pt_name"] = me.pt_name;
        me.value["userprint"] = me.userprint;
        me.value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
        me.value["time_sekarang"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
        me.value["project_id"] = apps.project;
        me.value["pt_id"] = apps.pt;

        me.value["statusdetaildesc"] = me.statusdetaildesc;
        me.value["statusdetail"] = me.statusdetail;
        me.value["periode"] = me.periode;
        me.value["filtercoa"] = me.filtercoa;
        me.value["cluster"] = me.cluster;
    },

    createWindows: function () {
        var me = this;
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);
    },
    submitReportOld: function (value) {
        var me, report, file, html;
        me = this;
        if (value.dataindexby !== 'Department') {
            if (value.detailaccount == 'no') {
                file = 'Bankreportnodetail';
            } else {
                file = 'Bankreportwithdetail';
            }
        } else {
            file = 'BankReportdept';
        }

        //console.log(value);

        report = 'report_bankreport/' + file;
        html = me.Reportviewerjs(value, report);
        me.win.down("#MyReportPanel").body.setHTML(html);
        $("#Reportform").submit();
    },
    submitReport: function (value) {
        var me, report, file, html;
        me = this;
        if (value.dataindexby !== 'Department') {
            if (value.detailaccount == 'no') {
                file = 'Bankreportwithdetail_kp';
            } else {
                file = 'Bankreportwithdetail_kp';
            }
        } else {
            file = 'BankReportdept';
        }

        report = 'report_bankreport/' + file;
        html = me.ReportviewerV3(value, report);
        me.win.down("#MyReportPanel").body.setHTML(html);
        $("#Reportform").submit();
    },
    showReport: function () {
        var me;
        me = this;
        me.form = me.getFormdata().getForm();
        me.setupData();
    },
    setupData: function () {
        var me, form, formvalue, detailcoa,
                fromcoa, untilcoa, frompt, untilpt, fromdepartment
                , untildepartment, groupby, returndata, detailaccount;
        me = this;
        form = me.getFormdata();
        formvalue = form.getForm().getValues();

        if (form.getForm().isValid()) {
            if (formvalue.allcoa == '1') {
                formvalue['fromcoa'] = '';
                formvalue['untilcoa'] = '';
                formvalue['incoa'] = me.Allincoa();
            } else {
                detailaccount = me.getValRadio(form, "detailaccount");
                if (detailaccount !== undefined) {
                    if (detailaccount !== 'yes') {
                        formvalue['fromcoa'] = '';
                        formvalue['untilcoa'] = '';
                        formvalue['incoa'] = '';
                    } else {
                        formvalue['fromcoa'] = form.down("[name=fromcoa]").getRawValue();
                        formvalue['untilcoa'] = form.down("[name=untilcoa]").getRawValue();
                        formvalue['incoa'] = me.Filterincoa();
                    }
                }
            }


            if (formvalue.allgroup == '1') {
                groupby = '';
            } else {
                groupby = me.getVal(form, 'grouptrans_id', 'value');
            }



            if (formvalue.allcompany == '1') {
                formvalue['in_ptid'] = me.Allinpt();
                formvalue['frompt'] = '';
                formvalue['untilpt'] = '';
            } else {
                formvalue['in_ptid'] = me.Filterinpt();
                formvalue['frompt'] = form.down("[name=frompt]").valueModels[0].raw.ptcode;
                formvalue['untilpt'] = form.down("[name=untilpt]").valueModels[0].raw.ptcode;
            }

            if (formvalue.alldepartment == '1') {
                formvalue['in_deptid'] = me.Allindept();
                formvalue['fromdepartment'] = '';
                formvalue['untildepartment'] = '';
            } else {
                formvalue['in_deptid'] = me.Filterindept();
                formvalue['fromdepartment'] = form.down("[name=fromdepartment]").valueModels[0].raw.code;
                formvalue['untildepartment'] = form.down("[name=untildepartment]").valueModels[0].raw.code;
            }


            returndata = formvalue;
            returndata['grouptrans_id'] = groupby;
            me.setForAjax(formvalue);
        }

    },
    setForAjax: function (formvalue) {
        var me;
        me = this;
        resetTimer();
        me.senddata = formvalue;
        me.urlrequest = me.urlprocess;
        me.mymask.show();
        me.AjaxRequest();
    },
    formDataAfterRender: function () {
        var me, storecoa, form, allcompany, alldept, allgroup, allcoa;
        me = this;
        form = me.getFormdata();
        me.setVal(form, 'fromperiode', me.dateNow);
        me.setVal(form, 'untilperiode', me.dateNow);
        me.setStoreFormdata();
        me.getVal(form, "allcompany", "value");
    },
    formDataReady: function () {
        var me, store, form, allcompany, alldept, allgroup, allcoa;
        me = this;
        form = me.getFormdata();
        allcompany = me.getVal(form, "allcompany", "value");
        alldept = me.getVal(form, "alldepartment", "value");
        allgroup = me.getVal(form, "allgroup", "value");
        allcoa = me.getVal(form, "allcoa", "value");
        me.fromuntilcompany(allcompany);
        me.fromuntildepartment(alldept);
        me.fromuntilgroup(allgroup);
        me.fromuntilcoa(allcoa);
        if (allcoa == false) {
            me.getStoreCoa();
        }
    },
    Allinpt: function () {
        var me, form, formvalue, from, until, store, arraydata, indata;
        me = this;
        arraydata = [];
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        store = form.down("[name=frompt]").getStore();
        store.each(function (rec)
        {
            arraydata.push(rec.data.pt_id);

        });
        indata = arraydata.join(",");
        return indata;
    },
    Filterinpt: function () {
        var me, form, formvalue, from, until, store, arraydata, indata;
        me = this;
        arraydata = [];
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        from = form.down("[name=frompt]").valueModels[0].raw;
        until = form.down("[name=untilpt]").valueModels[0].raw;
        store = form.down("[name=frompt]").getStore();
        if (from == until) {
            arraydata.push(form.down("[name=untilpt]").getValue());
        } else {
            store.each(function (rec)
            {
                if (rec.data.ptname >= from.ptname && rec.data.ptname <= until.ptname) {
                    arraydata.push(rec.data.pt_id);
                }
            }
            );
        }
        indata = arraydata.join(",");
        return indata;
    },
    Allindept: function () {
        var me, form, formvalue, from, until, store, arraydata, indata;
        me = this;
        arraydata = [];
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        store = form.down("[name=fromdepartment]").getStore();
        store.each(function (rec)
        {
            arraydata.push(rec.data.department_id);

        });
        indata = arraydata.join(",");
        return indata;
    },
    Filterindept: function () {
        var me, form, formvalue, from, until, store, arraydata, indata;
        me = this;
        arraydata = [];
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        from = form.down("[name=fromdepartment]").valueModels[0].raw;
        until = form.down("[name=untildepartment]").valueModels[0].raw;
        store = form.down("[name=fromdepartment]").getStore();
        if (from == until) {
            arraydata.push(form.down("[name=untildepartment]").getValue());
        } else {
            store.each(function (rec)
            {
                if (rec.data.department >= from.department && rec.data.department <= until.department) {
                    arraydata.push(rec.data.department_id);
                }
            }
            );
        }
        indata = arraydata.join(",");
        return indata;
    },
    Allincoa: function () {
        var me, form, formvalue, data, store, arraydata, indata;
        me = this;
        arraydata = [];
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        store = form.down("[name=fromcoa]").getStore();


        if (store.getCount() > 0) {
            store.each(function (rec)
            {
                arraydata.push("'" + rec.data.coa + "'");
            }
            );
        }
        indata = arraydata.join(",");
        return indata;
    },
    Filterincoa: function () {
        var me, form, formvalue, from, until, store, arraydata, indata,
                fromcoa, untilcoa, checkcoa;
        me = this;
        arraydata = [];
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        from = form.down("[name=fromcoa]").valueModels[0].raw;
        until = form.down("[name=untilcoa]").valueModels[0].raw;
        store = form.down("[name=fromcoa]").getStore();
        fromcoa = me.cleanCoatonumber(from.coa);
        untilcoa = me.cleanCoatonumber(until.coa);


        if (fromcoa > untilcoa) {
            me.buildWarningAlert("Range coa not valid..!");
            return false;
        }

        if (fromcoa == untilcoa) {
            arraydata.push(until.coa);
        } else {
            store.each(function (rec)
            {
                checkcoa = me.cleanCoatonumber(rec.data.coa);

                if (checkcoa >= fromcoa && checkcoa <= untilcoa) {
                    arraydata.push("'" + rec.data.coa + "'");
                }
            }
            );
        }
        indata = arraydata.join(",");
        return indata;
    },
    cleanCoatonumber: function (coa) {
        var data;
        data = coa.replace(/[\.]+/g, "");
        return data;
    },
    getStoreCoa: function () {
        var me, store, form, project_id, pt_id;
        me = this;
        store = me.getStore('Coa');
        form = me.getFormdata();
        if (form.down("[name=frompt]").valueModels[0] !== undefined) {
            project_id = form.down("[name=frompt]").valueModels[0].raw.project_id;
            pt_id = form.down("[name=frompt]").valueModels[0].raw.pt_id;
        } else {
            project_id = apps.project;
            pt_id = apps.pt;
        }
        store.reload({
            params: {
                "hideparam": 'getcoabyprojectptvoucher',
                "project_id": project_id,
                "pt_id": pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                if (store.getCount() < 1) {
                    me.buildWarningAlert("Please Select Company first...!");
                }
            }
        });
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 45000000,
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                me.info = Ext.JSON.decode(response.responseText);
                me.setSuccessEvent();
            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });
    },
    setSuccessEvent: function () {
        var me, value, form;
        me = this;
        form = me.getFormdata();
        value = me.info.data;
        if (me.info.parameter == 'default') {
            me.mymask.hide();
            var from = moment(form.down("[name=fromperiode]").getValue()).format("YYYY-MM-DD"); 
            var to = moment(form.down("[name=untilperiode]").getValue()).format("YYYY-MM-DD"); 

            if (form.down("[name=frompt]").valueModels[0] !== undefined) {
                pt_id = form.down("[name=frompt]").valueModels[0].raw.pt_id;
                pt_id_until = form.down("[name=untilpt]").valueModels[0].raw.pt_id;
                project_id = form.down("[name=frompt]").valueModels[0].raw.project_id;
                project_id_until = form.down("[name=untilpt]").valueModels[0].raw.project_id;
            } else {
                project_id = apps.project;
                pt_id = apps.pt;
                project_id_until = apps.project;
                pt_id_until = apps.pt;
            }

           if (form.down("[name=fromcoa]").valueModels[0] !== undefined) {
                coa = form.down("[name=fromcoa]").valueModels[0].raw.coa;
                coa_until = form.down("[name=untilcoa]").valueModels[0].raw.coa;
            } else {
                coa = '10.00.000';
                coa_until = '99.99.999';
            }

            value['periode'] = from + " s/d " + to;
            value['detailaccount'] = value.detailaccount;
            value['userprint'] = me.userprint;
            value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
            value["time_sekarang"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
            value["pt_id"] = pt_id;
            value["project_id"] = project_id;
            value["pt_id_until"] = pt_id_until;
            value["project_id_until"] = project_id_until;
            value["fromdate"] = from;
            value["untildate"] = to;
            value["coa"] = coa;
            value["coa_until"] = coa_until;
            value["department_id"] = 0;
            value["department_id_until"] = 0;
            value["type"] = 'BANK';

            me.createWindows();

            form = me.getFormdata();
            newvers = me.getValRadio(form, "newversion");
            if(newvers=='yes'){
                me.submitReport(value);
            }else{
                me.submitReportOld(value);
            }
            

        }
    },
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'cashier/bankreport/read',
            timeout: 45000000,
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
            },
        });
    },

});