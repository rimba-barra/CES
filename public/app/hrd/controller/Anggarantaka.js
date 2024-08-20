Ext.define('Hrd.controller.Anggarantaka', {
    extend: 'Hrd.library.box.controller.template.Masterdata',
    alias: 'controller.Anggarantaka',
    views: [],
    controllerName: 'anggarantaka',
    formWidth: 400,
    refs: [
        {
            ref: 'panel',
            selector: 'anggarantakapanel'
        }
    ],
    bindPrefixName: 'Anggarantaka',
    sizew: {w: 500, h: 500},
    paramList: null,
    tipeTaka: null,
    init: function() {
        this.callParent(arguments);
        var me = this;
        var newEvents = {};
        newEvents['#formAnggarantakaID [name=status]'] = {
            change: function(el, newVal) {
                me.statusOnChange(el);
            }
        };
        this.control(newEvents);


    },
    statusOnChange: function(el) {
        var me = this;
        var form = me.getPanel().down("form");
        var vs = form.getValues();
        var status = vs["status"];

        me.fillForm(form, status);
    },
    pafCallback: function() {
        var me = this;
        var form = me.getFormdata();
        /* loading components */
        var p = me.getPanel();
        p.setLoading();
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                // me.pafCallback(recs,f);
                me.tools.wesea(data.group, form.down("[name=group_group_id]")).comboBox();
                me.gridLoad();

                var tipe = data["tipetandakasih"]["data"];
                me.tipeTaka = tipe;
                if (tipe) {
                    for (var i in tipe) {
                        form.add(form.buatContainer(tipe[i]['name'], tipe[i]['tipetandakasih_id']));
                    }
                } else {
                    console.log("Tidak ada tipe tanda kasih");
                }



            }
        }).read('detail');
    },
    gridSelectionChange: function() {
        var me = this;
        var g = me.getGrid();
        var p = me.getPanel();
        var rec = g.getSelectedRecord();
        var f = me.getFormdata();
        f.getForm().reset();
        if (rec) {

            f.loadRecord(rec);
            p.setLoading("Please wait...");
            me.tools.ajax({
                params: {
                    group_id: rec.get("group_group_id")
                },
                success: function(data, model) {
                    console.log(data);
                    var tipe = me.tipeTaka;
                    if (tipe) {
                        for (var i in tipe) {
                            var tipeId = tipe[i]['tipetandakasih_id'];
                            for (var j in data) {

                                if (tipeId === data[j]['anggarantandakasih']['tipetandakasih_tipetandakasih_id']) {
                                    f.down("[name=" + tipeId + "_value]").setValuem(data[j]['anggarantandakasih']['value']);
                                    f.down("[name=" + tipeId + "_plus]").setValue(data[j]['anggarantandakasih']['plus']);
                                }
                            }

                        }

                    }
                    p.setLoading(false);
                }
            }).read('listanggaran');
        }
    },
    fillForm: function(form, status) {
        var me = this;
        console.log("jalan");

        return;

        /*
         var recs = me.paramList;
         
         
         if (recs && typeof status==="string") {
         var vs = form.getValues();
         for(var i in vs){
         if(i !=="status"){
         form.down("[name="+i+"]").setValue("");
         }
         }
         form.down("[name=status]");
         
         // form.down("#statusEmployee").down("[inputValue="+status+"]").checked = true;
         for (var i in recs) {
         var name = recs[i]['generalparameter']['name'];
         name = name.replace(status+"_","");
         
         var el = form.down("[name=" + name + "]");
         if (el) {
         el.setValue(recs[i]['generalparameter']['value']);
         }
         }
         }
         */
    },
    crudbrFuncdestroy: function() {
        var me = this;
        var p = me.getPanel();
        var x = {
            use: true,
            fn: function(rec) {
                p.setLoading("Please wait...");

                me.tools.ajax({
                    params: {
                        group_id: rec.get("group_group_id")
                    },
                    success: function(data, model) {
                        var suc = data['others'][0][0]['SUCCESS'];
                        if (suc) {
                            me.tools.alert.info('Data has been deleted');
                            me.getGrid().getStore().loadPage(1);
                        } else {
                            me.tools.alert.warning('Failed');
                        }
                        p.setLoading(false);
                    }
                }).read('delete');

            }
        };
        return x;

    },
});