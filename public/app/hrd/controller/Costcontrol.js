Ext.define('Hrd.controller.Costcontrol', {
    extend: 'Hrd.library.box.controller.template.Parameters',
    alias: 'controller.Costcontrol',
    views: [],
    controllerName: 'costcontrol',
    formWidth: 400,
    refs: [
        {
            ref: 'panel',
            selector: 'costcontrolpanel'
        },
        {
            ref: 'formdata',
            selector: ''
        },
        {
            ref: 'gridcca',
            selector: 'costcontrolccagrid'
        },
        {
            ref: 'gridccb',
            selector: 'costcontrolccbgrid'
        },
        {
            ref: 'gridccc',
            selector: 'costcontrolcccgrid'
        },
    ],
    bindPrefixName: 'Costcontrol',
    sizew: {w: 500, h: 500},
    paramList: null,
    tempDeletedId: {
        cca: '',
        ccb: '',
        ccc: ''
    },
    isLoaded: {
        cBA: false, CBB: false,
        GA: false, GB: false
    },
    init: function() {
        this.callParent(arguments);
        var me = this;
        var newEvents = {};
        newEvents['#formCostcontrolID [name=status]'] = {
            change: function(el, newVal) {
                me.statusOnChange(el);
            }
        };
        newEvents['costcontrolccagrid toolbar button[action=create]'] = {
            click: function() {
                me.instaRecord(me.getParamsCca()).add();
            }
        };
        newEvents['costcontrolccagrid toolbar button[action=update]'] = {
            click: function() {
                me.instaRecord(me.getParamsCca()).edit();
            }
        };
        newEvents['costcontrolccagrid toolbar button[action=destroy]'] = {
            click: function() {
                me.instaRecord(me.getParamsCca()).delete();
            }
        };
        newEvents['costcontrolccagrid'] = {
            selectionchange: function() {
                me.instaRecord(me.getParamsCca()).selectionChange();
            }
        };
        newEvents['costcontrolccbgrid toolbar button[action=create]'] = {
            click: function() {
                me.instaRecord(me.getParamsCcb()).add();
            }
        };
        newEvents['costcontrolccbgrid toolbar button[action=update]'] = {
            click: function() {
                me.instaRecord(me.getParamsCcb()).edit();
            }
        };
        newEvents['costcontrolccbgrid toolbar button[action=destroy]'] = {
            click: function() {
                me.instaRecord(me.getParamsCcb()).delete();
            }
        };
        newEvents['costcontrolccbgrid'] = {
            selectionchange: function() {
                me.instaRecord(me.getParamsCcb()).selectionChange();
            }
        };
        newEvents['costcontrolcccgrid toolbar button[action=create]'] = {
            click: function() {
                me.instaRecord(me.getParamsCcc()).add();
            }
        };
        newEvents['costcontrolcccgrid toolbar button[action=update]'] = {
            click: function() {
                me.instaRecord(me.getParamsCcc()).edit();
            }
        };
        newEvents['costcontrolcccgrid toolbar button[action=destroy]'] = {
            click: function() {
                me.instaRecord(me.getParamsCcc()).delete();
            }
        };
        newEvents['costcontrolcccgrid'] = {
            selectionchange: function() {
                me.instaRecord(me.getParamsCcc()).selectionChange();
            }
        };
        this.control(newEvents);

        //selectionchange: me.gridSelectionChange


    },
    checkDataLoaded: function(section) {
        var me = this;
        if (section) {
            me.isLoaded[section] = true;
        }
        if (me.isLoaded.CBA && me.isLoaded.CBB && me.isLoaded.GA) {
            if (me.getGridcca().getStore().getCount() > 0) {
                me.getGridcca().getSelectionModel().select(0);


                if (me.isLoaded.CBA && me.isLoaded.CBB && me.isLoaded.GA && me.isLoaded.GB) {
                    if (me.getGridccb().getStore().getCount() > 0) {
                        me.getGridccb().getSelectionModel().select(0);
                    }

                }

            }

        }



    },
    saveCallback: function(data) {
        var me = this;
        var x = {
            success: function() {
                var p = me.getPanel();
                p.down("form").getForm().reset();
                var g = me.getGridcca();
                g.getStore().loadData([], false);

                g.getStore().load();
                me.getGridccb().getStore().loadData([], false);
                me.getGridccb().getStore().load();
                me.getGridccc().getStore().loadData([], false);
                me.getGridccc().getStore().load();
                me.refreshData();
            }
        };
        return x;
    },
    getParamsCca: function() {
        var me = this;
        var params = {
            grid: me.getGridcca(),
            unik: 'code',
            box: 'ccaBoxID',
            fields: ['code', 'description', 'urut', 'kode_bank'],
            id: 'costcontrol_id',
            alias: 'cca'
        };

        return params;

    },
    getParamsCcb: function() {
        var me = this;
        var params = {
            grid: me.getGridccb(),
            unik: 'code',
            box: 'ccbBoxID',
            fields: ['code', 'description', 'urut', 'parent_id'],
            id: 'costcontrol_id',
            alias: 'ccb'
        };

        return params;

    },
    getParamsCcc: function() {
        var me = this;
        var params = {
            grid: me.getGridccc(),
            unik: 'code',
            box: 'cccBoxID',
            fields: ['code', 'description', 'urut', 'parent_id'],
            id: 'costcontrol_id',
            alias: 'ccc'
        };

        return params;

    },
    finalData: function(values) {
        var me = this;
        var p = me.getPanel();
        var f = p.down("form");
        values = me.tools.formHelper(f).fixMoneyUnformat();
        values["cca"] = me.getGridcca().getJson();
        values["ccb"] = me.getGridccb().getJson();
        values["ccc"] = me.getGridccc().getJson();
        values["deleted_id"] = me.tempDeletedId;



        return values;
    },
    resetDeletedId: function() {
        var me = this;
        me.tempDeletedId.cca = '';
        me.tempDeletedId.ccb = '';
        me.tempDeletedId.ccc = '';
    },
    pafCallback: function(recs, form) {
        var me = this;
        me.resetDeletedId();
        var vs = form.getValues();
        var status = vs["status"];
        console.log(recs);
        var payParam = recs.payparamlain.data;
        var p = me.getPanel();

        var f = p.down("form");
        if (payParam) {
            console.log(payParam);

            for (var i in payParam) {


                var el = f.down("[name=" + i + "]");
                if (el) {
                    el.setValue(payParam[i]);
                }
            }


            me.tools.formHelper(f).fixMoneyFormatb(payParam);
        }


        me.getGridcca().doLoad(false, function() {
            me.checkDataLoaded('GA');
        });
        me.getGridccb().doLoad(false, function() {
            me.checkDataLoaded('GB');
        });
        me.getGridccc().doLoad();
        me.refreshData();




        /*
         // get pajak
         //p.setLoading("Please wait...");
         me.getGridpajak().doInit();
         me.getGridpajak().getSelectionModel().setSelectionMode('SINGLE');
         me.tools.ajax({
         params: {
         },
         success: function(data, model) {
         me.tools.wesea({data: data, model: model}, me.getGridpajak()).grid();
         // p.setLoading(false);
         }
         }).read('pajak');
         
         // get bayar
         //p.setLoading("Please wait...");
         me.getGridbayar().doInit();
         me.getGridbayar().getSelectionModel().setSelectionMode('SINGLE');
         me.tools.ajax({
         params: {
         },
         success: function(data, model) {
         me.tools.wesea({data: data, model: model}, me.getGridbayar()).grid();
         // p.setLoading(false);
         }
         }).read('bayar');
         
         
         */


    },
    filterGrid: function() {
        var me = this;
        var bg = me.getGridccb().getStore();


        var reca = me.getGridcca().getSelectedRecord();
        if (reca) {
            bg.clearFilter(true);
            bg.filterBy(function(rec, id) {

                if (rec.raw.costcontrol.parent_id === reca.get("costcontrol_id")) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }



    },
    filterGridc: function() {
        var me = this;
        var g = me.getGridccc().getStore();


        var reca = me.getGridccb().getSelectedRecord();
        if (reca) {
            g.clearFilter(true);
            g.filterBy(function(rec, id) {

                if (rec.raw.costcontrol.parent_id === reca.get("costcontrol_id")) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }

    },
    refreshData: function() {
        var me = this;
        var p = me.getPanel();

        var f = p.down("form");
        // p.setLoading("Loading...");
        me.tools.ajax({
            params: {
            },
            success: function(data, model) {

                me.tools.wesea(data.cca, f.down("[name=ccb_parent_id]")).comboBox();
                me.tools.wesea(data.ccb, f.down("[name=ccc_parent_id]")).comboBox();

                me.checkDataLoaded('CBA');
                me.checkDataLoaded('CBB');


                // p.setLoading(false);
            }
        }).read('parameter');
    },
    fillForm: function(form, status) {
        var me = this;
        var recs = me.paramList;


        if (recs && typeof status === "string") {
            var vs = form.getValues();
            for (var i in vs) {
                if (i !== "status") {
                    form.down("[name=" + i + "]").setValue("");
                }
            }
            form.down("[name=status]");

            // form.down("#statusEmployee").down("[inputValue="+status+"]").checked = true;
            for (var i in recs) {
                var name = recs[i]['generalparameter']['name'];
                name = name.replace(status + "_", "");

                var el = form.down("[name=" + name + "]");
                if (el) {
                    el.setValue(recs[i]['generalparameter']['value']);
                }
            }
        }
    },
    instaRecord: function(params) {
        var me = this;
        var p = me.getPanel();
        var f = p.down("form");
        var g = params.grid;
        var idField = params.id;
        var unik = params.unik; // unique field
        var box = params.box; // box itemId
        var fields = params.fields;
        var alias = params.alias;
        var x = {
            add: function() {


                var code = f.down("#" + box + " [name=" + alias + '_' + unik + "]").getValue();

                // var vs = f.getForm().getValues();
                // console.log(vs);
                if (code.length >= 1) {
                    //if (code.length >= 1 || code > 0) {
                    var fs = {};
                    for (var i in fields) {
                        fs[fields[i]] = f.down("#" + box + " [name=" + alias + '_' + fields[i] + "]").getValue();

                    }
                    g.getStore().add(fs);
                }

            },
            edit: function() {
                var code = f.down("#" + box + " [name=" + alias + '_' + unik + "]").getValue();
                var rec = g.getSelectedRecord();
                if (code.length >= 1 && rec) {
                    //if ((code.length >= 1 || code > 0) && rec) {

                    var fs = {};
                    for (var i in fields) {
                        fs[fields[i]] = f.down("#" + box + " [name=" + alias + '_' + fields[i] + "]").getValue();
                    }

                    rec.beginEdit();
                    rec.set(fs);
                    rec.endEdit();
                }

            },
            delete: function() {



                var rec = g.getSelectedRecord();
                if (rec) {
                    var id = me.tools.intval(rec.get(idField));
                    if (id > 0) {
                        me.tempDeletedId[alias] += id + '~';
                    }
                    g.getStore().remove(rec);
                }

            },
            selectionChange: function() {


                var rec = g.getSelectedRecord();
                if (rec) {
                    for (var i in fields) {
                        f.down("#" + box + " [name=" + alias + '_' + fields[i] + "]").setValue(rec.get(fields[i]));
                    }

                    if (alias === "cca") {
                        f.down("[name=ccb_parent_id]").setValue(rec.get("costcontrol_id"));
                        me.filterGrid();
                        me.filterGridc();
                     
                    }
                    if (alias === "ccb") {
                        f.down("[name=ccc_parent_id]").setValue(rec.get("costcontrol_id"));
                        me.filterGridc();
                    }

                }
            },
            addB: function() {


                var code = f.down("#" + box + " [name=" + alias + '_' + unik + "]").getValue();

                var vs = f.getForm().getValues();
                console.log(vs);
                //  if (code.length >= 1) {
                if (code.length >= 1 || code > 0) {
                    var fs = {};
                    for (var i in fields) {
                        fs[fields[i]] = f.down("#" + box + " [name=" + alias + '_' + fields[i] + "]").getValue();

                    }
                    fs['komponengaji_code'] = me.tools.comboHelper(f.down("#" + box + " [name=" + alias + "_komponengaji_komponengaji_id]")).getField("komponengaji_id", "code");
                    fs['komponengaji_description'] = me.tools.comboHelper(f.down("#" + box + " [name=" + alias + "_komponengaji_komponengaji_id]")).getField("komponengaji_id", "description");
                    g.getStore().add(fs);
                }


            },
            editB: function() {
                var code = f.down("#" + box + " [name=" + alias + '_' + unik + "]").getValue();
                var rec = g.getSelectedRecord();
                //  if (code.length >= 1 && rec) {
                if ((code.length >= 1 || code > 0) && rec) {

                    var fs = {};
                    for (var i in fields) {
                        fs[fields[i]] = f.down("#" + box + " [name=" + alias + '_' + fields[i] + "]").getValue();
                    }
                    fs['komponengaji_code'] = me.tools.comboHelper(f.down("#" + box + " [name=" + alias + "_komponengaji_komponengaji_id]")).getField("komponengaji_id", "code");
                    fs['komponengaji_description'] = me.tools.comboHelper(f.down("#" + box + " [name=" + alias + "_komponengaji_komponengaji_id]")).getField("komponengaji_id", "description");
                    rec.beginEdit();
                    rec.set(fs);
                    rec.endEdit();
                }

            },
        };
        return x;
    },
});