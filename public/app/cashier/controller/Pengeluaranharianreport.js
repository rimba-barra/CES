Ext.define('Cashier.controller.Pengeluaranharianreport', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Pengeluaranharianreport',
    requires: [
        'Cashier.library.template.combobox.Coacomboboxgrid',
        'Cashier.library.template.combobox.Coagrid',
        'Cashier.library.template.combobox.Subaccountgroupcomboboxgrid',
        'Cashier.library.template.combobox.SubaccountcodeComboboxgrid',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Departmentcombobox'
    ],
    views: [
        'pengeluaranharianreport.Panel',
        'pengeluaranharianreport.FormData'
    ],
    stores: [
        'Pengeluaranharianreport',
        'Coacombo',
        'Project',
        'Ptbyuser',
        'Prefixcombo',
        'Subaccountcode',
        'Department',
    ],
    models: [
        'Pengeluaranharianreport',
        'Coa',
        'Project',
        'Pt',
        'Subaccountgroup',
        'Subaccountcode',
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'pengeluaranharianreportformdata'
        },
        {
            ref: 'paneldata',
            selector: 'pengeluaranharianreportpanel'
        },
        {
            ref: 'gridkel',
            selector: 'subaccountgroupcomboboxgrid'
        }
    ],
    controllerName: 'pengeluaranharianreport',
    fieldName: '',
    bindPrefixName: 'Pengeluaranharianreport',
    urlprocess: 'cashier/pengeluaranharianreport/read',
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
            'pengeluaranharianreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(300);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'pengeluaranharianreportformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();
                }
            },
           
          
            'pengeluaranharianreportformdata button[action=submit]': {
                click: function () {
                    me.Processdata();

                }
            },
            'pengeluaranharianreportformdata [name=dept_all]': {
                change: function () {
                    me.getclean('dept_id');
                }
            },
           
            'pengeluaranharianreportformdata [name=pt_id]': {
                change: function (el) {
                    me.setprojectpt(el.name, el.ownerCt);
                    this.loadDeptbypt(el.value);
                }
                
            },
            'pengeluaranharianreportformdata [name=project_id]': {
                change: function (el) {
                    this.loadPtbyProject();
                }
                
            },
              'pengeluaranharianreportformdata [name=dept_id]': {
                select: function (el) {
                   var me = this;
                   var f = me.getFormdata();
                   var check = f.down('[name=dept_all]').getValue();
                   if(check == true){
                        f.down('[name=dept_all]').setValue(false);
                   }
                }
                
            },
            
        });
    },
  
    
    Processdata: function () {
        var me, form, voucher_fromdate,voucher_untildate,due_fromdate,due_untildate,deptid,statustype,parameter,department_id = '';
        me = this;

        form = me.getFormdata();
      

        me.voucher_fromdate = me.getValue(me, "voucher_fromdate", "raw");
        me.voucher_untildate = me.getValue(me, "voucher_untildate", "raw");
        me.due_fromdate = me.getValue(me, "due_fromdate", "raw");
        me.due_untildate = me.getValue(me, "due_untildate", "raw");
        me.statustype = form.down("[name=statustype]").getValue(); 
        department_id = form.down("[name=dept_id]").getValue();
        if(department_id == ''){
            me.deptid = 0;
        }else{
            me.deptid = department_id;
        }
       


      // if(me.reporttype == 'DEFAULT'){
                me.senddata = {
                hideparam: 'justreturn',
                voucher_fromdate: me.voucher_fromdate,
                voucher_untildate: me.voucher_untildate,
                due_fromdate: me.due_fromdate,
                due_untildate: me.due_untildate,
                deptid: me.deptid,
                statustype: me.statustype
            }

            Ext.getBody().mask("Please wait...");
            me.urlrequest = 'cashier/pengeluaranharianreport/create';
            me.AjaxRequest();
      /* }else{
             me.showReport();
       }
        */



    },
    showReport: function () {
        var me;
        me = this;
        var title = 'Result ' + me.getFormdata().up('window').title;
        me.winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'YmdHis');
        me.form = me.getFormdata().getForm();
        var e = me.getFormdata().down("[name=pt_id]");
        var x = e.getStore().findRecord("pt_id", me.getFormdata().down("[name=pt_id]").getValue(),0,false,true,true);
        var f = me.getFormdata();
      //  var reporttype = me.getFormdata().down("[name=reporttype]").getValue();


       // if(reporttype=='DEFAULT'){
            me.instantWindowWithMinimize('Panel', 800, title, 'state-report', me.winId, me.controllerName);
      /*  }else if(reporttype=='EXCEL'){
          
        }else{
            me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        }
        */

        me.paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        var sortircaption,dkcaption,deptcaption,bankcaption;
        me.win = desktop.getWindow(me.winId);
       
        if (true) {
            resetTimer();
            me.value = me.form.getValues();
            me.value["project_name"] = f.down("[name=project_id]").getRawValue();
            me.value["pt_name"] = x.data['ptname'];
            me.value["userprint"] = me.userprint;
            me.value["userid"] = me.userid;
            me.value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
            me.value["time_sekarang"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
            me.value["project_id"] = x.data['project_id'];
            me.value["pt_id"] = me.getFormdata().down("[name=pt_id]").getValue();
            
          

            deptcaption = me.getValue(me, "dept_id", "raw");
           

            if (me.getFormdata().down("[name=dept_id]").getValue() == ''){
                deptcaption = 'ALL';

            }

         
            me.value["deptcaption"] = deptcaption;
            me.value["statustype"] = me.statustype;
            me.value["voucher_fromdate"] = me.reformatDateString(me.voucher_fromdate);
            me.value["voucher_untildate"] = me.reformatDateString(me.voucher_untildate);
            me.value["due_fromdate"] = me.reformatDateString(me.due_fromdate);
            me.value["due_untildate"] = me.reformatDateString(me.due_untildate);
            me.value["tanggal"] = me.value["voucher_fromdate"] + ' s/d ' + me.value["voucher_untildate"];
            me.value["dept_id"] = me.deptid;
            me.value["printdate"] = me.Curdate();
            me.value["tkb"] = me.getFormdata().down("[name=tkb]").getValue();
            var dy = new Date(me.value["voucher_fromdate"]);
            me.value["tahun"] = dy.getFullYear();


            var params = me.value;

         
            var reportFile = 'Pengeluaranharianreport';
       

          // if(reporttype == 'DEFAULT'){
            me.html = me.ReportviewerV4(me.value, reportFile, me.win.id, 1);
            me.win.down("#MyReportPanel_" + me.win.id).body.setHTML(me.html);
            $("#Reportform_" + me.win.id).submit();
            /*}else{
                
                me.generatereportexcel(params);
                return false;  
            }*/
         
        }


    },
    
     getclean: function(val){
        var me = this;
        var f = me.getFormdata();
        var checkbox = f.down('[name=dept_all]').getValue();
        if(checkbox == true){
            me.setValue(me, val,'');
        }

    },
   
   
    
    defaultRange: function () {
        var me = '';
        me = this;
        me.senddata = {
            hideparam: 'defaultrange'
        }
        me.urlrequest = 'cashier/pengeluaranharianreport/create';
        me.AjaxRequest();
    },
    generatereportexcel: function(params){   
         var me,report;
         me = this;  
         params['hideparam'] = 'generatereportexcel',
         me.senddata = params,
         me.urlrequest = 'cashier/pengeluaranharianreport/create';
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

            me.setValue(me, 'voucher_fromdate', firstDay);
            me.setValue(me, 'voucher_untildate', lastDay);
            me.setValue(me, 'due_fromdate', firstDay);
            me.setValue(me, 'due_untildate', lastDay);
            me.yeardata = me.info.data.yeardb;
          
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

        var me, storecoa, storekelsub, storesubcode, storeproject, stordept = '';
        me = this;

        var f = me.getFormdata();
       // me.loadComboBoxStore(f);

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

       
        storedept = me.getStore('Department');
        storedept.load({
            params: {
                "hideparam": 'getdepartmentbyprojectpt',
                "project_id": apps.project,
                "pt_id": apps.pt,
                "user_id": apps.uid,
                "start": 0,
                "limit": 1000000,
            }, callback: function (recordscode, operationcode, successcode) {
                if (successcode) {
                    if (recordscode[0]) {
                        var firstdatacode = recordscode[0]['data'];
                         f.down("[name=dept_id]").setValue(firstdatacode.department_id);
                       
                    }
                }
            }

        });



     // me.loadPtbyProject();

      //load coa
     // me.loadCoabypt(f.down("[name=pt_id]").getValue());
   
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
                if (records[0]) {
                    var row = records[0]['data'];
                    me.setValueCombobox(me, 'pt_id', row.pt_id,row.ptname);
                }
                
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
                "user_id": apps.uid,
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {

                if (success) {
                    if (records[0]) {
                        var firstdatacode = records[0]['data'];
                         f.down("[name=dept_id]").setValue(firstdatacode.department_id);
                       
                    }else{
                        f.down("[name=dept_id]").setValue('');
                    }
                }
            }
        });

    },
      
   
});