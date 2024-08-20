Ext.define('Cashier.library.BrowseCashierV2', {
    controller: null,
    info      : {
        window: {
            title: 'Browse Data',
            state: 'view',
            id   : 'browseDataCashier'
        }
    },
    view            : '',
    localStore      : null,
    el              : null,
    mode_read       : null,
    loadRecordPrefix: null,
    specialPrefix   : null,
    bukaFormSearch  : null,
    dataflow        : null,
    paramproxy      : null,
    projectpt       : null,
    project         : null,
    pt              : null,
    prefix          : null,
    callback        : null,
    kelsub_id       : null,
    department_id   : null,
    kasbankidcsg    : null,
    fromdate        : null,
    todate          : null,
    rangeid         : null,
    allpayment      : null,
    limit           : null,
    init            : function (data) {
        var me = this;
        if (typeof data !== "object")
            return;
        if (typeof data.controller !== "undefined") {
            me.controller = data.controller;
        }
        if (typeof data.view !== "undefined") {
            me.view = data.view;
        }
        if (typeof data.el !== "undefined") {
            me.el = data.el;
        }
        if (typeof data.pt !== "undefined") {
            me.pt = data.pt;
        }
        if (typeof data.project !== "undefined") {
            me.project = data.project;
        }
        if (typeof data.projectpt !== "undefined") {
            me.projectpt = data.projectpt;
        }
    },
    showWindow: function(cb, callback){
        var me = this;
        if (me.controller === null) {
            console.log("[BROWSE] Controller tidak ada");
            return;
        }
        var c = me.controller;
        var w = me.info.window;
        c.instantBrowseWindow(me.view, 1300, w.title, w.state, w.id, true, me.pt);
        var win = desktop.getWindow(w.id);
        var g   = win.down('grid');
        if(g){
            var fsFunc = g.getFormSearch;
            if (typeof fsFunc === 'function') {
                var fsp = win.down("#MySuperBrowseWindow");
                
                if (fsp) {
                    var items = fsFunc();
                    for (var i in items) {
                        fsp.add(items[i]);
                    }

                    c.tools.ajax({
                        params: {
                            dataflow  : me.dataflow,
                            module    : me.controller.controllerName,
                            pt_id     : me.pt,
                            project_id: me.project,
                            kelsub_id : me.kelsub_id,
                        },
                        success: function (data, model) {
                            var f  = win.down("form");
                            var vs = f.getValues();
                            if (vs) {
                                var items = f.items.items;
                                for (var i in items) {
                                    var el = f.down("[name=" + items[i]['name'] + "]");
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

                g.doInit();
                var store = g.getStore();
                store.getProxy().setExtraParam('page', 1);
                store.getProxy().setExtraParam('limit', 25);
                if (me.projectpt){
                    store.getProxy().setExtraParam('projectpt_id', me.projectpt);
                }
                 if (me.project){
                    store.getProxy().setExtraParam('project_id', me.project);
                }        
                if (me.pt){
                    store.getProxy().setExtraParam('pt_id', me.pt);
                }    
                Ext.Ajax.timeout = 300000;

                store.loadPage(1, {
                    callback: function (rec, op) {
                        g.attachModel(op);
                        if (store.getCount() > 0) {
                            g.down("button[action=select]").setDisabled(false);
                            g.down("pagingtoolbar").doRefresh();
                            g.getView().refresh();
                        }
                        if (typeof cb === "function") {
                            cb();
                        }
                    }
                });
    
                // Ext.Ajax.request({
                //     url   : 'cashier/vdrequest/read',
                //     method: 'POST',
                //     async : false,
                //     params : {
                //         hideparam : 'getreward',
                //         project_id: me.project,
                //         pt_id     : me.pt,
                //         start     : 1,
                //         limit     : 25
                //     },
                //     success: function (response) {
                //         var data    = Ext.JSON.decode(response.responseText);
                //         var arrData = []
                //         if (data.counter > 0) {
                //             for (var index = 0; index < data.data.length; index++) {
                //                 arrData.push(data.data[index]);
                //             }

                //             store.loadData(arrData, false);
                            
                //         }
                //     }
                // });
                // if (typeof cb === "function") {
                //     cb();
                // }

            }
        }        
    }
});