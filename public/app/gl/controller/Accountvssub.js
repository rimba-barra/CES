Ext.define('Gl.controller.Accountvssub', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Accountvssub',
    requires: [
        'Gl.template.ComboBoxFields',
        'Gl.library.template.combobox.Coacomboboxgrid',
        'Gl.library.template.combobox.Prefixcombobox',
        'Gl.library.template.combobox.Coagrid',
    ],
    views: [
        'accountvssub.Panel',
        'accountvssub.Grid',
        'accountvssub.AccountvsSubAccountJournalGrid',
        'accountvssub.AccountvsSubSubAccountGrid',
        'accountvssub.FormSearch',
        'accountvssub.FormData',
    ],
    stores: [
        'Accountvssub',
        'AccountvsSubJournal',
        'AccountvsSubAccountJournal',
        'AccountvsSubSubAccountJournal',
        'Coacombo',
        'Prefixcombo',
    ],
    models: [
        'Accountvssub',
        'AccountvsSubJournal',
        'AccountvsSubAccountJournal',
        'AccountvsSubSubAccountJournal',
        'Coa',
        'Kodeprefix',
    ],
    refs: [
        {
            ref: 'paneldata',
            selector: 'accountvssubpanel'
        },
        {
            ref: 'grid',
            selector: 'accountvssubgrid'
        },
        {
            ref: 'gridaccount',
            selector: 'accountvssubaccountjournalgrid'
        },
        {
            ref: 'gridsub',
            selector: 'accountvssubsubaccountgrid'
        },
        {
            ref: 'formsearch',
            selector: 'accountvssubformsearch'
        },
        {
            ref: 'formdata',
            selector: 'accountvssubformdata'
        },
    ],
    controllerName: 'accountvssub',
    fieldName: 'voucher_no',
    bindPrefixName: 'Accountvssub',
    urlrequest: null, senddata: null, info: null, form: null,
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    project_name: null, pt_name: null, userprint: null, paramsStr: null, win: null, params: null, dateNow: new Date(),
    html: null, winId: 'myReportWindow', report: null, journal_id: null,voucher_no:null,
    init: function (application) {
        var me = this;
        this.control({
            'accountvssubpanel': {
                //beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    panel.up('window').maximize();
                   
                },
            },
            'accountvssubgrid': {
                afterrender: this.gridAfterRenderCustome,
                cellclick: this.ListgridClick,
                itemdblclick: this.gridItemDblClick,
            },
            'accountvssubaccountjournalgrid': {
                select: this.gridAccountJournalSelect,
            },
            'accountvssubformsearch [name=fromcoa] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                    value = me.getFormsearch().down("[name=fromcoa]").getRawValue();
                    this.autocompletecombo(value);
                },
            },
            'accountvssubformsearch [name=untilcoa] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                    value = me.getFormsearch().down("[name=untilcoa]").getRawValue();
                    this.autocompletecombo(value);
                },
            },
            'accountvssubformsearch #radio1': {
                click:function(){
                    alert('test');
                }
            },            
            'accountvssubgrid actioncolumn [action=view]': {
                click: function () {
                    alert('test');
                }
            },
            'accountvssubgrid actioncolumn': {
                click: this.gridActionColumnClickCustome
            },
            'accountvssubgrid toolbar button[action=process]': {
                click: function () {
                    me.getDataaccountvssub();
                }
            },
            'accountvssubgrid toolbar button[action=print]': {
               click: function () {
                    me.Reportdata();
                }
            },
            'accountvssubformsearch button[action=search]': {
                click: this.dataSearch
            },
            'accountvssubformsearch button[action=reset]': {
                click: this.dataReset
            },
            'accountvssubformdata': {
                afterrender: this.formDataAfterRenderCustome,
            },            
            'accountvssubformdata button[action=save]': {
                click: this.dataSave
            },
            'accountvssubformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
    
    Reportdata: function () {
        var me;
        me = this;
        me.setupData();
       // console.log(me.value);
        Ext.getBody().mask("Please wait...");
        me.createWindows();
        me.arrayData();
        me.submitReport();
    },
    setupData:function(){
        var me,summary,value,fromdate,untildate,fdate,udate,filtersummary,filtersummarydesc;
        me = this;
        value = me.getFormsearch().getValues();
        fdate = value.fromdate.split("-");
        udate = value.untildate.split("-");
        fromdate = fdate[2]+'-'+fdate[1]+'-'+fdate[0];
        untildate = udate[2]+'-'+udate[1]+'-'+udate[0];
        
        summary = me.getGrid().down("#fdms_is_summary").getValue();
        if(summary==true){
            filtersummary = 1;
            filtersummarydesc ="With Summary";
        }else{
            filtersummary = 2;
            filtersummarydesc ="Without Summary";
        }
        
        me.value={
            "filtercoa":value.fromcoa+' to '+value.untilcoa,
            "periode":fromdate+' to '+untildate,
            "fromdate":value.fromdate,
            "untildate":value.untildate,
            "posting":value.is_post,
            "filtersummary":filtersummary,
            "filtersummarydesc":filtersummarydesc
        };
        
    },    
    arrayData: function () {
        var me;
        me = this;
               
        me.value["project_name"] = me.project_name;
        me.value["pt_name"] = me.pt_name;
        me.value["userprint"] = me.userprint;
        me.value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
        me.value["time_sekarang"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
        me.value["project_id"] = apps.project;
        me.value["pt_id"] = apps.pt;

    },
    createWindows: function () {
        var me = this;
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function () {
        var me = this;
        if(me.value.filtersummary==1){
             me.report = 'Accountvssubsummary';
        }else{
             me.report = 'Accountvssubnosummary';
        }       
        me.html = me.generateFakeForm(me.value, me.report);
        me.win.down("#MyReportPanel").body.setHTML(me.html);
        $("#fakeReportFormID").submit();
        Ext.getBody().unmask();
    },
    
    ListgridClick:function(){        
        var me, store, grid, object, row, journal_id;
        me = this;
        store = me.getGrid().getStore();
        grid = me.getGrid();
        object = grid.getSelectionModel().getSelection();
        row = object[0].data;
        
        if(row.amountheader < 1){
            me.getGrid().down("#fdms_totalheader").setValue(Ext.util.Format.number(row.amountdetail, '0,000.00'));
            me.getGrid().down("#fdms_totaldetail").setValue(Ext.util.Format.number(row.amountsubdetail, '0,000.00'));
        }else{
            me.getGrid().down("#fdms_totalheader").setValue(Ext.util.Format.number(row.amountheader, '0,000.00'));
            me.getGrid().down("#fdms_totaldetail").setValue(Ext.util.Format.number(row.amountdetail, '0,000.00'));
           
        }
              
    },
    gridActionColumnClickCustome: function (view, cell, row, col, e) {
        var me, store, grid, object, row, journal_id;
        me = this;
        store = me.getGrid().getStore();
        grid = me.getGrid();
        object = grid.getSelectionModel().getSelection();
        row = object[0].data;
        me.params = row;
        me.journal_id = row.journal_id;
        me.voucher_no = row.voucher_no;
        me.senddata = {
            "hideparam": 'searcjournal',
            "voucher_no": row.voucher_no,
            "is_post": row.is_post,
            "start": 0,
            "limit": 100,
        }
        me.urlrequest = 'gl/accountvssub/create';
        me.AjaxRequest();

    },
    execAction: function (el, action, me) {
        if (!action) {
            action = '';
        }
        if (!me) {
            me = this;
        }
        switch (action) {
            case me.bindPrefixName + 'Read':
                //me.getJournal();
//                me.senddata = {
//                    hideparam: 'getjournal',
//                    voucher_no: me.params.voucher_no,
//                }
//                me.urlrequest = 'gl/accountvssub/create';
//                me.AjaxRequest();  
                break;
        }
    },
    getFormJournal: function () {
        var me, state, width, title, locationform;
        me = this;
        state = 'view';
        width = '1000';
        title = 'Formdata Journal View';
        locationform = 'Gl.view.accountvssub.FormData';
        me.FormDataCustomeShow(state, width, title, locationform);
    },
    formDataAfterRenderCustome: function () {
        var me, year, form, date, prefix, voucherno,
                voucherdate, storejournal,storeprefix, storeaccount,
                storesub,storeprefix, fieldjournal;

        me = this;
        
        
        prefix = me.params.prefix_id;
        voucherno = me.params.voucher_no;
        voucherdate = me.params.voucher_date;
        date = voucherdate.split("-");
        year = date[0];

        
        storeaccount = me.getStore('AccountvsSubAccountJournal');
        storesub = me.getStore('AccountvsSubSubAccountJournal');
        storeaccount.clearFilter(true);
        storesub.clearFilter(true);
        
        fieldjournal = me.params;
        form = me.getFormdata();
       
        form.down("[name=prefix_id]").setValue(prefix);
        form.down("[name=no_generate]").setValue(me.voucher_no);
        form.down("[name=voucher_date]").setValue(voucherdate);
        form.down("[name=generate_month]").setValue(date[1]);
        form.down("[name=voucher_no]").setValue(fieldjournal.voucher_no);
        form.down("[name=debit_total]").setValue(Ext.util.Format.number(fieldjournal.debit_total, '0,000.00'));
        form.down("[name=credit_total]").setValue(Ext.util.Format.number(fieldjournal.credit_total, '0,000.00'));
        form.down("[name=selisih]").setValue(Ext.util.Format.number(fieldjournal.selisih, '0,000.00'));

        var girdaccount = me.getGridaccount();
        storeaccount.load({
            params: {
                "hideparam": 'changeyear',
                "dbyear": year,
                "journal_id": me.journal_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                storeaccount.sort('journaldetail_id_acc', 'ASC');
                girdaccount.getSelectionModel().select(0, true);
            }
        });

        storesub.load({
            params: {
                "hideparam": 'changeyear',
                "dbyear": year,
                "journal_id": me.journal_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                storesub.sort('journalsubdetail_id_sub', 'ASC');
            }
        });
       
    },
    gridAccountJournalSelect: function () {
        var me, grid, storeaccount, storesub, record, row = '';
        me = this;
        grid = me.getGridaccount();
        storeaccount = grid.getStore();
        row = grid.getSelectionModel().getSelection()[0];

        if (row.get('journaldetail_id_acc') > 0) {

            storesub = me.getGridsub().getStore();
            storesub.clearFilter(true);
            storesub.filter('journaldetail_id_sub', row.get('journaldetail_id_acc'));
            if (row.get('kelsub_acc') == '') {
                me.getFormdata().down("[name=subaccountjournalgrid]").setVisible(false);
            } else {
                me.getFormdata().down("[name=subaccountjournalgrid]").setVisible(true);
            }
        }
    },
    getDataaccountvssub: function () {
        var me, store, form;
        me = this;
        store = me.getStore('Accountvssub');
        form = me.getFormsearch().getValues();
        store.load({
            params: form,
            callback: function (records, operation, success) {
                  store.sort('level', 'DESC');
                  store.sort('journal_id', 'ASC');
             }
        });
    },
    defaultRange: function () {
        var me = '';
        me = this;
        me.senddata = {
            hideparam: 'defaultrange'
        }
        me.urlrequest = 'gl/dailytransaction/create';
        me.AjaxRequest();
    },
    gridAfterRenderCustome: function () {
        var me, storecoa,storeprefix, form;
        me = this;
        me.panelAfterRender();
        me.defaultRange();
        form = me.getFormsearch();        
        storecoa = me.getStore('Coacombo');
        storeprefix = me.getStore('Prefixcombo');
        storeprefix.load({
            params: {
                "hideparam": 'default',
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {
                storeprefix.sort('prefix', 'ASC');
            }
        });
        storecoa.load({
            params: {
                "hideparam": 'foraccountvssub',
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {
                var form = me.getFormsearch();

                if (records[0]) {
                    var firstdata = records[0]['data'];
                    form.down("[name=fromcoa]").setValue(firstdata.coa_id);
                    form.down("[name=fromcoa]").setRawValue(firstdata.coa);
                }

                if (records[storecoa.getCount() - 1]) {
                    var lastdata = records[storecoa.getCount() - 1]['data'];
                    form.down("[name=untilcoa]").setValue(lastdata.coa_id);
                    form.down("[name=untilcoa]").setRawValue(lastdata.coa);
                }

//                var store = me.getStore('Accountvssub');
//                var formsearch = me.getFormsearch().getValues();
//                
//                store.reload({
//                    params: formsearch
//                });


            }
        });


    },
    gridSelectionChange: function () {

    },
    autocompletecombo: function (value) {
        var me, storecoa, value;
        me = this;
        storecoa = me.getStore('Coacombo');
        storecoa.clearFilter();
        storecoa.filter('coa', value);
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
            var form = me.getFormsearch();
            me.yeardata = me.info.data.yeardb;

            form.down("[name=fromdate]").setValue(me.yeardata + '-01-01');
            form.down("[name=untildate]").setValue(me.info.data.onedate);
            form.down("[name=fromdate]").setMinValue(me.yeardata + '-01-01');
            form.down("[name=fromdate]").setMaxValue(me.info.data.enddecember);
            form.down("[name=untildate]").setMinValue(me.yeardata + '-01-01');
            form.down("[name=untildate]").setMaxValue(me.info.data.enddecember);


            var store = me.getStore('Accountvssub');
            store.load({
                params: {
                    "hideparam": 'search',
                    "fromcoa": '',
                    "untilcoa": '',
                    "fromdate": me.yeardata + '-01-01',
                    "untildate": me.info.data.onedate,
                    "is_post": 1,
                }
            });

        } else if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
        } else if (me.info.parameter == 'searcjournal') {
            me.params = me.info.data[0];
            me.getFormJournal();
        }
    },
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'gl/balancesheet/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
            },
        });
    },
});