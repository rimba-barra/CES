/*
 * 
 /*
 * Controller2
 * @note : No request models... model di handle masing2 komponen
 * 22 Januari 2014
 * 
 */
Ext.define('Master.library.template.controller.Controller2', {
    extend: 'Master.library.template.controller.Controllernomodelfull',
    whoCallMeID: null,
    shortcut: null,
    pt: null, /* controller lain yang memanggil controller ini*/
    /* add 29 April 2016 */
    constructor: function (configs) {

        this.callParent(arguments);

        if (typeof moment !== 'function') {


            Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/moment.min.js', function () {
            }, function () {
            });
        }

        if (typeof accounting === 'undefined') {

            Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/accounting.min.js', function () {
                /// loaded
                // Settings object that controls default parameters for library methods:
                accounting.settings = {
                    currency: {
                        symbol: "", // default currency symbol is '$'
                        format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
                        decimal: ".", // decimal point separator
                        thousand: ",", // thousands separator
                        precision: 2   // decimal places
                    },
                    number: {
                        precision: 0, // default precision on numbers is 0
                        thousand: ",",
                        decimal: "."
                    }
                }

                EREMS_GLOBAL_PRECISION = 2;


            }, function () {
                /// error
            });
        }


        //added by semy 07/01/2018

        if (typeof shortcut === "undefined") {
            Ext.Loader.injectScriptElement(document.URL + 'app/master/library/shortcut.js', function () {

            }, function () {
                // error load file
            });
        }

    },
    /*@override 22 Jan 2014*/
    dataSearch: function () {
        var me = this;

        var form = me.getFormsearch().getForm();
        var fields = me.getFormsearch().getValues();
        me.getGrid().doInit();
        var store = me.getGrid().getStore();
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);

    },
    /*@override 22 Jan 2014*/
    loadPage: function (store) {
        store.loadPage(1, {
            callback: function (rec, operation, success) {
                if (!me.getGrid().getStore().modelExist) {

                    me.getGrid().attachModel(operation);
                }

            }
        });
        var me = this;
        // me.getGrid().xLoad();
    },
    /*@override 7 Februari 2015*/
    panelAfterRender: function (configs) {
        this.callParent(arguments);
        this.whoCallMeID = null;

    },
    /*@override 22 Jan 2014*/
    mainPanelBeforeRender: function (el) {

        var me = this;
        setupObject(el, me.execAction, me);
    },
    attachModel: function (operation, store, eraseOld) {
        var me = this;
        var data = Ext.JSON.decode(operation.response.responseText);

        store.model.setFields(data.model);
        store.loadData([], false);
        var eo = typeof eraseOld !== "boolean" ? false : eraseOld;
        store.loadRawData(data.data, eo);



        store.modelExist = true;


    },
    /* added 24 february 2014*/
    attachModel_b: function (operation, store, eraseOld) {
        var me = this;
        var data = Ext.JSON.decode(operation.response.responseText);

        store.model.setFields(data.model);
        store.loadData([], false);
        var eo = typeof eraseOld !== "boolean" ? false : eraseOld;



        var result = store.proxy.reader.read(data.data),
                records = result.records;
        for (var x in records) {

            store.add(records[x]);
        }


        /*
         if (result.success) {
         me.totalCount = result.total;
         me.loadRecords(records, append ? me.addRecordsOptions : undefined);
         me.fireEvent('load', me, records, true);
         }
         */
        //store.loadRawData(y,true);





        // store.loadData(data.data,eo);



        store.modelExist = true;


    },
    /* @return void
     * @param string fieldID 
     * @optional string fieldDefault default = "is_default"
     * 
     */
    setDefaultValue: function (el, fieldID, fieldDefault) {
        var idDefault = 0;
        var fd = typeof fieldDefault === "undefined" ? "is_default" : fieldDefault;
        el.getStore().each(function (rec) {

            if (rec !== null) {
                if (rec.get(fd) === true && idDefault === 0) {
                    idDefault = rec.get(fieldID);
                }
            }

        });
        if (idDefault > 0) {
            el.setValue(idDefault);
        }
    },
    /*@edited 13 Maret 2014*/
    formDataAfterRender: function (el) {
        var state = el.up('window').state;
        console.log("[WINDOW STATE] " + state);
        var me = this;
        me.fdar().init();



        if (state == 'create') {
            me.fdar().create();
        } else if (state == 'update') {
            me.fdar().update();


        }
    },
    /*@added 19 Maret 2014*/
    xFormatDate: function (date) {
        if (date) {
            var d = date.getDate();
            var m = (date.getMonth() + 1);
            var y = date.getFullYear();
            return y + "-" + m + "-" + d;
        }
        return "";
    },
    xFormatFloat: function (val) {
        var x = 0;
        x = parseFloat(val);
        x = isNaN(x) ? 0 : x;
        return x;
    },
    /* added 25 Maret 2014 copas dari controllerReport **/
    getComboboxText: function (name, form) {
        var me = this;
        var f = typeof form == "undefined" ? me.getFormdata() : form;
        var text = f.down("[name=" + name + "]").getSelectedText();

        if (text) {
            return text;
        }
        return FALSE;

    },
    gridAfterRender: function (configs) {
        this.callParent(arguments);
        var me = this;
        me.getGrid().down("pagingtoolbar").getStore().reload();

    },
    newActionColumnClick: function (el) {
        var me = this;
        me.formDataShow(el, 'update', me.bindPrefixName + 'Update');
    },
    loadComboBoxStore: function (el) {
        var me, store, index, itemForms, result, widget, storedata, dynamicdata, xtypeform;
        me = this;

        try {
//            var itemForms = el.getForm().getFields().items;
//            for (var x in itemForms) {
//                if (itemForms[x].getXTypes().indexOf("combobox") > -1) {
//                    if (itemForms[x].getStore().storeId != "ext-empty-store") {
//                        itemForms[x].getStore().load({params: {start: 0, limit: 0}});
//                        //console.log(itemForms[x].getStore());
//                    }
//                }
//
//            }        

            //console.log(el);
            // console.log('test aja');
            itemForms = el.getForm().getFields().items;
            for (var index in itemForms) {
                xtypeform = el.getForm().getFields().items[index].xtype;
                result = xtypeform.substr(xtypeform.length - 9);

                if (result.indexOf("combogrid") > -1) {
                    widget = Ext.widget(xtypeform);
                    store = widget.store.storeId;
                    dynamicdata = widget.dynamicdata;
                    // console.log(me.getStore(store).load());
                    //if(dynamicdata < 1){
                    me.getStore(store).load();
                    //}                   
                }

                if (result.indexOf("combobox") > -1) {
                    widget = Ext.widget(xtypeform);
                    store = widget.store.storeId;
                    dynamicdata = widget.dynamicdata;
                    //console.log(me.getStore(store).load());
                    //if(dynamicdata < 1){
                    me.getStore(store).load();
                    //}    
                }
            }
//                     
//            Ext.each(me.stores, function (item, index) {
//                if(index > 0){
//                     store = me.getStore(item);
//                     store.load();
//                }               
//            });
        } catch (err) {
            //console.log(err);
        }
    },
    instantBrowseWindow: function (panel, width, title, state, id, bukaFormSearch, getAr) {
        var me = this;
        var formtitle, formicon, formsearch;


        title = typeof title == 'undefined' ? 'My Window' : title;
        id = typeof id == 'undefined' ? 'myInstantWindow' : id;
        state = typeof state == 'undefined' ? 'create' : state;
        panel = typeof panel == 'undefined' ? 'Panel' : panel;
        width = typeof width == 'undefined' ? 600 : width;
        //bukaFormSearch = typeof bukaFormSearch == 'undefined' ? true : bukaFormSearch;
        formtitle = title;
        formicon = 'icon-form-add';
        var winId = id;

        if (bukaFormSearch) {
            formsearch = 'Master.library.template.view.FormSearchBrowseMaster';
        }
        else {
            formsearch = 'Master.library.template.view.FormSearchBrowse';
        }


        //  console.log('a');
        var win = desktop.getWindow(winId);
        if (win) {
            win.destroy();
        }
        win = desktop.createWindow({
            id: winId,
            title: formtitle,
            iconCls: formicon,
            resizable: true,
            minimizable: true,
            maximizable: true,
            width: width,
            renderTo: Ext.getBody(),
            constrain: true,
            constrainHeader: false,
            modal: true,
            layout: 'fit',
            shadow: 'frame',
            shadowOffset: 10,
            border: false,
            //  items: Ext.create('Master.view.' + me.controllerName + '.' + panel),
            items: [
                {
                    xtype: 'panel',
                    height: 300,
                    layout: {
                        type: 'border'
                    },
                    items: [
                        Ext.create(formsearch),
                        Ext.create('Master.view.' + me.controllerName + '.' + panel)
                    ]
                }
            ],
            state: state
        });
        // console.log(win);




        win.show();
    },
        getCustomRequestComboboxModuleV2: function (module,paramname, val, field, model, submodel, form, param, callback,loading,cache = null) {
        var me = this;
        var mod;
        var f = form;
        f.setLoading('Please wait, load option box.');
        var d = null;
        if(!module) {
            mod = me.controllerName;
        } else {
            mod = module;
        }
        var sm = [];
        if (submodel) {
            sm = Ext.encode(submodel);
        }
        me.tools.ajax({
            params: {
                module: mod,
                paramname: paramname,
                value: val,
                model: model,
                submodel: sm
            },
            cache: cache,
            success: function (data, model, v) {
                try {
                    var obj = [];
                    for (var key in data) {
                        obj = data[key];
                    }
                    if (field) {
                        me.tools.wesea(obj, form.down("[name=" + field + "]")).comboBox();
                    }
                    if (param) {
                        me.afterDataDetailInit(param, f);
                    }
                    if (typeof callback === "function") {
                        callback();
                    }
                }
                catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to load ini, please try re-open menu.");
                     f.setLoading(false);
                }
                 if (!loading) {
                    f.setLoading(false);
                }
               
            }
        }).read('customrequest');
    },
        getCustomRequestComboboxModule: function (module,paramname, val, val2, val3, field, model, submodel, form, param, callback) {
        var me = this;
        var mod;
        var f = form;
        f.setLoading('Please wait, load option box.');
        var d = null;
        if(!module) {
            mod = me.controllerName;
        } else {
            mod = module;
        }
        var sm = [];
        if (submodel) {
            sm = Ext.encode(submodel);
        }
        me.tools.ajax({
            params: {
                module: mod,
                paramname: paramname,
                value: val,
                value2: val2,
                value3: val3,
                model: model,
                submodel: sm
            },
            success: function (data, model, v) {
                try {
                    var obj = [];
                    for (var key in data) {
                        obj = data[key];
                    }
                    if (field) {
                        me.tools.wesea(obj, form.down("[name=" + field + "]")).comboBox();
                    }
                    if (param) {
                        me.afterDataDetailInit(param, f);
                    }
                    if (typeof callback === "function") {
                        callback();
                    }
                }
                catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to load ini, please try re-open menu.");
                }
                f.setLoading(false);
            }
        }).read('customrequest');
    },
        getCustomRequestComboboxV2: function (paramname, val, val2, val3, field, model, submodel, form, param, callback , loading) {
        var me = this;
        var f = form;
        f.setLoading('Please wait, load option box.');
        var d = null;
        var sm = [];
        if (submodel) {
            sm = Ext.encode(submodel);
        }
        me.tools.ajax({
            params: {
                module: me.controllerName,
                paramname: paramname,
                value: val,
                value2: val2,
                value3: val3,
                model: model,
                submodel: sm
            },
            success: function (data, model, v) {
                try {
                    var obj = [];
                    for (var key in data) {
                        obj = data[key];
                    }
                    if (field) {
                        me.tools.wesea(obj, form.down("[name=" + field + "]")).comboBox();
                    }
                    if (param) {
                        me.afterDataDetailInit(param, f);
                    }
                    if (typeof callback === "function") {
                        callback();
                    }
                }
                catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to load ini, please try re-open menu.");
                     f.setLoading(false);
                }
                 if (!loading) {
                    f.setLoading(false);
                }
               
            }
        }).read('customrequest');
    },
    getCustomRequestCombobox: function (paramname, val, field, model, submodel, form, param, callback) {
        var me = this;
        var f = form;
        f.setLoading('Please wait, load option box.');
        var d = null;
        var sm = [];
        if (submodel) {
            sm = Ext.encode(submodel);
        }
        me.tools.ajax({
            params: {
                module: me.controllerName,
                paramname: paramname,
                value: val,
                model: model,
                submodel: sm
            },
            success: function (data, model, v) {
                try {
                    var obj = [];
                    for (var key in data) {
                        obj = data[key];
                    }
                    if (field) {
                        me.tools.wesea(obj, form.down("[name=" + field + "]")).comboBox();
                    }
                    if (param) {
                        me.afterDataDetailInit(param, f);
                    }
                    if (typeof callback === "function") {
                        callback();
                    }
                }
                catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to load ini, please try re-open menu.");
                }
                f.setLoading(false);
            }
        }).read('customrequest');
    },
    getPt: function (f, string) {
        var me = this;
        me.pt = null;
        f.setLoading('Please wait');
        me.tools.ajax({
            params: {
                module: me.controllerName,
            },
            success: function (data, model, v) {
                try {
                    f.down('[name=' + string + ']').setValue(data[0].name);
                    me.pt = data[0];
                }
                catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to load PT, please try re-open menu.");
                }
                f.setLoading(false);
            }
        }).read('getpt');
    },
    formatCurrencyFormdata: function (controller, form) {
        var me, form, itemform, xtypeform, widget, itemname, oldvalue, newvalue, paramform;
        me = controller;
        itemform = form.getForm().getFields().items;
        for (var index in itemform) {
            xtypeform = form.getForm().getFields().items[index].xtype;
            if (xtypeform == 'xmoneyfield') {
                itemname = form.getForm().getFields().items[index].name;
                oldvalue = form.down("[name=" + itemname + "]").getValue();
                newvalue = accounting.formatMoney(oldvalue);
                form.down("[name=" + itemname + "]").setValue(newvalue);
            }
        }
    },
    leadingZero: function (num, size) {
        var s = "000000" + num;
        return s.substr(s.length - size);
    },

    FormDataCustomeShow: function (state, width, title, locationform) {
        var me, winid, win = '';
        me = this;

        winid = 'win-formdatacustome';

        win = desktop.getWindow(winid);

        if (!win) {
            win = desktop.createWindow({
                id: winid,
                title: title,
                iconCls: 'icon-form-add',
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: width,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                state: state,
                listeners: {
                    boxready: function () {
                        win.body.mask('Loading...');
                        var tm = setTimeout(function () {
                            win.add(Ext.create(locationform));
                            win.center();
                            win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);
                    },
                    close: function () {

                    }
                }

            });
        }
        win.show();
    },


   
    instantWindow: function (panel, width, title, state, id, controller) {
        var me = this;
        var formtitle, formicon;


        title = typeof title == 'undefined' ? 'My Window' : title;
        id = typeof id == 'undefined' ? 'myInstantWindow' : id;
        state = typeof state == 'undefined' ? 'create' : state;
        panel = typeof panel == 'undefined' ? 'Panel' : panel;
        width = typeof width == 'undefined' ? 600 : width;
        var controllerFolder = typeof controller === 'undefined' ? me.controllerName : controller;
        formtitle = title;
        formicon = 'icon-form-add';
        var winId = id;



        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: true,
                minimizable: false,
                maximizable: true,
                width: width,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                items: Ext.create('Master.view.' + controllerFolder + '.' + panel),
                state: state
    
            });
        }
        win.show();
    },
    
     //TAMBAHAN UNTUK REPORT
    generateReportParams: function (params) {
        var str = "";
        var me = this;
        for (var x in params) {
            if (me.getFormdata().down("[name=" + x + "]").reportParams) {
                params[x] = params[x] === null ? "" : params[x];
                str += x + "=" + params[x] + "&";
            }

        }
        return str;
    },
    Reportviewer: function (paramList, reportFile) {
        var form, x;
        form = '<form id="Reportform" action="resources/stimulsoftjs/viewer.php?reportfilelocation=' + reportFile + '.mrt" target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
        for (x in paramList) {
            if (paramList[x] === null) {
                paramList[x] = '';
            }
            form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
        }
        form += '<input type="submit" value="post"></form>';
        form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
        return form;
    },
})
