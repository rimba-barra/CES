Ext.define('Cashier.controller.Vdtransaction', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Vdtransaction',
    requires: [
        'Cashier.library.template.combobox.Coacomboboxgrid',
        'Cashier.library.template.combobox.Coagrid',
        'Cashier.library.template.combobox.Subaccountgroupcomboboxgrid',
        'Cashier.library.template.combobox.SubaccountcodeComboboxgrid',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.VendorcomboboxV2',
        'Cashier.library.template.combobox.Departmentbyusercombobox',
        'Cashier.library.template.combobox.Ptprojectcustomcombobox',
    ],
    views: [
        'vdtransaction.Panel',
        'vdtransaction.FormData'
    ],
    stores: [
        'Vdtransaction',
        'Vendorcombo',
        'VendorcomboV2',
        'Department',
        'Coacombo',
        'Project',
        'Ptbyuser',
        'Subaccountgroup',
        'Subaccountcode',
        'Pt',
        'Departmentbyuser',
        'Ptcustomcombo',
    ],
    models: [
        'Vdtransaction',
        'Coa',
        'Project',
        'Pt',
        'Subaccountgroup',
        'Subaccountcode',
        'Ptcustomcombo',
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'vdtransactionformdata'
        },
        {
            ref: 'paneldata',
            selector: 'vdtransactionpanel'
        },
        {
            ref: 'gridkel',
            selector: 'vdgroupcomboboxgrid'
        }
    ],
    controllerName: 'vdtransaction',
    fieldName: '',
    bindPrefixName: 'Vdtransaction',
    urlprocess: 'cashier/vdtransaction/read',
    kelsub_id: null,
    paramcoa: null, fromcoa_id: 0, fromcoa: null, untilcoa_id: 0, untilcoa: null,
    reportby: null, voucherby: null, subby: null, detailby: null, fromkelsub: null, untilkelsub: null,
    fromdate: null, untildate: null, fromsubcode: null, untilsubcode: null,
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow', checksub: null, report: null,
    statusprocess: null, project_name: null, pt_name: null, userid: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null,
    storekelsub: null, kelsubid_from: null, kelsubid_to: null,
    fromvendor:null,untilvendor:null,
    cluster: null,
    status: null,
    init: function (application) {
        var me = this;
        this.control({
            'vdtransactionpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(400);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(800);
                    me.panelAfterRender();
                }
            },
            'vdtransactionformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();
                }
            },
            'vdtransactionformdata button[action=submit]': {
                click: function () {
                    me.Processdata();
                }
            },
            'vdtransactionformdata [name=project_id]': {
                select: function(combo, records, eOpts) {
                    var me = this;
                    var project_id = combo.value;

                    me.loadDataPt(project_id);
                    me.loadDataVendor(project_id);
                }
            },
            'vdtransactionformdata [name=pt_id_from]': {
                change: function (el) {

                    var me = this;
                    var f = me.getFormdata();

                    var project_id = f.down("[name=project_id]").getValue();
                    var pt_id_from = f.down("[name=pt_id_from]").getValue();
                    var pt_id_to = f.down("[name=pt_id_to]").getValue();

                    me.loadDataDepartment(project_id, pt_id_from, pt_id_to);
                }
                
            },
            'vdtransactionformdata [name=pt_id_to]': {
                change: function (el) {

                    var me = this;
                    var f = me.getFormdata();

                    var project_id = f.down("[name=project_id]").getValue();
                    var pt_id_from = f.down("[name=pt_id_from]").getValue();
                    var pt_id_to = f.down("[name=pt_id_to]").getValue();

                    me.loadDataDepartment(project_id, pt_id_from, pt_id_to);
                }
                
            },
            'vdtransactionformdata [name=from_vendor_id]': {
                select: function (cb, newValue, oldValue, options) {
                    me.fromvendor = newValue[0].raw.vendor_id;
                },
                keyup: function(dis) {
                    
                    var me = this;
                    var storevendor;
                    var f = me.getFormdata();

                    var project_id = f.down("[name=project_id]").getValue();

                    storevendor = me.getStore('Vendorcombo');
                    storevendor.load({
                        params: {
                            "hideparam": 'getvendorbyproject',
                            "start": 0,
                            "limit": 1000000,
                            "project_id": project_id,
                            "query": dis.rawValue
                        },
                        callback: function (records, operation, success) {
                            storevendor.sort('vendorname', 'ASC');
                            if (success) {

                            }                            
                        }
                    });
                }
            },
            'vdtransactionformdata [name=until_vendor_id]': {
                select: function (cb, newValue, oldValue, options) {
                    me.untilvendor = newValue[0].raw.vendor_id;
                   
                },
                keyup: function(dis) {
                    
                    var me = this;
                    var storevendorV2;
                    var f = me.getFormdata();

                    var project_id = f.down("[name=project_id]").getValue();

                    storevendorV2 = me.getStore('VendorcomboV2');
                    storevendorV2.load({
                        params: {
                            "hideparam": 'getvendorbyproject',
                            "start": 0,
                            "limit": 1000000,
                            "project_id": project_id,
                            "query": dis.rawValue
                        },
                        callback: function (records, operation, success) {
                            storevendorV2.sort('vendorname', 'ASC');
                            if (success) {
                            }                            
                        }
                    })
                }
            },
            'vdtransactionformdata [name=allvendor]': {
                change: function(el) {
                    var me = this; 
                    var f = me.getFormdata();
                    var is_select = el.checked;
                    var project_id = f.down("[name=project_id]").getValue();

                    if (is_select == true) {
                        f.down("[name=from_vendor_id]").setDisabled(true);
                        f.down("[name=until_vendor_id]").setDisabled(true);

                        f.down("[name=from_vendor_id]").setValue('');
                        f.down("[name=until_vendor_id]").setValue('');
                    } else {
                        f.down("[name=from_vendor_id]").setDisabled(false);
                        f.down("[name=until_vendor_id]").setDisabled(false);

                        me.loadDataVendor(project_id);
                    }
                }
            }
        });
    },
    Processdata: function () {
        var me, form, groupby, transactiontype, dataflow, detailcoa,ptid,projectid,
            fromvendorid,untilvendorid,fromdate,untildate,fromdeptid,untildeptid,reporttype = '';
        me = this;

        form = me.getFormdata();
        // rowdata = form.down('[name=pt_id]').valueModels[0]['raw'];
        me.pt_id_from = form.down("[name=pt_id_from]").getValue();
        me.pt_id_to = form.down("[name=pt_id_to]").getValue();
        me.project_id = form.down("[name=project_id]").getValue();
        me.groupby = Ext.ComponentQuery.query('[name=group_by]')[0].getGroupValue();
        me.transactiontype = Ext.ComponentQuery.query('[name=trans_type]')[0].getGroupValue();
        me.dataflow = Ext.ComponentQuery.query('[name=data_flow]')[0].getGroupValue();
        me.detailcoa = Ext.ComponentQuery.query('[name=detail_coa]')[0].getGroupValue();
        me.detailcoacaption = form.down("[name=detail_coa]").getValue();
        me.fromvendorid = form.down("[name=from_vendor_id]").getValue();
        me.untilvendorid = form.down("[name=until_vendor_id]").getValue();
        me.fromdate = me.getValue(me, "from_date", "raw");
        me.untildate = me.getValue(me, "until_date", "raw");
        me.fromdeptid =form.down("[name=from_dept_id]").getValue();
        me.untildeptid = form.down("[name=until_dept_id]").getValue();
        me.reporttype = form.down("[name=reporttype]").getValue();
        me.user_id = apps.uid;
        me.status = Ext.ComponentQuery.query('[name=status]')[0].getGroupValue();

       if(me.reporttype == 'DEFAULT'){
                me.senddata = {
                hideparam: 'justreturn',
                pt_id: me.pt_id_from,
                pt_id_to: me.pt_id_to,
                project_id: me.project_id,
                group_by: me.groupby,
                transaction_type: me.transactiontype,
                data_flow: me.dataflow,
                detail_coa: me.detailcoa,
                detailcoacaption: me.detailcoacaption,
                from_vendor_id: me.fromvendorid,
                until_vendor_id: me.untilvendorid,
                from_date: me.fromdate,
                until_date: me.untildate,
                from_dept_id: me.fromdeptid,
                until_dept_id: me.untildeptid,
                report_type: me.reporttype,
                user_id: me.user_id,
                status: me.status
            }
            console.log('default');
            Ext.getBody().mask("Please wait...");
            me.urlrequest = 'cashier/vdtransaction/create';
            me.AjaxRequest();
       }else{
             me.showReport();
       }
    },
    showReport: function () {
        var me;
        me = this;
        var title = 'Result ' + me.getFormdata().up('window').title;
        me.winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'YmdHis');
        me.form = me.getFormdata().getForm();
        // var e = me.getFormdata().down("[name=pt_id]");
        // var x = e.getStore().findRecord("pt_id", me.getFormdata().down("[name=pt_id]").getValue());
        var reporttype = me.getFormdata().down("[name=reporttype]").getValue();

        if(reporttype=='DEFAULT'){
            me.instantWindowWithMinimize('Panel', 800, title, 'state-report', me.winId, me.controllerName);
        }else if(reporttype=='EXCEL'){
          
        }else{
            me.instantWindowWithMinimize('Panel', 800, title, 'state-report', me.winId, me.controllerName);
        }

        me.paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);
        var dataflowcaption;
       
        if (true) {
            resetTimer();
            me.value = me.form.getValues();
            // me.value["project_name"] = x.data['projectname'];
            // me.value["pt_name"] = x.data['ptname'];
            me.value["pt_id"] = me.pt_id_from;
            me.value["userprint"] = me.userprint;
            me.value["userid"] = me.userid;
            me.value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
            me.value["time_sekarang"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
            // me.value["project_id"] = x.data['project_id'];
            // me.value["pt_id"] = me.getFormdata().down("[name=pt_id]").getValue();

            if(me.dataflow == ''){
                dataflowcaption = 'IN and OUT';
            }else if(me.dataflow == 'I'){
                dataflowcaption = 'IN'
            }else{
                dataflowcaption = 'OUT'
            }

            me.value["dataflowcaption"] = dataflowcaption;
            me.value["groupby"] = me.groupby;
            me.value["transactiontype"] = me.transactiontype;
            me.value["dataflow"] = me.dataflow;
            me.value["detailcoa"] = me.detailcoa;
            me.value["detailcoacaption"] = (me.detailcoacaption == true) ? 'YES' : 'NO';
            me.value["fromdate"] = me.reformatDateString(me.fromdate);
            me.value["untildate"] = me.reformatDateString(me.untildate);
            me.value["tanggal"] = me.value["fromdate"] + ' s/d ' + me.value["untildate"];
            me.value["fromvendorid"] = me.fromvendorid;
            me.value["untilvendorid"] = me.untilvendorid;
            me.value["fromdeptid"] = me.fromdeptid;
            me.value["untildeptid"] = me.untildeptid;
            var dy = new Date(me.value["fromdate"]);
            me.value["tahun"] = dy.getFullYear();
            me.value["status"] = me.status;

            var params = me.value;
            var reportFile = 'VdTransaction';

           
            if(reporttype == 'DEFAULT'){
                me.html = me.ReportviewerV4(params, reportFile, me.win.id, 1);
                me.win.down("#MyReportPanel_" + me.win.id).body.setHTML(me.html);
                $("#Reportform_" + me.win.id).submit();
            }else{
                
                me.generatereportexcel(params);
                return false;  
            }
         
        }


    },
    defaultRange: function () {
        var me = '';
        me = this;
        me.senddata = {
            hideparam: 'defaultrange'
        }
        me.urlrequest = 'cashier/vdtransaction/create';
        me.AjaxRequest();
    },
    generatereportexcel: function(params){   
         var me,report;
         me = this;  
         params['hideparam'] = 'generatereportexcel',
         me.senddata = params,
         me.urlrequest = 'cashier/vdtransaction/create';
         Ext.getBody().mask("Please wait...");
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
                    fn: function () {
                        me.formDataClose();
                    }
                });
            }
        } else if (me.info.parameter == 'defaultrange') {
            var form = me.getFormdata();
            Ext.getBody().unmask();

            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            me.setValue(me, 'from_date', firstDay);
            me.setValue(me, 'until_date', lastDay);
            me.yeardata = me.info.data.yeardb;
            //form.down("[name=subfromdate]").setMinValue(me.yeardata + '-01-01');
            //form.down("[name=subfromdate]").setMaxValue(me.info.data.enddecember);
            //form.down("[name=subuntildate]").setMinValue(me.yeardata + '-01-01');
            //form.down("[name=subuntildate]").setMaxValue(me.info.data.enddecember);
        } else if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
        }   else if (me.info.parameter == 'processreport') {
            Ext.getBody().unmask();
            me.statusprocess = me.info.success;
            if (me.statusprocess == true) {
                me.cluster = me.info.data.cluster;
                me.showReport();
            }
        } else if (me.info.parameter == 'justreturn') {
            Ext.getBody().unmask();
            me.showReport();
        }else if (me.info.parameter == 'generatereportexcel') {
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
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: me.urlprocess,
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
                me.userid = info.userid;
            },
        });
    },
    formDataAfterRenderCustome: function () {

        var me, storecoa, storekelsub, storesubcode, storeproject, storept, storevendor, storedept, storevendorV2 = '';
        me = this;

        var f = me.getFormdata();

        me.defaultRange();

        this.loadDataProject();
        this.loadDataVendor(apps.project);        
    },
    loadDataProject: function() {

        var me = this;
        var f  = me.getFormdata();

        var store = me.getStore('Project');
        store.getProxy().setExtraParam('hideparam', 'getptbyuserid');
        store.sort('projectname', 'ASC');
        store.load({
            callback: function(records, operation, success) {
                if (records) {
                    f.down("[name=project_id]").setValue(parseInt(apps.project));

                    me.loadDataPt(apps.project);
                }
            }
        });
    },
    loadDataPt: function(project_id) {

        var me = this;
        var f  = me.getFormdata();

        /*var store = me.getStore('Pt');

        store.sort('ptname', 'ASC');
        store.load({
            params: {
                'hideparam': 'getptbyproject',
                'project_id': project_id,
                'user_id': apps.uid
            },
            callback: function(records, operation, success) {
                if (records) {

                    if (project_id == apps.project) {
                        f.down("[name=pt_id_from]").setValue(parseInt(apps.pt));
                        f.down("[name=pt_id_to]").setValue(parseInt(apps.pt));
                    } else {
                        f.down("[name=pt_id_from]").setValue(parseInt(store.data.items[0].data.pt_id));
                        f.down("[name=pt_id_to]").setValue(parseInt(store.data.items[store.data.items.length - 1].data.pt_id));
                    }                    
                }
            }
        });*/

        var store = me.getStore('Ptcustomcombo');

        store.sort('ptname', 'ASC');
        store.load({
            params: {
                'hideparam': 'getptbyprojectV2',
                'project_id': project_id,
                'user_id': apps.uid
            },
            callback: function(records, operation, success) {
                console.log(records);
                if (records) {

                    if (project_id == apps.project) {
                        f.down("[name=pt_id_from]").setValue(parseInt(apps.pt));
                        f.down("[name=pt_id_to]").setValue(parseInt(apps.pt));
                    } else {
                        f.down("[name=pt_id_from]").setValue(parseInt(store.data.items[0].data.pt_id));
                        f.down("[name=pt_id_to]").setValue(parseInt(store.data.items[store.data.items.length - 1].data.pt_id));
                    }                    
                }
            }
        });
    },
    loadDataDepartment: function(project_id, pt_id_from, pt_id_to) {

        var me = this;
        var storedept = '';
        storedept = me.getStore('Departmentbyuser');
        storedept.load({
            params: {
                "hideparam": 'getdepartmentbyuserv2',
                "start": 0,
                "limit": 1000000,
                "project_id": project_id,
                "frompt": pt_id_from,
                "untilpt": pt_id_to
            },
            callback: function (records, operation, success) {
               if (success) {

                    var last = records.length - 1;
                    var firstdatacode = records[0]['data'];
                    var lastdatacode = records[last]['data'];

                    if (records[0]) {
                        me.setValue(me, "from_dept_id", firstdatacode.department_id);
                        
                    }else{
                        me.setValue(me, "from_dept_id", '');
                    }

                    if(records[last]){
                        me.setValue(me, "until_dept_id", lastdatacode.department_id);

                    }else{
                        me.setValue(me, "until_dept_id", '');
                    }
                }
                
            }
        });
    },
    loadDataVendor: function(project_id) {

        var me = this;
        var f = me.getFormdata();
        var from_vendor = f.down("[name=from_vendor_id]").getStore();
        var until_vendor = f.down("[name=until_vendor_id]").getStore();

        from_vendor.removeAll();
        until_vendor.removeAll();

        Ext.Ajax.request({
            url: 'cashier/common/read',
            method: 'POST',
            params: {
                'hideparam': 'getfirstandlastvendor',
                'project_id': project_id
            },
            success: function(response) {
                var result = Ext.JSON.decode(response.responseText);
                var data = result.data;

                from_vendor.add({
                    vendor_id: data[0].vendor_id,
                    vendorname: data[0].vendorname,
                    vendorcode: data[0].code,
                    address: data[0].address
                });
                me.setValueCombobox(me, 'from_vendor_id', data[0].vendor_id, data[0].vendorname);

                until_vendor.add({
                    vendor_id: data[1].vendor_id,
                    vendorname: data[1].vendorname,
                    vendorcode: data[1].code,
                    address: data[1].address
                });
                me.setValueCombobox(me, 'until_vendor_id', data[1].vendor_id, data[1].vendorname);
            }
        })
    }
});