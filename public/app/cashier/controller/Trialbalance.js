Ext.define('Cashier.controller.Trialbalance', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Trialbalance',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Coacomboboxgrid',
        'Cashier.library.template.combobox.Coagrid',
        'Cashier.library.template.combobox.Ptcombobox'
    ],
	
    views: [
        'trialbalance.Panel',
        'trialbalance.FormData'
    ],

    stores: [
        'Trialbalance',
        'Coacombo',
        'Pt'
    ],
	
	
    models: [
        'Trialbalance',
        'Coa',
        'Pt'
    ],

    refs: [
        {
            ref: 'formdata',
            selector: 'trialbalanceformdata'
        },
        {
            ref: 'paneldata',
            selector: 'trialbalancepanel'
        }
    ],
    controllerName: 'trialbalance',
    fieldName: '',
    bindPrefixName: 'Trialbalance',
    urlprocess: 'cashier/trialbalance/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null,
    cluster:null,arraydata:null,value:null,
    
    fromcoa:null,untilcoa:null,detailtype:null,detaildesc:null,headertype:null,headerdesc:null,
    periode:null,fromdate:null,untildate:null,
    init: function (application) {
        var me = this;
        this.control({
            'trialbalancepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(250);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'trialbalanceformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();

                }
            },
            'trialbalanceformdata [name=from_coa_id] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                    value = me.getFormdata().down("[name=from_coa_id]").getRawValue();
                    this.autocompletecombo(value);
                },
                
            },
            'trialbalanceformdata [name=until_coa_id] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                    value = me.getFormdata().down("[name=until_coa_id]").getRawValue();
                    this.autocompletecombo(value);
                },
            },
            'trialbalanceformdata button[action=submit]': {
                click: function () {
                   this.showReport();
                }
            },
            'trialbalanceformdata [name=pt_id]': {
                change: function (the, newValue, oldValue, eOpts) {
                    this.loadCoabypt(newValue);
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
    arrayData: function () {
        var me;
        me = this;
        
        me.value = me.form.getValues();
        me.value["project_name"] = me.project_name;
        me.value["pt_name"] = me.pt_name;
        me.value["userprint"] = me.userprint;
        me.value["tcashier_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
        me.value["time_sekarang"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
        me.value["project_id"] = apps.project;
        me.value["pt_id"] = apps.pt;

        me.value["detaildesc"] = me.arraydata.detaildesc;
        me.value["headerdesc"] = me.arraydata.headerdesc;
        me.value["periode"] = me.arraydata.fromdate+' to '+me.arraydata.untildate;
        me.value["filtercoa"] = me.arraydata.fromcoa+' to '+me.arraydata.untilcoa;
        me.value["cluster"] = me.cluster;
    },
    createWindows: function () {
        var me = this;
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function () {
        var me = this;
        me.report = 'Trialbalance';       
        

        me.html = me.generateFakeForm(me.value, me.report);
        me.win.down("#MyReportPanel").body.setHTML(me.html);
        $("#fakeReportFormID").submit();
    },
     showReport: function () {
        var me;
        me = this;       
        me.form = me.getFormdata().getForm();  
        if (me.form.isValid()) {          
            resetTimer();
            me.setupData();
            me.generateReport(); 
        }
    },
    setupData:function(){
       var me,returndata,headerdesc,detaildesc,headertype,detailtype,detailyes,detailno,headeryes,headerno,
               fromcoa,untilcoa,fromdate,untildate, pt_id;
       me = this;     

       var f = me.getFormdata();
       pt_id = f.down("[name=pt_id]").getValue();

       detailyes = me.getValueRadio(me,"#detailyes");
       detailno = me.getValueRadio(me,"#detailno");
       headeryes  = me.getValueRadio(me,"#headeryes");
       headerno = me.getValueRadio(me,"#headerno");
       fromcoa = me.getValueCombobox(me,"from_coa_id");
       untilcoa = me.getValueCombobox(me,"until_coa_id");       
       fromdate = me.getValueCombobox(me,"fromdate");
       untildate = me.getValueCombobox(me,"untildate");       
       
       if(headeryes==true && headerno==false) {
           headertype ='1'; 
           headerdesc ='With Header'; 
       }else if(headeryes==false && headerno==true){
           headertype ='2'; 
           headerdesc ='Without Header'; 
       }
       
       if(detailyes==true && detailno==false) {
           detailtype ='1'; 
           detaildesc ='With Detail'; 
       }else if(detailyes==false && detailno==true){
           detailtype ='2'; 
           detaildesc ='Without Detail'; 
       }
       
       returndata = {
           "headertype":headertype,
           "headerdesc":headerdesc,
           "detailtype":detailtype,
           "detaildesc":detaildesc,
           "fromcoa":fromcoa.value,
           "untilcoa":untilcoa.value,
           "fromdate":fromdate.value,
           "untildate":untildate.value,
           "pt_id": pt_id
       }
       
       me.arraydata = returndata;
    },
    
    generateReport: function(){       
         var me,report;
         me = this;  
         me.arraydata['hideparam'] ='generatereport';
         me.senddata = me.arraydata;
         me.urlrequest = me.urlprocess;
         Ext.getBody().mask("Please wait...");
         me.AjaxRequest();     
    },    
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'cashier/trialbalance/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
            },
        });
    },
    formDataAfterRenderCustome: function () {
        var me, storecoa = '';
        me = this;
        me.defaultRange();
        var f = me.getFormdata();

        storecoa = me.getStore('Coacombo');
        storecoa.load({
            params: {
                "hideparam": 'coagrid',
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    me.setValueCombobox(me, 'from_coa_id', row.coa_id,row.coa);
                    me.setValueCombobox(me, 'until_coa_id', row.coa_id,row.coa);
                }

            }
        });

        storept = me.getStore('Pt');

        Ext.Ajax.request({
            url: 'cashier/balancesheetb/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);

                storept.load({
                    params: {
                        "hideparam": 'ptbyuser',
                        "start": 0,
                        "limit": 1000000 
                    },
                    callback: function (records, operation, success) {
                        if (records[0]) {
                            var row = records[0]['data'];
                            f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                            //me.setValueCombobox(me, 'pt_id', row.pt_id,row.ptname);
                        }

                    }
                });
            },
        });
    },
    defaultRange: function () {
        var me = '';
        me = this;
        me.senddata = {
            hideparam: 'defaultrange'
        }
        me.urlrequest = 'cashier/dailytransaction/create';
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
            me.setValue(me, 'fromdate', me.info.data.onedate);
            me.setValue(me, 'untildate', me.info.data.onedate);
            me.yeardata = me.info.data.yeardb;
//            form.down("[name=fromdate]").setMinValue(me.yeardata + '-01-01');
//            form.down("[name=fromdate]").setMaxValue(me.info.data.enddecember);
//            form.down("[name=untildate]").setMinValue(me.yeardata + '-01-01');
//            form.down("[name=untildate]").setMaxValue(me.info.data.enddecember);
        } else if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
        }else if (me.info.parameter == 'generatereport') {
            Ext.getBody().unmask();
            me.cluster = me.info.data.cluster;
            me.createWindows();   
            me.arrayData();
            me.submitReport();           
        }
    },
    loadCoabypt: function(newValue){

        var me = this;
        storecoa = me.getStore('Coacombo');
        storecoa.load({
            params: {
                "hideparam": 'coagridbyuserpt',
                "start": 0,
                "limit": 1000000,
                "pt_id_owner": newValue 
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    me.setValueCombobox(me, 'from_coa_id', row.coa_id,row.coa);
                    me.setValueCombobox(me, 'until_coa_id', row.coa_id,row.coa);
                }

            }
        });

    }



});