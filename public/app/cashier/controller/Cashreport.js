Ext.define('Cashier.controller.Cashreport', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Cashreport',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Groupcombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Coarptcombobox',
    ],
    views: [
        'cashreport.Panel',
        'cashreport.FormData'
    ],
    stores: [
        'Ptbyuser',
        'Grouptransaction',
        'Coa',
        'Department'
    ],
    models: [
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'cashreportformdata'
        },
        {
            ref: 'paneldata',
            selector: 'cashreportpanel'
        }
    ],
    controllerName: 'cashreport',
    fieldName: '',
    bindPrefixName: 'Cashreport',
    urlprocess: 'cashier/cashreport/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null, cluster: null,
    value: null,
    statusdetail: null, statusdetaildesc: null, periode: null, filtercoa: null,
    fromcoa: null, untilcoa: null, fromdate: null, untildate: null, arraydata: null,
    init: function (application) {
        var me = this;
        this.control({
            'cashreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(500);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(800);
                    me.panelAfterRender();
                }
            },
            'cashreportformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();
                },
                boxready: function () {
                    this.formDataReady();

                    var me = this;

                    $("#cashreportID input[name='fromcoa']").keyup(function()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/,'$1'+'.'+'$2')
                    });

                    $("#cashreportID input[name='untilcoa']").keyup(function()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/,'$1'+'.'+'$2')
                    });
                }
            },
            'cashreportformdata [name=detailaccount]': {
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
            'cashreportformdata [name=allcompany]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilcompany(newValue);

                },
            },
            'cashreportformdata [name=alldepartment]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntildepartment(newValue);

                },
            },
            'cashreportformdata [name=allgroup]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilgroup(newValue);

                },
            },
            'cashreportformdata [name=allcoa]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilcoa(newValue);
                    if(newValue==false){
                        me.getStoreCoa();
                    }
                },
            },
            'cashreportformdata button[action=submit]': {
                click: function () {
                    this.showReport();
                }
            },
            'cashreportformdata [name=frompt]': {
                change: function () {
                    var me =this;
                    var form = me.getFormdata();
                    var frompt = form.down("[name=frompt]").valueModels[0].raw.pt_id;
                    var untilpt = form.down("[name=untilpt]").setValue(frompt);
                },
            }
        });
    },
    arrayData: function () {
        var me;
        me = this;
        me.value = me.form.getValues();
        me.value["project_name"] = me.project_name;
        me.value["pt_name"] = me.pt_name;
        me.value["userprint"] = apps.username;
        me.value["tgl_sekarang"] = Ext.Date.format(new Date(), 'd/m/Y');
        me.value["time_sekarang"] = Ext.Date.format(new Date(), 'H:i:s');
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
        var title = 'Result ' + me.getFormdata().up('window').title;
        me.winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'YmdHis');
        me.instantWindowWithMinimize('Panel', 800, title, 'state-report', me.winId, me.controllerName);
        me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);
    },
    submitReportOld: function (value) {
        var me, report, html;
        me = this;
        if(value.indexby !=='Department'){
            report = 'CashReport';
        }else{
            report = 'CashReportdept';
        }
       
        html = me.generateFakeForm(value, report);
        me.win.down("#MyReportPanel").body.setHTML(html);
        $("#fakeReportFormID").submit();
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
        html = me.ReportviewerV4(value, report, me.win.id, 1);
        me.win.down("#MyReportPanel_" + me.win.id).body.setHTML(html);
        $("#Reportform_" + me.win.id).submit();
    },
    showReport: function () {
        var me;
        me = this;
        me.form = me.getFormdata().getForm();
        me.generateReport();
    },
    setupData: function () {
        var me, form, formvalue, detailcoa,
                 fromcoa, untilcoa, frompt, untilpt, fromdepartment
                , untildepartment, groupby, returndata,detailaccount;
        me = this;
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        
        if (formvalue.allcoa == '1') {
            fromcoa = '';
            untilcoa = '';
        } else {
            detailaccount = me.getValRadio(form, "detailaccount");
            if (detailaccount !== undefined) {
                if (detailaccount !== 'yes') {
                    fromcoa = '';
                    untilcoa = '';
                } else {
                    fromcoa = form.down("[name=fromcoa]").valueModels[0].raw.coa;
                    untilcoa = form.down("[name=untilcoa]").valueModels[0].raw.coa;
                }
                fromcoa = fromcoa;
                untilcoa = untilcoa;
            } else {
                fromcoa = '';
                untilcoa = '';
            }
             fromcoa = fromcoa;
             untilcoa = untilcoa;
        }

        if (formvalue.allcompany == '1') {
            frompt = '';
            untilpt = '';
        } else {
            frompt = form.down("[name=frompt]").valueModels[0].raw.ptcode;
            untilpt = form.down("[name=untilpt]").valueModels[0].raw.ptcode;
        }

        if (formvalue.alldepartment == '1') {
            fromdepartment = '';
            untildepartment = '';
        } else {
            fromdepartment = form.down("[name=fromdepartment]").valueModels[0].raw.code;
            untildepartment = form.down("[name=untildepartment]").valueModels[0].raw.code;
        }
        
        if (formvalue.allgroup == '1') {
            groupby = '';
        } else {
            groupby = me.getVal(form, 'grouptrans_id', 'value');
        }
        
        returndata = formvalue;       
        returndata['fromcoa'] = fromcoa;
        returndata['untilcoa'] = untilcoa;
        returndata['frompt'] = frompt;
        returndata['untilpt'] = untilpt;
        returndata['fromdepartment'] = fromdepartment;
        returndata['untildepartment'] = untildepartment;
        returndata['grouptrans_id'] = groupby;
        return returndata;
    },
    generateReport: function () {
        var me, arraydata;
        me = this;
        resetTimer();
        arraydata = me.setupData();
        Ext.getBody().mask("Please wait...");
        me.senddata = arraydata;
        me.urlrequest = me.urlprocess;
        Ext.getBody().mask("Please wait...");
        me.AjaxRequest();
    },
    formDataAfterRenderCustome: function () {
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
        me.fromuntilcompany(parseInt(allcompany));
        me.fromuntildepartment(alldept);
        me.fromuntilgroup(allgroup);
        me.fromuntilcoa(allcoa);
        if(allcoa==false){
            me.getStoreCoa();
        }
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
            project_id = 0;
            pt_id = 0;
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
            timeout:45000000,
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
        var dataindexby = value.indexby.toLowerCase().replace(/ /g, "");
        if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
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
            value['detailaccount'] = value.filterdetailcoa.toLowerCase();
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
            value["type"] = 'CASH';
            value["dataindexby"] = dataindexby;
            if(me.getValRadio(form, "newversion") == 'yes'){
                value['version'] = 1;
            }else{
                value['version'] = 2;
            }

            me.createWindows();

             form = me.getFormdata();
          //  newvers = me.getValRadio(form, "newversion");
            //if(newvers=='yes'){
                me.submitReport(value);
            //}else{
            //    me.submitReportOld(value);
           // }
            

        }
    },
    panelAfterRender: function () {
        var me = this;
        var form = me.getFormdata();
        form.down("[name=allcompany]").setValue(0);
        form.down("[name=frompt]").setValue(parseInt(apps.pt));
        form.down("[name=untilpt]").setValue(parseInt(apps.pt));
        Ext.Ajax.request({
            url: 'cashier/cashreport/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
                form.down("[name=frompt]").setValue(parseInt(apps.pt));
                form.down("[name=untilpt]").setValue(parseInt(apps.pt));
            },
        });
    },
});