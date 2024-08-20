Ext.define('Erems.controller.Prosessms', {
    extend: 'Erems.library.template.controller.Controller2',
    requires: ['Erems.library.Browse',
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools',
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.ModuleTools'],
    alias: 'controller.Prosessms',
    views: ['prosessms.Panel', 'prosessms.Grid', 'prosessms.FormSearch', 'prosessms.FormData'],
    refs: [
        {
            ref: 'panel',
            selector: 'prosessmspanel'
        },
        {
            ref: 'grid',
            selector: 'prosessmsgrid'
        },
        {
            ref: 'formsearch',
            selector: 'prosessmsformsearch'
        },
        {
            ref: 'formdata',
            selector: 'prosessmsformdata'
        },
        {
            ref: 'formdataprocess',
            selector: 'prosessmsformdataprocess'
        },
        {
            ref: 'gridcustomer',
            selector: 'prosessmscustomergrid'
        }

    ],
    controllerName: 'prosessms',
    fieldName: 'sms_id',
    bindPrefixName: 'Prosessms',
    localStore: {
        detail: null,
        selectedUnit: null,
        customer: null
    },
    browseHandler: null,
    cbf: null,
    mt: null,
    formWidth: 500,
    formxWinId: 'win-posisiwinId',
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    init: function(application) {
        var me = this;

        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        var events = new Erems.library.box.tools.EventSelector();

        this.control({
            'prosessmspanel': {
                afterrender: this.panelAfterRender,
                beforerender: me.mainPanelBeforeRender

            },
            'prosessmsgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'prosessmsgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'prosessmsgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'prosessmsgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'prosessmsgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'prosessmsgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'prosessmsformsearch button[action=search]': {
                click: this.dataSearch
            },
            'prosessmsformsearch button[action=reset]': {
                click: this.dataReset
            },
            'prosessmsformdata': {
                afterrender: this.formDataAfterRender,
                beforerender: function(el) {

                }
            },
            'prosessmsformdata button[action=save]': {
                click: this.mainDataSave
            },
            'prosessmsformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'prosessmsgrid toolbar button[action=process]': {
                click: function() {
                    me.showFormProcessSMS();
                }
            },
            'prosessmsformdataprocess button[action=process]': {
                click: function() {
                    me.processClick();
                }
            },
            'prosessmsformdata button[action=browse]': {
                click: function(el) {
                    me.browseCustomer(el);
                }
            },
            'prosessmscustomergrid button[action=select]': {
                click: this.customerSelect
            },
            'prosessmsgrid toolbar button[action=excel]': {
                click: function(){
                    me.saveExcel();
                }
            },
            //aded by semy 21-06-2017
            'prosessmsgrid toolbar button[action=excel_selected]': {
                click: function(){
                    me.saveExcelSelected();
                }
            },
            'prosessmsgrid toolbar button[action=excel_all]': {
                click: function(){
                    me.saveExcelAll();
                }
            },
            'prosessmsgrid toolbar button[action=csv_all]': {
                click: function(){
                    me.saveCsvAll();
                }
            },
            //ended
            'prosessmsgrid toolbar button[action=send_sms]': {
                click: function(){
                    me.sendSms();
                }
            },
            'prosessmsgrid toolbar button[action=send_email]': {
                click: function(){
                    me.sendEmail();
                }
            },
            
        });
    },
    //added by semy 21-6-2017
    gridSelectionChange: function() {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
        // grid.down('#btnExportSelected').setDisabled(row.length < 1 || row.length > 1);
        // grid.down('#btnSendSms').setDisabled(row.length < 1 || row.length > 1);
        grid.down('#btnSendEmail').setDisabled(row.length < 1 || row.length > 1);
        grid.down('#btnEdit').setDisabled(row.length < 1 || row.length > 1);
        grid.down('#btnDelete').setDisabled(row.length < 1);
    },
    saveExcelAll: function() {
        var me = this;
        var p = me.getGrid();
        var params = me.getFormsearch().getValues();
        params["page"] = me.getGrid().getStore().currentPage;
        params["smscategory_id"] = me.getFormsearch().down("[name=smscategory_id]").getValue();
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: params,
            success: function(data, model) {
                p.setLoading(false);
                var url = data['others'][0][0]['URL'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {

                        }
                    });
                }
               

            }
        }).read('saveexcelall');
    },
    saveExcelSelected: function () {
        var me = this;
        var p = me.getGrid();
        var selected =  me.getGrid().getSelectionModel().getSelection();
        var params = me.getFormsearch().getValues();
        params["page"] = me.getGrid().getStore().currentPage;
        params["smscategory_id"] = me.getFormsearch().down("[name=smscategory_id]").getValue();
        var temp = [];
            for(var i in selected) {
                temp.push(selected[i].data);
            }
        
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: {
                data:Ext.encode(temp)
            },
            success: function(data, model) {
                p.setLoading(false);
                var url = data['others'][0][0]['URL'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {

                        }
                    });
                }

            }
        }).read('saveexcelselected');
    },
    //ended semy bro
    saveExcel:function(){
        var me = this;
        var me = this;
        var p = me.getPanel();
        var params = me.getFormsearch().getValues();
        var fields = me.getFormsearch().getValues();
      
        params["page"] = me.getGrid().getStore().currentPage;
        params["smscategory_id"] = me.getFormsearch().down("[name=smscategory_id]").getValue();
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: params,
            success: function(data, model) {
                p.setLoading(false);
                var url = data['others'][0][0]['URL'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {

                        }
                    });
                }


            }
        }).read('saveexcel');
    },
    saveCsvAll: function() {
        var me = this;
        var p = me.getGrid();
        var params = me.getFormsearch().getValues();
        params["page"] = me.getGrid().getStore().currentPage;
        params["smscategory_id"] = me.getFormsearch().down("[name=smscategory_id]").getValue();
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: params,
            success: function(data, model) {
                p.setLoading(false);
                var url = data['others'][0][0]['URL'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {

                        }
                    });
                }
               

            }
        }).read('savecsvall');
    },
    dataSearch: function() {
        var me = this;

        var form = me.getFormsearch().getForm();
        var fields = me.getFormsearch().getValues();
        me.getGrid().doInit();
        var store = me.getGrid().getStore();
        for (var x in fields)
        {
            
            store.getProxy().setExtraParam(x, fields[x]);
        }
        store.getProxy().setExtraParam("smscategory_id", me.getFormsearch().down("[name=smscategory_id]").getValue());
        me.loadPage(store);

    },
    panelAfterRender: function(configs) {
        this.callParent(arguments);
        var me = this;
        var f = me.getFormsearch();
        
        me.tools.ajax({
            params: {},
            success: function(data, model) {
              //  f.setLoading(false);
                me.tools.wesea(data.smscategory, f.down("[name=smscategory_id]")).comboBox();
                //  me.tools.wesea(data.bank, f.down("[name=bank_bank_id]")).comboBox();

                if(data['others'][0][0]['is_send_email'] == 1){
                    me.getGrid().down('#btnSendEmail').setVisible(true);
                }
            }
        }).read('processinit');

        //get saldo
        this.getSaldo();

    },
    customerSelect: function() {
        var me = this;
        var f = me.getFormdata();
        if (me.browseHandler) {
            me.browseHandler.selectItem(function(rec) {
                
                /// cek jika nomor hpnya banyak
                var phoneNumber = rec.get("mobile_phone");
                phoneNumber = phoneNumber.split(",");
                
                f.down("[name=sms_phonenumber]").setValue(phoneNumber[0]);
                //   console.log(rec);
            });
        }

    },
    browseCustomer: function(el) {
        var me = this;

        var browse = new Erems.library.Browse();
        browse.init({
            controller: me,
            view: 'CustomerGrid',
            el: el,
            localStore: "customer",
            mode_read: "selectedcustomer",
            loadRecordPrefix: "customer",
            browseId: 'unitpl'
        });
        browse.showWindow();

        /*
         var state = "create";
         me.instantWindow('CustomerGrid', 500, 'Customer', state, 'myCustomerWindow');
         var g = me.getGridcustomer();
         g.doInit();
         //  g.getStore().loadPage(1);
         g.getStore().load({
         params: {
         //state:"load_default_attribute"
         },
         callback: function(rec, op) {
         g.attachModel(op);
         }
         });
         // g.loadPage(1);
         */
    },
    processClick: function() {
        var me = this;
        var f = me.getFormdataprocess();
        var vs = f.getValues();
        console.log(vs);
        /// validate
        if (vs.process_date.length == 0) {
            me.tools.alert.warning("Invalid process date");
            return;
        } else if (me.tools.intval(vs.smscategory_smscategory_id) == 0) {
            me.tools.alert.warning("Invalid category");
            return;
        }
        f.setLoading("Please wait...");
        me.tools.ajax({
            params: {
                smscategory_id: me.tools.intval(vs.smscategory_smscategory_id),
                process_date: vs.process_date,
                start_date: vs.start_date,
                end_date: vs.end_date
            },
            success: function(data, model) {


                f.setLoading(false);
                
                console.log(data);
                var status = me.tools.intval(data['others'][0][0]['HASIL']);

                if(status){
                    me.tools.alert.info("Success!");
                    me.getGrid().getStore().loadPage(1);
                    f.up("window").close();
                }else{
                    me.tools.alert.warning(data['others'][0][0]["MSG"]);
                }

            }
        }).read('prosessms');

    },
    showFormProcessSMS: function() {
        var me = this;
        var state = 'create';
        me.instantWindow('FormDataProcess', 500, 'Process', state, 'myProcessWindow');
        var f = me.getFormdataprocess();
        me.tools.ajax({
            params: {},
            success: function(data, model) {


                f.setLoading(false);
                me.tools.wesea(data.smscategory, f.down("[name=smscategory_smscategory_id]")).comboBox();
                //  me.tools.wesea(data.bank, f.down("[name=bank_bank_id]")).comboBox();

            }
        }).read('processinit');
    },
    fdar: function() {
        var me = this;
        return me.altFdar(me);

    },
    
    mainDataSave: function() {
        var me = this;
           
        me.tools.iNeedYou(me).save();
    },
    
    altFdar: function(controller) {
        var me = this;
        var f = controller.getFormdata();



        //
        var x = {
            init: function() {

                controller.setActiveForm(f);




            },
            create: function() {
                var that = this;
                f.editedRow = -1;
                /*
                 f.setLoading("Loading components...");
                 me.tools.ajax({
                 params: {},
                 success: function(data, model) {
                 
                 
                 f.setLoading(false);
                 me.tools.wesea(data.employee, f.down("[name=upline_id]")).comboBox();
                 me.tools.wesea(data.bank, f.down("[name=bank_bank_id]")).comboBox();
                 
                 }
                 }).read('detail');
                 */
                f.setLoading("Loading...");
                me.tools.ajax({
                    params: {},
                    success: function(data, model) {


                        f.setLoading(false);
                        me.tools.wesea(data.smscategory, f.down("[name=smscategory_smscategory_id]")).comboBox();
                        
                        f.down("[name=smscategory_smscategory_id]").setReadOnly(true);
                      //  console.log(data);
                        var smsLangsungId = me.tools.intval(data.others[0][0]['SMSLANGSUNGID']);
                        f.down("[name=smscategory_smscategory_id]").setValue(smsLangsungId);
                        
                    }
                }).read('processinit');

            },
            update: function() {
                 var state = 'update';
                var that = this;
                f.editedRow = controller.getGrid().getSelectedRow();
                var rec = controller.getGrid().getSelectedRecord();
                f.setLoading("Loading...");
                me.tools.ajax({
                    params: {},
                    success: function(data, model) {

                        
                        f.setLoading(false);
                          f.loadRecord(rec);
                        me.tools.wesea(data.smscategory, f.down("[name=smscategory_smscategory_id]")).comboBox();
                        //  me.tools.wesea(data.bank, f.down("[name=bank_bank_id]")).comboBox();
                      
                        f.down("[name=process_date]").setReadOnly(false);
                         f.down("[name=notes]").setValue(rec.get("notes"));
                         f.down("[name=smscategory_smscategory_id]").setValue(rec.get("smscategory_smscategory"));
                         f.down("[name=customer_customer_id]").setValue(rec.get("customer_customer_id"));
                        
                       // f.down("[name=collector_employee_name]").setValue(rec.get("collector_employee_name"));
                      //  f.down("[name=process_date]").setValue(rec.get("process_date"));
                    }
                }).read('processinit');



                /*
                 
                 f.setLoading("Loading...");
                 me.tools.ajax({
                 params: {},
                 success: function(data, model) {
                 
                 //   me.tools.wesea(data.employee, f.down("[name=upline_id]")).comboBox();
                 // me.tools.wesea(data.bank, f.down("[name=bank_bank_id]")).comboBox();
                 f.loadRecord(rec);
                 f.setLoading(false);
                 
                 
                 }
                 }).read('detail');
                 */
            }

        };
        return x;
    },
    getSaldo: function(){
        var me = this;
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                var hasil = data['others'][0][0]['HASIL'];
                Ext.ComponentQuery.query('#textSaldo')[0].setValue('Saldo: '+hasil);
            }
        }).read('checksaldo');
       
    },
    sendSms: function () {
        var me = this;
        var p = me.getGrid();
        var selected =  me.getGrid().getSelectionModel().getSelection();
        var params = me.getFormsearch().getValues();
        params["page"] = me.getGrid().getStore().currentPage;
        params["smscategory_id"] = me.getFormsearch().down("[name=smscategory_id]").getValue();
        var temp = [];
        var t = 0;
        var n = 0;
        for(var i in selected) {
            //console.log(selected[i].data);
            t=t+1;
        }

        p.setLoading("Please wait, sending SMS to "+n+"/"+t+" users...");

        for(var i in selected) {
            //do ajax
            me.tools.ajax({
                params: {
                    data:Ext.encode([selected[i].data])
                },
                success: function(data, model) {
                    n = n+1;
                    p.setLoading("Please wait, sending SMS to "+n+"/"+t+" users...");
                    if(n==t){
                        p.setLoading(false);
                        var url = 1;
                        if(data['others'][0]==0){
                            Ext.Msg.show({
                                title: 'SORRY',
                                msg: 'NO ACCOUNT FOUND / NO BALANCE',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK,
                                fn: function() {
                                    me.getGrid().getStore().loadPage(1);
                                    this.getSaldo();
                                }
                            });
                            throw Error;
                        }
                        if (url) {
                            Ext.Msg.show({
                                title: 'Info',
                                msg: 'SMS HAS BEEN SENT',
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK,
                                fn: function() {
                                    Ext.ComponentQuery.query('#smsstatus_id')[0].setValue('0');
                                    Ext.ComponentQuery.query('#btnSearch')[0].fireEvent('click');
                                    me.getGrid().getStore().loadPage(1);
                                    this.getSaldo();
                                }
                            });
                        }
                    }
                }
            }).read('sendsms');
        }
    },
    sendEmail : function(){
        var me = this;
        var p  = me.getGrid();
        
        var selected =  p.getSelectionModel().getSelection();
        var total    = selected.length;

        if(total > 0){
            var sms_id = new Array();
            for(var i in selected){
                sms_id.push(selected[i].internalId);
            }

            p.setLoading("Please wait, sending email to customers...");

            var res = Ext.Ajax.request({
                url     : 'erems/prosessms/read',
                method  : 'POST',
                timeout : 45000000,
                async   : false,
                params  : {
                    data      : Ext.encode(sms_id),
                    mode_read : 'sendemail',
                }
            }).responseText;

            if(res.length > 0){
                res =  Ext.JSON.decode(res);
                Ext.Msg.show({
                    title   : 'Info',
                    msg     : res.message,
                    icon    : Ext.Msg.INFO,
                    buttons : Ext.Msg.OK,
                });
            }
            p.setLoading(false);
        }
    }
});