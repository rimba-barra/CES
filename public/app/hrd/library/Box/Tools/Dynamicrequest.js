Ext.define('Hrd.library.box.tools.Dynamicrequest', {//mendefine terhadap alamat file Controllergl.js
    formMask:function(form){
        form.up('window').body.mask('Please wait...');
    }, 
    formUnmask:function(form){
        form.up('window').body.unmask();
    }, 
    formClose:function(form){
        form.up('window').close();
    }, 
    test:function(){
       console.log('test');
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
    setAllow: function (form, selector, value) {
        form.down("[name=" + selector + "]").allowBlank = value;
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
    setStoreFormsearch: function () {
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
                listeners: {
                    boxready: function () {
                        p.formwindows.body.mask(p.formmask);
                        p.formtimeout = setTimeout(function () {
                            p.formwindows.add(Ext.create(p.fromlocation));
                            p.formwindows.center();
                            p.formwindows.body.unmask();
                            clearTimeout(p.formtimeout);
                        }, 1000);
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
    checkStoreExist: function (storedata) {
        var store, countstore, status = '';
        store = Ext.StoreManager.lookup(storedata);//mendapatkan store
        countstore = store.getTotalCount();
        return countstore;
    },
    storeFilterbyparam: function (controller, parameter, store) {
        var value = controller.getFormimport().down("[name=" + parameter + "]").getValue();
        var datastore = controller.getStore(store);//mendapatkan store
        datastore.clearFilter(true);
        datastore.filterBy(function (rec, id) {
            if (rec.raw.parameter === value) {
                return true;
            } else {
                return false;
            }
        });


    },
    EnableDisable: function (controller, selector, param) {
        controller.getFormdata().down("[name=" + selector + "]").disabled(param);
    },
    EnableDisablebyid: function (controller, selector, param) {
        controller.getFormdata().down("[id=#" + selector + "]").disabled(param);
    },
    buildWarningAlert: function (msg) {
        Ext.Msg.show({
            title: 'WARNING',
            msg: msg,
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.WARNING
        });
    },
     buildSuccessAlert: function (msg) {
        Ext.Msg.show({
            title: 'INFO',
            msg: msg,
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.SUCCESS
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

});