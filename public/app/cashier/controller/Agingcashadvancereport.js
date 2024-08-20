Ext.define('Cashier.controller.Agingcashadvancereport', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Agingcashadvancereport',
    requires: [
        'Cashier.library.template.combobox.Coacomboboxgrid',
        'Cashier.library.template.combobox.Coagrid',
        'Cashier.library.template.combobox.Subaccountgroupcomboboxgrid',
        'Cashier.library.template.combobox.SubaccountcodeComboboxgrid',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Voucherprefixcashcombobox'
    ],
    views: [
        'agingcashadvancereport.Panel',
        'agingcashadvancereport.FormData'
    ],
    stores: [
        'Agingcashadvancereport',
        'Coacombo',
        'Project',
        'Ptbyuser',
        'Prefixcombo',
        'Subaccountcode',
        'Department',
        'Voucherprefixsetupcombo',
    ],
    models: [
        'Agingcashadvancereport',
        'Coa',
        'Project',
        'Pt',
        'Subaccountgroup',
        'Subaccountcode',
        'Voucherprefixsetup',
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'agingcashadvancereportformdata'
        },
        {
            ref: 'paneldata',
            selector: 'agingcashadvancereportpanel'
        },
        {
            ref: 'gridkel',
            selector: 'subaccountgroupcomboboxgrid'
        }
    ],
    controllerName: 'agingcashadvancereport',
    fieldName: '',
    bindPrefixName: 'Agingcashadvancereport',
    urlprocess: 'cashier/agingcashadvancereport/read',
    reportdate: null,
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow', checksub: null, report: null,
    statusprocess: null, project_name: null, pt_name: null, userid: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null,
    storekelsub: null, kelsubid_from: null, kelsubid_to: null, reference_date: null, allprefix: null, prefix_id: null,
    cluster: null,
    init: function (application) {
        var me = this;
        this.control({
            'agingcashadvancereportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(350);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'agingcashadvancereportformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();
                }
            },
           
           
            'agingcashadvancereportformdata button[action=submit]': {
                click: function () {
                    me.Processdata();

                }
            },
            'agingcashadvancereportformdata [name=dept_all]': {
                change: function () {
                    me.getclean('dept_id');
                }
            },
            
            'agingcashadvancereportformdata [name=pt_id]': {
                change: function (el) {
                    me.setprojectpt(el.name, el.ownerCt);
                   // this.loadCoabypt(el.value);
                    this.loadDeptbypt(el.value);
                    me.loadDataPrefix();
                  // this.loadPrefixbypt(el.value);
                }
                
            },
            'agingcashadvancereportformdata [name=project_id]': {
                change: function (el) {
                    this.loadPtbyProject();
                }
                
            },
            'agingcashadvancereportformdata [name=prefix_all]': {
                change: function(el) {
                    var me = this;
                    var form = me.getFormdata();
                    var checked = el.value;

                    if (checked) {
                        form.down("[name=prefixcash]").setValue("");
                    } else {
                        var store = form.down("[name=prefixcash]").getStore();
                        var prefix_id = store.data.items[0].data.prefix_id;
                        form.down("[name=prefixcash]").setValue(prefix_id);
                    }
                }
            },
            'agingcashadvancereportformdata [name=prefixcash]': {
                change: function(el) {
                    var me = this;
                    var form = me.getFormdata();
                    if (el.value == '') {
                        form.down("[name=prefix_all]").setValue(true);
                    }
                }
            }
        });
    },
  
    
    Processdata: function () {
        var me, form,reportdate,deptid, parameter = '';
        me = this;

        form = me.getFormdata();
      
        me.deptid =form.down("[name=dept_id]").getValue();
        me.reportdate = me.getValue(me, "report_date", "raw");
        me.reference_date = form.down("[name=reference_date]").getValue();
        me.allprefix = 0;
        me.coa_id = form.down("[name=prefixcash]").getValue();
        me.typereport = form.down("[name=typereport]").getValue();
        
        if (form.down("[name=prefix_all]").getValue() || me.prefix_id == "") {
            me.allprefix = 1;
        }
     
      	if(form.down("[name=dept_id]").getValue() == 'ALL'){
      		me.deptid = '0';
      	}else{
      		me.deptid =form.down("[name=dept_id]").getValue();
      	}

      
                me.senddata = {
                hideparam: 'justreturn',
                reportdate: me.reportdate,
                deptid: me.deptid,
                reference_date: me.reference_date,
                allprefix: me.allprefix,
                coa_id: me.coa_id,
                typereport: me.typereport
            }

            Ext.getBody().mask("Please wait...");
            me.urlrequest = 'cashier/agingcashadvancereport/create';
            me.AjaxRequest();
     



    },
    showReport: function () {
        var me;
        me = this;
        me.winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'His');
        var title = 'Result ' + me.getFormdata().up('window').title;
        me.form = me.getFormdata().getForm();
        var e = me.getFormdata().down("[name=pt_id]");
        var x = e.getStore().findRecord("pt_id", me.getFormdata().down("[name=pt_id]").getValue(),0,false,true,true);
     
       
        me.instantWindowWithMinimize('Panel', 800, title, 'state-report', me.winId, me.controllerName);
       

        me.paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        // var win = desktop.getWindow(winId);
        var sortircaption,dkcaption,deptcaption,bankcaption;
        me.win = desktop.getWindow(me.winId);
       
        if (true) {
            resetTimer();
            me.value = me.form.getValues();

            me.value["project_name"] = x.data['project_name'];
            me.value["pt_name"] = x.data['ptname'];
            me.value["userprint"] = apps.username;
            me.value["userid"] = me.userid;
            me.value["tgl_sekarang"] = Ext.Date.format(new Date(), 'd/m/Y');
            me.value["time_sekarang"] = Ext.Date.format(new Date(), 'H:i:s');
            me.value["project_id"] = x.data['project_id'];
            me.value["pt_id"] = me.getFormdata().down("[name=pt_id]").getValue();
            me.value["coa_id"] = me.allprefix == 1 ? '' :  me.coa_id;
           
            deptcaption = me.getValue(me, "dept_id", "raw");
         
            if (me.getFormdata().down("[name=dept_id]").getValue() == ''){
                deptcaption = 'ALL';
                 me.value["dept_id"] = 0;

            }else{
                me.value["dept_id"] = me.getFormdata().down("[name=dept_id]").getValue();
            }

           
            me.value["deptcaption"] = deptcaption;
            me.value["report_date"] = me.reformatDateString(me.reportdate);
            me.value["tanggal"] = me.value["report_date"];
            me.value["reference_date"] = me.reference_date;
            var params = me.value;
            console.log(params);
            if(params.typereport == 1){
                var reportFile = 'Agingcashadvance_format_1';    
            }else if(params.typereport == 2){
                var reportFile = 'Agingcashadvance_format_2';    
            }else{
                var reportFile = 'Agingcashadvance';    
            }
            
          
                me.html = me.ReportviewerV4(params, reportFile, me.win.id, 1); //whole report
                me.win.down("#MyReportPanel_" + me.win.id).body.setHTML(me.html);
                $("#Reportform_" + me.win.id).submit();
           
         
        }


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
        me.urlrequest = 'cashier/agingcashadvancereport/create';
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
        } else if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
        }  else if (me.info.parameter == 'processreport') {
            Ext.getBody().unmask();
            me.statusprocess = me.info.success;
            if (me.statusprocess == true) {
                me.cluster = me.info.data.cluster;
                me.showReport();
            }
        } else if (me.info.parameter == 'justreturn') {
            Ext.getBody().unmask();
            me.showReport();
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

       
        storedept = me.getStore('Department');
        storedept.load({
            params: {
                "hideparam": 'getdepartmentbyprojectpt',
                "project_id": apps.project,
                "pt_id": apps.pt,
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
    loadDataPrefix: function() {

        var me = this;
        var f  = me.getFormdata();

        var pt_id = f.down("[name=pt_id]").getValue();
        var project_id = f.down("[name=project_id]").getValue();

        var store = f.down("[name=prefixcash]").getStore();
        store.getProxy().setExtraParam('hideparam', 'getvoucherprefixsetupv2bankgroupbycoa');
        store.getProxy().setExtraParam('pt_pt_id', pt_id);
        store.getProxy().setExtraParam('kasbank', 'K');
        store.getProxy().setExtraParam('dataflow', 'I');
        store.getProxy().setExtraParam('user_id', apps.uid);
        store.getProxy().setExtraParam('project_id', project_id);
        store.load();
    }
     
   
});