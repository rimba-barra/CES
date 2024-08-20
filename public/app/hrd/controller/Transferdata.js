Ext.define('Hrd.controller.Transferdata', {
    extend: 'Hrd.library.box.controller.ControllerByData',
    alias: 'controller.Transferdata',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.lookup.Employee', 'Hrd.library.box.tools.ComboLoader', 'Hrd.library.box.tools.InstaView',
        'Hrd.library.box.tools.Hour'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'transferdata',
    formWidth: 600,
    refs: [
        {
            ref: 'gridlookupe',
            selector: 'lookupemployeegrid'
        },
        {
            ref: 'gridmap',
            selector: 'transferdatagridmap'
        },
        {
            ref: 'gridkomponen',
            selector: 'transferdatagridkomponen'
        },
        {
            ref: 'formmap',
            selector: 'transferdataformmap'
        },
        {
            ref: 'formkom',
            selector: 'transferdataformkomponen'
        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Transferdata',
    browseHandler: null,
    localStore: {
        selectedUnit: null,
        indexLembur: null,
        newdetail: null,
    },
    textCombos: [],
    comboLoader: null,
    fieldName: 'transfer_id',
    overtimeParameters: null,
    myParams: null,
    shiftInfo: null,
    validShift: false,
    currentStatusLembur: 0,
    validLembur: false,
    saveStoreB: 'newdetail',
    overtimeValue: 0,
    tempMatchIndeksLembur: null,
    listKomponenGaji: null,
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);

        // event untuk single klik di grid
        if (typeof gbTransferDataImport === 'undefined') {
            gbTransferDataImport = {
                komponenClick: function(index) {

                    me.gridKomponenOnClick(index);
                }
            };
        }
        
        
        if (typeof kouti === 'undefined') {

            Ext.Loader.injectScriptElement(document.URL + 'app/hrd/library/kouti/kouti.js', function() {
                /// loaded
              
                
            }, function() {
                /// error
            });
        }



        this.callParent(arguments);
    },
    init: function() {
        var me = this;
        this.callParent(arguments);
        var newEvs = {};
        var events = new Hrd.library.box.tools.EventSelector();




        newEvs['transferdataformdata button[action=lookup_employee]'] = {
            click: function() {
                me.lookupEmployee();
            }

        };




        newEvs['#employeeTTransferwindow lookupemployeegrid button[action=select]'] = {
            click: function() {
                me.selectEmployee();
            }

        };

        newEvs['transferdataformdata [name=komponengaji_komponengaji_id]'] = {
            select: function() {
                me.komponenOnSelect();
                // me.refreshXGrid();
            }

        };
        newEvs['transferdataformdata [name=batch_filter]'] = {
            select: function() {
                me.groupOnSelect();
                //  me.refreshXGrid();
            }

        };
        newEvs['transferdataformdata [name=monthyear_filter]'] = {
            select: function() {
                me.monthyearOnSelect();
                //   me.refreshBatchFilter();
                //   me.refreshXGrid();
            }

        };
        newEvs['transferdataformdata [name=batch]'] = {
            blur: function() {
                me.groupOnSelect();
            }

        };


        newEvs['transferdataformdata button[action=insert]'] = {
            click: function() {
                me.insertToGrid();
            }

        };

        newEvs['transferdatapanel button[action=deletebatch]'] = {
            click: function() {
                me.deleteBatch();
            }

        };
        newEvs['transferdatapanel button[action=import]'] = {
            click: function() {
                me.showExcelForm();
            }
        };
        newEvs['transferdataformimportexcel #file_shiftexcel'] = {
            change: function(fld, a) {
                me.formImportExcelload(fld, a, 'mode');
            }
        };

        //

        newEvs['transferdataformkomponen button[action=process]'] = {
            click: function() {
                me.addKomponen();
            }
        };

        newEvs['transferdataformmap button[action=process]'] = {
            click: function() {
                me.simpanMap();
            }
        };

        newEvs['transferdatapanel button[action=updatetunjangan]'] = {
            click: function() {
                me.updateTunjangan();
            }
        };
        newEvs['transferdataformmap button[action=set_all]'] = {
            click: function() {
                me.updateAllPeriode();
            }
        };


        //



        this.control(newEvs);

    },
    updateAllPeriode:function(){
        var me = this;
        var f = me.getFormmap();
        var g = f.down("grid");
        var v = f.down("[name=periodebase]").getValue();
        if(kouti.date.monthYear.isValid(v)){
            g.getStore().each(function(rec) {
                
                if (rec != null) {
                    rec.beginEdit();
                    rec.set({
                        periode:v
                    });
                    rec.endEdit();
                }

            });
            
            
        }else{
            me.tools.alert.warning("Periode tidak valid");
        }
        
    },
    updateTunjangan: function() {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormdata();
        me.tools.ajax({
            params: f.getForm().getValues(),
            fail: function(msg, data) {

                p.setLoading(false);
            },
            success: function(data) {
                p.setLoading(false);
               
                me.tools.alert.info("Success!");
            }
        }).process('updatetunjangan');
    },
    monthyearOnSelect: function() {
        var me = this;
        var f = me.getFormdata();
        var el = f.down("[name=batch_filter]");
        var s = el.getStore();
        s.getProxy().setExtraParam('monthyear', f.down("[name=monthyear_filter]").getValue());
        s.load({
            callback: function() {
                el.setDefaultValue(true);
                me.groupOnSelect();
            }
        });
    },
    groupOnSelect: function() {
        var me = this;
        var f = me.getFormdata();
        var el = f.down("[name=komponengaji_komponengaji_id]");
        var s = el.getStore();
        s.getProxy().setExtraParam('monthyear', f.down("[name=monthyear_filter]").getValue());
        s.getProxy().setExtraParam('batch', f.down("[name=batch_filter]").getValue());
        s.getProxy().setExtraParam('limit', 9999);
        s.load({
            callback: function() {
                el.setDefaultValue(true);
                me.komponenOnSelect();
            }
        });

    },
    komponenOnSelect: function() {
        var me = this;
        var f = me.getFormdata();
        var s = me.getGrid().getStore();


        s.getProxy().setExtraParam('monthyear', f.down("[name=monthyear_filter]").getValue());
        s.getProxy().setExtraParam('batch', f.down("[name=batch_filter]").getValue());
        s.getProxy().setExtraParam('komponengaji_komponengaji_id', f.down("[name=komponengaji_komponengaji_id]").getValue());
        s.getProxy().setExtraParam('limit', 9999);
        s.load({
            callback: function() {
                //f.setLoading(false);
                me.hitungTotalValue();

            }
        });
    },
    refreshBatchFilter: function() {
        var me = this;
        var f = me.getFormdata();
        var s = f.down("[name=batch_filter]").getStore();
        var val = me.tools.comboHelper(f.down("[name=monthyear_filter]")).getField("number", "name");
        console.log(val);
        s.clearFilter();
        s.filterBy(function(rec, id) {
            console.log(rec);
            if (rec.data.monthyear === val) {
                return true;
            }
            else {
                return false;
            }
        });
    },
    simpanMap: function() {
        var me = this;
        var g = me.getGridmap();
        var data = g.getJson();
        var validData = [];
        var validPeriode = null;
        var f = me.getFormmap();
        for (var i in data) {
            validPeriode = me.tools.inputMonthYear(data[i]["periode"]);
            if (me.tools.intval(data[i]["komponengaji_komponengaji_id"]) > 0 && validPeriode.valid) {
                validData.push(data[i]);
            }
        }
        if (validData.length > 0) {
            Ext.Msg.show({
                title: 'Confirm',
                msg: 'Proses ' + validData.length + ' record ini?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(clicked) {

                    if (clicked === "yes") {
                        f.setLoading("Proses simpan data...");
                        me.tools.ajax({
                            params: {
                                data: Ext.encode(validData),
                                file_name: f.down("[name=file_name]").getValue()
                            },
                            success: function(data, model) {
                                f.setLoading(false);
                                if (data['others'][0][0]['HASIL']) {
                                    f.up("window").close();
                                    me.tools.alert.info("Sukses");
                                    me.panelAfterRender(me.getPanel());

                                } else {
                                    me.tools.alert.warning(data['others'][0][0]['MSG']);
                                }


                            }
                        }).read('simpanmap');


                    }
                }
            });
        } else {
            me.tools.alert.warning("Tidak ada record yang valid untuk diproses");
        }
    },
    addKomponen: function() {
        var me = this;
        var f = me.getFormkom();
        var g = f.down("grid");
        var gp = me.getGridmap();

        var rec = g.getSelectedRecord();
        var recMap = gp.getSelectedRecord();

        if (rec && recMap) {
            recMap.beginEdit();
            recMap.set({
                komponengaji_komponengaji_id: rec.get("komponengaji_id"),
                komponengaji_code: rec.get("code"),
                komponengaji_description: rec.get("description"),
            });
            recMap.endEdit();

            console.log(rec);
            console.log(recMap);

            f.up("window").close();
        }

    },
    gridKomponenOnClick: function(index) {
        var me = this;
        var w = me.instantWindow("FormKomponen", 400, "Daftar Komponen Gaji", "daftarkomponen", "toolListKomponenWinId");
        var f = w.down("form");

        var g = me.getGridkomponen();
        g.getSelectionModel().setSelectionMode('SINGLE');
        var myData = [];
        var data = me.listKomponenGaji.data;
        for (var i in data) {

            myData.push(data[i]);
        }


        var myStore = Ext.create('Ext.data.Store', {
            fields: ['komponengaji_id', 'code', 'description'],
            data: myData
        });

        g.bindStore(myStore);

    },
    showExcelForm: function() {
        var me = this;
        var w = me.instantWindow("FormImportExcel", 400, "Import Excel", "processexcel", "toolImportExcelWinId");
        var f = w.down("form");

    },
    formImportExcelload: function(fld, a, mode) {
        var me = this;


        var me = this;
        var form = fld.up("form");
        var p = me.getPanel();
        me.uploadFile({
            form: form,
            showalert: false,
            params: {'type': 'importexcel'},
            callback: {
                success: function(fn) {
                    form.setLoading("processing excel...");
                    me.tools.ajax({
                        params: {
                            file_name: fn
                        },
                        success: function(data, model) {
                            form.setLoading(false);
                            if (data['others'][0][0]['HASIL']) {
                                form.up("window").close();
                                //
                                me.showMapForm(data['others'][0][0]['DATA'], fn);
                                // me.tools.alert.info("Success");
                            } else {
                                me.tools.alert.warning(data['others'][0][0]['MSG']);
                            }


                        }
                    }).read('processexcel');


                },
                failure: function() {
                    p.setLoading(false);
                }
            }
        });
    },
    showMapForm: function(data, fileName) {
        var me = this;
        var w = me.instantWindow("FormMap", 800, "Process Import", "processimport", "toolImportProcessWinId");
        var g = me.getGridmap();
        g.doInit();
        var f = w.down("form");
        var myData = [];
        //['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
        var count = 0;
        console.log(data);
        for (var i in data) {
            count++;
            console.log(data[i]);
            myData.push([count, '', '', '', data[i], '', 'Ya']);
        }

        g.getSelectionModel().setSelectionMode('SINGLE');

        var store = Ext.create('Ext.data.ArrayStore', {
            fields: [
                {name: 'no'},
                {name: 'komponengaji_komponengaji_id'},
                {name: 'komponengaji_code'},
                {name: 'komponengaji_description'},
                {name: 'kolom'},
                {name: 'periode'},
                {name: 'is_roundup'},
            ],
            data: myData
        });
        g.bindStore(store);

        f.down("[name=file_name]").setValue(fileName);

    },
    deleteBatch: function() {
        var me = this;
        var f = me.getFormdata();
        var my = f.down("[name=monthyear_filter]").getValue();
        var batch = f.down("[name=batch_filter]").getValue();

        Ext.Msg.show({
            title: 'Confirm',
            msg: 'Do you want delete this batch?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(clicked) {
                if (clicked === "yes") {

                    if (my && batch) {
                        f.setLoading("Deleting batch...");
                        me.tools.ajax({
                            params: {
                                monthyear: my,
                                batch: batch
                            },
                            success: function(data, model) {
                                var success = data['others'][0][0]['SUCCESS'];
                                if (!success) {
                                    me.tools.alert.warning("Terjadi kesalahan ketika memproses permintaan Anda");
                                }

                                f.setLoading(false);
                            }
                        }).read('deletebatch');

                    }
                }
            }
        });
    },
    gridSelectionChange: function() {
        var me = this;
        /* me.callParent(arguments);
         
         f.getForm().reset();
         me.cancelOnClick();
         */
        var g = me.getGrid();
        var f = me.getFormdata();
        var rec = g.getSelectedRecord();
        if (rec) {
            f.editedRow = g.getSelectedRow();
            f.down("[name=employee_employee_nik]").setValue(rec.get("employee_employee_nik"));
            f.down("[name=employee_employee_name]").setValue(rec.get("employee_employee_name"));
            f.down("[name=employee_employee_id]").setValue(rec.get("employee_employee_id"));
            f.down("[name=value]").setValue(rec.get("value"));
            //  f.loadRecord(rec);

            me.getPanel().down("toolbar button[action=delete]").setDisabled(false);
            me.tools.formHelper(f).fixMoneyFormat(rec);


        }
        me.afterSC(rec);
        me.hitungTotalValue();

    },
    refreshXGrid: function() {

        var me = this;
        var g = me.getGrid();
        var f = me.getFormdata();
        var s = g.getStore();
        var vk = f.down("[name=komponengaji_komponengaji_id]").getValue();
        var vb = f.down("[name=batch_filter]").getValue();
        var vmy = f.down("[name=monthyear_filter]").getValue();
        s.getProxy().setExtraParam("komponengaji_komponengaji_id", vk);
        s.getProxy().setExtraParam("batch", vb);
        s.getProxy().setExtraParam("monthyear", vmy);
        s.loadPage(1, {
            callback: function() {

                // me.addEvent(false);
                f.down("[name=komponengaji_komponengaji_id]").setReadOnly(false);
                f.down("[name=batch_filter]").setReadOnly(false);
                f.down("[name=monthyear_filter]").setReadOnly(false);
                f.down("[name=komponengaji_komponengaji_id]").setValue(vk);
                f.down("[name=batch_filter]").setValue(vb);
                f.down("[name=monthyear_filter]").setValue(vmy);
                me.hitungTotalValue();
            }
        });


    },
    insertToGrid: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();
        var vs = f.getForm().getValues();
        var sudahAda = false;

        var emId = me.tools.intval(vs["employee_employee_id"]);
        vs["employee_employee_id"] = emId;
        if (emId !== 0) {


            //s.add(vs);
            /*
             s.each(function(rec) {
             
             if(rec.get("employee_employee_id")===emId){
             rec.beginEdit();
             rec.set(vs);
             rec.endEdit();
             sudahAda = true;
             
             }
             
             });
             console.log(sudahAda);
             
             if(!sudahAda){
             s.add(vs);
             }
             */
            var index = s.findExact('employee_employee_id', emId);
            vs["value"] = f.down("[name=value]").getValuem();

            if (index >= 0) {
                var rec = s.getAt(index);
                rec.beginEdit();
                rec.set(vs);
                rec.endEdit();
                // return store.getAt(index).get('fieldValue');
            } else {
                console.log("tambah");
                console.log(vs);
                s.add(vs);
                // return field_id;
            }
        }
        me.hitungTotalValue();

    },
    hitungTotalValue: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();
        var totalValue = 0;
        s.each(function(rec) {

            if (rec != null) {
                totalValue += me.tools.floatval(rec.get("value"));

            }

        });

        /// hitung total
        f.down("[name=total]").setValue(s.getCount());
        f.down("[name=total_value]").setValuem(totalValue);
    },
    selectEmployee: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGridlookupe();
        var rec = g.getSelectedRecord();
        if (rec) {
            f.down("[name=employee_employee_nik]").setValue(rec.get("employee_nik"));
            f.down("[name=employee_employee_name]").setValue(rec.get("employee_name"));
            f.down("[name=employee_employee_id]").setValue(rec.get("employee_id"));
            g.up("window").close();
        }

    },
    lookupEmployee: function() {
        var me = this;
        var f = me.getFormdata();
        var window = me.instantWindow("Panel", 600, "Employe List", "create", "employeeTTransferwindow", "lookup.employee", {
            itemId: me.controllerName + 'employee'
        });


        var g = window.down("grid");


        var p = window.down("panel");
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.tools.wesea({data: data, model: model}, g).grid();
                p.setLoading(false);
            }
        }).read('employee');



    },
    panelAfterRender: function(el) {
        
        
        
        
        var me = this;
        me.listKomponenGaji = null;
        if (me.isMaximize) {
            el.up("window").maximize();
        }
        me.getGrid().getSelectionModel().setSelectionMode('SINGLE');
        var f = me.getFormdata();
        var p = me.getPanel();

        ///
        me.localStore.newdetail = me.instantStore({
            id: me.controllerName + 'DetailStore',
            extraParams: {
                mode_read: 'maindetail'
            },
            idProperty: 'transfer_id'
        });
        
        

        p.setLoading(false);
        p.setLoading("Loading parameter...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {

                console.log(data);
                me.listKomponenGaji = data.komponengaji;


                var pel = f.down("[name=monthyear_filter]");
                var bel = f.down("[name=batch_filter]");
                var kel = f.down("[name=komponengaji_komponengaji_id]");

                pel.bindPrefixName = 'transferdata';
                bel.bindPrefixName = 'transferdata';
                kel.bindPrefixName = 'transferdata';

                pel.doInit(true, {}, function() {

                    bel.doInit(true,
                            {
                                monthyear: pel.getValue()
                            },
                    function() {


                        kel.doInit(true, {
                            monthyear: pel.getValue(),
                            batch: bel.getValue()
                        }, function() {

                            me.komponenOnSelect();

                        });

                    });

                });

               

                p.setLoading("Loading komponen...");
                me.localStore.newdetail.load({
                    params: {
                        employee_id: 0
                    },
                    callback: function(recs, op) {
                        me.attachModel(op, me.localStore.newdetail, true);
                        p.setLoading(false);

                    }
                });

            }
        }).read('parameter');



        // maximize panel window

    },
    validateData: function() {
        var me = this;
        var data = {"status": true, "msg": "Sedang diproses..."};
        var jumlahRecord = me.getGrid().getStore().getCount();
        if (jumlahRecord === 0) {
            data.status = false;
            data.msg = "Tidak ada record untuk diproses";
        }
        return data;
    },
    finalData: function(data) {
        var me = this;
        data = me.tools.formHelper(me.getFormdata()).fixMoneyUnformat();
        data["detail"] = me.getGrid().getJson();
        return data;
    },
    afterClick: function() {
        var me = this;
        var f = me.getFormdata();
        var x = {
            cancel: function() {
                me.addEvent(false);
                //  me.mainGridCheckRecord();
                var rec = me.getGrid().getSelectedRecord();
                if (rec) {
                    f.loadRecord(rec);
                }
                f.down("[name=komponengaji_komponengaji_id]").setReadOnly(false);
                f.down("[name=batch_filter]").setReadOnly(false);
                f.down("[name=monthyear_filter]").setReadOnly(false);
                // f.down("[action=lookup_employee]").setDisabled(true);
            },
            save: function() {

            },
            edit: function() {
                //  f.down("[action=lookup_employee]").setDisabled(false);
            },
            delete: function() {

            },
            new : function() {
                me.addEvent(true);

                var batch = me.tools.intval(f.down("[name=batch_filter]").getValue());
                batch = batch + 1;
                var my = f.down("[name=monthyear_filter]").getValue();
                if (!my) {
                    var date = new Date();

                    my = date.getMonth() + 1 + "/" + date.getFullYear();
                }
                f.down("[name=batch]").setValue(batch);
                f.down("[name=monthyear]").setValue(my);
                f.down("[name=total]").setValue(0);
                f.down("[name=total_value]").setValue(0);
                me.tools.comboHelper(f.down("[name=komponengaji_komponengaji_id]")).setFirstValue();

                me.getGrid().getStore().loadData([], false);
                /*  me.validShift = false;
                 f.getForm().reset();
                 f.down("[name=date]").setValue(new Date());
                 f.down("[action=lookup_employee]").setDisabled(false);
                 */
            }
        }
        return x;
    },
    addEvent: function(isAdd) {
        var me = this;
        var f = me.getFormdata();
        if (isAdd) {
            f.down("[name=monthyear_filter]").hide();
            f.down("[name=monthyear]").show();
            f.down("[name=batch_filter]").hide();
            f.down("[name=batch]").show();
        } else {
            f.down("[name=monthyear_filter]").show();
            f.down("[name=monthyear]").hide();
            f.down("[name=batch_filter]").show();
            f.down("[name=batch]").hide();
        }

        //  f.down("[name=monthyear_filter]").setHidden(isAdd);
    },
    confirmDeleteOnClick: function(store, rec, window) {
        var me = this;

        window.setLoading("Deleting record...");


        me.tools.ajax({
            params: {
                id: rec.get("transferdetail_id")
            },
            success: function(data, model) {

                var suc = data['others'][0][0]['SUCCESS'];
                if (suc) {
                    me.tools.alert.info('Data has been deleted');
                    store.loadPage(1);
                } else {
                    me.tools.alert.warning('Failed');
                }
                window.setLoading(false);
            }
        }).read('delete');

    },
    successSaveUpdate: function(isCreate) {
        var me = this;
        me.refreshForm();
        
    },
    refreshForm: function() {
        var me = this;
        me.addEvent(false);
    }
});