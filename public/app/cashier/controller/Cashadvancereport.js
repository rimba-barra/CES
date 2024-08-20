Ext.define('Cashier.controller.Cashadvancereport', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Cashadvancereport',
    requires: [
        'Cashier.library.tools.Mytools',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Groupcombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Employeehrdcombobox',
        'Cashier.library.template.combobox.Voucherprefixcashcombobox',
        'Cashier.library.template.combobox.Ptcombobox'
    ],
    views: [
        'cashadvancereport.Panel',
        'cashadvancereport.FormData'
    ],
    stores: [
        'Ptbyuser',
        'Grouptransaction',
        'Voucherprefixsetup',
        'Voucherprefixsetupcombo',
        'Department',
        'Project',
        'Pt',
        'Employee'
    ],
    models: [
        'Voucherprefixsetup',
        'Project',
        'Pt',
        'Employee'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'cashadvancereportformdata'
        },
        {
            ref: 'paneldata',
            selector: 'cashadvancereportpanel'
        }
    ],
    controllerName: 'cashadvancereport',
    fieldName: '',
    bindPrefixName: 'Cashadvancereport',
    urlprocess: 'cashier/cashadvancereport/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null, cluster: null,
    value: null,
    statusdetail: null, statusdetaildesc: null, periode: null, filtercoa: null,
    fromcoa: null, untilcoa: null, fromdate: null, untildate: null,
    init: function (application) {
        var me = this;
        this.control({
            'cashadvancereportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.windowsHeight(me.bindPrefixName, 480);
                    me.windowsWidht(me.bindPrefixName, 800);
                    me.panelAfterRender();
                }
            },
            'cashadvancereportformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();
                },
                boxready: this.formdataReady,
            },
            'cashadvancereportformdata [name=allproject]': {
                change: function (the, newValue, oldValue, eOpts) {
                    var me, form;
                    me = this;
                    form = me.getFormdata();
                    me.fromuntilproject(newValue);
                    me.fromuntilcompany(newValue);
                    me.setVal(form, 'allcompany', newValue);

                },
            },
            'cashadvancereportformdata [name=allcompany]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilcompany(newValue);
                    if (newValue == true) {
                        // me.filterbyCompany();
                    }
                },
            },
            'cashadvancereportformdata [name=allperiode]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntildate(newValue);

                },
            },
            'cashadvancereportformdata [name=alldepartment]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntildepartment(newValue);
                },
            },
            'cashadvancereportformdata [name=departmentproject]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.groupDeptProject();
                },
            },
            'cashadvancereportformdata [name=detailaccount]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.groupDetailAccount();
                },
            },
            'cashadvancereportformdata [name=format]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.groupFormat();
                },
            },
            'cashadvancereportformdata [name=frompt]': {
                beforerender: function() {
                    var me, form, storeEmployee;
                    me = this;
                    form = me.getFormdata();                    
                    
                    storeEmployee = me.getStore('Employee');
                    storeEmployee.getProxy().setExtraParam("hideparam", "getStaffNameCashAdvance");
                },
                select: function(field, eOpts) {

                    var me, form, storeEmployee;
                    me = this;
                    form = me.getFormdata();                    
                    
                    storeEmployee = me.getStore('Employee');

                    var pt_id = form.down("[name=frompt]").getValue();
                    var project_id = form.down("[name=frompt]").valueModels[0].raw.project_id;

                    me.loadDataStaff(project_id, pt_id);
                    // me.filterbyCompany();
                    me.loadDataPrefix();
                },
            },
            'cashadvancereportformdata [name=untilpt]': {
                change: function (field, eOpts) {
                    var me, form, allcompany;
                    me = this;
                    form = me.getFormdata();
                    // me.filterbyCompany();
                    me.loadDataPrefix();
                },
            },
            'cashadvancereportformdata [name=allstaff]': {
                change: function(the, newValue, oldValue, eOpts) {
                    me.fromuntilstaff(newValue); 
                }
            },
          /*  'cashadvancereportformdata [name=prefixcash]': {
                change: function (the, newValue, oldValue, eOpts) {
                    var me, row, form;
                    me = this;
                    form = me.getFormdata();
                    if (the.valueModels[0] !== undefined) {
                        row = the.valueModels[0].data;
                        me.setVal(form, 'prefixcash', row.coa);
                    }
                },
            },
            */
            'cashadvancereportformdata [name=byclosedate]': {
                change: function (e) {
                    var me =this;
                    var f = me.getFormdata();

                    if (e.value) {
                        f.down("[name=fromclosedate]").setDisabled(false).setValue('');
                        f.down("[name=untilclosedate]").setDisabled(false).setValue('');
                    }else{
                        f.down("[name=fromclosedate]").setDisabled(true).setValue('');
                        f.down("[name=untilclosedate]").setDisabled(true).setValue('');
                    }
                }
            },
            'cashadvancereportformdata button[action=submit]': {
                click: function () {
                    this.showReport();
                }
            },
            'cashadvancereportformdata [name=frompt]': {
                change: function () {
                    var me =this;
                    var form = me.getFormdata();
                    var frompt = form.down("[name=frompt]").valueModels[0].raw.pt_id;
                    var untilpt = form.down("[name=untilpt]").setValue(frompt);
                },
            }
        });
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
                , untildepartment, groupby, returndata, detailaccount,
                reportfile, sortcaption, statuscaption, fromstaff, byrealization;
        me = this;
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        if (form.getForm().isValid()) {
            if (formvalue.departmentproject == 'project') {
                if (formvalue.allproject == '1') {
                    formvalue['fromproject'] = '';
                    formvalue['untilproject'] = '';
                    formvalue['frompt'] = '';
                    formvalue['untilpt'] = '';
                } else {
                    formvalue['fromproject'] = form.down("[name=fromproject]").valueModels[0].raw.code;
                    formvalue['untilproject'] = form.down("[name=untilproject]").valueModels[0].raw.code;
                    formvalue['frompt'] = form.down("[name=frompt]").valueModels[0].raw.ptcode;
                    formvalue['untilpt'] = form.down("[name=untilpt]").valueModels[0].raw.ptcode;
                }

            } else {
                if (formvalue.allcompany == '1') {
                    formvalue['fromproject'] = '';
                    formvalue['untilproject'] = '';
                    formvalue['frompt'] = '';
                    formvalue['untilpt'] = '';
                } else {
                    formvalue['fromproject'] = form.down("[name=frompt]").valueModels[0].raw.projectcode;
                    formvalue['untilproject'] = form.down("[name=untilpt]").valueModels[0].raw.projectcode;
                    formvalue['frompt'] = form.down("[name=frompt]").valueModels[0].raw.ptcode;
                    formvalue['untilpt'] = form.down("[name=untilpt]").valueModels[0].raw.ptcode;
                }
                if (formvalue.alldepartment == '1') {
                    formvalue['fromdepartment'] = 'ALL Dept';
                    // formvalue['untildepartment'] = '';
                } else {
                    formvalue['fromdepartment'] = form.down("[name=fromdepartment]").valueModels[0].raw.code;
                    // formvalue['untildepartment'] = form.down("[name=untildepartment]").valueModels[0].raw.code;
                }
            }
            if (formvalue.allperiode == '1') {
                formvalue['fromperiode'] = '';
                formvalue['untilperiode'] = '';
            }

            if (formvalue.detailaccount == 'no') {
                formvalue['detailvoucher'] = '';
            }
            // if (formvalue.format == 'rekap') {
                formvalue['grouptype'] = Ext.ComponentQuery.query("[name=grouptype]")[0].getGroupValue();
            // }

            if (formvalue.allstaff == '0') {
                formvalue['fromstaff'] = form.down("[name=fromstaff]").valueModels[0].raw.employee_id;
            } else {
                formvalue['fromstaff'] = "";
            }         
            
           // formvalue['reportfile'] = me.selectReport(formvalue);
           // iqbal 17 sep 2019 
           formvalue['pt_id'] = form.down("[name=frompt]").getValue();
           formvalue['pt_id_to'] = form.down("[name=untilpt]").getValue();
           formvalue['project_id'] = form.down("[name=frompt]").valueModels[0].raw.project_id;
           formvalue['pt_name'] = form.down("[name=frompt]").valueModels[0].raw.ptname;
           formvalue['dept_id'] = form.down("[name=fromdepartment]").getValue();
           formvalue['start_date'] = form.down("[name=fromperiode]").getSubmitData().fromperiode;
           formvalue['end_date'] = form.down("[name=untilperiode]").getSubmitData().untilperiode;
           formvalue['cash_status'] = Ext.ComponentQuery.query('[name=cashstatus]')[0].getGroupValue();
           formvalue['detail_voucher'] = Ext.ComponentQuery.query("[name=detailvoucher]")[0].getGroupValue();
           formvalue['sortby'] = Ext.ComponentQuery.query("[name=sortby]")[0].getGroupValue();
           if(formvalue['sortby'] == 1){
                sortcaption = 'Cashbon No';
           }else if(formvalue['sortby'] == 2){
                sortcaption = 'Cashbon Date';
           }else{
                sortcaption = 'Cashbon Amount';
           }

           if(formvalue['cash_status'] == 1){
                statuscaption = 'All Status';
           }else if(formvalue['cash_status'] == 2){
                statuscaption = 'Unpaid Cashbon';
           }else if(formvalue['cash_status']== 3) {
                statuscaption = 'Closed';
           }else if(formvalue['cash_status']== 5) {
                statuscaption = 'Both All';
            }else{
                statuscaption = 'Active Only';
           }
           formvalue['sortircaption'] = sortcaption;
           formvalue['statuscaption'] = statuscaption;
           formvalue['prefix_id'] = form.down("[name=prefixcash]").getValue();
           formvalue['user_id'] = apps.uid;
           formvalue['reportfile'] = 'Cashadvancereport';
           formvalue['latefee'] = Ext.ComponentQuery.query("[name=latefee]")[0].getGroupValue();
           
           // end 
            formvalue['coa'] = me.getVal(form, 'prefixcash', 'raw');
            var realiz = form.down("[name=byrealization]").getValue();
            var r = 0 ;
            if (realiz) {
                r = 1;
            }else{
                r = 0;
            }
            
            formvalue['byrealization'] = r;

            var byclosedate = form.down("[name=byclosedate]").getValue();
            var cd = 0 ;
            
            formvalue['fromclosedate'] = null;
            formvalue['untilclosedate'] = null;
            
            if (byclosedate) {
                formvalue['byclosedate'] = 1;
                formvalue['fromclosedate'] = form.down("[name=fromclosedate]").getSubmitData().fromclosedate;
                formvalue['untilclosedate'] = form.down("[name=untilclosedate]").getSubmitData().untilclosedate;
            }

            console.log(formvalue);
            
            me.setForAjax(formvalue);
        }
    },
    selectReport: function (formvalue) {
        var report, tmpreport;
        if (formvalue.detailaccount == 'yes' && formvalue.format == 'detail' && formvalue.detailvoucher == 'no') {
            report = 'Cashadvancestandard';
        } else if (formvalue.detailaccount == 'yes' && formvalue.format == 'detail' && formvalue.detailvoucher == 'yes') {
            report = 'Cashadvancewithdetailvoucher';
        } else if (formvalue.detailaccount == 'yes' && formvalue.format == 'rekap' && formvalue.detailvoucher == 'no') {
            report = 'Cashadvancestandard';
        } else if (formvalue.detailaccount == 'yes' && formvalue.format == 'rekap' && formvalue.detailvoucher == 'yes') {
            report = 'Cashadvancewithdetailvoucher';
        } else if (formvalue.detailaccount == 'no' && formvalue.format == 'rekap' && formvalue.detailvoucher == '') {
            report = 'Cashadvancerekapbydept';
        } else if (formvalue.detailaccount == 'no' && formvalue.format == 'detail' && formvalue.detailvoucher == '') {
            if (formvalue.grouptype == 'nogroup') {
                tmpreport = 'Cashadvancestandard';
            } else if (formvalue.grouptype == 'staff') {
                tmpreport = 'Cashadvancestandardbystaff';
            } else if (formvalue.grouptype == 'departmentcompany') {
                tmpreport = 'Cashadvancestandardbydept';
            }
            report = tmpreport;
        }
        return report;

    },
    setForAjax: function (formvalue) {
        var me;
        me = this;
        resetTimer();
        me.senddata = formvalue;
        me.urlrequest = me.urlprocess;
        Ext.getBody().mask("Please wait...");
        me.AjaxRequest();
    },
    createWindows: function () {
        var me = this;
        me.winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'His');
        var title = 'Result ' + me.getFormdata().up('window').title;
        me.instantWindowWithMinimize('Panel', 800, title, 'state-report', me.winId, me.controllerName);
        me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function (value) {        
        var me, report, html;
        me = this;
        report = 'report_cashadvance/' + value.reportfile;
        html = me.ReportviewerV4(value, report, me.win.id, 1); //whole report
        me.win.down("#MyReportPanel_" + me.win.id).body.setHTML(html);
        $("#Reportform_" + me.win.id).submit();
    },
    groupDetailAccount: function () {
        var me, form, value, itemid, data, index, radioid, status;
        me = this;
        form = me.getFormdata();
        value = me.gValRadio(form, "detailaccount");
        data = form.down('[name=fielddetailvoucher]').items.keys;
        if (value !== undefined) {
            if (value == 'yes') {
                status = false;
            } else {
                status = true;
            }
            for (index in data) {
                data = form.down('[name=fielddetailvoucher]').items.keys[index];
                if (data.indexOf("radio") > -1) {
                    radioid = data;
                    me.Fdisablebyid(form, radioid, status);
                }
            }
        }
    },
    groupFormat: function () {
        var me, form, value, itemid, data, index, radioid, status;
        me = this;
        form = me.getFormdata();
        value = me.gValRadio(form, "format");
        data = form.down('[name=fieldgrouptype]').items.keys;
        if (value !== undefined) {
            if (value == 'detail') {
                status = false;
            } else {
                status = true;
            }
            for (index in data) {
                data = form.down('[name=fieldgrouptype]').items.keys[index];
                if (data.indexOf("radio") > -1) {
                    radioid = data;
                    me.Fdisablebyid(form, radioid, status);
                }
            }
        }
    },
    groupDeptProject: function () {
        var me, form, value;
        me = this;
        form = me.getFormdata();
        value = me.gValRadio(form, "departmentproject");
        if (value !== undefined) {
            if (value == 'department') {
                me.Fdisable(form, "allproject", true);
                me.Fdisable(form, "alldepartment", false);
                me.setVal(form, "alldepartment", true);
            } else if (value == 'project') {
                me.Fdisable(form, "allproject", false);
                me.Fdisable(form, "alldepartment", true);
                me.Fdisable(form, "fromdepartment", true);
                // me.Fdisable(form, "untildepartment", true);
                me.setAllow(form, "fromdepartment", true);
                // me.setAllow(form, "untildepartment", true);
            }
            me.setValCombo(form, "fromproject", '', '');
            me.setValCombo(form, "untilproject", '', '');
            me.setValCombo(form, "fromdepartment", '', '');
            // me.setValCombo(form, "untildepartment", '', '');
        }
    },
    formDataAfterRenderCustome: function () {
        var me, storecoa, form = '';
        me = this;

        var fromdateraw = new Date('01-01-2020'); //new Date(new Date().getFullYear(), 0, 1);
        var untildateraw = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
        
        form = me.getFormdata();

        me.setVal(form, 'fromperiode', Ext.Date.format(fromdateraw, 'd-m-Y'));
        me.setVal(form, 'untilperiode', Ext.Date.format(untildateraw, 'd-m-Y'));
        // me.setVal(form, 'cutoff_date', me.dateNow);
        me.setStoreFormdata();
        // me.fromuntilproject(true);
        // me.fromuntilcompany(true);
        me.fromuntildepartment(true);
        me.fromuntilstaff(true);
        // me.fromuntildate(true);
        me.groupDeptProject();
    },
    fromuntildepartment: function(status) {
        var me, form;
        me = this;
        form = me.getFormdata();
        me.Fdisable(form, "fromdepartment", status);
        me.setAllow(form, "fromdepartment", status);
        me.setValCombo(form, "fromdepartment", '', '');
    },
    fromuntilstaff: function(status) {
        var me, form;
        me = this;
        form = me.getFormdata();
        me.Fdisable(form, "fromstaff", status);
        me.setAllow(form, "fromstaff", status);
        me.setValCombo(form, "fromstaff", '', '');
    }, 
    setStorePrefix: function () {
        var me, store, form, in_out;
        me = this;
        form = me.getFormdata();
        store = me.getStore("Voucherprefixsetupcombo");
        var rowdata = form.down('[name=frompt]').valueModels[0]['raw'];
        // store.getProxy().setExtraParam('pt_pt_id', apps.pt);
        store.getProxy().setExtraParam('frompt', form.down("[name=frompt]").getValue());
        store.getProxy().setExtraParam('untilpt', form.down("[name=untilpt]").getValue());
        store.getProxy().setExtraParam('kasbank', 'K');
        store.getProxy().setExtraParam('user_id', apps.uid);
         store.getProxy().setExtraParam('project_id', rowdata.project_id);
        store.getProxy().setExtraParam('hideparam', 'getvoucherprefixsetupv3kaskecil');
        form.setLoading('Loading prefix');
        store.loadData([], false);
        store.reload({
            callback: function (records, operation, success) {
                form.setLoading(false); 
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
        if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
            value = me.info.data;
           
            if (value.paramjs.allperiode == '1') {
                value['periode'] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear() + " s/d " + me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
            } else {
                value['periode'] = value.paramjs.fromperiode + " s/d " + value.paramjs.untilperiode;
            }
            
            // iqbal 17 september 2019 
           value['pt_id'] = value.paramjs.pt_id;
           value['pt_id_to'] = value.paramjs.pt_id_to;
           value['project_id'] = value.paramjs.project_id;
           value['pt_name'] = value.paramjs.pt_name;
           value['dept_id'] = value.paramjs.dept_id;
           value['fromperiode'] = value.paramjs.start_date;
           value['untilperiode'] = value.paramjs.end_date;
           value['cutoffdate'] = value.paramjs.cutoff_date;
           value['cash_status'] = value.paramjs.cash_status;
           value['detail_voucher'] = value.paramjs.detail_voucher;
           value['sortby'] = value.paramjs.sortby;
           value['byrealization'] = value.paramjs.byrealization;
           value['sortircaption'] = value.paramjs.sortircaption;
           value['fromdepartment'] = value.paramjs.fromdepartment;
           value['statuscaption'] = value.paramjs.statuscaption;
           value['grouptype'] = value.paramjs.grouptype;
           value['fromstaff'] = value.paramjs.fromstaff;
           value['prefix_id'] = value.paramjs.prefix_id;
           value['user_id'] = value.paramjs.user_id;
           value['latefee'] = value.paramjs.latefee;
           value['byclosedate'] =  value.paramjs.byclosedate;
           value['fromclosedate'] =  value.paramjs.fromclosedate;
           value['untilclosedate'] =  value.paramjs.untilclosedate;
           // end

            value['detailaccount'] = value.paramjs.detailaccount;
            value['cashbontype'] = value.paramjs.cashbontype;
            value['cashstatus'] = value.paramjs.cashstatus;
            value['grouptype'] = value.paramjs.grouptype;
            value['userprint'] = me.userprint;
            value["printdate"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
            value["timeprint"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
            value['tgl_sekarang'] = Ext.Date.format(new Date(), 'd/m/Y');
            value['time_sekarang'] = Ext.Date.format(new Date(), 'H:i:s');
            me.createWindows();
            me.submitReport(value);
        }
    },
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'cashier/cashadvancereport/read',
            timeout: 45000000,
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
            },
        });
    },
    formdataReady: function () {
        var me, form, storeprefix;
        me = this;
        form = me.getFormdata();
        storeprefix = form.down('[name=prefixcash]').getStore();
        // me.filterStatusCash(storeprefix);
        // me.setStorePrefix();

        // me.loadDataPrefix();        

        form.down("[name=frompt]").setValue(parseInt(apps.pt));
        form.down("[name=untilpt]").setValue(parseInt(apps.pt));

        me.loadDataStaff(apps.project, apps.pt);
    },
    filterStatusCash: function (store) {
        var me, form, firstrecord, store;
        me = this;
        form = me.getFormdata();
        store = form.down("[name=prefixcash]").getStore();
        store.clearFilter(true);
        store.filter('cash_bank', 'K');
        store.filter('in_out', 'I');
        me.getFirstdataprefix();
    },
    getFirstdataprefix: function () {
        var me, form, store, index, row, firstdata;
        me = this;
        form = me.getFormdata();
        store = form.down('[name=prefixcash]').getStore();
        if (store.first() !== undefined) {

        } else {
            store.reload({
                callback: function (records, operation, success) {
                    me.filterStatusCash(store);
                }
            });
        }

        if (store.first() !== undefined) {
            store.reload({
                callback: function() {
                    var firstdata = store.first().data; 
                    me.setValCombo(form, 'prefixcash', firstdata.prefix_id, firstdata.coa);
                }
            })
        }

        
    },
    filterbyCompany: function () {
        var me, form, combobox, store;
        me = this;
        form = me.getFormdata();
        combobox = form.down('[name=prefixcash]');
        store = combobox.getStore();
        store.reload({
            params: {
                "hideparam": 'filterprefixbypt',
                "fromprojectpt": me.getVal(form, 'frompt', 'raw'),
                "untilprojectpt": me.getVal(form, 'untilpt', 'raw'),
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                me.filterStatusCash(store);
            }
        });
    },
    loadDataStaff: function(project_id, pt_id) {

        if (project_id == "") {
            project_id = apps.project;
        }

        if (pt_id == "") {
            pt_id = apps.pt;
        }

        var me = this;
        var form = me.getFormdata();                    
        var storeEmployee = me.getStore('Employee');

        storeEmployee.load({
            params: {
                "hideparam": 'getStaffNameCashAdvance',
                "pt_id": pt_id,
                "project_id": project_id,
                "start": 0,
                "limit": 1000000
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var row = [{'': ''}];
                    row.push(records[0]['data']);
                    
                    me.setValCombo(form, "fromstaff", row.employee_id, row.employee_name);
                }
                
            }
        });
    },
    loadDataPrefix: function() {

        var me = this;
        var f  = me.getFormdata();

        var frompt = f.down("[name=frompt]").getValue();
        var untilpt = f.down("[name=untilpt]").getValue();

        var store = f.down("[name=prefixcash]").getStore();
        store.load({
            params: {
                hideparam: 'getvoucherprefixsetupv3kaskecil',
                frompt: frompt,
                untilpt: untilpt
            },
            callback: function(records, operation, success) {
                var prefix_id = records[0].data.prefix_id;
                var coa = records[0].data.coa;
                
                me.setVal(f, "prefixcash", prefix_id, coa);
            }
        })
    }
});