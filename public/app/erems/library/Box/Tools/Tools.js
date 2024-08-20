Ext.define('Erems.library.box.tools.Tools', {
    config: null,
    constructor: function(options) {
        Ext.apply(this, options || {});
    },
    filterElement: function(val, filteredStore, prefixTable, field) {
        var me = this;
        var s = filteredStore;
        s.clearFilter(true);
        if (val === 999) {
            s.filterBy(function(rec, id) {
                return true;
            });
            return;
        }
        if (s.getCount() > 0 && val) {

            s.filterBy(function(rec, id) {
                var field = rec.raw[prefixTable];
                if (!field) {
                    return false;
                }

                if (rec.raw[prefixTable][field] === val) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }
    },
    validDateInput: function(v, config) {

        if (v > config.MAX_YEAR || v < config.MIN_YEAR) {
            v = (new Date()).getFullYear();
        }
        return v;


    },
    /* added 1 July 2014*/
    formEach: function(form, xtype, callback) {


        if (typeof callback !== "function") {
            return;
        }

        var fields = form.getValues();

        for (var d in fields) {
            var el = form.down("[name=" + d + "]");
            if (el.getXType() === xtype) {
                callback(el);
            }
        }

    },
    dateFieldInit: function(form, config) {

        var me = this;
        // set format date field inside form  
        me.formEach(form, 'datefield', function(el) {
            el.format = config.DATE_FORMAT;
            el.submitFormat = config.DATE_SUBMITFORMAT;

        });

    },
    rangedDateEventsObjects: function(fromName, toName) {
        var x = {
            from: {
                name: fromName,
                select: function(el) {
                    var f = el.up("form");
                    f.down("[name=" + toName + "]").setValue(el.getValue());
                }
            },
            to: {
                name: toName,
                select: function(el) {
                    var f = el.up("form");
                    var fromVal = f.down("[name=" + fromName + "]").getValue();
                    if (el.getValue() < fromVal) {
                        el.setValue(fromVal);
                    }

                }
            }
        };
        return x;
    },
    /// added 11 Agustus 2014
    inputMonthYear: function(val) {
        var hasil = {'valid': false, 'msg': 'Invalid', 'date': null};
        var me = this;

        if (val.length < 7) {
            hasil.msg = 'Minimum 7 characters';
        } else {
            var d = val.split("/");
            if (d.length === 2) {

                var newDate = new Date();
                var month = parseInt(d[0]);
                var year = parseInt(d[1]);
                if (!isNaN(month) && !isNaN(year)) {
                    if ((month > 0 && month <= 12) && (year > me.config.MIN_YEAR && year <= me.config.MAX_YEAR)) {
                        hasil.valid = true;
                        var d = new Date();
                        d.setMonth(month);
                        d.setFullYear(year);
                        hasil.date = d;
                    } else {
                        hasil.msg = 'Month or Year is invalid';
                    }

                } else {

                }
            } else {
                hasil.msg = 'Invalid format';
            }

        }
        return hasil;
    },
    /* added 26 Sept 2014*/
    inputComboCode: function(name, cbf, prefix, formAlias) {
        var me = this;
        var x = {
            name: name,
            change: function(el) {
                /*  var s = el.getStore();
                 var index = s.findExact(cbf.v,el.getValue());
                 
                 prefix = prefix?prefix+"_":"";
                 
                 var cEl = Ext.get("[name="+prefix+''+cbf.c+"]");
                 if(cEl){
                 cEl.setValue(s.getAt(index).get(cbf.c));
                 }
                 */
            }
        };
        return x;
    },
    fillComboCode: function(form, cbf, prefix) {
        prefix = prefix ? prefix + "_" : "";
       // console.log(prefix + "" + cbf.v);
        var el = form.down("[name=" + prefix + "" + cbf.v + "]");
        if (!el)
            return;
        var s = el.getStore();
        if (!s)
            return;
        var rec = s.getAt(s.findExact(cbf.v, el.getValue()));
        if (!rec)
            return;
        form.down("[name=" + prefix + "" + cbf.c + "]").setValue(rec.get(cbf.c));
    },
    comboboxOnSelect: function(el, displayField, displayElement) {


    },
    inputHoursObjects: function(name) {
        var me = this;
        var x = {
            name: name,
            keyup: function(el) {
                var maxChar = 8;
                if (me.config) {
                    //  maxChar = me.config.MAX_HOUR_LEN + 1 + me.config.MAX_MINUTE_LEN+1+2;
                }

                var val = el.getValue();
                if (val.strlen > maxChar) {
                    val = val.slice(0, maxChar);
                }
                var newStr = '';
                var valCount = 0;
                var intStr = '';
                for (var i = 0; i < val.length; i++) {
                    var intVal = parseInt(val.charAt(i));
                    if (!isNaN(intVal)) {
                        intStr += intVal + '';
                    }
                }
                var titikDua = "";
                if (val.length == 2) {
                    titikDua = "";
                } else if (val.length == 5) {
                    titikDua = "";

                } else {
                    titikDua = ":";
                }
                for (var i = 0; i < intStr.length; i++) {

                    if (i == 1) {
                        newStr += intStr.charAt(i) + "" + titikDua;
                    } else if (i == 3) {
                        newStr += intStr.charAt(i) + "" + titikDua;
                    } else {
                        newStr += intStr.charAt(i);
                    }
                }

                el.setValue(newStr.slice(0, 8));

                // el.selectText(el.selectionStart,el.selectionStart);
            },
            blur: function(el, the, eOpts) {
                var v = el.getValue();
                var len = v.length;
                var maxNumber = 6;

                v = v.replace(/:/g, "");
                len = v.length;
                var restNumber = maxNumber - len;

                for (var i = 0; i < restNumber; i++) {
                    v += '0';
                }
                var strAr = '';
                var strArr = [];
                strArr.push(v.substr(0, 2));
                strArr.push(v.substr(2, 2));
                strArr.push(v.substr(4, 2));
                for (var x in strArr) {
                    strAr += x < 2 ? strArr[x] + ':' : strArr[x];
                }

                el.setValue(strAr);

            }

        };
        return x;
    },
    alert: {
        warning: function(msg) {
            var tm = setTimeout(function(){ 
                Ext.Msg.show({
                    title   : 'Warning',
                    msg     : 'Warning: ' + msg,
                    icon    : Ext.Msg.WARNING,
                    buttons : Ext.Msg.OK
                });

                clearTimeout(tm);
            }, 10);
        },
        error: function(msg) {
            var tm = setTimeout(function(){ 
                Ext.Msg.show({
                    title   : 'Failure',
                    id      : 'AllertErrorWinID',
                    msg     : 'Error: ' + msg,
                    icon    : Ext.Msg.ERROR,
                    buttons : Ext.Msg.OK,
                });

                clearTimeout(tm);
            }, 10);

        },
        info: function(msg, buttonFn) {
            var tm = setTimeout(function(){ 
                Ext.Msg.show({
                    title   : 'Success',
                    msg     : msg,
                    icon    : Ext.Msg.INFO,
                    buttons : Ext.Msg.OK,
                    fn      : function() {
                        if (typeof buttonFn === 'function') {
                            buttonFn();
                        }
                    }
                });

                clearTimeout(tm);
            }, 10);
        }
    },
    insSave: function(params) {
        var me = this;
        var f = params.form;

        /* main grid for get proxy create url like
         * => 'hrd/absentrecord/create'
         * */
        var urlCreate = null;
        if (params.urlCreate) {
            urlCreate = params.urlCreate;
        } else {
            var mainGrid = params.mainGrid;
            var s = params.store ? params.store : mainGrid.getStore();
            urlCreate = s.getProxy().api.create;
        }

        var data = params.finalData(f.getValues());
        var paramsAjax = {
            mode_create: params.modeCreate,
            data: data,
        };
        f.setLoading("Please wait.... saving your data");

        Ext.Ajax.request({
            url: urlCreate,
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);

                if (info.msg === "SUCCESS") {



                    me.alert.info("Success", params.success);

                } else {

                    me.alert.error(info.msg);

                }
                f.setLoading(false);

            },
            params: {data: Ext.encode(paramsAjax)}

        });
    },
    /* added 5 agustus 2014
     simplify Ext Ajax Request
     **/

    ajax: function(params) {
        var me = this;
        var func = {
            update: function(zendAction, successText, paramsAjax) {

                /// coming soon
            },
            create: function() {
                var f = null;
                var paramsCreate = null;
                if (!params.form) {
                   // console.log("Form tidak ada [ajax create]");
                    return;

                }
                f = params.form;
                var vs = f.getValues();
                if (typeof params.finalData === 'function') {
                    paramsCreate = params.finalData(vs);
                } else {
                    paramsCreate = vs;
                }
                f.setLoading("Please wait...");
                this.callAjax({
                    zendAction: 'create',
                    params: {data: Ext.encode(paramsCreate)},
                    successCallback: function(info) {
                        if (info.msg === "SUCCESS") {

                            me.alert.info("Success", params.success);

                        } else {

                            me.alert.error(info.msg);
                        }
                        f.setLoading(false);
                        if (typeof params.callback === 'function') {
                            params.callback(info);
                        }
                    }
                });
            },
            read: function(modeRead) {
                var paramsRead = null;
                if (params) {
                    if (params.params) {
                        paramsRead = params.params;
                    }


                }
                paramsRead['mode_read'] = modeRead;

                this.callAjax({
                    zendAction: 'read',
                    params: paramsRead,
                    successCallback: function(info) {
                        if (typeof params.success === 'function') {
                            params.success(info.data, info.model);
                        }
                    }
                });
            },
            callAjax: function(params) {
                var zendAction = params.zendAction;

                var ajaxParams      = params.params;
                var successCallback = params.successCallback;

                Ext.Ajax.request({
                    url     : me.config.moduleName + '/' + me.config._controllerName + '/' + zendAction,
                    params  : ajaxParams,
                    async   : false,
                    success : function(response) {

                        var info = Ext.JSON.decode(response.responseText);
                        if (info) {
                            if (typeof successCallback === 'function') {
                                successCallback(info);
                            }
                        } else {
                            me.alert.error("Error when processing result.");
                        }

                    },
                    failure: function(){
                         me.alert.error("Server taking too long to respond.");
                    }
                });
            }
        };
        return func;


    },
    /* added 7 Agustus 2014*/
    comboHelper: function(comboBox) {
        var x = {
            setFirstValue: function() {
                var store = comboBox.getStore();

                var record = store.getAt(0);
                comboBox.setValue(record);
            },
            getText: function(comboBoxField) {
                var index = comboBox.getStore().findExact(comboBoxField.v, comboBox.getValue());
                if (index > -1) {
                    return comboBox.getStore().getAt(index).get(comboBoxField.d);
                } else {
                    return false;
                }

            },
            setCodeValue: function(cbfObject) {
                var prefix = comboBox.name.split('_', 1);

                prefix = prefix.length > 0 ? prefix[0] : '';
                if (!cbfObject[prefix])
                    return;
                if (!cbfObject[prefix]['c'])
                    return;
                var codeField = cbfObject[prefix]['c'][0];
                if (codeField) {
                    var s = comboBox.getStore();

                    var codeEl = comboBox.up("form").down("[name=" + prefix + '_' + codeField + "]");
                    if (codeEl) {

                        var i = s.findExact(cbfObject[prefix]['v'], comboBox.getValue());

                        if (i > -1) {
                            codeEl.setValue(s.getAt(i).get(codeField));
                        } else {
                           // console.log("[CH_SCV]No index found");
                        }

                    } else {
                       // console.log("No element for this name : " + prefix + '_' + codeField);
                    }
                }
            },
            getField: function(fieldId, field) {
                var index = comboBox.getStore().findExact(fieldId, comboBox.getValue());
                if (index >= 0) {
                    return comboBox.getStore().getAt(index).get(field);
                }
                return "";

            },
            /* bisa mengambil berdasarkan nilai yang diinput */
            getFieldFree: function(fieldId, field, val) {
                var index = comboBox.getStore().findExact(fieldId, val);
                if (index >= 0) {
                    return comboBox.getStore().getAt(index).get(field);
                }
                return "";

            }
            
        };
        return x;
    },
    /* added 6 Oct 2014*/
    gridHelper: function(grid) {
        var me = this;
        var x = {
            getJson: function() {
                var schStore = grid.getStore();
                var detailParams = [];

                var countRow = 0;
                schStore.each(function(rec) {
                    detailParams.push(rec.data);
                });

                return detailParams;
            },
            maindetailUpdateDeletedRows: function(mainForm, idDetail) {
                if (parseInt(idDetail) > 0) {
                    var rec = grid.getStore().getAt(mainForm.editedRow);
                    if(!rec){
                        return false;
                    }
                    rec.beginEdit();
                    rec.set({
                        deletedRows: "" + idDetail + "," + rec.get("deletedRows")
                    });
                    rec.endEdit();
                }

            },
            getJsonWithEach: function(eachFunc) {
                var schStore = grid.getStore();
                var detailParams = [];

                var countRow = 0;
                schStore.each(function(rec) {
                    
                    detailParams.push(eachFunc(rec.data));
                });

                return detailParams;
            },
        }
        return x;
    },
    floatval: function(string) {
        var x = parseFloat(string);
        return isNaN(x) ? 0 : x;
    },
    intval: function(string) {
        var x = parseInt(string);
        return isNaN(x) ? 0 : x;
    },
    notnull: function(rec) {
        if (rec) {
            return rec;
        }
        return '';
    },
    moneyval: function(string) {
        var me = this;
        return me.myConvert().fmb(me.floatval(string));

    },
    moneytofloat: function(str) {
        return (str.replace(/,/g, ""));
    },
    myConvert: function() {
        var me = this;
        var x = {
            fmb: function(val) {
                return this.fm(val, 2, ',', '.');
            },
            fm: function(n, decPlaces, thouSeparator, decSeparator) {
                var decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
                        decSeparator = decSeparator == undefined ? "." : decSeparator,
                        thouSeparator = thouSeparator == undefined ? "." : thouSeparator,
                        sign = n < 0 ? "-" : "",
                        i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
                        j = (j = i.length) > 3 ? j % 3 : 0;
                return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
            }
        }
        return x;
    },
    money: function(form) {
        var me = this;
        var x = {
            addCurrencyEvent: function() {
                var that = this;
                form.each(function(el) {
                    if (el.isUang) {
                        el.on({
                            blur: that.moneyFieldOnBlur,
                            change: that.moneyFieldOnChange,
                            scope: me // Important. Ensure "this" is correct during handler execution
                        });
                        Ext.apply(el, {blurred: false});
                    }
                });
            },
            clearFields: function(data) {
                var that = this;
                for (var i in data) {
                    var el = form.down("[name=" + i + "]");
                    if (el) {
                        if (el.isUang) {
                            data[i] = me.money(form).removeKomaTitik(data[i]);
                        }
                        else if (el.xtype == 'xmoneyfieldEST') { //// Add by Erwin.St 03/08/2021
                            data[i] = accounting.unformat(data[i]);
                        }
                    }
                }
            },
            moneyFieldOnBlur: function(el) {
                var that = this;
                el.blurred = true;
                el.setValue(me.myConvert().fmb(me.money(form).removeKomaTitik(el.getValue())));
                el.blurred = false;

            },
            moneyFieldOnChange: function(el) {
                var that = this;
               // console.log(el.blurred);
                if (el.blurred) {
                    return;
                }
                // el.setValue(me.myConvert().fmb(me.money(form).removeKomaTitik(el.getValue())));




            },
            removeKomaTitik: function(str) {
                var s = str.split(".");
                s = str.replace(/,/g, "");
                return s;
            }
        };
        return x;
    },
    /*@ when element see ajax 
     *@added 15 Agustus 2014
     * After ajax success, element that need data from ajax result, can attach it to them.
     * */
    wesea: function(data, element) {
      //  console.log(data);
        var x = {
            comboBox: function(usingAll, callback) {
                if (!data) {
                    return;
                }
                if (!data.model || !data.data) {
                    return false;
                }


                var fi = [];
                for (var m in data.model) {
                    fi.push(data.model[m]['name']);
                }

                if(element){
                    var newData = [];
                    var recordAll = {};
                    if (usingAll) {
                        recordAll[element.displayField] = 'ALL';
                        recordAll[element.valueField] = '0';
                        newData.push(recordAll);
                    }

                    for (var v in data.data) {
                        newData.push(data.data[v]);
                    }

                    var newStore = Ext.create('Ext.data.Store', {
                        fields: fi,
                        data: newData
                    });

                    element.bindStore(newStore);

                    if (usingAll) {
                        element.setValue('0');
                    }
                }

                if (typeof callback==="function"){
                    callback();
                }
            },
            checkBox: function() {
                var fc = element.down("fieldcontainer");
                fc.removeAll();
                for (var rec in data.data) {
                    fc.add({
                        xtype: 'checkboxfield',
                        boxLabel: data.data[rec][fc.displayField],
                        name: fc.valueField,
                        inputValue: data.data[rec][fc.valueField]
                    });
                }

            },
            grid: function() {

                if (!data.model || !data.data) {
                    return false;
                }






                var newStore = Ext.create('Ext.data.Store', {
                    fields: data.model,
                    data: data.data
                });

                element.bindStore(newStore);
            },
            instantStore: function() {
                if (!data.model || !data.data) {
                    return false;
                }






                var newStore = Ext.create('Ext.data.Store', {
                    fields: data.model,
                    data: data.data
                });
                element.bindStore(newStore);
            }
        };
        return x;
    },
    /* added 16 april 2018, 
     * mengganti nilai 999 menjadi -1*/
    weseaB: function(data, element) {
      //  console.log(data);
        var x = {
            comboBox: function(usingAll) {
                if (!data) {
                    return;
                }
                if (!data.model || !data.data) {
                    return false;
                }


                var fi = [];
                for (var m in data.model) {
                    fi.push(data.model[m]['name']);
                }

                var newData = [];
                var recordAll = {};
                if (usingAll) {
                    recordAll[element.displayField] = 'ALL';
                    recordAll[element.valueField] = '-1';
                    newData.push(recordAll);
                }

                for (var v in data.data) {
                    newData.push(data.data[v]);
                }


                var newStore = Ext.create('Ext.data.Store', {
                    fields: fi,
                    data: newData
                });



                element.bindStore(newStore);

                if (usingAll) {
                    element.setValue('-1');
                }
            },
            checkBox: function() {
                var fc = element.down("fieldcontainer");
                fc.removeAll();
                for (var rec in data.data) {
                    fc.add({
                        xtype: 'checkboxfield',
                        boxLabel: data.data[rec][fc.displayField],
                        name: fc.valueField,
                        inputValue: data.data[rec][fc.valueField]
                    });
                }

            },
            grid: function() {

                if (!data.model || !data.data) {
                    return false;
                }






                var newStore = Ext.create('Ext.data.Store', {
                    fields: data.model,
                    data: data.data
                });



                element.bindStore(newStore);
            },
            instantStore: function() {
                if (!data.model || !data.data) {
                    return false;
                }






                var newStore = Ext.create('Ext.data.Store', {
                    fields: data.model,
                    data: data.data
                });
                element.bindStore(newStore);
            }
        };
        return x;
    },
    iNeedYou: function(controller) {
        var me = this;
        var x = {
            save: function(saveFunc,finalDataFunc) {
                if (controller.whoCallMeID) {

                    me.ajax({
                        form: controller.getFormdata(),
                        callback: function(info) {
                            if (info.msg === "SUCCESS") {

                                _myAppGlobal.getController(controller.whoCallMeID).afterAddNewFromOutside(controller.id, info);

                            }

                        },
                        finalData: function(data) {
                            if(typeof finalDataFunc==="function"){
                                data = finalDataFunc(data);
                            }
                            return data;
                        }

                    }).create();


                } else {
                    if (typeof saveFunc === "function") {
                        saveFunc();
                    } else {
                        controller.insSave({
                            form: controller.getFormdata(),
                            grid: controller.getGrid(),
                            //  store: me.localStore.detail,
                            finalData: function(data) {
                                // var f = me.getFormdata();

                                return data;
                            },
                            sync: true,
                            callback: {
                                create: function(store, form, grid) {

                                }
                            }
                        });
                    }

                }
            },
            showWindow: function(controllerId, config) {
                var t = 'Window';
                if (config) {
                    t = config.title ? config.title : t;
                }

                var c = _myAppGlobal.getController(controllerId); 
                c.whoCallMeID = controller.id;
                c.iwField.title = t;
                c.formDataShow('create');
                Ext.getCmp(c.formxWinId).state = "create";
            }
        };
        return x;
    },
    fdar: function(controller, params) {
        var me = this;
        var f = controller.getFormdata();

        controller.mt = new Erems.library.ModuleTools();

        //
        var x = {
            init: function() {

                controller.setActiveForm(f);




            },
            create: function() {
                var that = this;
                f.editedRow = -1;
                f.setLoading("Loading components...");
                me.ajax({
                    params: {
                        // purchaseletter_id: plId
                    },
                    success: function(data, model) {

                        that.fillFormComponents(data, f);
                        f.setLoading(false);
                        if (typeof params !== 'undefined') {
                            if (typeof params.create === 'function') {
                                params.create(data);
                            }
                        }

                    }
                }).read('detail');

            },
            update: function() {
                var that = this;
                f.editedRow = controller.getGrid().getSelectedRow();
                var rec = controller.getGrid().getSelectedRecord();




                f.setLoading("Loading...");
                me.ajax({
                    params: {},
                    success: function(data, model) {

                        that.fillFormComponents(data, f);
                        f.loadRecord(rec);
                        f.setLoading(false);
                        if (typeof params !== 'undefined') {
                            if (typeof params.update === 'function') {
                                params.update(data);
                            }
                        }

                    }
                }).read('detail');
            },
            fillFormComponents: function(data, form) {

                var fs = form.getForm().getFields();
                var prefix = '';
                if (fs.items.length > 0) {
                    for (var i in fs.items) {
                        if (fs.items[i].xtype === "combobox") {
                            var name = fs.items[i].name;

                            prefix = name.split('_', 1);
                            if (prefix.length > 0) {
                                me.wesea(data[prefix[0]], form.down("[name=" + name + "]")).comboBox();
                            }
                        }
                    }
                }


                //citraclub_id

            },
            view: function() {
                var that = this;
                f.editedRow = controller.getGrid().getSelectedRow();
                var rec = controller.getGrid().getSelectedRecord();
                f.setLoading("Loading...");
                me.ajax({
                    params: {},
                    success: function(data, model) {
                        that.fillFormComponents(data, f);
                        f.loadRecord(rec);
                        f.setLoading(false);
                        if (typeof params !== 'undefined') {
                            if (typeof params.update === 'function') {
                                params.update(data);
                            }
                        }

                    }
                }).read('detail');

                var fields = f.query('button');
                Ext.each(fields, function(item, index) {
                    item.setDisabled(true);
                });

                fields = f.query('filefield');
                Ext.each(fields, function(item, index) {
                    item.setDisabled(true);
                });

                var vs = f.getForm().getValues();
                for (var i in vs) {
                    var elx = f.down("[name=" + i + "]");
                    if (elx) {
                        elx.setReadOnly(true);
                    }
                }
                f.down('#btnCancel').setDisabled(false);
            }
        };
        return x;
    },
    printMsWord: function(params, panel) {
        var me = this;

        var x = {
            grid: function(grid) {
                var rec = grid.getSelectedRecord();

                if (rec) {
                    this.process(params, panel);
                } else {
                    me.alert.warning('Please select record');
                }

            },
            process: function(params, panel) {
                panel.setLoading("Please wait...");
                me.ajax({
                    params: params,
                    success: function(data, model) {
                        panel.setLoading(false);
                        var url = data['others'][0][0]['URL'];
                        if (url) {
                            Ext.Msg.show({
                                title: 'Info',
                               // msg: '<a href="' + window.location.origin + '/' + url + '" target="blank">Download file</a>',
                                msg: '<a href="' + url + '" target="blank">Download file</a>',
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK,
                                fn: function() {

                                }
                            });
                        }


                    }
                }).read('printout');
            }
        };
        return x;


    },
    /* return int 
     * mendapatkan jumlah hari antara 2 tanggal
     * */
    diffDays: function(datea, dateb) {
        var date1 = new Date(datea);
        var date2 = new Date(dateb);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    },
    resetPanel: function(panelId, form) {

        var f = form;
        var priceInformationPanel = f.down("#" + panelId);
        var vs = f.getForm().getValues();
        for (var i in vs) {
            var el = priceInformationPanel.down("[name=" + i + "]");
            if (el) {

                var c = String(el.getXTypes()).indexOf("combobox");
                if (String(el.getXTypes()).indexOf("combobox") > -1) {
                    el.setValue("");
                } else if (String(el.getXTypes()).indexOf("xmoneyfield")) {
                    el.setValue(0);
                } else {
                    el.setValue("");
                }

            }

        }

    },
	
	//Start by: David 18/8/17
		
	/*ADD DAYS*/

    addDays: function (date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + (parseInt(days) - 1));
      return result;
    },
	
    GetFormattedDate: function (time) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(time);
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-');
    },
	
    loadrecfield: function(obj, form){
        var f = form;
        Object.keys(obj).forEach(function (key) {
            var obj2 = obj[key];
            Object.keys(obj2).forEach(function (key2) {
                //if using prefix 
                var nname = "[name="+key+"_"+key2+"]";
                if(f.down(nname)){
                    f.down(nname).setValue(obj2[key2]);
                }
                //if not using prefix 
                else{
                    var nname = "[name="+key2+"]";
                    if(f.down(nname)){
                        f.down(nname).setValue(obj2[key2]);
                    }
                }
            });
        });
    },
	
    interAjax: function(params) {
        var me = this;
        var func = {
            update: function(zendAction, successText, paramsAjax) {

                /// coming soon
            },
            create: function() {
                var f = null;
                var paramsCreate = null;
                if (!params.form) {
                   // console.log("Form tidak ada [ajax create]");
                    return;

                }
                f = params.form;
                var vs = f.getValues();
                if (typeof params.finalData === 'function') {
                    paramsCreate = params.finalData(vs);
                } else {
                    paramsCreate = vs;
                }
                f.setLoading("Please wait...");
                this.callAjax({
                    zendAction: 'create',
                    params: {data: Ext.encode(paramsCreate)},
                    successCallback: function(info) {
                        if (info.msg === "SUCCESS") {

                            me.alert.info("Success", params.success);

                        } else {

                            me.alert.error(info.msg);
                        }
                        f.setLoading(false);
                        if (typeof params.callback === 'function') {
                            params.callback(info);
                        }
                    }
                });
            },
            read: function(controllerName, modeRead) {
                var paramsRead = null;
                if (params) {
                    if (params.params) {
                        paramsRead = params.params;
                    }


                }
                paramsRead['mode_read'] = modeRead;

                this.callAjax(controllerName, {
                    zendAction: 'read',
                    params: paramsRead,
                    successCallback: function(info) {
                        if (typeof params.success === 'function') {
                            params.success(info.data, info.model);
                        }
                    }
                });
            },
            callAjax: function(controllerName, params) {
                var zendAction = params.zendAction;

                var ajaxParams = params.params;
                var successCallback = params.successCallback;


                Ext.Ajax.request({
                    url: me.config.moduleName + '/' + controllerName + '/' + zendAction,
                    params: ajaxParams,
                    success: function(response) {
                        var info = Ext.JSON.decode(response.responseText);
                        if (info) {
                            if (typeof successCallback === 'function') {
                                successCallback(info);
                            }
                        } else {
                            me.alert.error("Error when processing result");
                        }

                    }


                });
            }
        };
        return func;
    },

    //End by: David 18/8/17

    browserPrint: function(htmlcontent){
        var mywindow = window.open('PRINT', 'PRINT', 'height=600,width=800', '_blank');
        mywindow.document.write('<html><head>');
        mywindow.document.write('<style type="text/css" media="print"> @page{size:auto;margin:0}</style></head><body>'); //remove header
        mywindow.document.write(htmlcontent);
        mywindow.document.write('</body></html>');
        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/
        mywindow.print();
        mywindow.close();
        return true;

    },

    dateFormat: function(d){
         //d = date in string
         // convert ex : Fri Jan 31 2014 00:00:00 GMT-0800 (Pacific Standard Time) to yyyy-MM-dd
         var d = d.toString();
         var parts = d.split(" ");
         var months = {Jan: "01",Feb: "02",Mar: "03",Apr: "04",May: "05",Jun: "06",Jul: "07",Aug: "08",Sep: "09",Oct: "10",Nov: "11",Dec: "12"};
         return parts[3]+"-"+months[parts[1]]+"-"+parts[2];
    },

    comboboxRender: function(data, element, fields){

       var newData = data[0];

       var newStore = Ext.create('Ext.data.Store', {
            fields: fields,
            data : newData 
        });
        element.bindStore(newStore);
    }



});