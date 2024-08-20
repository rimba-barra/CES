Ext.define('Cashier.controller.Prosesposting', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Prosesposting',
    requires: [
        'Cashier.library.tools.Mytools',
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.box.tools.Tools'
    ],
    views: [
        'prosesposting.Panel',
        'prosesposting.FormData'
    ],
    stores: [
        //'Prosesposting',
        'Ptbyusermulti'
    ],
    models: [
        'Prosesposting',
        'Projectpt'
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'prosespostingpanel'
        },
        {ref: 'formdata', selector: 'prosespostingformdata'},
    ],
    //setting properties variabel
    controllerName: 'prosesposting',
    fieldName: '',
    bindPrefixName: 'Prosesposting',
    urlsubmit: 'cashier/prosesposting/create',
    yeardata: null, fromdate: null, untildate: null, getyear: null,
    form: null, value: null, info: null, senddata: null,
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });
    },
    init: function (application) {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});

        this.control({
            'prosespostingpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.getFormdata().down("[name=projectpt_id]").getStore().load();
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(400);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
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

    },
    dataSubmit: function () {
        var me;
        me = this;
        var value = me.getValue(me, 'tipeposting', 'raw');
        
        
        Ext.MessageBox.confirm(
            'Confirm', 'Are you sure you want to do this ?', callbackFunction);
         function callbackFunction(btn) {
            if(btn == 'yes') {

                if(value=='Voucher'){
                    me.dataSubmitVoucher();
                }else if(value=='Journal'){
                    me.dataSubmitJournal();
                }
            } else {
                
            }
         };
    },
    dataSubmitJournal: function (){
        var me,datapost;
        me = this;
        var p = me.getFormdata();
        me.form = me.getFormdata().getForm();
        me.value = me.form.getValues();
        var tipeposting = me.getValue(me, 'tipeposting', 'raw');
        if (me.form.isValid()) {
            resetTimer();
            datapost = {
                fromdate: me.value.fromdate,
                untildate: me.value.untildate,
                projectpt_id:me.getFormdata().down("[name=projectpt_id]").getValue(),
                tipeposting: tipeposting
            }
            p.setLoading("Please wait");
            Ext.Ajax.request({
                url: 'cashier/prosesposting/update',
                method: 'POST',
                timeout:100000000,	
                async: false ,
                params: {
                    data: Ext.encode(datapost)
                },
                success: function (responses) {
                    p.setLoading(false);
                    me.tools.alert.info("Successfully processing data");
                },
                failure: function (responses) {
                }
            });
        }
    },
    dataSubmitVoucher: function () {
        var me;
        me = this;
        var p = me.getFormdata();
        me.form = me.getFormdata().getForm();
        var tipeposting = me.getValue(me, 'tipeposting', 'raw');
        var dataEncode = [];
        var pembagi = 100;
        var jumlahajax = 0;
        var returnmsg = "<ul>";
        var allowed2 = true;
        if (me.form.isValid()) {
            resetTimer();
            
            p.setLoading("Please wait");
            me.value = me.form.getValues();
            me.senddata = {
                fromdate: me.value.fromdate,
                untildate: me.value.untildate,
                projectpt_id:me.getFormdata().down("[name=projectpt_id]").getValue()
            }
            Ext.Ajax.request({
                url: 'cashier/prosesposting/read',
                method: 'POST',
                timeout:100000000,	
                params: {
                    data: Ext.encode(me.senddata),
                    mode_read: 'default'
                },
                success: function (response) {
                    response = Ext.JSON.decode(response.responseText);
                    var i,j,k;
                    if(response.total<100 && response.total>=10){
                        pembagi = 10;
                    }else if(response.total<10){
                        pembagi = 1;
                    }
                    jumlahajax = Math.ceil(response.total/pembagi);
                    i = 0;
                    for (j = 0;j<jumlahajax;j++){
                        var datadetail = [];
                        for (k = 0;k<pembagi;k++){
                            if(response.data[i]){
                                var allowed = true;
                                var checkallowed = me.checkSubDetail(response.data[i]['kasbank_id']);
                                if(checkallowed==false){
                                    allowed = false;
                                    allowed2 = false;
                                    returnmsg = returnmsg + '<li>- Lengkapi Sub detail pada voucher <b>'+response.data[i]['vid']+'</b>. </li> ';
                                }
                                var checkallowedcoatampungan = me.checkCoaTampungan(response.data[i]['kasbank_id']);
                                if(checkallowedcoatampungan==false){
                                    allowed = false;
                                    allowed2 = false;
                                    returnmsg = returnmsg + '<li>- Pada voucher <b>'+response.data[i]['vid']+'</b> masih ada yang menggunakan Coa Tampungan. Silahkan ganti terlebih dahulu. </li> ';
                                }
                                if(allowed==true){
                                    datadetail.push({
                                        kasbank_id: response.data[i]['kasbank_id'],
                                        tipeposting: tipeposting
                                    });
                                }
                                i++;
                            }
                        }
                        dataEncode.push(datadetail);
                    }
                    returnmsg = returnmsg+"</ul>";
                    
                    for(var l=0;l<dataEncode.length;l++){
                        p.setLoading("Processing data, "+(((l+1)/dataEncode.length)*100)+"% please wait...");
                        Ext.Ajax.request({
                            url: 'cashier/prosesposting/update',
                            method: 'POST',
                            timeout:100000000,	
                            async: false ,
                            params: {
                                data: Ext.encode(dataEncode[l])
                            },
                            success: function (responses) {
                            },
                            failure: function (responses) {
                            }
                        });
                    }

                    if(allowed2==true){
                        p.setLoading(false);
                        me.tools.alert.info("Successfully processing data");
                    }else{
                        me.tools.alert.warning(returnmsg);
                        p.setLoading(false);
                    }
                },
                failure: function (response) {
                    me.getFormdata().up('window').close();
                }
            });
        }

    },
    formDataAfterRenderCustome: function () {
        var me;
        me = this;
    },
    
    checkSubDetail:function(kasbank_id){ 
        var allowed_posting = true;
        Ext.Ajax.request({
            url: 'cashier/prosesposting/read',
            method: 'POST',	
            async: false ,
            params: {
                kasbank_id: kasbank_id,
                mode_read: 'subdetailcheck'
            },
            success: function (response) {
                var data = Ext.JSON.decode(response.responseText);
                if(data.data['ERROR']==true){
                    allowed_posting = false;
                }

            },
            failure: function (response) {

            }
        }); 
        return allowed_posting;
    }
    //Rizal 22 Juli 2019
    ,checkCoaTampungan:function(kasbank_id){ 
        var allowed_posting = true;
        Ext.Ajax.request({
            url: 'cashier/prosesposting/read',
            method: 'POST',	
            async: false ,
            params: {
                kasbank_id: kasbank_id,
                mode_read: 'checkcoatampungan'
            },
            success: function (response) {
                var data = Ext.JSON.decode(response.responseText);
                if(data.data['ERROR']==true){
                    allowed_posting = false;
                }

            },
            failure: function (response) {

            }
        }); 
        return allowed_posting;
    }
        //
});