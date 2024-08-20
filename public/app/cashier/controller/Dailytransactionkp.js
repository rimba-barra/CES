Ext.define('Cashier.controller.Dailytransactionkp', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.dailytransactionkp',
    requires: [
        'Ext.EventObject',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Paymentmethodcombobox',
        'Cashier.library.BrowseCashier',
    ],
    views: [
        'dailytransactionkp.Panel',
        'dailytransactionkp.Grid',
        'dailytransactionkp.FormData',
    ],
    stores: [
        'Dailytransactionkp',
        'Project',
        'Pt',
        'Department',
        'Paymentmethod'
    ],
    models: [
        'Dailytransactionkp',
        'Project',
        'Pt',
        'Department',
        'Paymentmethod'
    ],
    refs: [
        {
            ref: 'grid',
            selector: 'dailytransactionkpgrid'
        },
        {
            ref: 'formdata',
            selector: 'dailytransactionkpformdata'
        },
        {
            ref: 'panel',
            selector: 'dailytransactionkppanel'
        }
    ],
    controllerName: 'dailytransactionkp',
    bindPrefixName: 'Dailytransactionkp',
    win: null,
    winId: 'myReportWindow',
    urlprocess: 'cashier/dailytransactionkp/create',
    kasbank_ids: null,
    init: function (application) {
        var me = this;
        this.control({
            'dailytransactionkppanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(350);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(700);
                }
            },
            'dailytransactionkpformdata': {
                afterrender: function() {
                    var me = this;
                    me.loadData();
                }
            },
            'dailytransactionkpformdata [name=project_id]': {
                select: function() {

                    var me = this;
                    var f = me.getFormdata();

                    me.loadPtbyProject(f);
                }
            },
            'dailytransactionkpformdata [action=submit]': {
                click: function(el) {

                    var me = this;
                    var f = me.getFormdata();
                    var print_data_type = f.down("[name=printdata]").getGroupValue();
                    if (print_data_type == 2) {
                        me.showGridData(el);
                    } else {
                        me.kasbank_ids = null;
                        me.showReport();
                    }
                }
            },
            'dailytransactionkpformsearch [name=project_id]': {
                change: function() {
                    var me = this;
                    var f = me.getFormsearch();

                    me.loadPtbyProject(f);
                }
            },
            'dailytransactionkpgrid [action=print]': {
                click: function() {
                    var me = this;
                    var selected_data = me.getGrid().getSelectionModel().getSelection();

                    var tmp_kasbank_ids = [];
                    for (var i = 0; i < selected_data.length; i++) {
                        tmp_kasbank_ids.push(selected_data[i].data.kasbank_id);
                    }
                    
                    me.kasbank_ids = tmp_kasbank_ids.join(',');
                    me.showReport();
                }
            }
        })
    },
    loadData: function() {
        
        var me = this;
        var f = me.getFormdata();

        me.loadDataProject();
        me.loadDataPaymentMethod();

        var date = new Date();
        var firstDay = Ext.Date.format(new Date(date.getFullYear(), date.getMonth(), 1), 'd-m-Y');
        var lastDay = Ext.Date.format(new Date(date.getFullYear(), date.getMonth() + 1, 0), 'd-m-Y');

        f.down("[name=periodfrom]").setValue(firstDay);
        f.down("[name=periodto]").setValue(lastDay);
    },
    loadDataProject: function() {

        var me = this;
        var f = me.getFormdata();
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
                        me.loadPtbyProject(f);
                    }
                }
            }
        });
    },
    loadPtbyProject: function(f) {

        var me = this;
        projectid = f.down("[name=project_id]").getValue();
         
        if (projectid != null){
            projectid = f.down("[name=project_id]").getValue();
        } else {
            projectid = apps.project;
        }
 
        storecoa = f.down("[name=pt_id]").getStore();
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
                    // me.setValueCombobox(me, 'pt_id', row.pt_id, row.ptname);
                    f.down("[name=pt_id]").setValue(row.pt_id);
                    me.loadDataDepartment();
                }         
            }
        });
    },
    loadDataDepartment: function() {

        var me = this;
        var f = me.getFormdata();
        var project_id = f.down("[name=project_id]").getValue();
        var pt_id = f.down("[name=pt_id]").getValue();

        var storedept = me.getStore('Department');
        storedept.load({
            params: {
                "hideparam": 'getdepartmentbyprojectpt',
                "project_id": project_id,
                "pt_id": pt_id,
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {
                if (success) {
                    storedept.insert(0, [{'department_id': '99', 'department': 'ALL DEPT'}]);
                    f.down("[name=dept_id]").setValue(99);
                }
            }
        });
    },
    loadDataPaymentMethod: function() {

        var me = this;
        var f = me.getFormdata();
        var store = me.getStore('Paymentmethod');
        store.load({
            params: {
                "hideparam": 'getpaymentmethod',
                "start": 0,
                "limit": 1000000,
                "dataflow": "O"
            }, callback: function (recordscode, operationcode, successcode) {
                if (successcode) {
                    if (recordscode[0]) {
                        store.insert(0, [{'paymentmethod_id': '9999', 'paymentmethod': 'ALL'}]);
                        f.down("[name=paymentmethod_id]").setValue(9999);
                    }
                }
            }
        });
    },
    showGridData: function(el) {

        var me = this;
        var f = me.getFormdata();
        var store = me.getStore('Dailytransactionkp');
        store.load({
            params: {
                project_id: f.down("[name=project_id]").getValue(),
                pt_id: f.down("[name=pt_id]").getValue(),
                dataflow: f.down("[name=dataflow]").getValue(),
                dept_id: f.down("[name=dept_id]").getValue(),
                dateparam: f.down("[name=dateparam]").getValue(),
                periodfrom: f.down("[name=periodfrom]").getSubmitValue(),
                periodto: f.down("[name=periodto]").getSubmitValue(),
                status: f.down("[name=status]").getValue(),
                paymentmethod_id: f.down("[name=paymentmethod_id]").getValue(),
                sortby: f.down("[name=sortby]").getGroupValue()
            }
        })
        me.instantWindow('Grid', 1050, 'Data Penerimaan & Pengeluaran', 'view', 'myInstantWindow', me.controllerName);

        Ext.getCmp("fs_project_id").setValue(parseInt(apps.project));
        Ext.getCmp("fs_pt_id").setValue(parseInt(apps.pt));

        me.dataSearch();
    },
    dataSearch: function () {
        resetTimer();
        var me = this;
        var form = me.getFormsearch().getForm();
        var store = me.getGrid().getStore();

        me.getFormsearch().down("[name=hideparam]").setValue('getdatadailytransaction');  // added on april 2016, ahmad riadi    
        var fields = me.getFormsearch().getValues();
        for (var x in fields)
        {
            if (x == "datefrom" || x == "dateto") {
                store.getProxy().setExtraParam(x, Ext.Date.format(fields[x], 'Y-m-d'));
            } else {
                store.getProxy().setExtraParam(x, fields[x]);
            }
        }
        me.loadPage(store);
    },
    showReport: function() {

        var me = this;
        me.form = me.getFormdata().getForm();
        me.setupData();
    },
    setupData: function () {
        var me, form, formvalue, arrliquidlabel, arrdetaillabel, date;
        me = this;
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        date = new Date();

        if (form.getForm().isValid()) {
            
            formvalue['dept_id'] = form.down("[name=dept_id]").getValue() == "" ? 0 : form.down("[name=dept_id]").getValue();
            formvalue['project_name'] = form.down("[name=project_id]").getRawValue();
            formvalue['pt_name'] = form.down("[name=pt_id]").getRawValue();
            formvalue['dataflow_label'] = form.down("[name=dataflow]").getRawValue();
            formvalue['department'] = form.down("[name=dept_id]").getRawValue();
            formvalue['status_label'] = form.down("[name=status]").getRawValue();
            formvalue['payment_method'] = form.down("[name=paymentmethod_id]").getRawValue();
            formvalue['date_report'] = form.down("[name=dateparam]").getRawValue();
            formvalue['period'] = form.down("[name=periodfrom]").getRawValue() + ' to ' + form.down("[name=periodto]").getRawValue();
            formvalue['reportfile'] = 'reportdailytransactionkp';
            formvalue['print_date'] = Ext.Date.format(new Date, 'd-m-Y H:i:s');
            formvalue['userprint'] = apps.username;
            formvalue['tgl_sekarang'] = Ext.Date.format(new Date, 'd/m/Y');
            formvalue['time_sekarang'] = Ext.Date.format(new Date, 'H:i:s');
            formvalue['kasbank_id'] = me.kasbank_ids;

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
})