//default dataflow = Out
//realisasi menjadi kas atau bank ada di kasir ketika posting
Ext.define('Cashier.controller.Mergesubcoa', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    requires: [
        'Cashier.template.ComboBoxFields',
         'Cashier.library.template.combobox.Subglcombobox',
           'Cashier.library.BrowseCashier',
            'Cashier.library.template.combobox.Ptusercomboboxpersh',
    ],
    alias: 'controller.Mergesubcoa',
    views: [
        'mergesubcoa.Panel',
        'mergesubcoa.Griddetail',
        'mergesubcoa.FormData',
    ],
    stores: [
       // 'Mergesubcoa',
        'Mergesubcoadetail',
        'Mergesubcoasubdetail',
        'Subgl',
          'PtbyuserpershV2',
        
    ],
    models: [
       // 'Mergesubcoa',
        'Mergesubcoadetail',
        'Mergesubcoasubdetail',
        
    ],
    refs: [
        {ref: 'grid', selector: 'mergesubcoabrowsegrid'},
        {ref: 'formsearch', selector: 'mergesubcoabrowseformsearch'},
        {ref: 'griddetail', selector: 'mergesubcoagriddetail'},
        {ref: 'formdata', selector: 'mergesubcoaformdata'},
        
    ],
    controllerName: 'mergesubcoa',
    fieldName: 'voucher_no',
    fieldconfirmdetail: 'code',
    fieldconfirmsubdetail: 'subcode',
    bindPrefixName: 'Mergesubcoa',
    formWidth: 800,
    state: null,
    statedetail: null,
    statesubdetail: null,
    urlcommon: 'cashier/common/create',
    urldata: 'cashier/mergesubcoa/',
    urlrequest: 'cashier/mergesubcoa/create',
    urldetail: 'cashier/mergesubcoa/detail',
    urlsubdetail: 'cashier/mergesubcoa/subdetail',
    senddata: null,
    info: null,
    messagedata: null,
    valueform: null,
    pt_id: 0,
    dateNow: new Date(),
    subgl_id: 0,
    kelsub_id: 0,
    validdetail: 0,
    winId:null,
    win:null,
    subgl: null,
    subgl_id_dest: null,
     localStore: {
        selectedData: null
    },
    loadingrequest: new Ext.LoadMask(Ext.getBody(), {msg: "Please wait..."}),
    loadingrequesttop: new Ext.LoadMask(Ext.getBody(), {msg: "Please wait, loading Company..."}),
    init: function (application) {
        var me = this;
        this.control({
            'mergesubcoapanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'mergesubcoagrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
                select: this.gridSelected,
            },
            'mergesubcoagrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'mergesubcoagrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'mergesubcoagrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'mergesubcoagrid toolbar button[action=printdata]': {
                click: this.dataPrintdata
            },
            'mergesubcoagrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },

          
            'mergesubcoaformsearch button[action=search]': {
                click: this.dataSearch
            },
            'mergesubcoaformsearch button[action=reset]': {
                click: this.dataReset
            },
           
            'mergesubcoaformdata': {
                afterrender: function () {
                    var me, form;
                    me = this;
                    form = me.getFormdata();
                    me.formDataAfterRender(form, 'formdata');
                },
              
                destroy: function () {
                    var me;
                    me = this;
                    me.setDefaultBeforeLoadForm();
                }
            },
          
           
           
            'mergesubcoaformdata button[action=save]': {
                click: this.dataSavecustome
            },
            'mergesubcoaformdata button[action=cancel]': {
                click: this.formDataClose
            },
           
            //====================================START DETAIL=============================================    

            'mergesubcoagriddetail': {
                afterrender:me.gridDetailAfterRender,
                selectionchange: this.gridDetailSelectionChange

            },
            'mergesubcoagriddetail actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumndetailclick(view, cell, row, col, e);
                }
            },
            /* START  GRID AREA */
            'mergesubcoagriddetail toolbar button[action=create]': {
                click: function () {
                    var formdata = me.getFormdata().getForm();
                    if (formdata.isValid()) {
                        resetTimer();
                        me.paramdetail.stateform = 'create';
                        me.instantWindow('browse.Panel', 800, 'Detail Sub Account', 'read', 'myBrowseItemPanel');
                    }
                }
            },
            'mergesubcoagriddetail toolbar button[action=destroy]': {
                click: function () {
                    me.fieldName = 'remarks';
                    this.dataDestroydetailwithflag();
                }
            },
           
            /* END GRID AREA */

            /* BROWSE CONTROL */
             'mergesubcoabrowsegrid toolbar button[action=findduplicate]': {
                click: function () {
                    var me = this;
                    var f = me.getFormdata();
                    var subgl_code = f.down("[name=subgl_id]").getRawValue();
                    var subgl_code_id = me.subgl_id;
                    var subgroup_name = f.down("[name=subgroup_name]").getValue();
                    var subgroupname_clean = subgroup_name.replace(/[^a-zA-Z0-9]/g, "");
                    var subglcode_clean = subgl_code.replace(/[^a-zA-Z0-9]/g, "%");
                    this.findduplicate(subgl_code_id,subgl_code,subglcode_clean,subgroupname_clean);
                }
            },
             'mergesubcoabrowsegrid toolbar button[action=select]': {
                 'click': function (me, e, eOpts) {
                    var me, form, grid;
                    me = this;
                    form = me.getGrid();
                    grid = me.getGriddetail();
                    me.picksubaccount(form, grid);
                 
                }
            },
           
            'mergesubcoabrowsegrid':{
                afterrender:me.browsegridAfterRender,
                selectionchange: this.gridSelectionChange,
            },
        
            'mergesubcoabrowseformsearch button[action=search]': {
                click: me.browsedataSearch
            },
            'mergesubcoabrowseformsearch button[action=reset]': {
                click: me.browsedataReset
            },
            /* END BROWSE CONTROL */

            /* START FORM AREA */
          
            'mergesubcoaformdata [name=subgl_id]': {
               'select': function (g, record, item, index, e, eOpts) {
                    var me,rowdata,f,subgroup_name,subgroup_desc, griddetail,unit_id,unit_number;
                    me = this;
                    f = me.getFormdata();
                    subgroup_name = f.down('[name=subgl_id]').valueModels[0].data.kelsub;
                    subgroup_desc = f.down('[name=subgl_id]').valueModels[0].data.keldesc;
                    unit_id = f.down('[name=subgl_id]').valueModels[0].data.unit_id;
                    unit_number = f.down('[name=subgl_id]').valueModels[0].data.unit_number;
                    code1 = f.down('[name=subgl_id]').valueModels[0].data.code1;
                    code2 = f.down('[name=subgl_id]').valueModels[0].data.code2;
                    code3 = f.down('[name=subgl_id]').valueModels[0].data.code3;
                    code4 = f.down('[name=subgl_id]').valueModels[0].data.code4;
                    subdesc = f.down('[name=subgl_id]').valueModels[0].data.subdesc;
                    me.setVal(f, 'subgroup_name', subgroup_name);
                    me.setVal(f, 'subgroup_desc', subgroup_desc);
                    me.setVal(f, 'unit_id', unit_id);
                    me.setVal(f, 'unit_number', unit_number);
                    me.setVal(f, 'code1', code1);
                    me.setVal(f, 'code2', code2);
                    me.setVal(f, 'code3', code3);
                    me.setVal(f, 'code4', code4);
                    me.setVal(f, 'subdesc', subdesc);
                    griddetail = me.getGriddetail();
                    griddetail.down('toolbar button[action=create]').setDisabled(false);
                    griddetail.getStore().removeAll();

                    me.subgl_id = f.down('[name=subgl_id]').valueModels[0].data.subgl_id; //record[0].data.subgl_id;
               }
            },
            
           
            'mergesubcoadetailformdata button[action=save]': {
                'click': function (me, e, eOpts) {
                    var me, form, grid;
                    me = this;
                    form = me.getFormdatadetail();
                    grid = me.getGriddetail();
                    me.dataSaveDetailstore(form, grid);
                },
            },
            'mergesubcoaformdata [name=pt_id]': {
                 'select': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    form = me.getFormdata();
                    form.down('[name=subgl_id]').setValue('');
                    form.down('[name=subgroup_name]').setValue('');
                    form.down('[name=subgroup_desc]').setValue('');
                }
            },

          

          

         
           

        });
    },
     getMe: function(){
       var me = this;
       return _Apps.getController(me.bindPrefixName);
    },
    setDefaultBeforeLoadForm: function () {
        var me;
        me = this;
        me.project_id = 0;
        me.pt_id = 0;
        me.kelsub_id = 0;
        me.state = null;
        me.statedetail = null;
        me.statesubdetail = null;
        me.subgl = null;
        me.messagedata = null;
        me.valueform = null;

        //clean data detail
        me.paramdetail.iddetail = 0;
        me.paramdetail.stateform = null;
        me.paramdetail.formaction = null;
        me.paramdetail.formproperties = null;
        me.paramdetail.iddetail = 0;
        me.paramdetail.store = null;
        me.paramdetail.data = null;
        me.paramdetail.grid = null;
        me.paramdetail.row = null;
        me.paramdetail.form = null;
        me.paramdetail.checkdata = false;
        me.paramdetail.object = null;
        me.paramdetail.rowdata = null;
        me.paramdetail.action = null;
        me.paramdetail.rowdetailtmp = null;
        me.paramdetail.counter = 0;
        me.paramdetail.flagkelsub = 0;

      

    },
    paramdetail: {
        //start formgeneate
        formlayout: 'fit',
        formshadow: 'frame',
        formmask: 'Loading...',
        formwidth: 800,
        formtimeout: 0,
        stateform: null,
        formaction: null,
        formproperties: null,
        formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0,
        store: null,
        data: null,
        record: null,
        grid: null,
        row: null,
        form: null,
        checkdata: false,
        object: null,
        rowdata: null,
        action: null,
        counter: 0,
        flagkelsub: 0,
        rowdetailtmp: null,
        //start properties form
    },
    
    dataSavecustome: function () {
        var me, state, form, formdata, griddetail, addingRecord, vp, vps, x, store, storedesc, storedetail, storesubdetail,
                valuedata, idProperty, rec, paramdata, rowdata, resjsonheader, rowjsonheader, validheader, paramheader,
                idProperty, counterdesc, counterdetail, countersubdetail, msgheader, restotal, validation,
                subglid_source,datadetail;

        me = this;
        me.subgl_id_dest = '';
        var subglid_dest_final = '';
        griddetail = me.getGriddetail().getStore();
        counterdetail = griddetail.getCount();
        form = me.getFormdata();
         var valueModels = form.down('[name=pt_id]').valueModels[0];
        var project_id = valueModels.data['project_id'];
        var pt_id = valueModels.data['pt_id'];

        if(counterdetail > 0){

            form = me.getFormdata();
            form.up('window').body.mask('Saving data, please wait ...');
            subglid_source = form.down("[name=subgl_id]").getValue();
            storedetail = Ext.data.StoreManager.lookup('Mergesubcoadetail');
            storedetail.each(function (record, index) {
                if(counterdetail == 1){
                    me.subgl_id_dest = me.subgl_id_dest + record.get('subgl_id');
                    subglid_dest_final = me.subgl_id_dest;
                }else{
                    me.subgl_id_dest = me.subgl_id_dest + record.get('subgl_id') + '~';
                    subglid_dest_final = me.subgl_id_dest.slice(0, -1);
                }

            });

            datadetail = {
                parametersql : 'create',
                hideparam: 'detailcreate',
                project: project_id,
                pt: pt_id,
                subgl_id_source : me.subgl_id,
                subgl_id_dest : subglid_dest_final,
                user_id : apps.uid
            };

             Ext.Ajax.request({
                            url: me.urldetail + 'create',
                            method: 'POST',
                            params: {
                                data: Ext.encode(datadetail)
                            },
                             success: function (response) {
                                me.alertFormdataSuccess();

                            },
                            failure: function (response) {
                                me.alertFormdataSuccess();
                            }
                        });




        }else{
           Ext.Msg.alert('Info','Please Fill at Least One Sub Account to be Merged');
           return false;

        }


    },
     alertFormdataSuccess: function () {
        var me, form, store;
        me = this;
        me.getGriddetail().getStore().removeAll();
        form = me.getFormdata();
        // form.getForm().reset();

        form.down("[name=subgl_id]").reset();
        form.down("[name=subgroup_name]").reset();
        form.down("[name=subgroup_desc]").reset();
        form.down("[name=unit_id]").reset();
        form.down("[name=unit_number]").reset();

        me.loadComboBoxStore(form);
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Success',
            msg: 'Success',
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK,
           
        });
        setTimeout(function(){
                Ext.Msg.hide();
                }, 3000);
    },
    alertFormdataFailed: function () {
        var me, form, store;
        me = this;
        me.getGriddetail().getStore().removeAll();
        form = me.getFormdata();
        form.getForm().reset();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Failure',
            msg: 'Error: Unable to Saved',
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK,
        });
         setTimeout(function(){
                Ext.Msg.hide();
                }, 3000);
    },
  
  
    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid(),
        row = grid.getSelectionModel().getSelection();
        if (row.length > 0){
            grid.down('#btnPick').setDisabled(false);
        }else{
            grid.down('#btnPick').setDisabled(true);
        }
    },
     gridDetailSelectionChange: function () {
        var me = this;
        var griddetail = me.getGriddetail(),
        row = griddetail.getSelectionModel().getSelection();
        if (row.length > 0){
            griddetail.down('#btnDelete').setDisabled(false);
        }else{
            griddetail.down('#btnDelete').setDisabled(true);
        }
    },
    gridSelected: function () {
        var me, grid, store, counter, record, row;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            record = grid.getSelectionModel().getSelection()[0];
            //console.log(record);
            row = record['data'];
            if (row.status == '1' || row.status == '2') {
                grid.down('#btnEdit').setDisabled(false);
                grid.down('#btnDelete').setDisabled(false);
            } else {
                grid.down('#btnEdit').setDisabled(true);
                grid.down('#btnDelete').setDisabled(true);
            }
            //grid.down('#btnPrintvoucher').setDisabled(false);
        }
    },
   
  
  
   
   
  
    
   
  

    formDataAfterRender: function (form = '', flagform) {
        var me, record, row, state, description, formheader, grid, store, counter, griddetail,f;
        if (form != '') {
            var me = this;
            state = 'create';
            if (flagform == 'formdata') {
                me.fdar().init();
                me.loadComboBoxStore(form);
                switch (state) {
                    case 'create':
                    storesubcode = me.getStore("Subgl");
                    f = me.getFormdata();

                    f.down("[name=subgl_id]").on('keyup' , function(e, t, eOpts){
                      storesubcode.proxy.extraParams = {
                            "hideparam": 'getsubglbyprojectpt',
                            'project_id': f.down("[name=pt_id]").valueModels[0].data.project_id,
                            'pt_id': f.down("[name=pt_id]").valueModels[0].data.pt_id,
                        }
                    });

                    
                        me.fdar().create();
                         me.setStorePtuser();
                        break;
                  
                  

                } 
               
            } 

    }
    },
   
   
    gridActionColumndetailclick: function (view, cell, row, col, e) {
        var me, pd, grid, action = '';
        me = this;
        pd = me.paramdetail;
        grid = me.getGriddetail();
        grid.getSelectionModel().select(row);
        pd.action = e.getTarget().className.match(/\bact-(\w+)\b/)[1];
        pd.rowdata = grid.getStore().getAt(row);
        me.actiondataDetail();
    },
   
   
  

    griddetailitemdoubleclick: function () {
        var me, pd;
        me = this;
        pd = me.paramdetail;
        pd.action = 'update';
        me.actiondataDetail();
    },
    actiondataDetail: function () {
        var me, pd, returndata;
        me = this;
        pd = me.paramdetail;
        me.cellgridDetail();
        switch (pd.action) {
            case 'update':
                me.paramdetail.stateform = 'update';
                me.GenerateFormdata(me.paramdetail);
                break;
            case 'destroy':
                me.dataDestroydetailwithflag();
                break;
            default:
                returndata = "No action selected";
        }
    },
  
   
    dataDestroydetailwithflag: function () {
        var me, rows, ph, pd, confirmmsg, successmsg, failmsg,
                record, recordcounttext, store, selectedRecord, msg, successcount
                , parameter, pesan, dataconfirm, ph, pd;

        me = this;
        dataconfirm = me.fieldconfirmdetail;

        rows = me.getGriddetail().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = me.getGriddetail().getStore();

            if (rows.length == 1) {
                selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(dataconfirm) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }

            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    msg = function () {
                        me.getGriddetail().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        record = rows[i];
                        store.remove(record);
                        me.getGriddetail().getSelectionModel().deselectAll();
                    }
                }

            });

        }
    },
  
    createWindows: function () {
        var me = this;
        me.winId ='reportkasbondepartmentrequestwindows';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.win = desktop.getWindow(me.winId);
    },
   
    
      
        gridSelectionChangesubdetail: function () {
        var me = this;
        var grid = me.getGridsubdetail(),
        row = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
        //grid.down('#btnDelete').setDisabled(row.length < 1);
    },
    
  

     getFormProperties: function (action) {
        var me = this;
        var p = {
            state: 'read',
            formtitle: 'View',
            formicon: 'icon-form-add'
        };
        if (typeof action !== 'undefined') {
            p.state = action.replace(me.bindPrefixName, "").toLowerCase();

            var grid = me.getGriddetail();
            var actionColItems = grid.down('actioncolumn').items;
            var founded = false;
            for (var i in actionColItems) {
                if (actionColItems[i].bindAction === action) {
                    p.formtitle = actionColItems[i].text;
                    p.formicon = actionColItems[i].iconCls;
                    founded = true;
                }

            }
            if (!founded) {
                p.formtitle = p.state;
            }
        }

        return p;
    },
    
    execAction: function (el, action, me) {
        if (!action) {
            action = '';
        }
        if (!me) {
            me = this;
        }

        switch (action) {
            case me.bindPrefixName + 'Create':
            case me.bindPrefixName + 'Update':
            case me.bindPrefixName + 'Read':
               
                break;
            case 'show':
                me.formDataShow(el, action);
                break;
            case me.bindPrefixName + 'Delete':
              //  me.dataDestroy(el);
                break;

        }
    },
  
     gridDetailAfterRender: function(el, a, b) {
        var me = this;
        var store, form;
        
        resetTimer();
        var store = el.getStore();
        store.removeAll();
    },
    browsegridAfterRender: function(el, a, b) {
        var me = this;
        var store, form, fs;
        form = me.getFormdata();
        fs = me.getFormsearch();
        var subglcode = form.down("[name=subgl_id]").getRawValue();
        var selected_subgl_id = me.subgl_id; //form.down("[name=subgl_id]").getValue();
        var project_id = form.down("[name=pt_id]").valueModels[0].data.project_id;
        var pt_id = form.down("[name=pt_id]").valueModels[0].data.pt_id;

        fs.down("[name=selected_subgl_id]").setValue(selected_subgl_id);
        fs.down("[name=project_id]").setValue(project_id);
        fs.down("[name=pt_id]").setValue(pt_id);
        // console.log(selected_subgl_id);
     
        resetTimer();
        var store = el.getStore();
        store.removeAll();
       // store.loadPage(1); 
    },
    browsedataSearch: function(el) {
        resetTimer();
        var me = this;
       
        var form = el.up('form');
        var store = el.up('panel').up('panel').down('grid').getStore();
        var fields = form.getValues(); console.log(fields);

        var f = me.getFormdata();
        var subgroup_name = f.down("[name=subgroup_name]").getValue();

        if(fields.subgl_code == '' && fields.subgl_desc == ''){
            Ext.Msg.alert('Info','Please Fill One of Search Criteria');
           return false;
        }else{
            for (var x in fields)
            {
                store.getProxy().setExtraParam(x, fields[x]);
            }
            store.getProxy().setExtraParam("subgroup_name", subgroup_name);
            store.loadPage(1);
            // this.findduplicate(subgl_code_id,subgl_code,subglcode_clean,subgroupname_clean,subgl_desc);
        }
    },
       browsedataReset: function(el) {
        var me = this;
        var form = el.up('form');
        form.getForm().reset();
        var grid = me.getGrid();
        var store = grid.getStore();
        store.removeAll();
        
       // me.browsedataSearch(el.up('panel').up('panel').down('button[action=search]'));
    },
        findduplicate: function(subgl_id,subgl_code,subgl_code_clean,subgroup,subgl_desc = ""){
            var me = this;
            var store;
            var form = me.getFormdata();
            var valueModels = form.down('[name=pt_id]').valueModels[0];
            var project_id = valueModels.data['project_id'];
            var pt_id = valueModels.data['pt_id'];
            store = me.getStore("Mergesubcoasubdetail");
            store.load({
                params: {
                    "hideparam": 'findduplicate',
                    "project_id" : project_id,
                    "pt_id": pt_id,
                    "subgl_id" : subgl_id,
                    "subgl_code": subgl_code,
                    "subgl_code_clean" : subgl_code_clean,
                    "subgroup_name" : subgroup,
                    "subgl_desc": subgl_desc
                },
                callback: function (records, operation, success) {

                }
            });


    },
        picksubaccount: function(form = '', grid = ''){
           var me, pd, form, grid, store, record, row, raw, indexdata, state, counterdetail, getindex = '';
           me = this;
           pd = me.paramdetail;
           var id_exist = [];
            if (form != '' && grid != '') {
                grid = me.getGriddetail();
                store = grid.getStore();
                counterdetail = store.getCount();
                var form = me.getGrid(),
                row = form.getSelectionModel().getSelection();
                pd.row = row;
                if (counterdetail > 0){

                 store.each(function(rec) {
                    id_exist.push(rec.get('subgl_id'));
                });



                  for (var i = 0; i <= row.length - 1; i++) {
                      if  (id_exist.includes(row[i].data.subgl_id)){
                         Ext.Msg.alert('Info','Already Picked !');
                         return false;
                        // form.up('window').close();
                      }else{
                            store.add(row[i]);
                            form.up('window').close();
                      }
                 }
                 

                }else{
                     switch (pd.stateform) {
                            case 'create':
                                    row['statedata'] = 'create';
                                    store.add(row);
                                    store.commitChanges();
                                break;
                        
                        }
                    form.up('window').close();

                }


               
                

            }
      
    },

     setStorePtuser: function () {
        var me, store, form, grid;
        me = this;
        me.is_ready = 0;
        me.loadingrequesttop.show();
        store = me.getStore("PtbyuserpershV2");
        form = me.getFormdata();
        store.load({
            params: {
                "hideparam": 'getptbyuserpersh',
                "project_id": apps.project,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                form.down('[name=pt_id]').setValue(parseInt(apps.projectpt));
               me.loadingrequesttop.hide();
               me.is_ready = 1;
            }
        });
       // gridstore = grid.getStore();
       // gridstore.reload();
    },
  
   
});