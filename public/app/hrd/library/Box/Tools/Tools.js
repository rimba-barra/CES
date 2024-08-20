// Closure
(function() {
    /**
     * Decimal adjustment of a number.
     *
     * @param {String}  type  The type of adjustment.
     * @param {Number}  value The number.
     * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
     * @returns {Number} The adjusted value.
     */
    function decimalAdjust(type, value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Decimal round
    if (!Math.round10) {
        Math.round10 = function(value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
    // Decimal floor
    if (!Math.floor10) {
        Math.floor10 = function(value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    // Decimal ceil
    if (!Math.ceil10) {
        Math.ceil10 = function(value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }
})();

Ext.define('Hrd.library.box.tools.Tools', {
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

                        d.setMonth(month - 1);
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
            Ext.Msg.show({
                title: 'Warning',
                msg: 'Warning: ' + msg,
                icon: Ext.Msg.WARNING,
                buttons: Ext.Msg.OK
            });
        },
        error: function(msg) {
            Ext.Msg.show({
                title: 'Failure',
                msg: 'Error: ' + msg,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        },
        info: function(msg, buttonFn) {
            Ext.Msg.show({
                title: 'Success',
                msg: msg,
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK,
                fn: function() {
                    if (typeof buttonFn === 'function') {
                        buttonFn();
                    }


                }
            });
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
    /// added from erems 12 december 2014
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
                    if (rec) {
                        rec.beginEdit();
                        rec.set({
                            deletedRows: "" + idDetail + "," + rec.get("deletedRows")
                        });
                        rec.endEdit();
                    } else {
                        console.log("[Tools Error] No selected record in main grid");
                    }

                }

            }

        }
        return x;
    },
    /* added 22 Agustus 2015
     * Sinkronisasi dengan hermes backend
     * */
    hermes: function(form) {
        var me = this;
        var func = {
            save: function(data, modeRead) {
                form.setLoading("Saving your data");
                me.ajax({
                    params: data,
                    success: function(xdata, model) {
                        if (xdata.length == 0) {
                            me.alert.error("Failed to process");

                        } else {
                            if (xdata['others'][0][0]['HASIL']) {
                                me.alert.info("Success");
                                form.up("window").close();
                            } else {
                                me.alert.warning(xdata['others'][0][0]['MSG']);
                            }
                        }

                        form.setLoading(modeRead);
                    }
                }).read('createtlk');
            }
        }
        return func;
    },
    /* added 5 agustus 2014
     simplify Ext Ajax Request
     **/

    ajax: function(params) {
        var me = this;
        var func = {
            save: function() {
                var paramsSave = null;
                if (params) {
                    if (params.params) {
                        paramsSave = params.params;
                    }


                }
                this.callAjax({
                    zendAction: 'create',
                    params: paramsSave,
                    isSave: true,
                    successCallback: function(info) {
                        if (typeof params.success === 'function') {
                            params.success(info);
                        }
                    }
                });
            },
            update: function(zendAction, successText, paramsAjax) {

                /// coming soon
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
            process: function(modeRead) {
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

                        var data = info.data.others[0][0];
                        var hasil = data['HASIL'];

                        var msg = data['MSG'];
                        if (!hasil) {
                            if (typeof params.fail === 'function') {
                                me.alert.warning(msg);
                                params.fail(msg, data);
                            }
                        } else {
                            if (typeof params.success === 'function') {
                                params.success(data);
                            }
                        }

                    }
                });
            },
            processNoWarningAlert: function(modeRead) {
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

                        var data = info.data.others[0][0];
                        var hasil = data['HASIL'];

                        var msg = data['MSG'];
                        if (!hasil) {
                            if (typeof params.fail === 'function') {

                                params.fail(msg, data);
                            }
                        } else {
                            if (typeof params.success === 'function') {
                                params.success(data);
                            }
                        }

                    }
                });
            },
            callAjax: function(params) {
                var zendAction = params.zendAction;

                var ajaxParams = params.params;
                var successCallback = params.successCallback;

                var isSave = typeof params.isSave === 'undefined' ? false : true;

                ajaxParams = isSave ? {data: Ext.encode(ajaxParams)} : ajaxParams;

                var autoAbort = typeof params.autoAbort != 'undefined' ? params.autoAbort : false;


                Ext.Ajax.timeout = 120000000; // 120 seconds
                Ext.Ajax.request({
                    url: me.config.moduleName + '/' + me.config._controllerName + '/' + zendAction,
                    params: ajaxParams,
                    autoAbort: autoAbort,
                    success: function(response) {
                        var info = Ext.JSON.decode(response.responseText);
                        if (info) {
                            if (typeof successCallback === 'function') {
                                successCallback(info);
                            }
                        } else {
                            me.alert.error("Error when processing result");
                        }

                    },
                    failure: function(response) {
                        console.log(response);
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
                if (index >= 0) {
                    return comboBox.getStore().getAt(index).get(comboBoxField.d);
                }
                return "";

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

            },
            setDefaultValue: function(last) {
                var i = typeof last !== "undefined" ? last : false;
                var store = comboBox.getStore();
                if (store.getCount() > 0) {
                    var record = store.getAt(i ? store.getCount() - 1 : 0);
                    comboBox.setValue(record);
                }

            }
        };
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
    /*@ when element see ajax 
     *@added 15 Agustus 2014
     * After ajax success, element that need data from ajax result, can attach it to them.
     * */
    wesea: function(data, element) {
        var x = {
            comboBox: function(usingAll) {
                if (!data) {
                    return false;
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
                    recordAll[element.valueField] = '999';
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
                //   element.reconfigure (newStore);
            },
            /* added 26 Nov 2015*/
            gridb: function() {

                if (!data.model || !data.data) {
                    return false;
                }
                
                var mod = {
                    extend: 'Ext.data.Model',
                    fields: data.model
                };

                //  Ext.define('Testttttsmo', model);


                var newStore = Ext.create('Ext.data.Store', {
                    fields: data.model,
                    data: data.data
                });



                element.bindStore(newStore);
                //   element.reconfigure (newStore);
            },
            instantStore: function(eraseOld) {
                var me = this;


                element.model.setFields(data.model);
                element.loadData([], false);
                var eo = typeof eraseOld !== "boolean" ? false : eraseOld;
                //    element.loadRawData(data.data, eo);

                element.loadData(data.data, false);


                element.modelExist = true;
            }

        };
        return x;
    },
    formHelper: function(form) {
        var x = {
            // set all field to read only mode
            readOnly: function(status) {
                var vs = form.getForm().getValues();
                for (var i in vs) {
                    var el = form.down("[name=" + i + "]");
                    if (el) {
                        el.setReadOnly(status);
                    }
                }
            },
            fillByPrefix: function(prefix, fieldName, value) {
                var el = form.down("[name=" + prefix + "_" + fieldName + "]");
                if (el) {
                    el.setValue(value);
                }
            },
            // added 11 Desember 2014
            // fill form by raw in record to prefixisme field di form
            fillByRaw: function(rec) {
                var raw = rec.raw;
                if (raw) {
                    for (var prefix in raw) {
                        for (var field in raw[prefix]) {
                            var el = form.down("[name=" + prefix + "_" + field + "]");
                            if (el) {
                                el.setValue(raw[prefix][field]);
                            }
                        }
                    }
                }
            },
            /*@return form.getForm().getValues() */
            fixMoneyUnformat: function() {
                /// untuk mengambil format aslinya => 1000
                var vs = false;

                var el = null;
                var vs = form.getForm().getValues();
                for (var i in vs) {
                    el = form.down("[name=" + i + "]");
                    if (el) {
                        if (el.getXType() === 'xmoneyfield') {
                            vs[i] = el.getValuem();
                        }
                    }
                }

                return vs;
            },
            /* @param type record extjs*/
            fixMoneyFormat: function(rec) {
                if (rec) {
                    var el = null;
                    var vs = form.getForm().getValues();
                    for (var i in vs) {
                        el = form.down("[name=" + i + "]");
                        if (el) {
                            if (el.getXType() === 'xmoneyfield') {
                                el.setValuem(rec.get(i));
                            }
                        }
                    }
                }
            },
            /* @params type array*/
            fixMoneyFormatb: function(ar) {
                if (ar) {
                    var el = null;
                    var vs = form.getForm().getValues();
                    for (var i in vs) {
                        el = form.down("[name=" + i + "]");
                        if (el) {
                            if (el.getXType() === 'xmoneyfield') {
                                el.setValuem(ar[i]);
                            }
                        }
                    }
                }
            },
        };
        return x;
    },
    diffDays: function(datea, dateb) {
        var date1 = new Date(datea);
        var date2 = new Date(dateb);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    },
    /* format time 00:00:00*/
    diffTime: function(datea, dateb) {
        if (datea.length != 8 || datea.length != 8) {
            return false;
        }
        var tempA = datea.split(":");
        var tempB = dateb.split(":");
        var date1 = new Date(2000, 0, 1, tempA[0], tempA[1], tempA[2]);
        var date2 = new Date(2000, 0, 1, tempB[0], tempB[1], tempB[2]);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());

        return this.millisecondsToTime(timeDiff);
    },
    /* format time 00:00:00*/
    addTime: function(datea, dateb) {
        var tempA = datea.split(":");
        var tempB = dateb.split(":");
        var h = this.intval(tempA[0]) + this.intval(tempB[0]);
        var i = this.intval(tempA[1]) + this.intval(tempB[1]);
        var s = this.intval(tempA[2]) + this.intval(tempB[2]);

        if (s >= 60) {
            i = i + 1;
            s = s - 60;
        }
        if (i >= 60) {
            i = i - 60;
            h = h + 1;
        }
        h = h >= 24 ? h - 24 : h;

        return this.akda(h) + ":" + this.akda(i) + ":" + this.akda(s);

    },
    /* format time 00:00:00*/
    inBetween: function(date, dateStart, dateEnd) {

        if (date.length != 8 || dateStart.length != 8 || dateEnd.length != 8) {
            return false;
        }
        var tempA = date.split(":");
        var tempB = dateStart.split(":");
        var tempC = dateEnd.split(":");
        var date1 = new Date(2000, 0, 1, tempA[0], tempA[1], tempA[2]);
        var date2 = new Date(2000, 0, 1, tempB[0], tempB[1], tempB[2]);
        var date3 = new Date(2000, 0, 1, tempC[0], tempC[1], tempC[2]);

        if (date1 >= date2 && date1 <= date3) {
            return true;
        }

        return false;

    },
    millisecondsToTime: function(milli)
    {
        var milliseconds = milli % 1000;
        var seconds = Math.floor((milli / 1000) % 60);
        var minutes = Math.floor((milli / (60 * 1000)) % 60);
        var hours = Math.floor((milli / (60 * 60 * 1000)) % 60);

        return this.akda(hours) + ":" + this.akda(minutes) + ":" + this.akda(seconds);
    },
    /* misal = > 10:30 menjadi 10.5 */
    timeToDecimal: function(time) {
        if (!time) {
            return 0;
        }

        if (time.length >= 3) {
            var tempA = time.split(":");
            if (tempA) {
                return this.intval(tempA[0]) + (tempA[1] > 0 ? Math.round10(tempA[1] / 60, -1) : 0);
            }
        }

        return 0;

    },
    /* penambah angka nol di depan angka => misal => 1 menjadi 01 */
    akda: function(x) {
        var me = this;
        x = me.intval(x);
        return x < 10 ? "0" + x : x;
    },
    /* penambah angka nol di depan angka => misal => 1 menjadi 001 */
    akdab: function(x) {
        var me = this;
        x = me.intval(x);
        if (x < 10) {
            return "00" + x;
        } else if (x < 100 && x >= 10) {
            return "0" + x;
        } else {
            return x;
        }
        return x < 10 ? "0" + x : x;
    },
    timeLessThan: function(datea, dateb) {
        if (datea.length != 8 || datea.length != 8) {
            return false;
        }
        var tempA = datea.split(":");
        var tempB = dateb.split(":");
        var date1 = new Date(2000, 0, 1, tempA[0], tempA[1], tempA[2]);
        var date2 = new Date(2000, 0, 1, tempB[0], tempB[1], tempB[2]);

        if (date2.getTime() >= date1.getTime()) {
            return true;
        }
        return false;
    },
    dateLessThan: function(datea, dateb) {


        var date1 = new Date(datea);
        var date2 = new Date(dateb);

        if (date1.getTime() <= date2.getTime()) {
            return true;
        }
        return false;
    },
    dateFunc: function(date) {
        var me = this;
        var x = {
            toDMY: function(separate) {
                var d = new Date(date);
                return d.getDate() + '' + separate + '' + (d.getMonth() + 1) + '' + separate + '' + d.getFullYear();
            },
            toYMD: function(separate) {
                var d = new Date(date);
                return d.getFullYear() + '' + separate + '' + (d.getMonth() + 1) + '' + separate + '' + d.getDate();
            },
            toHIS: function() {
                var d = new Date(date);
                return me.akda(d.getHours()) + ':' + me.akda(d.getMinutes()) + ':' + me.akda(d.getSeconds());
            },
            getDayWeekName: function() {
                var d = new Date(date);
                var day = d.getDay();
                var name = false;
                switch (day) {
                    case 0:
                        name = "Minggu";
                        break;
                    case 1:
                        name = "Senin";
                        break;
                    case 2:
                        name = "Selasa";
                        break;
                    case 3:
                        name = "Rabu";
                        break;
                    case 4:
                        name = "Kamis";
                        break;
                    case 5:
                        name = "Jumat";
                        break;
                    case 6:
                        name = "Sabtu";
                        break;
                }
                return name;
            },
            addDay: function(jumlah) {
                var j = typeof jumlah === "undefined" ? 1 : jumlah;
                var newDate = new Date(date);
                newDate.setDate(date.getDate() + j);
                return newDate;
            }
        };
        return x;
    },
    shortHasilArray: function(data) {
        var x = data['others'][0][0]['HASIL'][0];
        if (x) {
            return x;
        }
        return false;
    },
    getRomawi: function(number) {
        var hasil = false;
        number = this.intval(number);
        switch (number) {
            case 1:
                hasil = "I";
                break;
            case 2:
                hasil = "II";
                break;
            case 3:
                hasil = "III";
                break;
            case 4:
                hasil = "IV";
                break;
            case 5:
                hasil = "V";
                break;
            case 6:
                hasil = "VI";
                break;
            case 7:
                hasil = "VII";
                break;
            case 8:
                hasil = "VIII";
                break;
            case 9:
                hasil = "IX";
                break;
            case 10:
                hasil = "X";
                break;
            case 11:
                hasil = "XI";
                break;
            case 12:
                hasil = "XII";
                break;
        }
        return hasil;
    },
    fixMoneyLoadRecord: function(rec, form) {
        if (rec) {
            var el = null;
            var vs = form.getForm().getValues();
            for (var i in vs) {
                el = form.down("[name=" + i + "]");
                if (el) {
                    if (el.getXType() === 'xmoneyfield') {
                        el.setValuem(rec.get(i));
                    }
                }
            }
        }
    },
    fixMoneyLoadRecordb: function(ar, form) {
        if (ar) {
            var el = null;
            var vs = form.getForm().getValues();
            for (var i in vs) {
                el = form.down("[name=" + i + "]");
                if (el) {
                    if (el.getXType() === 'xmoneyfield') {
                        el.setValuem(ar[i]);
                    }
                }
            }
        }
    },
    fillEmployeeInfo: function(rec, form) {
        var el = null;
        el = form.down("[name=employee_employee_nik]");
        if (el) {
            el.setValue(rec.get("employee_nik"))
        }
        ;

        el = null;
        el = form.down("[name=employee_employee_name]");
        if (el) {
            el.setValue(rec.get("employee_name"))
        }
        ;

        el = null;
        el = form.down("[name=employee_employee_id]");
        if (el) {
            el.setValue(rec.get("employee_id"))
        }
        ;

        el = null;
        el = form.down("[name=department_code]");
        if (el) {
            el.setValue(rec.get("department_code"))
        }
        ;

        el = null;
        el = form.down("[name=employee_hire_date]");
        if (el) {
            el.setValue(rec.get("hire_date"))
        }
        ;

        el = null;
        el = form.down("[name=group_code]");
        if (el) {
            el.setValue(rec.get("group_code"))
        }
        ;

        el = null;
        el = form.down("[name=position_position]");
        if (el) {
            el.setValue(rec.get("position_position"))
        }
        ;

        el = null;
        el = form.down("[name=marriagestatus_marriagestatus]");
        if (el) {
            el.setValue(rec.get("marriagestatus_marriagestatus"))
        }
        ;
    },
    copyObject: function(obj) {
        var newObj = {};
        for (var key in obj) {
            //copy all the fields
            newObj[key] = obj[key];
        }

        return newObj;
    },
    filter: function(store,fieldFilter,value) {
        store.clearFilter(true);

        store.filter(fieldFilter, new RegExp("^" + value + "$"));

    }



});


