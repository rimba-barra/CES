Ext.define('Cashier.controller.Masterclosing', {
    extend: 'Cashier.template.ControllerForMaster',
    alias: 'controller.Masterclosing',
    refs: [
        {
            ref: 'panel',
            selector: 'masterclosingpanel'
        },
        {
            ref: 'grid',
            selector: 'masterclosinggrid'
        },
        {
            ref: 'formdata',
            selector: 'masterclosingformdata'
        },
        {
            ref: 'formsearch',
            selector: 'masterclosingformsearch'
        },
    ],
    controllerName: 'masterclosing',
    fieldName: 'coa',
    year: null,
    nextyear: null,
    allowclosing: false,
    message: null,
    ptId: 0,
    dateNow: new Date(),
    bindPrefixName: 'Masterclosing',
    formxWinId: 'win-masterclosingwinId',
    closingdata: null,
    shortMonths: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
    totalmonthclosed: 0,
    init: function () {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        this.control({
            'masterclosingpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(450);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(712);
                    me.panelAfterRender();
                },
            },
            'masterclosingformdata [action=select]': {
                click: this.selectData
            },
            'masterclosingformdata [name=pt_pt_id]': {
                change: function (el) {
                    me.setprojectpt(el.name, el.ownerCt);
                    var f = me.getFormdata();
                    //metode get project
                    if (f.down("[name=pt_pt_id]").valueModels != null) {
                        valueModels = f.down("[name=pt_pt_id]").valueModels[0];
                        me.project_id = valueModels.data.project_project_id;
                        f.down('[name=pt_id]').setValue(valueModels.data.ptid);
                        me.ptId = valueModels.data.ptid;
                    }
                    localStorage.removeItem("current_project_id");
                    var dt = new Date();
                    var crntyear = f.down('[name=year]').getValue();
                    if(crntyear>0){
                        f.down('[name=year]').setValue(crntyear);
                    }else{
                        f.down('[name=year]').setValue(dt.getFullYear());
                    }
                    
                },
                select: this.selectData
            },
            'masterclosingformdata [name=year]': {
                select: this.selectData
            },
//            'masterclosingformdata [action=selectyear]' : {
//                click : this.closingYear
//            },


        });
    },
    formDataAfterRender: function (el) { //fdar
        var state = el.up('window').state;
        var wid = el.up('window').id;
        var me = this;
        var f = me.getFormdata();
        me.fdar().init();
        me.detailFdar();
    },
    detailFdar: function () {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormdata();

        Ext.override(Ext.data.proxy.Ajax, {timeout: 60000});

        p.setLoading("Please wait");
        me.tools.ajax({
            params: {module: me.controllerName},
            form: f,
            success: function (data, model) {
                try {
                    me.tools.weseav2(data.pt, f.down("[name=pt_pt_id]")).comboBox('', function () {
                        var combostore = f.down('[name=pt_pt_id]').getStore();
                        var record = combostore.findRecord('pt_id', parseInt(apps.pt),0,false,true,true);
                        if (record) {
                            f.down("[name=pt_pt_id]").setValue(parseInt(apps.projectpt));

                        }
                    });
                    me.tools.weseav2(data.year, f.down("[name=year]")).comboBox('', function () {
                        f.down("[name=year]").setValue(parseInt(moment(me.dateNow).format("YYYY")));
                    });
                    f.down('[name=pt_id]').setValue(data.ptid);
                    me.ptId = data.ptid;
                    me.selectData();
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }
                p.setLoading(false);
            }
        }).read('detail');
    },
    selectData: function () {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormdata();
        var year = f.down("[name=year]").getValue();
        console.log(f.down("[name=pt_pt_id]").valueModels);
        if (f.down("[name=pt_pt_id]").valueModels) {
            var storept = f.down("[name=pt_pt_id]").valueModels[0].raw;
            var pt = storept.pt_id;
        }else{
            var pt = apps.pt;
        }
        
        me.ptId = pt;

        //menggunakan localstorage
        var current_project_id = localStorage.getItem("current_project_id");
        if(current_project_id > 0){
            me.project_id = current_project_id;
        }

        if (f.getForm().isValid()) {
            me.year = null;
            p.setLoading("Please wait");
            me.tools.ajax({
                params: {module: me.controllerName, year: year, pt_id: pt, project_id: me.project_id},
                form: f,
                success: function (data, model) {

                    try {
                        if (data.hasil[0] == null) {
                            me.disableButton(true);
                            me.tools.alert.warning("Failed to get selected data.");
                        } else {
                            var checkyear = data.hasil[0].year;
                            var is_locked = data.hasil[0].is_locked;
                            if(checkyear==999){
                                me.nextyear = year+1;
                                me.message = "Januari Tahun "+me.nextyear+" Belum di Open";
                                me.tools.alert.warning(me.message);
                                me.allowclosing = false;
                            }else if(checkyear==666){
                                me.nextyear = year-1;
                                me.message = "Desember Tahun "+me.nextyear+" Belum Closing";
                                me.tools.alert.warning(me.message);
                                me.allowclosing = false;
                            }else{
                                me.allowclosing = true;
                            }
                            if(is_locked == 1){
                                me.message = "Transaksi Tahun "+year+" Dikunci, <br> Anda belum dapat melakukan perubahan data di tahun "+year;
                                me.tools.alert.warning(me.message);
                                me.allowclosing = false;
                            }
                            me.year = data.hasil[0].year;
                            me.disableButton(false, data.hasil[0]);

                        }

                    } catch (err) {
                        console.log(err.message);
                        me.disableButton(true);
                        me.tools.alert.warning("Failed to request data.");

                    }

                    p.setLoading(false);
                }
            }).read('getclosing');

        }
    },
    disableButton: function (param, data) {
        var me = this;
        var f = me.getFormdata();
        var year = f.down('[name=year]').getValue();
        var field = f.getForm().getFields();

        me.closingdata = data;

        if (param !== true) {

            var totalmonth = 0;
            for (var key in data) {
                var nn = me.shortMonths.includes(key);
                if(nn==1){
                    if(data[key]==1){
                        totalmonth=totalmonth+1;
                    }
                }
            }

           me.totalmonthclosed = totalmonth;

            for (var key in data) {
                f.query('[month=' + key + ']').forEach(function (c) {
                    if (data[key] !== 1) {
                        c.setDisabled(false);
                        c.setText('Close <br/>' + key.toUpperCase());
                        c.btnInnerEl.setStyle(
                                {
                                    background: "green",
                                    color: "white",
                                    fontSize: '18px'
                                });

                        //f.down('[month='+key+']').style({'color':'red'});
                    } else {
                        c.setDisabled(false);
                        //c.setText('Open '+key);
                        c.setText('UnClose <br/>' + key.toUpperCase());
                        c.btnInnerEl.setStyle(
                                {
                                    background: "red",
                                    color: "white",
                                    fontSize: '18px'
                                });

                        //f.down('[month='+key+']').style({'color':'#ff0000'});
                    }
                });
            }
        } else {
            f.query('[cls=btnMonth]').forEach(function (c) {
                c.setDisabled(true);
            });
        }

        // f.down("[action=selectyear]").setDisabled(param);
        //f.down("[action=selectyear]").setText("Close Year "+me.year);    
    },
      nthIndex: function(str, pat, n){
    var L= str.length, i= -1;
    while(n-- && i++<L){
        i= str.indexOf(pat, i);
        if (i < 0) break;
    }
    return i;
    },

    replaceAt: function(string, index, replace) {
        return string.substring(0, index) + replace + string.substring(index + 1);
    },

    mainDataSave: function (el) {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormdata();
        var month = el.month;

        var idx = me.shortMonths.indexOf(month)+1;
        var unclosemethod = f.down('[name=unclosemethod]').getValue();

        if(unclosemethod == 'SELECTED MONTH ONLY'){
            unclosemethod = 2;
        }else{
            unclosemethod = 1;
        }

        if(me.allowclosing == false){
            me.tools.alert.warning(me.message);
            return 0;
        }

        if(idx-me.totalmonthclosed>1){
            me.tools.alert.warning("Tidak Boleh Lompat Bulan");
            return 0;
        }
        
            me.tools.ajax({
            params: {module: me.controllerName, mm: month, yy: me.year, pt_id: me.ptId, project_id: me.project_id,unclosemethod:unclosemethod},
            form: f,
            success: function (data, model) {
                
                try {
                    if (data.hasil[0][0].closingcentral == 1) {
                        me.tools.alert.warning("Gagal ubah closing/unclosing, Bulan ini sudah di closing di Kantor Pusat.");
                    }else if (data.hasil[0][0].closingcentral == 2){
                        me.tools.alert.warning("Gagal ubah closing/unclosing, Sesudah bulan ini sudah di closing oleh Kantor Pusat.");
                    }else if(data.hasil[0][0].closingcentral == 0 ) {
                        if (data.hasil[0][0].result != 0) {
                            var rowdata = data.hasil[0][0].rowdata;
                            var res = rowdata.split(',');
                            var datafull = '';
                            var bb = 100;
                            var counts = [];
                            for (a = 3; a <= bb; a+=4){
                                counts.push(a);
                              
                            }
                           

                            for (i = 0; i < res.length; i++ ) {
                                if(counts.includes(i)){
                                    datafull += res[i]+'<br/>';
                                }else{
                                   datafull += res[i]+','; 
                                }
                                
                            }
                            var msg = 'Ada voucher yang belum di posting dalam periode closing.<br/> Silahkan Unrealisasi / Posting terlebih dahulu !<br/><br/>'+datafull+'';
                            me.tools.alert.warning(msg); 

                       /*     var confirmmsg = 'There are unposted voucher exist within closing period.<br/> Are you sure want to proceed the closing ?'+datafull+'';
                              Ext.Msg.confirm('Confirmation', confirmmsg, function (btn) {
                            if (btn == 'yes') {
                         ///////////////////////////////////////////
                          p.setLoading("Please wait, Closing Transactions...");

                            Ext.Ajax.timeout = 300000; // 300 seconds 
                            Ext.override(Ext.form.Basic, {timeout: Ext.Ajax.timeout / 1000});
                            Ext.override(Ext.data.proxy.Server, {timeout: Ext.Ajax.timeout});
                            Ext.override(Ext.data.Connection, {timeout: Ext.Ajax.timeout});

                           me.tools.ajax({
                                params: {module: me.controllerName, mm: month, yy: me.year, pt_id: me.ptId, project_id: me.project_id},
                                form: f,
                                success: function (data, model) {

                                    try {

                                        if (data.hasil[0][0].result === 1) {
                                            p.setLoading("Please wait, Recalculating...");
                                            me.mainDataCalculate(el);
                                        } else {
                                            me.tools.alert.warning("Unable to closing transaction.");
                                            p.setLoading(false);
                                        }
                                    } catch (err) {
                                        console.log(err.message);
                                        me.tools.alert.warning("Failed to request data.");

                                    }
                                }
                            }).read('closemonth');
                         //////////////////////////////////////////////

                                            }
                            }); */
                       
                        } else {


                              ///////////////////////////////////////////
                         p.setLoading("Please wait, Closing Transactions...");

                            Ext.Ajax.timeout = 300000; // 300 seconds 
                            Ext.override(Ext.form.Basic, {timeout: Ext.Ajax.timeout / 1000});
                            Ext.override(Ext.data.proxy.Server, {timeout: Ext.Ajax.timeout});
                            Ext.override(Ext.data.Connection, {timeout: Ext.Ajax.timeout});

                           me.tools.ajax({
                                params: {module: me.controllerName, unclosemethod: unclosemethod, mm: month, yy: me.year, pt_id: me.ptId, project_id: me.project_id, user_id: apps.uid},
                                form: f,
                                success: function (data, model) {

                                    try {

                                        if (data.hasil[0][0].result === 1) {
                                            p.setLoading("Please wait, Recalculating...");
                                            me.mainDataCalculate(el);
                                        } else {
                                            me.tools.alert.warning("Unable to closing transaction [code 0].");
                                            p.setLoading(false);
                                        }
                                    } catch (err) {
                                        console.log(err.message);
                                        me.tools.alert.warning("Failed to request data.");

                                    }
                                }
                            }).read('closemonth');
                        }
                    }else {
                        me.tools.alert.warning("Failed to request data.");
                    }
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to request data.");

                }
            }
        }).read('validate');

      
    },


    mainDataCalculate: function (el) {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormdata();
        var month = el.month;
        p.setLoading("Please wait, Recalculating...");

        Ext.Ajax.timeout = 300000; // 300 seconds 
        Ext.override(Ext.form.Basic, {timeout: Ext.Ajax.timeout / 1000});
        Ext.override(Ext.data.proxy.Server, {timeout: Ext.Ajax.timeout});
        Ext.override(Ext.data.Connection, {timeout: Ext.Ajax.timeout});

        me.tools.ajax({
            params: {module: me.controllerName, mm: month, yy: me.year, pt_id: me.ptId, project_id: me.project_id},
            form: f,
            success: function (data, model) {

                try {

                    if (data.hasil[0][0].result === 1) {
                        // me.tools.alert.info("Successfully Closed.");
                        me.changeText(month);

                    } else {

                        if (data.hasil[0][0].status === 1) {
                            // me.tools.alert.info("Successfully Closed.");
                            me.changeText(month);
                        }else{
                            me.tools.alert.warning("Unable to closing transaction. [code 1]");
                            p.setLoading(false);
                        } 

                    }
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to request data.");

                }
                me.selectData();

                p.setLoading(false);
            }
        }).read('calculatesummary');

    },
    changeText: function (m) {
        var me = this;
        var f = me.getFormdata();
        var before = f.down("[month=" + m + "]").getText();
        var res = before.substr(0, 5);
        if (res == 'Close') {
            //f.down("[month="+m+"]").setText('Open '+m);
            f.down("[month=" + m + "]").setText('UnClose <br/>' + m.toUpperCase());
            f.down("[month=" + m + "]").btnInnerEl.setStyle(
                    {
                        background: "red",
                        color: "white",
                        fontSize: '18px'
                    });
        } else {
            f.down("[month=" + m + "]").setText('Close <br/>' + m.toUpperCase());
            f.down("[month=" + m + "]").btnInnerEl.setStyle(
                    {
                        background: "green",
                        color: "white",
                        fontSize: '18px'
                    });
        }

    },
    closingYear: function () {
        var me = this;
        var f = me.getFormdata();
        var p = me.getPanel();
        p.setLoading("Please wait");

        me.tools.ajax({
            params: {module: me.controllerName, yy: me.year, pt_id: me.ptId},
            form: f,
            success: function (data, model) {

                try {
                    if (data.hasil[0][0].result === 1) {
                        me.tools.alert.info("Success.");
                        f.query('[cls=btnMonth]').forEach(function (c) {
                            //  c.setText('Open '+c.month);
                            c.setText('UnClose ' + c.month);
                        });
                    } else {
                        me.tools.alert.warning("Unable to closing transaction yearly. [code 2]");
                        p.setLoading(false);
                    }
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to request data.");

                }

                p.setLoading(false);
            }
        }).read('closeyear');
    }

});
