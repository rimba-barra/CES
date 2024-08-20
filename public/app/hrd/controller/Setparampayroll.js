Ext.define('Hrd.controller.Setparampayroll', {
    extend: 'Hrd.library.box.controller.template.Parameters',
    alias: 'controller.Setparampayroll',
    views: [],
    controllerName: 'setparampayroll',
    formWidth: 400,
    refs: [
        {
            ref: 'panel',
            selector: 'setparampayrollpanel'
        },
        {
            ref: 'gridptkp',
            selector: 'setparampayrollptkpgrid'
        },
        {
            ref: 'gridpajak',
            selector: 'setparampayrollpajakgrid'
        },
        {
            ref: 'gridbayar',
            selector: 'setparampayrollbayargrid'
        },
        {
            ref: 'gridtunjangan',
            selector: 'setparampayrolltunjangangrid'
        }
    ],
    bindPrefixName: 'Setparampayroll',
    sizew: {w: 500, h: 500},
    paramList: null,
    tempDeletedId: {
        ptkp: '',
        pajak: '',
        bayar: '',
        tujago: ''
    },
    init: function() {
        this.callParent(arguments);
        var me = this;
        var newEvents = {};
        newEvents['#formSetparampayrollID [name=status]'] = {
            change: function(el, newVal) {
                me.statusOnChange(el);
            }
        };
        newEvents['#tunjanganBoxID [name=tujago_group_group_id]'] = {
            select: function(el, newVal) {
                me.groupTunjanganOnSelect();
            }
        };
        newEvents['setparampayrollptkpgrid toolbar button[action=create]'] = {
            click: function() {
                me.instaRecord(me.getParamsPtkp()).add();
            }
        };
        newEvents['setparampayrollptkpgrid toolbar button[action=update]'] = {
            click: function() {
                me.instaRecord(me.getParamsPtkp()).edit();
            }
        };
        newEvents['setparampayrollptkpgrid toolbar button[action=destroy]'] = {
            click: function() {
                me.instaRecord(me.getParamsPtkp()).delete();
            }
        };
        newEvents['setparampayrollptkpgrid'] = {
            selectionchange: function() {
                me.instaRecord(me.getParamsPtkp()).selectionChange();
            }
        };
        newEvents['setparampayrollpajakgrid toolbar button[action=create]'] = {
            click: function() {
                me.instaRecord(me.getParamsPajak()).add();
            }
        };
        newEvents['setparampayrollpajakgrid toolbar button[action=update]'] = {
            click: function() {
                me.instaRecord(me.getParamsPajak()).edit();
            }
        };
        newEvents['setparampayrollpajakgrid toolbar button[action=destroy]'] = {
            click: function() {
                me.instaRecord(me.getParamsPajak()).delete();
            }
        };
        newEvents['setparampayrollpajakgrid'] = {
            selectionchange: function() {
                me.instaRecord(me.getParamsPajak()).selectionChange();
            }
        };
        newEvents['setparampayrollbayargrid toolbar button[action=create]'] = {
            click: function() {
                me.instaRecord(me.getParamsBayar()).addB();
            }
        };
        newEvents['setparampayrollbayargrid toolbar button[action=update]'] = {
            click: function() {
                me.instaRecord(me.getParamsBayar()).editB();
            }
        };
        newEvents['setparampayrollbayargrid toolbar button[action=destroy]'] = {
            click: function() {
                me.instaRecord(me.getParamsBayar()).delete();
            }
        };
        newEvents['setparampayrollbayargrid'] = {
            selectionchange: function() {
                me.instaRecord(me.getParamsBayar()).selectionChange();
            }
        };
        newEvents['setparampayrolltunjangangrid toolbar button[action=create]'] = {
            click: function() {
                me.instaRecord(me.getParamsTunjangan()).addB();
            }
        };
        newEvents['setparampayrolltunjangangrid toolbar button[action=update]'] = {
            click: function() {
                me.instaRecord(me.getParamsTunjangan()).editB();
            }
        };
        newEvents['setparampayrolltunjangangrid toolbar button[action=destroy]'] = {
            click: function() {
                me.instaRecord(me.getParamsTunjangan()).delete();
            }
        };
        newEvents['setparampayrolltunjangangrid'] = {
            selectionchange: function() {
                me.instaRecord(me.getParamsTunjangan()).selectionChange();
            }
        };
        
        newEvents['setparampayrollpanel [name=perusahaan]'] = {
            blur: function() {
                me.updateAstekValue();
            }
        };
         newEvents['setparampayrollpanel [name=karyawan]'] = {
            blur: function() {
                me.updateAstekValue();
            }
        };
        
        //
        
        this.control(newEvents);

        //selectionchange: me.gridSelectionChange


    },
    updateAstekValue:function(){
        var me = this;
        var p = me.getPanel();
        var f = p.down("form");
        f.down("[name=astek]").setValue(me.tools.floatval(f.down("[name=karyawan]").getValue())+me.tools.floatval(f.down("[name=perusahaan]").getValue()));
    },
    groupTunjanganOnSelect: function() {
        var me = this;
        var g = me.getGridtunjangan();
        var p = me.getPanel();
        var f = p.down("form");
        var val = me.tools.intval(f.down("[name=tujago_group_group_id]").getValue());
        g.getStore().getProxy().setExtraParam("group_group_id", val);
        g.getStore().loadPage(1);

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
                    if (id) {
                        if (id > 0) {
                            me.tempDeletedId[alias] += id + '~';
                        }
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
    getParamsPtkp: function() {
        var me = this;
        var params = {
            grid: me.getGridptkp(),
            unik: 'code',
            box: 'ptkpBoxID',
            fields: ['code', 'description', 'value'],
            id: 'paramptkp_id',
            alias: 'ptkp'
        };

        return params;

    },
    getParamsPajak: function() {
        var me = this;
        var params = {
            grid: me.getGridpajak(),
            unik: 'value',
            box: 'pajakBoxID',
            fields: ['value', 'percent'],
            id: 'parampajak_id',
            alias: 'pajak'
        };

        return params;

    },
    getParamsBayar: function() {
        var me = this;
        var params = {
            grid: me.getGridbayar(),
            unik: 'komponengaji_komponengaji_id',
            box: 'bayarBoxID',
            fields: ['komponengaji_komponengaji_id', 'is_dimuka'],
            id: 'parambayar_id',
            alias: 'bayar'
        };

        return params;

    },
    getParamsTunjangan: function() {
        var me = this;
        var params = {
            grid: me.getGridtunjangan(),
            unik: 'komponengaji_komponengaji_id',
            box: 'tunjanganBoxID',
            fields: ['komponengaji_komponengaji_id', 'value', 'group_group_id'],
            id: 'tunjangangroup_id',
            alias: 'tujago'
        };

        return params;

    },
    statusOnChange: function(el) {
        var me = this;
        var form = me.getPanel().down("form");
        var vs = form.getValues();
        var status = vs["status"];

        me.fillForm(form, status);
    },
    finalData: function(values) {
        var me = this;
        var p = me.getPanel();
        var f = p.down("form");
        values = me.tools.formHelper(f).fixMoneyUnformat();
        values["ptkp"] = me.getGridptkp().getJson();
        values["pajak"] = me.getGridpajak().getJson();
        values["bayar"] = me.getGridbayar().getJson();
        values["tunjangan"] = me.getGridtunjangan().getJson();
        values["deleted_id"] = me.tempDeletedId;

        /// reset
        //   me.resetDeletedId();
        // console.log(me.tempDeletedId.ptkp);

        return values;
    },
    resetDeletedId: function() {
        var me = this;
        me.tempDeletedId.ptkp = '';
        me.tempDeletedId.pajak = '';
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

        // get ptkp
        //p.setLoading("Please wait...");
        me.getGridptkp().doInit();
        me.getGridptkp().getSelectionModel().setSelectionMode('SINGLE');
        me.tools.ajax({
            params: {
            },
            success: function(data, model) {
                me.tools.wesea({data: data, model: model}, me.getGridptkp()).grid();
                // p.setLoading(false);
            }
        }).read('ptkp');

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

        // get tunjangan group
        //p.setLoading("Please wait...");
        me.getGridtunjangan().doInit();
        me.getGridtunjangan().getSelectionModel().setSelectionMode('SINGLE');
        me.getGridtunjangan().doLoad();
        /*  me.tools.ajax({
         params: {
         },
         success: function(data, model) {
         me.tools.wesea({data: data, model: model}, me.getGridtunjangan()).grid();
         // p.setLoading(false);
         }
         }).read('tunjangangroup');*/

        p.setLoading("Loading...");
        me.tools.ajax({
            params: {
            },
            success: function(data, model) {

                me.tools.wesea(data.komponengaji, f.down("[name=bayar_komponengaji_komponengaji_id]")).comboBox();
                me.tools.wesea(data.komponengaji, f.down("[name=tujago_komponengaji_komponengaji_id]")).comboBox();
                me.tools.wesea(data.group, f.down("[name=tujago_group_group_id]")).comboBox();
                p.setLoading(false);
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
    }

});