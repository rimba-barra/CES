Ext.define('Erems.library.Browse', {
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
    //afterLoadFn: null,
    init: function(data) {
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

    },
    afterLoadFn:function(rec,store,grid){
        var me = this;
        grid.down("pagingtoolbar").doRefresh();
    },
    /* edited 11/02/2015 */
    showWindow: function() {
        var me = this;
        if (me.controller === null) {
            console.log("[BROWSE] Controller tidak ada");
            return;
        }
        var c = me.controller;
        var w = me.info.window;
        c.instantBrowseWindow(me.view, 800, w.title, w.state, w.id);
        var win = desktop.getWindow(w.id);
        var g = win.down("grid");
        if (g) {
            var fsFunc = g.getFormSearch;
            if(typeof fsFunc ==='function'){
                var fsp = win.down("#MySuperBrowseWindow");
              
                if(fsp){
                    var items = fsFunc();
                    for(var i in items){
                        fsp.add(items[i]);
                    }
                    
                    c.tools.ajax({
                        params: {
                            // purchaseletter_id: plId
                        },
                        success: function(data, model) {
                            var f = win.down("form");
                            var vs = f.getValues();
                          
                            if(vs){
                               var items = f.items.items;
                               for(var i in items){
                                   var el = f.down("[name="+items[i]['name']+"]");
                                  
                                   if(el){
                                        var dataBinder = el.dataBinder;
                                        
                                       if(el.getXType()==='combobox' && dataBinder){
                                           c.tools.wesea(data[dataBinder],el).comboBox(true);
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
		
            Ext.Ajax.timeout = 600000;
            store.loadPage(1,{
                callback: function(rec, op) {

                    g.attachModel(op);

                    if (store.getCount() > 0) {
                        g.down("button[action=select]").setDisabled(false);
                    }
                    if (typeof me.afterLoadFn === "function") {
                        me.afterLoadFn(rec, store,g);
                    }



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
    
        var form = fsp.getForm().getFields().items;
        me.textfield = Ext.ComponentQuery.query('[xtype=textfield]', form);
        return me.textfield;


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
    selectItem: function(callbackFunc) {
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
            win.body.mask("Loading unit info...");

            var idProperty = gs.getProxy().getReader().getIdProperty();
            //var loadParams = {};
            //loadParams[idProperty] = gs.getAt(p).get(idProperty);
            var loadParams = me.selectItemFinalData(gs.getAt(p));
            loadParams[idProperty] = gs.getAt(p).get(idProperty);
            s.load({
                params: loadParams,
                callback: function(rec, op) {
                    c.attachModel(op, s);
                    win.body.unmask();
                    if (s.getCount() > 0) {

                        var rec = s.getAt(0);
                        if (me.el) {
                            if (!me.loadRecordPrefix) {

                                me.el.up("form").loadRecord(rec);
                                if (me.specialPrefix) {
                                    var d = rec.raw[me.specialPrefix];
                                    if (d) {

                                        var f = me.el.up("form");
                                        for (var x in d) {
                                            var field = f.down("[name=" + me.specialPrefix + "_" + x + "]");
                                            if (field) {
                                                field.setValue(d[x]);
                                            }
                                        }
                                    }
                                }
                            } else {
                                for (var x in rec.data) {
                                    var field = me.el.up("form").down("[name=" + me.loadRecordPrefix + "_" + x + "]");
                                    if (field) {
                                        field.setValue(rec.data[x]);
                                    }

                                }
                            }

                        } else {
                            console.log("[Browse] el is undefined (Tombol yang eksekusi class ini)");
                        }
                        if (typeof callbackFunc === "function") {
                            callbackFunc(rec);
                        }
                        win.destroy();

                    } else {
                        Ext.Msg.alert("Alert", "Record not found");
                    }


                }
            });
        }
    },
    selectItemFinalData:function(rec){
        return {};
    },
    selectItemB: function(callbackFunc) {
        var me = this;
        var c = me.controller;
        var w = me.info.window;
        var win = desktop.getWindow(w.id);
        var g = win.down("grid");
        var gs = g.getStore();
        
        if(typeof callbackFunc==="function"){
            callbackFunc(g,gs,g.getSelectionModel().getSelection());
        }
        
        
        
        
    }
});