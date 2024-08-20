Ext.define('Cashier.controller.Financepositionreport', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Financepositionreport',
    requires: [
        'Cashier.library.template.combobox.Coacomboboxgrid',
        'Cashier.library.template.combobox.Coagrid',
        'Cashier.library.template.combobox.Subaccountgroupcomboboxgrid',
        'Cashier.library.template.combobox.SubaccountcodeComboboxgrid',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox'
    ],
    views: [
        'financepositionreport.Panel',
        'financepositionreport.FormData'
    ],
    stores: [
        'Financepositionreport',
        'Vendorcombo',
        'Department',
        'Coacombo',
        'Project',
        'Ptbyuser',
        'Subaccountgroup',
        'Subaccountcode',
        'Ptforcashbon',
        'Pt'
    ],
    models: [
        'Financepositionreport',
        'Coa',
        'Project',
        'Pt',
        'Subaccountgroup',
        'Subaccountcode',
        'Ptforcashbon'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'financepositionreportformdata'
        },
        {
            ref: 'paneldata',
            selector: 'financepositionreportpanel'
        },
      /*  {
            ref: 'gridkel',
            selector: 'vdgroupcomboboxgrid'
        }*/
    ],
    controllerName: 'financepositionreport',
    fieldName: '',
    bindPrefixName: 'Financepositionreport',
    urlprocess: 'cashier/financepositionreport/read',
    kelsub_id: null,
    paramcoa: null, fromcoa_id: 0, fromcoa: null, untilcoa_id: 0, untilcoa: null,
    reportby: null, voucherby: null, subby: null, detailby: null, fromkelsub: null, untilkelsub: null,
    fromdate: null, untildate: null, fromsubcode: null, untilsubcode: null,
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow', checksub: null, report: null,
    statusprocess: null, project_name: null, pt_name: null, userid: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null,
    storekelsub: null, kelsubid_from: null, kelsubid_to: null, report_date: null,
    cluster: null,
    init: function (application) {
        var me = this;
        this.control({
            'financepositionreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(250);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'financepositionreportformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();
                }
            },
           
           
            'financepositionreportformdata button[action=submit]': {
                click: function () {
                    me.Processdata();

                }
            },
           
            
           
            'financepositionreportformdata [name=pt_id]': {
                change: function (el) {
                    me.setprojectpt(el.name, el.ownerCt);
                   
                }
                
            },
           
        });
    },
    
    Processdata: function () {
        var me, form, groupby, transactiontype, liquid, is_liquid,ptid,projectid,
            fromvendorid,untilvendorid,fromdate,untildate,fromdeptid,untildeptid,reporttype = '',showzerovalue;
        me = this;

        form = me.getFormdata();
        rowdata = form.down('[name=pt_id]').valueModels[0]['raw'];
        me.ptid = rowdata.pt_id;
        me.projectid = rowdata.project_id;
        /*me.groupby = Ext.ComponentQuery.query('[name=group_by]')[0].getGroupValue();
        me.transactiontype = Ext.ComponentQuery.query('[name=trans_type]')[0].getGroupValue();
        me.dataflow = Ext.ComponentQuery.query('[name=data_flow]')[0].getGroupValue();
        me.detailcoa = Ext.ComponentQuery.query('[name=detail_coa]')[0].getGroupValue();
        me.detailcoacaption = form.down("[name=detail_coa]").getValue();
        me.fromvendorid = form.down("[name=from_vendor_id]").getValue();
        me.untilvendorid = form.down("[name=until_vendor_id]").getValue();
        */
        // console.log(form.down("[name=is_liquid]").getGroupValue()); return false;
        // me.fromdate = me.getValue(me, "from_date", "raw");
        // me.untildate = me.getValue(me, "until_date", "raw");
        me.report_date = me.getValue(me, "report_date", "raw");
        me.is_liquid = form.down("[name=is_liquid]").getGroupValue();
        // me.is_liquid = (liquid == true) ? 0 : 1;
        //me.untildeptid = form.down("[name=until_dept_id]").getValue();
        me.reporttype = form.down("[name=reporttype]").getValue();
        me.showzerovalue = form.down("[name=showzerovalue]").getValue();

       if(me.reporttype == 'DEFAULT'){
                me.senddata = {
                hideparam: 'justreturn',
                pt_id: me.ptid,
                project_id: me.projectid,
                is_liquid: me.is_liquid,
                /*transaction_type: me.transactiontype,
                data_flow: me.dataflow,
                detail_coa: me.detailcoa,
                detailcoacaption: me.detailcoacaption,
                from_vendor_id: me.fromvendorid,
                until_vendor_id: me.untilvendorid,
                */
                // from_date: me.fromdate,
                // until_date: me.untildate,
                report_date: me.report_date,
             //   from_dept_id: me.fromdeptid,
             //   until_dept_id: me.untildeptid,
                report_type: me.reporttype,
                showzerovalue: me.showzerovalue
           
            }

            Ext.getBody().mask("Please wait...");
            me.urlrequest = 'cashier/financepositionreport/create';
            me.AjaxRequest();
       }else{
             me.showReport();
       }
        



    },
    showReport: function () {
        var me;
        me = this;
        me.winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'His');
        var title = 'Result ' + me.getFormdata().up('window').title;
        me.form = me.getFormdata().getForm();
        var e = me.getFormdata().down("[name=pt_id]");
        var x = e.getStore().findRecord("pt_id", me.getFormdata().down("[name=pt_id]").getValue(),0,false,true,true);
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
            me.value["project_name"] = x.data['projectname'];
            me.value["pt_name"] = x.data['ptname'];
            me.value["userprint"] = me.userprint;
            me.value["userid"] = me.userid;
            me.value["tgl_sekarang"] = Ext.Date.format(new Date(), 'd/m/Y');
            me.value["time_sekarang"] = Ext.Date.format(new Date(), 'H:i:s');
            me.value["project_id"] = x.data['project_id'];
            me.value["pt_id"] = me.getFormdata().down("[name=pt_id]").getValue();
            me.value["showzerovalue"] = me.getFormdata().down("[name=showzerovalue]").getValue();

            if (me.is_liquid == 1) {
                me.value["liquid"] = "Yes";
            } else if (me.is_liquid == 0) {
                me.value["liquid"] = "No";
            } else {
                me.value["liquid"] = "All Liquid Status";
            }

            if (me.showzerovalue) {
                me.value["showzerovalue"] = 1;
            } else {
                me.value["showzerovalue"] = 0;
            }

           /* if(me.dataflow == ''){
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
            */
            // me.value["fromdate"] = me.reformatDateString(me.fromdate);
            // me.value["untildate"] = me.reformatDateString(me.untildate);
            me.value["report_date"] = me.reformatDateString(me.report_date);
            me.value["tanggal"] = me.value["fromdate"] + ' s/d ' + me.value["untildate"];
          //  me.value["fromvendorid"] = me.fromvendorid;
          //  me.value["untilvendorid"] = me.untilvendorid;
          //  me.value["fromdeptid"] = me.fromdeptid;
          //  me.value["untildeptid"] = me.untildeptid;
            var dy = new Date(me.value["fromdate"]);
            me.value["tahun"] = dy.getFullYear();

            var params = me.value;
            var reportFile = 'Financepositionreport_kasbank';

           console.log(params);
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
        me.urlrequest = 'cashier/financepositionreport/create';
        me.AjaxRequest();
    },
    generatereportexcel: function(params){   
         var me,report;
         me = this;  
         params['hideparam'] = 'generatereportexcel',
         me.senddata = params,
         me.urlrequest = 'cashier/financepositionreport/create';
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

            // me.setValue(me, 'from_date', firstDay);
            // me.setValue(me, 'until_date', lastDay);
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

        var me, storecoa, storekelsub, storesubcode, storeproject, storept, storevendor, storedept = '';
        me = this;

        var f = me.getFormdata();

        me.defaultRange();
       

        storept = me.getStore('Pt');
        storept.load({
            params: {
                "hideparam": 'getptbyuserproject',
                "start": 0,
                "limit": 1000000,
                "project_id": apps.project,
                "user_id": apps.uid
            },
            callback: function (records, operation, success) {
                // if (records[0]) {
                //     var row = records[0]['data'];
                //     me.setValueCombobox(me, 'pt_id', row.pt_id,row.ptname);
                // }
                var fd = me.getFormdata();
                fd.down("[name=pt_id]").setValue(parseInt(apps.pt));
            }
        });

       
      




   
    }
   
   
        
        

  
   
});