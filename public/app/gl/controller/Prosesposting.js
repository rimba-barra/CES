Ext.define('Gl.controller.Prosesposting', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Prosesposting',
    requires: [
        'Gl.library.tools.Mytools',
    ],
    views: [
        'prosesposting.Panel',
        'prosesposting.FormData'
    ],
    stores: [
        'Prosesposting',
    ],
    models: [
        'Prosesposting',
    ],
    refs: [
        {ref: 'formdata', selector: 'prosespostingformdata'},
        {ref: 'paneldata', selector: 'prosespostingpanel'}
    ],
    //setting properties variabel
    controllerName: 'prosesposting',
    fieldName: '',
    bindPrefixName: 'Prosesposting',
    urlsubmit: 'gl/prosesposting/create',
    yeardata: null, fromdate: null, untildate: null, getyear: null,
    form: null, value: null, info: null, senddata: null,
    init: function (application) {
        var me = this;
        this.control({
            'prosespostingpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(160);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(540);
                }
            },
            'prosespostingformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();
                }
            },
            'prosespostingformdata [name=fromdate]': {
                select: function () {
                    me.getFormdata().down("[name=untildate]").setMinValue(me.getValue(me, 'fromdate', 'raw'));
                    me.setValue(me, 'untildate', me.getValue(me, 'fromdate', 'raw'));
                    me.checkYear();
                }
            },
            'prosespostingformdata [name=untildate]': {
                select: function () {
                    me.checkYear();
                }
            },
            'prosespostingformdata button[action=submit]': {
                click: this.dataSubmit
            }
        });
    },
    checkYear: function () {
        var me;
        me = this;
        var until = me.getValue(me, 'untildate', 'raw');
        var from = me.getValue(me, 'fromdate', 'raw');
        var resfrom = from.substring(6);
        var resuntil = until.substring(6);

        if ((resfrom !== me.yeardata) && (resuntil == me.yeardata)) {
            me.buildWarningAlert('Year of Active Database not exists...!');
            me.hideButton(me, 'submit');
        } else if ((resfrom == me.yeardata) && (resuntil !== me.yeardata)) {
            me.buildWarningAlert('Year of Active Database not exists...!');
            me.hideButton(me, 'submit');
        } else if ((resfrom !== me.yeardata) && (resuntil !== me.yeardata)) {
            me.buildWarningAlert('Year of Active Database not exists...!');
            me.hideButton(me, 'submit');
        } else {
            me.unhideButton(me, 'submit');
        }

    },
    dataSubmit: function () {
        var me;
        me = this;
        me.form = me.getFormdata().getForm();
        if (me.form.isValid()) {
            resetTimer();
            me.value = me.form.getValues();
            me.senddata = {
                hideparam: 'default',
                fromdate: me.value.fromdate,
                untildate: me.value.untildate
            }
            //me.AjaxRequestProgress(); //ajax dengan progress
            //me.AjaxRequest();
            me.AjaxRequestSteps('Posting','default');
        }

    },
    formDataAfterRenderCustome: function () {
        var me;
        me = this;
        me.senddata = {
            hideparam: 'defaultrange'
        }
        me.AjaxRequest();

    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.getBody().mask("Processing data, please wait...", 'loading');
        Ext.override(Ext.data.proxy.Ajax, { timeout: 0 });
        Ext.override(Ext.form.action.Action, { timeout: 0 });
        Ext.Ajax.request({
            url: me.urlsubmit,
            method: 'POST',
	        timeout: 100000000,	
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                me.info = Ext.JSON.decode(response.responseText);
                me.setSuccessEvent();
                Ext.override(Ext.data.proxy.Ajax, { timeout: 60000 });
                Ext.override(Ext.form.action.Action, { timeout: 60 });
            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });
    },
    AjaxRequestProgress: function () {
        var me;
        me = this;

        var fromdate = me.senddata.fromdate;
        var untildate = me.senddata.untildate;
        var d=new Date(fromdate);
        var mstart=d.getMonth()+1; 
        var ystart=d.getFullYear();

        var d=new Date(untildate);
        var mend=d.getMonth()+1; 
        var yend=d.getFullYear();

        var range = mend-1;
        Ext.getBody().mask("Processing data , please wait...", 'loading');

        var indicator = mstart;
        mstart = mstart-1;
        ranges = range+1;

        for(i=mstart; i<=range; i++){

            var y = ystart, m = i;
            var firstDay = new Date(y, m, 1);
            var lastDay = new Date(y, m + 1, 0);

            me.senddata = {
                hideparam: 'default',
                fromdate: me.formatDate(firstDay,y),
                untildate: me.formatDate(lastDay,y)
            }
            
            Ext.Ajax.request({
                url: me.urlsubmit,
                method: 'POST',
                timeout: 100000000, 
                params: {
                    data: Ext.encode(me.senddata)
                },
                success: function (response) {
                    me.info = Ext.JSON.decode(response.responseText);
                    Ext.getBody().mask("Processing data, Month "+indicator+" of "+ranges+" , please wait...", 'loading');
                    indicator = indicator + 1;
                    if(indicator>ranges){
                        me.setSuccessEvent();
                    }
                },
                failure: function (response) {
                    me.getFormdata().up('window').close();
                }
            });
        }

    },
    AjaxRequestSteps: function (name, hideparam) {
        var me;
        me = this;

        me.senddata = {
            hideparam: hideparam,
            fromdate: me.senddata.fromdate,
            untildate: me.senddata.untildate
        }
        
        Ext.Ajax.request({
            url: me.urlsubmit,
            method: 'POST',
            timeout: 100000000, 
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                me.info = Ext.JSON.decode(response.responseText);
                Ext.getBody().mask("Processing data: <b>" +name+ "</b> , please wait...", 'loading');
                me.setSuccessEvent(name);
            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });

    },
    formatDate: function (date, yeart) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        console.log(yeart);
        return [yeart, month, day].join('-');
    },
    setSuccessEvent: function () {
        var me = this;
        if (me.info.parameter == 'default') {
            if (me.info.counter < 1) {
                Ext.getBody().unmask();                
                me.buildWarningAlert(me.info.message);
            } else {
                Ext.getBody().unmask();
                Ext.Msg.show({
                    title: 'Success',
                    msg: 'Process  data successfully.',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK,
                    fn: function () {
                        me.formDataClose();
                    }
                });
            }
        } else if (me.info.parameter == 'defaultrange') {
            var form = me.getFormdata();
            Ext.getBody().unmask();

            me.setValue(me, 'fromdate', me.info.data.fromdate);
            me.setValue(me, 'untildate', me.info.data.untildate);
            me.yeardata = me.info.data.yeardb;

            form.down("[name=fromdate]").setMinValue(me.yeardata + '-01-01');
            form.down("[name=fromdate]").setMaxValue(me.info.data.enddecember);
            form.down("[name=untildate]").setMinValue(me.yeardata + '-01-01');
            form.down("[name=untildate]").setMaxValue(me.info.data.enddecember);
        } else if (me.info.parameter == 'update_flag_posting_thread'){
            me.AjaxRequestSteps('Calculating Summary','newgeneration_thread');
        } else if (me.info.parameter == 'newgeneration_thread'){
            me.AjaxRequestSteps('Creating LR','lr_creator_thread');
        } else if (me.info.parameter == 'lr_creator_thread'){
            me.AjaxRequestSteps('Finishing','newgeneration_thread_end');
        } else if (me.info.parameter == 'newgeneration_thread_end'){
            if (me.info.counter < 1) {
                Ext.getBody().unmask();                
                me.buildWarningAlert(me.info.message);
            } else {
                Ext.getBody().unmask();
                Ext.Msg.show({
                    title: 'Success',
                    msg: 'Process  data successfully.',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK,
                    fn: function () {
                        me.formDataClose();
                    }
                });
            }
        }

        
    }
});