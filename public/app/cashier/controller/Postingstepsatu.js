Ext.define('Cashier.controller.Postingstepsatu', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Postingstepsatu',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Prefixcombobox',
        'Cashier.library.template.combobox.Prefixcashierpostingcombobox',
        'Cashier.library.template.checkbox.CheckColumnPostingstepsatu',
        'Cashier.library.template.checkbox.CheckColumnunPostingstepsatu',
    ],
    views: [
        'postingstepsatu.Panel',
        'postingstepsatu.Grid',
        'postingstepsatu.Gridposting',
        'postingstepsatu.FormSearch',
        'postingstepsatu.FormData',
    ],
    stores: [
        'Postingstepsatusource',
        'Postingstepsatudestination',
        'Ptbyuser',
        'Voucherprefixsetupcombo',
        'Prefixonglposting',
    ],
    models: [
        'Postingstepsatusource',
        'Postingstepsatudestination',
        'Postingstepsatukasbank',
        'Postingstepsatukasbankdetail',
    ],
    refs: [
        {ref: 'grid', selector: 'postingstepsatugrid'},
        {ref: 'gridposting', selector: 'postingstepsatugridposting'},
        {ref: 'formsearch', selector: 'postingstepsatuformsearch'},
        {ref: 'formdata', selector: 'postingstepsatuformdata'},
        {ref: 'checkposting', selector: 'checkcolumnpostingstepsatu'},
        {ref: 'checkunposting', selector: 'checkcolumnunpostingstepsatu'}
    ],
    controllerName: 'postingstepsatu',
    fieldName: 'postingstepsatu',
    bindPrefixName: 'Postingstepsatu',
    rowproject: null, storept: null, state: null,
    recordgridsource: null,
    recordgriddestination: null,
    urlcommon: 'cashier/common/create',
    urlrequest: 'cashier/postingstepsatu/create', senddata: null, info: null, message: null,
    voucherdate: null, notif: '',
    init: function (application) {
        var me = this;
        this.control({
            'postingstepsatupanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    this.panelAfterRender();
                    panel.up('window').maximize();
                },
            },
            'postingstepsatugrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridsource_SelectionChange
            },
            'postingstepsatugridposting': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.griddestination_SelectionChange
            },
            'postingstepsatugridposting actioncolumn': {
                click: this.gridActionColumnClickcustome
            },
            'postingstepsatugrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'postingstepsatugrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'postingstepsatugrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'postingstepsatugrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'postingstepsatugrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'postingstepsatuformsearch': {
                afterrender: function () {
                    var me, store, arrayData;
                    me = this;
                    me.setStoreFormsearch();
                }
            },
            'postingstepsatuformsearch [name=voucherprefix_id]': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form, countlength;
                    me = this;
                    form = me.getFormsearch();
                    rowdata = record[0]['data'];
                    me.setVal(form, 'prefix_id', rowdata.prefix_id);
                },
            },
            'postingstepsatuformsearch button[action=search]': {
                click: this.dataSearch
            },
            'postingstepsatuformsearch button[action=reset]': {
                click: this.dataReset
            },
            'postingstepsatuformdata': {
                afterrender: this.formDataAfterRender
            },
            'postingstepsatuformdata [name=voucher_date_gl]': {
                blur: function () {
                    var me, form, date, status;
                    me = this;
                    form = me.getFormdata();
                    date = me.getVal(form, 'voucher_date_gl', 'value');
                    status = me.checkRangedate(me.voucherdate, date);

                    if (status == 'notvalid') {
                        me.setError(form, "voucher_date_gl", true, 'range date not valid, less than transaction date');
                        me.disableBtn(form, "save", true);
                    } else {
                        me.setError(form, "voucher_date_gl", false, '');
                        me.disableBtn(form, "save", false);
                    }
                }
            },
            'postingstepsatuformdata button[action=save]': {
                click: function () {
                    me.saveforPosting();
                }
            },
            'postingstepsatuformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'postingstepsatugrid button[action=movetodestination]': {
                click: function () {
                    //alert("move to destination");
                    me.Draggridsource_togriddestination();
                }
            },
            'postingstepsatugridposting button[action=postingstepsatu]': {
                click: function () {
                    me.DataPosting();
                }
            },
            'postingstepsatugridposting button[action=cancel]': {
                click: function () {
                    me.getGrid().up('window').close();
                }
            },
            'postingstepsatugridposting button[action=movetosource]': {
                click: function () {
                    //alert("move to source");
                    me.Draggriddestination_togridsource();
                }
            },
            'postingstepsatugridposting button[action=checkalldestination]': {
                click: function () {
                    var me, grid, store, counter;
                    me = this;
                    grid = me.getGridposting();
                    store = grid.getStore();
                    counter = store.getCount();
                    if (counter > 0) {
                        store.each(function (record) {
                            record['data'].flag_posting = 1;
                        });
                        grid.getView().refresh();
                    }

                }
            },
            'postingstepsatugrid button[action=checkallsource]': {
                click: function () {
                    var me, grid, store, counter;
                    me = this;
                    grid = me.getGrid();
                    store = grid.getStore();
                    counter = store.getCount();
                    if (counter > 0) {
                        store.each(function (record) {
                            record['data'].flag_posting = 1;
                        });
                        grid.getView().refresh();
                    }

                }
            },
            'postingstepsatugridposting button[action=clearalldestination]': {
                click: function () {
                    var me, grid, store, counter;
                    me = this;
                    grid = me.getGridposting();
                    store = grid.getStore();
                    counter = store.getCount();
                    if (counter > 0) {
                        store.each(function (record) {
                            record['data'].flag_posting = 0;
                        });
                        grid.getView().refresh();
                    }

                }
            },
            'postingstepsatugrid button[action=clearallsource]': {
                click: function () {
                    var me, grid, store, counter;
                    me = this;
                    grid = me.getGrid();
                    store = grid.getStore();
                    counter = store.getCount();
                    if (counter > 0) {
                        store.each(function (record) {
                            record['data'].flag_posting = 0;
                        });
                        grid.getView().refresh();
                    }

                }
            },
            'checkcolumnpostingstepsatu': {
                'checkchange': function (column, recordIndex, checked) {
                    var me, grid, store, record, row, counter;
                    me = this;
                    grid = me.getGrid();
                    store = grid.getStore();
                    counter = store.getCount();
                    if (counter > 0) {
                        record = store.getAt(recordIndex);
                        record['data'].flag_posting = (checked === true) ? 1 : 0;
                        me.recordgridsource = record;
                    }
                }
            },
            'checkcolumnunpostingstepsatu': {
                'checkchange': function (column, recordIndex, checked) {
                    var me, grid, store, record, row, counter;
                    me = this;
                    grid = me.getGridposting();
                    store = grid.getStore();
                    counter = store.getCount();
                    if (counter > 0) {
                        record = store.getAt(recordIndex);
                        record['data'].flag_posting = (checked === true) ? 1 : 0;
                        me.recordgriddestination = record;
                    }
                }
            },
        });
    },
    setStorePrefix: function () {
        var me, store;
        me = this;
        store = me.getStore("Voucherprefixsetupcombo");
        store.reload({
            params: {
                "hideparam": 'default',
                "project_id": apps.project,
                "pt_id": me.pt_id,
                "department_id": me.getFormdata().down("[name=department_id]").getValue(),
                "status": 'T',
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                var counter = store.getCount();
                if (counter > 0) {
                    me.getGrid().getSelectionModel().select(0, true);
                }
            }
        });
    },
    gridsource_SelectionChange: function () {
        var me, grid, store, counter, record, row;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            record = grid.getSelectionModel().getSelection()[0];
            me.recordgridsource = record;
        }
    },
    griddestination_SelectionChange: function () {
        var me, grid, store, counter, record, row;
        me = this;
        grid = me.getGridposting();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            record = grid.getSelectionModel().getSelection()[0];
            me.recordgriddestination = record;
        }
    },
    Draggridsource_togriddestination: function () {
        var me, gridsource, gridposting, store, counter, row, i, checkgirono;
        me = this;
        gridsource = me.getGrid();
        gridposting = me.getGridposting();
        store = gridsource.getStore();
        counter = store.getCount();
        checkgirono = gridsource.down("toolbar [name=includegirono]").getValue();
        if (counter > 0) {
            i = 0;
            store.each(function (record) {
                if (record['data'].flag_posting == 1) {
                    if (checkgirono == true && record['data'].kasbank == 'BANK') {
                        record['data'].description = "Chequegiro No : " + record['data'].chequegiro_no + ", " + record['data'].description;
                    }
                    if (record['data'].kasbank = "BANK") {
                        //record['data'].voucher_date_gl = record['data'].chequegiro_date;
                        record['data'].voucher_date_gl = record['data'].chequegiro_payment_date;
                    } else {
                        record['data'].voucher_date_gl = "";
                    }

                    record['data'].prefix_id_gl = record['data'].prefix_id;
                    record['data'].prefix_gl = record['data'].prefix;
                    record['data'].voucher_no_gl = record['data'].voucher_no;
                    gridposting.getStore().add(record);
                } else {
                    i++;
                }
            });
            me.Destroygrid_source();
            gridposting.getView().refresh();
            //gridposting.getStore().commitChanges();
            if (i == counter) {
                me.buildWarningAlert(" Please checked posting first, before your move the source data to grid destination ");
            }
        } else {
            me.buildWarningAlert("No data in grid source..!");
        }
    },
    Draggriddestination_togridsource: function () {
        var me, griddestination, gridsource, store, counter, row, i;
        me = this;
        gridsource = me.getGrid();
        griddestination = me.getGridposting();
        store = griddestination.getStore();
        counter = store.getCount();
        if (counter > 0) {
            i = 0;
            store.each(function (record) {
                if (record['data'].flag_posting == 1) {
                    record['data'].voucher_date_gl = null;
                    record['data'].voucher_no_gl = null;
                    record['data'].prefix_id_gl = 0;
                    record['data'].prefix_gl = null;
                    gridsource.getStore().add(record);
                } else {
                    i++;
                }
            });
            me.Destroygrid_destination();
            gridsource.getView().refresh();
            //gridsource.getStore().commitChanges();
            if (i == counter) {
                me.buildWarningAlert(" Please checked unposting first, before your move the destination data to grid source ");
            }
        } else {
            me.buildWarningAlert("No data in grid destination..!");
        }

    },
    Destroygrid_source: function () {
        var me, storesource, storedestination;
        me = this;
        storesource = me.getStore('Postingstepsatusource');
        storedestination = me.getStore('Postingstepsatudestination');

        storedestination.each(function (record) {
            storesource.clearFilter(true);
            storesource.filter('project_id', record.get("project_id"));
            storesource.filter('pt_id', record.get("pt_id"));
            storesource.filter('coa_id', record.get("coa_id"));
            storesource.filter('transno', record.get("transno"));
            storesource.filter('voucher_no', record.get("voucher_no"));
            storesource.removeAt(0);
        });
        storesource.clearFilter();
    },
    Destroygrid_destination: function () {
        var me, storesource, storedestination;
        me = this;
        storesource = me.getStore('Postingstepsatusource');
        storedestination = me.getStore('Postingstepsatudestination');

        storesource.each(function (record) {
            storedestination.clearFilter(true);
            storedestination.filter('project_id', record.get("project_id"));
            storedestination.filter('pt_id', record.get("pt_id"));
            storedestination.filter('coa_id', record.get("coa_id"));
            storedestination.filter('transno', record.get("transno"));
            storedestination.filter('voucher_no', record.get("voucher_no"));
            storedestination.removeAt(0);
        });
        storedestination.clearFilter();
    },
    DataPosting: function () {
        var me, grid, store, counter, record, row, i, sort, checkdata;
        me = this;
        grid = me.getGridposting();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            checkdata = me.checkGridpostingforgl();
            if (checkdata.counter > 0) {
                me.buildWarningAlert(checkdata.msg);
            } else {
                Ext.Msg.confirm('Delete Data', "Are you sure to posting step one? We inform make sure the data for general ledger is valid and not empty", function (btn) {
                    if (btn == 'yes') {
                        me.notif = '';
                        i = 0;
                        sort = 0;
                        store.each(function (record) {
                            row = record['data'];
                            if (row.flag_posting == 1) {
                                sort++;
                                Ext.getBody().mask("Posting step 1 data processing...");
                                row['hideparam'] = 'posting';
                                row['sort'] = sort;
                                me.senddata = row;
                                me.AjaxRequest();
                            } else {
                                i++;
                            }
                        });
                        if (counter == i) {
                            me.buildWarningAlert("Posting data cannot processed, please checked the data first..");
                        }
                    }
                });

            }
        } else {
            me.buildWarningAlert("No data in grid destination..!");
        }
    },
    checkGridpostingforgl: function () {
        var me, grid, store, counter, record, row, gl_vdate, gl_prefix, gl_vno,
                data_gl_date, data_gl_vno, data_gl_prefix, msg, status, vdate;
        me = this;
        grid = me.getGridposting();
        store = grid.getStore();
        counter = store.getCount();
        gl_vdate = 0;
        gl_vno = 0;
        gl_prefix = 0;

        data_gl_vno = [];
        data_gl_date = [];
        data_gl_prefix = [];

        store.each(function (record) {
            row = record['data'];
            vdate = me.formatDate(row.voucher_date_gl);
            if (row.prefix_gl == "") {
                gl_prefix++;
                data_gl_prefix.push(row.voucher_no);
            }
            if (vdate == "1970-01-1") {
                gl_vdate++;
                data_gl_date.push(row.voucher_no);
            }
            if (row.voucher_no_gl == "") {
                gl_vno++;
                data_gl_vno.push(row.voucher_no);
            }
        });

        if (gl_prefix > 0) {
            msg = " Prefix Gl, ";
            status = 1;
        } else {
            msg = " ";
            status = 0;
        }

        if (gl_vdate > 0) {
            msg = msg + " Voucher date Gl, ";
            status = 1;
        } else {
            msg = msg + " ";
            status = 0;
        }

        if (gl_vno > 0) {
            msg = msg + " Voucher No Gl, ";
            status = 1;
        } else {
            msg = msg + " ";
            status = 0;
        }

        msg = msg + " is empty in " + data_gl_vno.toString() + " , " + data_gl_date.toString() + " , " + data_gl_prefix.toString();
        counter = gl_prefix + gl_vdate + gl_vno;

        return {'counter': counter, 'msg': msg}
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

            var grid = me.getGridposting();
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
    gridActionColumnClickcustome: function (view, cell, row, col, e) {
        var me, record, m;
        me = this;
        record = me.getGridposting().getStore().getAt(row);
        m = e.getTarget().className.match(/\bact-(\w+)\b/);
        switch (m[1]) {
            case me.bindPrefixName + 'Update':
                me.formDataShow(me, 'Update');
                break;
        }
    },
    formDataAfterRender: function (el) {
        var me = this;
        me.storeProcess = me.createSpProcessObj(me.storeProcess);
        me.fdar().init();
        me.loadComboBoxStore(el);
        var state = el.up('window').state;
        if (state == 'create') {
            me.fdar().create();
        } else if (state == 'update') {
            me.fdar().update();
        } else if (state == 'read') { //========= added on march 15th 2016 by Tirtha
            me.fdar().read();
        }
    },
    fdar: function () {
        var me, x, form, formvalue, el, i, grid, store, record, counter;
        me = this;
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        grid = me.getGridposting();
        store = grid.getStore();
        counter = store.getCount();

        if (counter > 0) {
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            form.loadRecord(record);
            //me.setValCombo(form, 'prefix_id_gl', record['data'].prefix, record['data'].prefix);
            me.voucherdate = record['data'].accept_date;

        } else {
            record = {};
        }

        x = {
            init: function () {
                /// init here
            },
            create: function () {
                /// create here  
            },
            update: function () {
                for (i in formvalue) {
                    el = form.down("[name=" + i + "]");
                    if (el) {
                        if (el.absoluteReadOnly) {
                            el.setReadOnly(true);
                        }
                    }
                }

                /// update here
            },
            read: function () { //========= added on march 15th 2016 by Tirtha
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                form.down('#btnSave').setDisabled(true);
            }
        };
        return x;
    },
    gridItemDblClick: function (el) {
        var me = this,
                state = 'update';
        me.formDataShow(el, state, state)
    },
    saveforPosting: function () {
        var me, form, grid, store, record, row, counter, value, indexdata, getindex, prefix_gl;
        me = this;
        grid = me.getGridposting();
        store = grid.getStore();
        counter = store.getCount();
        form = me.getFormdata();
        prefix_gl = me.getValCombo(form, 'prefix_id_gl');
        value = form.getForm().getValues();        
        if (counter > 0) {
            indexdata = grid.getSelectionModel().getSelection()[0];
            getindex = store.indexOf(indexdata);
            record = store.getAt(getindex);
            value['prefix_gl'] = prefix_gl.value;
            record.beginEdit();
            record.set(value);
            record.endEdit();
            store.commitChanges();
        }
        form.up('window').close();
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout:45000000,
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
        var data = me.info.data;
        switch (me.info.parameter) {
            case 'default':
                Ext.getBody().unmask();
                break;
            case 'posting':
                if (me.info.success == false) {
                    me.notif = me.notif + ', ' + me.info.data.voucher_no;
                    me.getGridposting().down("toolbar [name=notif]").setText("Data Already Exist with Voucher No :" + me.notif, true);
                    //Ext.Msg.alert('Notification', 'Voucher Data '+me.info.data.voucher_no+' Already Exist');
                    me.message = "Process posting step one, already exist";
                    me.alertFormdatadetailFailed();
                    Ext.getBody().unmask();
                } else {
                    Ext.getBody().unmask();
                    me.message = "Process posting step one, finish";
                    me.alertFormdatadetailSuccess();
                }

                break;

        }
    },
    alertFormdatadetailSuccess: function () {
        var me, store;
        me = this;
        me.getGrid().getStore().reload();
        me.getGridposting().getStore().removeAll();
        Ext.Msg.show({
            title: 'Success',
            msg: me.message,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK,
            fn: function () {

            }
        });
    },
    alertFormdatadetailFailed: function () {
        var me, store;
        me = this;
        me.getGrid().getStore().reload();
        Ext.Msg.show({
            title: 'Failure',
            msg: 'Error: ' + me.message,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
    },
});