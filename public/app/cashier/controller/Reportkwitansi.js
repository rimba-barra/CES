Ext.define('Cashier.controller.Reportkwitansi', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Reportkwitansi',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Prefixcombobox',
        'Cashier.library.template.combobox.Projectptcombobox'
    ],
    views: [
        'reportkwitansi.Panel',
        'reportkwitansi.FormData'
    ],
    stores: [
        'Prefixcombo',
        'Projectpt'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'reportkwitansiformdata'
        },
        {
            ref: 'paneldata',
            selector: 'reportkwitansipanel'
        },
    ],
    models: [
        'Prefix',
        'Projectpt'
    ],
    controllerName: 'reportkwitansi',
    fieldName: '',
    bindPrefixName: 'Reportkwitansi',
    urlprocess: 'cashier/reportkwitansi/read',
    kelsub_id: null,
    paramcoa: null, fromcoa_id: 0, fromcoa: null, untilcoa_id: 0, untilcoa: null,
    reportby: null, voucherby: null, subby: null, detailby: null, fromkelsub: null, untilkelsub: null,
    fromdate: null, untildate: null, fromsubcode: null, untilsubcode: null,
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow', checksub: null, report: null,
    statusprocess: null, project_name: null, pt_name: null, userid: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null,
    storekelsub: null, kelsubid_from: null, kelsubid_to: null,
    cluster: null,
    getMe: function(){
       var me = this;
       return _Apps.getController(me.bindPrefixName);
    },
    init: function (application) {
        var me = this;
        this.control({
            'reportkwitansipanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(247);
                    panel.up("panel").setWidth(300);
                    me.panelAfterRender();
                }
            },
            'reportkwitansiformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();
                },
            },
            'reportkwitansiformdata [name="prefix_receipt"]': {
                select: function (el) {
                    var me = this;
                    var fd = me.getFormdata();
                    if (el.value != '') {
                        fd.down("[name=prefix_all]").setValue(0);
                    }else{
                        fd.down("[name=prefix_all]").setValue(1);
                    }
                },
            },
            'reportkwitansiformdata [name="prefix_all"]': {
                change: function (el) {
                    var me = this;
                    var fd = me.getFormdata();
                    if (el.value) {
                        fd.down("[name=prefix_receipt]").setValue();
                    }
                },
            },
            'reportkwitansiformdata [name="pt_id"]': {
                select: function (el) {
                    var me = this;
                    var fd = me.getFormdata();
                    var pt_id = parseInt(el.valueModels[0].data.pt_id);
                    var project_id = parseInt(el.valueModels[0].data.project_project_id);

                    me.project_name = el.valueModels[0].data.project_name;
                    me.pt_name = el.valueModels[0].data.name;
                    me.userprint = el.valueModels[0].data.userprint;

                    fd.down('[name=pt_name]').setValue(me.pt_name);
                    fd.down("[name=pt_pt_id]").setValue(pt_id);
                    fd.down("[name=project_id]").setValue(project_id);

                    me.changeprefixbyprojectpt(project_id, pt_id);
                },
            },
            
            'reportkwitansiformdata [name="statusreceipt"]': {
                change: function (el) {
                    var me = this;
                    var fd = me.getFormdata();
                    fd.down("[name=prefix_receipt]").getStore();

                    var val = fd.down("[name=statusreceipt]").getValue();
                    if ( val == 'ALL' || val == 'NEW') {
                        fd.down("[name=from_date]").setValue();
                        fd.down("[name=until_date]").setValue();
                        fd.down("[id=periodeDate]").setVisible(false);
                    }else{
                        fd.down("[id=periodeDate]").setVisible(true);
                    }
                },
            },
            'reportkwitansiformdata button[action=submit]': {
                click: function () {
                    var me = this;
                    var fd = me.getFormdata();
                    me.Processdata();
                }
            },
        });
    },
    changeprefixbyprojectpt: function (projectID, ptID) {
        var me = this;
        var f = me.getFormdata();
        store = f.down('[name=prefix_receipt]').getStore("Prefixcombo");
        store.removeAll();
        store.clearFilter();

        store.load({
            params: {
              "hideparam" : 'getprefixbyprojectpt',
              "project_id": projectID,
              "pt_id"     : ptID,
              "start"     : 0,
              "limit"     : 1000000,
            }, callback   : function (recordscode, operationcode, successcode) {
                
            }
        });
    },
    panelAfterRender: function () {
        var me = this.getMe();
        var f = me.getFormdata();
        Ext.Ajax.request({
            url: 'cashier/trialbalanceb/read',
            success: function (data) {
                 try {
                    var info = Ext.JSON.decode(data.responseText);
                    var item = info.pt[0];
                    store = f.down('[name=pt_id]').getStore("ptstore");
                    store.removeAll();
                    store.clearFilter();
                    var currentmultiprojectdetail_id = 0;
                    for (let i = 0; i < item.length; i++) {
                        if (apps.pt == item[i].pt_id && apps.project == item[i].project_project_id) {
                            currentmultiprojectdetail_id = item[i].multiprojectdetail_id;
                        }

                        store.add({
                            multiprojectdetail_id : item[i].multiprojectdetail_id, 
                            pt_id: item[i].pt_id, 
                            code: item[i].code,
                            name: item[i].name,
                            project_name: item[i].project_name,
                            project_project_id: item[i].project_project_id
                        });
                    }
                    me.project_name = info.project_name;
                    me.pt_name = info.pt_name + " (" + me.project_name + ")";

                    f.down('[name=pt_name]').setValue(me.pt_name);

                    f.down('[name=pt_id]').setValue(currentmultiprojectdetail_id);

                    f.down('[name=pt_pt_id]').setValue(parseInt(apps.pt));
                    f.down('[name=project_id]').setValue(parseInt(apps.project));
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }

                
            },
        });


        Ext.Ajax.request({
            url: 'cashier/reportkwitansi/read',
            success: function (data) {
                 try {
                    var info = Ext.JSON.decode(data.responseText);
                    var item = info.prefix_receipt[0];
                    store = f.down('[name=prefix_receipt]').getStore("prefixreceiptstore");
                    store.removeAll();
                    store.clearFilter();
                    for (let i = 0; i < item.length; i++) {
                        store.add({
                            prefix_receipt : item[i].prefix_no
                        });
                    }
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }

                
            },
        });
    },
    formDataAfterRenderCustome: function () {
        var me, storecoa = '', storept = '', f;
        me = this;

        f       = me.getFormdata();
        storept = me.getStore('Projectpt');

        Ext.Ajax.request({
            url    : 'cashier/balancesheetkp/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                storept.load({
                    params: {
                        "hideparam": 'projectpt',
                        "start"    : 0,
                        "limit"    : 1000000
                    },
                    callback: function (records, operation, success) {
                        if (records[0]) {
                            var row = records[0]['data'];
                              //me.setValueCombobox(me, 'pt_id', row.pt_id,row.ptname);
                        }
                    }
                });
            },
        });

        var storeprefix = me.getStore('Prefixcombo');
        storeprefix.load({
            params: {
              "hideparam" : 'getprefixbyprojectpt',
              "project_id": apps.project,
              "pt_id"     : apps.pt,
              "start"     : 0,
              "limit"     : 1000000,
            }, callback   : function (recordscode, operationcode, successcode) {
                
            }
        });
    },
    Processdata: function () {
        var me, form;
        me = this;
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        var prefixx = '';
        if (formvalue['prefix_all'] == 1) {
            prefixx = '';
        }else{
            if (formvalue['prefix_receipt'] == undefined) {
                Ext.Msg.show({
                    title: 'Warning',
                    msg: 'Prefix Tidak boleh kosong.',
                    icon: Ext.Msg.WARNING,
                    buttons: Ext.Msg.OK,
                    fn: function () {
                        return false;
                    }
                });
                return false;
            }

            prefixx = formvalue['prefix_receipt'];
        }

        var formatreport = 'processreport'
        if (formvalue['reporttype'] == 'EXCEL') {
            formatreport = 'generateexcel';
        }

        if (formvalue['statusreceipt'] == 'USED' || formvalue['statusreceipt'] == 'VOID' || formvalue['statusreceipt'] == 'DELETE') {
            if (formvalue['datetype'] == null || formvalue['from_date'] == "" || formvalue['until_date'] == "") {
                Ext.Msg.show({
                    title: 'Warning',
                    msg: 'Date must be filled.',
                    icon: Ext.Msg.WARNING,
                    buttons: Ext.Msg.OK,
                    fn: function () {
                        return false;
                    }
                });
                return false;
            }
        }
       
        me.senddata = {
            pt_id        : formvalue['pt_pt_id'],
            project_id   : formvalue['project_id'],
            statusreceipt: formvalue['statusreceipt'],
            prefix       : prefixx,
            datetype     : formvalue['datetype'],
            datefrom     : formvalue['from_date'],
            untildate    : formvalue['until_date'],
            hideparam    : formatreport,
            pt_name      : formvalue['pt_name']
        }

        Ext.getBody().mask("Please wait...");
        me.urlrequest = 'cashier/reportkwitansi/create';
        me.AjaxRequest();
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout:100000000,  
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
        var me = this;
        if (me.info.parameter == 'processreport') {
            Ext.getBody().unmask();
            me.statusprocess = me.info.success;
            if (me.statusprocess == true) {
                me.showReport();
            }
        }else{
            Ext.getBody().unmask();
            var file_path = me.info.data.url;  
            
            var a = document.createElement('A');
            a.href = file_path;
            a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            Ext.getBody().unmask();
            Ext.Msg.show({
                title: 'Success',
                msg: 'Process data successfully.',
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
        }
    },
    showReport: function () {
        var me;
        me = this;
        var title = 'Result ' + me.getFormdata().up('window').title;
        me.winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'YmdHis');
        me.form = me.getFormdata().getForm();

        me.instantWindowWithMinimize('Panel', 800, title, 'state-report', me.winId, me.controllerName);

        me.paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);
       
        if (true) {
            resetTimer();
            me.value                  = me.form.getValues();
            me.value["project_name"]  = me.project_name;
            me.value["pt_name"]       = me.value.pt_name;
            me.value["userprint"]     = me.userprint;
            me.value["tgl_sekarang"]  = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
            me.value["time_sekarang"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
            me.value["pt_id"]         = parseInt(me.value.pt_pt_id);
            me.value["project_id"]    = parseInt(me.value.project_id);
            me.value["statusreceipt"] = me.value.statusreceipt;
            var prefixx = '';
            if (me.value.prefix_all == 1) {
                prefixx = '';
            }else{
                prefixx = me.value.prefix_receipt;
            }

            me.value["prefix"]     = prefixx;
            me.value["datetype"]   = parseInt(me.value.datetype);
            me.value["from_date"]  = me.value.from_date;
            me.value["until_date"] = me.value.until_date;
            me.value["print_name"] = apps.username;

            var params = me.value;
            var reportFile = 'Report_kwitansi';

            me.html = me.ReportviewerV4(params, reportFile, me.win.id, 1);
            me.win.down("#MyReportPanel_" + me.win.id).body.setHTML(me.html);
            $("#Reportform_" + me.win.id).submit();       
        }


    },
});