Ext.define('Hrd.controller.Plafonpengobatan', {
    extend: 'Hrd.library.box.controller.Controllerfdv',
    alias: 'controller.Plafonpengobatan',
    requires: ['Hrd.library.box.tools.DefaultConfigfdv', 'Hrd.library.box.tools.StoreProcessor', 'Hrd.library.box.tools.EventSelector',
        'Hrd.library.box.tools.SimpleGridControl', 'Hrd.library.box.tools.Tools'],
    views: ['plafonpengobatan.Panel', 'plafonpengobatan.Grid', 'plafonpengobatan.FormSearch', 'plafonpengobatan.FormData'],
    comboBoxIdEl: [],
    controllerName: 'plafonpengobatan',
    fieldName: 'plafonpengobatan_id',
    fillForm: null,
    formWidth: 600,
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Plafonpengobatan',
    browseHandler: null,
    localStore: {
        newdetail: null
    },
    isMaximize: true,
    saveStore: null,
    listYears: null,
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfigfdv({
            moduleName: me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
    },
    init: function() {
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));

        // added 26 Agustus 2014
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});


        var newEvs = {};
        newEvs['plafonpengobatanformdata [name=jenispengobatan_jenispengobatan_id]'] = {
            select: function() {
                me.jenisPengobatanOnSelect();
            }

        };
        newEvs['plafonpengobatanformdata [name=year]'] = {
            select: function() {
                me.yearOnSelect();
            }

        };
        newEvs['plafonpengobatanformdata [name=mastersk_mastersk_id]'] = {
            change: function() {
                me.masterSkOnChange();
            }

        };
        newEvs['plafonpengobatanformdata [name=all_group]'] = {
            change: function() {
                me.allGroupOnChange();
            }

        };
        newEvs['plafonpengobatanformdata [name=all_ptkp]'] = {
            change: function() {
                me.allPtkpOnChange();
            }

        };

        this.control(newEvs);


    },
    allGroupOnChange: function() {
        var me = this;
        var f = me.getFormdata();
        var vs = f.getValues();
        var isAllGroup = me.tools.intval(vs["all_group"]);
        f.down("[name=group_group_id]").setValue(false);
        f.down("[name=group_group_id]").setReadOnly(isAllGroup);
    },
    allPtkpOnChange: function() {
        var me = this;
        var f = me.getFormdata();
        var vs = f.getValues();
        var isAllPtkp = me.tools.intval(vs["all_ptkp"]);
        f.down("[name=ptkp_id]").setValue(false);
        f.down("[name=ptkp_id]").setReadOnly(isAllPtkp);
    },
    masterSkOnChange: function() {
        var me = this;
        var f = me.getFormdata();
        f.down("[name=tanggal_sk]").setValue("");
        f.down("[name=tanggal_sk]").setValue(me.tools.comboHelper(f.down("[name=mastersk_mastersk_id]")).getField("mastersk_id", "tanggal"));
    },
    yearOnSelect: function() {
        var me = this;
        me.setDefaultValue(me.getFormdata().down("[name=year]").getValue());
    },
    jenisPengobatanOnSelect: function() {
        var me = this;
        var f = me.getFormdata();
        var el = f.down("[name=jenispengobatan_jenispengobatan_id]");
        f.down("[name=jenispengobatan_jenispengobatan]").setValue("");
        f.down("[name=jenispengobatan_jenispengobatan]").setValue(me.tools.comboHelper(el).getText({
            d: 'jenispengobatan',
            v: 'jenispengobatan_id'
        }));

    },
    panelAfterRender: function(configs) {
        this.callParent(arguments);
        var me = this;
        var p = me.getPanel();
        p.setLoading("Loading components...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.fillFormDataComponents(data, me.getFormdata());

                // combobox di form search
                me.tools.wesea(data.jenispengobatan, me.getFormsearch().down("[name=jenispengobatan_id]")).comboBox();
                me.tools.wesea(data.group, me.getFormsearch().down("[name=group_id]")).comboBox();
                me.tools.wesea(data.mastersk, me.getFormsearch().down("[name=mastersk_id]")).comboBox();

                me.tools.wesea(data.ptkp, me.getFormsearch().down("[name=ptkp_id]")).comboBox();

                //me.tools.wesea(data.ptkp, me.getFormsearch().down("[name=ptkp_id]")).comboBox();


                me.listYears = data.others[0][0]['LISTYEARS'][1];
                var ly = me.listYears;
                if (ly) {
                    var ys = me.getFormdata().down("[name=year]").getStore();
                    ys.removeAll();
                    for (var i in ly) {
                        ys.add({
                            name: ly[i]["year"],
                            number: ly[i]["year"]
                        });
                    }
                }
                p.setLoading(false);
            }
        }).read('detail');
    },
    fillFormDataComponents: function(data, f) {
        var me = this;
        me.tools.wesea(data.jenispengobatan, f.down("[name=jenispengobatan_jenispengobatan_id]")).comboBox();
        me.tools.wesea(data.group, f.down("[name=group_group_id]")).comboBox();
        me.tools.wesea(data.mastersk, f.down("[name=mastersk_mastersk_id]")).comboBox();

        me.tools.wesea(data.ptkp, f.down("[name=ptkp_id]")).comboBox();
    },
    mainDataSave: function() {
        var me = this;


        var f = me.getFormdata();

        var vs = f.getValues();
        var isAllGroup = me.tools.intval(vs["all_group"]);
        var isAllPtkp = me.tools.intval(vs["all_ptkp"]);

        var sureAllGroup = false;
        var sureAllPtkp = false;

        if (isAllGroup || isAllPtkp) {
            // Ext.Msg.show({
            //     title: 'Konfirmasi',
            //     msg: 'Generate plafon ini untuk semua golongan?',
            //     buttons: Ext.Msg.YESNO,
            //     icon: Ext.Msg.QUESTION,
            //     fn: function(clicked) {
            //         console.log(clicked);
            //         if (clicked === "yes") {
            //             var params = me.getFormdata().getValues();
            //             params["value"] = accounting.unformat(params["value"]);
            //             var p = me.getPanel();
            //             p.setLoading("Sedang menyimpan...");
                   
            //             me.tools.ajax({
            //                 params: {data: Ext.encode(params)},
            //                 fail: function(msg, data) {

            //                     p.setLoading(false);
            //                 },
            //                 success: function(data) {
            //                     p.setLoading(false);
                               
            //                     me.tools.alert.info("Success!");
            //                 }
            //             }).process('generateallgroup');
            //         }
            //     }
            // });

            if (isAllGroup) {
                Ext.Msg.show({
                    title: 'Konfirmasi',
                    msg: 'Generate plafon ini untuk semua golongan?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(clicked) {
                        console.log(clicked);
                        if (clicked === "yes") {
                            var params = me.getFormdata().getValues();
                            params["value"] = accounting.unformat(params["value"]);
                            var p = me.getPanel();
                            p.setLoading("Sedang menyimpan...");
                       
                            me.tools.ajax({
                                params: {data: Ext.encode(params)},
                                fail: function(msg, data) {

                                    p.setLoading(false);
                                },
                                success: function(data) {
                                    p.setLoading(false);
                                   
                                    me.tools.alert.info("Success!");
                                }
                            }).process('generateallgroup');
                        }
                    }
                });
            }
            if (isAllPtkp) {
                Ext.Msg.show({
                    title: 'Konfirmasi',
                    msg: 'Generate plafon ini untuk semua ptkp?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(clicked) {
                        console.log(clicked);
                        if (clicked === "yes") {
                            var params = me.getFormdata().getValues();
                            params["value"] = accounting.unformat(params["value"]);
                            var p = me.getPanel();
                            p.setLoading("Sedang menyimpan...");
                       
                            me.tools.ajax({
                                params: {data: Ext.encode(params)},
                                fail: function(msg, data) {

                                    p.setLoading(false);
                                },
                                success: function(data) {
                                    p.setLoading(false);
                                   
                                    me.tools.alert.info("Success!");
                                }
                            }).process('generateallptkp');
                        }
                    }
                });
            }
            if (isAllGroup && isAllPtkp) {
                Ext.Msg.show({
                    title: 'Konfirmasi',
                    msg: 'Generate plafon ini untuk semua ptkp & golongan?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(clicked) {
                        console.log(clicked);
                        if (clicked === "yes") {
                            var params = me.getFormdata().getValues();
                            params["value"] = accounting.unformat(params["value"]);
                            var p = me.getPanel();
                            p.setLoading("Sedang menyimpan...");
                       
                            me.tools.ajax({
                                params: {data: Ext.encode(params)},
                                fail: function(msg, data) {

                                    p.setLoading(false);
                                },
                                success: function(data) {
                                    p.setLoading(false);
                                   
                                    me.tools.alert.info("Success!");
                                }
                            }).process('generateallgroupptkp');
                        }
                    }
                });
            }

        } else {
            me.insSave({
                form: f,
                grid: me.getGrid(),
                // store: me.localStore["detail"].store,
                store: me.getGrid().getStore(),
                finalData: function(data) {
                    data = me.tools.formHelper(f).fixMoneyUnformat();
                    return data;
                },
                sync: true,
                callback: {
                    create: function(store, form, grid) {

                    }
                }
            });
        }






    },
    fdar: function() {



        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();


        var x = {
            init: function() {


            },
            create: function() {

            },
            update: function() {
                f.editedRow = g.getSelectedRow();
                var eId = me.getGrid().getSelectedRecord().get("plafonpengobatan_id");


            },
            other: function(state) {

                me.getFormdata().up('window').getEl().unmask();
            }
        };
        return x;
    },
    afterDetailRequested: function(data, motherFunc) {
        // data from mode_read : 'detail'
        // motherFunc : fungsi yang dilewatkan dari method gridSelectionChange di Controllerfdv
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        f.editedRow = g.getSelectedRow();

        if (!g.getSelectedRecord()) {
            motherFunc();
            return;
        }
        var rec = g.getSelectedRecord();
        f.loadRecord(rec);
        f.down("[name=value]").setValue(accounting.format(rec.get("value")));
        me.jenisPengobatanOnSelect();
        f.down("button[action=save]").setDisabled(false);
        motherFunc();
        return false;
    },
    afterCallNew: function() {
        var me = this;

        var f = me.getFormdata();

        f.down("[action=save]").setDisabled(false);
        me.getGrid().getSelectionModel().deselectAll();

        // attach years
        if (me.getGrid().getStore().getCount() === 0) {
            me.setDefaultValue();
            return;
        }

        Ext.Msg.show({
            title: 'Message Box',
            msg: 'Tambah tahun baru?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(clicked) {
                if (clicked === "yes") {

                    // check if data exist
                    var g = me.getGrid();
                    if (g.getStore().getCount() == 0) {

                        return;
                    }

                    Ext.Msg.show({
                        title: 'Message Box',
                        msg: 'Salin dari tahun sebelumnya?',
                        buttons: Ext.Msg.YESNO,
                        icon: Ext.Msg.QUESTION,
                        fn: function(clicked) {
                            if (clicked === "yes") {
                                me.copyFromYearBefore();
                            } else if (clicked === "no") {
                                me.addNewPlafon();
                            }
                        }
                    });

                } else if (clicked === "no") {
                    me.setDefaultValue();
                }
            }
        });
        
        f.down("[action=save]").setDisabled(false);
    },
    setDefaultValue: function(selectedYear) {

        var d = new Date();
        var endDate = new Date();
        endDate.setMonth(0);
        endDate.setDate(31);
        d.setMonth(1);
        d.setDate(1);
        var me = this;
        var f = me.getFormdata();
        var s = f.down("[name=year]").getStore();
        var y = 0;
        if (typeof selectedYear === 'undefined') {
            if (s.getCount() > 0) {
                y = s.getAt(s.getCount() - 1).get("number");
            }
        } else {
            y = selectedYear;
        }
        if (y > 0) {
            f.down("[name=year]").setValue(y);
        }
        d.setFullYear(y);
        endDate.setFullYear(me.tools.intval(y) + 1);

        f.down("[name=start_date]").setValue(d);
        f.down("[name=end_date]").setValue(endDate);
    },
    copyFromYearBefore: function() {
        var me = this;
        var p = me.getPanel();
        p.setLoading("Copying from year before...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.getGrid().getStore().loadPage(1);
                p.setLoading(false);
            }
        }).read('copyfromold');
    },
    addNewPlafon: function() {
        var me = this;
        var f = me.getFormdata();
        var d = new Date();

        /// add 1 to year combobox
        var ys = f.down("[name=year]").getStore();
        var y = 0;
        if (ys.getCount() === 0) {
            y = d.getFullYear();

        } else {
            var lastIndex = ys.getCount() - 1;
            var cy = ys.getAt(lastIndex).get("number");
            y = cy + 1;

        }

        ys.add({
            name: y,
            number: y
        });


        me.setDefaultValue(y);
    }
});