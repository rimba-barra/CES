Ext.define('Cashier.controller.Masterclosingcentral', {
    extend: 'Cashier.template.ControllerForMaster',
    alias: 'controller.Masterclosingcentral',
    refs: [
    {
        ref: 'panel',
        selector: 'masterclosingcentralpanel'
    },
    {
        ref: 'grid',
        selector: 'masterclosingcentralgrid'
    },
    {
        ref: 'formdata',
        selector: 'masterclosingcentralformdata'
    },
    {
        ref: 'formsearch',
        selector: 'masterclosingcentralformsearch'
    },
    ],
    controllerName: 'masterclosingcentral',
    fieldName: 'coa',
    year: null,
    nextyear: null,
    allowclosing: false,
    message: null,
    ptId: 0,
    dateNow: new Date(),
    bindPrefixName: 'Masterclosingcentral',
    formxWinId: 'win-masterclosingcentralwinId',
    closingdata: null,
    shortMonths: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
    totalmonthclosed: 0,
    init: function () {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        this.control({
            'masterclosingcentralpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(450);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(712);
                    me.panelAfterRender();
                },
            },
            'masterclosingcentralformdata [action=select]': {
                click: this.selectData
            },
            'masterclosingcentralformdata [name=pt_pt_id]': {
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
            'masterclosingcentralformdata [name=year]': {
                select: this.selectData
            },
//            'masterclosingcentralformdata [action=selectyear]' : {
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
        // console.log(f.down("[name=pt_pt_id]").valueModels);
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

                            me.allowclosing = true;
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
            }).read('getclosingcentral');

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

        var before = f.down("[month=" + month + "]").getText();
        var statt = before.substr(0, 5);

        if (statt.toLowerCase() == 'unclo') { //unclosing
            var currentstatus = 0;
        }else{
            var currentstatus = 1;
        }


        if(unclosemethod == 'SELECTED MONTH ONLY'){
            unclosemethod = 2;
        }else{
            unclosemethod = 1;
        }

        if(me.allowclosing == false){
            me.tools.alert.warning(me.message);
            return 0;
        }

        var lompatbulannext = 0
        if(idx-me.totalmonthclosed>1){
            lompatbulannext = 1;
            // me.tools.alert.warning("Tidak Boleh Lompat Bulan");
            // return 0;

        }

        p.setLoading("Please wait");
        me.tools.ajax({
            params: {module: me.controllerName, unclosemethod: unclosemethod, mm: month, yy: me.year, pt_id: me.ptId, project_id: me.project_id, user_id: apps.uid,currentstatus: currentstatus},
            form: f,
            success: function (data, model) {
                try {

                    var varcek1 = 0;
                    var alertmsg = "";
                    for (var i = 0; i < data.hasil.length ; i++) {
                        if (data.hasil[i][0].result === 0) {
                            varcek1 = varcek1 + 1;
                            alertmsg += data.hasil[i][0].msg;
                        }
                    }

                    if (lompatbulannext) {


                        if (varcek1 == data.hasil.length) {
                            me.tools.alert.warning("Project belum closing di bulan " + alertmsg.slice (0, -2) +" di tahun " + data.hasil[0][0].year);
                            me.changeText(month);
                            me.selectData();
                        }else if(varcek1 > 0){
                            if (currentstatus == 1) {
                                me.tools.alert.warning("Project belum closing di bulan "+alertmsg.slice (0, -2)+" di tahun " + data.hasil[0][0].year);
                            }else{
                                // me.tools.alert.info("Successfully Unclosed.");
                                
                            }
                            me.changeText(month);
                            me.selectData();
                        }else if(varcek1 === 0){
                            if (currentstatus == 1) {
                                // me.tools.alert.info("Successfully Closed.");
                            }else{
                                // me.tools.alert.info("Successfully Unclosed.");
                            }
                            me.changeText(month);
                            me.selectData();
                        }else{
                            me.tools.alert.warning("Failed to request data.");
                        }

                        p.setLoading(false);
                    }else{
                        if (data.hasil[(data.hasil.length - 1)][0].result === 1) {
                            if (data.hasil[(data.hasil.length - 1)][0].statusclosing == 1) {
                                // me.tools.alert.info("Successfully Closed.");
                            }else{
                                // me.tools.alert.info("Successfully Unclosed.");
                            }
                            me.changeText(month);
                            me.selectData();
                        } else {
                            if(data.hasil[(data.hasil.length - 1)][0].result === 0 && alertmsg != ""){
                                if (currentstatus == 0) {
                                    if (data.hasil[(data.hasil.length - 1)][0].statusclosing == 1) {
                                        // me.tools.alert.info("Successfully Closed.");
                                    }else{
                                        // me.tools.alert.info("Successfully Unclosed.");
                                    }
                                }else{
                                    me.tools.alert.warning("Project belum closing di bulan " + alertmsg.slice (0, -2) +" di tahun " + data.hasil[0][0].year);
                                }
                                me.changeText(month);
                                me.selectData();
                            }else{
                                me.tools.alert.warning("Unable to closing transaction [code 0].");
                            }
                            p.setLoading(false);
                        }
                    }
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to request data.");

                }
                p.setLoading(false);
            }
        }).read('closemonth');


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

});
