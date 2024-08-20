Ext.define('Cashier.controller.Unpaidcheque', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Unpaidcheque',
    requires: [
        'Cashier.library.tools.Mytools',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Prefixcombobox'
    ],
    views: [
        'unpaidcheque.Panel',
        'unpaidcheque.FormData'
    ],
    stores: [
        'Project',
        'Ptbyuser',
        'Pt',
        'Prefixcombo'
    ],
    models: [
        'Project',
        'Pt',
        'Prefix'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'unpaidchequeformdata'
        },
        {
            ref: 'panel',
            selector: 'unpaidchequepanel'
        }
    ],
    controllerName: 'unpaidcheque',
    fieldName: '',
    bindPrefixName: 'Unpaidcheque',
    urlprocess: 'cashier/unpaidcheque/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null, 
    value: null,
    init: function (application) {
        var me = this;
        this.control({
            'unpaidchequepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(300);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                }
            },
            'unpaidchequeformdata': {
                afterrender: function() {

                    var me = this;
                    var f = me.getFormdata();
                    var date = new Date();

                    var firstDay = new Date(date.getFullYear(), 0, 1);

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

                    f.down("[name=prefix_id]").setDisabled(true);

                    f.down("[name=periodfrom]").setValue(firstDay);
                    f.down("[name=periodto]").setValue(date);
                }
            },
            'unpaidchequeformdata [name=project_id]': {
                change: function(el) {
                    this.loadPtbyProject();
                }
            },
            'unpaidchequeformdata [name=pt_id]': {
                change: function(el) {

                    var form = me.getFormdata();
                    var project_id = form.down("[name=project_id]").getValue();
                    var pt_id = form.down("[name=pt_id]").getValue();

                    me.loadPrefix(project_id, pt_id);
                }
            },
            'unpaidchequeformdata [name=prefix_all]': {
                change: function(el, newValue, oldValue, eOpts) {
                    var me = this;
                    var is_checked = newValue;
                    var f = me.getFormdata();
                    var store = f.down("[name=prefix_id]").getStore();

                    if (is_checked) {
                        f.down("[name=prefix_id]").setDisabled(true);
                        f.down("[name=prefix_id]").setValue('');
                    } else {
                        f.down("[name=prefix_id]").setDisabled(false);
                        f.down("[name=prefix_id]").setValue(store.data.items[0].data.prefix_id);
                    }
                }
            },
            'unpaidchequeformdata [action=submit]': {
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
        date = new Date();

        var prefix_name = '';
        var prefix_id = 0;
        if (form.down("[name=prefix_all]").getValue() == true) {
            prefix_name = "All Prefix";
            prefix_id = 0;
        } else {
            prefix_name = form.down("[name=prefix_id]").getRawValue();
            prefix_id = form.down("[name=prefix_id]").getValue();
        }

        if (form.getForm().isValid()) {
            
            formvalue['project_name'] = form.down("[name=project_id]").getRawValue();
            formvalue['pt_name'] = form.down("[name=pt_id]").getRawValue();
            formvalue['prefix_name'] = prefix_name;
            formvalue['prefix_id'] = prefix_id;
            formvalue['cheque_type_name'] = form.down("[name=type]").getRawValue();
            formvalue['tgl_sekarang'] = Ext.Date.format(date, 'd/m/Y');
            formvalue['time_sekarang'] = Ext.Date.format(date, 'H:i:s');
            formvalue['userprint'] = apps.username;
            formvalue['reportfile'] = 'Unpaidcheque';

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
        me.winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'YmdHis');
        me.instantWindowWithMinimize('Panel', 800, title, 'state-report', me.winId, me.controllerName);
        me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function (value) {        
        var me, report, html;
        me = this;
        report = value.reportfile;
        html = me.ReportviewerV4(value, report, me.win.id, 1);
        me.win.down("#MyReportPanel_" + me.win.id).body.setHTML(html);
        $("#Reportform_" + me.win.id).submit();
    },
    loadPrefix: function(project_id, pt_id) {

        var me = this;
        var f  = me.getFormdata();
        var store = f.down("[name=prefix_id]").getStore();

        store.load({
            params: {
                hideparam: 'getprefixbyprojectpt',
                project_id: project_id,
                pt_id: pt_id,
                start: 0,
                limit: 1000,
                is_cashier: 1
            }
        })
    }
});