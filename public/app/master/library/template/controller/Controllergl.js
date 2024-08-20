Ext.define('Master.library.template.controller.Controllergl', {//mendefine terhadap alamat file Controllergl.js
    extend: 'Master.library.template.controller.Controller', //mengextends dari file Controller.js sebagai induknya
    requires: ['Master.library.tools.Mytools'],
    elem: null, infodata: null,
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
    formatDate: function (param) {
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
    getnameCOA: function (coa_id) {
        var me;
        me = this;
        Ext.Ajax.request({
            url: 'gl/coa/create',
            method: 'POST',
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
                            win.add(Ext.create('Master.view.' + me.controllerName + '.FormData'));
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
        controller.getFormsearch().down("[name=hideparam]").setValue('customereset');// added on april 2016, ahmad riadi
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
    setValueCombobox: function (controller, selector, id, desc) {
        controller.getFormdata().down("[name=" + selector + "]").setValue(id);
        controller.getFormdata().down("[name=" + selector + "]").setRawValue(desc);
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
            }
            else {
                return false;
            }
        });


    },
    BindingComboCOA: function () {
        var store, countstore = '';
        store = Ext.StoreManager.lookup('Coa');//mendapatkan store
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
    buildWarningAlert: function (msg) {
        Ext.Msg.show({
            title: 'WARNING',
            msg: msg,
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.WARNING
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
            }
        };
        return x;
    },
});