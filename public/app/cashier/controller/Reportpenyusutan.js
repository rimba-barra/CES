Ext.define('Cashier.controller.Reportpenyusutan', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Reportpenyusutan',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Coacomboboxgrid',
        'Cashier.library.template.combobox.Coagrid',
        // 'Cashier.library.template.combobox.Ptcombobox'
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectptcombobox'
    ],

    views: [
        'reportpenyusutan.Panel',
        'reportpenyusutan.FormData'
    ],

    stores: [
        'Reportpenyusutan',
        'Coacombo',
        'Pt',
        'Projectpt'
    ],

    models: [
        'Reportpenyusutan',
        'Coa',
        'Pt',
        'Projectpt'
    ],

    refs: [{
        ref: 'formdata',
        selector: 'reportpenyusutanformdata'
    }, {
        ref: 'paneldata',
        selector: 'reportpenyusutanpanel'
    }],

    controllerName: 'reportpenyusutan',
    fieldName: '',
    bindPrefixName: 'Reportpenyusutan',
    reportfile: 'Reportpenyusutan',
    urlprocess: 'cashier/reportpenyusutan/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null,
    paramsStr: null,
    win: null,
    params: null,
    dateNow: new Date(),
    html: null,
    winId: 'myReportWindow',
    project_name: null,
    pt_name: null,
    userprint: null,
    urlrequest: null,
    senddata: null,
    info: null,
    form: null,
    value: null,
    fromcoa: null,
    untilcoa: null,projectpt_id:null,project_id:null,pt_id:null,
    getMe: function() {
        var me = this;
        return _Apps.getController(me.bindPrefixName);
    },
    init: function(application) {
        var me = this;
        this.control({
            'reportpenyusutanpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function(panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(250);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'reportpenyusutanformdata': {
                afterrender: function(panel) {
                    this.formDataAfterRenderCustome();

                }
            },
            'reportpenyusutanformdata [name=pt_id]': {
                change: function(the, newValue, oldValue, eOpts) {
                    this.loadCoabypt(newValue);
                }
            },
            'reportpenyusutanformdata [name=from_coa_id] ': {
                'keyup': function() {
                    var me, value;
                    me = this;
                    value = me.getFormdata().down("[name=from_coa_id]").getRawValue();
                    this.autocompletecombo(value);
                },

            },
            'reportpenyusutanformdata [name=until_coa_id] ': {
                'keyup': function() {
                    var me, value;
                    me = this;
                    value = me.getFormdata().down("[name=until_coa_id]").getRawValue();
                    this.autocompletecombo(value);
                },
            },
            'reportpenyusutanformdata button[action=submit]': {
                click: function() {
                    this.processReport();
                }
            },

        });
    },

    panelAfterRender: function() {
        var me = this;
        Ext.Ajax.request({
            url: 'cashier/reportpenyusutan/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
                console.log(info);
                me.projectpt_id = info.projectpt_id;
                me.project_id = info.project_id;
                me.project_name = info.project_name;
                me.pt_id = info.pt_id;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
            },
        });
    },

    formDataAfterRenderCustome: function() {
        var me, storecoa = '';
        me = this;
        // me.defaultRange();
        var f = me.getFormdata();

        storecoa = me.getStore('Coacombo');
        storecoa.load({
            params: {
                "hideparam": 'coagrid',
                "start": 0,
                "limit": 1000000,
            },
            callback: function(records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    me.setValueCombobox(me, 'from_coa_id', row.coa_id, row.coa);
                    me.setValueCombobox(me, 'until_coa_id', row.coa_id, row.coa);
                }

            }
        });

        storept = me.getStore('Projectpt');

        Ext.Ajax.request({
            url: 'cashier/reportpenyusutan/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);

                storept.load({
                    params: {
                        "hideparam": 'projectpt',
                        "start": 0,
                        "limit": 1000000
                    },
                    callback: function(records, operation, success) {
                        if (records[0]) {
                            var row = records[0]['data'];
                            f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                        }

                    }
                });
            },
        });

        var date = new Date();
        var firstDay = new Date(date.getFullYear(), 0, 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        me.setValue(me, 'fromdate', me.formatDate(firstDay));
        me.setValue(me, 'untildate', me.formatDate(lastDay));
    },

    formatDate: function(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    },

    autocompletecombo: function(value) {
        var me, storecoa, value;
        me = this;
        storecoa = me.getStore('Coacombo');
        storecoa.clearFilter();
        storecoa.filter('coa', value);
    },

    loadCoabypt: function(newValue) {

        var me = this;
        var f = me.getFormdata();
        valueModels = f.down("[name=pt_id]").valueModels[0];
        var project_id = valueModels.data.project_id;
        var pt_id = valueModels.data.pt_id;

        storecoa = me.getStore('Coacombo');
        storecoa.load({
            params: {
                "hideparam": 'coagridbyuserpt',
                "start": 0,
                "limit": 1000000,
                "pt_id_owner": pt_id,
                "project_id": project_id
            },
            callback: function(records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    me.setValueCombobox(me, 'from_coa_id', row.coa_id, row.coa);
                }

                if (records[records.length - 1]) {
                    var row = records[records.length - 1]['data'];
                    me.setValueCombobox(me, 'until_coa_id', row.coa_id, row.coa);
                }

            }
        });

    },
    processReport: function() {
        var me = this;
        var f = me.getFormdata();
        var type = f.down("[name=type_tr]").getValue();

        if (type == 'DEFAULT') {
            var winId = 'myReportWindow';
            me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
            var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
            var win = desktop.getWindow(winId);
            // return;
            if (win) {
                var params = me.getFormdata().getForm().getFieldValues();
                var dateNow = new Date();

                var reportFile = me.reportfile;
                valueModels = f.down("[name=pt_id]").valueModels[0];

                params["pt_id"] = f.down("[name=pt_id]").getValue();
                params["project_id"] = valueModels.data.project_id;

                params["pt_name"] = me.getValueCombobox(me, "pt_id").value;
                params["project_name"] = valueModels.data.projectname;
                params["coastart_id"] = f.down("[name=from_coa_id]").getValue();
                params["coaend_id"] = f.down("[name=until_coa_id]").getValue();

                params["fromdate"] = me.formatDate(f.down("[name=fromdate]").getValue());
                params["untildate"] = me.formatDate(f.down("[name=untildate]").getValue());

                params["report_alias"] = 'RP-' + me.getValueCombobox(me, "pt_id").value + '_' + params["fromdate"] + '_' + params["untildate"];

                var html = me.ReportviewerV2(params, reportFile);
                win.down("#MyReportPanel").body.setHTML(html);
                $("#Reportform").submit();
            }
        } else {
            var params = me.getFormdata().getForm().getFieldValues();
            var dateNow = new Date();

            var reportFile = me.reportfile;
            valueModels = f.down("[name=pt_id]").valueModels[0];

            params["pt_id"] = f.down("[name=pt_id]").getValue();
            params["project_id"] = valueModels.data.project_id;

            params["pt_name"] = me.getValueCombobox(me, "pt_id").value;
            params["project_name"] = valueModels.data.projectname;
            params["coastart_id"] = f.down("[name=from_coa_id]").getValue();
            params["coaend_id"] = f.down("[name=until_coa_id]").getValue();

            params["fromdate"] = me.formatDate(f.down("[name=fromdate]").getValue());
            params["untildate"] = me.formatDate(f.down("[name=untildate]").getValue());

            params["report_alias"] = 'RP-' + me.getValueCombobox(me, "pt_id").value + '_' + params["fromdate"] + '_' + params["untildate"];

            me.generateReportExcel(params);
            return false;
        }
    },

    generateReportExcel: function(params) {
        var me, report;
        me = this.getMe();
        params['hideparam'] = 'generateReportExcel',
            me.senddata = params,
            me.urlrequest = 'cashier/reportpenyusutan/create';
        Ext.getBody().mask("Please wait...");
        me.AjaxRequest();
    },

    defaultRange: function() {
        var me = '';
        me = this.getMe();
        me.senddata = {
            hideparam: 'defaultrange'
        }
        me.urlrequest = 'cashier/dailytransaction/create';
        me.AjaxRequest();
    },

    AjaxRequest: function() {
        var me;
        me = this.getMe();
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 100000000,
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function(response) {
                me.info = Ext.JSON.decode(response.responseText);
                me.setSuccessEvent();
            },
            failure: function(response) {
                me.getFormdata().up('window').close();
            }
        });
    },

    setSuccessEvent: function() {
        var me = this.getMe();
        if (me.info.parameter == 'default') {
            if (me.info.counter < 1) {
                Ext.getBody().unmask();
                me.buildWarningAlert(me.info.message);
            } else {
                Ext.getBody().unmask();
                Ext.Msg.show({
                    title: 'Success',
                    msg: 'Process  data successfully.',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK,
                    fn: function() {
                        me.formDataClose();
                    }
                });
            }
        } else if (me.info.parameter == 'generateReportExcel') {
            Ext.getBody().unmask();
            var file_path = me.info.data.url;
            var a = document.createElement('A');
            a.href = file_path;
            a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            Ext.getBody().unmask();
        }
    },
});