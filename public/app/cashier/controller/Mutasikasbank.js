Ext.define('Cashier.controller.Mutasikasbank', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Mutasikasbank',
    requires: [
        'Cashier.library.tools.Mytools',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Coacomboboxgrid',
        'Cashier.library.template.combobox.Coagrid',
        'Cashier.library.template.combobox.Departmentcombobox'
    ],
    views: [
        'mutasikasbank.Panel',
        'mutasikasbank.FormData'
    ],
    stores: [
        'Project',
        'Ptbyuser',
        'Pt',
        'Coacombo',
        'Department',
    ],
    models: [
        'Project',
        'Pt',
        'Coa',
        'Department'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'mutasikasbankformdata'
        },
        {
            ref: 'panel',
            selector: 'mutasikasbankpanel'
        }
    ],
    controllerName: 'mutasikasbank',
    fieldName: '',
    bindPrefixName: 'Mutasikasbank',
    urlprocess: 'cashier/mutasikasbank/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, //'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null, 
    value: null,
    init: function (application) {
        var me = this;
        this.control({
            'mutasikasbankpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(350);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                }
            },
            'mutasikasbankformdata': {
                afterrender: function() {

                    var me = this;
                    var f = me.getFormdata();
                    var date = new Date();
                    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

                    var storeproject = me.getStore('Project');
                    storeproject.load({
                        params: {
                            "hideparam": 'projectpt',
                            "project_id": apps.project,
                            "start": 0,
                            "limit": 1000000,
                        }, callback: function (recordscode, operationcode, successcode) {
                            if (successcode) {
                                if (recordscode[0]) {
                                    var firstdatacode = recordscode[0]['data'];
                                    f.down("[name=project_id]").setValue(parseInt(apps.project));
                                    me.loadPtbyProject();
                                }
                            }
                        }
                    });

                    f.down("[name=periodfrom]").setValue(firstDay);
                    f.down("[name=periodto]").setValue(lastDay);
                },
                boxready: function() {
                    
                    var me = this;

                    $("#mutasikasbankID input[name='sub_coa_from_id']").keyup(function()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/,'$1'+'.'+'$2')
                    });

                    $("#mutasikasbankID input[name='sub_coa_until_id']").keyup(function()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/,'$1'+'.'+'$2')
                    });
                }
            },
            'mutasikasbankformdata [name=project_id]': {
                select: function(el) {
                    this.loadPtbyProject();
                }
            },
            'mutasikasbankformdata [name=pt_id]': {
                change: function(el) {

                    form = me.getFormdata();
                    this.loadCoabypt(el.value);
                    this.loadDeptbypt(el.value);
                }
            },
            'mutasikasbankformdata [name=dept_id]': {
                select: function(el) {
                    if (el.value != "" && el.value != 0) {
                        me.getFormdata().down("[name=dept_all]").setValue(false);
                    }
                } 
            },
            'mutasikasbankformdata [name=dept_all]': {
                change: function(el) {
                    var me = this;
                    if (el.checked == true) {
                        me.getFormdata().down("[name=dept_id]").setValue("");
                    }
                }
            },
            'mutasikasbankformdata [action=submit]': {
                click: function() {
                    this.showReport();
                }
            }
        });
    },
    loadPtbyProject: function(){

        var me = this;
        projectid = me.getFormdata().down("[name=project_id]").getValue();
   
         
        if (projectid != null){
            projectid = me.getFormdata().down("[name=project_id]").getValue();
        } else {
            projectid = apps.project;
        }
 
        var f = me.getFormdata();
        storecoa = me.getStore('Pt');
        storecoa.load({
            params: {
                "hideparam": 'getptbyuserproject',
                "start": 0,
                "limit": 1000000,
                "project_id": projectid,
                "user_id": apps.uid
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    me.setValueCombobox(me, 'pt_id', row.pt_id, row.ptname);
                }         
            }
        });
    },
    loadCoabypt: function(newValue){

        var me = this;
        me.pt_id = newValue;

        var f = me.getFormdata();
        var project_id = f.down("[name=project_id]").getValue();


        storecoa = me.getStore('Coacombo');
        storecoa.load({
            params: {
                "hideparam": 'coagridbyuserpt',
                "start": 0,
                "limit": 1000000,
                "pt_id_owner": newValue ,
                "project_id": project_id
            },
            callback: function (records, operation, success) {


                if (records[0]) {
                    var row = records[0]['data'];
                    me.setValueCombobox(me, 'sub_coa_from_id', row.coa_id,row.coa_id);
                    me.setValueCombobox(me, 'sub_coa_until_id', row.coa_id,row.coa_id);
                }
              
                records.forEach(function(entry) {
                    var row = entry.data;
                    if(row.coa=='10.00.000'){
                        me.setValueCombobox(me, 'sub_coa_from_id', row.coa_id,row.coa);
                    }
                    if(row.coa=='90.00.000'){
                        me.setValueCombobox(me, 'sub_coa_until_id', row.coa_id,row.coa);
                    }
                });
            }
        });

    },
    loadDeptbypt: function(newValue){

        var me = this;
        me.pt_id = newValue;

        var f = me.getFormdata();
        var project_id = f.down("[name=project_id]").getValue();


        storedept = me.getStore('Department');
        storedept.load({
            params: {
               "hideparam": 'getdepartmentbyprojectpt',
                "project_id": project_id,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {

                if (success) {
                    f.down("[name=dept_id]").setValue('');
                    f.down("[name=dept_all]").setValue(true);
                }
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
        var me, form, formvalue, arrliquidlabel, arrdetaillabel, date;
        me = this;
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        arrliquidlabel = {1: "Liquid", 0: "Non-Liquid", 2: "All"};
        arrdetaillabel = {1: "Yes", 0: "No"};
        date = new Date();

        if (form.getForm().isValid()) {
            
            formvalue['dept_id'] = form.down("[name=dept_id]").getValue() == "" ? 0 : form.down("[name=dept_id]").getValue();
            formvalue['project_name'] = form.down("[name=project_id]").getRawValue();
            formvalue['pt_name'] = form.down("[name=pt_id]").getRawValue();
            formvalue['coafrom'] = form.down("[name=sub_coa_from_id]").getRawValue();
            formvalue['coato'] = form.down("[name=sub_coa_until_id]").getRawValue();
            formvalue['department_name'] = form.down("[name=dept_id]").getRawValue() == "" ? "All" : form.down("[name=dept_id]").getRawValue();
            formvalue['liquid'] = arrliquidlabel[formvalue["is_liquid"]];
            formvalue['detail'] = arrdetaillabel[formvalue["is_detail"]];
            formvalue['print_date'] = Ext.Date.format(date, 'd-m-Y');
            formvalue['reportfile'] = 'TransaksiMutasiKasBank';
            formvalue['userprint'] = apps.username;
            formvalue['tgl_sekarang'] = Ext.Date.format(new Date(), 'd/m/Y');
            formvalue['time_sekarang'] = Ext.Date.format(new Date(), 'H:i:s');

            me.setForAjax(formvalue);
        }
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

            me.createWindows();
            me.submitReport(value);
        }
    },
    createWindows: function () {
        var me = this;
        var title = 'Result ' + me.getFormdata().up('window').title;
        var winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'YmdHis');
        me.instantWindowWithMinimize('Panel', 800, title, 'state-report', winId, me.controllerName);
        me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(winId);
    },
    submitReport: function (value) {        
        var me, report, html;
        me = this;
        report = value.reportfile;
        html = me.ReportviewerV4(value, report, me.win.id, 1);
        me.win.down("#MyReportPanel_" + me.win.id).body.setHTML(html);
        $("#Reportform_" + me.win.id).submit();
    },
});