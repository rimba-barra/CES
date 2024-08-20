Ext.define('Gl.controller.Offset', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Offset',
    requires: [
        'Gl.template.ComboBoxFields',
        'Gl.library.template.combobox.Monthcombobox',
    ],
    views: [
        'offset.Panel',
        'offset.Accountcreditgrid',
        'offset.Accountdebetgrid',
        'offset.FormSearch',
        'Gl.library.template.comboboxgrid.Subaccountgroup',
        'Gl.library.template.comboboxgrid.Coagrid',
    ],
    stores: [
        'Accountdebet',
        'Accountcredit',
    ],
    models: [
        'Accountdebet',
        'Accountcredit',
    ],
    refs: [
        {
            ref: 'paneldata',
            selector: 'offsetpanel'
        },
        {
            ref: 'griddebet',
            selector: 'accountdebetgrid'
        },
        {
            ref: 'gridcredit',
            selector: 'accountcreditgrid'
        },
        {
            ref: 'formsearch',
            selector: 'offsetformsearch'
        },
    ],
    controllerName: 'Offset',
    fieldName: 'kelsub',
    bindPrefixName: 'Offset',
    urlrequest: null, senddata: null, info: null, form: null, html: null, winId: 'myReportWindow', report: 'Offset',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    project_id: null, project_name: null, pt_id: null, pt_name: null, userprint: null, paramsStr: null, win: null, params: null, dateNow: new Date(),
    setrowcoa: null, kelsubfilter: null, setrowdebet: null, setrowcredit: null, indexdebet: null, indexcredit: null,
    arraydebet: null, arraycredit: null,
    init: function (application) {
        var me = this;
        this.control({
            'offsetpanel': {
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(460);
              },
            },
            'offsetformsearch ': {
                afterrender: this.FormsearchAfterrender,
            },
            'accountdebetgrid': {
                cellclick: function (view, cell, cellIndex, record, row, rowIndex, e) {
                    me.setrowdebet = record['data'];
                    me.indexdebet = rowIndex;
                },
            },
            'accountcreditgrid': {
                cellclick: function (view, cell, cellIndex, record, row, rowIndex, e) {
                    me.setrowcredit = record['data'];
                    me.indexcredit = rowIndex;
                },
            },
            'offsetformsearch [name=kelsubfilter] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                    value = me.getFormsearch().down("[name=kelsubfilter]").getRawValue();
                    this.autocompletekelsubcombo(value);
                },
            },
            'offsetformsearch [name=coafilter] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                    value = me.getFormsearch().down("[name=coafilter]").getRawValue();
                    this.autocompletecoacombo(value);
                },
            },
            'subaccountgroupdatagrid ': {
                'collapse': function () {
                    var row;
                    row = me.getFormsearch().down("[name=kelsubfilter]").rowdata;
                    me.getFormsearch().down("[name=kelsubdesc]").setValue(row.description);
                    me.kelsubfilter = row.kelsub;
                    me.Selectedkelsub();
                },
            },
            'coadatacombogrid ': {
                'collapse': function () {
                    var row;
                    row = me.getFormsearch().down("[name=coafilter]").rowdata;
                    //console.log(row);
                    if (row != null) {
                        me.setrowcoa = row;
                        me.getFormsearch().down("[name=coaname]").setValue(row.name);
                    } else {
                        me.setrowcoa = 0;
                        me.getFormsearch().down("[name=coaname]").setValue('');
                    }
                },
            },
            'offsetpanel button[action=draggriddebet]': {
                click: function () {
                    me.Dragcoatogriddebet();
                },
            },
            'offsetpanel button[action=draggridcredit]': {
                click: function () {
                    me.Dragcoatogridcredit();
                }
            },
            'offsetpanel button[action=dragdebettocombo]': {
                click: function () {
                    me.Dragdebettocombo();
                }
            },
            'offsetpanel button[action=dragcredittocombo]': {
                click: function () {
                    me.Dragcredittocombo();
                }
            },
            'offsetpanel button[action=draggriddebet_togridcredit]': {
                click: function () {
                    me.Draggriddebet_togridcredit();
                }
            },
            'offsetpanel button[action=draggridcredit_togriddebet]': {
                click: function () {
                    me.Draggridcredit_togriddebet();
                }
            },
            'offsetpanel button[action=process]': {
                click: function () {
                    me.Processdata();
                }
            },
            'offsetpanel button[action=cancel]': {
                click: function (panel) {
                    panel.up('window').close();
                }
            },
        });
    },
    Processdata: function () {
        var me;
        me = this;
        Ext.getBody().mask("Please wait...");
        me.Createdata();
        me.urlrequest = 'gl/offset/create';
        me.AjaxRequest();
    },
    Createdata: function () {
        var me, storedebet, storecredit, month;
        me = this;
        month = me.getFormsearch().down("[name=monthdata]").getValue();

        storedebet = me.getStore('Accountdebet');
        me.arraydebet = [];
        storedebet.each(function (record) {
            me.arraydebet.push(record.get("coa_debet"));
        });

        storecredit = me.getStore('Accountcredit');
        me.arraycredit = [];
        storecredit.each(function (record) {
            me.arraycredit.push(record.get("coa_credit"));
        });
        //var coadebet = me.arraydebet.join(',');
        //var coacredit = me.arraycredit.join(',');
        me.senddata = {
            "hideparam": 'generatereport',
            "month": month,
            "datadebet": me.arraydebet,
            "datacredit": me.arraycredit
        }

    },
    Dragdebettocombo: function () {
        var me, store, storedebet, row;
        me = this;
        row = me.setrowdebet;
        store = me.getStore('Coacombo');
        storedebet = me.getStore('Accountdebet');
        store.add({
            coa_id: row.coa_id_debet,
            kelsub_id: row.kelsub_id_debet,
            coa: row.coa_debet,
            name: row.name_debet,
            kelsub: row.kelsub_debet,
            type: row.type_debet
        });
        storedebet.removeAt(me.indexdebet);
        me.Destroycoacombo();

    },
    Dragcredittocombo: function () {
        var me, store, storecredit, row;
        me = this;
        row = me.setrowcredit;
        store = me.getStore('Coacombo');
        storecredit = me.getStore('Accountcredit');
        store.add({
            coa_id: row.coa_id_credit,
            kelsub_id: row.kelsub_id_credit,
            coa: row.coa_credit,
            name: row.name_credit,
            kelsub: row.kelsub_credit,
            type: row.type_credit
        });
        storecredit.removeAt(me.indexcredit);
        me.Destroycoacombo();

    },
    Draggriddebet_togridcredit: function () {
        var me, store, storecoa, counter, row;
        me = this;
        row = me.setrowdebet;
        store = me.getStore('Accountcredit');
        counter = store.getCount();
        if (counter > 3) {
            me.buildWarningAlert('Grid Credit maximal contain 4 row');
        } else {
            store.add({
                coa_id_credit: row.coa_id_debet,
                kelsub_id_credit: row.kelsub_id,
                coa_credit: row.coa_debet,
                name_credit: row.name_debet,
                kelsub_credit: row.kelsub_debet,
                type_credit: row.type_debet
            });
            me.Destroygriddebet();

        }

    },
    Draggridcredit_togriddebet: function () {
        var me, store, storecoa, row, counter;
        me = this;
        row = me.setrowcredit;
        store = me.getStore('Accountdebet');
        counter = store.getCount();
        if (counter > 3) {
            me.buildWarningAlert('Grid Debet maximal contain 4 row');
        } else {
            store.add({
                coa_id_debet: row.coa_id_credit,
                kelsub_id_debet: row.kelsub_id_credit,
                coa_debet: row.coa_credit,
                name_debet: row.name_credit,
                kelsub_debet: row.kelsub_credit,
                type_debet: row.type_credit
            });
            me.Destroygridcredit();
        }

    },
    Dragcoatogriddebet: function () {
        var me, store, storecoa, row, coa, counter;
        me = this;
        if (me.setrowcoa != '0') {
            row = me.setrowcoa;
            store = me.getStore('Accountdebet');
            counter = store.getCount();
            if (counter > 3) {
                me.buildWarningAlert('Grid Debet maximal contain 4 row');
            } else {
                store.add({
                    coa_id_debet: row.coa_id,
                    kelsub_id_debet: row.kelsub_id,
                    coa_debet: row.coa,
                    name_debet: row.name,
                    kelsub_debet: row.kelsub,
                    type_debet: row.type
                });
                me.Destroycoacombo();
                me.Reloadcoacombo();
            }

        } else {
            me.buildWarningAlert('Sorry Coa Code is empty...!');
        }

    },
    Dragcoatogridcredit: function () {
        var me, store, storecoa, row, coa, counter;
        me = this;
        if (me.setrowcoa != '0') {
            row = me.setrowcoa;
            store = me.getStore('Accountcredit');
            counter = store.getCount();
            if (counter > 3) {
                me.buildWarningAlert('Grid Credit maximal contain 4 row');
            } else {
                store.add({
                    coa_id_credit: row.coa_id,
                    kelsub_id_credit: row.kelsub_id,
                    coa_credit: row.coa,
                    name_credit: row.name,
                    kelsub_credit: row.kelsub,
                    type_credit: row.type,
                });
                me.Destroycoacombo();
                me.Reloadcoacombo();
            }
        } else {
             me.buildWarningAlert('Sorry Coa Code is empty..!');
        }

    },
    autocompletecoacombo: function (value) {
        var me, store, value;
        me = this;
        store = me.getStore('Coacombo');
        store.clearFilter();
        store.filter('coa', value);
    },
    autocompletekelsubcombo: function (value) {
        var me, store, value, form;
        me = this;
        store = me.getStore('Subaccountgroup');
        store.clearFilter();
        store.filter('kelsub', value);
    },
    Selectedkelsub: function () {
        var me, store, form;
        me = this;
        form = me.getFormsearch();
        form.down("[name=coafilter]").setValue('');
        form.down("[name=coafilter]").setRawValue('');
        form.down("[name=coaname]").setValue('');
        store = me.getStore('Coacombo');
        store.load({
            params: {
                "hideparam": 'coabykelsub',
                "kelsub": me.kelsubfilter,
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {
                store.sort('coa', 'ASC');
                if (records[0]) {
                    var firstdata = records[0]['data'];
                    me.setrowcoa = firstdata;
                    form.down("[name=coafilter]").setValue(firstdata.coa_id);
                    form.down("[name=coafilter]").setRawValue(firstdata.coa);
                    form.down("[name=coaname]").setValue(firstdata.name);
                }
            }
        });

        var storedebet = me.getStore('Accountdebet');
        var storecredit = me.getStore('Accountcredit');
        storedebet.removeAll();
        storecredit.removeAll();

    },
    Destroycoacombo: function () {
        var me, storedebet, storecredit, storecoa;
        me = this;
        storedebet = me.getStore('Accountdebet');
        storecredit = me.getStore('Accountcredit');
        storecoa = me.getStore('Coacombo');

        storedebet.each(function (record) {
            storecoa.clearFilter(true);
            storecoa.filter('coa', record.get("coa_debet"));
            storecoa.removeAt(0);

        });
        storecredit.each(function (record) {
            storecoa.clearFilter(true);
            storecoa.filter('coa', record.get("coa_credit"));
            storecoa.removeAt(0);
        });
        storecoa.clearFilter();
        me.Reloadcoacombo();
    },
    Destroygriddebet: function () {
        var me, storedebet, storecredit;
        me = this;
        storedebet = me.getStore('Accountdebet');
        storecredit = me.getStore('Accountcredit');

        storecredit.each(function (record) {
            storedebet.clearFilter(true);
            storedebet.filter('coa_debet', record.get("coa_credit"));
            storedebet.removeAt(0);
        });
        storedebet.clearFilter();
    },
    Destroygridcredit: function () {
        var me, storedebet, storecredit;
        me = this;
        storedebet = me.getStore('Accountdebet');
        storecredit = me.getStore('Accountcredit');

        storedebet.each(function (record) {
            storecredit.clearFilter(true);
            storecredit.filter('coa_credit', record.get("coa_debet"));
            storecredit.removeAt(0);
        });
        storecredit.clearFilter();
    },
    Reloadcoacombo: function () {
        var me, store, form, row, counter;
        me = this;
        form = me.getFormsearch();
        form.down("[name=coafilter]").setValue('');
        form.down("[name=coafilter]").setRawValue('');
        form.down("[name=coaname]").setValue('');
        store = me.getStore('Coacombo');
        counter = store.getCount();

        if (counter < 1) {
            form.down("[name=coafilter]").setValue('');
            form.down("[name=coafilter]").setRawValue('');
            form.down("[name=coafilter]").rowdata = null;
            form.down("[name=coaname]").setValue('');
            me.setrowcoa = 0;
        } else {
            row = store.getAt(0)['data'];
            form.down("[name=coafilter]").setValue(row.coa_id);
            form.down("[name=coafilter]").setRawValue(row.coa);
            form.down("[name=coafilter]").rowdata = row;
            form.down("[name=coaname]").setValue(row.name);
            me.setrowcoa = row;

        }
    },
    FormsearchAfterrender: function () {
        var me, storecoa, storekelsub;
        me = this;
        me.panelAfterRender();

        storekelsub = me.getStore('Subaccountgroup');
        storekelsub.load({
            params: {
                "hideparam": 'default',
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {
                storekelsub.sort('kelsub', 'ASC');
                var form = me.getFormsearch();
                if (records[0]) {
                    var firstdata = records[0]['data'];
                    form.down("[name=kelsubfilter]").setValue(firstdata.kelsub_id);
                    form.down("[name=kelsubfilter]").setRawValue(firstdata.kelsub);
                    form.down("[name=kelsubdesc]").setRawValue(firstdata.description);
                    form.down("[name=monthdata]").setValue(me.dateNow.getMonth() + 1);
                    me.kelsubfilter = firstdata.kelsub;
                    me.Selectedkelsub();
                }
            }
        });
    },
    Reportdata: function () {
        var me;
        me = this;
        me.createWindows();
        me.arrayData();
        me.submitReport();
    },
    
      arrayData: function () {
        var me;
        me = this;               
        me.value["project_name"] = me.project_name;
        me.value["pt_name"] = me.pt_name;
        me.value["userprint"] = me.userprint;
        me.value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
        me.value["time_sekarang"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
       
    },
    createWindows: function () {
        var me = this;
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function () {
        var me = this;             
       // console.log(me.value);
        //console.log(me.report);
        me.html = me.generateFakeForm(me.value, me.report);
        me.win.down("#MyReportPanel").body.setHTML(me.html);
        $("#fakeReportFormID").submit();
        Ext.getBody().unmask();
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

        } else if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
        } else if (me.info.parameter == 'generatereport') {
            Ext.getBody().unmask();
            me.value = me.info.data;
            me.Reportdata();
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