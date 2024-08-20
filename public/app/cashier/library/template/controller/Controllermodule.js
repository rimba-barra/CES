Ext.define('Cashier.library.template.controller.Controllermodule', {//mendefine terhadap alamat file Controllergl.js
    extend: 'Cashier.library.template.controller.Controller', //mengextends dari file Controller.js sebagai induknya
    requires: ['Cashier.library.tools.Mytools'],
    elem: null, infodata: null,
    project_id: 0,
    pt_id: 0,
    constructor: function (configs) {
        this.callParent(arguments);
        if (typeof moment !== 'function') {
            Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/moment.min.js', function () {
            }, function () {
            });
        }
    },
    cleanCoatonumber: function (coa) {
        var data;
        data = coa.replace(/[\.]+/g, "");
        return data;
    },
    windowsHeight: function (menu, height) {
        Ext.get('WINDOW-mnu' + menu).setHeight(height);
    },
    windowsWidht: function (menu, widht) {
        Ext.get('WINDOW-mnu' + menu).setWidth(widht);
    },
    setLbl: function (form, selector, text) {
        form.down("[name=" + selector + "]").setText(text, true);
    },
    rangefromuntilgroup: function (status) {
        var me, form;
        me = this;
        form = me.getFormdata();
        me.Fdisable(form, "fromgrouptrans", status);
        me.Fdisable(form, "untilgrouptrans", status);
        me.setAllow(form, "fromgrouptrans", status);
        me.setAllow(form, "untilgrouptrans", status);
        me.setVal(form, "fromgrouptrans", '', '');
        me.setVal(form, "untilgrouptrans", '', '');
    },
    fromuntilloaner: function (status) {
        var me, form;
        me = this;
        form = me.getFormdata();
        me.Fdisable(form, "fromloaner", status);
        me.Fdisable(form, "untilloaner", status);
        me.setAllow(form, "fromloaner", status);
        me.setAllow(form, "untilloaner", status);
        me.setVal(form, "fromloaner", '', '');
        me.setVal(form, "untilloaner", '', '');
    },
    fromuntilvendor: function (status) {
        var me, form;
        me = this;
        form = me.getFormdata();
        me.Fdisable(form, "fromvendor", status);
        me.Fdisable(form, "untilvendor", status);
        me.setAllow(form, "fromvendor", status);
        me.setAllow(form, "untilvendor", status);
        me.setVal(form, "fromvendor", '', '');
        me.setVal(form, "untilvendor", '', '');
    },
    rangeapprove: function (status) {
        var me, form;
        me = this;
        form = me.getFormdata();
        me.Fdisable(form, "rangeapproval", status);
        me.setAllow(form, "rangeapproval", status);
        me.setVal(form, "rangeapproval", '', '');
    },
    fromuntilprefix: function (status) {
        var me, form;
        me = this;
        form = me.getFormdata();
        me.Fdisable(form, "fromprefix", status);
        me.Fdisable(form, "untilprefix", status);
        me.setAllow(form, "fromprefix", status);
        me.setAllow(form, "untilprefix", status);
        me.setVal(form, "fromprefix", '', '');
        me.setVal(form, "untilprefix", '', '');
    },
    fromuntilbank: function (status) {
        var me, form;
        me = this;
        form = me.getFormdata();
        me.Fdisable(form, "frombank", status);
        me.Fdisable(form, "untilbank", status);
        me.setAllow(form, "frombank", status);
        me.setAllow(form, "untilbank", status);
        me.setVal(form, "frombank", '', '');
        me.setVal(form, "untilbank", '', '');
    },
    fromuntildate: function (status) {
        var me, form;
        me = this;
        form = me.getFormdata();
        me.Fdisable(form, "fromperiode", status);
        me.Fdisable(form, "untilperiode", status);
        me.setAllow(form, "fromperiode", status);
        me.setAllow(form, "untilperiode", status);
        me.setVal(form, "fromperiode", '', '');
        me.setVal(form, "untilperiode", '', '');
    },
    fromuntilproject: function (status) {
        var me, form;
        me = this;
        form = me.getFormdata();
        me.Fdisable(form, "fromproject", status);
        me.Fdisable(form, "untilproject", status);
        me.setAllow(form, "fromproject", status);
        me.setAllow(form, "untilproject", status);
        me.setValCombo(form, "fromproject", '', '');
        me.setValCombo(form, "untilproject", '', '');
    },
    fromuntilcompany: function (status) {
        var me, form;
        me = this;
        form = me.getFormdata();
        me.Fdisable(form, "frompt", status);
        me.Fdisable(form, "untilpt", status);
        me.setAllow(form, "frompt", status);
        me.setAllow(form, "untilpt", status);
        me.setValCombo(form, "frompt", '', '');
        me.setValCombo(form, "untilpt", '', '');
    },
    fromuntildepartment: function (status) {
        var me, form;
        me = this;
        form = me.getFormdata();
        me.Fdisable(form, "fromdepartment", status);
        me.Fdisable(form, "untildepartment", status);
        me.setAllow(form, "fromdepartment", status);
        me.setAllow(form, "untildepartment", status);
        me.setValCombo(form, "fromdepartment", '', '');
        me.setValCombo(form, "untildepartment", '', '');
    },
    fromuntilgroup: function (status) {
        var me, form;
        me = this;
        form = me.getFormdata();
        me.Fdisable(form, "grouptrans_id", status);
        me.setValCombo(form, "grouptrans_id", '', '');
    },
    fromuntilcoa: function (status) {
        var me, form;
        me = this;
        form = me.getFormdata();
        if (status == true) {
            me.Fdisable(form, "fromcoa", true);
            me.Fdisable(form, "untilcoa", true);
        } else {
            me.Fdisable(form, "fromcoa", false);
            me.Fdisable(form, "untilcoa", false);
        }
        me.setValCombo(form, "fromcoa", '', '');
        me.setValCombo(form, "untilcoa", '', '');
    },
    checkRangedateReport: function (from, until) {
        var me, tmp1, tmp2, date1, date2, dateA, dateB, d2, from, to, status;
        me = this;
        date1 = me.formatDate(from);
        date2 = me.formatDate(until);
        dateA = new Date(date1);
        dateB = new Date(date2);
        if (dateB >= dateA) {
            status = "valid";
        } else {
            status = "notvalid";
        }
        return status;
    },
    checkRangedate: function (from, until) {
        var me, tmp1, tmp2, date1, date2, dateA, dateB, d2, from, to, status;
        me = this;
        date1 = me.formatDate(from);
        date2 = me.formatDate(until);
        dateA = new Date(date1);
        dateB = new Date(date2);
        if (dateB >= dateA) {
            status = "valid";
        } else {
            status = "notvalid";
        }

        return status;
    },
    checkAmount: function (value1, value2) {
        var me, status;
        me = this;
        if (value2 >= value1) {
            status = "valid";
        } else {
            status = "notvalid";
        }
        return status;
    },
    setVal: function (form, selector, value) {
        form.down("[name=" + selector + "]").setValue(value);
    },
    setValbyid: function (form, selector, value) {
        form.down("[id=" + selector + "]").setValue(value);
    },
    setRaw: function (form, selector, value) {
        form.down("[name=" + selector + "]").setRawValue(value);
    },
    setValCombo: function (form, selector, id, desc) {
        form.down("[name=" + selector + "]").setValue(id);
        form.down("[name=" + selector + "]").setRawValue(desc);
    },
    getValCombo: function (form, selector) {
        var id, value;
        id = form.down("[name=" + selector + "]").getValue();
        value = form.down("[name=" + selector + "]").getRawValue();
        return {"id": id, "value": value}
    },
    getVal: function (form, selector, type) {
        var result;
        if (type == 'value') {
            result = form.down("[name=" + selector + "]").getValue();
        } else if (type == 'raw') {
            result = form.down("[name=" + selector + "]").getRawValue();
        }
        return  result;
    },
    setAllow: function (form, selector, value) {
        form.down("[name=" + selector + "]").allowBlank = value;
    },
    getValRadio: function (form, selector) {
        var formvalue, value;
        formvalue = form.getForm().getValues();
        value = formvalue[selector];
        if (Ext.isArray(value)) {
            return;
        }
        return value;
    },
    gValRadio: function (form, selector) {
        var formvalue, value;
        formvalue = form.getForm().getValues();
        value = formvalue[selector];
        if (!Ext.isArray(value)) {
            return value;
        }
    },
    unMask: function (value) {
        return accounting.unformat(value);
    },
    Mask: function (value) {
        return accounting.formatMoney(value);
    },
    unformatCurrencyFormdata: function (controller, form) {
        var me, form, itemform, xtypeform, widget, itemname, oldvalue, newvalue;
        me = controller;
        itemform = form.getForm().getFields().items;
        for (var index in itemform) {
            xtypeform = form.getForm().getFields().items[index].xtype;
            if (xtypeform == 'xmoneyfield') {
                itemname = form.getForm().getFields().items[index].name;
                oldvalue = form.down("[name=" + itemname + "]").getValue();
                newvalue = accounting.unformat(oldvalue);
                form.down("[name=" + itemname + "]").setValue(newvalue);
            }
        }
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
    valueToRaw: function (value) {
        return value.toString().replace(/[^0-9.]/g, '');
    },
    setReadonly: function (form, selector, value) {
        form.down("[name=" + selector + "]").setReadOnly(value);
    },
    fieldReadonly: function (controller, selector, value) {
        controller.getFormdata().down("[name=" + selector + "]").setReadOnly(value);
    },
    fieldDisable: function (controller, selector, value) {
        controller.getFormdata().down("[name=" + selector + "]").setDisabled(value);
    },
    Fdisable: function (form, selector, value) {
        form.down("[name=" + selector + "]").setDisabled(value);
    },
    Fdisablebyid: function (form, selector, value) {
        form.down("[id=" + selector + "]").setDisabled(value);
    },
    fieldShow: function (form, selector) {
        form.down("[name=" + selector + "]").setVisible(true);
    },
    fieldHide: function (form, selector) {
        form.down("[name=" + selector + "]").setVisible(false);
    },
    containHide: function (form, selector) {
        form.down(selector).setVisible(false);
    },
    containShow: function (form, selector) {
        form.down(selector).setVisible(true);
    },
    setLabel: function (controller, selector, text, value) {
        controller.getFormdata().down("[name=" + selector + "]").setText(text, true);
    },
    btnDisable: function (controller, selector, value) {
        controller.getFormdata().down("[action=" + selector + "]").setDisabled(value);
    },
    disableBtn: function (form, selector, value) {
        form.down("[action=" + selector + "]").setDisabled(value);
    },
    btnHidden: function (controller, selector, value) {
        if (value == true) {
            controller.getFormdata().down("[action=" + selector + "]").show();
        } else {
            controller.getFormdata().down("[action=" + selector + "]").hide();
        }
    },
    hideBtn: function (form, selector, value) {
        if (value == true) {
            form.down("[action=" + selector + "]").hide();
        } else {
            form.down("[action=" + selector + "]").show();
        }
    },
    setStoreFormsearch: function (callback = null) {
        var me, form, itemForms, xtypeform, result, widget, store, dynamicdata, fieldname;
        me = this;
        form = me.getFormsearch();
        itemForms = form.getForm().getFields().items;
        for (var index in itemForms) {
            fieldname = form.getForm().getFields().items[index].name;
            xtypeform = form.getForm().getFields().items[index].xtype;
            result = xtypeform.substr(xtypeform.length - 9);
            if (result.indexOf("combobox") > -1) {
                widget = Ext.widget(xtypeform);
                store = widget.store.storeId;
                dynamicdata = widget.dynamicdata;
                if (dynamicdata < 1) {
                    me.getStore(store).load();
                }
            }
        }
        if (typeof callback == 'function') {
            callback();
        }
    },
    setStoreFormdata: function () {
        var me, form, itemForms, xtypeform, result, widget, store, dynamicdata, fieldname;
        me = this;
        form = me.getFormdata();
        itemForms = form.getForm().getFields().items;
        for (var index in itemForms) {
            fieldname = form.getForm().getFields().items[index].name;
            xtypeform = form.getForm().getFields().items[index].xtype;
            result = xtypeform.substr(xtypeform.length - 9);
            if (result.indexOf("combobox") > -1) {
                widget = Ext.widget(xtypeform);
                //console.log(widget);
                store = widget.store.storeId;
                dynamicdata = widget.dynamicdata;
                if (dynamicdata < 1) {
                    //console.log(store);
                    me.getStore(store).load();
                }
            }
        }
    },
    setStoreFormview: function () {
        var me, form, itemForms, xtypeform, result, widget, store, dynamicdata, fieldname;
        me = this;
        form = me.getFormview();
        itemForms = form.getForm().getFields().items;
        for (var index in itemForms) {
            fieldname = form.getForm().getFields().items[index].name;
            xtypeform = form.getForm().getFields().items[index].xtype;
            result = xtypeform.substr(xtypeform.length - 9);
            if (result.indexOf("combobox") > -1) {
                widget = Ext.widget(xtypeform);
                store = widget.store.storeId;
                dynamicdata = widget.dynamicdata;
                if (dynamicdata < 1) {
                    me.getStore(store).load();
                }
            }
        }
    },
    GenerateFormdata: function (paramdata) {
        var me, p;
        p = paramdata;
        me = this;
        p.formwindows = desktop.getWindow(p.formid);
        if (!p.formwindows) {
            p.formwindows = desktop.createWindow({
                id: p.formid,
                name: p.formid,
                title: p.formtitle + ' ( ' + p.stateform + ' )',
                iconCls: p.formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: p.formwidth,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: p.formlayout,
                shadow: p.formshadow,
                shadowOffset: 10,
                border: false,
                state: p.stateform,
                onEsc: function() {
                    var me = this;
                    Ext.Msg.confirm(
                        'Confirmation',
                        'Are you sure you wish to close this window before saving your changes?',
                        function(btn) {
                            if (btn === 'yes')
                                me.destroy();
                        }
                     );
                },
                listeners: {
                    boxready: function () {
                        p.formwindows.body.mask(p.formmask);
                        p.formtimeout = setTimeout(function () {
                            p.formwindows.add(Ext.create(p.fromlocation));
                            p.formwindows.center();
                            p.formwindows.body.unmask();
                            clearTimeout(p.formtimeout);
                        }, 0);
                    },
                    hide: function () {
                        //console.log('hide account journal');
                        //psa.statefromaj = 'hide';
                        //pmsa.statefromaj = 'hide';
                    }
                }

            });
        }
        p.formwindows.show();
    },
    formatDate: function (param) {
        param = new Date(param);
        var monthval = [
            "01", "02", "03",
            "04", "05", "06", "07",
            "08", "09", "10",
            "11", "12"
        ];
        var date = param.getFullYear() + "-" + monthval[param.getMonth()] + "-" + param.getDate();
        return date;
    },
    Curdate: function (param) {
        var date = new Date();
        var monthval = [
            "01", "02", "03",
            "04", "05", "06", "07",
            "08", "09", "10",
            "11", "12"
        ];
        var curdate = date.getFullYear() + "-" + monthval[date.getMonth()] + "-" + date.getDate();
        return curdate;
    },
    formatDateCustomeIndo: function (param, style) {

        var date, monthval;
        monthval = [
            "01", "02", "03",
            "04", "05", "06", "07",
            "08", "09", "10",
            "11", "12"
        ];
        switch (style) {
            case '/':
                date = param.getDate() + "/" + monthval[param.getMonth()] + "/" + param.getFullYear();
                break;
            case '-':
                date = param.getDate() + "-" + monthval[param.getMonth()] + "-" + param.getFullYear();
                break;
        }
        return date;
    },
    formatDateCustomeEng: function (param, style) {
        var date, monthval;
        monthval = [
            "01", "02", "03",
            "04", "05", "06", "07",
            "08", "09", "10",
            "11", "12"
        ];
        switch (style) {
            case '/':
                date = param.getFullYear() + "/" + monthval[param.getMonth()] + "/" + param.getDate();
                break;
            case '-':
                date = param.getFullYear() + "-" + monthval[param.getMonth()] + "-" + param.getDate();
                break;
        }
        return date;
    },
    customeAdddate: function (paramdate, change) {
        var date, newdate, dd, mm, y, someFormattedDate;
        date = new Date(paramdate);
        newdate = new Date(date);
        //change = bisa di set menjadi tambah +1 hari atau kurang -1 hari, di custome sesuai kebutuhan

        newdate.setDate(newdate.getDate() + change);
        dd = newdate.getDate();
        mm = newdate.getMonth() + 1;
        y = newdate.getFullYear();
        someFormattedDate = mm + '/' + dd + '/' + y;
        return someFormattedDate;
    },
    getnameCOA: function (coa_id) {
        var me;
        me = this;
        Ext.Ajax.request({
            url: 'gl/coa/create',
            method: 'POST',
            timeout: 45000000,
            params: {
                data: Ext.encode({
                    hideparam: "getcoa",
                    coa_id: coa_id
                })
            },
            success: function (response) {
                me.infodata = Ext.JSON.decode(response.responseText);
            },
            failure: function (response) {

            }
        });
    },
    generateFakeForm: function (paramList, reportFile) {
        var form = '<form id="fakeReportFormID" action=resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=' + reportFile + '.mrt" target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
        for (var x in paramList) {
            if (paramList[x] === null) {
                paramList[x] = '';
            }
            form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
        }
        form += '<input type="submit" value="post"></form>';
        form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
        return form;
    },
    Reportviewer: function (paramList, reportFile) {
        var form, x;
        form = '<form id="Reportform" action="resources/stimulsoftv2/viewer.php?reportfilelocation=' + reportFile + '.mrt" target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
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
    Reportviewerjs: function (paramList, reportFile) {
        var form, x;
        form = '<form id="Reportform" action="resources/stimulsoftjsv2/viewer.php?reportfilelocation=' + reportFile + '.mrt&ver=1" target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
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
    createWindowsdirectpdf: function () {
        var me = this;
        me.instantWindowautoclose('Panel', 800, 'Result ', 'state-report', 'myReportWindowdirectpdf', 'masterreport');
        me.win = desktop.getWindow('myReportWindowdirectpdf');
    },
    Reportviewerjsdirecttopdf: function (paramList, reportFile) {
        var form, x;
        form = '<form id="Reportform" action="resources/stimulsoftjsv2/viewerpdf.php?reportfilelocation=' + reportFile + '.mrt" target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
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
    formCustomeShow: function (widht, title, action) {
        var me = this;
        var formtitle, formicon;
        var gfp = me.getFormProperties(action);
        var state = gfp.state;
        formtitle = gfp.formtitle;
        formicon = gfp.formicon;
        var winId = 'win-formcustome';
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: title,
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: widht,
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
                            win.add(Ext.create('Cashier.view.' + me.controllerName + '.FormData'));
                            win.center();
                            win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);
                    }
                }

            });
        }
        win.show();
    },
    FormDataCustomeShow: function (state, width, title, locationform, formid) {
        var me, winid, win = '';
        me = this;
        if (formid == 'test') {
            winid = 'win-formdatacustome';
        } else {
            winid = 'win-' + formid;
        }
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
    instantWindow: function (panel, width, title, state, id, controller, height) {
        var me = this;
        var formtitle, formicon;
        title = typeof title == 'undefined' ? 'My Window' : title;
        id = typeof id == 'undefined' ? 'myInstantWindow' : id;
        state = typeof state == 'undefined' ? 'create' : state;
        panel = typeof panel == 'undefined' ? 'Panel' : panel;
        width = typeof width == 'undefined' ? 600 : width;
        height = typeof height == 'undefined' ? 600 : height;
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
                height: height,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                items: Ext.create('Cashier.view.' + controllerFolder + '.' + panel),
                state: state,
                onEsc: function() {
                    var me = this;
                    Ext.Msg.confirm(
                        'Confirmation',
                        'Are you sure you wish to close this window before saving your changes?',
                        function(btn) {
                            if (btn === 'yes')
                                me.destroy();
                        }
                     );
                }
            });
        }
        win.show();
    },
    instantWindowWithMinimize: function (panel, width, title, state, id, controller) {
        var me = this;
        var formtitle, formicon;
        title = typeof title == 'undefined' ? 'My Window' : title;
        id = typeof id == 'undefined' ? 'myInstantWindow' : id;
        state = typeof state == 'undefined' ? 'create' : state;
        panel = typeof panel == 'undefined' ? 'Panel' : panel;
        width = typeof width == 'undefined' ? 600 : width;
        // var controllerFolder = typeof controller === 'undefined' ? me.controllerName : controller;
        formtitle = title;
        formicon = 'icon-window-default';
        var winId = id;
        var win = desktop.getWindow(winId);
        var length = $('.'+controller).length + 1;
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle + (length > 1 ? ' ('+length+')' : ''),
                iconCls: formicon,
                resizable: true,
                minimizable: true,
                maximizable: true,
                width: width,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                taskbarButton: true,
                modal: false,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                items: Ext.create('Ext.panel.Panel', {
                    height:500,
                    layout:'fit',
                    id:'MyReportPanel_' + id,
                    bodyCls: controller,
                    html:'Report Panel'
                }), 
                state: state
            });
        }
        win.show();
    },
    instantWindowautoclose: function (panel, width, title, state, id, controller) {
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
                items: Ext.create('Cashier.view.' + controllerFolder + '.' + panel),
                state: state,
                listeners: {
                    boxready: function () {
                        /*
                         var tm = setTimeout(function () {
                         clearTimeout(tm);
                         win.down("#MyReportPanel").up('window').close();
                         }, 10000);
                         */

                    }
                }
            });
        }
        win.show();
    },
    gridAfterRenderCustome: function () {
        var me = this;
        me.getGrid().getSelectionModel().setSelectionMode('SINGLE');
        me.dataReset();
    },
    CurrentDate: function () {
        var today, dd, mm, yyyy = '';
        today = new Date();
        dd = today.getDate();
        mm = today.getMonth() + 1; //January is 0!
        yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        today = dd + '-' + mm + '-' + yyyy;
        return today;
    },
    getStartEndofMonthCustome: function (year, month, param) {
        var data, firstDay, lastDay = '';
        firstDay = new Date(year, (month - 1), 1);
        lastDay = new Date(year, (month - 1) + 1, 0);
        if (param == 'first') {
            data = firstDay.getDate();
        } else {
            data = lastDay.getDate();
        }

        return data;
    },
    Fluidpanel: function (panel) {
        var myWidth = panel.up('panel').getWidth();
        var myHeight = panel.up('panel').getHeight();
        panel.setHeight(myHeight);
        panel.setWidth(myWidth);
    },
    buildLevelCOA: function (url, controller, param, selector) {
        var formvalue, info = '';
        controller.getFormdata().down("[name=hideparam]").setValue(param);
        formvalue = controller.getFormdata().getForm().getValues();
        Ext.Ajax.request({
            url: url,
            method: 'POST',
            timeout: 45000000,
            params: {data: Ext.encode(formvalue)},
            success: function (response) {
                info = Ext.JSON.decode(response.responseText);
                if (info.parameter == 'buildlevel' && info.statusaccount == 1) {
                    resetTimer();
                    // controller.getFormdata().down("button[action=save]").show();
                    //controller.getFormdata().down("[name=parent_id]").setFieldStyle('background:none #FFFFFF;');
                    //controller.getFormdata().down("[name=parent_id]").clearInvalid();
                    controller.getFormdata().down("[name=" + selector + "]").setValue(info.level);
                    controller.getFormdata().down("[name=countparam]").setValue(1);
                } else {
                    // controller.getFormdata().down("button[action=save]").hide();
                    // controller.getFormdata().down("[name=parent_id]").setFieldStyle('background:none #FFFF00;');
                    // controller.getFormdata().down("[name=parent_id]").markInvalid('Parent (COA) should be less than Chart Of Account (COA)');
                    controller.getFormdata().down("[name=" + selector + "]").setValue(info.level);
                    controller.getFormdata().down("[name=countparam]").setValue(0);
                }


            },
            failure: function (response) {

            }
        });
    },
    compareCOA: function (url, controller, param, selector) {
        var formvalue, info = '';
        controller.getFormdata().down("[name=hideparam]").setValue(param);
        formvalue = controller.getFormdata().getForm().getValues();
        Ext.Ajax.request({
            url: url,
            method: 'POST',
            timeout: 45000000,
            params: {data: Ext.encode(formvalue)},
            success: function (response) {
                info = Ext.JSON.decode(response.responseText);
                if (info.parameter == 'comparevalues' && info.statusaccount == 1) {
                    resetTimer();
                    controller.getFormdata().down("button[action=save]").show();
                    controller.getFormdata().down("[name=" + selector + "]").setFieldStyle('background:none #FFFFFF;');
                    controller.getFormdata().down("[name=" + selector + "]").clearInvalid();
                } else {
                    controller.getFormdata().down("button[action=save]").hide();
                    controller.getFormdata().down("[name=" + selector + "]").setFieldStyle('background:none #FFFF00;');
                    controller.getFormdata().down("[name=" + selector + "]").markInvalid('Setting Account COA invalid');
                }
            },
            failure: function (response) {
            }
        });
    },
    dataExist: function (url, controller, param, selector) {
        var statecheckdata, formvalue, info = '';
        statecheckdata = controller.getFormdata().up('window').state.toLowerCase();
        if (statecheckdata == 'create') {
            controller.getFormdata().down("[name=hideparam]").setValue(param);
            formvalue = controller.getFormdata().getForm().getValues();
            Ext.Ajax.request({
                url: url,
                method: 'POST',
                timeout: 45000000,
                params: {data: Ext.encode(formvalue)},
                success: function (response) {
                    var info = '';
                    info = Ext.JSON.decode(response.responseText);
                    if (info.parameter == 'checkexist' && info.msg != null) {
                        resetTimer();
                        controller.getFormdata().down("button[action=save]").hide();
                        controller.getFormdata().down("[name=" + selector + "]").setFieldStyle('background:none #FFFF00;');
                        controller.getFormdata().down("[name=" + selector + "]").markInvalid(info.msg);
                    } else {
                        controller.getFormdata().down("button[action=save]").show();
                        controller.getFormdata().down("[name=" + selector + "]").setFieldStyle('background:none #FFFFFF;');
                        controller.getFormdata().down("[name=" + selector + "]").clearInvalid();
                    }
                },
                failure: function (response) {

                }
            });
        }
    },
    liveSearch: function (controller) {
        resetTimer();
        var me, form, store, fields, x = '';
        me = controller;
        form = me.getFormsearch().getForm();
        store = me.getGrid().getStore();
        me.getFormsearch().down("[name=hideparam]").setValue('livesearch');
        fields = me.getFormsearch().getValues();
        for (x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
    },
    customeReset: function (controller) {
        controller.getFormsearch().getForm().reset();
        controller.getFormsearch().down("[name=hideparam]").setValue('customereset'); // added on april 2016, ahmad riadi
        controller.resetData(controller, 'customereset');
    },
    resetData: function (controller, value) {
        resetTimer();
        var me, form, store, fields, x = '';
        me = controller;
        form = me.getFormsearch().getForm();
        store = me.getGrid().getStore();
        me.getFormsearch().down("[name=hideparam]").setValue(value);
        fields = me.getFormsearch().getValues();
        for (x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
    },
    checkNumber: function (controller, value, selector) {
        var me = this;
        if (value !== '') {
            var validatenumber = !isNaN(parseFloat(value)) && isFinite(value);
            //console.log(validatenumber);
            if (validatenumber == false) {
                resetTimer();
                me.setCSSField(controller, selector);
                me.setValid(controller, selector, 'The data must be number');
                me.hideButton(controller, 'save');
            } else {
                me.unsetCSSField(controller, selector);
                me.unsetValid(controller, selector);
                me.unhideButton(controller, 'save');
            }
        } else {
            me.unsetCSSField(controller, selector);
            me.unsetValid(controller, selector);
            me.unhideButton(controller, 'save');
        }
    },
    checkNumber_custome: function (controller, value, selector, param) {
        var me = this;
        if (value !== '') {
            var validatenumber = !isNaN(parseFloat(value)) && isFinite(value);
            //console.log(validatenumber);


            if (validatenumber == false && param == 'allow') {

                if (value.length <= 5) {
                    resetTimer();
                    me.setCSSField(controller, selector);
                    me.setValid(controller, selector, 'The data must be number');
                    me.hideButton(controller, 'save');
                } else {
                    me.unsetCSSField(controller, selector);
                    me.unsetValid(controller, selector);
                    me.unhideButton(controller, 'save');
                }

            } else {
                me.unsetCSSField(controller, selector);
                me.unsetValid(controller, selector);
                me.unhideButton(controller, 'save');
            }
        } else {
            me.unsetCSSField(controller, selector);
            me.unsetValid(controller, selector);
            me.unhideButton(controller, 'save');
        }
    },
    checkString: function (controller, value, selector) {
        var me = this;
        if (value !== '') {
            var validatenumber = !isNaN(parseFloat(value)) && isFinite(value);
            // console.log(validatenumber);
            if (validatenumber == false) {
                resetTimer();
                me.unsetCSSField(controller, selector);
                me.unsetValid(controller, selector);
                me.unhideButton(controller, 'save');
            } else {
                me.setCSSField(controller, selector);
                me.setValid(controller, selector, 'The data must be text / string');
                me.hideButton(controller, 'save');
            }
        } else {
            me.unsetCSSField(controller, selector);
            me.unsetValid(controller, selector);
            me.unhideButton(controller, 'save');
        }
    },
    setError: function (form, selector, flag, msg) {
        if (flag == true) {
            form.down("[name=" + selector + "]").setFieldStyle('background:none #FFFF00;');
            form.down("[name=" + selector + "]").markInvalid(msg);
        } else {
            form.down("[name=" + selector + "]").setFieldStyle('background:none #FFFFFF;');
            form.down("[name=" + selector + "]").clearInvalid();
        }
    },
    setCSSField: function (controller, selector) {
        controller.getFormdata().down("[name=" + selector + "]").setFieldStyle('background:none #FFFF00;');
    },
    unsetCSSField: function (controller, selector) {
        controller.getFormdata().down("[name=" + selector + "]").setFieldStyle('background:none #FFFFFF;');
    },
    hideButton: function (controller, button) {
        controller.getFormdata().down("button[action=" + button + "]").hide();
    },
    unhideButton: function (controller, button) {
        controller.getFormdata().down("button[action=" + button + "]").show();
    },
    setValid: function (controller, selector, msg) {
        controller.getFormdata().down("[name=" + selector + "]").markInvalid(msg);
    },
    unsetValid: function (controller, selector) {
        controller.getFormdata().down("[name=" + selector + "]").clearInvalid();
    },
    setUpper: function (controller, selector) {
        var value = this.getValue(controller, selector, 'value');
        this.setValue(controller, selector, value.toUpperCase());
    },
    setLower: function (controller, selector) {
        var value = this.getValue(controller, selector, 'value');
        this.setValue(controller, selector, value.toLowerCase());
    },
    setValue: function (controller, selector, value) {
        controller.getFormdata().down("[name=" + selector + "]").setValue(value);
    },
    setSValue: function (controller, selector, value) {
        controller.getFormsearch().down("[name=" + selector + "]").setValue(value);
    },
    setValueRadio: function (controller, selector, value) {
        controller.getFormdata().down(selector).setValue(value);
        return;
    },
    getValueRadio: function (controller, selector) {
        return controller.getFormdata().down(selector).getValue();
    },
    getValue: function (controller, selector, type) {
        var result = '';
        if (type == 'value') {
            result = controller.getFormdata().down("[name=" + selector + "]").getValue();
        } else if (type == 'raw') {
            result = controller.getFormdata().down("[name=" + selector + "]").getRawValue();
        }
        return  result;
    },
    setValueComboboxflag: function (controller, selector, id, desc, flag) {
        if (flag == 'formsearch') {
            controller.getFormsearch().down("[name=" + selector + "]").setValue(id);
            controller.getFormsearch().down("[name=" + selector + "]").setRawValue(desc);
        } else {
            controller.getFormdata().down("[name=" + selector + "]").setValue(id);
            controller.getFormdata().down("[name=" + selector + "]").setRawValue(desc);
        }
    },
    setValueCombobox: function (controller, selector, id, desc) {
        controller.getFormdata().down("[name=" + selector + "]").setValue(id);
        controller.getFormdata().down("[name=" + selector + "]").setRawValue(desc);
    },
    getValueComboboxflag: function (controller, selector, flag) {
        if (flag == 'formsearch') {
            var id = controller.getFormsearch().down("[name=" + selector + "]").getValue();
            var value = controller.getFormsearch().down("[name=" + selector + "]").getRawValue();
        } else {
            var id = controller.getFormdata().down("[name=" + selector + "]").getValue();
            var value = controller.getFormdata().down("[name=" + selector + "]").getRawValue();
        }
        return {"id": id, "value": value}
    },
    getValueCombobox: function (controller, selector) {
        var id = controller.getFormdata().down("[name=" + selector + "]").getValue();
        var value = controller.getFormdata().down("[name=" + selector + "]").getRawValue();
        return {"id": id, "value": value}
    },
    maskCOA: function (controller, selector, type) {
        var value, res = '';
        value = this.getValue(controller, selector, type);
        if (value.length <= 1 || value.length == 4) {
            var res = value;
        } else if (value.length >= 1 && value.length <= 3) {
            var res = value.replace(value, value + '.');
        } else if (value.length == 5) {
            var res = value.replace(value, value + '.');
        } else if (value.length >= 5) {
            var res = value;
        }
        this.setValue(controller, selector, res);
    },
    checkStoreExist: function (storedata) {
        var store, countstore, status = '';
        store = Ext.StoreManager.lookup(storedata); //mendapatkan store
        countstore = store.getTotalCount();
        return countstore;
    },
    storeFilterbyparam: function (controller, parameter, store) {
        var value = controller.getFormimport().down("[name=" + parameter + "]").getValue();
        var datastore = controller.getStore(store); //mendapatkan store
        datastore.clearFilter(true);
        datastore.filterBy(function (rec, id) {
            if (rec.raw.parameter === value) {
                return true;
            }
            else {
                return false;
            }
        });
    },
    BindingComboCOA: function () {
        var store, countstore = '';
        store = Ext.StoreManager.lookup('Coa'); //mendapatkan store
        store.load({
            callback: function (records, operation, success) {
                store.filter('coa', 'Set as Parent');
                store.each(function (record) {
                    if ((record.get('coa')) == 'Set as Parent') {
                        countstore = 1;
                    } else {
                        countstore = 0;
                    }
                });
                if (countstore == 0) {
                    store.add({"coa_id": "1", "coa": "Set as Parent"});
                }

            }
        });
    },
    EnableDisable: function (controller, selector, param) {
        controller.getFormdata().down("[name=" + selector + "]").disabled(param);
    },
    EnableDisablebyid: function (controller, selector, param) {
        controller.getFormdata().down("[id=#" + selector + "]").disabled(param);
    },
    buildSuccessAlert: function (msg) {
        Ext.Msg.show({
            title: 'Success',
            msg: msg,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK
        });
    },
    buildWarningAlert: function (msg) {
        Ext.Msg.show({
            title: 'WARNING',
            msg: msg,
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.WARNING
        });
    },
    buildFailedAlert: function (msg) {
        Ext.Msg.show({
            title: 'FAILED',
            msg: msg,
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });
    },
    buildConfirmAlert: function (msg) {
        Ext.Msg.show({
            title: 'Save',
            msg: msg,
            width: 300,
            closable: false,
            buttons: Ext.Msg.YESNO,
            buttonText:
                    {
                        yes: 'YES',
                        no: 'CANCEL'
                    },
            multiline: false,
            fn: function (buttonValue, inputText, showConfig) {
                if (buttonValue == 'yes') {

                }
            },
            icon: Ext.Msg.QUESTION
        });
    },
    FormAfterRenderParam: function (state, paramgrid, paramform) {
        var me, result, grid, store, record = "";
        me = this;
        result = {
            init: function () {
                // init function here
            },
            read: function () {
                //read function here
            },
            create: function () {
                // create function here  

            },
            update: function () {
                // update function  here  
                grid = me.get + paramgrid();
                store = grid.getStore();
                record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.get + paramform().loadRecord(record);
            },
            delete: function () {
                // delete function here  

            },
        }
        return result;
    },
    fdar: function () {
        var me = this;
        var x = {
            init: function () {
                /// init here
            },
            create: function () {
                /// create here  

            },
            update: function () {
                var formvalue = me.getFormdata().getForm().getValues();
                for (var i in formvalue) {
                    var el = me.getFormdata().down("[name=" + i + "]");
                    if (el) {
                        if (el.absoluteReadOnly) {
                            el.setReadOnly(true);
                        }
                    }
                }

                // me.getFormdata().down("[name=coacode]").setReadOnly(true);
                var grid = me.getGrid();
                var store = grid.getStore();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.getFormdata().loadRecord(record);
                /// update here
            },
            read: function () { //========= added on march 15th 2016 by Tirtha
                var grid = me.getGrid();
                var store = grid.getStore();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.getFormdata().loadRecord(record);
                me.getFormdata().getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                me.getFormdata().down('#btnSave').setDisabled(true);
            },
            readCustomStore: function (grid) { //========= added on feb 19th 2018 by Semy
                //var grid = me.getGrid();
                var store = grid.getStore();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.getFormdata().loadRecord(record);
                me.getFormdata().getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                me.getFormdata().down('#btnSave').setDisabled(true);
            }
        };
        return x;
    },
    setprojectpt: function (combobox, f, fieldprojecthidden, callback, projectvalue) {
        var me = this;
        me.project_id = 0;
        me.pt_id = 0;
        me.elem = new Cashier.library.tools.Mytools();
        var project_id = me.elem.comboHelper(f.down("[name=" + combobox + "]")).getField('pt_id', 'project_id');
        me.project_id = project_id;
        me.pt_id = f.down("[name=" + combobox + "]").getValue();
        if (fieldprojecthidden) {
            f.down("[name=" + fieldprojecthidden + "]").setValue(project_id);
        }

        if (typeof callback === "function") {
            callback();
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
            formsearch = 'Cashier.library.template.view.FormSearchBrowseCashier';
        } else {
            formsearch = 'Cashier.library.template.view.FormSearchBrowse';
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
            //  items: Ext.create('Cashier.view.' + me.controllerName + '.' + panel),
            items: [
                {
                    xtype: 'panel',
                    height: 300,
                    layout: {
                        type: 'border'
                    },
                    items: [
                        Ext.create(formsearch),
                        Ext.create('Cashier.view.' + me.controllerName + '.' + panel)
                    ]
                }
            ],
            state: state
        });
        // console.log(win);




        win.show();
    },
    instantStore: function (data) {
        var me = this;
        var model = data.id + 'model';
        var usedUrl = typeof data.url === 'undefined' ? me.controllerName : data.url;
        var idProperty = typeof data.idProperty === 'undefined' ? 'unit_id' : data.idProperty;
        var dE = {
            mode_read: 'all',
            page: 1,
            limit: 25
        };
        if (typeof data.extraParams !== 'undefined') {
            for (var x in data.extraParams) {
                dE[x] = data.extraParams[x];
            }
        }

        Ext.define(model, {
            extend: 'Ext.data.Model',
            fields: [{name: 'example'}]
        });
        var myStore = Ext.create('Ext.data.Store', {
            model: model,
            storeId: data.id,
            url: usedUrl,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'cashier/' + usedUrl + '/read',
                    create: 'cashier/' + usedUrl + '/create',
                    update: 'cashier/' + usedUrl + '/update',
                    destroy: 'cashier/' + usedUrl + '/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: idProperty,
                    root: 'data',
                    totalProperty: 'totalRow'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                },
                extraParams: dE
            }
        });
        return myStore;
    },
    ReportviewerV3: function (paramList, reportFile) {
        var form, x;
        form = '<form id="Reportform" action="resources/stimulsoftjsv2/viewer_wholepage.php?reportfilelocation=' + reportFile + '.mrt" target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
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
    ReportviewerV4: function (paramList, reportFile, formId, isWholePage = 0) {
        var form, x;

        if (isWholePage == 0) {
            reportGeneratorFile = 'viewer.php';
        } else {
            reportGeneratorFile = 'viewer_wholepage.php';
        }

        form = '<form id="Reportform_'+formId+'" action="resources/stimulsoftjsv2/'+reportGeneratorFile+'?reportfilelocation=' + reportFile + '.mrt" target="my-iframe-'+formId+'" method="post" style="visibility:hidden;height:0;width:0">';
        for (x in paramList) {
            if (paramList[x] === null) {
                paramList[x] = '';
            }
            form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
        }
        form += '<input type="submit" value="post"></form>';
        form += '<iframe name="my-iframe-'+formId+'" style="height:100%;width:100%;"></iframe>';
        return form;
    },

    //FUNCTION FORMAT NUMBER
    _formatNumber: function (n) {
      // format number 1000000 to 1,234,567
      // return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        // can negative value
        var clean = n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (n.indexOf("-") >= 0) {
            return "-"+clean;
        }else{
            return clean
        }
    },
    _formatCurrency: function(input, blur) {
      var me = this;
      // appends $ to value, validates decimal side
      // and puts cursor back in right position.
      
      // get input value
      var input_val = input.getValue();
      
      // don't validate empty input
      if (input_val === "") { return; }
      
      // original length
      var original_len = input_val.length;

      // initial caret position 
      var caret_pos = me._getCaretPos(input);
        
      // check for decimal
      if (input_val.indexOf(".") >= 0) {

        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimal_pos = input_val.indexOf(".");

        // split number by decimal point
        var left_side = input_val.substring(0, decimal_pos);
        var right_side = input_val.substring(decimal_pos);

        // add commas to left side of number
        left_side = me._formatNumber(left_side);

        // validate right side
        right_side = me._formatNumber(right_side);
        
        // On blur make sure 2 numbers after decimal
        if (blur === "blur") {
          right_side += "00";
        }
        
        // Limit decimal to only 2 digits
        right_side = right_side.substring(0, 2);

        // join number by .
        input_val = left_side + "." + right_side;

      } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        input_val = me._formatNumber(input_val);
        
        // final formatting
        if (blur === "blur") {
          input_val += ".00";
        }
      }
      
      // send updated string to input
      input.setValue(input_val);

      // put caret back in the right position
      var updated_len = input_val.length;
      caret_pos = updated_len - original_len + caret_pos;
      //input[0].setSelectionRange(caret_pos, caret_pos);
    },
    _getCaretPos: function(el){
        var rng, ii=-1;
        if(typeof el.selectionStart=="number") {
            ii=el.selectionStart;
        } else if (document.selection && el.createTextRange){
            rng=document.selection.createRange();
            rng.collapse(true);
            rng.moveStart("character", -el.value.length);
            ii=rng.text.length;
        }
        return ii;
    },
    // FORMAT NUMBER NEW ACCEPT ONLY NUMBER AND (.)
    _formatNumber2: function (n) {
          var clean = n.replace(/[^0-9|^.]/g, "");
          return clean;
      },
});