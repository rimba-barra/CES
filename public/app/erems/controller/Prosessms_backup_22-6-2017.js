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
        });
    },
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

            }
        }).read('processinit');

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
                var that = this;
                f.editedRow = controller.getGrid().getSelectedRow();
                var rec = controller.getGrid().getSelectedRecord();
                f.setLoading("Loading...");
                me.tools.ajax({
                    params: {},
                    success: function(data, model) {


                        f.setLoading(false);
                        me.tools.wesea(data.smscategory, f.down("[name=smscategory_smscategory_id]")).comboBox();
                        //  me.tools.wesea(data.bank, f.down("[name=bank_bank_id]")).comboBox();
                        f.loadRecord(rec);
                        f.down("[name=process_date]").setReadOnly(false);
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
    }




});