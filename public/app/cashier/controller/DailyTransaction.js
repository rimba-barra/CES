Ext.define('Cashier.controller.Dailytransaction', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Dailytransaction',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Coacomboboxgrid',
        'Cashier.library.template.combobox.Prefixcombobox',
        'Cashier.library.template.combobox.Vouchernocombobox',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Coagrid',
        'Cashier.library.template.combobox.Journalcombobox',
    ],
    views: [
        'dailytransaction.Panel',
        'dailytransaction.FormData'
    ],
    stores: [
        'Dailytransaction',
        'Prefixcombo',
        'Coacombo',
        'Journal',
        'Ptbyuser',
        'Pt',
        'Journalcombo'
    ],
    models: [
        'Dailytransaction',
        'Kodeprefix',
        'Coa',
        'Journal',
        'Pt',
        'Coa'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'dailytransactionformdata'
        },
        {
            ref: 'paneldata',
            selector: 'dailytransactionpanel'
        }
    ],
    controllerName: 'dailytransaction',
    fieldName: '',
    bindPrefixName: 'Dailytransaction',
    urlprocess: 'cashier/dailytransaction/read',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    reportnosub: 'Dailytransactionreportnosub', reportwithsub: 'Dailytransactionreportwithsub',
    paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null,
    datajournal: null, 
    value: null, 
    datasub: null, 
    databaseon: null, 
    coa_id: 0, 
    from_prefix_id: 0, 
    until_prefix_id: 0, 
    from_prefix_raw: null, 
    until_prefix_raw: null,
    checksub: null, 
    report: null,
    project_id: null, 
    pt_id: null,
    from_journal_id: 0,
    until_journal_id:0,
    from_journal_raw: null,
    until_journal_raw: null,
    init: function (application) {
        var me = this;
        this.control({
            'dailytransactionpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(370);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(750);
                    me.panelAfterRender();
                }
            },
            'dailytransactionformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();

                },
                boxready: function() {
                    
                    var me = this;

                    $("#dailytransactionID input[name='coastart_id']").keyup(function()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/,'$1'+'.'+'$2')
                    });

                    $("#dailytransactionID input[name='coaend_id']").keyup(function()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/,'$1'+'.'+'$2')
                    });
                }
            },
            'dailytransactionformdata #datajournal': {
                change: function () {
                    me.datajournal = me.getFormdata().down("#datajournal").getChecked()[0].getGroupValue();
                    var form, storevoucher = '';
                    form = me.getFormdata();
                    if (me.datajournal == '2') {
                        // form.down("[name=dailyinputfromdate]").setDisabled(false);
                        // form.down("[name=dailyinputuntildate]").setDisabled(false);
                        // me.setValue(me, 'dailyinputfromdate', me.info.data.onedate);
                        // me.setValue(me, 'dailyinputuntildate', me.info.data.onedate);
                        storevoucher = me.getStore('Journal');
                        storevoucher.clearFilter(true);
                        storevoucher.filter('is_post', false);
                    } else {
                        // form.down("[name=dailyinputfromdate]").setDisabled(true);
                        // form.down("[name=dailyinputuntildate]").setDisabled(true);
                        // me.setValue(me, 'dailyinputfromdate', '');
                        // me.setValue(me, 'dailyinputuntildate', '');
                        storevoucher = me.getStore('Journal');
                        storevoucher.clearFilter();
                    }
                }
            },
            'dailytransactionformdata #datasubdetail': {
                change: function () {
                    me.datasub = me.getFormdata().down("#datasubdetail").getChecked()[0].getGroupValue();
                }
            },
            'dailytransactionformdata #radiobaseon1': {
                focus: function () {
                    me.databaseon = 1;
                    var form = '';
                    form = me.getFormdata();

                    if (me.datajournal == '2') {
                        form.down("[name=dailycoa_id]").setDisabled(true);
                        form.down("[name=namecoa]").setReadOnly(true);
                        form.down("[name=dailyprefix_id_from]").setDisabled(true);
                        form.down("[name=dailyprefix_id_until]").setDisabled(true);
                        form.down("[name=journal_id_from]").setDisabled(true);
                        form.down("[name=journal_id_until]").setDisabled(true);
                        // form.down("[name=dailyinputfromdate]").setDisabled(false);
                        // form.down("[name=dailyinputuntildate]").setDisabled(false);
                        // me.setValue(me, 'dailyinputfromdate', me.info.data.onedate);
                        // me.setValue(me, 'dailyinputuntildate', me.info.data.onedate);
                    } else {
                        form.down("[name=dailycoa_id]").setDisabled(true);
                        form.down("[name=namecoa]").setReadOnly(true);
                        form.down("[name=dailyprefix_id_from]").setDisabled(true);
                        form.down("[name=dailyprefix_id_until]").setDisabled(true);
                        form.down("[name=journal_id_from]").setDisabled(true);
                        form.down("[name=journal_id_until]").setDisabled(true);
                        // form.down("[name=dailyinputfromdate]").setDisabled(true);
                        // form.down("[name=dailyinputuntildate]").setDisabled(true);
                        // me.setValue(me, 'dailyinputfromdate', '');
                        // me.setValue(me, 'dailyinputuntildate', '');
                    }

                    form.down("[name=dailycoa_id]").allowBlank = true;
                    form.down("[name=namecoa]").allowBlank = true;
                    form.down("[name=dailyprefix_id_from]").allowBlank = true;
                    form.down("[name=dailyprefix_id_until]").allowBlank = true;
                    form.down("[name=journal_id_from]").allowBlank = true;
                    form.down("[name=journal_id_until]").allowBlank = true;

                    me.setValue(me, 'dailyprefix_id_from', '');
                    me.setValue(me, 'dailyprefix_id_until', '');
                    me.setValue(me, 'journal_id_from', '');
                    me.setValue(me, 'journal_id_until', '');
                    me.setValue(me, 'dailycoa_id', '');
                    me.setValue(me, 'namecoa', '');

                }
            },
            'dailytransactionformdata #radiobaseon2': {
                focus: function () {
                    var form = '';
                    me.databaseon = 2;
                    form = me.getFormdata();

                    if (me.datajournal == '2') {
                        form.down("[name=dailycoa_id]").setDisabled(false);
                        form.down("[name=namecoa]").setReadOnly(false);
                        form.down("[name=dailyprefix_id_from]").setDisabled(true);
                        form.down("[name=dailyprefix_id_until]").setDisabled(true);
                        form.down("[name=journal_id_from]").setDisabled(true);
                        form.down("[name=journal_id_until]").setDisabled(true);
                        // form.down("[name=dailyinputfromdate]").setDisabled(false);
                        // form.down("[name=dailyinputuntildate]").setDisabled(false);
                        // me.setValue(me, 'dailyinputfromdate', me.info.data.onedate);
                        // me.setValue(me, 'dailyinputuntildate', me.info.data.onedate);
                    } else {
                        form.down("[name=dailycoa_id]").setDisabled(false);
                        form.down("[name=namecoa]").setReadOnly(false);
                        form.down("[name=dailyprefix_id_from]").setDisabled(true);
                        form.down("[name=dailyprefix_id_until]").setDisabled(true);
                        form.down("[name=journal_id_from]").setDisabled(true);
                        form.down("[name=journal_id_until]").setDisabled(true);
                        // form.down("[name=dailyinputfromdate]").setDisabled(true);
                        // form.down("[name=dailyinputuntildate]").setDisabled(true);
                    }

                    form.down("[name=dailycoa_id]").allowBlank = false;
                    form.down("[name=namecoa]").allowBlank = false;
                    form.down("[name=dailyprefix_id_from]").allowBlank = true;
                    form.down("[name=dailyprefix_id_until]").allowBlank = true;
                    form.down("[name=journal_id_from]").allowBlank = true;
                    form.down("[name=journal_id_until]").allowBlank = true;

                    me.setValue(me, 'dailyprefix_id_from', '');
                    me.setValue(me, 'dailyprefix_id_until', '');
                    me.setValue(me, 'journal_id_from', '');
                    me.setValue(me, 'journal_id_until', '');
                }
            },
            'dailytransactionformdata #radiobaseon3': {
                focus: function () {
                    var form = '';
                    me.databaseon = 3;
                    form = me.getFormdata();
                    form.down("[name=dailycoa_id]").setDisabled(true);
                    form.down("[name=namecoa]").setReadOnly(true);
                    form.down("[name=dailyprefix_id_from]").setDisabled(false);
                    form.down("[name=dailyprefix_id_until]").setDisabled(false);
                    form.down("[name=journal_id_from]").setDisabled(false);
                    form.down("[name=journal_id_until]").setDisabled(false);
                    // form.down("[name=dailyinputfromdate]").setDisabled(true);
                    // form.down("[name=dailyinputuntildate]").setDisabled(true);

                    form.down("[name=dailycoa_id]").allowBlank = true;
                    form.down("[name=namecoa]").allowBlank = true;
                    form.down("[name=dailyprefix_id_from]").allowBlank = false;
                    form.down("[name=dailyprefix_id_until]").allowBlank = false;
                    form.down("[name=journal_id_from]").allowBlank = true;
                    form.down("[name=journal_id_until]").allowBlank = true;

                    // me.setValue(me, 'dailyinputfromdate', '');
                    // me.setValue(me, 'dailyinputuntildate', '');
                    me.setValue(me, 'dailyprefix_id_from', '');
                    me.setValue(me, 'dailyprefix_id_until', '');
                    me.setValue(me, 'journal_id_from', '');
                    me.setValue(me, 'journal_id_until', '');
                    me.setValue(me, 'dailycoa_id', '');
                    me.setValue(me, 'namecoa', '');

                }
            },
            'dailytransactionformdata [name=dailycoa_id]': {
                select: function () {
                    me.coa_id = this.getValue(me, "dailycoa_id", 'value');
                    this.getCOAbyID();
                }
            },
            'dailytransactionformdata [name=dailyprefix_id_from]': {
                select: function () {
                    var me, form, storevoucher = '';
                    me = this;
                    form = me.getFormdata();
                    me.from_prefix_raw = form.down("[name=dailyprefix_id_from]").getRawValue();
                    me.until_prefix_raw = me.from_prefix_raw;
                    me.from_prefix_id = me.getValue(me, "dailyprefix_id_from", 'value');
                    form.down("[name=dailyprefix_id_until]").setValue(me.from_prefix_id);
                    form.down("[name=journal_id_from]").setValue('');
                    form.down("[name=journal_id_until]").setValue('');

                    storevoucher = me.getStore('Journal');
                    storevoucher.clearFilter(true);
                    var fromdate = me.formatDate(me.getValue(me, "dailytrxfromdate", 'value'));
                    var untildate = me.formatDate(me.getValue(me, "dailytrxuntildate", 'value'));
                    storevoucher.filterBy(function (rec, id) {
                        return rec.data.voucher_date >= fromdate && rec.data.voucher_date <= untildate && rec.data.prefix_id == me.from_prefix_id;
                    });
                    this.setStoreJournalCombo();
                }
            },
            'dailytransactionformdata [name=dailyprefix_id_until]': {
                select: function () {
                    var me, form, storevoucher = '';
                    me = this;
                    form = me.getFormdata();
                    me.until_prefix_id = me.getValue(me, "dailyprefix_id_until", 'value');
                    form.down("[name=journal_id_until]").setValue('');
                    storevoucher = me.getStore('Journal');
                    storevoucher.clearFilter(true);
                    var fromdate = me.formatDate(me.getValue(me, "dailytrxfromdate", 'value'));
                    var untildate = me.formatDate(me.getValue(me, "dailytrxuntildate", 'value'));
                    storevoucher.filterBy(function (rec, id) {
                        return rec.data.voucher_date >= fromdate && rec.data.voucher_date <= untildate && rec.data.prefix_id == me.until_prefix_id;
                    });
                    this.setStoreJournalCombo();

                }
            },
             'dailytransactionformdata [name=journal_id_from]': {
                select: function () {
                    var me, form, storevoucher = '';
                    me = this;
                    form = me.getFormdata();
                    me.from_journal_raw = form.down("[name=journal_id_from]").getRawValue();
                    me.until_journal_raw = me.from_journal_raw;
                    me.from_journal_id = me.getValue(me, "journal_id_from", 'value');
                    form.down("[name=journal_id_until]").setValue(me.from_journal_id);
                   // form.down("[name=journal_id_from]").setValue('');
                    //form.down("[name=journal_id_until]").setValue('');

                    /*storevoucher = me.getStore('Journal');
                    storevoucher.clearFilter(true);
                    var fromdate = me.formatDate(me.getValue(me, "dailytrxfromdate", 'value'));
                    var untildate = me.formatDate(me.getValue(me, "dailytrxuntildate", 'value'));
                    storevoucher.filterBy(function (rec, id) {
                        return rec.data.voucher_date >= fromdate && rec.data.voucher_date <= untildate && rec.data.prefix_id == me.from_prefix_id;
                    });
                    this.setStoreJournalCombo();*/
                }
            },
            'dailytransactionformdata [name=pt_id]': {
                select: function (cb, newValue, oldValue, options) {
                   this.loadCoabypt(cb.value);
                   this.loadPrefixbypt(cb.value);
                },
                
              /* change: function (the, newValue, oldValue, eOpts) {
                   this.loadCoabypt(newValue);
                }
                */
            },
             'dailytransactionformdata [name=coastart_id]': {
                'keyup': function () {
                    var me, value;
                    me = this;
                    value = me.getFormdata().down("[name=coastart_id]").getRawValue();
                    this.autocompletecombo(value);
                    this.setStoreJournalCombo();
                },
                
                
            },
            'dailytransactionformdata [name=coaend_id]': {
                'keyup': function () {
                    var me, value;
                    me = this;
                    value = me.getFormdata().down("[name=coaend_id]").getRawValue();
                    this.autocompletecombo(value);
                    this.setStoreJournalCombo();
                },
                
                
            },
             'dailytransactionformdata [name=dailytrxfromdate]': {
                select: function () {
                    this.setStoreJournalCombo();
                }
            },
             'dailytransactionformdata [name=dailytrxuntildate]': {
                select: function () {
                    this.setStoreJournalCombo();
                }
            },
            'dailytransactionformdata button[action=submit]': {
                click: this.dataSubmit
            }
        });
    },
    dataSubmit: function () {
        var me;
        me = this;
        me.form = me.getFormdata().getForm();

        var title = 'Result ' + me.getFormdata().up('window').title;
        me.winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'YmdHis');

        me.instantWindowWithMinimize('Panel', 800, title, 'state-report', me.winId, me.controllerName);
        me.paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);

        if (me.form.isValid()) {
            if (me.win) {
                resetTimer();
                me.value = me.form.getValues();

                me.value['tanggal'] = me.value.dailytrxfromdate + ' s/d ' + me.value.dailytrxuntildate;
                me.value['paccountcode'] = me.getValue(me, "dailycoa_id", 'raw');

                me.value['baseon'] = me.databaseon;
                me.value['fromdate'] = me.value.dailytrxfromdate;
                me.value['untildate'] = me.value.dailytrxuntildate;
                me.value['coa_id'] = me.getValue(me, "dailycoa_id", 'value');
                me.value['coastart_id'] = me.getValue(me, "coastart_id", 'value');
                me.value['coaend_id'] = me.getValue(me, "coaend_id", 'value');
                me.value['fromvoucher_id'] = me.getValue(me, "journal_id_from", 'value');
                me.value['untilvoucher_id'] = me.getValue(me, "journal_id_until", 'value');
                me.value['fromprefix_raw'] = me.from_prefix_raw;
                me.value['untilprefix_raw'] = me.until_prefix_raw;

                me.value["project_name"] = me.project_name;
                me.value["pt_name"] = me.pt_name;
                me.value["userprint"] = apps.username;
                me.value["tgl_sekarang"] = Ext.Date.format(new Date(), 'd/m/Y');
                me.value["time_sekarang"] = Ext.Date.format(new Date(), 'H:i:s');
                me.value["project_id"] = me.project_id;
                me.value["pt_id"] = me.pt_id;
                var dy = new Date(me.value["fromdate"]);
                me.value["tahun"] = dy.getFullYear();

                var f = me.getFormdata();
                valueModels = f.down("[name=pt_id]").valueModels[0];
                me.value["pt_id"] = f.down("[name=pt_id]").getValue();
                me.value["project_id"] = valueModels.data.project_id;
                me.value["project_name"] = valueModels.data.projectname;
                me.value["pt_name"] = valueModels.data.ptname;

                me.value['datajurnal'] = (me.getValue(me, "journal", 'value') == '1') ? "All Data" : "Journal Not Balance";
                me.value['datajurnal_id'] = (me.getValue(me, "journal", 'value') == '1') ? 1 : 2;
                me.value['datasub'] = (me.getValue(me, "subdetail", 'value') == '1') ? "No Sub" : "With Sub";
                var basedata = '';
                switch (me.value.baseondata) {
                    case "1":
                        basedata = "Voucher Date";
                        break;
                    case "2":
                        basedata = "Account Code";
                        break;
                    case "3":
                        basedata = "Voucher Type";
                        break;
                }



                me.value['databaseon'] = basedata;

                //me.urlrequest = 'cashier/dailytransaction/create';
                //me.senddata = me.value;
                //me.AjaxRequest();
                me.checksub = me.getValue(me, "subdetail", 'value');
                if ( me.checksub ) {
                    if (me.value["no_addby"] == 1) {
                        me.report = 'dailytransactionnosubV2';
                    }else{
                        me.report = 'dailytransactionnosub';
                    }
                }else{
                    if (me.value["no_addby"] == 1) {
                        me.report = 'dailytransactionV2';
                    }else{
                        me.report = 'dailytransaction';
                    }
                }
                var html = me.ReportviewerV4(me.value, me.report, me.win.id, 1);
                me.win.down("#MyReportPanel_" + me.win.id).body.setHTML(html);
                $("#Reportform_" + me.win.id).submit();


            }


        }

    },
    defaultDisable: function () {
        var me, form = null;
        me = this;
        form = me.getFormdata();
        // form.down("[name=dailyinputfromdate]").setDisabled(true);
        // form.down("[name=dailyinputuntildate]").setDisabled(true);
        form.down("[name=dailycoa_id]").setDisabled(true);
        form.down("[name=dailyprefix_id_from]").setDisabled(true);
        form.down("[name=dailyprefix_id_until]").setDisabled(true);
        form.down("[name=journal_id_from]").setDisabled(true);
        form.down("[name=journal_id_until]").setDisabled(true);
        form.down("[name=namecoa]").setReadOnly(true);
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
    getCOAbyID: function () {
        var me = '';
        me = this;
        me.senddata = {
            hideparam: 'getcoabyid',
            coa_id: me.coa_id,
        }
        me.urlrequest = 'cashier/dailytransaction/create';
        me.AjaxRequest();

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
        var me, storecoa, storeprefix, storevoucher, storept = '';
        me = this;
        
        me.defaultRange();
        me.defaultDisable();
        
        
        storeprefix = me.getStore('Prefixcombo');
        storevoucher = me.getStore('Journal');
        storept = me.getStore('Pt');
        storept.load({
            params: {
                "hideparam": 'getptbyuserproject',
                "start": 0,
                "limit": 1000000,
                "project_id": apps.project,
                "user_id": apps.uid
            },
            callback: function (records, operation, success) {
                if (records.length > 0) {
                    if (records.length == 1) {
                        var row = records[0]['data'];
                        me.setValueCombobox(me, 'pt_id', row.pt_id,row.ptname);
                    }else{
                        storept.each(function (rec) {
                            var curr_project_id = parseInt(apps.project);
                            var curr_pt_id = parseInt(apps.pt);

                            if (rec.get('project_id') == curr_project_id && rec.get('pt_id') == curr_pt_id) {
                                me.getFormdata().down("[name=pt_id]").select(rec);
                            }
                        });
                    }
                }
            }
        });

        storecoa = me.getStore('Coacombo');
      
        storecoa.load({
            params: {
                "project_id": apps.project,
                "pt_id": apps.pt,
                "hideparam": 'coagridbyuserpt',
                "start": 0,
                "limit": 1000000,
                "pt_id_owner": apps.pt
            },
        });
        
        storevoucher.load({
            params: {
                "project_id": apps.project,
                "pt_id": apps.pt,
                "start": 0,
                "limit": 1000000,
				"module": "journal",
				"mode_read": "init"
            },
        });

        storeprefix.load({
            params: {
                "project_id": apps.project,
                "pt_id": apps.pt,
                "hideparam": 'getprefixbyprojectptall',
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {
               // storeprefix.filter('cashier', 'N');
                storeprefix.sort('prefix', 'ASC');

            }
            
        });
       

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
            me.setValue(me, 'dailytrxfromdate', me.info.data.onedate);
            me.setValue(me, 'dailytrxuntildate', me.info.data.onedate);
            me.setValue(me, 'coastart_id', '10.00.000');
            me.setValue(me, 'coaend_id', '90.00.000');
            me.yeardata = me.info.data.yeardb;
            //form.down("[name=dailytrxfromdate]").setMinValue(me.yeardata + '-01-01');
            //form.down("[name=dailytrxfromdate]").setMaxValue(me.info.data.enddecember);
            //form.down("[name=dailytrxuntildate]").setMinValue(me.yeardata + '-01-01');
            //form.down("[name=dailytrxuntildate]").setMaxValue(me.info.data.enddecember);

        } else if (me.info.parameter == 'getcoabyid') {
            me.setValue(me, 'namecoa', me.info.data[1][0].name);
        } else if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
        }
    },
    loadCoabypt: function(newValue){
        
        var me = this;
        var f = me.getFormdata();
  

        storecoa = me.getStore('Coacombo');
        storecoa.load({
            params: {
                "hideparam": 'coagridbyuserpt',
                "start": 0,
                "limit": 1000000,
                "pt_id_owner": newValue,
                "project_id": apps.project
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    me.setValueCombobox(me, 'coastart_id', row.coa_id,row.coa);
                    me.setValueCombobox(me, 'coaend_id', row.coa_id,row.coa);
                }

                 records.forEach(function(entry) {
                    var row = entry.data;
                    if(row.coa=='10.00.000'){
                        me.setValueCombobox(me, 'coastart_id', row.coa_id,row.coa);
                    }
                    if(row.coa=='90.00.000'){
                        me.setValueCombobox(me, 'coaend_id', row.coa_id,row.coa);
                    }
                });

            }
        });

    },
     loadPrefixbypt: function(newValue){
        
        var me = this;
        var f = me.getFormdata();

        storeprefix = me.getStore('Prefixcombo');
        storeprefix.load({
            params: {
                "project_id": apps.project,
                "pt_id": newValue,
                "hideparam": 'getprefixbyprojectptall',
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {
                storeprefix.sort('prefix', 'ASC');

            }
            
        });

    },
     autocompletecombo: function (value) {
        var me, storecoa, value;
        me = this;
        storecoa = me.getStore('Coacombo');
        storecoa.clearFilter();
        storecoa.filter('coa', value);
    },

    setStoreJournalCombo: function (){
         var me, storejournal = '';
        me = this;
        var formdata = me.getFormdata();
        var project_id = formdata.down('[name=pt_id]').valueModels[0].data['project_id'];
        var pt_id = formdata.down('[name=pt_id]').valueModels[0].data['pt_id'];
        var fromprefix_id = formdata.down('[name=dailyprefix_id_from]').getValue();
        var untilprefix_id = formdata.down('[name=dailyprefix_id_until]').getValue();
        var fromvoucher_date = formdata.down('[name=dailytrxfromdate]').getValue();
        var untilvoucher_date = formdata.down('[name=dailytrxuntildate]').getValue();

             storejournal = me.getStore('Journalcombo');
         storejournal.load({
            params: {
                "project_id": project_id,
                "pt_id": pt_id,
                "fromprefix_id" : fromprefix_id,
                "untilprefix_id" : untilprefix_id,
                "fromvoucher_date" : fromvoucher_date,
                "untilvoucher_date" : untilvoucher_date,
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {
               // storeprefix.filter('cashier', 'N');
                storejournal.sort('voucher_no', 'ASC');

            }
            
        });
    }

});