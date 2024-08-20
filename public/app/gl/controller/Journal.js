Ext.define('Gl.controller.Journal', {
    extend: 'Gl.library.template.controller.Controllergl',
    controllerName: 'journal',
    formWidth: 1200,
    fieldName: 'voucher_no',
    bindPrefixName: 'Journal',
    alias: 'controller.Journal',
    requires:
            [
                'Gl.library.tools.Mytools',
                'Gl.template.ComboBoxFields',
                'Gl.library.template.combobox.Prefixcombobox',
                'Gl.library.template.combobox.CoaSettingCombobox',
                'Gl.library.template.combobox.CoaSettingOnGridCombobox',
                'Gl.library.template.combobox.SubaccountcodeCombobox',
                'Gl.library.template.combobox.SubaccountcodeOnGridCombobox',
            ],
    views:
            [
                'journal.Panel',
                'journal.Grid',
                'journal.AccountJournalGrid',
                'journal.SubAccountGrid',
                'journal.FormData',
                'journal.FormDataAccountJournal',
                'journal.FormDataSubAccount',
                'journal.FormDataMultiSubAccount',
                'journal.FormDataUploadJournal'
            ],
    stores:
            [
                'Journal',
                'AccountJournal',
                'SubAccountJournal',
                'SummaryJournal',
                'Prefixcombo',
                'CoaSettingCombo',
                'Subaccountcode',
            ],
    models:
            [
                'Journal',
                'AccountJournal',
                'SubAccountJournal',
                'SummaryJournal',
                'Kodeprefix',
                'Coa',
                'Subaccountcode',
            ],
    refs:
            [
                {ref: 'grid', selector: 'journalgrid'},
                {ref: 'SubAccountGrid', selector: 'SubAccountGrid'},
                {ref: 'AccountJournalGrid', selector: 'AccountJournalGrid'},
                {ref: 'formsearch', selector: 'journalformsearch'},
                {ref: 'formdata', selector: 'journalformdata'},
                {ref: 'formdataaccountjournal', selector: 'formdataaccountjournal'},
                {ref: 'formdatauploadjournal', selector: 'formdatauploadjournal'},
                {ref: 'formdatasubaccount', selector: 'formdatasubaccount'},
                {ref: 'formdatamultisubaccount', selector: 'formdatamultisubaccount'},
                {ref: 'winaj', selector: 'win-accountjournalformdata'},
            ],
    //start parameter form voucher
    pcounterjournal: 0,
    pcounterjournalnew: 0,
    pcountersubjournal: 0,
    pformjournal: '',
    pstorejournal: '',
    pvaluejournal: '',
    pstoreaccountjournal: '',
    pstoresubaccountjournal: '',
    pstatefromjournal: '',
    pjrawval: '',
    pjvalue: '',
    ptoday: '',
    voucherno: '',
    //end parameter form voucher

    //start parameter form account journal     
    pa_i: 0,
    pa_that: '',
    pa_kelsub: '',
    pa_kelsub_id: 0,
    pa_grid: '',
    pa_row: '',
    pa_record: '',
    pa_rawval: '',
    pa_value: '',
    pa_statefrom: '',
    pa_store: '',
    pa_storesaj: '',
    pa_journal_id: 0,
    pa_journaldetail_id: 0,
    //end paramater form account journal

    //start parameter form sub account journal 
    psa_i: 0,
    psa_rawval: '',
    psa_value: '',
    psa_statefrom: '',
    psa_store: '',
    psa_storesaj: '',
    psa_journal_id: 0,
    psa_journaldetail_id: 0,
    //end paramater form sub account journal         
    init: function (application) {
        var me = this;
        this.control({
            'journalpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender,
                boxready: function (panel) {
                    me = this;
                    //me.Initpanelboxready(panel.ownerCt.id);
                    $("#menuitem-1258-itemEl").click(function() { //menu jurnal
                      $("#WINDOW-mnuJournal_header-targetEl .x-tool-close").click();
                    });
                }
            },
            'koreksisetelahpostingpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender,
                boxready: function (panel) {
                    me = this;
                    //$("#WINDOW-mnuJournal_header-targetEl .x-tool-close").click();
                    //me.Initpanelboxready(panel.ownerCt.id);
                    $( "#menuitem-1257-itemEl" ).click(function() { //menu koreksi data
                      $("#WINDOW-mnuKoreksisetelahposting_header-targetEl .x-tool-close").click();
                    });
                }
            },
            //Start Grid Journal
            'journalgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
                boxready: function () {
                    var me = this;
                    $("#journalgridID").keyup(function( e ) {
                        if (e.altKey && e.which == 65) {
                            e.preventDefault();
                            me.formDataShow('create');
                            return false;
                        }
                    });
                }
            },
            'journalgrid toolbar button[action=create]': {
                click: function () {
                    this.formDataShow('create');
                   }
            },
            'journalgrid toolbar button[action=destroy]': {
                click: this.dataDestroyJournalCustome
            },
            'journalgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'journalgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClickJournal
            },
            'journalgrid toolbar button[action=update]': {
                click: function () {
                    this.formDataShow('update');
                }
            },
            //End Grid Journal

            //Start Grid Account Journal
            'AccountJournalGrid': {
                itemdblclick: function () {
                    me.FormAccountJournalShow('update');
                },
                //cellclick: this.gridAccountJournalSelect,
                select: this.gridAccountJournalSelect,
                afterrender: this.gridAccountJournalAfterRender
               // selectionchange: this.gridAccountJournalSelect,
            },
            'AccountJournalGrid actioncolumn': {
                click: this.gridActionColumnAccountJournalClick
            },
            'AccountJournalGrid toolbar button[action=create]': {
                click: function () {
                    this.FormAccountJournalShow('create');

                }
            },
            'AccountJournalGrid toolbar button[action=upload]': {
                click: function () {
                    this.FormUploadJournalShow('upload');
                }
            },
            'AccountJournalGrid toolbar button[action=newrow]': {
                click: function () {
                    this.NewRowJournal();
                }
            },
            'AccountJournalGrid toolbar button[action=exportacc]': {
                click: function () {
                    this.Exportaccount();
                }
            },
            'AccountJournalGrid toolbar button[action=uploads]': {
                click: function () {
                    this.uploadSAJT();

                }
            },
            'AccountJournalGrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'AccountJournalGrid toolbar button[action=update]': {
                click: function () {

                }
            },
            // End Grid Account Journal

            //Start Grid Sub Account Journal
            'SubAccountGrid': {
                itemdblclick: function () {
                    me.FormSubAccountShow('update');
                },
                select: function () {                    
                    this.gridSubAccountSelect(me);
                },
                afterrender: this.gridSubAccountJournalAfterRender
            },
            'SubAccountGrid actioncolumn': {
                click: this.gridActionColumnSubAccountClick
            },
            'SubAccountGrid toolbar button[action=multi]': {
                click: function () {
                    this.FormMultiSubAccountShow('create');
                }
            },
            'SubAccountGrid toolbar button[action=create]': {
                click: function () {
                    this.FormSubAccountShow('create');
                }
            },
            'SubAccountGrid toolbar button[action=update]': {
                click: function () {
                }
            },
            'SubAccountGrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'SubAccountGrid toolbar button[action=newrow]': {
                click: function () {
                    this.NewRowSubJournal();
                }
            },
            // End Grid Sub Account Journal

            //Start Form Search Journal
            'journalformsearch': {
                afterrender: this.FormSearchAfterRender,
                boxready: function (panel) {
                    var me = this;
                    $("#journalformsearchID input[name='voucher_no']").focus();
                    $("#journalformsearchID").keyup(function( e ) {
                        if (e.which == 13) {
                            e.preventDefault();
                            me.liveSearch(me);
                            return false;
                        }
                        if (e.altKey && e.which == 65) {
                            e.preventDefault();
                            $("#journalgridID #btnNew").click();
                            return false;
                        }
                    });

                    var win = panel.ownerCt.id;
                    if(win=="journalpanelID" && me.id=="Journal"){
                        $("#journalformsearchID-body #radio2-inputEl").click();
                        me.liveSearch(me);
                    }else if(win=="koreksisetelahpostingpanelID" && me.id=="Koreksisetelahposting"){
                        $("#journalformsearchID-body #radio2-inputRow").hide();
                        $("#journalformsearchID-body #radio3-inputRow").hide();
                        $("#journalgridID #btnNew").hide();
                        $("#journalformsearchID-body #radio1-inputEl").click();
                        me.liveSearch(me);
                    }
                }
            },
            'journalformsearch button[action=search]': {
                //click: this.dataSearch
                click: function () {
                    this.liveSearch(this);
                }
            },
            'journalformsearch button[action=reset]': {
                click: function () {
                    this.customeReset(this);
                }
            },
            //End Form Search Journal
            'formdatauploadjournal button[action=upload]': {
                click: function () {
                    this.UploadJournal();
                }
            },

            //Start Form Data Journal
            'journalformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function (panel) {
                    var me = this;

                    $("#journalformdataID .btnMulAcc").hide();
                    $("#journalformdataID .btnAddSub").hide();
                    $("#journalformdataID #subaccountgridactioncolID").hide();

                    $("#journalformdataID input[name='prefix_id']").focus();
                    $("#journalformdataID").keyup(function( e ) {
                        if (e.which == 13) {
                            e.preventDefault();
                            $("#journalformdataID #btnSave").click();
                            return false;
                        }
                        if (e.altKey && e.which == 65) {
                            //e.preventDefault();
                            //$("#journalgridID #btnNew").click();
                            return false;
                        }
                    });
                    //get state formdata
                    me.pstatefromjournal = me.getFormdata().up('window').state.toLowerCase();
                    if (me.pstatefromjournal == 'create') {
                        //get today
                        me.getFormdata().down('#btnSave').setDisabled(true);

                        me.ptoday = this.CurrentDate();
                        //set value voucher_date in formdata
                        this.setValue(me, 'voucher_date', me.ptoday);
                        me.pglobal.voucherdate = me.ptoday;
                        //get store in grid
                        me.pcounterjournal = 0;
                        me.pstoreaccountjournal = me.getAccountJournalGrid().getStore();
                        me.pstoresubaccountjournal = me.getSubAccountGrid().getStore();

                        //remove store
                        me.pstoreaccountjournal.removeAll();
                        me.pstoresubaccountjournal.removeAll();
                        //set disable grid
                        me.getFormdata().down("[name=journal_id]").setValue(me.pcounterjournal);
                        me.getFormdata().down("[name=accountjournalgrid]").setDisabled(true);
                        me.getFormdata().down("[name=subaccountjournalgrid]").setDisabled(true);
                    }else if(me.pstatefromjournal == 'update'){
                        me.paj.statefromaj = 'hide';
                        me.psaj.statefromaj = 'hide';
                        
                        me.pstorejournal = me.getGrid().getStore();
                        me.pstorejournal.clearFilter(true);
                       
                        var form = me.getFormdata().getForm();
                        var valuedata = form.getValues();
                        var journal_id =  valuedata.journal_id;
                        
                       me.voucherno =  valuedata.no_generate;
                       this.setValue(me, 'debit_total',  Ext.util.Format.number(valuedata.debit_total, '0,000.00'));
                       this.setValue(me, 'credit_total', Ext.util.Format.number(valuedata.credit_total, '0,000.00'));
                       this.setValue(me, 'selisih', Ext.util.Format.number(valuedata.selisih, '0,000.00'));
                        
                         me.pcounterjournal = journal_id;
                         me.pa_grid = me.getAccountJournalGrid();
                         me.pstoreaccountjournal = me.getAccountJournalGrid().getStore();
                         me.pstoreaccountjournal.clearFilter(true);
                         me.pstoreaccountjournal.load({
                            params: {
                                "hideparam": 'default',
                                "journal_id": journal_id,
                                "start": 0,
                                "limit": 1000,
                            },
                            callback: function (records, operation, success) {
                                me.pstoreaccountjournal.sort('journaldetail_id_acc', 'ASC');
                                me.pa_grid.getSelectionModel().select(0, true);
                            }
                        });
                                  
                        me.pstoresubaccountjournal = me.getSubAccountGrid().getStore();    
                        me.pstoresubaccountjournal.clearFilter(true);
                        me.pstoresubaccountjournal.load({
                            params: {
                                "hideparam": 'default',
                                "journal_id": journal_id,
                                "start": 0,
                                "limit": 1000,
                            },
                            callback: function (records, operation, success) {
                                me.pstoreaccountjournal.sort('journalsubdetail_id_sub', 'ASC');
                            }
                        });
                     
                        
                    }
                },
            },
            'journalformdata [name=prefix_id]': {
                select: function () {
                    me.pjrawval = this.getValue(me, 'prefix_id', 'raw');
                    me.pjvalue = this.getValue(me, 'prefix_id', 'value');

                    me.pstatefromjournal = me.getFormdata().up('window').state.toLowerCase();
                    if (me.pstatefromjournal == 'create') {
                        this.GenerateVoucher(me.pjvalue,'0');
                        //get store in grid
                        me.pstoreaccountjournal = me.getAccountJournalGrid().getStore();
                        me.pstoresubaccountjournal = me.getSubAccountGrid().getStore();
                        //remove store
                        me.pstoreaccountjournal.removeAll();
                        me.pstoresubaccountjournal.removeAll();
                    }
                },
            },
            'journalformdata [name=voucher_date]': {
                change: function () {
                    me.pjrawval = this.getValue(me, 'prefix_id', 'raw');
                    me.pjvalue = this.getValue(me, 'prefix_id', 'value');

                    if(me.pjvalue!==null){
                        me.pstatefromjournal = me.getFormdata().up('window').state.toLowerCase();
                        if (me.pstatefromjournal == 'create') {
                            this.GenerateVoucher(me.pjvalue,'0');
                            //get store in grid
                            me.pstoreaccountjournal = me.getAccountJournalGrid().getStore();
                            me.pstoresubaccountjournal = me.getSubAccountGrid().getStore();
                            //remove store
                            me.pstoreaccountjournal.removeAll();
                            me.pstoresubaccountjournal.removeAll();
                        }         
                    }

                },
            },
            'journalformdata button[action=save]': {
                click: this.dataSaveCustome
            },
            'journalformdata button[action=cancel]': {
                click: this.formDataClose
            },
            //End Form Data Journal


            //Start Form Account Journal Journal
            'formdataaccountjournal': {
                afterrender: this.formAccountJournalAfterRender,
                boxready: function () {
                    var me = this;
                    $("#formdataaccountjournalID input[name='coa_acc']").focus();
                    $("#formdataaccountjournalID").keyup(function( e ) {
                        if (e.which == 13) {
                            e.preventDefault();
                            me.dataSaveAJ();
                            return false;
                        }
                    });
                    $("#formdataaccountjournalID input[name='coa_acc']").keyup(function()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/,'$1'+'.'+'$2')
                    });
                }
            },
            'formdataaccountjournal [name=coa_acc]': {
                select: function () {
                    me.pa_rawval = this.getValueFAJ(me, 'coa_acc', 'raw');
                    me.pa_value = this.getValueFAJ(me, 'coa_acc', 'value');
                    this.AutoValAccountJournal(me.pa_value);

                    me.pa_storesaj = me.getSubAccountGrid().getStore();
                    me.pa_journal_id = me.pcounterjournal;
                    me.pa_journaldetail_id = me.getValueFAJ(me, "journaldetail_id_acc", "value");
                    me.pa_statefrom = me.getFormdataaccountjournal().up('window').state.toLowerCase();

                    if (me.pa_statefrom == 'create') {
                        me.pa_i = me.pa_storesaj.getCount() - 1;
                        for (me.pa_i; me.pa_i >= 0; me.pa_i--) {
                            if (me.pa_storesaj.getAt(me.pa_i).get('journaldetail_id_sub') == me.pa_journaldetail_id) {
                                me.pa_storesaj.removeAt(me.pa_i);
                            }
                        }
                    }

                }
            },
            'formdataaccountjournal [itemId=btnSaveAJ]': {
                click: function () {
                    this.dataSaveAJ();
                }
            },
            'formdataaccountjournal [action=cancel]': {
                click: function () {
                    me.pa_journal_id = me.pcounterjournal;
                    me.pa_journaldetail_id = me.getValueFAJ(me, "journaldetail_id_acc", "value");
                    me.pa_storesaj = me.getSubAccountGrid().getStore();
                    me.pa_statefrom = me.getFormdataaccountjournal().up('window').state.toLowerCase();

                    if (me.pa_statefrom == 'create') {
                        me.pa_i = me.pa_storesaj.getCount() - 1;
                        for (me.pa_i; me.pa_i >= 0; me.pa_i--) {
                            if (me.pa_storesaj.getAt(me.pa_i).get('journaldetail_id_sub') == me.pa_journaldetail_id) {
                                me.pa_storesaj.removeAt(me.pa_i);
                            }
                        }
                    }

                    me.psaj.statefromaj = 'cancel';
                    me.pmsaj.statefromaj = 'cancel';
                    me.getFormdataaccountjournal().up('window').close();
                }
            },
            //End Form Account Journal Journal



            //Start Sub Form Account Journal Journal
            'formdatasubaccount': {
                afterrender: this.formSubAccountAfterRender,
                boxready: function () {
                    var me = this;
                    $("#formdatasubaccountID input[name='subgl_id_sub']").focus();
                    $("#formdatasubaccountID").keyup(function( e ) {
                        if (e.which == 13) {
                            e.preventDefault();
                            me.dataSaveSAJ();
                            return false;
                        }
                    });
                }
            },
            'formdatasubaccount [name=subgl_id_sub]': {
                select: function () {
                    me.psa_rawval = this.getValueFSAJ(me, 'subgl_id_sub', 'raw');
                    me.psa_value = this.getValueFSAJ(me, 'subgl_id_sub', 'value');
                    // this.setValueFSAJ(me, 'kelsub_sub', rawval);
                    this.setCodeSubAccount(this, me.psa_value);
                }
            },
            'formdatasubaccount button[action=save]': {
                click: function () {
                    this.dataSaveSAJ();
                }
            },
            //End Sub Form Account Journal Journal


            //Start Multi Sub Form Account Journal Journal
            'formdatamultisubaccount': {
                afterrender: this.formMultiSubAccountAfterRender
            },
            'formdatamultisubaccount button[action=save]': {
                click: function () {
                    this.dataSaveMSAJ();
                }
            },
            //End Multi Sub Form Account Journal Journal
        });
        sessionStorage.removeItem("keterangan_acc");
        sessionStorage.removeItem("keterangan_sub");
    },
    paj: {//param account journal
        "that": '',
        "form": '',
        "counter": 0,
        "valuedata": '',
        "statefrom": '',
        "store": '',
        "storecoa": '',
        "storesaj": '',
        "grid": '',
        "gridsaj": '',
        "record": '',
        "row": '',
        "journal_id": 0,
        "journaldetail_id": 0,
        "journalsubdetail_id": 0,
        "kelsub_id": 0,
        "coa_id": 0,
        "kelsub": 0,
        "status": '',
        "msgdata": '',
        "msg": '',
        "info": '',
        "cluster": '',
        "clusterdata": '',
        "coa": '',
        "coa_name": '',
        "debet": '',
        "credit": '',
        "type": '',
        "amount": '',
        "keterangan": '',
        "selisih": 0,
        "debit_total": 0,
        "credit_total": 0,
    },
    psaj: {//param sub account journal
        "that": '',
        "form": '',
        "valuedata": '',
        "statefrom": '',
        "statefromaj": '',
        "store": '',
        "storesa": '',
        "storeaj": '',
        "stateselect": '',
        "grid": '',
        "record": '',
        "row": '',
        "journal_id": 0,
        "journaldetail_id": 0,
        "journalsubdetail_id": 0,
        "kelsub_id": 0,
        "coa_id": 0,
        "kelsub": 0,
        "status": '',
        "msgdata": '',
        "msg": '',
        "info": '',
        "cluster": '',
        "clusterdata": '',
        "coa": '',
        "coa_name": '',
        "debet": '',
        "credit": '',
        "type": '',
        "amount": '',
        "keterangan": '',
    },
    pmsaj: {//param multi sub account journal
        "that": '',
        "form": '',
        "valuedata": '',
        "statefrom": '',
        "statefromaj": '',
        "store": '',
        "storesa": '',
        "storeaj": '',
        "grid": '',
        "record": '',
        "row": '',
        "journal_id": 0,
        "journaldetail_id": 0,
        "journalsubdetail_id": 0,
        "kelsub_id": 0,
        "coa_id": 0,
        "kelsub": 0,
        "from": 0,
        "until": 0,
        "status": '',
        "msgdata": '',
        "msg": '',
        "info": '',
        "cluster": '',
        "clusterdata": '',
        "coa": '',
        "coa_name": '',
        "debet": '',
        "credit": '',
        "type": '',
        "amount": '',
        "amount_acc": '',
        "keterangan": '',
    },
    pglobal: {//parameter global
        "info": '',
        "cluster": '',
        "voucherno": '',
        "voucherdate": '',
        "clusterdata": '',
        "state": '',
        "store": '',
        "grid": '',
        "storecoa": '',
        "row": '',
        "record": '',
        "form": '',
        "formtitle": '',
        "formicon": '',
        "formproperties": '',
        "winid": '',
        "win": '',
        "type": '',
    },
    pgrid: {
        "gridaj": 0,
        "gridsaj": 0,
        "gridmsaj": 0,
    },
    Initpanelboxready: function (win) {
        var me = this ;

    },
    panelAfterRender: function (el) {
        var me = this;
          setTimeout(
            function() {
              //Ext.getCmp("btnNew").click();
            }, 500);
          
        $("#WINDOW-mnu"+me.bindPrefixName+"-body .x-tool-collapse-left").click();
        $("#WINDOW-mnu"+me.bindPrefixName+"_header-targetEl .x-tool-maximize").click();
        console.log(me.bindPrefixName);
        this.initGeneralShortcut(el, this);
    },
    AJGDoubleclick: function (controller) {
        var me, p = '';
        me = controller;
        p = this.pglobal;

        p.storecoa = me.getStore('CoaSettingCombo');//mendapatkan store
        p.storecoa.load();

        p.grid = me.getAccountJournalGrid();
        p.store = p.grid.getStore();
        p.record = p.store.getAt(p.store.indexOf(p.grid.getSelectionModel().getSelection()[0]));
        return p.record;

    },
    gridActionColumnClickJournal: function(view, cell, row, col, e){
        var me = this;
        var record = me.getGrid().getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);
        me.getGrid().getSelectionModel().select(row);
               
        if (m) {
            switch (m[1]) {
                case 'JournalUpdate':
                    me.formDataShow('update');
                    break;
                case 'JournalDelete':
                    me.dataDestroyJournalCustome();                    
                    break;
            }
        }
    },
     gridActionColumnAccountJournalClick: function (view, cell, row, col, e) {
        var record,me,m,state,store,storesaj,recordsubaccount,coutsaj,j ='';  
         
        me = this;
        record = me.getAccountJournalGrid().getStore().getAt(row);
        m = e.getTarget().className.match(/\bact-(\w+)\b/);
        me.getAccountJournalGrid().getSelectionModel().select(row);
        state = m[1];
               
        switch(state){
             case "update":
                me.FormAccountJournalShow("update");
             break;  
             case "destroy":      
                store = me.getAccountJournalGrid().getStore();
                record.set("deleted", true);
                me.setSum();
                
                storesaj = me.getSubAccountGrid().getStore();
                storesaj.clearFilter(true);
                storesaj.filter('journaldetail_id_sub', record.get("journaldetail_id_acc"));
                coutsaj = storesaj.getCount();                
                if (coutsaj > 0) {
                    for (var j = 0; j < storesaj.getCount(); j++) {
                        storesaj.each(function (recordsubaccount, subaccountindex) {
                            if (j == subaccountindex) {
                                recordsubaccount.set("deleted", true);
                            }
                      });
                    }
                } 
             break;              
        }        
    },
    
    setSum: function(){
            var me,store,debit_total,credit_total,selisih,msgdata,status='';        
            me = this;          
            store = me.getAccountJournalGrid().getStore();
                
            store.clearFilter(true);
            store.filter('journal_id_acc',me.pcounterjournal);
            store.filter('type_acc', 'D');
            store.filter('deleted',false);
            debit_total = store.sum('amount_acc');
            me.setValue(me, 'debit_total', Ext.util.Format.number(debit_total, '0,000.00'));
                        
            store.clearFilter(true);
            store.filter('journal_id_acc', me.pcounterjournal);
            store.filter('type_acc', 'C');
            store.filter('deleted',false);            
            credit_total = store.sum('amount_acc');               
          
            me.setValue(me, 'credit_total', Ext.util.Format.number(credit_total, '0,000.00'));
            
            selisih = Ext.util.Format.number(debit_total.toFixed(2) - credit_total.toFixed(2), '0,000.00000000');
            var sel = Ext.util.Format.number(debit_total.toFixed(2) - credit_total.toFixed(2), '0,000.00');
            
            if (debit_total.toFixed(2) == credit_total.toFixed(2)) {
                msgdata = 'Saldo Balance';
                status = 'benar';
            } else if (debit_total.toFixed(2) <= credit_total.toFixed(2)) {
                msgdata = 'Credit total must be same with Debet Total, credit total is '+Ext.util.Format.number(credit_total, '0,000.00');
                status = 'salah';
            } else if (debit_total.toFixed(2) >= credit_total.toFixed(2)) {
                msgdata = 'Debet total must be same with Credit Total, debit total is '+Ext.util.Format.number(debit_total, '0,000.00');
                status = 'salah';
            }
            
            var d = this.getValue(me, 'debit_total', 'value'); 
            var c = this.getValue(me, 'credit_total', 'value'); 

            if (status == 'salah') {
                me.getFormdata().down('#btnSave').setDisabled(true);
                me.getFormdata().setTitle("<span style='background-color: yellow; border: 5px solid yellow;'>VOUCHER NO : "+me.voucherno+" , Total Debit : "+d+" , Total Credit :"+c+" , Selisih : <text style='color:red;'>"+sel+" </text>, Status : <text style='color:red;'>Not Balance</text>"+"  <br/> with message :"+msgdata+"</span>");
            } else {
                me.getFormdata().down('#btnSave').setDisabled(false);
                me.getFormdata().setTitle("VOUCHER NO : "+me.voucherno+" , Total Debit : "+d+" , Total Credit :"+c+" , Selisih :"+selisih+" , Status : Balance");

            }
            me.setValue(me, 'selisih', selisih);
            store.clearFilter();
            store.filter('journal_id_acc', me.pcounterjournal);
            store.filter('deleted',false);                                     
    },    
     setreloadAccountJournal:function(){
        var me,pa,valuedata,amount_acc,storeaj,storesaj,gridaj,gridsaj,recordaj,record ='';
        me = this;
        pa = me.paj;
        
        gridaj = pa.grid;
        storeaj = pa.store;
        storeaj.filter('deleted',false); 
        recordaj = pa.row;
        
        
        storesaj = me.psaj.store;
        storesaj.clearFilter(true);
        storesaj.filter('journal_id_sub', me.pcounterjournal);
        storesaj.filter('journaldetail_id_sub', pa.journaldetail_id);
        storesaj.filter('deleted', false);
        
        amount_acc = storesaj.sum('amount_sub');        
        
        valuedata = {"amount_acc": Ext.util.Format.number(amount_acc, '0,000.00')}
        gridaj.getSelectionModel().select(recordaj, true, false);
        
        recordaj.set(valuedata);
        storeaj.commitChanges();        
        me.setSum();
        storeaj.clearFilter();
    },
    gridActionColumnSubAccountClick: function (view, cell, row, col, e) {
        var pa,store,record,me,m,journal_id,journaldetail_id,state ='';  
         
        me = this;
        pa = me.paj;
        record = me.getSubAccountGrid().getStore().getAt(row);
        m = e.getTarget().className.match(/\bact-(\w+)\b/);
        me.getSubAccountGrid().getSelectionModel().select(row);
        state = m[1];
        
        switch(state){
             case "update":
                me.FormSubAccountShow("update");
             break;  
             case "destroy":       
                     store = me.getSubAccountGrid().getStore();
                     journal_id =  me.pcounterjournal;  
                     pa.journaldetail_id =  record.get("journaldetail_id_sub");  
                     record.set("deleted", true);
                     store.clearFilter(true);
                     store.filter('journaldetail_id_sub',pa.journaldetail_id); 
                     store.filter('deleted',false); 
                     me.setreloadAccountJournal();
             break;              
        }        
    },
   
    gridAccountJournalSelect: function () {
        var me, p, psa, pmsa,grid,store,record = '';
        me = this;
        p = me.paj; //param account journal
        psa = me.psaj;//param sub account journal
        pmsa = me.pmsaj;//param sub account journal
        
        grid = me.getAccountJournalGrid();
        store = grid.getStore();
        store.filter('deleted',false); 
        p.store =store;
        p.grid =grid;
        p.row = grid.getSelectionModel().getSelection()[0];
       
        if(p.row['data']['journaldetail_id_acc'] > 0){
            p.journal_id = me.pcounterjournal;
            p.journaldetail_id = p.row.get('journaldetail_id_acc');
            p.kelsub_id = p.row.get('kelsub_id_acc');
            p.kelsub = p.row.get('kelsub_acc');        

            p.storesaj = me.getSubAccountGrid().getStore(); 
            p.storesaj.clearFilter(true);
            p.storesaj.filterBy(function (record, id) {
                if (record.get('journaldetail_id_sub') == p.journaldetail_id ) {
                    return true;
                } else {
                    return false;
                }
            });
            p.storesaj.filter('deleted',false); 
            
            if (p.kelsub == '') {
                me.getFormdata().down("[name=subaccountjournalgrid]").setVisible(false);
            } else {
                psa.journal_id = me.pcounterjournal;
                psa.journaldetail_id = p.journaldetail_id;
                psa.kelsub_id = p.kelsub_id;
                pmsa.journal_id = me.pcounterjournal;
                pmsa.journaldetail_id = p.journaldetail_id;
                pmsa.kelsub_id = p.kelsub_id;
                me.getFormdata().down("[name=subaccountjournalgrid]").setVisible(true);
            }            
        }        
    },
    gridSubAccountSelect: function (controller) {
        var me,grid,store, pg,pa,ps = '';
        me = this;
        pg = me.pgrid;
        ps = me.psaj; 
        pa = me.paj; 
        
        grid = me.getSubAccountGrid();
        store = grid.getStore();
        
        store.clearFilter(true);
        store.filter('journaldetail_id_sub',pa.journaldetail_id); 
        store.filter('deleted',false); 
        //pg.gridsaj = Ext.getCmp('subaccountjournalgrid_ac').getSelectionModel().getSelection()[0];
        pg.gridsaj = grid.getSelectionModel().getSelection()[0];
        
        ps.grid = grid;
        ps.store = store;
        ps.record = grid.getSelectionModel().getSelection()[0];
        ps.stateselect = 'update';
    },
    FormSearchAfterRender: function () {
        var me, p = '';
        me = this;
        p = me.pglobal;
        p.store = me.getStore('Prefixcombo');//mendapatkan store
        p.store.load({
            callback: function (records, operation, success) {
                //p.store.filter('cashier', 'N');
                p.store.sort('prefix', 'ASC');
            }
        });
    },
    gridAccountJournalAfterRender: function () {
        var p, psa, pmsa, me = '';
        me = this;
        p = me.paj;
        psa = me.psaj;
        pmsa = me.pmsaj;

        var g = me.getAccountJournalGrid();
        p.store = g.getStore();
        p.storecoa = me.getStore('CoaSettingCombo');//get store
        p.storecoa.load({
            params: {
                "hideparam": 'default',
                "start": 0,
                "limit": 1000,
            },
            //if store finish load, callback again
            callback: function (records, operation, success) {
                //filter data store
                p.storecoa.filter('is_journal', '1');
                //sort data store
                p.storecoa.sort('coa', 'ASC');
            }
        });


        g.on({
            scope: this,
            edit: function (roweditor, event) {
                var rec = event.record;
                var acc = event.record.get("coa_acc");
                var name = event.record.get("name_acc");
                var kelsub = event.record.get("kelsub_acc");
                var type_acc = event.record.get("type_acc").charAt(0);
                if(type_acc == 'c'){
                    rec.data.type_acc = 'C';
                }else if(type_acc == 'd'){
                    rec.data.type_acc = 'D';
                }else{
                    rec.data.type_acc = type_acc;
                }
                //tarik value dropdown ke grid
                p.storecoa.each(function (record) {
                     if(record.get('coa')==acc){
                        //rec = p.store.getAt(p.store.indexOf(p.grid.getSelectionModel().getSelection()[0]));
                        rec.data.name_acc = record.get('name');
                        rec.data.kelsub_acc = record.get('kelsub');
                        rec.data.kelsub_id_acc= record.get('kelsub_id');
                        rec.data.type_acc = record.get('type');
                     }
                });
            g.getView().refresh();
            me.setSum();
            },
            beforeedit: function (a, b) {
                
            }
        });

    },
    formAccountJournalAfterRender: function (el) {
    
        var p, psa, pmsa, me = '';
        me = this;
        p = me.paj;
        psa = me.psaj;
        pmsa = me.pmsaj;

        me.initGeneralShortcut(el);

        p.storecoa = me.getStore('CoaSettingCombo');//get store
        p.storecoa.load({
            params: {
                "hideparam": 'isjournalonly',
                "start": 0,
                "limit": 1000,
            },
            //if store finish load, callback again
            callback: function (records, operation, success) {
                //filter data store
                p.storecoa.filter('is_journal', '1');
                //sort data store
                p.storecoa.sort('coa', 'ASC');
            }
        });

        //get state form, after render
        p.statefrom = me.getFormdataaccountjournal().up('window').state.toLowerCase();
        psa.statefromaj = p.statefrom;
        pmsa.statefromaj = p.statefrom;

        if (p.statefrom == 'create') {
            p.store = me.getAccountJournalGrid().getStore();           
            p.counter = p.store.getCount() + 1;
            this.setValueFAJ(me, 'journal_id_acc', me.pcounterjournal);
            psa.journal_id = me.pcounterjournal;
            pmsa.journal_id = me.pcounterjournal;
            this.setValueFAJ(me, 'journaldetail_id_acc', p.counter);
            psa.journaldetail_id = p.counter;
            pmsa.journaldetail_id = p.counter;
            //console.log("counter account journal :" + counter);
            //if state create then hide grid sub account  
            me.getFormdataaccountjournal().down("[name=subaccountjournalgrid_ac]").setVisible(false);
            me.getFormdataaccountjournal().down("[name=keterangan_acc]").setValue(sessionStorage.getItem("keterangan_acc"));
        } else if (p.statefrom == 'update') {
            //get grid
            p.grid = me.getAccountJournalGrid();
            //get stor from grid
            p.store = p.grid.getStore();
            //get value kelsub from store grid by index selection
            p.record = p.store.getAt(p.store.indexOf(p.grid.getSelectionModel().getSelection()[0]));
            //get value kelsub from store grid
            p.kelsub = p.record.get('kelsub_acc');
            //load data to form account journal
            me.getFormdataaccountjournal().loadRecord(p.record);
            //if kelsub is empty then hide grid sub account in this form
            if (p.kelsub == '') {
                //hide grid sub account
                me.getFormdataaccountjournal().down("[name=subaccountjournalgrid_ac]").setVisible(false);
                me.getFormdataaccountjournal().down("[name=amount_acc]").setReadOnly(false);
            } else {
                me.getFormdataaccountjournal().down("[name=subaccountjournalgrid_ac]").setVisible(true);
                me.getFormdataaccountjournal().down("[name=amount_acc]").setReadOnly(true);
            }
        }

        p.gridsaj = me.getSubAccountGrid();
        p.storesaj = me.getSubAccountGrid().getStore();
        p.journal_id = me.pcounterjournal;
        p.journaldetail_id = me.getValueFAJ(me, "journaldetail_id_acc", "value");

        p.storesaj.filterBy(function (record, id) {
            if (record.get('journaldetail_id_sub') == p.journaldetail_id ) {
                return true;
            } else {
                return false;
            }
        });

        p.storesaj.filter('deleted',false);
    },

    gridSubAccountJournalAfterRender: function(){

    },
    formSubAccountAfterRender: function () {
        var sme, pg, sp, spa = '';
        sme = this;
        spa = sme.paj;
        sp = sme.psaj;
        pg = sme.pgrid;

        storeaj = sme.getAccountJournalGrid().getStore();
        gridaj = sme.getAccountJournalGrid();
        recaj = gridaj.getSelectionModel().getSelection()[0];

        if (sp.kelsub_id < 1) {
            sp.kelsub_id = sme.getValueFAJ(sme, 'kelsub_id_acc', 'value');
        }else{
            if (sp.statefrom == 'create') {
                sp.kelsub_id = sme.getValueFAJ(sme, 'kelsub_id_acc', 'value');
            }else if(typeof recaj=== 'undefined' || recaj === null) {
                sp.kelsub_id = sme.getValueFAJ(sme, 'kelsub_id_acc', 'value');
            }else{
                sp.kelsub_id = recaj.data.kelsub_id_acc;
            }
        }

        sme.setValueFSAJ(sme, 'kelsub_id_sub', sp.kelsub_id);
        sp.storesa = sme.getStore('Subaccountcode');//get store
        sp.storesa.load({
            params: {
                "hideparam": 'default',
                "start": 0,
                "limit": 100000,
            },
            callback: function (records, operation, success) {
                sp.storesa.clearFilter(true);
                sp.storesa.filter('kelsub_id', sp.kelsub_id);
                //sort data store
                sp.storesa.sort('subgl_id', 'ASC');
            }
        });

        sp.statefrom = sme.getFormdatasubaccount().up('window').state.toLowerCase();

        if (sp.statefrom == 'create') {
            sp.store = sme.getSubAccountGrid().getStore();
            sp.journaldetail_id = spa.journaldetail_id;
            //journal_id = this.getValueFAJ(me, 'journal_id_acc', 'value');
            //journaldetail_id = this.getValueFAJ(me, 'journaldetail_id_acc', 'value');
            sp.counter = sp.store.getCount() + 1;

            sme.setValueFSAJ(sme, 'journal_id_sub', sme.pcounterjournal);
            sme.setValueFSAJ(sme, 'journaldetail_id_sub', sp.journaldetail_id);
            sme.setValueFSAJ(sme, 'journalsubdetail_id_sub', sp.counter);

            sme.getFormdatasubaccount().down("[name=keterangan_sub]").setValue(sessionStorage.getItem("keterangan_sub"));

            //console.log("counter sub account :" + counter);
        } else if (sp.statefrom == 'update') {
            if (sp.statefromaj !== 'hide') {
                sme.getFormdatasubaccount().loadRecord(pg.gridsaj);
            } else {
                sp.grid = sme.getSubAccountGrid();
                sp.store = sp.grid.getStore();
                sp.record = sp.store.getAt(sp.store.indexOf(sp.grid.getSelectionModel().getSelection()[0]));
                sme.getFormdatasubaccount().loadRecord(sp.record);
            }
        }

    },
    formMultiSubAccountAfterRender: function () {
        var me, p = '';
        me = this;
        p = me.pmsaj;

        me.setValueFMSAJ(me, 'kelsub_id_multi_sub', p.kelsub_id);
        p.storesa = me.getStore('Subaccountcode');//get store
        p.storesa.load({
            params: {
                "hideparam": 'default',
                "start": 0,
                "limit": 100000,
            },
            callback: function (records, operation, success) {
                p.storesa.clearFilter(true);
                p.storesa.filter('kelsub_id', p.kelsub_id);
                //sort data store
                p.storesa.sort('subgl_id', 'ASC');
            }
        });

    },
    dataDestroyJournalCustome : function (){
        var me = this;
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function () {
                        me.getGrid().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {

                        store.remove(rows[i]);
                    }
                    
                    store.on('beforesync', msg);
                    store.sync({
                        success: function (s) {
                            me.getGrid().up('window').unmask();
                            var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                            var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                            store.un('beforesync', msg);
                            store.reload();
                            if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                                Ext.StoreManager.lookup(me.stores[0]).load({params: {page: 1,start: 0,limit: 25}});
                            }
                            Ext.Msg.show({
                                title: 'Success',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        },
                        failure: function (batch, options) {
                            // added on april 2016, ahmad riadi
                            var parameter = (batch.proxy.getReader().jsonData.status ? batch.proxy.getReader().jsonData.status : 'no');
                            var pesan = (batch.proxy.getReader().jsonData.msg ? batch.proxy.getReader().jsonData.msg : 'Unable to save data.');
                           
                            if (parameter == 'used') {
                                failmsg = pesan;
                            } else {
                                failmsg = failmsg + ' The data may have been used.';
                            }
                            
                            
                            
                           
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg,
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
        
    },
    dataSaveCustome: function () {
        var voucher, pa, state, store, storeaj, storesaj, me, form, msg, valuedata, addrecod,hideparam = '';
        me = this;
        pa = me.paj;       
        me.getFormdata().down("[name=hideparam]").setValue('default');
        msg = function () {
            me.getFormdata().up('window').body.mask('Saving data, please wait ...');
        };
        form = me.getFormdata().getForm();
        addrecod = false;
        if (form.isValid()) {
            resetTimer();
            store = me.getGrid().getStore();
            state = me.getFormdata().up('window').state.toLowerCase();
            valuedata = form.getValues();

            switch (state) {
                case 'create':
                    me.GenerateVoucher(me.pjvalue,'1');
                    store.add(valuedata);
                    addrecod = true;
                    hideparam = 'default';
                    break;
                case 'update':
                    hideparam = 'update';
                    var idProperty = store.getProxy().getReader().getIdProperty();
                    var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
                    rec.beginEdit();
                    rec.set(valuedata);
                    rec.endEdit();                    
                    break;
            }
            
            
            voucher = me.voucherno;
            me.getFormdata().down("[name=hideparam]").setValue(hideparam);
            store.on('beforesync', msg);
            store.sync({
                success: function () {

                    //account journal
                    
                    storeaj = me.getAccountJournalGrid().getStore();
                    storeaj.clearFilter(true);
                    storeaj.filter('journal_id_acc', me.pcounterjournal);
                    //storeaj.filter('deleted',false);
                    var coutaj = storeaj.getCount();
                    //  console.log("counter : "+coutaj);
                    //  console.log("data : "+storeaj);
                    if (coutaj > 0) {
                        var array_accountjournal = [];
                        for (var i = 0; i < storeaj.getCount(); i++)
                        {
                            storeaj.each(function (recordaccount, accountindex) {
                                if (i == accountindex) {
                                    Ext.Ajax.request({
                                        url: 'gl/journal/accountjournalcreate',
                                        method: 'POST',
                                        params: {
                                            data: Ext.encode({
                                                "hideparam": hideparam,
                                                "voucherno": voucher,                                              
                                                "sort": accountindex + 1,
                                                "deleted":recordaccount.get("deleted"),
                                                "state":recordaccount.get("statedata_ac"),
                                                "journal_id": recordaccount.get("journal_id_acc"),
                                                "journaldetail_id": recordaccount.get("journaldetail_id_acc"),
                                                "kelsub_id": recordaccount.get("kelsub_id_acc"),
                                                "kelsub": recordaccount.get("kelsub_acc"),
                                                "coa_id": recordaccount.get("coa_id_acc"),
                                                "coa": recordaccount.get("coa_acc"),
                                                "type": recordaccount.get("type_acc"),
                                                "keterangan": recordaccount.get("keterangan_acc"),
                                                "amount": recordaccount.get("amount_acc")
                                            })
                                        },
                                        success: function (response) {
                                            var info = Ext.JSON.decode(response.responseText);
                                            var arrdata = info.hasil;


                                            storesaj = me.getSubAccountGrid().getStore();
                                            storesaj.clearFilter(true);
                                            storesaj.filter('journaldetail_id_sub', recordaccount.get("journaldetail_id_acc"));
                                           // storesaj.filter('deleted', false);

                                            var coutsaj = storesaj.getCount();
                                            if (coutsaj > 0) {
                                                for (var j = 0; j < storesaj.getCount(); j++)
                                                {
                                                    storesaj.each(function (recordsubaccount, subaccountindex) {
                                                        // console.log(recordsubaccount);                                                        
                                                        if (j == subaccountindex) {
                                                            Ext.Ajax.request({
                                                                url: 'gl/journal/subaccountjournalcreate',
                                                                method: 'POST',
                                                                params: {
                                                                    data: Ext.encode({
                                                                        "hideparam": hideparam,                                                                        
                                                                        "journal_id": arrdata.journal_id,
                                                                        "journaldetail_id": arrdata.journaldetail_id,
                                                                        "coa_id": arrdata.coa_id,
                                                                        "deleted":recordsubaccount.get("deleted"),
                                                                        "state": recordsubaccount.get("statedata_sub"),
                                                                        "journalsubdetail_id": recordsubaccount.get("journalsubdetail_id_sub"),
                                                                        "subgl_id": recordsubaccount.get("subgl_id_sub"),
                                                                        "kelsub_id": recordsubaccount.get("kelsub_id_sub"),
                                                                        "code": recordsubaccount.get("code_sub"),
                                                                        "code1": recordsubaccount.get("code1_sub"),
                                                                        "code2": recordsubaccount.get("code2_sub"),
                                                                        "code3": recordsubaccount.get("code3_sub"),
                                                                        "code4": recordsubaccount.get("code4_sub"),
                                                                        "keterangan": recordsubaccount.get("keterangan_sub"),
                                                                        "amount": recordsubaccount.get("amount_sub")
                                                                    })
                                                                },
                                                                success: function (response) {
                                                                    //console.log('sub detail success');

                                                                },
                                                                failure: function (response) {

                                                                }
                                                            });

                                                        }
                                                    });

                                                }

                                            }
                                        },
                                        failure: function (response) {

                                        }
                                    });
                                }
                            });
                        }

                    }
                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                        Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 25}});
                    }
                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data saved successfully.',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                            me.formDataClose();
                        }
                    });
                },
                failure: function (batch, options) {
                    var errMsg = (batch.proxy.getReader().jsonData.msg ? batch.proxy.getReader().jsonData.msg : 'Unable to save data.');
                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    if (store.getCount() > 0 && addrecod) {
                        store.removeAt(store.getCount() - 1);
                    }
                    store.reload();
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: ' + errMsg,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        }
    },
    dataSaveAJ: function () {
        //referensi masuk ke erems ke controller admincollection        
        var me, p, psa, pmsa = '';
        me = this;
        p = me.paj; //param account journal
        psa = me.psaj; //param account journal
        pmsa = me.pmsaj; //param account journal

        p.statefrom = me.getFormdataaccountjournal().up('window').state.toLowerCase();
        p.form = me.getFormdataaccountjournal().getForm();

        if (p.form.isValid()) {

            psa.statefromaj = 'save';
            pmsa.statefromaj = 'save';

            p.journal_id = me.pcounterjournal;
            p.journaldetail_id = me.getValueFAJ(me, "journaldetail_id_acc", "value");
            p.coa_id = me.getValueFAJ(me, "coa_id_acc", "value");
            p.coa = me.getValueFAJ(me, "coa_acc", "raw");
            p.coa_name = me.getValueFAJ(me, "name_acc", "raw");
            p.debet = me.getValueFAJRadio(me, "#radio1_acc");
            p.credit = me.getValueFAJRadio(me, "#radio2_acc");

            if (p.debet == true && p.credit == false) {
                p.type = "D";
            } else if (p.debet == false && p.credit == true) {
                p.type = "C";
            }
            p.kelsub_id = me.getValueFAJ(me, "kelsub_id_acc", "value");
            p.kelsub = me.getValueFAJ(me, "kelsub_acc", "value");
            p.amount = me.getValueFAJ(me, "amount_acc", "value");
            p.keterangan = me.getValueFAJ(me, "keterangan_acc", "value");

            p.store = me.getAccountJournalGrid().getStore();

            p.valuedata = {
                state_acc: p.statefrom,
                journal_id_acc: me.pcounterjournal,
                journaldetail_id_acc: p.journaldetail_id,
                coa_id_acc: p.coa_id,
                coa_acc: p.coa,               
                name_acc: p.coa_name,
                type_acc: p.type,
                kelsub_id_acc: p.kelsub_id,
                kelsub_acc: p.kelsub,
                amount_acc: p.amount,
                keterangan_acc: p.keterangan
            }



            if (p.statefrom == 'create') {
                p.store.add(p.valuedata);
                p.store.commitChanges();
            } else if (p.statefrom == 'update') {
                p.grid = me.getAccountJournalGrid();
                p.record = p.store.getAt(p.store.indexOf(p.grid.getSelectionModel().getSelection()[0]));
                p.record.beginEdit();
                p.record.set(p.valuedata);
                p.record.endEdit();
            }
            p.store.commitChanges();     
            
            sessionStorage.setItem("keterangan_acc", p.keterangan);

            me.setSum();
            me.getFormdataaccountjournal().up('window').close();

        }
    },
    uploadAJ: function (pvaldata, lvaldata) {
        //referensi masuk ke erems ke controller admincollection        
        var me, p, psa, pmsa = '';
        me = this;
        p = me.paj; //param account journal
        l = me.psaj; //param account journal
        pmsa = me.pmsaj; //param account journal

        p.statefrom = 'create';

        if (true) {

            l.statefromaj = 'save';
            pmsa.statefromaj = 'save';
            
            p.store = me.getAccountJournalGrid().getStore();
            l.store = me.getSubAccountGrid().getStore();

            p.store.add(pvaldata);
            l.store.add(lvaldata);      

            me.setSum();

            l.store.filter('journaldetail_id_sub', 0); 
            //me.getFormdataaccountjournal().up('window').close();

        }

        return p.journaldetail_id-1;
    },

    uploadSAJT: function () {
        this.uploadAJ();
    },
       
    setCodeSubAccount: function (controller, idsubgl) {
        var me, p = '';
        me = this;
        p = me.psaj;

        Ext.Ajax.request({
            url: 'gl/subaccountcode/create',
            method: 'POST',
            params: {
                data: Ext.encode({
                    "subgl_id": idsubgl,
                    "hideparam": 'livesearch',
                })
            },
            success: function (response) {
                p.info = Ext.JSON.decode(response.responseText);
                me.setValueFSAJ(controller, 'kelsub_sub', p.info.data[0].description);
                me.setValueFSAJ(controller, 'code_sub', p.info.data[0].code);
                me.setValueFSAJ(controller, 'code1_sub', p.info.data[0].code1);
                me.setValueFSAJ(controller, 'code2_sub', p.info.data[0].code2);
                me.setValueFSAJ(controller, 'code3_sub', p.info.data[0].subdsk3);
                me.setValueFSAJ(controller, 'code4_sub', p.info.data[0].subdsk4);
            },
            failure: function (response) {
            }
        });
    },
    dataSaveSAJ: function () {
        var me, p, pa = '';
        me = this;
        p = me.psaj; //param account journal
        pa = me.paj; //param account journal

        p.statefrom = me.getFormdatasubaccount().up('window').state.toLowerCase();
        p.form = me.getFormdatasubaccount().getForm();


        if (p.form.isValid()) {
            p.store = me.getSubAccountGrid().getStore();
            p.valuedata = p.form.getValues();

            if (p.statefrom == 'create') {
                p.store.add(p.valuedata);
            } else if (p.statefrom == 'update' && p.stateselect == '') {
                p.grid = me.getSubAccountGrid();
                p.record = p.store.getAt(p.store.indexOf(p.grid.getSelectionModel().getSelection()[0]));
                p.record.beginEdit();
                p.record.set(p.valuedata);
                p.record.endEdit();
            } else if (p.statefrom == 'update' && p.stateselect == 'update') {                
                p.record.beginEdit();
                p.record.set(p.valuedata);
                p.record.endEdit();
                p.stateselect = '';
            }

            p.store.commitChanges();
            p.store.clearFilter(true);
            
            p.store.filter('journal_id_sub', me.pcounterjournal);
            p.store.filter('journaldetail_id_sub', pa.journaldetail_id);
            p.store.filter('deleted', false);

            p.amount_acc = p.store.sum('amount_sub');

            if (p.statefromaj !== 'hide') {
                me.setValueFAJ(me, 'amount_acc', Ext.util.Format.number(p.amount_acc, '0,000.00'));
            } else {
                pa.valuedata = {"amount_acc": Ext.util.Format.number(p.amount_acc, '0,000.00')}
                pa.store = me.getAccountJournalGrid().getStore();
                pa.grid = me.getAccountJournalGrid();
                pa.record = pa.grid.getSelectionModel().getSelection()[0];
                pa.record.beginEdit();
                pa.record.set(pa.valuedata);
                pa.record.endEdit();
                pa.store.commitChanges();

                me.setSum();
               
                p.store.clearFilter();
                pa.grid.getSelectionModel().select(pa.record, true, false);
                 //select account after update saj
                me.gridAccountJournalSelect();
            }

            sessionStorage.setItem("keterangan_sub", p.valuedata.keterangan_sub);

            me.getFormdatasubaccount().up('window').close();
        }

    },
       
    dataSaveMSAJ: function () {
        var me, p, pa = '';
        me = this;
        p = me.pmsaj;
        pa = me.paj;

        p.statefrom = me.getFormdatamultisubaccount().up('window').state.toLowerCase();
        p.form = me.getFormdatamultisubaccount().getForm();

        if (p.form.isValid()) {
            me.getFormdatamultisubaccount().setLoading('Please Wait...');
            p.store = me.getSubAccountGrid().getStore();
            p.valuedata = p.form.getValues();
            p.kelsub_id = p.valuedata.kelsub_id_multi_sub;
            p.from = p.valuedata.kelsub_id_sub_from_multi;
            p.until = p.valuedata.kelsub_id_sub_until_multi;
            p.keterangan = p.valuedata.keterangan_sub_multi;
            p.amount = p.valuedata.amount_sub_multi;


            p.storesa = me.getStore('Subaccountcode');//get store
            p.storesa.load({
                params: {
                    "hideparam": 'filterdata',
                    "kelsub_id": p.kelsub_id,
                    "from": p.from,
                    "until": p.until,
                    "start": 0,
                    "limit": 10000,
                },
                callback: function (records, operation, success) {
                    p.storesa.sort('subgl_id', 'ASC');
                    var i = 0
                    p.storesa.each(function (record) {
                        i++;
                        p.valuedata = {
                            "journal_id_sub": me.pcounterjournal,
                            "journaldetail_id_sub": pa.journaldetail_id,
                            "journalsubdetail_id_sub": i,
                            "kelsub_id_sub": record.get('kelsub_id'),
                            "kelsub_sub": record.get('accountgroup'),
                            "subgl_id_sub": record.get('subgl_id'),
                            "code_sub": record.get('code'),
                            "code1_sub": record.get('code1'),
                            "code2_sub": record.get('code2'),
                            "code3_sub": record.get('subdsk3'),
                            "code4_sub": record.get('subdsk4'),
                            "keterangan_sub": p.keterangan,
                            "amount_sub": p.amount
                        };

                        p.store.add(p.valuedata);
                        p.store.commitChanges();


                        p.store.clearFilter(true);

                        p.store.filter('journal_id_sub', me.pcounterjournal);
                        p.store.filter('journaldetail_id_sub', pa.journaldetail_id);
                        p.store.filter('deleted', false);
                        p.amount_acc = p.store.sum('amount_sub');

                        if (p.statefromaj !== 'hide') {
                            me.setValueFAJ(me, 'amount_acc', Ext.util.Format.number(p.amount_acc, '0,000.00'));
                        } else {
                            pa.valuedata = {"amount_acc": Ext.util.Format.number(p.amount_acc, '0,000.00')}
                            pa.store = me.getAccountJournalGrid().getStore();
                            pa.grid = me.getAccountJournalGrid();
                            pa.record = pa.grid.getSelectionModel().getSelection()[0];
                            pa.record.beginEdit();
                            pa.record.set(pa.valuedata);
                            pa.record.endEdit();
                            pa.store.commitChanges();
                            me.setSum();
                            pa.grid.getSelectionModel().select(pa.record, true, false);
                        }

                    });
                }
            });
            me.getFormdatamultisubaccount().setLoading(false);
            me.getFormdatamultisubaccount().up('window').close();

        }
    },
    GenerateVoucher: function (prefix_id,flagdocument) {
        var me, p = '';
        me = this;
        p = me.pglobal;

        //get date from the formdata
        var docdate = me.formatDate(me.getFormdata().down("[name=voucher_date]").getValue());

        Ext.Ajax.request({
            url: 'gl/journal/create',
            method: 'POST',
            params: {
                data: Ext.encode({
                    "prefix_id": prefix_id,
                    "docdate": docdate,
                    "flagdocument": flagdocument,
                    "hideparam": 'generatevoucher',
                })
            },
            success: function (response) {

                if(response.responseText.includes("Belum ada")){
                    alert(response.responseText);
                    return false;
                }

                p.info = Ext.JSON.decode(response.responseText);
                p.cluster = p.info.data;
                p.clusterdata = p.cluster.split("#");

                me.setValue(me, 'no_generate', p.clusterdata[0]);
                me.setValue(me, 'voucher_no', p.clusterdata[1]);
                me.setValue(me, 'generate_month', p.clusterdata[2]);

                me.voucherno = p.clusterdata[0];

                me.getFormdata().down("[name=accountjournalgrid]").setDisabled(false);
                me.getFormdata().down("[name=subaccountjournalgrid]").setDisabled(false);

            },
            failure: function (response) {
            }
        });

    },
    AutoValAccountJournal: function (coa_id) {
        var me, p, psa, pmsa = '';

        me = this;
        p = me.pglobal;
        psa = me.psaj;
        pmsa = me.pmsaj;

        me = this;
        Ext.Ajax.request({
            url: 'gl/journal/create',
            method: 'POST',
            params: {
                data: Ext.encode({
                    "coa_id": coa_id,
                    "hideparam": 'autovalaccountjournal',
                })
            },
            success: function (response) {
                p.info = Ext.JSON.decode(response.responseText);
                p.cluster = p.info.data;
                p.clusterdata = p.cluster.split("|");
                p.type = p.clusterdata[5];

                me.setValueFAJ(me, 'coa_id_acc', p.clusterdata[1]);
                me.setValueFAJ(me, 'kelsub_id_acc', p.clusterdata[2]);
                me.setValueFAJ(me, 'kelsub_acc', p.clusterdata[3]);
                me.setValueFAJ(me, 'name_acc', p.clusterdata[4]);

                if(p.clusterdata[3]!==""){
                    me.FormSubAccountShow('create');
                }

                psa.kelsub_id = p.clusterdata[2];
                pmsa.kelsub_id = p.clusterdata[2];

                if (p.type == 'D') {
                    me.setValueFAJRadio(me, '#radio1_acc');
                } else if (p.type == 'C') {
                    me.setValueFAJRadio(me, '#radio2_acc');
                }

                if (p.clusterdata[3] !== '') {
                    me.getFormdataaccountjournal().down("[name=subaccountjournalgrid_ac]").setVisible(true);
                    me.getFormdataaccountjournal().down("[name=amount_acc]").setReadOnly(true);
                } else {
                    me.getFormdataaccountjournal().down("[name=subaccountjournalgrid_ac]").setVisible(false);
                    me.getFormdataaccountjournal().down("[name=amount_acc]").setReadOnly(false);
                }

            },
            failure: function (response) {
            }
        });

    },
    formDataShow: function (el, act, action) {
        var me = this;
        var formtitle, formicon;

        var gfp = me.getFormProperties(action);
        var state = gfp.state;
        formtitle = gfp.formtitle;
        formicon = gfp.formicon;

        var winId = 'win-holidayformdata';
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: me.formWidth,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                state: state,
                listeners: {
                    boxready: function () {
                        win.body.mask('Loading...');
                        var tm = setTimeout(function () {
                            win.add(Ext.create('Gl.view.' + me.controllerName + '.FormData'));
                            win.center();
                            win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);

                        setInterval(function () {
                            //function in here, will execute every 1 second

                            //function generate voucher in background
                            if (me.pstatefromjournal == 'create') {
                                if (me.pjvalue !== '') {
                                    //me.GenerateVoucher(me.pjvalue);
                                }
                            }
                        }, 1000);
                    },
                }

            });
        }
        win.show();
    },
    FormAccountJournalShow: function (action) {
        var me, p, psa, pmsa = '';
        me = this;
        p = me.pglobal;
        psa = me.psaj;
        pmsa = me.pmsaj;

        p.formtitle = '';
        p.formicon = '';
        p.formproperties = me.getFormProperties(action);
        p.state = p.formproperties.state;
        p.formtitle = p.formproperties.formtitle;
        p.formicon = p.formproperties.formicon;
        p.winid = 'win-accountjournalformdata';
        p.win = desktop.getWindow(p.winid);

        if (!p.win) {
            p.win = desktop.createWindow({
                id: p.winid,
                name: p.winid,
                title: p.formtitle,
                iconCls: p.formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: 800,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                state: p.state,
                listeners: {
                    boxready: function () {
                        p.win.body.mask('Loading...');
                        var tm = setTimeout(function () {
                            p.win.add(Ext.create('Gl.view.journal.FormDataAccountJournal'));
                            p.win.center();
                            p.win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);
                    },
                    hide: function () {
                        //console.log('hide account journal');
                        psa.statefromaj = 'hide';
                        pmsa.statefromaj = 'hide';
                    }
                }

            });
        }
        p.win.show();
    },
    FormUploadJournalShow: function (action) {
        var me, p, psa, pmsa = '';
        me = this;
        p = me.pglobal;
        psa = me.psaj;
        pmsa = me.pmsaj;

        p.formtitle = '';
        p.formicon = '';
        p.formproperties = me.getFormProperties(action);
        p.state = p.formproperties.state;
        p.formtitle = p.formproperties.formtitle;
        p.formicon = p.formproperties.formicon;
        p.winid = 'win-accountjournalformdata';
        p.win = desktop.getWindow(p.winid);

        if (!p.win) {
            p.win = desktop.createWindow({
                id: p.winid,
                name: p.winid,
                title: p.formtitle,
                iconCls: p.formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: 400,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                state: p.state,
                listeners: {
                    boxready: function () {
                        p.win.body.mask('Loading...');
                        var tm = setTimeout(function () {
                            p.win.add(Ext.create('Gl.view.journal.FormDataUploadJournal'));
                            p.win.center();
                            p.win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);
                    },
                    hide: function () {
                        //console.log('hide account journal');
                        psa.statefromaj = 'hide';
                        pmsa.statefromaj = 'hide';
                    }
                }

            });
        }
        p.win.show();
    },
    FormSubAccountShow: function (action) {
        var me, p = '';
        me = this;
        p = me.pglobal;

        p.formtitle = '';
        p.formicon = '';
        p.formproperties = me.getFormProperties(action);
        p.state = p.formproperties.state;
        p.formtitle = p.formproperties.formtitle;
        p.formicon = p.formproperties.formicon;
        p.winid = 'win-subaccountjournalformdata';
        p.win = desktop.getWindow(p.winid);

        if (!p.win) {
            p.win = desktop.createWindow({
                id: p.winid,
                title: p.formtitle,
                iconCls: p.formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: 600,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                state: p.state,
                listeners: {
                    boxready: function () {
                        p.win.body.mask('Loading...');
                        var tm = setTimeout(function () {
                            p.win.add(Ext.create('Gl.view.journal.FormDataSubAccount'));
                            p.win.center();
                            p.win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);

                    },
                    close: function () {
                        console.log('close sub account');
                    }
                }

            });
        }
        p.win.show();
    },
    FormMultiSubAccountShow: function (action) {
        var me, p = '';
        me = this;
        p = me.pglobal;

        p.formtitle = '';
        p.formicon = '';
        p.formproperties = me.getFormProperties(action);
        p.state = p.formproperties.state;
        p.formtitle = p.formproperties.formtitle;
        p.formicon = p.formproperties.formicon;
        p.winid = 'win-multisubaccountjournalformdata';
        p.win = desktop.getWindow(p.winid);

        if (!p.win) {
            p.win = desktop.createWindow({
                id: p.winid,
                title: p.formtitle,
                iconCls: p.formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: 600,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                state: p.state,
                listeners: {
                    boxready: function () {
                        p.win.body.mask('Loading...');
                        var tm = setTimeout(function () {
                            p.win.add(Ext.create('Gl.view.journal.FormDataMultiSubAccount'));
                            p.win.center();
                            p.win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);

                    }
                }

            });
        }
        p.win.show();
    },
    NewRowSubJournal: function(){
        var me = this;
        var store = me.getSubAccountGrid().getStore();

        //gridaj = me.getAccountJournalGrid();
        //storeaj = gridaj.getStore();
        //rec = storeaj.getAt(storeaj.indexOf(gridaj.getSelectionModel().getSelection()[0]));

        storeaj = me.getAccountJournalGrid().getStore();
        gridaj = me.getAccountJournalGrid();
        recaj = gridaj.getSelectionModel().getSelection()[0];
        
        //loadst
        var sme, pg, sp, spa = '';
        sme = this;
        spa = sme.paj;
        sp = sme.psaj;
        pg = sme.pgrid;

        if (sp.kelsub_id < 1) {
            sp.kelsub_id = sme.getValueFAJ(sme, 'kelsub_id_acc', 'value');
        }

        valuedata = {
            journaldetail_id_sub: recaj.data.journaldetail_id_acc,
            subgl_id_sub: '',
            code_sub: '',
            code1_sub: '',
            code2_sub: '',
            code3_sub: '',
            code4_sub: '',
            keterangan_sub: '',
            amount_sub: '',
            hideparam: 'default',
            kelsub_id_sub: recaj.data.kelsub_id_acc,
            journalsubdetail_id_sub: me.pcountersubjournal
        };
        
        me.pcountersubjournal = me.pcountersubjournal+1;

        store.add(valuedata);
        //me.pcounterjournal = me.pcounterjournal++;
        me.getSubAccountGrid().getView().refresh();
        
        sp.storesa = sme.getStore('Subaccountcode');//get store
        sp.storesa.load({
            params: {
                "hideparam": 'default',
                "start": 0,
                "limit": 100000,
            },
            callback: function (records, operation, success) {
                sp.storesa.clearFilter(true);
                sp.storesa.filter('kelsub_id', recaj.data.kelsub_id_acc);
                //sort data store
                sp.storesa.sort('subgl_id', 'ASC');
            }
        });


        var g = sme.getSubAccountGrid();
        var store = g.getStore();

        g.on({
            scope: this,
            edit: function (roweditor, event) {
                var rec = event.record;
                var subgl_id = rec.get("subgl_id_sub");
                var subgl_id = rec.get("code_sub");

                //tarik value dropdown ke grid

                    sp.storesa.each(function (record) {

                     if(record.get('subgl_id').toString()==subgl_id.toString()){
                        console.log('ada');
                        //rec = store.getAt(store.indexOf(g.getSelectionModel().getSelection()[0]));
                        rec.data.subgl_id_sub = subgl_id;
                        rec.data.code_sub = record.get('code');
                        rec.data.code1_sub = record.get('code1');
                        rec.data.code2_sub = record.get('code2') || '' ;
                        rec.data.code3_sub = record.get('code3') || '';
                        rec.data.code4_sub = record.get('code4') || '';
                        g.getView().refresh();
                        sme.setSum();
                     }
                });
                sme.getFormdataaccountjournal().down("[name=amount_acc]").setValue(store.sum('amount_sub'));
                //console.log(event.record);
            },
            beforeedit: function (a, b) {
            }
        });

    },
    NewRowJournal: function(){
        var me = this;
        var store = me.getAccountJournalGrid().getStore();

        store.sort('journaldetail_id_acc', 'ASC');
        //me.pcounterjournalnew = store.getCount();

        if (store.getCount() > 0)
        {
          var maxId = store.getAt(0).get('journaldetail_id_acc'); // initialise to the first record's id value.
          store.each(function(rec) // go through all the records
          {
            maxId = Math.max(maxId, rec.get('journaldetail_id_acc'));
          });
         me.pcounterjournalnew = maxId+1;
        }

    
        var valuedata = {
            state_acc: 'default',
            journal_id_acc: me.pcounterjournal,
            journaldetail_id_acc: me.pcounterjournalnew,
            coa_id_acc: '',
            coa_acc: '',               
            name_acc: '',
            type_acc: '',
            kelsub_id_acc: '',
            kelsub_acc: '',
            amount_acc: 0,
            keterangan_acc: ''
        }
        store.add(valuedata);
        me.getAccountJournalGrid().getView().refresh();
        me.pcounterjournalnew = me.pcounterjournalnew+1;
    },
    UploadJournal: function(){
        var form = this.getFormdatauploadjournal();
        var me = this;
        if(true){
            form.submit({
                url: 'gl/journal/upload',
                waitMsg: 'Processing data...',
                success: function(fp, o) {
                    var dt = o.result.data;
                    me.uploadAJ(dt[0], dt[1]);
                    form.up('window').close();
                },
                failure: function(fp, o) {
                    Ext.Msg.alert('Warning', 'Processing failed !');
                }
            });
        }
    },
    Exportaccount: function(){
        var me = this;
        var store = me.getAccountJournalGrid().getStore();
        var storesub = me.getSubAccountGrid().getStore();
        var form = me.getFormdata();
        var valuedata = [];
        var i = 0;

        store.each(function (record) {
            i++;
            values = {
                journal_id_acc: i,
                journaldetail_id_acc: record.get('journaldetail_id_acc'),
                coa_id_acc: record.get('coa_id_acc'),
                coa_acc: record.get('coa_acc'),             
                name_acc: record.get('name_acc'), 
                type_acc: record.get('type_acc'), 
                kelsub_id_acc: record.get('kelsub_id_acc'),
                kelsub_acc: record.get('kelsub_acc'),
                amount_acc: record.get('amount_acc'),
                keterangan_acc: record.get('keterangan_acc'),
                kelsub_sub: '',
                subgl_id_sub: '',
                code_sub: '',
                code1_sub: '',
                code2_sub: '',
                code3_sub: '',
                code4_sub: '',
                keterangan_sub: '',
                amount_sub: ''
            };

            valuedata.push(values);

            storesub.each(function (records) {

                var kelsub_id_acc = record.get('kelsub_id_acc');
                var kelsub_id_sub = records.get('kelsub_id_sub');

                if(kelsub_id_acc==kelsub_id_sub){
                     valuessub = {
                            journal_id_acc: '',
                            journaldetail_id_acc: '',
                            coa_id_acc: '',
                            coa_acc: '',             
                            name_acc: '', 
                            type_acc: '', 
                            kelsub_id_acc: '',
                            kelsub_acc: records.get('kelsub_sub'),
                            amount_acc: '',
                            keterangan_acc: '',
                            kelsub_sub: records.get('kelsub_sub'),
                            subgl_id_sub: records.get('subgl_id_sub'),
                            code_sub: records.get('code_sub'),
                            code1_sub: records.get('code1_sub'),
                            code2_sub: records.get('code2_sub'),
                            code3_sub: records.get('code3_sub'),
                            code4_sub: records.get('code4_sub'),
                            keterangan_sub: records.get('keterangan_sub'),
                            amount_sub: records.get('amount_sub')
                        };
                     valuedata.push(valuessub);
                }

            });

        });

        csvData = valuedata;

        var title = form.down("[name=no_generate]").getValue();
        title.replace(/\//g, "")
        me.downloadCSV({ filename: title+".csv" }, csvData);
    },
    getValueFAJ: function (controller, selector, type) {
        var result = '';
        //if type value then get value from item
        if (type == 'value') {
            result = controller.getFormdataaccountjournal().down("[name=" + selector + "]").getValue();
        } else if (type == 'raw') {
            result = controller.getFormdataaccountjournal().down("[name=" + selector + "]").getRawValue();
        }
        return  result;

    },
    getValueFSAJ: function (controller, selector, type) {
        var result = '';
        if (type == 'value') {
            result = controller.getFormdatasubaccount().down("[name=" + selector + "]").getValue();
        } else if (type == 'raw') {
            result = controller.getFormdatasubaccount().down("[name=" + selector + "]").getRawValue();
        }
        return  result;

    },
    getValueMSAJ: function (controller, selector, type) {
        var result = '';
        if (type == 'value') {
            result = controller.getFormdatamultisubaccount().down("[name=" + selector + "]").getValue();
        } else if (type == 'raw') {
            result = controller.getFormdatamultisubaccount().down("[name=" + selector + "]").getRawValue();
        }
        return  result;

    },
    setValueFAJ: function (controller, selector, value) {
        controller.getFormdataaccountjournal().down("[name=" + selector + "]").setValue(value);
    },
    setValueFSAJ: function (controller, selector, value) {
        controller.getFormdatasubaccount().down("[name=" + selector + "]").setValue(value);
    },
    setValueFMSAJ: function (controller, selector, value) {
        controller.getFormdatamultisubaccount().down("[name=" + selector + "]").setValue(value);
    },
    setValueFAJRadio: function (controller, selector) {
        controller.getFormdataaccountjournal().down(selector).setValue(true);

    },
    getValueFAJRadio: function (controller, selector) {
        return controller.getFormdataaccountjournal().down(selector).getValue();
    },
});