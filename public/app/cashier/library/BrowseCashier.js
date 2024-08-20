Ext.define('Cashier.library.BrowseCashier', {
    controller: null,
    info: {
        window: {
            title: 'Browse Data',
            state: 'view',
            id: 'browseDataWindow'
        }
    },
    view: '',
    localStore: null,
    el: null, /* element yang mengeksekusi class ini */
    mode_read: null,
    loadRecordPrefix: null,
    specialPrefix: null,
    bukaFormSearch: null,
    dataflow: null,
    paramproxy: null,
    pt: null,
    project: null,
    prefix : null,
    callback :null,
    kelsub_id:null,
    department_id:null,
    kasbankidcsg:null,
    fromdate:null,
    todate:null,
    rangeid:null,
    allpayment:null,
    limit: null,
    //afterLoadFn: null,
    init: function (data) {
        var me = this;
        if (typeof data !== "object")
            return;
        if (typeof data.controller !== "undefined") {
            me.controller = data.controller;
        }
        if (typeof data.view !== "undefined") {
            me.view = data.view;
        }
        if (typeof data.localStore !== "undefined") {
            me.localStore = data.localStore;
        }
        if (typeof data.el !== "undefined") {
            me.el = data.el;
        }
        if (typeof data.mode_read !== "undefined") {
            me.mode_read = data.mode_read;
        }
        if (typeof data.loadRecordPrefix !== "undefined") {
            me.loadRecordPrefix = data.loadRecordPrefix;
        }
        if (typeof data.specialPrefix !== "undefined") {
            me.specialPrefix = data.specialPrefix;
        }
        if (typeof data.bukaFormSearch !== "undefined") {
            me.bukaFormSearch = data.bukaFormSearch;
        }
        if (typeof data.paramproxy !== "undefined") {
            me.paramproxy = data.paramproxy;
        }
        if (typeof data.pt !== "undefined") {
            me.pt = data.pt;
        }
        if (typeof data.project !== "undefined") {
            me.project = data.project;
        }
        if (typeof data.dataflow !== "undefined") {
            me.dataflow = data.dataflow;
        }
        if (typeof data.kelsub_id !== "undefined") {
            me.kelsub_id = data.kelsub_id;
        }
        if (typeof data.department_id !== "undefined") {
            me.department_id = data.department_id;
        }
         if (typeof data.prefix !== "undefined") {
            me.prefix = data.prefix;
        }
          if (typeof data.fromdate !== "undefined") {
            me.fromdate = data.fromdate;
        }
          if (typeof data.todate !== "undefined") {
            me.todate = data.todate;
        }
          if (typeof data.rangeid !== "undefined") {
            me.rangeid = data.rangeid;
        }
          if (typeof data.kasbank_id !== "undefined") {
            me.kasbankidcsg = data.kasbank_id;
        }
        if (typeof data.allpayment != "undefined") {
            me.allpayment = data.allpayment;
        }
        if (typeof data.callback === "function") {
            data.callback();
            me.callback  = data.callback;
        }
        if (typeof data.limit != "undefined") {
            me.limit = data.limit;
        }
    },
    afterLoadFn: function (rec, store, grid) {
        var me = this;
        grid.down("pagingtoolbar").doRefresh();
    },
    /* edited 11/02/2015 */
    showWindow: function (cb,callback) {
        var me = this;
        if (me.controller === null) {
            console.log("[BROWSE] Controller tidak ada");
            return;
        }
        var c = me.controller;
        var w = me.info.window;
        c.instantBrowseWindow(me.view, 1300, w.title, w.state, w.id, me.bukaFormSearch, me.pt);
        var win = desktop.getWindow(w.id);
        var g = win.down("grid");
        //console.log(win);
        if (g) {
            // console.log(g);
            var fsFunc = g.getFormSearch;
            if (typeof fsFunc === 'function') {
                var fsp = win.down("#MySuperBrowseWindow");
                //console.log("yyyy");
                if (fsp) {
                    var items = fsFunc();
                    for (var i in items) {
                        fsp.add(items[i]);
                    }

                    c.tools.ajax({
                        params: {
                            // purchaseletter_id: 1
                            dataflow: me.dataflow,
                            module:me.controller.controllerName,
                            pt_id:me.pt,
                            project_id:me.project,
                            kelsub_id:me.kelsub_id,
                        },
                        success: function (data, model) {
                            var f = win.down("form");
                            var vs = f.getValues();
                            // console.log(vs);
                            if (vs) {
                                var items = f.items.items;
                                for (var i in items) {
                                    var el = f.down("[name=" + items[i]['name'] + "]");
                                    // console.log(el);
                                    if (el) {
                                        var dataBinder = el.dataBinder;

                                        if (el.getXType() === 'combobox' && dataBinder) {
                                            c.tools.wesea(data[dataBinder], el).comboBoxv2(true, callback);
                                        }
                                    }
                                }
                            }
                        }
                    }).read('browsedetail');
                }
            }

            g.doInit();
            var store = g.getStore();
            if (me.dataflow) {
                store.getProxy().setExtraParam('dataflow', me.dataflow);
            }
            //console.log(me.kelsub_id);
            if (me.dataflow) {
                store.getProxy().setExtraParam('kelsub_kelsub_id', me.kelsub_id);
            }
             if (me.department_id) {
                store.getProxy().setExtraParam('department_id', me.department_id);
            }
            if (me.pt){
                store.getProxy().setExtraParam('pt_id', me.pt);
            }
             if (me.project){
                store.getProxy().setExtraParam('project_id', me.project);
            }

             if (me.prefix){
                store.getProxy().setExtraParam('prefix_id', me.prefix);
            }
              if (me.fromdate){
                store.getProxy().setExtraParam('fromdate', me.fromdate);
            }
              if (me.todate){
                store.getProxy().setExtraParam('todate', me.todate);
            }
              if (me.rangeid){
                store.getProxy().setExtraParam('range_id', me.rangeid);
            }
              if (me.kasbankidcsg){
                store.getProxy().setExtraParam('kasbank_id', me.kasbankidcsg);
            }
            if (me.allpayment){
                store.getProxy().setExtraParam('allpayment', me.allpayment);
            }
           // store.getProxy().setExtraParam('start', 0);
            store.getProxy().setExtraParam('page', 1);
            
            if (me.limit){
                store.getProxy().setExtraParam('limit', me.limit);
                store.pageSize = me.limit;
            }else{
                store.getProxy().setExtraParam('limit', 25);
                store.pageSize = 25;
            }
            
            Ext.Ajax.timeout = 300000;
            store.loadPage(1, {
                callback: function (rec, op) {
                    g.attachModel(op);
                    if (store.getCount() > 0) {
                        g.down("button[action=select]").setDisabled(false);
                        if (me.bukaFormSearch) {
                            g.down("pagingtoolbar").doRefresh();   
                        }
                        g.getView().refresh();
                      //  g.down("pagingtoolbar").
                    }
                    if (typeof cb === "function") {
                        cb();
                    }
//                    if (typeof me.afterLoadFn === "function") {
//                        me.afterLoadFn(rec, store, g);
//                    }
                }
            });

            if (me.localStore) {
                c.localStore[me.localStore] = c.instantStore({
                    id: c.controllerName + '' + me.localStore + 'Store',
                    extraParams: {
                        mode_read: me.mode_read,
                    }
                });
            } else {
                console.log("[Browse] localStore is undefined");
            }



        }


        c.browseHandler = me;


    },
    // marked 11 feb 2015
    /*
     showWindow: function() {
     var me = this;
     if (me.controller === null) {
     console.log("[BROWSE] Controller tidak ada");
     return;
     }
     var c = me.controller;
     var w = me.info.window;
     c.instantWindow(me.view, 800, w.title, w.state, w.id);
     var win = desktop.getWindow(w.id);
     var g = win.down("grid");
     if (g) {
     g.doInit();
     var store = g.getStore();
     store.load({
     callback: function(rec, op) {
     
     g.attachModel(op);
     
     store.loadPage(1, {
     callback: function(records, operation, success) {
     if (store.getCount() > 0) {
     g.down("button[action=select]").setDisabled(false);
     }
     if (typeof me.afterLoadFn === "function") {
     me.afterLoadFn(rec, store);
     }
     }
     });
     
     
     
     }
     });
     
     if (me.localStore) {
     c.localStore[me.localStore] = c.instantStore({
     id: c.controllerName + '' + me.localStore + 'Store',
     extraParams: {
     mode_read: me.mode_read
     }
     });
     } else {
     console.log("[Browse] localStore is undefined");
     }
     
     
     
     }
     
     
     c.browseHandler = me;
     
     
     },
     
     */
    selectItem: function (callbackFunc) {

        var me = this;
        var c = me.controller;
        var w = me.info.window;
        var win = desktop.getWindow(w.id);
        var g = win.down("grid");
        var gs = g.getStore();
        var p = g.getSelectedRow();

        // var p = g.getSelectionModel().getSelection()[0]['index'];

        var s = c.localStore[me.localStore];

        if (p > -1) {
            // win.body.mask("Loading unit info...");

            var idProperty = gs.getProxy().getReader().getIdProperty();
            //var loadParams = {};
            //loadParams[idProperty] = gs.getAt(p).get(idProperty);
            var loadParams = me.selectItemFinalData(gs.getAt(p));
            loadParams[idProperty] = gs.getAt(p).get(idProperty);
            s.load({
                params: loadParams,
                callback: function (rec, op) {
                    c.attachModel(op, s);
                    //win.body.unmask();

                    var rec = s.getAt(0);
                    if (me.el) {


                    } else {
                        console.log("[Browse] el is undefined (Tombol yang eksekusi class ini)");
                    }
                    if (typeof callbackFunc === "function") {
                        callbackFunc(rec);
                    }
                    //win.destroy();




                }
            });
        }
    },
    selectItemFinalData: function (rec) {
        return {};
    },
    selectItemB: function (callbackFunc) {
        var me = this;
        var c = me.controller;
        var w = me.info.window;
        var win = desktop.getWindow(w.id);
        var g = win.down("grid");
        var gs = g.getStore();

        if (typeof callbackFunc === "function") {
            callbackFunc(g, gs, g.getSelectionModel().getSelection());
        }




    }
});
