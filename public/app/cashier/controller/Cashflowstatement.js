Ext.define('Cashier.controller.Cashflowstatement', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Cashflowstatement',
    requires: [
        'Cashier.library.template.combobox.Coacomboboxgrid',
        'Cashier.library.template.combobox.Coagrid',
        'Cashier.library.template.combobox.Subaccountgroupcomboboxgrid',
        'Cashier.library.template.combobox.SubaccountcodeComboboxgrid',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox'
    ],
    views: [
        'cashflowstatement.Panel',
        'cashflowstatement.FormData'
    ],
    stores: [
        'Cashflowstatement',
        'Coacombo',
        'Project',
        'Ptbyuser',
        'Subaccountcode',
        'Pt',
    ],
    models: [
        'Cashflowstatement',
        'Coa',
        'Project',
        'Pt',
        'Subaccountgroup',
        'Subaccountcode',
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'cashflowstatementformdata'
        },
        {
            ref: 'paneldata',
            selector: 'cashflowstatementpanel'
        },
    ],
    controllerName: 'cashflowstatement',
    fieldName: '',
    bindPrefixName: 'Cashflowstatement',
    urlprocess: 'cashier/cashflowstatement/read',
    kelsub_id: null,
    paramcoa: null, fromcoa_id: 0, fromcoa: null, untilcoa_id: 0, untilcoa: null,
    reportby: null, voucherby: null, subby: null, detailby: null, fromkelsub: null, untilkelsub: null,
    fromdate: null, untildate: null, fromsubcode: null, untilsubcode: null,
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow', checksub: null, report: null,
    statusprocess: null, project_name: null, pt_name: null, userid: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null,
    storekelsub: null, kelsubid_from: null, kelsubid_to: null,
    cluster: null,
    init: function (application) {
        var me = this;
        this.control({
            'cashflowstatementpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(350);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'cashflowstatementformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();
                },
                boxready: function() {
                    
                    var me = this;

                    $("#cashflowstatementID input[name='sub_coa_from_id']").keyup(function()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/,'$1'+'.'+'$2')
                    });

                    $("#cashflowstatementID input[name='sub_coa_until_id']").keyup(function()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/,'$1'+'.'+'$2')
                    });
                }
            },
            'cashflowstatementformdata [name=sub_coa_from_id]': {
                change: function (me, newValue, oldValue, eOpts) {
                    if (oldValue !== 'undefined') {
                        me.fromcoa_id = oldValue;
                    }
                },
                select: function () {
                    me.checkPositionCOA('from');
                },
                keyup: function () {
                    var me, value;
                    me = this;
                    value = me.getFormdata().down("[name=sub_coa_from_id]").getRawValue();
                    this.autocompletecombo(value);
                },
            },
            'cashflowstatementformdata [name=sub_coa_until_id]': {
                change: function (cb, newValue, oldValue, options) {
                    if (oldValue !== 'undefined') {
                        me.untilcoa_id = oldValue;

                    }

                },
                select: function (cb, newValue, oldValue, options) {
                    this.checkPositionCOA('until');
                },
                keyup: function () {
                    var me, value;
                    me = this;
                    value = me.getFormdata().down("[name=sub_coa_until_id]").getRawValue();
                    this.autocompletecombo(value);
                }
            },
            'cashflowstatementformdata button[action=submit]': {
                click: function () {
                    me.Processdata();

                }
            },
           
            'cashflowstatementformdata [name=pt_id]': {
                change: function (el) {
                    me.setprojectpt(el.name, el.ownerCt);
                    this.loadCoabypt(el.value);
                }
                
            },
            'cashflowstatementformdata [name=project_id]': {
                change: function (el) {
                    this.loadPtbyProject();
                }
                
            },
        });
    },
    autocompletecombo: function (value) {
        var me, storecoa, value;
        me = this;
        storecoa = me.getStore('Coacombo');
        storecoa.clearFilter();
        storecoa.filter('coa', value);
    },
    
    Processdata: function () {
        var me, form, detail,reporttype,kasbanktype,fromdate,untildate,fromcoa,untilcoa, parameter = '';
        me = this;

        form = me.getFormdata();


        me.reporttype = form.down("[name=reporttype]").getValue();

        me.fromdate = me.getValue(me, "subfromdate", "raw");
        me.untildate = me.getValue(me, "subuntildate", "raw");
        me.fromcoa = me.getValue(me, "sub_coa_from_id", "raw");
        me.untilcoa = me.getValue(me, "sub_coa_until_id", "raw");
        me.detail = Ext.ComponentQuery.query('[name=detail]')[0].getGroupValue();



       if(me.reporttype == 'DEFAULT'){
                me.senddata = {
                hideparam: 'justreturn',
                detail: me.detail,
                fromdate: me.fromdate,
                untildate: me.untildate,
                fromcoa: me.fromcoa,
                untilcoa: me.untilcoa,
                reporttype: me.reporttype,
            }

            Ext.getBody().mask("Please wait...");
            me.urlrequest = 'cashier/cashflowstatement/create';
            me.AjaxRequest();
       }else{
             me.showReport();
       }
        



    },
    showReport: function () {
        var me;
        me = this;
        var winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'His');
        var title = 'Result ' + me.getFormdata().up('window').title;
        me.form = me.getFormdata().getForm();
        var e = me.getFormdata().down("[name=pt_id]");
        var x = e.getStore().findRecord("pt_id", me.getFormdata().down("[name=pt_id]").getValue(),0,false,true,true);
        var reporttype = me.getFormdata().down("[name=reporttype]").getValue();


        if(reporttype=='DEFAULT'){
            me.instantWindowWithMinimize('Panel', 800, title, 'state-report', winId, me.controllerName);
        }else if(reporttype=='EXCEL'){
          
        }else{
            me.instantWindowWithMinimize('Panel', 800, title, 'state-report', winId, me.controllerName);
        }

        me.paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        var win = desktop.getWindow(winId);
        var detailcaption;
        me.win = desktop.getWindow(winId);
       
        if (true) {
            resetTimer();
            me.value = me.form.getValues();


            me.value["project_name"] = x.data['projectname'];
            me.value["pt_name"] = x.data['ptname'];
            me.value["userprint"] = me.userprint;
            me.value["userid"] = me.userid;
            me.value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
            me.value["time_sekarang"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
            me.value["project_id"] = x.data['project_id'];
            me.value["pt_id"] = me.getFormdata().down("[name=pt_id]").getValue();
            me.value["is_spk"] = me.getFormdata().down("[name=is_spk]").getValue();
            
            if(me.detail == '1'){
                detailcaption = 'With Detail';
            }else{
                detailcaption = 'Without Detail'
            }



            me.value["detailcaption"] = detailcaption;
            me.value["detail"] = me.detail;
            me.value["fromdate"] = me.reformatDateString(me.fromdate);
            me.value["untildate"] = me.reformatDateString(me.untildate);
            me.value["tanggal"] = me.value["fromdate"] + ' s/d ' + me.value["untildate"];
            me.value["coastart_id"] = me.fromcoa;
            me.value["coaend_id"] = me.untilcoa;
            me.value["printdate"] = me.Curdate();
            var dy = new Date(me.value["fromdate"]);
            me.value["tahun"] = dy.getFullYear();


            var params = me.value;

          
            var reportFile = 'CashflowStatement';
            if ( !params['is_spk'] ) {
                reportFile = 'CashflowStatementNoSpk';
            }

            if(reporttype == 'DEFAULT'){
                me.html = me.ReportviewerV4(params, reportFile, me.win.id, 1); //whole report
                me.win.down("#MyReportPanel_" + me.win.id).body.setHTML(me.html);
                $("#Reportform_" + me.win.id).submit();
            }else{
                
                me.generatereportexcel(params);
                return false;  
            }
         
        }


    },
    checkPositionCOA: function (flag) {
        var me = '';
        me = this;
        me.senddata = {
            hideparam: 'checklevelcoa',
            flagchange: flag,
            fromcoa: me.getValue(me, "sub_coa_from_id", "raw"),
            untilcoa: me.getValue(me, "sub_coa_until_id", "raw")
        }
        me.urlrequest = 'cashier/cashflowstatement/create';
        me.AjaxRequest();
    },
     getclean: function(val){
        var me = this;
            me.setValue(me, val,'');

    },
   
   
    
    defaultRange: function () {
        var me = '';
        me = this;
        me.senddata = {
            hideparam: 'defaultrange'
        }
        me.urlrequest = 'cashier/cashflowstatement/create';
        me.AjaxRequest();
    },
    generatereportexcel: function(params){   
         var me,report;
         me = this;  
         params['hideparam'] = 'generatereportexcel',
         me.senddata = params,
         me.urlrequest = 'cashier/cashflowstatement/create';
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

            me.setValue(me, 'subfromdate', firstDay);
            me.setValue(me, 'subuntildate', lastDay);
            me.yeardata = me.info.data.yeardb;
            //form.down("[name=subfromdate]").setMinValue(me.yeardata + '-01-01');
            //form.down("[name=subfromdate]").setMaxValue(me.info.data.enddecember);
            //form.down("[name=subuntildate]").setMinValue(me.yeardata + '-01-01');
            //form.down("[name=subuntildate]").setMaxValue(me.info.data.enddecember);
        } else if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
        } else if (me.info.parameter == 'getcoabyid') {
            me.setValue(me, "paramcoa", me.info.data[1][0].coa);

        } else if (me.info.parameter == 'checklevelcoa') {
            var counter = me.info.data.counter;
            var flagchange = me.info.data.flagchange;

            if (counter < 0 && flagchange == 'from') {
                // console.log('normal'+' '+flagchange);
            } else if (counter == 0 && flagchange == 'from') {
                // console.log('same'+' '+flagchange);
            } else if (counter > 0 && flagchange == 'from') {
                me.setValue(me, 'sub_coa_until_id', me.getValue(me, "sub_coa_from_id", "value"));
                // console.log('not valid'+' '+flagchange);
            }


            if (counter < 0 && flagchange == 'until') {
                // console.log('normal'+' '+flagchange);
            } else if (counter == 0 && flagchange == 'until') {
                // console.log('same'+' '+flagchange);
            } else if (counter > 0 && flagchange == 'until') {
                if (me.untilcoa_id != '0') {
                    me.setValue(me, 'sub_coa_until_id', me.untilcoa_id);
                }
//                /console.log('not valid'+' '+flagchange);
            }

        } else if (me.info.parameter == 'processreport') {
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

        var me, storecoa, storekelsub, storesubcode, storeproject, stordept, storeprefix = '';
        me = this;

        var f = me.getFormdata();

        me.defaultRange();
        storeproject = me.getStore('Project');
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
                       
                    }
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
     loadPtbyProject: function(){

       var me = this;
        projectid = me.getFormdata().down("[name=project_id]").getValue();
  
        
        if(projectid != null){
            projectid = me.getFormdata().down("[name=project_id]").getValue();
        }else{
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

                var fd = me.getFormdata();
                fd.down("[name=pt_id]").setValue(parseInt(apps.pt));
            } 
        });

        
        

    },
     
});