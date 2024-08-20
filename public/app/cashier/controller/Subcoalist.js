Ext.define('Cashier.controller.Subcoalist', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Subcoalist',
    requires: [
        'Cashier.library.template.combobox.Coacombobox',
        'Cashier.library.template.combobox.Subaccountgroupcombobox',
        'Cashier.library.template.combobox.Ptcombobox',
        'Cashier.library.template.component.Ptbyusercombobox',
         'Cashier.library.template.combobox.Projectcombobox',
          'Cashier.library.template.combobox.Ptprojectcombobox',
    ],
    views: [
        'subcoalist.Panel',
        'subcoalist.FormData'
    ],
    stores: [
        'Subcoalist',
        'Subaccountgroupfs',
        'Ptbyusermulti',
        'Project',
        'Ptbyuser',
        'Pt'
    ],

    models: [
        'Subcoalist',
        'Subaccountgroup',
        'Projectpt',
        'Project',
        'Pt'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'subcoalistformdata'
        },
        {
            ref: 'paneldata',
            selector: 'subcoalistpanel'
        }
    ],
    controllerName: 'subcoalist',
    fieldName: '',
    bindPrefixName: 'Subcoalist',
    urlprocess: 'cashier/subcoalist/read', urlrequest: null,
    reportFile: 'Subcoalist', winId: 'myReportWindow',
    paramsStr: null, win: null, params: null, dateNow: new Date(), html: null,
    subcashier_id: 0, description: null, subcashier_name: null, rawvalue: null, value: null,
    senddata: null,
    init: function (application) {
        var me = this;
        this.control({
            'subcoalistpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(250);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(640);
                    me.panelAfterRender();
                }
            },
            'subcoalistformdata': {
                afterrender: this.formDataAfterRenderCustome
            },
            'subcoalistformdata [name=subaccgroup_id]': {
                select: function () {
                    var f = me.getFormdata();
                    var getcheckbox = f.down("[name=subaccgroup_all]").getValue();
                    if(getcheckbox == true){
                        f.down("[name=subaccgroup_all]").setValue(false);
                    }
                }
            },
            
            'subcoalistformdata button[action=submit]': {
                click: this.processReport
            },
          /*  'subcoalistformdata [name=projectpt_id]': {
                change: function (the, newValue, oldValue, eOpts) {
                    this.loadSubcoabypt(newValue);
                }
            },*/
             'subcoalistformdata [name=project_id]': {
                change: function (the, newValue, oldValue, eOpts) {
                    this.loadPtbyProject();
                }
            },
             'subcoalistformdata [name=pt_id]': {
              change: function (the, newValue, oldValue, eOpts) {
                      this.loadSubcoabypt(newValue);
                   
                }
            },
            'subcoalistformdata [name=subaccgroup_all]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.getclean(newValue);
                }
            },
        });
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
            },
        });
    },
    formDataAfterRenderCustome: function () {
        var me, store, storept, storeproject = '';
        me = this;
        var f = me.getFormdata();
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
   /* getdesc: function (flag) {
        var me = this;
        var f = me.getFormdata();
        me.senddata = {
            hideparam: 'getsubgl',
            subgl_id: me.subcashier_id,
            project_id:me.getFormdata().down("[name=project_id]").getValue(),
            pt_id:me.getFormdata().down("[name=pt_id]").getValue()
        }
        me.urlrequest = 'cashier/subaccountcode/create';
        me.AjaxRequest(flag);

    },
    */
    AjaxRequest: function (flag) {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                me.info = Ext.JSON.decode(response.responseText);
                if(me.info.data.length>0){
                    if (flag == 'from') {
                        me.setValue(me, 'from_subcashier_name', me.info.data[0].description);
                    } else {
                        me.setValue(me, 'until_subcashier_name', me.info.data[0].description);
                    }
                }
            },
            failure: function (response) {
            }
        });
    },
    processReport: function () {
        var me = this;
        var f = me.getFormdata();
        var a = f.down('[name=subaccgroup_all]').getValue();
        var b = f.down('[name=subaccgroup_id]').getValue();
        if(a == false && b == ''){
             Ext.Msg.show({
                    title: 'Warning',
                    msg: 'Please choose Sub Account Group !',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                           });
        }else{

                if (me.getFormdata().down("[name=formatreport]").getValue() == "DEFAULT") {

                    me.winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'His');
                    var title = 'Result ' + me.getFormdata().up('window').title;
                    var subaccgroup_caption,subaccgroup_id = '';
                    me.instantWindowWithMinimize('Panel', 800, title, 'state-report', me.winId, me.controllerName);
                    me.paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
                    me.win = desktop.getWindow(me.winId);

                    if (me.win) {
                        me.params = me.getFormdata().getForm().getFieldValues();

                        if (me.getFormdata().down("[name=subaccgroup_all]").getValue() == false){
                            subaccgroup_caption = me.getFormdata().down("[name=subaccgroup_id]").valueModels[0]['raw'].description;
                            subaccgroup_id = me.getFormdata().down("[name=subaccgroup_id]").getValue();
                        
                        }else{
                            subaccgroup_caption = 'ALL';
                            subaccgroup_id = 0;
                        }

                        //start add parameter other from formdata
                        me.params["project_name"] = me.getFormdata().down("[name=project_id]").valueModels[0]['raw'].projectname;
                        me.params["pt_name"] = me.getFormdata().down("[name=pt_id]").valueModels[0]['raw'].ptname;
                        me.params["userprint"] = me.userprint;
                        me.params["tgl_sekarang"] = Ext.Date.format(new Date(), 'd/m/Y');
                        me.params["time_sekarang"] = Ext.Date.format(new Date(), 'H:i:s');
                        me.params["project_id"] = me.getFormdata().down("[name=project_id]").getValue();
                        me.params["pt_id"] = me.getFormdata().down("[name=pt_id]").getValue();
                        me.params["subaccgroup_caption"] = subaccgroup_caption;
                        me.params["subaccgroup_id"] = subaccgroup_id;
                        //end add parameter other from formdata



                        me.html = me.ReportviewerV4(me.params, me.reportFile, me.win.id, 1);
                        me.win.down("#MyReportPanel_" + me.win.id).body.setHTML(me.html);
                        $("#Reportform_" + me.win.id).submit();
                    }
                } else {
                    me.generateReportExcel();
                }
         }
    },
    generateReportExcel: function() {
        var me = this;
        var f = me.getFormdata();
        var form = f.getForm();

        //console.log(form.getValues());
        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }

        var vp = me.validationProcess();
        var vps = false; // validation prosess status
        if (typeof vp === 'object') {
            vps = vp.status;
            if (!vps) {

                Ext.MessageBox.alert('Alert', vp.msg, function () {
                    var x = me.getFormdata().down('[name=' + vp.field + ']');
                    if (x !== null) {
                        x.markInvalid(vp.msg);
                        x.focus();
                    }

                });
            }
        } else if (typeof vp === 'boolean') {
            vps = vp;
        }


        if (form.isValid() && vps) {
            var fida = me.getFinalData(form.getValues());
            fida['project_name'] = me.getFormdata().down("[name=project_id]").getRawValue();
            fida['pt_name'] = me.getFormdata().down("[name=pt_id]").getRawValue();
            fida['subaccgroup_name'] = me.getFormdata().down("[name=subaccgroup_id]").getRawValue();

            if (fida['subaccgroup_name'] == "") {
                fida['subaccgroup_name'] = "ALL";
            }

            Ext.getBody().mask('Please Wait ...');
            Ext.Ajax.request({
                url: 'cashier/subcoalist/read',
                params: fida,
                success: function(response) {
                    Ext.getBody().unmask();
                    var info = Ext.JSON.decode(response.responseText);
                    var file_path = info.data.url;  
                    var a = document.createElement('A');
                    a.href = file_path;
                    a.download = a.download = 'subcoalist_' + Ext.Date.format(new Date(), 'dmYHis') + '.xlsx';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            })
        }
    },
    loadSubcoabypt: function(newValue){

        var me = this;
        var f = me.getFormdata();
        var project_id = f.down("[name=project_id]").getValue();
        var pt_id = newValue;
        f.down("[name=subaccgroup_id]").setValue("");
        storecoa = me.getStore('Subaccountgroupfs');
        Ext.getBody().mask('Please Wait ...');
        storecoa.load({
            params: {
                "hideparam": 'defaultbyprojectpt',
                "start": 0,
                "limit": 100000,
                "project_id": project_id,
                "pt_id": pt_id 
            },
            callback: function (records, operation, success) {
                 Ext.getBody().unmask();
            }
        });

    },
    loadPtbyProject: function(){

       var me = this;
        projectid = me.getFormdata().down("[name=project_id]").getValue();

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
     getclean: function(flag){
        var me = this;
        if(flag == true){
            me.setValue(me, 'subaccgroup_id','');
            me.getFormdata().down("[name=subaccgroup_id]").allowBlank = true;
        } else {
            me.getFormdata().down("[name=subaccgroup_id]").allowBlank = false;
        }
    },
});